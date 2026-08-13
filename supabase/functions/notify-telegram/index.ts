import { withSupabase } from 'npm:@supabase/server@^1'

const encoder = new TextEncoder()
const FUNCTION_VERSION = 'homework-reports-v6-topic-39-english-motivation-diagnostics'
const DIAGNOSTIC_VERSION = 'kristina-diagnostics-v1'
const DIAGNOSTIC_STUDENT_ID = 'kristina'
let lastDiagnosticTelegramSendAt = 0
const TELEGRAM_MESSAGE_THREAD_ID = 39
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-notify-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  const responseBody = body && typeof body === 'object' && !Array.isArray(body)
    ? { ...(body as Record<string, unknown>), functionVersion: FUNCTION_VERSION }
    : body
  return Response.json(responseBody, { status, headers: corsHeaders })
}

function secureEqual(left: string, right: string): boolean {
  const a = encoder.encode(left)
  const b = encoder.encode(right)
  if (a.length !== b.length) return false

  let diff = 0
  for (let index = 0; index < a.length; index += 1) {
    diff |= a[index] ^ b[index]
  }
  return diff === 0
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

const MOTIVATIONAL_PHRASES = [
  'Small steps every day lead to big progress. ✨',
  'You are building confidence one task at a time. 💪',
  'Consistency beats intensity — keep going! 🌟',
  'A little practice today makes tomorrow easier. 🚀',
  'Progress comes from practice, not perfection. 🌱',
  'Every exercise is another step forward. 🎯',
  'Keep showing up — your English is getting stronger. 💫',
  'One focused session can make a real difference. 📈',
  'Practice, notice, improve — you have got this! 🙌',
  'The more you use English, the more natural it becomes. 🌍',
  'Challenge yourself a little today and grow a lot over time. 🔥',
  'Your future fluency is built from today’s practice. ⭐',
]

function pickMotivationalPhrase(seed: string): string {
  const lessonNumber = Number(seed.match(/lesson-(\d+)/i)?.[1] || 0)
  const version = Number(seed.match(/:(\d+)$/)?.[1] || 1)
  if (lessonNumber > 0) {
    return MOTIVATIONAL_PHRASES[(lessonNumber + version - 2) % MOTIVATIONAL_PHRASES.length]
  }

  let hash = 0
  for (const character of seed) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0
  return MOTIVATIONAL_PHRASES[Math.abs(hash) % MOTIVATIONAL_PHRASES.length]
}

function buildMaterialMessage(homework: any, hasVocabulary: boolean, motivationSeed: string): string {
  const topic = escapeHtml(homework?.topic || homework?.title || homework?.id || 'Homework')
  const guidance = hasVocabulary
    ? 'Review the vocabulary first, then complete the homework.'
    : 'Your new homework assignment is ready.'

  return [
    '📚 <b>New homework assignment</b>',
    '',
    `📝 <b>Homework topic:</b> ${topic}`,
    '',
    guidance,
    'If you have any questions, note them down and we can discuss them in class.',
    '',
    `💫 ${pickMotivationalPhrase(motivationSeed)}`,
  ].join('\n')
}

function buildHomeworkReport(row: any): string {
  const correct = Number(row.score_correct || 0)
  const total = Number(row.score_total || 0)
  const percent = Number(row.score_percent ?? (total > 0 ? Math.round((correct / total) * 100) : 0))
  const mistakes = Math.max(0, total - correct)
  const submittedAt = row.submitted_at || row.updated_at || row.checked_at
  const submittedLabel = submittedAt
    ? new Date(submittedAt).toLocaleString('en-GB', { timeZone: 'Asia/Yekaterinburg' })
    : 'Not available'

  return [
    '✅ <b>Homework submitted</b>',
    '',
    `📝 <b>Homework topic:</b> ${escapeHtml(row.lesson_title || row.lesson_id)}`,
    `📊 Score: <b>${correct} / ${total} (${percent}%)</b>`,
    `❌ Mistakes: <b>${mistakes}</b>`,
    `🕒 Submitted: ${escapeHtml(submittedLabel)}`,
  ].join('\n')
}

async function sendTelegramMessage(
  token: string,
  chatId: number,
  text: string,
  inlineKeyboard: Array<Array<{ text: string; url: string }>> = [],
) {
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    message_thread_id: TELEGRAM_MESSAGE_THREAD_ID,
    text,
    parse_mode: 'HTML',
  }
  if (inlineKeyboard.length) payload.reply_markup = { inline_keyboard: inlineKeyboard }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.ok) {
    const description = result?.description || `Telegram HTTP ${response.status}`
    throw new Error(description)
  }

  return result.result
}

