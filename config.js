window.APP_CONFIG = {
  student: {
    id: "kristina",
    nameRu: "Кристина",
    nameEn: "Kristina",
    level: "B1",
    textbook: "English File",
    textbookEdition: "B1+ 4th edition"
  },

  supabase: {
    url: "",
    anonKey: "",
    authMode: "password",
    tables: {
      homework: "homework_progress",
      vocabulary: "vocabulary_progress",
      vocabularyTopics: "vocabulary_topic_progress",
      grammar: "grammar_progress"
    }
  },

  features: {
    homework: true,
    vocabulary: true,
    grammar: true,
    cloudSync: true,
    telegramNotifications: false
  }
};
  
These public values belong in the existing config.js if its Supabase fields are still empty:

supabase: {
  url: "https://svejqcrkxkiheucglikq.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZWpxY3JreGtpaGV1Y2dsaWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMTE5MDUsImV4cCI6MjA5OTU4NzkwNX0.UUX5_atNjuNdexdhrGQG24UgXLibOE9VgpNcQo3t3nw",
  authMode: "password",
  tables: {
    homework: "homework_progress",
    vocabulary: "vocabulary_progress",
    vocabularyTopics: "vocabulary_topic_progress",
    grammar: "grammar_progress"
  }
}

The anon/public key is not used by the Telegram Edge Function. Never put a service_role/secret key in config.js.
