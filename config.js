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