async function getRecipient(ctx: any, studentId: string) {
  const { data: recipient, error } = await ctx.supabaseAdmin
    .from('telegram_recipients')
    .select('chat_id, enabled')
    .eq('student_id', studentId)
    .maybeSingle()

  if (error) throw error
  if (!recipient || !recipient.enabled) {
    const notFound = new Error('Telegram recipient is not connected or is disabled')
    ;(notFound as any).status = 404
    throw notFound
  }
  return recipient
}

async function handleHomeworkReport(payload: any, ctx: any, botToken: string) {
  const studentId = typeof payload.studentId === 'string' ? payload.studentId.trim() : ''
  const lessonId = typeof payload.lessonId === 'string' ? payload.lessonId.trim() : ''
  const lessonUrl = isHttpUrl(payload.lessonUrl) ? payload.lessonUrl : ''

  if (!studentId || !lessonId) {
    return json({ ok: false, error: 'studentId and lessonId are required' }, 400)
  }

  let recipient
  try {
    recipient = await getRecipient(ctx, studentId)
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, (error as any)?.status || 500)
  }

  const { data: row, error: progressError } = await ctx.supabaseAdmin
    .from('homework_progress')
    .select('student_id, student_name, lesson_id, lesson_title, status, answers, score_correct, score_total, score_percent, checked_at, submitted_at, updated_at')
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  if (progressError) return json({ ok: false, error: progressError.message }, 500)
  if (!row || row.status !== 'submitted') {
    return json({ ok: false, error: 'The submitted homework row was not found in homework_progress' }, 409)
  }

  const submissionKey = String(row.submitted_at || row.updated_at || row.checked_at || '')
  if (!submissionKey) return json({ ok: false, error: 'The homework row has no submission timestamp' }, 409)

  const { data: existing, error: existingError } = await ctx.supabaseAdmin
    .from('homework_reports')
    .select('id, status, telegram_message_id')
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)
    .eq('submission_key', submissionKey)
    .maybeSingle()

  if (existingError) return json({ ok: false, error: existingError.message }, 500)
  if (existing?.status === 'sent') {
    return json({
      ok: true,
      skipped: true,
      reason: 'already_sent',
      telegramMessageId: existing.telegram_message_id,
    })
  }

  let reportId = existing?.id as string | undefined
  const reportRow = {
    student_id: studentId,
    lesson_id: lessonId,
    submission_key: submissionKey,
    status: 'pending',
    score_correct: row.score_correct,
    score_total: row.score_total,
    score_percent: row.score_percent,
    payload: row,
    error_message: null,
  }

  if (reportId) {
    const { error } = await ctx.supabaseAdmin.from('homework_reports').update(reportRow).eq('id', reportId)
    if (error) return json({ ok: false, error: error.message }, 500)
  } else {
    const { data: created, error } = await ctx.supabaseAdmin
      .from('homework_reports')
      .insert(reportRow)
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') return json({ ok: true, skipped: true, reason: 'already_claimed' })
      return json({ ok: false, error: error.message }, 500)
    }
    reportId = created.id
  }

  const keyboard = lessonUrl
    ? [[{ text: '📝 Open homework', url: lessonUrl }]]
    : []

  try {
    const telegramMessage = await sendTelegramMessage(
      botToken,
      Number(recipient.chat_id),
      buildHomeworkReport(row),
      keyboard,
    )

    const { error: updateError } = await ctx.supabaseAdmin
      .from('homework_reports')
      .update({
        status: 'sent',
        telegram_message_id: telegramMessage.message_id,
        sent_at: new Date().toISOString(),
        error_message: null,
      })
      .eq('id', reportId)

    if (updateError) throw new Error(`Telegram sent, but report log update failed: ${updateError.message}`)

    return json({ ok: true, skipped: false, telegramMessageId: telegramMessage.message_id })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await ctx.supabaseAdmin
      .from('homework_reports')
      .update({ status: 'failed', error_message: message })
      .eq('id', reportId)
    return json({ ok: false, error: message }, 502)
  }
}

