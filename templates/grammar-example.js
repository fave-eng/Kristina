/**
 * ТЕХНИЧЕСКИЙ ПРИМЕР. Файл не подключён к ученическому сайту.
 */
window.GRAMMAR_TECHNICAL_EXAMPLE = {
  id: "grammar-example",
  order: 1,
  title: "Grammar topic title",
  level: "B1",
  status: "draft",
  page: "grammar-topic.html?id=grammar-example",
  passed: false,
  attempts: 0,
  explanation: "Короткое и понятное объяснение темы на русском языке.",
  formula: "Ключевая формула или структура",
  glanceCards: [
    {
      icon: "👀",
      label: "Key idea",
      hint: "когда используется",
      pattern: "pattern / form",
      example: "Short example sentence."
    }
  ],
  anchorLinks: [
    { id: "grammar-at-a-glance", title: "Быстрый обзор" },
    { id: "grammar-practice-section", title: "Практика" }
  ],
  miniRules: [
    {
      title: "Rule 1",
      text: "Короткая подсказка по правилу.",
      example: "Example"
    }
  ],
  tables: [
    {
      title: "Table title",
      headers: ["Column 1", "Column 2"],
      rows: [["Value 1", "Value 2"]]
    }
  ],
  exampleGroups: [
    {
      title: "Examples",
      items: ["First example.", "Second example."]
    }
  ],
  commonMistakes: ["Типичная ошибка и правильный вариант."],
  exercises: [
    {
      type: "exercise",
      title: "Exercise title",
      difficulty: "Easy",
      instructions: "Короткая инструкция.",
      items: []
    }
  ]
};
