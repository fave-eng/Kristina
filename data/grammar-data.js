/**
 * Опубликованные грамматические темы.
 */
window.GRAMMAR_DATA = [
  {
    id: "grammar-pronouns",
    order: 1,
    title: "Pronouns: subject, object and possessive forms",
    level: "B1",
    status: "available",
    page: "grammar-topic.html?id=grammar-pronouns",
    passed: false,
    attempts: 0,
    explanation: "Местоимения в английском меняют форму в зависимости от функции в предложении. Чтобы быстро ориентироваться, задай себе три вопроса: кто делает действие, на кого направлено действие и чей это предмет. Отдельно запомни порядок слов с to / for, когда в предложении два дополнения.",
    formula: "subject pronoun + verb · verb / preposition + object pronoun · possessive adjective + noun · possessive pronoun (without a noun) · verb + thing + to / for + person",
    glanceCards: [
      {
        icon: "👤",
        label: "Subject pronoun",
        hint: "кто делает действие",
        pattern: "I / you / he / she / it / we / they",
        example: "She works from home."
      },
      {
        icon: "🎯",
        label: "Object pronoun",
        hint: "на кого направлено действие",
        pattern: "me / you / him / her / it / us / them",
        example: "I can see them."
      },
      {
        icon: "👜",
        label: "Possessive adjective",
        hint: "ставим перед существительным",
        pattern: "my / your / his / her / its / our / their",
        example: "Her laptop is new."
      },
      {
        icon: "🏷️",
        label: "Possessive pronoun",
        hint: "заменяет всё словосочетание",
        pattern: "mine / yours / his / hers / ours / theirs",
        example: "This seat is ours."
      }
    ],
    anchorLinks: [
      { id: "grammar-at-a-glance", title: "Быстрый обзор" },
      { id: "grammar-tables", title: "Таблицы" },
      { id: "grammar-examples", title: "Примеры" },
      { id: "grammar-mistakes", title: "Ошибки" },
      { id: "grammar-practice-section", title: "Практика" }
    ],
    miniRules: [
      {
        title: "1. Ask “Who?”",
        text: "Если слово отвечает на вопрос «кто?» и стоит перед глаголом, обычно нужен subject pronoun.",
        example: "They live in Warsaw."
      },
      {
        title: "2. Ask “Whom?” or “to whom?”",
        text: "После глагола или предлога используем object pronoun.",
        example: "I spoke to her after class."
      },
      {
        title: "3. Check the noun",
        text: "Если после формы идёт существительное, нужен possessive adjective. Если существительного нет — possessive pronoun.",
        example: "My notes are here. Yours are on the desk."
      },
      {
        title: "4. Remember to / for",
        text: "Когда предмет заменён местоимением it / them, ставим it / them + to / for + person.",
        example: "Send it to me. Buy them for us."
      }
    ],
    tables: [
      {
        title: "Main forms",
        headers: [
          "Meaning",
          "Subject",
          "Object",
          "Before a noun",
          "Without a noun"
        ],
        rows: [
          ["I", "I", "me", "my", "mine"],
          ["you", "you", "you", "your", "yours"],
          ["he", "he", "him", "his", "his"],
          ["she", "she", "her", "her", "hers"],
          ["it", "it", "it", "its", "—"],
          ["we", "we", "us", "our", "ours"],
          ["they", "they", "them", "their", "theirs"]
        ]
      },
      {
        title: "Word order with two objects",
        headers: ["Pattern", "Use it when…", "Example"],
        rows: [
          ["give me the book", "both objects are nouns / a person comes first", "She showed us her photos."],
          ["give the book to me", "you want to stress the thing or the person", "He sent the email to me."],
          ["give it to me", "the thing is a pronoun", "Please give it to me."],
          ["buy it for her", "verbs like buy / make / get", "I bought it for her."],
          ["read it to them", "verbs like give / send / show / lend / sell / read", "She read it to them."]
        ]
      }
    ],
    exampleGroups: [
      {
        title: "Compare the forms",
        items: [
          "He called me after the meeting.",
          "My manager sent me a message, but hers didn’t reply.",
          "Their office is in the city centre, and ours is near the station."
        ]
      },
      {
        title: "Spot the difference",
        items: [
          "This is my charger. — The charger is mine.",
          "We invited them to our house. — They invited us to theirs.",
          "Can you show me your ticket? — Sorry, I can’t find mine."
        ]
      },
      {
        title: "to / for in context",
        items: [
          "Could you send it to him before lunch?",
          "I made a playlist for you.",
          "Our teacher read the email to us."
        ]
      }
    ],
    commonMistakes: [
      "me car ✗ → my car ✓. Перед существительным нужен possessive adjective.",
      "with she ✗ → with her ✓. После предлога используем object pronoun.",
      "give me it ✗ → give it to me ✓. Если предмет — местоимение, нужен порядок it + to / for + person.",
      "its laptop = его/её у предмета или животного, а it’s = it is / it has.",
      "their / there / they’re — это три разные формы: притяжательное, место и сокращение от they are."
    ],
    exercises: [
      {
        type: "exercise",
        title: "Choose the correct form",
        difficulty: "Easy",
        instructions: "Выбери правильное местоимение. Сначала определи функцию слова в предложении.",
        items: [
          {
            id: "1",
            input: "single",
            prompt: "My sister is a doctor. ___ works at a private clinic.",
            options: ["She", "Her", "Hers", "Herself"],
            answer: 0,
            explanation: "Перед глаголом works нужно местоимение-подлежащее: She."
          },
          {
            id: "2",
            input: "single",
            prompt: "I know Olivia, but I don’t know ___.",
            options: ["she", "hers", "her", "their"],
            answer: 2,
            explanation: "После know нужна объектная форма her."
          },
          {
            id: "3",
            input: "single",
            prompt: "Is this Ben’s jacket? — No, ___ is on the chair.",
            options: ["his", "him", "he", "her"],
            answer: 0,
            explanation: "His заменяет his jacket, поэтому существительное не нужно."
          },
          {
            id: "4",
            input: "single",
            prompt: "We finished ___ project yesterday.",
            options: ["we", "our", "ours", "us"],
            answer: 1,
            explanation: "Перед существительным project ставим our."
          }
        ]
      },
      {
        type: "exercise",
        title: "Complete the sentence",
        difficulty: "Medium",
        instructions: "Впиши правильную форму местоимения. Обрати внимание на слова после пропуска.",
        wordBank: ["them", "your", "mine", "us", "their"],
        items: [
          {
            id: "1",
            input: "gaps",
            prompt: "Fill in the gaps.",
            segments: ["Can you help ", " with ", " homework?"],
            answers: [["us"], ["our"]],
            explanation: "Help us = помочь нам; our homework = наше домашнее задание."
          },
          {
            id: "2",
            input: "gaps",
            prompt: "Fill in the gaps.",
            segments: ["These bags are ", ". Those over there are ", "."],
            answers: [["their"], ["mine"]],
            explanation: "Their bags — перед существительным; mine — без существительного."
          },
          {
            id: "3",
            input: "gaps",
            prompt: "Fill in the gaps.",
            segments: ["I invited Jake and Eva, but they didn’t answer ", "."],
            answers: [["me"]],
            explanation: "После answer нужна объектная форма me."
          },
          {
            id: "4",
            input: "gaps",
            prompt: "Fill in the gaps.",
            segments: ["Is this ", " seat, or should I take another one?"],
            answers: [["your"]],
            explanation: "Перед существительным seat нужна форма your."
          }
        ]
      },
      {
        type: "exercise",
        title: "Choose the correct sentence",
        difficulty: "Medium → Hard",
        instructions: "Теперь проверь порядок слов с двумя дополнениями и выбор to / for.",
        items: [
          {
            id: "1",
            input: "single",
            prompt: "Choose the correct sentence.",
            options: [
              "Could you send me it tonight?",
              "Could you send it to me tonight?",
              "Could you send to me it tonight?",
              "Could you it send to me tonight?"
            ],
            answer: 1,
            explanation: "Когда предмет — местоимение it, нужен порядок it + to + person."
          },
          {
            id: "2",
            input: "single",
            prompt: "Choose the correct sentence.",
            options: [
              "I bought for her a coffee.",
              "I bought her it a coffee.",
              "I bought a coffee for her.",
              "I bought to her a coffee."
            ],
            answer: 2,
            explanation: "С buy обычно используем for: bought a coffee for her."
          },
          {
            id: "3",
            input: "single",
            prompt: "Choose the correct sentence.",
            options: [
              "The guide showed them the way.",
              "The guide showed to them the way.",
              "The guide showed the way them.",
              "The guide showed them to the way."
            ],
            answer: 0,
            explanation: "Оба дополнения — существительное и местоимение лица; естественный порядок: showed them the way."
          },
          {
            id: "4",
            input: "single",
            prompt: "Choose the correct sentence.",
            options: [
              "She read us it.",
              "She read it for us.",
              "She read it to us.",
              "She read to us it."
            ],
            answer: 2,
            explanation: "С read в значении «читать кому-то» используем to."
          }
        ]
      },
      {
        type: "exercise",
        title: "Correct the mistake",
        difficulty: "Hard",
        instructions: "Перепиши предложения правильно. Пиши полную исправленную версию.",
        items: [
          {
            id: "1",
            input: "text",
            prompt: "Correct the sentence: Me and Anna are working on this report.",
            placeholder: "Write the correct sentence",
            acceptedAnswers: ["Anna and I are working on this report", "Anna and I are working on this report."],
            explanation: "В роли подлежащего используем I, а не me; вежливее ставить Anna первой."
          },
          {
            id: "2",
            input: "text",
            prompt: "Correct the sentence: Please send me them before 5 p.m.",
            placeholder: "Write the correct sentence",
            acceptedAnswers: ["Please send them to me before 5 p.m.", "Please send them to me before 5 pm", "Please send them to me before 5 p.m", "Please send them to me before 5pm"],
            explanation: "Them — местоимение-предмет, поэтому порядок: them + to me."
          },
          {
            id: "3",
            input: "text",
            prompt: "Correct the sentence: This desk is her.",
            placeholder: "Write the correct sentence",
            acceptedAnswers: ["This desk is hers.", "This desk is hers"],
            explanation: "После be без существительного нужна форма hers."
          },
          {
            id: "4",
            input: "text",
            prompt: "Correct the sentence: I bought it to my brother for his birthday.",
            placeholder: "Write the correct sentence",
            acceptedAnswers: ["I bought it for my brother for his birthday.", "I bought it for my brother for his birthday"],
            explanation: "С buy используем for, а не to."
          }
        ]
      }
    ]
  }
];