async function handleMaterialNotification(payload: any, req: Request, ctx: any, botToken: string) {
  const expectedSecret = Deno.env.get('NOTIFY_WEBHOOK_SECRET') ?? ''
  const actualSecret = req.headers.get('x-notify-secret') ?? ''
  if (!expectedSecret || !secureEqual(actualSecret, expectedSecret)) {
    return json({ ok: false, error: 'Unauthorized' }, 401)
  }

  const studentId = typeof payload.studentId === 'string' ? payload.studentId.trim() : ''
  const materialType = typeof payload.materialType === 'string' ? payload.materialType.trim() : ''
  const materialId = typeof payload.materialId === 'string' ? payload.materialId.trim() : ''
  const notificationVersion = Number(payload.notificationVersion)
  const homework = payload.homework
  const vocabulary = payload.vocabulary
  const grammar = Array.isArray(payload.grammar) ? payload.grammar : []

  if (!studentId || !materialType || !materialId || !Number.isInteger(notificationVersion) || notificationVersion < 1) {
    return json({ ok: false, error: 'Missing or invalid notification identity' }, 400)
  }
  if (!homework || !isHttpUrl(homework.url)) return json({ ok: false, error: 'A valid homework URL is required' }, 400)
  if (vocabulary && !isHttpUrl(vocabulary.url)) return json({ ok: false, error: 'Invalid vocabulary URL' }, 400)
  for (const item of grammar) {
    if (!item || !isHttpUrl(item.url)) return json({ ok: false, error: 'Invalid grammar URL' }, 400)
  }

  let recipient
  try {
    recipient = await getRecipient(ctx, studentId)
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : String(error) }, (error as any)?.status || 500)
  }

  const { data: existing, error: existingError } = await ctx.supabaseAdmin
    .from('material_publications')
    .select('id, status, telegram_message_id')
    .eq('student_id', studentId)
    .eq('material_type', materialType)
    .eq('material_id', materialId)
    .eq('notification_version', notificationVersion)
    .maybeSingle()

  if (existingError) return json({ ok: false, error: existingError.message }, 500)
  if (existing?.status === 'sent') {
    return json({ ok: true, skipped: true, reason: 'already_sent', telegramMessageId: existing.telegram_message_id })
  }

  let publicationId = existing?.id as string | undefined
  if (publicationId) {
    const { error } = await ctx.supabaseAdmin
      .from('material_publications')
      .update({ status: 'pending', payload, error_message: null })
      .eq('id', publicationId)
    if (error) return json({ ok: false, error: error.message }, 500)
  } else {
    const { data: created, error } = await ctx.supabaseAdmin
      .from('material_publications')
      .insert({
        student_id: studentId,
        material_type: materialType,
        material_id: materialId,
        notification_version: notificationVersion,
        status: 'pending',
        payload,
      })
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') return json({ ok: true, skipped: true, reason: 'already_claimed' })
      return json({ ok: false, error: error.message }, 500)
    }
    publicationId = created.id
  }

  const keyboard: Array<Array<{ text: string; url: string }>> = []
  if (vocabulary) keyboard.push([{ text: '📚 Open vocabulary', url: vocabulary.url }])
  keyboard.push([{ text: '📝 Open homework', url: homework.url }])
  grammar.forEach((item: any, index: number) => {
    const label = grammar.length === 1 ? '📐 Review grammar' : `📐 ${String(item.title || `Grammar ${index + 1}`).slice(0, 48)}`
    keyboard.push([{ text: label, url: item.url }])
  })

  try {
    const telegramMessage = await sendTelegramMessage(
      botToken,
      Number(recipient.chat_id),
      buildMaterialMessage(homework, Boolean(vocabulary), `${materialId}:${notificationVersion}`),
      keyboard,
    )

    const { error: updateError } = await ctx.supabaseAdmin
      .from('material_publications')
      .update({
        status: 'sent',
        telegram_message_id: telegramMessage.message_id,
        sent_at: new Date().toISOString(),
        error_message: null,
      })
      .eq('id', publicationId)

    if (updateError) throw new Error(`Telegram sent, but log update failed: ${updateError.message}`)
    return json({ ok: true, skipped: false, telegramMessageId: telegramMessage.message_id })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await ctx.supabaseAdmin
      .from('material_publications')
      .update({ status: 'failed', error_message: message })
      .eq('id', publicationId)
    return json({ ok: false, error: message }, 502)
  }
}


