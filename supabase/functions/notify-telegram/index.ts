import { createClient } from 'npm:@supabase/supabase-js@2'

const FUNCTION_VERSION = 'homework-reports-v9-topic-39-lesson-bundle'
const DIAGNOSTIC_VERSION = 'multi-student-diagnostics-v1'
const STUDENT_ID = 'kristina'
const TELEGRAM_TOPIC_ID = 39
const DIAGNOSTIC_COOLDOWN_MS = 30_000
const encoder = new TextEncoder()

type Recipient = {
  chat_id: number | string
  message_thread_id: number | null
  enabled: boolean
}

type AdminClient = ReturnType<typeof createClient>

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-notify-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json({ ...body, functionVersion: FUNCTION_VERSION }, { status, headers: corsHeaders })
}

function secureEqual(left: string, right: string): boolean {
  const a = encoder.encode(left)
  const b = encoder.encode(right)
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i]
  return diff === 0
}

function safeText(value: unknown, fallback = ''): string {
  return value === undefined || value === null ? fallback : String(value)
}

function escapeHtml(value: unknown): string {
  return safeText(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function safeError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error ?? 'Unknown error')
  return message
    .replace(/bot\d+:[A-Za-z0-9_-]+/g, 'bot[hidden]')
    .replace(/eyJ[A-Za-z0-9._-]+/g, '[hidden key]')
    .slice(0, 500)
}

function normalizeStudentId(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.trim().toLowerCase()
  return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(normalized) ? normalized : null
}

function requestApiKey(request: Request): string {
  const apiKey = (request.headers.get('apikey') || '').trim()
  if (apiKey) return apiKey
  const authorization = (request.headers.get('authorization') || '').trim()
  const match = authorization.match(/^Bearer\s+(.+)$/i)
  return match ? match[1].trim() : ''
}

function parseKeyDictionary(raw: string | undefined | null): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return []
    return Object.values(parsed).filter((value): value is string => typeof value === 'string' && value.length > 0)
  } catch {
    return []
  }
}

async function publicClientAuthorized(request: Request): Promise<boolean> {
  const apiKey = requestApiKey(request)
  if (!apiKey) return false
  const allowedKeys = [
    Deno.env.get('SITE_PUBLIC_API_KEY') || '',
    Deno.env.get('SUPABASE_ANON_KEY') || '',
    Deno.env.get('SUPABASE_PUBLISHABLE_KEY') || '',
    ...parseKeyDictionary(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS')),
  ].map((key) => key.trim()).filter(Boolean)
  if (allowedKeys.some((key) => secureEqual(apiKey, key))) return true
  const supabaseUrl = (Deno.env.get('SUPABASE_URL') || '').replace(/\/+$/, '')
  if (!supabaseUrl) return false
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      method: 'GET',
      headers: { apikey: apiKey },
      signal: AbortSignal.timeout(5_000),
    })
    await response.body?.cancel().catch(() => undefined)
    return response.ok
  } catch {
    return false
  }
}

function secretAuthorized(request: Request): boolean {
  const expected = (Deno.env.get('NOTIFY_WEBHOOK_SECRET') || '').trim()
  const actual = (request.headers.get('x-notify-secret') || '').trim()
  return Boolean(expected && actual && secureEqual(actual, expected))
}

async function telegramApi(token: string, method: string, body?: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.ok) return { ok: false, error: result?.description || `Telegram HTTP ${response.status}` }
  return { ok: true, result: result.result }
}

async function getRecipient(admin: AdminClient, studentId: string): Promise<Recipient> {
  const { data, error } = await admin
    .from('telegram_recipients')
    .select('chat_id,message_thread_id,enabled')
    .eq('student_id', studentId)
    .maybeSingle()
  if (error) throw error
  if (!data || !data.enabled) throw new Error('Telegram recipient is not configured or disabled')
  return { chat_id: data.chat_id, message_thread_id: TELEGRAM_TOPIC_ID, enabled: Boolean(data.enabled) }
}

