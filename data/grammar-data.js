/**
 * Опубликованные грамматические темы.
 */
window.GRAMMAR_DATA = [
  {
    "id": "grammar-pronouns",
    "order": 1,
    "title": "Pronouns: subject, object and possessive forms",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-pronouns",
    "passed": false,
    "attempts": 0,
    "explanation": "Местоимения в английском меняют форму в зависимости от функции в предложении. Чтобы быстро ориентироваться, задай себе три вопроса: кто делает действие, на кого направлено действие и чей это предмет. Отдельно запомни порядок слов с to / for, когда в предложении два дополнения.",
    "formula": "subject pronoun + verb · verb / preposition + object pronoun · possessive adjective + noun · possessive pronoun (without a noun) · verb + thing + to / for + person",
    "glanceCards": [
      {
        "icon": "👤",
        "label": "Subject pronoun",
        "hint": "кто делает действие",
        "pattern": "I / you / he / she / it / we / they",
        "example": "She works from home."
      },
      {
        "icon": "🎯",
        "label": "Object pronoun",
        "hint": "на кого направлено действие",
        "pattern": "me / you / him / her / it / us / them",
        "example": "I can see them."
      },
      {
        "icon": "👜",
        "label": "Possessive adjective",
        "hint": "ставим перед существительным",
        "pattern": "my / your / his / her / its / our / their",
        "example": "Her laptop is new."
      },
      {
        "icon": "🏷️",
        "label": "Possessive pronoun",
        "hint": "заменяет всё словосочетание",
        "pattern": "mine / yours / his / hers / ours / theirs",
        "example": "This seat is ours."
      }
    ],
    "anchorLinks": [
      {
        "id": "grammar-at-a-glance",
        "title": "Быстрый обзор"
      },
      {
        "id": "grammar-tables",
        "title": "Таблицы"
      },
      {
        "id": "grammar-examples",
        "title": "Примеры"
      },
      {
        "id": "grammar-mistakes",
        "title": "Ошибки"
      },
      {
        "id": "grammar-practice-section",
        "title": "Практика"
      }
    ],
    "miniRules": [
      {
        "title": "1. Ask “Who?”",
        "text": "Если слово отвечает на вопрос «кто?» и стоит перед глаголом, обычно нужен subject pronoun.",
        "example": "They live in Warsaw."
      },
      {
        "title": "2. Ask “Whom?” or “to whom?”",
        "text": "После глагола или предлога используем object pronoun.",
        "example": "I spoke to her after class."
      },
      {
        "title": "3. Check the noun",
        "text": "Если после формы идёт существительное, нужен possessive adjective. Если существительного нет — possessive pronoun.",
        "example": "My notes are here. Yours are on the desk."
      },
      {
        "title": "4. Remember to / for",
        "text": "Когда предмет заменён местоимением it / them, ставим it / them + to / for + person.",
        "example": "Send it to me. Buy them for us."
      }
    ],
    "tables": [
      {
        "title": "Main forms",
        "headers": [
          "Meaning",
          "Subject",
          "Object",
          "Before a noun",
          "Without a noun"
        ],
        "rows": [
          [
            "I",
            "I",
            "me",
            "my",
            "mine"
          ],
          [
            "you",
            "you",
            "you",
            "your",
            "yours"
          ],
          [
            "he",
            "he",
            "him",
            "his",
            "his"
          ],
          [
            "she",
            "she",
            "her",
            "her",
            "hers"
          ],
          [
            "it",
            "it",
            "it",
            "its",
            "—"
          ],
          [
            "we",
            "we",
            "us",
            "our",
            "ours"
          ],
          [
            "they",
            "they",
            "them",
            "their",
            "theirs"
          ]
        ]
      },
      {
        "title": "Word order with two objects",
        "headers": [
          "Pattern",
          "Use it when…",
          "Example"
        ],
        "rows": [
          [
            "give me the book",
            "both objects are nouns / a person comes first",
            "She showed us her photos."
          ],
          [
            "give the book to me",
            "you want to stress the thing or the person",
            "He sent the email to me."
          ],
          [
            "give it to me",
            "the thing is a pronoun",
            "Please give it to me."
          ],
          [
            "buy it for her",
            "verbs like buy / make / get",
            "I bought it for her."
          ],
          [
            "read it to them",
            "verbs like give / send / show / lend / sell / read",
            "She read it to them."
          ]
        ]
      }
    ],
    "exampleGroups": [
      {
        "title": "Compare the forms",
        "items": [
          "He called me after the meeting.",
          "My manager sent me a message, but hers didn’t reply.",
          "Their office is in the city centre, and ours is near the station."
        ]
      },
      {
        "title": "Spot the difference",
        "items": [
          "This is my charger. — The charger is mine.",
          "We invited them to our house. — They invited us to theirs.",
          "Can you show me your ticket? — Sorry, I can’t find mine."
        ]
      },
      {
        "title": "to / for in context",
        "items": [
          "Could you send it to him before lunch?",
          "I made a playlist for you.",
          "Our teacher read the email to us."
        ]
      }
    ],
    "commonMistakes": [
      "me car ✗ → my car ✓. Перед существительным нужен possessive adjective.",
      "with she ✗ → with her ✓. После предлога используем object pronoun.",
      "give me it ✗ → give it to me ✓. Если предмет — местоимение, нужен порядок it + to / for + person.",
      "its laptop = его/её у предмета или животного, а it’s = it is / it has.",
      "their / there / they’re — это три разные формы: притяжательное, место и сокращение от they are."
    ],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the correct form",
        "difficulty": "Easy",
        "instructions": "Выбери правильное местоимение. Сначала определи функцию слова в предложении.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "My sister is a doctor. ___ works at a private clinic.",
            "options": [
              "She",
              "Her",
              "Hers",
              "Herself"
            ],
            "answer": 0,
            "explanation": "Перед глаголом works нужно местоимение-подлежащее: She."
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "I know Olivia, but I don’t know ___.",
            "options": [
              "she",
              "hers",
              "her",
              "their"
            ],
            "answer": 2,
            "explanation": "После know нужна объектная форма her."
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "Is this Ben’s jacket? — No, ___ is on the chair.",
            "options": [
              "his",
              "him",
              "he",
              "her"
            ],
            "answer": 0,
            "explanation": "His заменяет his jacket, поэтому существительное не нужно."
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "We finished ___ project yesterday.",
            "options": [
              "we",
              "our",
              "ours",
              "us"
            ],
            "answer": 1,
            "explanation": "Перед существительным project ставим our."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the sentence",
        "difficulty": "Medium",
        "instructions": "Впиши правильную форму местоимения. Обрати внимание на слова после пропуска.",
        "wordBank": [
          "them",
          "your",
          "mine",
          "us",
          "their"
        ],
        "items": [
          {
            "id": "1",
            "input": "gaps",
            "prompt": "Fill in the gaps.",
            "segments": [
              "Can you help ",
              " with ",
              " homework?"
            ],
            "answers": [
              [
                "us"
              ],
              [
                "our"
              ]
            ],
            "explanation": "Help us = помочь нам; our homework = наше домашнее задание."
          },
          {
            "id": "2",
            "input": "gaps",
            "prompt": "Fill in the gaps.",
            "segments": [
              "These bags are ",
              ". Those over there are ",
              "."
            ],
            "answers": [
              [
                "their"
              ],
              [
                "mine"
              ]
            ],
            "explanation": "Their bags — перед существительным; mine — без существительного."
          },
          {
            "id": "3",
            "input": "gaps",
            "prompt": "Fill in the gaps.",
            "segments": [
              "I invited Jake and Eva, but they didn’t answer ",
              "."
            ],
            "answers": [
              [
                "me"
              ]
            ],
            "explanation": "После answer нужна объектная форма me."
          },
          {
            "id": "4",
            "input": "gaps",
            "prompt": "Fill in the gaps.",
            "segments": [
              "Is this ",
              " seat, or should I take another one?"
            ],
            "answers": [
              [
                "your"
              ]
            ],
            "explanation": "Перед существительным seat нужна форма your."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Choose the correct sentence",
        "difficulty": "Medium → Hard",
        "instructions": "Теперь проверь порядок слов с двумя дополнениями и выбор to / for.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "Could you send me it tonight?",
              "Could you send it to me tonight?",
              "Could you send to me it tonight?",
              "Could you it send to me tonight?"
            ],
            "answer": 1,
            "explanation": "Когда предмет — местоимение it, нужен порядок it + to + person."
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "I bought for her a coffee.",
              "I bought her it a coffee.",
              "I bought a coffee for her.",
              "I bought to her a coffee."
            ],
            "answer": 2,
            "explanation": "С buy обычно используем for: bought a coffee for her."
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "The guide showed them the way.",
              "The guide showed to them the way.",
              "The guide showed the way them.",
              "The guide showed them to the way."
            ],
            "answer": 0,
            "explanation": "Оба дополнения — существительное и местоимение лица; естественный порядок: showed them the way."
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "She read us it.",
              "She read it for us.",
              "She read it to us.",
              "She read to us it."
            ],
            "answer": 2,
            "explanation": "С read в значении «читать кому-то» используем to."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Correct the mistake",
        "difficulty": "Hard",
        "instructions": "Перепиши предложения правильно. Пиши полную исправленную версию.",
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "Correct the sentence: Me and Anna are working on this report.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "Anna and I are working on this report",
              "Anna and I are working on this report."
            ],
            "explanation": "В роли подлежащего используем I, а не me; вежливее ставить Anna первой."
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Correct the sentence: Please send me them before 5 p.m.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "Please send them to me before 5 p.m.",
              "Please send them to me before 5 pm",
              "Please send them to me before 5 p.m",
              "Please send them to me before 5pm"
            ],
            "explanation": "Them — местоимение-предмет, поэтому порядок: them + to me."
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Correct the sentence: This desk is her.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "This desk is hers.",
              "This desk is hers"
            ],
            "explanation": "После be без существительного нужна форма hers."
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "Correct the sentence: I bought it to my brother for his birthday.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "I bought it for my brother for his birthday.",
              "I bought it for my brother for his birthday"
            ],
            "explanation": "С buy используем for, а не to."
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-2"
  },
  {
    "id": "grammar-adjective-suffixes",
    "order": 2,
    "title": "Adjective suffixes: -able, -ate, -ive, -ous, -ful",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-adjective-suffixes",
    "passed": false,
    "attempts": 0,
    "explanation": "Суффиксы помогают образовывать прилагательные от существительных и глаголов. Они часто подсказывают общее значение слова, но не всегда позволяют угадать точное написание. Поэтому полезно учить не отдельное слово, а целую word family: create → creative, success → successful, rely → reliable. Ниже — понятная карта пяти основных суффиксов из урока и правила, которые помогут выбирать форму быстрее.",
    "formula": "noun / verb + adjective suffix → adjective · ATTRACT → attractive · HELP → helpful",
    "glanceCards": [
      {
        "icon": "🧩",
        "label": "-able / -ible",
        "hint": "«можно…», «обладает качеством»",
        "pattern": "rely → reliable · response → responsible",
        "example": "She is reliable and responsible."
      },
      {
        "icon": "💛",
        "label": "-ate",
        "hint": "качество или отношение к людям",
        "pattern": "compassion → compassionate · affection → affectionate",
        "example": "He is a considerate colleague."
      },
      {
        "icon": "⚡",
        "label": "-ive",
        "hint": "склонность, характер, активное качество",
        "pattern": "create → creative · assert → assertive",
        "example": "She gave a creative solution."
      },
      {
        "icon": "✨",
        "label": "-ous",
        "hint": "обладающий заметным качеством",
        "pattern": "envy → envious · glamour → glamorous",
        "example": "The event looked glamorous."
      },
      {
        "icon": "🌟",
        "label": "-ful",
        "hint": "«полный…», «обладающий…»",
        "pattern": "help → helpful · power → powerful",
        "example": "That was very thoughtful of you."
      }
    ],
    "anchorLinks": [
      {
        "id": "grammar-at-a-glance",
        "title": "Суффиксы"
      },
      {
        "id": "grammar-rule-map",
        "title": "Как выбрать"
      },
      {
        "id": "grammar-tables",
        "title": "Таблицы"
      },
      {
        "id": "grammar-mistakes",
        "title": "Написание"
      },
      {
        "id": "grammar-practice-section",
        "title": "Практика"
      }
    ],
    "miniRules": [
      {
        "title": "1. Найди исходное слово",
        "text": "Определи, от какого существительного или глагола нужно образовать прилагательное: HELP, CREATE, ENVY.",
        "example": "HELP → helpful"
      },
      {
        "title": "2. Посмотри на смысл",
        "text": "-ful часто означает «обладающий качеством», -ive — склонность или активную черту, -ous — ярко выраженное качество.",
        "example": "powerful · creative · glamorous"
      },
      {
        "title": "3. Проверь написание основы",
        "text": "При добавлении суффикса окончание основы иногда меняется: rely → reliable, create → creative, glamour → glamorous.",
        "example": "rely → reliable"
      },
      {
        "title": "4. Учись через word families",
        "text": "Для -able / -ible нет одного надёжного правила. Запоминай форму вместе с исходным словом и примером.",
        "example": "response → responsible"
      }
    ],
    "tables": [
      {
        "title": "Meaning and common examples",
        "headers": [
          "Suffix",
          "General idea",
          "Examples from the lesson"
        ],
        "rows": [
          [
            "-able / -ible",
            "можно доверять / обладающий качеством",
            "reliable, lovable, responsible"
          ],
          [
            "-ate",
            "качество, отношение к людям",
            "compassionate, considerate, affectionate"
          ],
          [
            "-ive",
            "склонность, характер, действие",
            "attractive, assertive, creative, possessive, sensitive, impulsive"
          ],
          [
            "-ous",
            "ярко выраженное качество",
            "envious, rebellious, glamorous"
          ],
          [
            "-ful",
            "полный качества / обладающий им",
            "thoughtful, successful, helpful, powerful"
          ]
        ]
      },
      {
        "title": "Word families to remember",
        "headers": [
          "Base word",
          "Adjective",
          "Meaning"
        ],
        "rows": [
          [
            "attract",
            "attractive",
            "привлекательный"
          ],
          [
            "compassion",
            "compassionate",
            "сострадательный"
          ],
          [
            "assert",
            "assertive",
            "уверенный и прямой"
          ],
          [
            "thought",
            "thoughtful",
            "заботливый, внимательный"
          ],
          [
            "love",
            "lovable / loveable",
            "милый, вызывающий любовь"
          ],
          [
            "envy",
            "envious",
            "завистливый"
          ],
          [
            "success",
            "successful",
            "успешный"
          ],
          [
            "response",
            "responsible",
            "ответственный"
          ],
          [
            "impulse",
            "impulsive",
            "импульсивный"
          ],
          [
            "help",
            "helpful",
            "готовый помочь"
          ],
          [
            "rebel",
            "rebellious",
            "бунтарский"
          ],
          [
            "sense",
            "sensitive",
            "чувствительный"
          ],
          [
            "rely",
            "reliable",
            "надёжный"
          ],
          [
            "glamour",
            "glamorous",
            "гламурный, эффектный"
          ],
          [
            "power",
            "powerful",
            "сильный, влиятельный"
          ]
        ]
      }
    ],
    "exampleGroups": [
      {
        "title": "Personality and character",
        "items": [
          "Mia is assertive, but she is never rude.",
          "A reliable colleague does what they promise.",
          "Leo can be impulsive when he is stressed."
        ]
      },
      {
        "title": "Positive qualities",
        "items": [
          "It was thoughtful of you to call me.",
          "Our new assistant is helpful and responsible.",
          "She is a compassionate and considerate doctor."
        ]
      },
      {
        "title": "Appearance and impression",
        "items": [
          "The restaurant has a glamorous interior.",
          "He is a successful and powerful businessman.",
          "The main character is rebellious but lovable."
        ]
      }
    ],
    "commonMistakes": [
      "Не добавляй суффикс механически: response → responsable ✗. Правильно: responsible.",
      "rely → reliable: буква y меняется на i, а затем добавляется -able.",
      "create → creative и sense → sensitive: конечная e исчезает перед -ive.",
      "glamour → glamorous: в прилагательном пишем glamorous, без второй u.",
      "success → successful: сохраняем double s в основе, а в суффиксе -ful пишем только одну l.",
      "lovable и loveable — оба варианта возможны, но lovable встречается чаще."
    ],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the suffix",
        "difficulty": "Starter",
        "instructions": "Выбери суффикс, который образует правильное прилагательное.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "HELP → help___",
            "options": [
              "-ful",
              "-ous",
              "-ate",
              "-ible"
            ],
            "answer": 0,
            "explanation": "HELP → helpful."
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "CREATE → creat___",
            "options": [
              "-ous",
              "-ive",
              "-ful",
              "-able"
            ],
            "answer": 1,
            "explanation": "CREATE → creative. Конечная e исчезает."
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "GLAMOUR → glamour___",
            "options": [
              "-ate",
              "-ous",
              "-ful",
              "-ive"
            ],
            "answer": 1,
            "explanation": "GLAMOUR → glamorous."
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "COMPASSION → compassion___",
            "options": [
              "-ate",
              "-able",
              "-ful",
              "-ive"
            ],
            "answer": 0,
            "explanation": "COMPASSION → compassionate."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Build the adjective",
        "difficulty": "Easy",
        "instructions": "Образуй прилагательное от слова в скобках. Пиши только прилагательное.",
        "wordBank": [
          "reliable",
          "thoughtful",
          "possessive",
          "envious"
        ],
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "You can always trust Ben. He is very ___. (RELY)",
            "answer": "reliable",
            "explanation": "RELY → reliable."
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "It was very ___ of you to remember my birthday. (THOUGHT)",
            "answer": "thoughtful",
            "explanation": "THOUGHT → thoughtful."
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "He gets jealous easily and can be quite ___. (POSSESS)",
            "answer": "possessive",
            "explanation": "POSSESS → possessive."
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "She felt ___ when she saw her friend’s new apartment. (ENVY)",
            "answer": "envious",
            "explanation": "ENVY → envious."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the text",
        "difficulty": "Medium",
        "instructions": "Впиши правильные формы. Следи не только за суффиксом, но и за изменением основы.",
        "items": [
          {
            "id": "1",
            "input": "gaps",
            "prompt": "Complete the sentence.",
            "segments": [
              "Our team leader is both ",
              " and ",
              ", so people trust her decisions."
            ],
            "answers": [
              [
                "assertive"
              ],
              [
                "responsible"
              ]
            ],
            "explanation": "ASSERT → assertive; RESPONSE → responsible."
          },
          {
            "id": "2",
            "input": "gaps",
            "prompt": "Complete the sentence.",
            "segments": [
              "The designer is extremely ",
              ", and her latest collection looks very ",
              "."
            ],
            "answers": [
              [
                "creative"
              ],
              [
                "glamorous"
              ]
            ],
            "explanation": "CREATE → creative; GLAMOUR → glamorous."
          },
          {
            "id": "3",
            "input": "gaps",
            "prompt": "Complete the sentence.",
            "segments": [
              "Tom is usually ",
              ", but he can become ",
              " when he is tired."
            ],
            "answers": [
              [
                "helpful"
              ],
              [
                "impulsive"
              ]
            ],
            "explanation": "HELP → helpful; IMPULSE → impulsive."
          },
          {
            "id": "4",
            "input": "gaps",
            "prompt": "Complete the sentence.",
            "segments": [
              "The charity was very ",
              " because it had many ",
              " volunteers."
            ],
            "answers": [
              [
                "successful"
              ],
              [
                "compassionate"
              ]
            ],
            "explanation": "SUCCESS → successful; COMPASSION → compassionate."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Correct the word formation",
        "difficulty": "Hard",
        "instructions": "В каждом предложении прилагательное образовано неправильно. Перепиши предложение полностью.",
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "Correct the sentence: My new colleague is very relyable.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "My new colleague is very reliable.",
              "My new colleague is very reliable"
            ],
            "explanation": "RELY → reliable, не relyable."
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Correct the sentence: The hotel looked glamourous in the photos.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "The hotel looked glamorous in the photos.",
              "The hotel looked glamorous in the photos"
            ],
            "explanation": "Правильная форма: glamorous."
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Correct the sentence: She is a very successfull writer.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "She is a very successful writer.",
              "She is a very successful writer"
            ],
            "explanation": "Правильная форма: successful — один l в -ful."
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "Correct the sentence: He gave us a very create solution.",
            "placeholder": "Write the correct sentence",
            "acceptedAnswers": [
              "He gave us a very creative solution.",
              "He gave us a very creative solution"
            ],
            "explanation": "CREATE → creative."
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Word formation challenge",
        "difficulty": "Challenge · the hardest",
        "instructions": "Прочитай мини-текст и образуй подходящие прилагательные от слов в скобках. Подсказок и word bank нет: учитывай смысл и написание основы.",
        "items": [
          {
            "id": "1",
            "input": "gaps",
            "prompt": "Complete the profile.",
            "segments": [
              "Nora is a very ",
              " manager. Her team trusts her because she is ",
              " and always keeps her promises."
            ],
            "answers": [
              [
                "successful"
              ],
              [
                "reliable"
              ]
            ],
            "explanation": "SUCCESS → successful; RELY → reliable."
          },
          {
            "id": "2",
            "input": "gaps",
            "prompt": "Complete the profile.",
            "segments": [
              "She is also ",
              ": she listens carefully and gives people ",
              " advice."
            ],
            "answers": [
              [
                "compassionate"
              ],
              [
                "thoughtful"
              ]
            ],
            "explanation": "COMPASSION → compassionate; THOUGHT → thoughtful."
          },
          {
            "id": "3",
            "input": "gaps",
            "prompt": "Complete the profile.",
            "segments": [
              "Her presentations are highly ",
              ", but never too ",
              " or dramatic."
            ],
            "answers": [
              [
                "creative"
              ],
              [
                "glamorous"
              ]
            ],
            "explanation": "CREATE → creative; GLAMOUR → glamorous."
          },
          {
            "id": "4",
            "input": "gaps",
            "prompt": "Complete the profile.",
            "segments": [
              "When a decision is needed, Nora is ",
              " rather than ",
              ", so the team knows exactly what to do."
            ],
            "answers": [
              [
                "assertive"
              ],
              [
                "impulsive"
              ]
            ],
            "explanation": "ASSERT → assertive; IMPULSE → impulsive."
          },
          {
            "id": "5",
            "input": "text",
            "prompt": "Write one adjective: A person who understands other people’s feelings and reacts carefully is ______. (SENSE)",
            "placeholder": "Type the adjective",
            "answer": "sensitive",
            "explanation": "SENSE → sensitive. Конечная e исчезает перед -ive."
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-2"
  }
];