function diagnosticsApiKey(req: Request): string {
  const direct = req.headers.get('apikey') ?? ''
  if (direct) return direct.trim()
  const authorization = req.headers.get('authorization') ?? ''
  return authorization.replace(/^Bearer\s+/i, '').trim()
}

function isDiagnosticsAuthorized(req: Request, studentId: string): boolean {
  if (studentId !== DIAGNOSTIC_STUDENT_ID) return false
  const expected = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  const actual = diagnosticsApiKey(req)
  return Boolean(expected && actual && secureEqual(actual, expected))
}

async function telegramApi(token: string, method: string, body: Record<string, unknown> = {}) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const result = await response.json().catch(() => null)
    if (!response.ok || !result?.ok) {
      return { ok: false, error: result?.description || `Telegram HTTP ${response.status}` }
    }
    return { ok: true, result: result.result }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}

async function diagnosticHealth(studentId: string, ctx: any, botToken: string) {
  let staleDiagnosticProbesRemoved = 0
  let database: any = { ok: false, homeworkRows: 0, staleDiagnosticProbesRemoved: 0, suspiciousHomework: [] }

  try {
    const { data: probes, error: probesError } = await ctx.supabaseAdmin
      .from('homework_progress')
      .select('lesson_id')
      .eq('student_id', studentId)
      .like('lesson_id', '__diagnostic_probe__%')

    if (probesError) throw probesError
    const probeIds = (probes || []).map((row: any) => String(row.lesson_id || '')).filter(Boolean)
    if (probeIds.length) {
      const { error: cleanupError } = await ctx.supabaseAdmin
        .from('homework_progress')
        .delete()
        .eq('student_id', studentId)
        .in('lesson_id', probeIds)
      if (cleanupError) throw cleanupError
      staleDiagnosticProbesRemoved = probeIds.length
    }

    const { data: homeworkRows, error: homeworkError } = await ctx.supabaseAdmin
      .from('homework_progress')
      .select('lesson_id,status,score_correct,score_total,submitted_at')
      .eq('student_id', studentId)

    if (homeworkError) throw homeworkError
    const rows = homeworkRows || []
    database = {
      ok: true,
      homeworkRows: rows.length,
      staleDiagnosticProbesRemoved,
      suspiciousHomework: rows
        .filter((row: any) => !['checked', 'submitted'].includes(String(row.status || '')))
        .map((row: any) => String(row.lesson_id || 'unknown')),
    }
  } catch (error) {
    database = {
      ok: false,
      homeworkRows: 0,
      staleDiagnosticProbesRemoved,
      suspiciousHomework: [],
      error: error instanceof Error ? error.message : String(error),
    }
  }

  let reportLog: any = { ok: true, pendingOrFailed: [] }
  try {
    const { data: reportRows, error: reportError } = await ctx.supabaseAdmin
      .from('homework_reports')
      .select('lesson_id,status,error_message')
      .eq('student_id', studentId)
      .limit(30)

    if (reportError) throw reportError
    reportLog = {
      ok: true,
      pendingOrFailed: (reportRows || [])
        .filter((row: any) => String(row.status || '') !== 'sent')
        .map((row: any) => ({
          lessonId: String(row.lesson_id || 'unknown'),
          status: String(row.status || 'unknown'),
          error: row.error_message || null,
        })),
    }
  } catch (error) {
    reportLog = { ok: false, pendingOrFailed: [], error: error instanceof Error ? error.message : String(error) }
  }

  let recipientInfo: any = { ok: false, enabled: false, source: 'telegram_recipients + edge constant', threadId: TELEGRAM_MESSAGE_THREAD_ID }
  let recipient: any = null
  try {
    recipient = await getRecipient(ctx, studentId)
    recipientInfo = {
      ok: true,
      enabled: Boolean(recipient.enabled),
      source: 'telegram_recipients + edge constant',
      threadId: TELEGRAM_MESSAGE_THREAD_ID,
    }
  } catch (error) {
    recipientInfo = {
      ...recipientInfo,
      error: error instanceof Error ? error.message : String(error),
    }
  }

  const botCheck = await telegramApi(botToken, 'getMe')
  const chatCheck = recipient
    ? await telegramApi(botToken, 'getChat', { chat_id: Number(recipient.chat_id) })
    : { ok: false, error: 'Recipient is not configured' }

  return json({
    ok: true,
    diagnosticVersion: DIAGNOSTIC_VERSION,
    database,
    reportLog,
    recipient: recipientInfo,
    telegram: {
      bot: botCheck.ok
        ? { ok: true, username: botCheck.result?.username || null, id: botCheck.result?.id || null }
        : { ok: false, error: botCheck.error || 'getMe failed' },
      chat: chatCheck.ok
        ? { ok: true, type: chatCheck.result?.type || null, title: chatCheck.result?.title || null }
        : { ok: false, error: chatCheck.error || 'getChat failed' },
    },
  })
}