async function sendTelegram(token: string, recipient: Recipient, text: string, keyboard: Array<Array<{ text: string; url: string }>> = []) {
  const payload: Record<string, unknown> = { chat_id: recipient.chat_id, text, parse_mode: 'HTML', disable_web_page_preview: true }
  if (recipient.message_thread_id !== null && recipient.message_thread_id !== undefined) payload.message_thread_id = recipient.message_thread_id
  if (keyboard.length) payload.reply_markup = { inline_keyboard: keyboard }
  const response = await telegramApi(token, 'sendMessage', payload)
  if (!response.ok) throw new Error(response.error)
  return response.result
}

function lessonTitle(lessonId: string): string {
  const match = lessonId.match(/^lesson-(\d+)$/)
  return match ? `Homework ${match[1]}` : lessonId
}

function homeworkStateSuspicious(row: Record<string, any>): boolean {
  const status = String(row?.status || '')
  const report = String(row?.report_status || '')
  if (status === 'draft') return report !== 'not_sent'
  if (status === 'submitted_pending_report') return !['pending', 'failed'].includes(report)
  if (status === 'submitted') return report !== 'sent'
  return true
}

function normalizeScore(row: Record<string, any>) {
  const correct = Number(row?.score_correct || 0)
  const total = Number(row?.score_total || 0)
  const percent = Number.isFinite(Number(row?.score_percent)) ? Number(row.score_percent) : (total > 0 ? Math.round((correct / total) * 100) : 0)
  return { correct, total, percent }
}

function buildHomeworkReportText(row: Record<string, any>, lessonUrl: string | null): string {
  const title = safeText(row.lesson_title, lessonTitle(safeText(row.lesson_id)))
  const { correct, total, percent } = normalizeScore(row)
  const lines = [
    '📝 <b>Homework report</b>',
    '',
    `<b>${escapeHtml(title)}</b>`,
    total > 0 ? `Score: <b>${correct}/${total}</b> (${percent}%)` : null,
    lessonUrl ? '' : null,
    lessonUrl ? `<a href="${escapeHtml(lessonUrl)}">Open homework</a>` : null,
    '',
    'Keep going — small steps still count. ✨',
  ]
  return lines.filter((line) => line !== null).join('\n')
}

function buildLessonBundleText(payload: Record<string, any>): string {
  const homework = payload.homework && typeof payload.homework === 'object' ? payload.homework : {}
  const vocabulary = payload.vocabulary && typeof payload.vocabulary === 'object' ? payload.vocabulary : null
  const grammar = Array.isArray(payload.grammar) ? payload.grammar : []
  const title = safeText(homework.title || payload.materialId || 'New homework')
  const subtitle = safeText(homework.subtitle || '')
  const parts = [
    '🚀 <b>New materials are ready</b>',
    '',
    `<b>${escapeHtml(title)}</b>`,
    subtitle ? escapeHtml(subtitle) : null,
  ]
  if (vocabulary) {
    parts.push('', `Vocabulary: <b>${escapeHtml(vocabulary.title || 'Lesson vocabulary')}</b>`)
    if (vocabulary.wordCount) parts.push(`Words: ${escapeHtml(vocabulary.wordCount)}`)
  }
  if (grammar.length) {
    parts.push('', 'Grammar:')
    for (const topic of grammar) parts.push(`• ${escapeHtml(topic?.title || 'Grammar topic')}`)
  }
  parts.push('', 'You can start when you are ready. ✨')
  return parts.filter((line) => line !== null).join('\n')
}

function buildLessonBundleKeyboard(payload: Record<string, any>) {
  const keyboard: Array<Array<{ text: string; url: string }>> = []
  const homework = payload.homework && typeof payload.homework === 'object' ? payload.homework : {}
  const vocabulary = payload.vocabulary && typeof payload.vocabulary === 'object' ? payload.vocabulary : null
  const grammar = Array.isArray(payload.grammar) ? payload.grammar : []
  if (typeof homework.url === 'string' && homework.url) keyboard.push([{ text: 'Open homework', url: homework.url }])
  if (vocabulary?.url) keyboard.push([{ text: 'Open vocabulary', url: vocabulary.url }])
  for (const topic of grammar.slice(0, 3)) {
    if (topic?.url) keyboard.push([{ text: `Grammar: ${safeText(topic.title, 'topic').slice(0, 45)}`, url: topic.url }])
  }
  return keyboard
}

