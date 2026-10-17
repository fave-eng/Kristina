/**
 * Published grammar topics.
 * Explanations are structured as individual textbook-style chapters.
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
    "explanation": "Местоимение выбирается не по русскому переводу, а по роли слова в английском предложении: кто выполняет действие, на кого действие направлено, чей предмет назван и заменяет ли форма существительное целиком.",
    "formula": "Подлежащее: I / you / he / she / it / we / they · Дополнение: me / you / him / her / it / us / them · Перед существительным: my / your / his / her / its / our / their · Без существительного: mine / yours / his / hers / ours / theirs",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
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
    "linkedLessonId": "lesson-2",
    "chapter": [
      {
        "id": "pronoun-role-map",
        "type": "steps",
        "title": "Сначала определяем роль слова, потом выбираем форму",
        "intro": "В русском одна и та же идея часто выражается окончанием. В английском форма местоимения прямо показывает его функцию. Поэтому полезнее не переводить слово изолированно, а задать вопрос к его месту в предложении.",
        "items": [
          {
            "title": "1. Кто выполняет действие?",
            "text": "Если местоимение стоит перед сказуемым и является подлежащим, нужна форма subject pronoun.",
            "example": {
              "en": "[[She]] works with us.",
              "ru": "[[Она]] работает с нами."
            }
          },
          {
            "title": "2. На кого направлено действие?",
            "text": "После глагола или предлога используется object pronoun.",
            "example": {
              "en": "I called [[her]]. I spoke to [[her]].",
              "ru": "Я позвонил [[ей]]. Я поговорил с [[ней]]."
            }
          },
          {
            "title": "3. Чей предмет назван?",
            "text": "Если после формы сразу идёт существительное, выбираем possessive adjective.",
            "example": {
              "en": "This is [[my]] bag.",
              "ru": "Это [[моя]] сумка."
            }
          },
          {
            "title": "4. Существительное уже понятно и не повторяется?",
            "text": "Тогда используем possessive pronoun: оно заменяет сочетание «притяжательное слово + существительное».",
            "example": {
              "en": "This bag is [[mine]].",
              "ru": "Эта сумка [[моя]]."
            }
          }
        ]
      },
      {
        "id": "pronoun-table",
        "type": "table",
        "title": "Четыре основные формы в одной системе",
        "note": "Смотри по строке: лицо остаётся тем же, меняется только грамматическая функция.",
        "headers": [
          "Лицо",
          "Подлежащее",
          "Дополнение",
          "Перед существительным",
          "Самостоятельная форма"
        ],
        "rows": [
          [
            "я",
            "I",
            "me",
            "my",
            "mine"
          ],
          [
            "ты / вы",
            "you",
            "you",
            "your",
            "yours"
          ],
          [
            "он",
            "he",
            "him",
            "his",
            "his"
          ],
          [
            "она",
            "she",
            "her",
            "her",
            "hers"
          ],
          [
            "оно",
            "it",
            "it",
            "its",
            "—"
          ],
          [
            "мы",
            "we",
            "us",
            "our",
            "ours"
          ],
          [
            "они",
            "they",
            "them",
            "their",
            "theirs"
          ]
        ]
      },
      {
        "id": "pronoun-compare",
        "type": "compare",
        "title": "my или mine? her или hers? — главное различие",
        "columns": [
          {
            "title": "Перед существительным",
            "points": [
              "my, your, his, her, its, our, their сами предмет не заменяют.",
              "После них ожидается существительное."
            ],
            "examples": [
              {
                "en": "Where is [[your phone]]?",
                "ru": "Где [[твой телефон]]?"
              },
              {
                "en": "I like [[their idea]].",
                "ru": "Мне нравится [[их идея]]."
              }
            ]
          },
          {
            "title": "Без существительного",
            "points": [
              "mine, yours, his, hers, ours, theirs уже содержат значение предмета.",
              "После них существительное не ставится."
            ],
            "examples": [
              {
                "en": "This phone is [[yours]].",
                "ru": "Этот телефон [[твой]]."
              },
              {
                "en": "Their idea is better than [[ours]].",
                "ru": "Их идея лучше [[нашей]]."
              }
            ]
          }
        ]
      },
      {
        "id": "pronoun-two-objects",
        "type": "note",
        "title": "Два дополнения: порядок слов с to и for",
        "paragraphs": [
          "С глаголами give, send, show, lend, read возможны две модели: give [[me]] the book и give the book [[to me]]. Если предмет заменён местоимением it / them, безопасная и стандартная модель — give [[it to me]], а не give me it.",
          "С buy, make, get обычно используется for: I bought [[a ticket for her]]. — Я купил [[билет для неё]]."
        ],
        "examples": [
          {
            "en": "Please send [[it to him]].",
            "ru": "Пожалуйста, отправь [[это ему]]."
          },
          {
            "en": "She made [[some coffee for us]].",
            "ru": "Она приготовила [[нам кофе]]."
          }
        ]
      },
      {
        "id": "pronoun-common-errors",
        "type": "mistakes",
        "title": "Типичные ошибки",
        "items": [
          {
            "wrong": "with she",
            "right": "with her",
            "why": "После предлога нужна объектная форма."
          },
          {
            "wrong": "me car",
            "right": "my car",
            "why": "Перед существительным нужна притяжательная форма my."
          },
          {
            "wrong": "This book is my.",
            "right": "This book is mine.",
            "why": "Существительного после формы нет, значит нужна mine."
          },
          {
            "wrong": "give me it",
            "right": "give it to me",
            "why": "Когда предмет выражен it / them, ставим it / them перед to + person."
          },
          {
            "wrong": "it’s colour",
            "right": "its colour",
            "why": "its = притяжательная форма; it’s = it is / it has."
          }
        ]
      },
      {
        "id": "pronoun-context",
        "type": "examples",
        "title": "Как одна и та же идея меняет форму",
        "items": [
          {
            "en": "[[She]] sent [[me]] [[her]] notes because [[mine]] were incomplete.",
            "ru": "[[Она]] прислала [[мне]] [[свои]] конспекты, потому что [[мои]] были неполными.",
            "note": "she — подлежащее; me — дополнение; her — перед notes; mine заменяет my notes."
          },
          {
            "en": "We invited [[them]] to [[our]] house, and later they invited [[us]] to [[theirs]].",
            "ru": "Мы пригласили [[их]] к [[нам]] домой, а позже они пригласили [[нас]] к [[себе]]."
          }
        ]
      }
    ]
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
    "explanation": "Суффиксы -able, -ate, -ive, -ous и -ful помогают узнавать и образовывать прилагательные, но словообразование не является механической формулой: значение, написание и иногда произношение нужно проверять по конкретной word family.",
    "formula": "основа слова + суффикс → прилагательное: rely → reliable · consider → considerate · create → creative · danger → dangerous · help → helpful",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
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
              " (ASSERT) and ",
              " (RESPONSE), so people trust her decisions."
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
              " (CREATE), and her latest collection looks very ",
              " (GLAMOUR)."
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
              " (HELP), but he can become ",
              " (IMPULSE) when he is tired."
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
              " (SUCCESS) because it had many ",
              " (COMPASSION) volunteers."
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
              " (SUCCESS) manager. Her team trusts her because she is ",
              " (RELY) and always keeps her promises."
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
              " (COMPASSION): she listens carefully and gives people ",
              " (THOUGHT) advice."
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
              " (CREATE), but never too ",
              " (GLAMOUR) or dramatic."
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
              " (ASSERT) rather than ",
              " (IMPULSE), so the team knows exactly what to do."
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
    "linkedLessonId": "lesson-2",
    "chapter": [
      {
        "id": "suffixes-principle",
        "type": "note",
        "title": "Что важно понять до запоминания суффиксов",
        "paragraphs": [
          "Суффикс показывает, что слово часто является прилагательным, но не гарантирует точный перевод. Например, creative — «творческий», а sensitive — «чувствительный». Поэтому учим не «суффикс = перевод», а целую семью слов и типичное значение конкретного прилагательного.",
          "Некоторые основы меняют написание: rely → reliable, envy → envious. Это нормальная часть словообразования, а не исключение из грамматики, которое можно всегда вычислить."
        ]
      },
      {
        "id": "suffixes-family",
        "type": "table",
        "title": "Пять суффиксов: значение и типичные модели",
        "headers": [
          "Суффикс",
          "Что часто выражает",
          "Примеры",
          "Перевод"
        ],
        "rows": [
          [
            "-able",
            "возможность / свойство «можно…», «обладающий качеством»",
            "reliable, lovable",
            "надёжный, привлекательный / любимый"
          ],
          [
            "-ate",
            "качество или характеристику; суффикс встречается не только в прилагательных",
            "considerate, passionate",
            "внимательный к другим, страстный"
          ],
          [
            "-ive",
            "склонность, свойство, активное качество",
            "creative, impulsive, assertive",
            "творческий, импульсивный, уверенно отстаивающий своё мнение"
          ],
          [
            "-ous",
            "обладание качеством",
            "dangerous, envious, glamorous",
            "опасный, завистливый, эффектный"
          ],
          [
            "-ful",
            "«полный / обладающий…»",
            "helpful, thoughtful, successful",
            "полезный, заботливый, успешный"
          ]
        ]
      },
      {
        "id": "suffixes-spelling",
        "type": "steps",
        "title": "Как проверять написание",
        "items": [
          {
            "title": "Сначала найди основу",
            "text": "Определи исходное слово, если оно очевидно: help → helpful, create → creative.",
            "example": {
              "en": "help → [[helpful]]",
              "ru": "помощь / помогать → [[полезный, готовый помочь]]"
            }
          },
          {
            "title": "Не сохраняй буквы автоматически",
            "text": "При добавлении суффикса написание основы может меняться.",
            "example": {
              "en": "rely → [[reliable]]",
              "ru": "полагаться → [[надёжный]]"
            }
          },
          {
            "title": "Проверяй word family",
            "text": "Одна семья помогает одновременно закрепить значение и орфографию.",
            "example": {
              "en": "create → creation → [[creative]]",
              "ru": "создавать → создание → [[творческий]]"
            }
          },
          {
            "title": "Не придумывай слово по аналогии",
            "text": "Не каждый суффикс можно свободно присоединить к любой основе. Если форма незнакома, её нужно проверить в словаре.",
            "example": {
              "en": "success → [[successful]]",
              "ru": "успех → [[успешный]]"
            }
          }
        ]
      },
      {
        "id": "suffixes-word-families",
        "type": "table",
        "title": "Полезные word families",
        "headers": [
          "Основа",
          "Существительное",
          "Прилагательное",
          "Перевод прилагательного"
        ],
        "rows": [
          [
            "create",
            "creation",
            "creative",
            "творческий"
          ],
          [
            "rely",
            "reliability",
            "reliable",
            "надёжный"
          ],
          [
            "impulse",
            "impulse",
            "impulsive",
            "импульсивный"
          ],
          [
            "envy",
            "envy",
            "envious",
            "завистливый"
          ],
          [
            "success",
            "success",
            "successful",
            "успешный"
          ],
          [
            "thought",
            "thought",
            "thoughtful",
            "внимательный, заботливый"
          ]
        ]
      },
      {
        "id": "suffixes-meaning",
        "type": "compare",
        "title": "Похожие по форме — разные по смыслу",
        "columns": [
          {
            "title": "thoughtful",
            "points": [
              "Человек думает о чувствах и потребностях других."
            ],
            "examples": [
              {
                "en": "That was very [[thoughtful]] of you.",
                "ru": "Это было очень [[заботливо / внимательно]] с твоей стороны."
              }
            ]
          },
          {
            "title": "sensitive",
            "points": [
              "Человек легко замечает чувства, изменения или реагирует на них; в контексте личности может быть «чувствительный»."
            ],
            "examples": [
              {
                "en": "He is very [[sensitive]] to criticism.",
                "ru": "Он очень [[чувствителен]] к критике."
              }
            ]
          },
          {
            "title": "assertive",
            "points": [
              "Уверенно выражает свои мысли и границы, но не обязательно агрессивно."
            ],
            "examples": [
              {
                "en": "Try to be more [[assertive]] in meetings.",
                "ru": "Попробуй быть более [[уверенным и прямым]] на встречах."
              }
            ]
          }
        ]
      },
      {
        "id": "suffixes-errors",
        "type": "mistakes",
        "title": "Что чаще всего идёт не так",
        "items": [
          {
            "wrong": "relyable",
            "right": "reliable",
            "why": "При образовании reliable меняется написание основы."
          },
          {
            "wrong": "envyous",
            "right": "envious",
            "why": "Правильная форма — envious."
          },
          {
            "wrong": "successfull",
            "right": "successful",
            "why": "В суффиксе -ful одна l."
          },
          {
            "wrong": "Считать, что -ous всегда значит «опасный / негативный»",
            "right": "Учить значение всего слова",
            "why": "glamorous и famous не имеют отрицательного значения."
          },
          {
            "wrong": "Образовывать новое прилагательное по аналогии без проверки",
            "right": "Проверять словарную форму",
            "why": "Словообразовательные модели продуктивны не одинаково для всех основ."
          }
        ]
      }
    ]
  },
  {
    "id": "grammar-present-tenses",
    "order": 3,
    "title": "Present simple and present continuous",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-present-tenses",
    "passed": false,
    "attempts": 0,
    "explanation": "Present Simple описывает обычный порядок вещей, факты, повторение и состояния. Present Continuous показывает процесс вокруг настоящего момента, временную ситуацию или уже организованную личную договорённость. Главное — не слово-маркер, а смысл ситуации.",
    "formula": "Present Simple: I/you/we/they work · he/she/it works · do/does not + V · Do/Does … V?  |  Present Continuous: am/is/are + V-ing",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the correct form",
        "difficulty": "Easy",
        "instructions": "Choose the correct form.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "My sister usually ___ to work by bus.",
            "options": [
              "goes",
              "is going"
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "Be quiet! The baby ___.",
            "options": [
              "sleeps",
              "is sleeping"
            ],
            "answer": 1
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "I ___ this bag belongs to Sam.",
            "options": [
              "think",
              "am thinking"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "We ___ dinner at the moment.",
            "options": [
              "have",
              "are having"
            ],
            "answer": 1
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the sentences",
        "difficulty": "Medium",
        "instructions": "Complete the sentences with the present simple or present continuous form of the verbs in brackets.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "gaps",
            "segments": [
              "Ella usually ",
              " (work) from home, but today she ",
              " (work) at the office."
            ],
            "answers": [
              [
                "works"
              ],
              [
                "is working",
                "'s working",
                "’s working"
              ]
            ]
          },
          {
            "id": "2",
            "input": "gaps",
            "segments": [
              "What time ",
              " the train ",
              " (leave) tomorrow?"
            ],
            "answers": [
              [
                "does"
              ],
              [
                "leave"
              ]
            ]
          },
          {
            "id": "3",
            "input": "gaps",
            "segments": [
              "I ",
              " (not understand) this question."
            ],
            "answers": [
              [
                "don't understand",
                "do not understand"
              ]
            ]
          },
          {
            "id": "4",
            "input": "gaps",
            "segments": [
              "They ",
              " (meet) us outside the cinema tonight."
            ],
            "answers": [
              [
                "are meeting",
                "'re meeting",
                "’re meeting"
              ]
            ]
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Choose the meaning",
        "difficulty": "Medium → Hard",
        "instructions": "Choose the sentence that matches the meaning.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "This is my opinion.",
            "options": [
              "I think the plan is good.",
              "I’m thinking about the plan."
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "The activity is happening now.",
            "options": [
              "She sees her dentist every six months.",
              "She’s seeing her dentist now."
            ],
            "answer": 1
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "This is an official timetable.",
            "options": [
              "The lesson starts at 9.00 tomorrow.",
              "We’re starting a new course tomorrow."
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "This is a personal arrangement.",
            "options": [
              "The shop closes at 8.00.",
              "I’m meeting Anna after work."
            ],
            "answer": 1
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Correct the mistakes",
        "difficulty": "Hard",
        "instructions": "Rewrite each sentence correctly.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "Correct the sentence: My brother is knowing the answer.",
            "acceptedAnswers": [
              "My brother knows the answer.",
              "My brother knows the answer"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Correct the sentence: Does your flight leaves at six?",
            "acceptedAnswers": [
              "Does your flight leave at six?",
              "Does your flight leave at six"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Correct the sentence: I meet my manager tomorrow at 10.00.",
            "acceptedAnswers": [
              "I'm meeting my manager tomorrow at 10.00.",
              "I’m meeting my manager tomorrow at 10.00.",
              "I'm meeting my manager tomorrow at 10.00",
              "I’m meeting my manager tomorrow at 10.00"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "Correct the sentence: She always is arriving late, but today she comes early.",
            "acceptedAnswers": [
              "She always arrives late, but today she is coming early.",
              "She always arrives late, but today she is coming early",
              "She always arrives late, but today she's coming early.",
              "She always arrives late, but today she's coming early"
            ]
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-5",
    "chapter": [
      {
        "id": "present-timeline",
        "type": "timeline",
        "title": "Две картинки настоящего времени",
        "points": [
          {
            "label": "обычно / всегда / регулярно",
            "caption": "Present Simple: действие рассматривается как правило, привычка или постоянный факт."
          },
          {
            "label": "NOW",
            "caption": "Present Continuous: действие находится в процессе сейчас или вокруг текущего периода."
          },
          {
            "label": "временно",
            "caption": "Present Continuous: ситуация ограничена нынешним периодом, даже если действие не происходит в эту секунду."
          }
        ]
      },
      {
        "id": "present-simple",
        "type": "formula",
        "title": "Present Simple: строение",
        "lines": [
          "Утверждение: I/you/we/they [[work]] · he/she/it [[works]]",
          "Отрицание: I/you/we/they [[do not (don’t) work]] · he/she/it [[does not (doesn’t) work]]",
          "Вопрос: [[Do]] you work? · [[Does]] she work?",
          "После does / doesn’t смысловой глагол возвращается в базовую форму: Does he [[work]]? — не works."
        ],
        "examples": [
          {
            "en": "She [[works]] from home twice a week.",
            "ru": "Она [[работает]] из дома два раза в неделю."
          },
          {
            "en": "[[Does]] he [[know]] the answer?",
            "ru": "[[Знает]] ли он ответ?"
          }
        ]
      },
      {
        "id": "present-continuous",
        "type": "formula",
        "title": "Present Continuous: строение",
        "lines": [
          "Утверждение: subject + [[am / is / are]] + V-ing",
          "Отрицание: subject + [[am not / isn’t / aren’t]] + V-ing",
          "Вопрос: [[Am / Is / Are]] + subject + V-ing?"
        ],
        "examples": [
          {
            "en": "I [[am working]] at home this week.",
            "ru": "На этой неделе я [[работаю]] дома."
          },
          {
            "en": "[[Are]] you [[waiting]] for someone?",
            "ru": "Ты [[кого-то ждёшь]]?"
          }
        ]
      },
      {
        "id": "present-choice",
        "type": "table",
        "title": "Как выбрать время по смыслу",
        "headers": [
          "Ситуация",
          "Present Simple",
          "Present Continuous"
        ],
        "rows": [
          [
            "Привычка / регулярность",
            "I go to the gym on Mondays. — Я хожу в зал по понедельникам.",
            "—"
          ],
          [
            "Постоянный факт",
            "She lives in Ufa. — Она живёт в Уфе.",
            "—"
          ],
          [
            "Состояние / мнение",
            "I understand you. — Я тебя понимаю.",
            "обычно не используется"
          ],
          [
            "Процесс сейчас",
            "—",
            "She is talking on the phone. — Она сейчас разговаривает по телефону."
          ],
          [
            "Временная ситуация",
            "—",
            "I’m staying with my sister this month. — В этом месяце я живу у сестры."
          ],
          [
            "Изменение / развитие",
            "—",
            "The weather is getting colder. — Становится холоднее."
          ],
          [
            "Личная договорённость на будущее",
            "—",
            "We’re meeting Anna tomorrow. — Завтра мы встречаемся с Анной."
          ]
        ]
      },
      {
        "id": "present-stative",
        "type": "note",
        "title": "Глаголы состояния: почему continuous часто не подходит",
        "paragraphs": [
          "Глаголы know, understand, believe, want, need, belong, seem, remember, love и многие другие обычно описывают состояние, а не наблюдаемый процесс. Поэтому в обычном значении они употребляются в Simple: I [[know]] the answer, а не I am knowing the answer.",
          "Некоторые глаголы меняют значение. Think = «считать, иметь мнение» обычно Simple: I [[think]] it’s a good idea. Think = «обдумывать» может быть Continuous: I’m [[thinking]] about moving."
        ],
        "examples": [
          {
            "en": "This bag [[belongs]] to me.",
            "ru": "Эта сумка [[принадлежит]] мне."
          },
          {
            "en": "I’m [[having]] lunch now.",
            "ru": "Я сейчас [[обедаю]].",
            "note": "have в значении действия допускает Continuous."
          }
        ]
      },
      {
        "id": "present-always",
        "type": "callout",
        "title": "always + Continuous: не просто «всегда»",
        "tone": "warning",
        "paragraphs": [
          "Present Continuous с always / constantly может выражать повторяющееся поведение, которое говорящий эмоционально оценивает — часто раздражение или удивление."
        ],
        "examples": [
          {
            "en": "You’re [[always losing]] your keys!",
            "ru": "Ты [[вечно теряешь]] ключи!"
          }
        ]
      },
      {
        "id": "present-errors",
        "type": "mistakes",
        "title": "Типичные ошибки выбора и формы",
        "items": [
          {
            "wrong": "She is knowing the answer.",
            "right": "She knows the answer.",
            "why": "know обычно обозначает состояние."
          },
          {
            "wrong": "Does he works here?",
            "right": "Does he work here?",
            "why": "После does используется базовая форма."
          },
          {
            "wrong": "I work from home this week.",
            "right": "I’m working from home this week.",
            "why": "Если подчёркивается временный период «на этой неделе», естественнее Continuous."
          },
          {
            "wrong": "I am going to work every Monday.",
            "right": "I go to work every Monday.",
            "why": "Регулярная привычка требует Present Simple, если нет специального контекста."
          }
        ]
      }
    ]
  },
  {
    "id": "grammar-possessives",
    "order": 4,
    "title": "Possessives: ’s, of, possessive pronouns and own",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-possessives",
    "passed": false,
    "attempts": 0,
    "lockOnPass": true,
    "revealAnswersOnError": false,
    "explanation": "В английском принадлежность выражается несколькими моделями. Выбор зависит от того, кому или чему принадлежит предмет, названо ли существительное после притяжательной формы и хотим ли мы подчеркнуть «свой собственный».",
    "formula": "person + ’s + noun · noun + of + thing · my/your/his… + noun · mine/yours/hers… · a friend of mine · my own + noun",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the correct possessive form",
        "difficulty": "Easy",
        "instructions": "Choose the correct form.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "This is ___ coat.",
            "options": [
              "Maria’s",
              "Marias’"
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "The ___ room is upstairs.",
            "options": [
              "children’s",
              "childrens’"
            ],
            "answer": 0
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "My ___ house is near the park.",
            "options": [
              "parents’",
              "parents’s"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "Is this ___ idea?",
            "options": [
              "their",
              "theirs"
            ],
            "answer": 0
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the sentences",
        "difficulty": "Medium",
        "instructions": "Complete each sentence with the correct possessive form.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "gaps",
            "segments": [
              "We stayed at ",
              " house last weekend. (my aunt)"
            ],
            "answers": [
              [
                "my aunt’s"
              ]
            ]
          },
          {
            "id": "2",
            "input": "gaps",
            "segments": [
              "The roof ",
              " is red. (the house)"
            ],
            "answers": [
              [
                "of the house"
              ]
            ]
          },
          {
            "id": "3",
            "input": "gaps",
            "segments": [
              "This notebook isn’t mine. Is it ",
              "? (you)"
            ],
            "answers": [
              [
                "yours"
              ]
            ]
          },
          {
            "id": "4",
            "input": "gaps",
            "segments": [
              "They finally bought ",
              " car. (they)"
            ],
            "answers": [
              [
                "their own"
              ]
            ]
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Choose the equivalent sentence",
        "difficulty": "Medium → Hard",
        "instructions": "Choose the sentence with the same meaning.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "select",
            "prompt": "She is one of my colleagues.",
            "options": [
              "She is a colleague of mine.",
              "She is a colleague of me.",
              "She is my colleague’s."
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "select",
            "prompt": "That is one of Tom’s cousins.",
            "options": [
              "That is a cousin of Tom.",
              "That is a cousin of Tom’s.",
              "That is Tom cousin."
            ],
            "answer": 1
          },
          {
            "id": "3",
            "input": "select",
            "prompt": "I want a desk that belongs only to me.",
            "options": [
              "I want a desk of my own.",
              "I want an own desk.",
              "I want a desk of mine own."
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "select",
            "prompt": "The dog has a bed that belongs to it alone.",
            "options": [
              "The dog has it own bed.",
              "The dog has its own bed.",
              "The dog has its bed own."
            ],
            "answer": 1
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Build the possessive phrase or question",
        "difficulty": "Hard",
        "instructions": "Write the requested form in full.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "Rewrite with ’s: the bag belonging to my sister",
            "acceptedAnswers": [
              "my sister’s bag"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Rewrite with of: the end belonging to the film",
            "acceptedAnswers": [
              "the end of the film"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Write a question with Whose: this coat / belong to",
            "acceptedAnswers": [
              "Whose coat is this?"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "Rewrite to show shared possession: the apartment belongs to Mia and Leo",
            "acceptedAnswers": [
              "Mia and Leo’s apartment"
            ]
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-6",
    "chapter": [
      {
        "id": "possessive-decision",
        "type": "decision",
        "title": "Как выбрать притяжательную конструкцию",
        "items": [
          {
            "question": "Владелец — человек, животное, организация или время?",
            "yes": "Часто используем ’s: Anna’s bag, the company’s policy, today’s meeting.",
            "no": "Для частей предметов и длинных неодушевлённых сочетаний часто естественнее of: the roof of the house."
          },
          {
            "question": "После притяжательной формы стоит существительное?",
            "yes": "my / your / his / her / its / our / their + noun.",
            "no": "mine / yours / his / hers / ours / theirs."
          },
          {
            "question": "Нужно подчеркнуть «собственный / самостоятельно принадлежащий»?",
            "yes": "own после притяжательного слова: my own room, their own business.",
            "no": "Обычная притяжательная форма без own."
          }
        ]
      },
      {
        "id": "possessive-s",
        "type": "table",
        "title": "’s и of: не механическое правило «люди vs предметы»",
        "headers": [
          "Модель",
          "Когда естественна",
          "Пример + перевод"
        ],
        "rows": [
          [
            "’s / ’",
            "люди и живые существа",
            "my sister’s car — машина моей сестры"
          ],
          [
            "’s",
            "организации, страны, места, время",
            "the company’s decision — решение компании; today’s news — сегодняшние новости"
          ],
          [
            "of",
            "части предметов, абстрактные связи, длинные группы",
            "the end of the road — конец дороги; the colour of the walls — цвет стен"
          ],
          [
            "оба возможны",
            "иногда выбор зависит от стиля и фокуса",
            "the company’s policy / the policy of the company — политика компании"
          ]
        ]
      },
      {
        "id": "possessive-apostrophe",
        "type": "steps",
        "title": "Апостроф: где его ставить",
        "items": [
          {
            "title": "Один владелец",
            "text": "Добавляем ’s.",
            "example": {
              "en": "the [[girl’s]] phone",
              "ru": "телефон [[девочки]]"
            }
          },
          {
            "title": "Множественное число на -s",
            "text": "Добавляем только апостроф после s.",
            "example": {
              "en": "the [[students’]] books",
              "ru": "книги [[студентов]]"
            }
          },
          {
            "title": "Неправильное множественное число без -s",
            "text": "Добавляем ’s.",
            "example": {
              "en": "the [[children’s]] room",
              "ru": "[[детская]] комната"
            }
          },
          {
            "title": "Два человека и один общий предмет",
            "text": "Обычно ’s ставится у второго имени.",
            "example": {
              "en": "Tom and Anna’s flat",
              "ru": "квартира Тома и Анны"
            }
          }
        ]
      },
      {
        "id": "possessive-forms",
        "type": "compare",
        "title": "my и mine: форма зависит от существительного",
        "columns": [
          {
            "title": "my / your / his / her / its / our / their",
            "points": [
              "Всегда стоят перед существительным."
            ],
            "examples": [
              {
                "en": "This is [[our house]].",
                "ru": "Это [[наш дом]]."
              }
            ]
          },
          {
            "title": "mine / yours / his / hers / ours / theirs",
            "points": [
              "Заменяют существительное и не требуют noun после себя."
            ],
            "examples": [
              {
                "en": "This house is [[ours]].",
                "ru": "Этот дом [[наш]]."
              }
            ]
          }
        ]
      },
      {
        "id": "possessive-double",
        "type": "note",
        "title": "a friend of mine: двойная притяжательная конструкция",
        "paragraphs": [
          "Конструкция a friend of mine означает «один из моих друзей». Она особенно полезна после a/an, some, any, this, that, these, those, когда простая форма my уже не подходит к структуре."
        ],
        "examples": [
          {
            "en": "He is [[a friend of mine]].",
            "ru": "Он [[один из моих друзей]]."
          },
          {
            "en": "That idea of yours is interesting.",
            "ru": "[[Эта твоя идея]] интересная."
          }
        ]
      },
      {
        "id": "possessive-own",
        "type": "callout",
        "title": "own усиливает значение «свой собственный»",
        "tone": "info",
        "paragraphs": [
          "own ставится после притяжательного слова: my own, her own, their own. Само по себе own обычно не заменяет притяжательное слово."
        ],
        "examples": [
          {
            "en": "She has [[her own]] studio.",
            "ru": "У неё [[своя собственная]] студия."
          },
          {
            "en": "I did it [[on my own]].",
            "ru": "Я сделал это [[самостоятельно]].",
            "note": "on my own — отдельная устойчивая конструкция «сам / без помощи»."
          }
        ]
      },
      {
        "id": "possessive-errors",
        "type": "mistakes",
        "title": "Типичные ошибки",
        "items": [
          {
            "wrong": "the car of my brother",
            "right": "my brother’s car",
            "why": "С близким личным владельцем ’s обычно естественнее."
          },
          {
            "wrong": "This seat is my.",
            "right": "This seat is mine.",
            "why": "После формы нет существительного."
          },
          {
            "wrong": "the childrens’ room",
            "right": "the children’s room",
            "why": "children — неправильное множественное число без конечной -s."
          },
          {
            "wrong": "I have own room.",
            "right": "I have my own room.",
            "why": "own обычно требует притяжательного слова перед собой."
          }
        ]
      }
    ]
  },
  {
    "id": "grammar-past-simple-continuous-used-to",
    "order": 5,
    "title": "Past simple, past continuous, or used to?",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-past-simple-continuous-used-to",
    "passed": false,
    "attempts": 0,
    "lockOnPass": true,
    "revealAnswersOnError": false,
    "explanation": "Past Simple сообщает о завершённых событиях и фактах прошлого. Past Continuous показывает фон или действие в процессе в конкретный момент. used to описывает прежнюю привычку или состояние, которое больше не является актуальным.",
    "formula": "Past Simple: V2 / did not + V / Did … V? · Past Continuous: was/were + V-ing · used to + V / didn’t use to + V / Did … use to + V?",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the correct form",
        "difficulty": "Easy",
        "instructions": "Choose the form that best matches the meaning.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "When I was ten, I ___ football every Saturday.",
            "options": [
              "used to play",
              "was playing"
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "At 9 p.m. yesterday, we ___ dinner.",
            "options": [
              "had",
              "were having"
            ],
            "answer": 1
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "The doorbell ___ while Ben was listening to music.",
            "options": [
              "rang",
              "was ringing"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "My sister ___ long hair, but now it’s short.",
            "options": [
              "used to have",
              "was having"
            ],
            "answer": 0
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the sentences",
        "difficulty": "Medium",
        "instructions": "Write the correct form of the verb in brackets.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "I ___ (wake up) late yesterday.",
            "acceptedAnswers": [
              "woke up"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "We ___ (wait) for the bus when it started to rain.",
            "acceptedAnswers": [
              "were waiting"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "She ___ (not use to / like) coffee.",
            "acceptedAnswers": [
              "didn't use to like",
              "did not use to like"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "They ___ (build) the school in 2018.",
            "acceptedAnswers": [
              "built"
            ]
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Choose the best form in context",
        "difficulty": "Medium → Hard",
        "instructions": "Choose the answer that completes the context correctly.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "select",
            "prompt": "I ___ home when I saw the accident.",
            "options": [
              "walked",
              "was walking",
              "used to walk"
            ],
            "answer": 1
          },
          {
            "id": "2",
            "input": "select",
            "prompt": "We ___ in France for five years, then we moved to Italy.",
            "options": [
              "lived",
              "were living",
              "used to live"
            ],
            "answer": 0
          },
          {
            "id": "3",
            "input": "select",
            "prompt": "He ___ glasses until he started working at a computer all day.",
            "options": [
              "didn't wear",
              "wasn't wearing",
              "didn't use to wearing"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "select",
            "prompt": "While my husband ___ dinner, I was reading to the children.",
            "options": [
              "cooked",
              "was cooking",
              "used to cook"
            ],
            "answer": 1
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Build the correct past form",
        "difficulty": "Hard",
        "instructions": "Write the complete sentence or question.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "Make a question with used to: you / play in the street / when you were young",
            "acceptedAnswers": [
              "Did you use to play in the street when you were young?"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Make a negative sentence with used to: I / eat many vegetables / when I was a child",
            "acceptedAnswers": [
              "I didn't use to eat many vegetables when I was a child.",
              "I did not use to eat many vegetables when I was a child."
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Combine with when: we / wait at the airport + my son / lose his boarding pass",
            "acceptedAnswers": [
              "We were waiting at the airport when my son lost his boarding pass."
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "Use the best past forms: they / not drive very fast + they / hit the lamp post",
            "acceptedAnswers": [
              "They weren't driving very fast when they hit the lamp post.",
              "They were not driving very fast when they hit the lamp post."
            ]
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-9",
    "chapter": [
      {
        "id": "past-story-timeline",
        "type": "timeline",
        "title": "Как три формы работают внутри рассказа",
        "points": [
          {
            "label": "раньше, регулярно",
            "caption": "used to: повторяющаяся привычка или состояние в прошлом, обычно с контрастом «сейчас иначе»."
          },
          {
            "label": "действие было в процессе",
            "caption": "Past Continuous: фон / процесс вокруг определённого момента."
          },
          {
            "label": "событие произошло",
            "caption": "Past Simple: завершённое событие, которое двигает рассказ вперёд."
          }
        ]
      },
      {
        "id": "past-simple-form",
        "type": "formula",
        "title": "Past Simple: завершённое событие или факт",
        "lines": [
          "Утверждение: regular verb + -ed или 2-я форма неправильного глагола: worked, went.",
          "Отрицание: [[didn’t + V]]: didn’t work, didn’t go.",
          "Вопрос: [[Did + subject + V?]]: Did you go?",
          "После did / didn’t глагол не ставится во 2-ю форму."
        ],
        "examples": [
          {
            "en": "I [[met]] her in 2024.",
            "ru": "Я [[познакомился]] с ней в 2024 году."
          },
          {
            "en": "We [[didn’t see]] him yesterday.",
            "ru": "Мы [[не видели]] его вчера."
          }
        ]
      },
      {
        "id": "past-continuous-form",
        "type": "formula",
        "title": "Past Continuous: процесс и фон",
        "lines": [
          "Утверждение: subject + [[was / were + V-ing]].",
          "Отрицание: subject + [[wasn’t / weren’t + V-ing]].",
          "Вопрос: [[Was / Were + subject + V-ing?]]"
        ],
        "examples": [
          {
            "en": "At eight, I [[was driving]] home.",
            "ru": "В восемь я [[ехал]] домой."
          },
          {
            "en": "She [[was cooking]] when the phone rang.",
            "ru": "Она [[готовила]], когда зазвонил телефон."
          }
        ]
      },
      {
        "id": "past-interruption",
        "type": "compare",
        "title": "when и while: событие на фоне процесса",
        "columns": [
          {
            "title": "Длительный фон — Past Continuous",
            "points": [
              "Показывает, что действие уже шло."
            ],
            "examples": [
              {
                "en": "I [[was reading]]…",
                "ru": "Я [[читал]]…"
              }
            ]
          },
          {
            "title": "Короткое завершённое событие — Past Simple",
            "points": [
              "Происходит внутри фона или прерывает его."
            ],
            "examples": [
              {
                "en": "…when the lights [[went out]].",
                "ru": "…когда свет [[погас]]."
              }
            ]
          }
        ]
      },
      {
        "id": "used-to",
        "type": "note",
        "title": "used to: «раньше было так, а теперь уже не так»",
        "paragraphs": [
          "used to + базовая форма описывает повторяющиеся действия и состояния в прошлом: I used to play outside; I used to be shy. Важен фон прежней нормы, а не одно отдельное событие.",
          "В вопросах и отрицаниях после did обычно пишется use: Did you [[use to]] live here? I didn’t [[use to]] like coffee."
        ],
        "examples": [
          {
            "en": "I [[used to live]] near the university.",
            "ru": "Раньше я [[жил]] рядом с университетом."
          },
          {
            "en": "She [[didn’t use to eat]] vegetables.",
            "ru": "Раньше она [[не ела]] овощи."
          }
        ]
      },
      {
        "id": "past-choice",
        "type": "table",
        "title": "Одна ситуация — три разных фокуса",
        "headers": [
          "Что хочет сказать говорящий",
          "Форма",
          "Пример + перевод"
        ],
        "rows": [
          [
            "одно завершённое событие",
            "Past Simple",
            "I visited Rome in May. — Я был в Риме в мае."
          ],
          [
            "процесс в определённый момент",
            "Past Continuous",
            "At 10, I was flying to Rome. — В 10 я летел в Рим."
          ],
          [
            "прежняя регулярная привычка",
            "used to",
            "I used to travel every summer. — Раньше я путешествовал каждое лето."
          ],
          [
            "последовательность событий",
            "Past Simple",
            "I got up, had breakfast and left. — Я встал, позавтракал и ушёл."
          ],
          [
            "два параллельных процесса",
            "Past Continuous",
            "I was cooking while he was setting the table. — Я готовил, пока он накрывал на стол."
          ]
        ]
      },
      {
        "id": "past-states",
        "type": "callout",
        "title": "Глаголы состояния и Past Continuous",
        "tone": "warning",
        "paragraphs": [
          "Как и в настоящем времени, stative verbs обычно не употребляются в Continuous в значении состояния. Поэтому I knew the answer естественнее, чем I was knowing the answer."
        ]
      },
      {
        "id": "past-errors",
        "type": "mistakes",
        "title": "Типичные ошибки",
        "items": [
          {
            "wrong": "Did you went there?",
            "right": "Did you go there?",
            "why": "После did нужна базовая форма."
          },
          {
            "wrong": "I was knowing him well.",
            "right": "I knew him well.",
            "why": "know обычно не описывает процесс."
          },
          {
            "wrong": "I used to went there.",
            "right": "I used to go there.",
            "why": "После used to используется базовая форма."
          },
          {
            "wrong": "When I was arriving, he called me.",
            "right": "When I arrived, he called me.",
            "why": "Если arrival рассматривается как завершённое событие, нужен Past Simple."
          }
        ]
      }
    ]
  },
  {
    "id": "grammar-prepositions-place",
    "order": 6,
    "title": "Prepositions of place and position",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-prepositions-place",
    "passed": false,
    "attempts": 0,
    "lockOnPass": true,
    "revealAnswersOnError": false,
    "explanation": "Предлог места показывает отношение одного объекта к другому. Чтобы выбрать форму, сначала представь геометрию ситуации: внутри пространства, на поверхности, в точке, перед / за объектом или по другую сторону.",
    "formula": "in = внутри · on = на поверхности · at = в точке/месте как пункте · in front of / behind · opposite · next to · between · in the foreground/background",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the correct preposition",
        "difficulty": "Easy",
        "instructions": "Choose the option that completes the sentence correctly.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "The woman is ___ the foreground.",
            "options": [
              "in",
              "on"
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "The trunk is ___ the bottom right-hand corner.",
            "options": [
              "in",
              "at"
            ],
            "answer": 0
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "The woman is standing ___ the tree trunk.",
            "options": [
              "behind",
              "opposite"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "The wall is ___ the woman.",
            "options": [
              "opposite",
              "in front of"
            ],
            "answer": 0
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the place phrase",
        "difficulty": "Medium",
        "instructions": "Write the missing preposition or preposition phrase.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "The older man is ___ the distance.",
            "acceptedAnswers": [
              "in"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Her left hand is ___ the tree trunk.",
            "acceptedAnswers": [
              "on top of"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "There is a bush ___ the man.",
            "acceptedAnswers": [
              "in front of"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "The house is ___ the top left-hand corner.",
            "acceptedAnswers": [
              "in"
            ]
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Choose the best phrase in context",
        "difficulty": "Medium → Hard",
        "instructions": "Choose the phrase that matches the position described.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "select",
            "prompt": "The trees are ___ of the photo.",
            "options": [
              "in the background",
              "on the background",
              "opposite the background"
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "select",
            "prompt": "The older man looks smaller because he is ___.",
            "options": [
              "in the distance",
              "on top of",
              "behind the distance"
            ],
            "answer": 0
          },
          {
            "id": "3",
            "input": "select",
            "prompt": "The bush is ___ the older man, so it is closer to the camera.",
            "options": [
              "in front of",
              "opposite",
              "behind"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "select",
            "prompt": "The woman has her left hand ___ the cut tree trunk.",
            "options": [
              "on top of",
              "in front of",
              "in the background"
            ],
            "answer": 0
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Build the sentence or question",
        "difficulty": "Hard",
        "instructions": "Write the complete sentence or question using the words given.",
        "hideAnswersOnError": true,
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "woman / be / in the foreground",
            "acceptedAnswers": [
              "The woman is in the foreground."
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Make a negative sentence: house / be / in the foreground",
            "acceptedAnswers": [
              "The house isn't in the foreground.",
              "The house is not in the foreground."
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Make a question: older man / be / in the distance",
            "acceptedAnswers": [
              "Is the older man in the distance?"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "bush / be / in front of / man",
            "acceptedAnswers": [
              "The bush is in front of the man.",
              "There is a bush in front of the man."
            ]
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-11",
    "chapter": [
      {
        "id": "place-three-core",
        "type": "cards",
        "title": "Три базовые идеи: in, on, at",
        "cards": [
          {
            "title": "IN — внутри границ",
            "body": "Комната, город, страна, коробка, фотография как пространство.",
            "example": {
              "en": "She is [[in]] the kitchen.",
              "ru": "Она [[находится в]] кухне."
            }
          },
          {
            "title": "ON — на поверхности / линии",
            "body": "Стол, стена, этаж, страница, линия маршрута.",
            "example": {
              "en": "The keys are [[on]] the table.",
              "ru": "Ключи [[на]] столе."
            }
          },
          {
            "title": "AT — точка / место как пункт",
            "body": "Конкретная точка, адрес, событие или место деятельности, когда внутреннее пространство не важно.",
            "example": {
              "en": "I’ll meet you [[at]] the station.",
              "ru": "Я встречу тебя [[у / на]] станции."
            }
          }
        ]
      },
      {
        "id": "place-contrast",
        "type": "table",
        "title": "in / on / at: сравни масштаб и взгляд говорящего",
        "headers": [
          "Предлог",
          "Как мы представляем место",
          "Примеры с переводом"
        ],
        "rows": [
          [
            "in",
            "объект находится внутри границ",
            "in a room — в комнате; in London — в Лондоне"
          ],
          [
            "on",
            "контакт с поверхностью / положение на линии",
            "on the wall — на стене; on the second floor — на втором этаже"
          ],
          [
            "at",
            "место как точка или функция",
            "at the door — у двери; at school — в школе (как место деятельности)"
          ]
        ]
      },
      {
        "id": "place-relative",
        "type": "table",
        "title": "Положение относительно другого объекта",
        "headers": [
          "Фраза",
          "Смысл",
          "Пример + перевод"
        ],
        "rows": [
          [
            "in front of",
            "перед объектом",
            "The car is in front of the house. — Машина перед домом."
          ],
          [
            "behind",
            "за объектом",
            "The garden is behind the house. — Сад за домом."
          ],
          [
            "opposite",
            "напротив, по другую сторону",
            "The bank is opposite the cinema. — Банк напротив кинотеатра."
          ],
          [
            "next to / beside",
            "рядом непосредственно",
            "Sit next to me. — Сядь рядом со мной."
          ],
          [
            "between",
            "между двумя объектами / группами",
            "The café is between the bank and the hotel. — Кафе между банком и отелем."
          ]
        ]
      },
      {
        "id": "place-photo",
        "type": "visual",
        "title": "Как описывать фотографию",
        "items": [
          {
            "position": "top-left",
            "label": "in the top left-hand corner",
            "ru": "в левом верхнем углу"
          },
          {
            "position": "top-right",
            "label": "in the top right-hand corner",
            "ru": "в правом верхнем углу"
          },
          {
            "position": "center",
            "label": "in the centre",
            "ru": "в центре"
          },
          {
            "position": "foreground",
            "label": "in the foreground",
            "ru": "на переднем плане"
          },
          {
            "position": "background",
            "label": "in the background",
            "ru": "на заднем плане"
          }
        ],
        "note": "Для фотографии обычно говорим in the foreground / background / centre, потому что рассматриваем область внутри изображения."
      },
      {
        "id": "place-choice",
        "type": "examples",
        "title": "Одинаковое русское «в / на» не означает один и тот же английский предлог",
        "items": [
          {
            "en": "She is [[at]] the airport.",
            "ru": "Она [[в]] аэропорту.",
            "note": "Аэропорт рассматривается как пункт назначения / место."
          },
          {
            "en": "She is [[in]] the airport terminal.",
            "ru": "Она [[внутри]] терминала аэропорта.",
            "note": "Подчёркивается физическое пространство."
          },
          {
            "en": "There’s a picture [[on]] the wall.",
            "ru": "На стене висит картина.",
            "note": "Контакт с поверхностью."
          },
          {
            "en": "There’s a mark [[in]] the photo.",
            "ru": "На фотографии есть отметка.",
            "note": "Фотография рассматривается как область изображения."
          }
        ]
      },
      {
        "id": "place-errors",
        "type": "mistakes",
        "title": "Типичные ошибки",
        "items": [
          {
            "wrong": "in the wall (для картины)",
            "right": "on the wall",
            "why": "Картина находится на поверхности стены."
          },
          {
            "wrong": "in front the house",
            "right": "in front of the house",
            "why": "Нужна полная составная форма in front of."
          },
          {
            "wrong": "opposite to the bank (в базовой модели BrE)",
            "right": "opposite the bank",
            "why": "В британском английском opposite часто употребляется без to."
          },
          {
            "wrong": "in the left corner (при описании фото)",
            "right": "in the left-hand corner / in the top left-hand corner",
            "why": "Так формулировка точнее и естественнее для позиции на изображении."
          }
        ]
      }
    ]
  },
  {
    "id": "grammar-articles",
    "order": 7,
    "title": "Articles: a / an, the, no article",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-articles",
    "passed": false,
    "attempts": 0,
    "explanation": "Артикль показывает, как говорящий представляет существительное слушателю: как один ещё не определённый предмет, как конкретный / уже идентифицируемый предмет или как понятие в общем. Выбор начинается с исчисляемости и числа, а не со списка отдельных слов.",
    "formula": "a/an = один, неидентифицированный singular countable · the = конкретный / единственный / понятный из контекста · Ø = обобщение с plural / uncountable и ряд устойчивых случаев",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the article",
        "difficulty": "Easy",
        "instructions": "Выбери a / an, the или no article.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "My brother is ___ architect.",
            "options": [
              "a",
              "an",
              "the",
              "—"
            ],
            "answer": 1
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "Please close ___ door next to you.",
            "options": [
              "a",
              "an",
              "the",
              "—"
            ],
            "answer": 2
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "___ children usually learn languages quickly.",
            "options": [
              "A",
              "An",
              "The",
              "—"
            ],
            "answer": 3
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "We had ___ lunch at one o’clock.",
            "options": [
              "a",
              "an",
              "the",
              "—"
            ],
            "answer": 3
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the article",
        "difficulty": "Medium",
        "instructions": "Впиши a, an, the или —, если артикль не нужен.",
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "She wants to become ___ engineer.",
            "acceptedAnswers": [
              "an"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Could you close ___ window, please?",
            "acceptedAnswers": [
              "the"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "I don’t usually eat ___ meat.",
            "acceptedAnswers": [
              "—",
              "-"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "What ___ amazing idea!",
            "acceptedAnswers": [
              "an"
            ]
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Choose the correct sentence",
        "difficulty": "Medium → Hard",
        "instructions": "Выбери грамматически правильный вариант.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "I’m going there the next weekend.",
              "I’m going there next weekend.",
              "I’m going there a next weekend.",
              "I’m going there next the weekend."
            ],
            "answer": 1
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "The money is important in life.",
              "A money is important in life.",
              "Money is important in life.",
              "An money is important in life."
            ],
            "answer": 2
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "She is a doctor.",
              "She is doctor.",
              "She is the doctor by profession.",
              "She is an doctor."
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "Choose the correct sentence.",
            "options": [
              "We go to cinema once the week.",
              "We go to the cinema once a week.",
              "We go to a cinema once the week.",
              "We go cinema once week."
            ],
            "answer": 1
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Correct the article mistake",
        "difficulty": "Hard",
        "instructions": "Перепиши предложение правильно целиком.",
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "Correct: He is engineer.",
            "acceptedAnswers": [
              "He is an engineer",
              "He is an engineer."
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "Correct: The money does not make people happy.",
            "acceptedAnswers": [
              "Money does not make people happy",
              "Money does not make people happy."
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "Correct: I go to the dentist about twice the year.",
            "acceptedAnswers": [
              "I go to the dentist about twice a year",
              "I go to the dentist about twice a year."
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "Correct: She always leaves the work at half past five.",
            "acceptedAnswers": [
              "She always leaves work at half past five",
              "She always leaves work at half past five."
            ]
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-12",
    "chapter": [
      {
        "id": "articles-decision",
        "type": "decision",
        "title": "Алгоритм выбора артикля",
        "items": [
          {
            "question": "Существительное исчисляемое и в единственном числе?",
            "yes": "Оно обычно не может стоять «голым»: нужен a/an, the или другой определитель (my, this, one…).",
            "no": "Переходим к вопросу: говорим о понятии вообще или о конкретном количестве / объекте?"
          },
          {
            "question": "Слушатель может понять, о каком именно объекте речь?",
            "yes": "Обычно the: объект уже упомянут, уточнён, единственный в ситуации или очевиден обоим.",
            "no": "Для одного исчисляемого предмета обычно a/an."
          },
          {
            "question": "Говорим о множественном числе или неисчисляемом понятии вообще?",
            "yes": "Часто используется нулевой артикль: Cats are independent; Money doesn’t buy happiness.",
            "no": "Если речь о конкретной группе / конкретном веществе, возможен the."
          }
        ]
      },
      {
        "id": "articles-a-an",
        "type": "note",
        "title": "a / an: вводим один предмет в разговор",
        "paragraphs": [
          "a/an используется только с исчисляемым существительным в единственном числе, когда предмет ещё не идентифицирован для слушателя: I saw [[a dog]]. — Я увидел [[собаку]].",
          "Выбор a или an зависит от звука, а не от буквы: an hour (первый звук гласный), a university (первый звук /j/)."
        ],
        "examples": [
          {
            "en": "She is [[an engineer]].",
            "ru": "Она [[инженер]]."
          },
          {
            "en": "He bought [[a useful book]].",
            "ru": "Он купил [[полезную книгу]]."
          }
        ]
      },
      {
        "id": "articles-the",
        "type": "cards",
        "title": "Когда нужен the",
        "cards": [
          {
            "title": "Уже упоминали",
            "body": "Сначала a/an вводит предмет, затем the указывает на тот же предмет.",
            "example": {
              "en": "I saw [[a dog]]. [[The dog]] was very friendly.",
              "ru": "Я увидел [[собаку]]. [[Эта собака]] была очень дружелюбной."
            }
          },
          {
            "title": "Есть уточнение",
            "body": "Контекст делает объект конкретным.",
            "example": {
              "en": "[[The book on the table]] is mine.",
              "ru": "[[Книга на столе]] моя."
            }
          },
          {
            "title": "Единственный / очевидный",
            "body": "В данной ситуации понятно, какой объект имеется в виду.",
            "example": {
              "en": "Please close [[the door]].",
              "ru": "Пожалуйста, закрой [[дверь]]."
            }
          },
          {
            "title": "Превосходная степень и порядковые",
            "body": "the часто используется с superlatives и ordinal numbers.",
            "example": {
              "en": "It was [[the best]] day of the year.",
              "ru": "Это был [[лучший]] день года."
            }
          }
        ]
      },
      {
        "id": "articles-zero",
        "type": "table",
        "title": "Нулевой артикль: говорим о классе или понятии вообще",
        "headers": [
          "Тип",
          "Обобщение без артикля",
          "Конкретный случай с the"
        ],
        "rows": [
          [
            "множественное исчисляемое",
            "Cats are independent. — Кошки независимы.",
            "The cats next door are noisy. — Кошки у соседей шумные."
          ],
          [
            "неисчисляемое",
            "Money is important. — Деньги важны.",
            "The money on the table is yours. — Деньги на столе твои."
          ],
          [
            "языки / предметы",
            "She speaks German. — Она говорит по-немецки.",
            "The German in this text is difficult. — Немецкий язык в этом тексте сложный."
          ]
        ]
      },
      {
        "id": "articles-institutions",
        "type": "compare",
        "title": "school, university, hospital: функция или здание?",
        "columns": [
          {
            "title": "Без артикля — основная функция",
            "points": [
              "go to school / be at university / go to bed — человек участвует в обычной функции места или действия."
            ],
            "examples": [
              {
                "en": "Her son is [[at school]].",
                "ru": "Её сын [[в школе]] (как ученик)."
              }
            ]
          },
          {
            "title": "the — конкретное место / здание",
            "points": [
              "the school / the university — конкретное учреждение как объект или место."
            ],
            "examples": [
              {
                "en": "I went to [[the school]] to speak to the teacher.",
                "ru": "Я пошёл [[в школу]] поговорить с учителем."
              }
            ]
          }
        ]
      },
      {
        "id": "articles-fixed",
        "type": "note",
        "title": "Еда, транспорт и устойчивые выражения",
        "paragraphs": [
          "Названия приёмов пищи часто употребляются без артикля в общем значении: have breakfast, have lunch. Но при уточнении возможен артикль: The lunch we had yesterday was excellent.",
          "В выражениях by car / by train / by plane артикль не ставится. Но: in the car, on the train — речь уже о конкретном способе положения / конкретном транспортном средстве."
        ]
      },
      {
        "id": "articles-errors",
        "type": "mistakes",
        "title": "Типичные ошибки",
        "items": [
          {
            "wrong": "She is doctor.",
            "right": "She is a doctor.",
            "why": "Профессия — singular countable noun, нужен a/an."
          },
          {
            "wrong": "The money makes people happy. (обобщение)",
            "right": "Money makes people happy.",
            "why": "Неисчисляемое существительное в общем значении употребляется без артикля."
          },
          {
            "wrong": "I like the cats. (все кошки вообще)",
            "right": "I like cats.",
            "why": "Для класса в целом во множественном числе нужен нулевой артикль."
          },
          {
            "wrong": "an university",
            "right": "a university",
            "why": "Начальный звук /j/ согласный."
          }
        ]
      }
    ]
  },
  {
    "id": "grammar-future-forms",
    "order": 8,
    "title": "Future forms: will / shall, be going to & present continuous",
    "level": "B1",
    "status": "available",
    "page": "grammar-topic.html?id=grammar-future-forms",
    "passed": false,
    "attempts": 0,
    "explanation": "В английском нет одной универсальной «формы будущего». Говорящий выбирает конструкцию по типу будущей ситуации: решение сейчас, обещание, намерение, прогноз по признакам или уже организованная договорённость.",
    "formula": "will + V · shall I/we + V? · am/is/are going to + V · Present Continuous for arrangements",
    "glanceCards": [],
    "anchorLinks": [],
    "miniRules": [],
    "tables": [],
    "exampleGroups": [],
    "commonMistakes": [],
    "exercises": [
      {
        "type": "exercise",
        "title": "Choose the future form",
        "difficulty": "Easy",
        "instructions": "Выбери форму, которая лучше всего подходит по смыслу.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "Look at those dark clouds! It ___ rain.",
            "options": [
              "will",
              "is going to"
            ],
            "answer": 1
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "I think people ___ recycle more in the future.",
            "options": [
              "will",
              "are going to"
            ],
            "answer": 0
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "___ I carry that box for you?",
            "options": [
              "Shall",
              "Will"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "We ___ dinner with Sam on Friday; the table is booked.",
            "options": [
              "are having",
              "will have"
            ],
            "answer": 0
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Complete the form",
        "difficulty": "Medium",
        "instructions": "Впиши правильную форму глагола.",
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "A: This box is heavy. B: I ___ you. (help)",
            "acceptedAnswers": [
              "'ll help",
              "I’ll help",
              "I'll help"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "We ___ house next month; the date is fixed. (move)",
            "acceptedAnswers": [
              "are moving"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "She promised she ___ anyone. (not tell)",
            "acceptedAnswers": [
              "won’t tell",
              "won't tell"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "What ___ first? (we / do)",
            "acceptedAnswers": [
              "shall we do"
            ]
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Read the context",
        "difficulty": "Hard",
        "instructions": "Выбери форму, которая соответствует контексту.",
        "items": [
          {
            "id": "1",
            "input": "single",
            "prompt": "I ___ call you last night, but I fell asleep.",
            "options": [
              "was going to",
              "will"
            ],
            "answer": 0
          },
          {
            "id": "2",
            "input": "single",
            "prompt": "Look at the traffic. We ___ be late.",
            "options": [
              "are going to",
              "will"
            ],
            "answer": 0
          },
          {
            "id": "3",
            "input": "single",
            "prompt": "Everything is arranged. I ___ my sister at 7.",
            "options": [
              "am meeting",
              "will meet"
            ],
            "answer": 0
          },
          {
            "id": "4",
            "input": "single",
            "prompt": "Don’t worry. I ___ drop it.",
            "options": [
              "won’t",
              "am not going to"
            ],
            "answer": 0
          }
        ]
      },
      {
        "type": "exercise",
        "title": "Build the sentence",
        "difficulty": "Challenge",
        "instructions": "Составь полное предложение или вопрос по подсказке.",
        "items": [
          {
            "id": "1",
            "input": "text",
            "prompt": "offer / I / carry / these bags",
            "acceptedAnswers": [
              "Shall I carry these bags?",
              "Shall I carry these bags"
            ]
          },
          {
            "id": "2",
            "input": "text",
            "prompt": "fixed arrangement / we / have / a barbecue / Saturday",
            "acceptedAnswers": [
              "We’re having a barbecue on Saturday.",
              "We're having a barbecue on Saturday.",
              "We’re having a barbecue on Saturday",
              "We're having a barbecue on Saturday"
            ]
          },
          {
            "id": "3",
            "input": "text",
            "prompt": "prior intention / she / give away / old clothes",
            "acceptedAnswers": [
              "She’s going to give away her old clothes.",
              "She's going to give away her old clothes.",
              "She’s going to give away her old clothes",
              "She's going to give away her old clothes"
            ]
          },
          {
            "id": "4",
            "input": "text",
            "prompt": "past intention / I / get up early / but / forget / set alarm",
            "acceptedAnswers": [
              "I was going to get up early, but I forgot to set my alarm.",
              "I was going to get up early but I forgot to set my alarm.",
              "I was going to get up early, but I forgot to set my alarm",
              "I was going to get up early but I forgot to set my alarm"
            ]
          }
        ]
      }
    ],
    "linkedLessonId": "lesson-19",
    "chapter": [
      {
        "id": "future-choice-map",
        "type": "decision",
        "title": "Сначала определяем тип будущего",
        "items": [
          {
            "question": "Решение принимается прямо сейчас, это обещание / предложение / реакция?",
            "yes": "will: I’ll help you.",
            "no": "Проверяем, существовал ли план раньше."
          },
          {
            "question": "Намерение или план уже существовал до момента речи?",
            "yes": "be going to: I’m going to apply for the course.",
            "no": "Если это конкретная договорённость с временем / местом / людьми, часто Present Continuous."
          },
          {
            "question": "Есть конкретная договорённость?",
            "yes": "Present Continuous: I’m meeting the tutor at 3.",
            "no": "Для прогноза смотрим на основание."
          },
          {
            "question": "Прогноз основан на видимых признаках сейчас?",
            "yes": "be going to: Look at those clouds. It’s going to rain.",
            "no": "Мнение / нейтральный прогноз часто выражается will: I think it will rain tomorrow."
          }
        ]
      },
      {
        "id": "future-will",
        "type": "formula",
        "title": "will: решение, реакция, обещание, прогноз-мнение",
        "lines": [
          "Утверждение: subject + [[will + V]] → I’ll call you.",
          "Отрицание: subject + [[will not / won’t + V]].",
          "Вопрос: [[Will + subject + V?]]",
          "После will всегда базовая форма без to."
        ],
        "examples": [
          {
            "en": "The phone is ringing. — I [[will get]] it.",
            "ru": "Телефон звонит. — Я [[отвечу]].",
            "note": "Решение принято в момент речи."
          },
          {
            "en": "I think prices [[will rise]].",
            "ru": "Думаю, цены [[вырастут]].",
            "note": "Прогноз-мнение."
          }
        ]
      },
      {
        "id": "future-shall",
        "type": "note",
        "title": "shall: ограниченная, но полезная функция",
        "paragraphs": [
          "В современном английском shall чаще всего встречается в вопросах с I / we, когда мы предлагаем действие или просим решить, что делать: Shall I open the window? Shall we start?",
          "Для обычного нейтрального будущего will значительно универсальнее."
        ],
        "examples": [
          {
            "en": "[[Shall I]] help you?",
            "ru": "[[Мне помочь]] тебе?"
          },
          {
            "en": "[[Shall we]] go?",
            "ru": "[[Пойдём]]?"
          }
        ]
      },
      {
        "id": "future-going-to",
        "type": "formula",
        "title": "be going to: намерение и прогноз по признакам",
        "lines": [
          "Утверждение: subject + [[am/is/are going to + V]].",
          "Отрицание: subject + [[am/is/are not going to + V]].",
          "Вопрос: [[Am/Is/Are + subject + going to + V?]]"
        ],
        "examples": [
          {
            "en": "I’m [[going to study]] tonight.",
            "ru": "Я [[собираюсь заниматься]] сегодня вечером."
          },
          {
            "en": "Be careful! You’re [[going to drop]] it.",
            "ru": "Осторожно! Ты [[сейчас уронишь]] это.",
            "note": "Прогноз основан на наблюдаемой ситуации."
          }
        ]
      },
      {
        "id": "future-arrangement",
        "type": "timeline",
        "title": "Present Continuous: будущее уже внесено в реальность",
        "points": [
          {
            "label": "сейчас",
            "caption": "Договорённость уже существует: назначено время, согласованы люди, куплены билеты и т. п."
          },
          {
            "label": "завтра / в пятницу",
            "caption": "I’m meeting Anna at 6. — Я встречаюсь с Анной в 6."
          }
        ]
      },
      {
        "id": "future-compare",
        "type": "table",
        "title": "Одна тема будущего — разные оттенки",
        "headers": [
          "Контекст",
          "Форма",
          "Пример + перевод"
        ],
        "rows": [
          [
            "решение сейчас",
            "will",
            "I’ll take the blue one. — Я возьму синий."
          ],
          [
            "обещание",
            "will",
            "I won’t tell anyone. — Я никому не скажу."
          ],
          [
            "план / намерение",
            "be going to",
            "I’m going to start a course. — Я собираюсь начать курс."
          ],
          [
            "видимые признаки",
            "be going to",
            "It’s going to fall. — Оно сейчас упадёт."
          ],
          [
            "личная договорённость",
            "Present Continuous",
            "We’re having dinner with Sam on Friday. — В пятницу мы ужинаем с Сэмом."
          ],
          [
            "предложение с I/we",
            "shall",
            "Shall we leave now? — Пойдём сейчас?"
          ]
        ]
      },
      {
        "id": "future-present-simple",
        "type": "callout",
        "title": "А где Present Simple?",
        "tone": "info",
        "paragraphs": [
          "Для расписаний и официальных графиков часто используется Present Simple: The train leaves at 7.30. Это не личная договорённость, а установленное расписание."
        ],
        "examples": [
          {
            "en": "The lesson [[starts]] at 10 tomorrow.",
            "ru": "Завтра урок [[начинается]] в 10."
          }
        ]
      },
      {
        "id": "future-errors",
        "type": "mistakes",
        "title": "Типичные ошибки",
        "items": [
          {
            "wrong": "I will to call you.",
            "right": "I will call you.",
            "why": "После will используется базовая форма без to."
          },
          {
            "wrong": "I going to study.",
            "right": "I’m going to study.",
            "why": "В конструкции going to нужен глагол be."
          },
          {
            "wrong": "Look at the sky. It will rain.",
            "right": "Look at the sky. It’s going to rain.",
            "why": "Если прогноз основан на видимых признаках сейчас, going to обычно точнее."
          },
          {
            "wrong": "I’m meeting him someday.",
            "right": "I’ll meet him someday. / I’m going to meet him someday.",
            "why": "Present Continuous естественнее для конкретной организованной договорённости, а не расплывчатого someday."
          }
        ]
      }
    ]
  }
];