async function diagnosticHomeworkProbe(payload: any, ctx: any) {
  const studentId = String(payload.studentId || '').trim()
  const lessonId = String(payload.lessonId || '').trim()
  if (!lessonId.startsWith('__diagnostic_probe__')) {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: 'Invalid diagnostic lessonId' }, 400)
  }

  const { data: before, error: beforeError } = await ctx.supabaseAdmin
    .from('homework_progress')
    .select('lesson_id,status,checked_at,submitted_at')
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  if (beforeError) return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: beforeError.message }, 500)
  if (!before) return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: 'Browser diagnostic row was not found' }, 404)
  if (String(before.status || '') !== 'checked') {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: `Expected status=checked, got ${before.status || 'NULL'}` }, 409)
  }

  const submittedAt = new Date().toISOString()
  const { error: updateError } = await ctx.supabaseAdmin
    .from('homework_progress')
    .update({ status: 'submitted', submitted_at: submittedAt })
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)

  if (updateError) return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: updateError.message }, 500)

  const { data: after, error: afterError } = await ctx.supabaseAdmin
    .from('homework_progress')
    .select('lesson_id,status,submitted_at')
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  if (afterError) return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: afterError.message }, 500)
  if (!after || String(after.status || '') !== 'submitted' || !after.submitted_at) {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: 'Server update to submitted was not persisted' }, 409)
  }

  const { error: deleteError } = await ctx.supabaseAdmin
    .from('homework_progress')
    .delete()
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)

  if (deleteError) return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: deleteError.message }, 500)

  return json({
    ok: true,
    diagnosticVersion: DIAGNOSTIC_VERSION,
    stages: {
      browserWrite: 'checked',
      serverTransition: 'submitted',
      cleanup: 'deleted',
    },
  })
}