async function handleHomeworkReport(request: Request, payload: Record<string, any>, admin: AdminClient, botToken: string) {
  if (!await publicClientAuthorized(request)) return json({ ok: false, error: 'Unauthorized homework report request' }, 401)
  const studentId = normalizeStudentId(payload.studentId)
  if (!studentId || studentId !== STUDENT_ID) return json({ ok: false, error: 'Invalid studentId' }, 403)
  const lessonId = safeText(payload.lessonId).trim()
  if (!/^lesson-\d+$/.test(lessonId) && !lessonId.startsWith('telegram-report-test')) return json({ ok: false, error: 'Invalid lessonId' }, 400)
  const recipient = await getRecipient(admin, studentId)
  const homeworkTable = 'homework_progress'
  const { data: row, error: readError } = await admin.from(homeworkTable).select('*').eq('student_id', studentId).eq('lesson_id', lessonId).maybeSingle()
  if (readError) return json({ ok: false, error: safeError(readError) }, 500)
  if (!row) return json({ ok: false, error: 'Homework progress row was not found' }, 404)
  const now = new Date().toISOString()
  await admin.from(homeworkTable).update({ status: 'submitted_pending_report', report_status: 'pending', report_sent_at: null, report_error: null, updated_at: now }).eq('student_id', studentId).eq('lesson_id', lessonId)
  try {
    const text = buildHomeworkReportText(row, typeof payload.lessonUrl === 'string' ? payload.lessonUrl : null)
    const message = await sendTelegram(botToken, recipient, text, [])
    const sentAt = new Date().toISOString()
    const { error: updateError } = await admin.from(homeworkTable).update({ status: 'submitted', report_status: 'sent', report_sent_at: sentAt, report_error: null, updated_at: sentAt }).eq('student_id', studentId).eq('lesson_id', lessonId)
    if (updateError) throw updateError
    return json({ ok: true, telegramMessageId: message.message_id, threadId: recipient.message_thread_id })
  } catch (error) {
    const message = safeError(error)
    await admin.from(homeworkTable).update({ status: 'submitted_pending_report', report_status: 'failed', report_sent_at: null, report_error: message, updated_at: new Date().toISOString() }).eq('student_id', studentId).eq('lesson_id', lessonId)
    return json({ ok: false, error: message }, 502)
  }
}

async function handleLessonBundle(request: Request, payload: Record<string, any>, admin: AdminClient, botToken: string) {
  if (!secretAuthorized(request)) return json({ ok: false, error: 'Unauthorized notification request' }, 401)
  const studentId = normalizeStudentId(payload.studentId)
  if (!studentId || studentId !== STUDENT_ID) return json({ ok: false, error: 'Invalid studentId' }, 403)
  const materialType = safeText(payload.materialType, 'lesson_bundle')
  const materialId = safeText(payload.materialId || payload.homework?.id).trim()
  const notificationVersion = Math.max(1, Number(payload.notificationVersion || 1) || 1)
  if (!materialId) return json({ ok: false, error: 'materialId is required' }, 400)
  const recipient = await getRecipient(admin, studentId)
  const { data: existing, error: existingError } = await admin.from('material_publications').select('id,status,telegram_message_id').eq('student_id', studentId).eq('material_type', materialType).eq('material_id', materialId).eq('notification_version', notificationVersion).in('status', ['pending', 'sent']).order('created_at', { ascending: false }).limit(1).maybeSingle()
  if (existingError) return json({ ok: false, error: safeError(existingError) }, 500)
  if (existing?.status === 'sent') return json({ ok: true, skipped: true, reason: 'already_sent', telegramMessageId: existing.telegram_message_id || null })
  let publicationId = existing?.id || null
  if (!publicationId) {
    const { data: publication, error: insertError } = await admin.from('material_publications').insert({ student_id: studentId, material_type: materialType, material_id: materialId, notification_version: notificationVersion, status: 'pending', payload }).select('id').single()
    if (insertError) return json({ ok: false, error: safeError(insertError) }, 500)
    publicationId = publication.id
  }
  try {
    const text = buildLessonBundleText(payload)
    const keyboard = buildLessonBundleKeyboard(payload)
    const message = await sendTelegram(botToken, recipient, text, keyboard)
    await admin.from('material_publications').update({ status: 'sent', telegram_message_id: message.message_id, sent_at: new Date().toISOString(), error_message: null }).eq('id', publicationId)
    return json({ ok: true, skipped: false, telegramMessageId: message.message_id, threadId: recipient.message_thread_id })
  } catch (error) {
    const message = safeError(error)
    await admin.from('material_publications').update({ status: 'failed', error_message: message }).eq('id', publicationId)
    return json({ ok: false, error: message }, 502)
  }
}

