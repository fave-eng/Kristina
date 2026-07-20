/**
 * Опубликованные грамматические темы.
 */
window.GRAMMAR_DATA = [
  {
    "id": "grammar-pronouns",
    "order": 1,
    "title": "Pronouns: subject, object and possessive forms",
    "level": "Intermediate Plus",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-pronouns",
    "passed": false,
    "attempts": 0,
    "explanation": "В английском местоимение меняет форму в зависимости от своей роли. Перед глаголом обычно ставим местоимение-подлежащее: I, you, he, she, it, we, they. После глагола или предлога используем объектную форму: me, you, him, her, it, us, them. Притяжательное прилагательное ставится перед существительным: my book, their tickets. Притяжательное местоимение заменяет всё словосочетание и употребляется без существительного: This book is mine. В конструкциях с двумя дополнениями возможны два порядка: give me the book или give the book to me. Когда предмет заменён местоимением it / them, нужен порядок give it to me, buy them for her.",
    "formula": "Subject pronoun + verb · verb / preposition + object pronoun · possessive adjective + noun · possessive pronoun (without a noun) · verb + thing + to / for + person",
    "affirmative": "I called him. She showed us her photos. Their car is new, but ours is older. He sold it to me. My mum made it for us.",
    "table": {
      "headers": [
        "Лицо",
        "Подлежащее",
        "Дополнение",
        "Перед существительным",
        "Без существительного"
      ],
      "rows": [
        [
          "1-е лицо, ед. ч.",
          "I",
          "me",
          "my",
          "mine"
        ],
        [
          "2-е лицо",
          "you",
          "you",
          "your",
          "yours"
        ],
        [
          "3-е лицо, муж.",
          "he",
          "him",
          "his",
          "his"
        ],
        [
          "3-е лицо, жен.",
          "she",
          "her",
          "her",
          "hers"
        ],
        [
          "Предмет / животное",
          "it",
          "it",
          "its",
          "—"
        ],
        [
          "1-е лицо, мн. ч.",
          "we",
          "us",
          "our",
          "ours"
        ],
        [
          "3-е лицо, мн. ч.",
          "they",
          "them",
          "their",
          "theirs"
        ]
      ]
    },
    "examples": [
      "His name is Tom. — His стоит перед существительным name.",
      "I always stay with her. — После предлога with нужна объектная форма her.",
      "I’ve forgotten mine. — Mine заменяет словосочетание my dictionary.",
      "They gave us their tickets. — Если оба дополнения являются существительными, лицо можно поставить перед предметом.",
      "My cousin sold it to me. — Если предмет выражен местоимением it / them, используем to / for.",
      "She bought them for you. — Buy, make и get обычно употребляются с for.",
      "He sent them to her. — Give, send, show, lend, sell и read обычно употребляются с to."
    ],
    "commonMistakes": [
      "Не говорим me car или mine car. Перед существительным нужно my car, а без существительного — mine.",
      "После предлога нельзя использовать форму подлежащего: with she ✗ → with her ✓.",
      "Не ставим объектные местоимения в порядке give me it ✗. Правильно: give it to me.",
      "Its — притяжательное прилагательное без апострофа. It’s означает it is или it has.",
      "После buy / make / get обычно используем for: buy it for her. После give / send / show / sell / read — to: send it to him."
    ],
    "quiz": [
      {
        "prompt": "My brother lives in London. I often stay with ___.",
        "options": [
          "he",
          "him",
          "his",
          "himself"
        ],
        "answer": 1,
        "explanation": "После with нужна объектная форма him."
      },
      {
        "prompt": "We have a new teacher. ___ name is Mrs Brown.",
        "options": [
          "She",
          "Her",
          "Hers",
          "Him"
        ],
        "answer": 1,
        "explanation": "Перед существительным name ставим притяжательное прилагательное her."
      },
      {
        "prompt": "This isn’t my umbrella. ___ is by the door.",
        "options": [
          "My",
          "Mine",
          "Me",
          "I"
        ],
        "answer": 1,
        "explanation": "Mine заменяет my umbrella."
      },
      {
        "prompt": "Emma and Ian invited ___ to their wedding.",
        "options": [
          "we",
          "our",
          "ours",
          "us"
        ],
        "answer": 3,
        "explanation": "После invited нужна объектная форма us."
      },
      {
        "prompt": "The children can’t find ___ gloves.",
        "options": [
          "they",
          "them",
          "their",
          "theirs"
        ],
        "answer": 2,
        "explanation": "Перед существительным gloves ставим their."
      },
      {
        "prompt": "Choose the correct sentence.",
        "options": [
          "My cousin sold me it.",
          "My cousin sold it to me.",
          "My cousin sold to me it.",
          "My cousin sold it me."
        ],
        "answer": 1,
        "explanation": "Когда предмет — местоимение it, используем it + to + person."
      },
      {
        "prompt": "I bought these flowers ___ my mum.",
        "options": [
          "to",
          "for",
          "at",
          "of"
        ],
        "answer": 1,
        "explanation": "С buy используем for."
      },
      {
        "prompt": "She read the story ___ the children.",
        "options": [
          "for",
          "to",
          "of",
          "from"
        ],
        "answer": 1,
        "explanation": "С read в значении «читать кому-то» используем to."
      },
      {
        "prompt": "Do you know where my keys are? I can’t find ___.",
        "options": [
          "they",
          "their",
          "them",
          "theirs"
        ],
        "answer": 2,
        "explanation": "Keys — множественное число; после find нужна объектная форма them."
      },
      {
        "prompt": "Our car is old, but ___ is new.",
        "options": [
          "their",
          "them",
          "they",
          "theirs"
        ],
        "answer": 3,
        "explanation": "Theirs заменяет their car и употребляется без существительного."
      },
      {
        "prompt": "Choose the correct sentence.",
        "options": [
          "She made for us it.",
          "She made us it.",
          "She made it for us.",
          "She made it to us."
        ],
        "answer": 2,
        "explanation": "С make используем предмет + for + person: made it for us."
      },
      {
        "prompt": "My grandmother is reading the story to Max. She is reading ___ to ___.",
        "options": [
          "it / him",
          "him / it",
          "it / he",
          "its / him"
        ],
        "answer": 0,
        "explanation": "Story → it; Max → him."
      }
    ]
  }
];