async function diagnosticCleanupProbe(payload: any, ctx: any) {
  const studentId = String(payload.studentId || '').trim()
  const lessonId = String(payload.lessonId || '').trim()
  if (!lessonId.startsWith('__diagnostic_probe__')) {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: 'Invalid diagnostic lessonId' }, 400)
  }
  const { error } = await ctx.supabaseAdmin
    .from('homework_progress')
    .delete()
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)
  if (error) return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: error.message }, 500)
  return json({ ok: true, diagnosticVersion: DIAGNOSTIC_VERSION })
}

async function diagnosticSendReport(studentId: string, ctx: any, botToken: string, pageUrl: unknown) {
  const now = Date.now()
  const cooldownMs = 30_000
  if (lastDiagnosticTelegramSendAt && now - lastDiagnosticTelegramSendAt < cooldownMs) {
    const retryAfterSeconds = Math.max(1, Math.ceil((cooldownMs - (now - lastDiagnosticTelegramSendAt)) / 1000))
    return json({
      ok: true,
      diagnosticVersion: DIAGNOSTIC_VERSION,
      skipped: true,
      retryAfterSeconds,
      threadId: TELEGRAM_MESSAGE_THREAD_ID,
    })
  }

  let recipient
  try {
    recipient = await getRecipient(ctx, studentId)
  } catch (error) {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: error instanceof Error ? error.message : String(error) }, (error as any)?.status || 500)
  }

  const source = isHttpUrl(pageUrl) ? String(pageUrl) : 'diagnostics.html'
  const text = [
    '🧪 <b>Kristina diagnostics test</b>',
    '',
    '✅ Telegram connection is working.',
    `🧵 Topic: <b>${TELEGRAM_MESSAGE_THREAD_ID}</b>`,
    `🌐 Source: ${escapeHtml(source)}`,
  ].join('\n')

  try {
    const telegramMessage = await sendTelegramMessage(botToken, Number(recipient.chat_id), text)
    lastDiagnosticTelegramSendAt = now
    return json({
      ok: true,
      diagnosticVersion: DIAGNOSTIC_VERSION,
      skipped: false,
      telegramMessageId: telegramMessage.message_id,
      threadId: TELEGRAM_MESSAGE_THREAD_ID,
    })
  } catch (error) {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: error instanceof Error ? error.message : String(error) }, 502)
  }
}

async function handleDiagnostics(payload: any, req: Request, ctx: any, botToken: string) {
  const studentId = typeof payload.studentId === 'string' ? payload.studentId.trim().toLowerCase() : ''
  if (!isDiagnosticsAuthorized(req, studentId)) {
    return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: 'Unauthorized diagnostics request' }, 401)
  }

  switch (payload.kind) {
    case 'diagnostics_health':
      return diagnosticHealth(studentId, ctx, botToken)
    case 'diagnostics_homework_probe':
      return diagnosticHomeworkProbe(payload, ctx)
    case 'diagnostics_cleanup_probe':
      return diagnosticCleanupProbe(payload, ctx)
    case 'diagnostics_send_report':
      return diagnosticSendReport(studentId, ctx, botToken, payload.pageUrl)
    default:
      return json({ ok: false, diagnosticVersion: DIAGNOSTIC_VERSION, error: 'Unknown diagnostics request' }, 400)
  }
}

export default {
  fetch: withSupabase({ auth: 'none' }, async (req, ctx) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
    if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)

    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN') ?? ''
    if (!botToken) return json({ ok: false, error: 'TELEGRAM_BOT_TOKEN is not configured' }, 500)

    let payload: any
    try {
      payload = await req.json()
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400)
    }

    if (typeof payload?.kind === 'string' && payload.kind.startsWith('diagnostics_')) {
      return handleDiagnostics(payload, req, ctx, botToken)
    }
    if (payload?.eventType === 'homework_report') {
      return handleHomeworkReport(payload, ctx, botToken)
    }
    return handleMaterialNotification(payload, req, ctx, botToken)
  }),
}