async function handleDiagnostics(request: Request, payload: Record<string, any>, admin: AdminClient, botToken: string) {
  if (!await publicClientAuthorized(request)) return json({ ok: false, error: 'Unauthorized diagnostics request', diagnosticVersion: DIAGNOSTIC_VERSION }, 401)
  const studentId = normalizeStudentId(payload.studentId)
  if (!studentId || studentId !== STUDENT_ID) return json({ ok: false, error: 'Invalid diagnostics student_id', diagnosticVersion: DIAGNOSTIC_VERSION }, 400)
  const kind = safeText(payload.kind)
  const homeworkTable = 'homework_progress'
  if (kind === 'diagnostics_cleanup_probe') {
    const lessonId = safeText(payload.lessonId)
    if (!lessonId.startsWith('__diagnostic_probe__')) return json({ ok: false, error: 'Invalid diagnostics lesson id', diagnosticVersion: DIAGNOSTIC_VERSION }, 400)
    const { error } = await admin.from(homeworkTable).delete().eq('student_id', studentId).eq('lesson_id', lessonId)
    return error ? json({ ok: false, error: safeError(error), diagnosticVersion: DIAGNOSTIC_VERSION }, 500) : json({ ok: true, cleaned: true, diagnosticVersion: DIAGNOSTIC_VERSION })
  }
  if (kind === 'diagnostics_homework_probe') {
    const lessonId = safeText(payload.lessonId)
    if (!lessonId.startsWith('__diagnostic_probe__')) return json({ ok: false, error: 'Invalid diagnostics lesson id', diagnosticVersion: DIAGNOSTIC_VERSION }, 400)
    const stages: Record<string, unknown> = {}
    try {
      const { data: draft, error: readError } = await admin.from(homeworkTable).select('student_id,lesson_id,status,report_status').eq('student_id', studentId).eq('lesson_id', lessonId).maybeSingle()
      if (readError) throw new Error(`service_read_draft: ${readError.message}`)
      if (!draft) throw new Error('service_read_draft: browser draft was not found')
      if (draft.status !== 'draft' || draft.report_status !== 'not_sent') throw new Error(`service_read_draft: unexpected state ${draft.status}/${draft.report_status}`)
      stages.browserDraft = 'ok'
      const submittedAt = new Date().toISOString()
      const { error: pendingError } = await admin.from(homeworkTable).update({ status: 'submitted_pending_report', submitted_at: submittedAt, locked_at: submittedAt, report_status: 'pending', report_sent_at: null, report_error: null, updated_at: submittedAt }).eq('student_id', studentId).eq('lesson_id', lessonId)
      if (pendingError) throw new Error(`pending_transition: ${pendingError.message}`)
      stages.pendingTransition = 'ok'
      const sentAt = new Date().toISOString()
      const { error: submittedError } = await admin.from(homeworkTable).update({ status: 'submitted', report_status: 'sent', report_sent_at: sentAt, report_error: null, updated_at: sentAt }).eq('student_id', studentId).eq('lesson_id', lessonId)
      if (submittedError) throw new Error(`submitted_transition: ${submittedError.message}`)
      stages.submittedTransition = 'ok'
      const { error: cleanupError } = await admin.from(homeworkTable).delete().eq('student_id', studentId).eq('lesson_id', lessonId)
      if (cleanupError) throw new Error(`cleanup: ${cleanupError.message}`)
      stages.cleanup = 'ok'
      return json({ ok: true, diagnosticVersion: DIAGNOSTIC_VERSION, stages })
    } catch (error) {
      await admin.from(homeworkTable).delete().eq('student_id', studentId).eq('lesson_id', lessonId)
      return json({ ok: false, error: safeError(error), diagnosticVersion: DIAGNOSTIC_VERSION, stages }, 500)
    }
  }
  const recipientResult = await (async () => {
    try { return { recipient: await getRecipient(admin, studentId), error: '' } } catch (error) { return { recipient: null, error: safeError(error) } }
  })()
  if (kind === 'diagnostics_send_report') {
    const recipient = recipientResult.recipient
    if (!recipient) return json({ ok: false, error: recipientResult.error || 'Telegram recipient is not configured', diagnosticVersion: DIAGNOSTIC_VERSION }, 500)
    const cutoff = new Date(Date.now() - DIAGNOSTIC_COOLDOWN_MS).toISOString()
    const { data: recent } = await admin.from('material_publications').select('created_at').eq('student_id', studentId).eq('material_type', 'diagnostic').eq('material_id', 'telegram-test').gte('created_at', cutoff).order('created_at', { ascending: false }).limit(1).maybeSingle()
    if (recent?.created_at) {
      const elapsed = Date.now() - Date.parse(recent.created_at)
      return json({ ok: true, skipped: true, retryAfterSeconds: Math.max(1, Math.ceil((DIAGNOSTIC_COOLDOWN_MS - elapsed) / 1000)), threadId: recipient.message_thread_id, diagnosticVersion: DIAGNOSTIC_VERSION })
    }
    const { data: publication, error: publicationError } = await admin.from('material_publications').insert({ student_id: studentId, material_type: 'diagnostic', material_id: 'telegram-test', notification_version: Math.max(1, Math.floor(Date.now() / 1000)), status: 'pending', payload: { kind, pageUrl: typeof payload.pageUrl === 'string' ? payload.pageUrl : null } }).select('id').single()
    if (publicationError) return json({ ok: false, error: safeError(publicationError), diagnosticVersion: DIAGNOSTIC_VERSION }, 500)
    try {
      const text = ['🧪 <b>English Space diagnostics test</b>', '', `<code>student_id=${escapeHtml(studentId)}</code>: browser → Supabase → Edge Function → Telegram works.`, '', 'This is a service test message. Homework and progress were not changed.'].join('\n')
      const message = await sendTelegram(botToken, recipient, text, [])
      await admin.from('material_publications').update({ status: 'sent', telegram_message_id: message.message_id, sent_at: new Date().toISOString(), error_message: null }).eq('id', publication.id)
      return json({ ok: true, skipped: false, diagnosticVersion: DIAGNOSTIC_VERSION, telegramMessageId: message.message_id, threadId: recipient.message_thread_id })
    } catch (error) {
      const message = safeError(error)
      await admin.from('material_publications').update({ status: 'failed', error_message: message }).eq('id', publication.id)
      return json({ ok: false, error: message, diagnosticVersion: DIAGNOSTIC_VERSION }, 502)
    }
  }
  if (kind !== 'diagnostics_health') return json({ ok: false, error: 'Unknown diagnostics request', diagnosticVersion: DIAGNOSTIC_VERSION }, 400)
  const { data: rowsRaw, error: homeworkError } = await admin.from(homeworkTable).select('lesson_id,status,report_status,migrated_from_legacy,submitted_at').eq('student_id', studentId)
  const rowsBeforeCleanup = rowsRaw || []
  const staleDiagnosticProbes = rowsBeforeCleanup.map((row: any) => safeText(row.lesson_id)).filter((lessonId: string) => lessonId.startsWith('__diagnostic_probe__'))
  for (const lessonId of staleDiagnosticProbes) await admin.from(homeworkTable).delete().eq('student_id', studentId).eq('lesson_id', lessonId)
  const rows = rowsBeforeCleanup.filter((row: any) => !safeText(row.lesson_id).startsWith('__diagnostic_probe__'))
  const suspiciousHomework = homeworkError ? [] : rows.filter((row: any) => homeworkStateSuspicious(row)).map((row: any) => row.lesson_id)
  const pendingHomework = homeworkError ? [] : rows.filter((row: any) => row.status === 'submitted_pending_report').map((row: any) => ({ lessonId: row.lesson_id, reportStatus: row.report_status, submittedAt: row.submitted_at || null }))
  const legacyHomework = homeworkError ? [] : rows.filter((row: any) => Boolean(row.migrated_from_legacy)).map((row: any) => row.lesson_id)
  const recipient = recipientResult.recipient
  const botResult = await telegramApi(botToken, 'getMe')
  const chatResult = recipient ? await telegramApi(botToken, 'getChat', { chat_id: recipient.chat_id }) : { ok: false, error: recipientResult.error || 'Recipient is not configured' }
  const { data: reportLogRows, error: reportLogError } = await admin.from('material_publications').select('material_id,status,error_message,created_at').eq('student_id', studentId).order('created_at', { ascending: false }).limit(20)
  return json({
    ok: !homeworkError && Boolean(recipient) && botResult.ok && chatResult.ok,
    diagnosticVersion: DIAGNOSTIC_VERSION,
    database: { ok: !homeworkError, error: homeworkError ? safeError(homeworkError) : null, homeworkRows: rows.length, staleDiagnosticProbesRemoved: staleDiagnosticProbes.length, suspiciousHomework, pendingHomework, legacyHomework },
    recipient: { ok: Boolean(recipient), enabled: Boolean(recipient?.enabled), source: 'database', threadId: recipient?.message_thread_id ?? null, error: recipientResult.error || null },
    telegram: { bot: botResult.ok ? { ok: true, username: botResult.result?.username || null } : { ok: false, error: botResult.error }, chat: chatResult.ok ? { ok: true, type: chatResult.result?.type || null } : { ok: false, error: chatResult.error } },
    reportLog: { ok: !reportLogError, error: reportLogError ? safeError(reportLogError) : null, pendingOrFailed: reportLogError ? [] : (reportLogRows || []).filter((row: any) => ['pending', 'failed'].includes(row.status)).map((row: any) => ({ lessonId: row.material_id, status: row.status, error: row.error_message || null })) },
  })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)
  try {
    const supabaseUrl = (Deno.env.get('SUPABASE_URL') || '').replace(/\/+$/, '')
    const serviceRoleKey = (Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '').trim()
    const botToken = (Deno.env.get('TELEGRAM_BOT_TOKEN') || '').trim()
    if (!supabaseUrl) return json({ ok: false, error: 'Missing SUPABASE_URL' }, 500)
    if (!serviceRoleKey) return json({ ok: false, error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, 500)
    if (!botToken) return json({ ok: false, error: 'Missing TELEGRAM_BOT_TOKEN' }, 500)
    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
    const payload = await request.json().catch(() => ({}))
    const kind = safeText(payload.kind)
    const eventType = safeText(payload.eventType)
    const materialType = safeText(payload.materialType)
    if (kind.startsWith('diagnostics_')) return await handleDiagnostics(request, payload, admin, botToken)
    if (eventType === 'homework_report') return await handleHomeworkReport(request, payload, admin, botToken)
    if (materialType === 'lesson_bundle' || eventType === 'lesson_bundle' || eventType === 'new_materials') return await handleLessonBundle(request, payload, admin, botToken)
    return json({ ok: false, error: 'Unknown action', received: { kind: kind || null, eventType: eventType || null, materialType: materialType || null } }, 400)
  } catch (error) {
    return json({ ok: false, error: safeError(error) }, 500)
  }
})
