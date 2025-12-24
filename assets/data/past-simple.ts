import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const PAST_SIMPLE: TenseInterface = {
  name: 'Past Simple',
  strategies: [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 1],
    [3, 0, 1],
    [4, 0, 4],
    [0, 1, 2],
    [1, 1, 2],
    [2, 1, 3],
    [3, 1, 3],
    [4, 1, 2],
  ],
  pronounts: [
    [{ I: 'Я' }],
    [
      { He: 'Он' },
      { Tom: 'Том' },
      { Kate: 'Кейт' },
      { James: 'Джеймс' },
      { 'Edna Mode': 'Эдна Мод' },
      { 'Randle McMurphy': 'Рэндл Макмерфи' },
      { 'Optimus Prime': 'Оптимус Прайм' },
      { 'Norman Bates': 'Норман Бейтс' },
      { Legolas: 'Леголас' },
      { 'Alexandre Drakon': 'Александр Дракон' },
      { 'Michael Storm': 'Майкл Шторм' },
      { 'James Falcon': 'Джеймс Фалкон' },
      { 'Victor Blackwood': 'Виктор Блэквуд' },
      { 'Thomas Shadow': 'Томас Шэдоу' },
      { 'Henry Steel': 'Генри Стил' },
      { 'Daniel Night': 'Дэниел Найт' },
      { 'Lucas Hart': 'Лукас Харт' },
      { 'Scott Ranger': 'Скотт Рейнджер' },
      { 'Ethan Blaze': 'Итан Блейз' },
      { 'Dorian Knight': 'Дориан Найт' },
      { 'Nathan True': 'Нэйтан Тру' },
      { 'Jake Thunder': 'Джейк Тандер' },
      { 'Mark Valor': 'Марк Валор' },
      { 'Gabriel Grey': 'Габриэль Грей' },
      { 'Julian Hawk': 'Джулиан Хоак' },
      { 'Bartley Noir': 'Бартли Нуар' },
      { 'Sidney Sterling': 'Сидни Стерлинг' },
      { 'Brandon Stone': 'Брэндон Стоун' },
      { 'Ronald Cross': 'Рональд Кросс' },
      { 'Ivan Petrov': 'Иван Петров' },
      { 'Alexey Smirnov': 'Алексей Смирнов' },
      { 'Dmitry Volkov': 'Дмитрий Волков' },
      { 'Sergey Popov': 'Сергей Попов' },
      { 'Nikolai Chernov': 'Николай Чернов' },
      { 'Vladimir Lebedev': 'Владимир Лебедев' },
      { 'Artyom Vasiliev': 'Артём Васильев' },
      { 'Maxim Kuznetsov': 'Максим Кузнецов' },
      { 'Roman Grigoriev': 'Роман Григорьев' },
      { 'Pavel Sokolov': 'Павел Соколов' },
      { 'Egor Tikhonov': 'Егор Тихонов' },
      { 'Anton Fedorov': 'Антон Фёдоров' },
      { 'Andrei Zaitsev': 'Андрей Зайцев' },
      { 'Kirill Semyonov': 'Кирилл Семёнов' },
      { 'Denis Morozov': 'Денис Морозов' },
      { 'Valery Ivanov': 'Валерий Иванов' },
      { 'Viktor Afanasyev': 'Виктор Афанасьев' },
      { 'Yuri Dmitriev': 'Юрий Дмитриев' },
      { 'Leonid Orlov': 'Леонид Орлов' },
      { 'Mikhail Pankratov': 'Михаил Панкратов' },
    ],
    [
      { They: 'Они' },
      { Athletes: 'Спортсмены' },
      { Students: 'Студенты' },
      { Teachers: 'Учителя' },
      { Biologists: 'Биологи' },
      { Philosophers: 'Философы' },
      { Alchemists: 'Алхимики' },
      { Adventurers: 'Авантюристы' },
      { Dreamers: 'Мечтатели' },
      { Explorer: 'Исследователи' },
      { Nomads: 'Номады' },
      { Inventors: 'Изобретатели' },
      { Poets: 'Поэты' },
      { Guardians: 'Хранители' },
      { Mystics: 'Мистики' },
      { Theorists: 'Теоретики' },
      { Architects: 'Архитекторы' },
      { Emissaries: 'Посланцы' },
      { Artisans: 'Ремесленники' },
      { Scribes: 'Писцы' },
      { Historians: 'Историки' },
      { Warriors: 'Воины' },
      { Navigators: 'Навигаторы' },
      { Cartographers: 'Картографы' },
      { Sculptors: 'Скульпторы' },
      { Enchanters: 'Чародеи' },
      { Seers: 'Прозорливцы' },
      { Architects: 'Архитекторы' },
      { Philosophers: 'Философы' },
      { Psychologists: 'Психологи' },
      { Magicians: 'Маги' },
      { Biochemists: 'Биохимики' },
      { Curators: 'Кураторы' },
      { Botanists: 'Ботаники' },
      { Connoisseurs: 'Знатоки' },
    ],
    [{ We: 'Мы' }],
    [{ You: 'Ты' }],
  ],
  auxiliaries: [[{ '': '' }], [{ 'did not': 'не' }]],
  verbs: [
    [
      { 'worked yesterday': 'работал вчера' },
      { 'worked on the project yesterday': 'работал над проектом вчера' },
      {
        'played basketball with friends yesterday':
          'играл в баскетбол с друзьями вчера',
      },
      {
        'studied for the exam for hours yesterday':
          'учился к экзамену несколько часов вчера',
      },
      {
        'visited my grandparents yesterday': 'посетил бабушку и дедушку вчера',
      },
      { 'cooked a delicious dinner yesterday': 'готовил вкусный ужин вчера' },
      {
        'watched a documentary about nature yesterday':
          'смотрел документальный фильм о природе вчера',
      },
      {
        'cleaned my room and the kitchen yesterday':
          'убирал свою комнату и кухню вчера',
      },
      {
        'walked in the park during the evening yesterday':
          'гулял в парке вчера вечером',
      },
      {
        'called my friend to catch up yesterday':
          'звонил другу, чтобы пообщаться вчера',
      },
      {
        'danced at the party last night': 'танцевал на вечеринке прошлой ночью',
      },
      {
        'traveled to the countryside with family yesterday':
          'путешествовал за город с семьей вчера',
      },
      {
        'painted a landscape in my sketchbook yesterday':
          'рисовал пейзаж в своем блокноте вчера',
      },
      {
        'tried a new recipe for dinner yesterday':
          'попробовал новый рецепт для ужина вчера',
      },
      {
        'helped my neighbor with their garden yesterday':
          'помог соседу с садом вчера',
      },
      {
        'finished reading an interesting book yesterday':
          'завершил чтение интересной книги вчера',
      },
      {
        'hiked a mountain trail with friends yesterday':
          'поднимался по горной тропе с друзьями вчера',
      },
      {
        'played the guitar for a few hours yesterday':
          'играл на гитаре несколько часов вчера',
      },
      {
        'shopped for groceries and household items yesterday':
          'делал покупки продуктов и товаров для дома вчера',
      },
      {
        'laughed at a funny movie last night':
          'смеялся над смешным фильмом прошлой ночью',
      },
      {
        'listened to my favorite music while working yesterday':
          'слушал любимую музыку во время работы вчера',
      },
      {
        'fixed the broken faucet in the kitchen yesterday':
          'починил сломанный кран на кухне вчера',
      },
      {
        'reviewed my notes for the upcoming test yesterday':
          'обзорел свои заметки к предстоящему тесту вчера',
      },
      {
        'watched a comedy show on television yesterday':
          'смотрел комедийное шоу по телевидению вчера',
      },
      {
        'organized my desk and files yesterday':
          'организовал свой стол и документы вчера',
      },
      {
        'trained for the marathon yesterday morning':
          'тренировался к марафону вчера утром',
      },
      {
        'explored a new part of the city yesterday':
          'исследовал новую часть города вчера',
      },
      {
        'asked for help with my homework yesterday':
          'спрашивал о помощи с домашним заданием вчера',
      },
      {
        'taught a friend how to play chess yesterday':
          'учил друга играть в шахматы вчера',
      },
      {
        'shared my vacation photos with family yesterday':
          'поделился фотографиями с отпуска с семьей вчера',
      },
      {
        'enjoyed a relaxing day at home yesterday':
          'наслаждался спокойным днем дома вчера',
      },
    ],
    [
      { 'worked yesterday': 'работали вчера' },
      { 'worked yesterday': 'работали вчера' },
      { 'played video games yesterday': 'играли в видеоигры вчера' },
      {
        'studied English for two hours yesterday':
          'учили английский два часа вчера',
      },
      { 'cooked dinner together yesterday': 'готовили ужин вместе вчера' },
      {
        'visited the museum last weekend': 'посетили музей в прошлые выходные',
      },
      { 'watched a movie at home yesterday': 'смотрели фильм дома вчера' },
      {
        'cleaned the house before dinner yesterday':
          'убирали дом перед ужином вчера',
      },
      {
        'walked their dogs in the park yesterday':
          'выгуливали своих собак в парке вчера',
      },
      {
        'called their parents to chat yesterday':
          'звонили родителям, чтобы пообщаться, вчера',
      },
      {
        'danced at the party all night yesterday':
          'танцевали на вечеринке всю ночь вчера',
      },
      {
        'traveled to a new city last summer':
          'путешествовали в новый город прошлым летом',
      },
      {
        'painted the fence yesterday afternoon':
          'красили забор вчера после обеда',
      },
      {
        'tried new dishes at the restaurant yesterday':
          'пробовали новые блюда в ресторане вчера',
      },
      {
        'helped their friends move yesterday':
          'помогали друзьям переехать вчера',
      },
      {
        'finished their assignments before the deadline yesterday':
          'завершили задания до срока вчера',
      },
      {
        'baked cakes for the celebration yesterday':
          'пекли торты для праздника вчера',
      },
      {
        'visited their grandparents yesterday':
          'посетили бабушку и дедушку вчера',
      },
      {
        'listened to music while working yesterday':
          'слушали музыку во время работы вчера',
      },
      {
        'discussed their plans for the weekend yesterday':
          'обсуждали свои планы на выходные вчера',
      },
      {
        'practiced their presentation together yesterday':
          'репетировали свою презентацию вместе вчера',
      },
      {
        'played cards with friends yesterday':
          'играли в карты с друзьями вчера',
      },
      { 'completed their projects yesterday': 'завершили свои проекты вчера' },
      {
        'enjoyed a relaxing day yesterday': 'наслаждались спокойным днем вчера',
      },
      { 'celebrated a birthday yesterday': 'отметили день рождения вчера' },
      {
        'organized a charity event yesterday':
          'организовали благотворительное мероприятие вчера',
      },
      { 'shopped for groceries yesterday': 'делали покупки продуктов вчера' },
      {
        'watched a documentary about nature yesterday':
          'смотрели документальный фильм о природе вчера',
      },
      {
        'repaired their bikes yesterday': 'ремонтировали свои велосипеды вчера',
      },
      { 'attended a workshop yesterday': 'посетили семинар вчера' },
      { 'helped clean the beach yesterday': 'помогали убирать пляж вчера' },
    ],
    [
      { 'work yesterday': 'работал вчера' },
      { 'play yesterday': 'играл вчера' },
      { 'study yesterday': 'учился вчера' },
      { 'cook yesterday': 'готовил вчера' },
      { 'visit yesterday': 'посетил вчера' },
      { 'watch yesterday': 'смотрел вчера' },
      { 'clean yesterday': 'убирал вчера' },
      { 'walk yesterday': 'гулял вчера' },
      { 'call yesterday': 'звонил вчера' },
      { 'dance yesterday': 'танцевал вчера' },
      { 'travel yesterday': 'путешествовал вчера' },
      { 'paint yesterday': 'рисовал вчера' },
      { 'try yesterday': 'попробовал вчера' },
      { 'help yesterday': 'помогал вчера' },
      { 'finish yesterday': 'завершил вчера' },
      { 'hike yesterday': 'поднимался вчера' },
      { 'practice yesterday': 'репетировал вчера' },
      { 'shop yesterday': 'делал покупки вчера' },
      { 'laugh yesterday': 'смеялся вчера' },
      { 'listen yesterday': 'слушал вчера' },
      { 'fix yesterday': 'починил вчера' },
      { 'review yesterday': 'обзорел вчера' },
      { 'arrange yesterday': 'организовал вчера' },
      { 'train yesterday': 'тренировался вчера' },
      { 'explore yesterday': 'исследовал вчера' },
      { 'ask yesterday': 'спрашивал вчера' },
      { 'teach yesterday': 'учил вчера' },
      { 'share yesterday': 'поделился вчера' },
      { 'enjoy yesterday': 'наслаждался вчера' },
      { 'attend yesterday': 'посещал вчера' },
      { 'celebrate yesterday': 'отметил вчера' },

      { 'work on the project yesterday': 'работал над проектом вчера' },
      {
        'play soccer with my friends yesterday':
          'играл в футбол с друзьями вчера',
      },
      {
        'study for my final exams yesterday':
          'учился к финальным экзаменам вчера',
      },
      {
        'cook dinner for the whole family yesterday':
          'готовил ужин для всей семьи вчера',
      },
      {
        'visit my grandmother in the hospital yesterday':
          'посетил бабушку в больнице вчера',
      },
      {
        'watch a documentary about nature yesterday':
          'смотрел документальный фильм о природе вчера',
      },
      {
        'clean the house before the guests arrived yesterday':
          'убирал дом перед приходом гостей вчера',
      },
      {
        'walk in the park with my dog yesterday':
          'гулял в парке с собакой вчера',
      },
      {
        'call my friend to catch up yesterday':
          'звонил другу, чтобы пообщаться, вчера',
      },
      {
        'dance at the wedding celebration yesterday':
          'танцевал на свадебном празднике вчера',
      },
      {
        'travel to another city for a meeting yesterday':
          'путешествовал в другой город на встречу вчера',
      },
      {
        'paint the fence in my backyard yesterday':
          'красил забор на заднем дворе вчера',
      },
      {
        'try a new restaurant for lunch yesterday':
          'пробовал новое кафе на обед вчера',
      },
      {
        'help my neighbor fix his car yesterday':
          'помог соседу починить его машину вчера',
      },
      {
        'finish reading a book I started last week yesterday':
          'завершил чтение книги, которую начал на прошлой неделе, вчера',
      },
      {
        'hike up the mountain trail with friends yesterday':
          'поднимался по горной тропе с друзьями вчера',
      },
      {
        'practice the piano for an hour yesterday':
          'репетировал на пианино час вчера',
      },
      {
        'shop for groceries at the local market yesterday':
          'делал покупки продуктов на местном рынке вчера',
      },
      {
        'laugh at the jokes during the comedy show yesterday':
          'смеялся над шутками во время комедийного шоу вчера',
      },
      {
        'listen to a podcast while working yesterday':
          'слушал подкаст во время работы вчера',
      },
      {
        'fix the broken chair in the living room yesterday':
          'починил сломанное кресло в гостиной вчера',
      },
      {
        'review the presentation for the meeting yesterday':
          'обзорел презентацию для встречи вчера',
      },
      {
        'arrange my desk at home yesterday': 'организовал свой стол дома вчера',
      },
      {
        'train for the upcoming marathon yesterday':
          'тренировался к предстоящему марафону вчера',
      },
      {
        'explore a new part of the city yesterday':
          'исследовал новую часть города вчера',
      },
      {
        'ask my teacher for clarification yesterday':
          'спрашивал учителя для разъяснения вчера',
      },
      {
        'teach my little brother how to ride a bike yesterday':
          'учил младшего брата кататься на велосипеде вчера',
      },
      {
        'share my travel experiences with friends yesterday':
          'поделился своими путешествиями с друзьями вчера',
      },
      {
        'enjoy a quiet evening at home yesterday':
          'наслаждался тихим вечером дома вчера',
      },
      {
        'attend a workshop on photography yesterday':
          'посещал семинар по фотографии вчера',
      },
      {
        'collaborate on a project yesterday': 'сотрудничали над проектом вчера',
      },
      {
        'photograph the beautiful sunset yesterday':
          'фотографировали красивый закат вчера',
      },
      {
        'participate in a community event yesterday':
          'участвовали в общественном мероприятии вчера',
      },
      {
        'analyze the data for our research yesterday':
          'анализировали данные для нашего исследования вчера',
      },
      {
        'experiment with new recipes yesterday':
          'экспериментировали с новыми рецептами вчера',
      },
      {
        'volunteer at the animal shelter yesterday':
          'работали волонтерами в приюте для животных вчера',
      },
      {
        'communicate with clients about their needs yesterday':
          'общались с клиентами о их потребностях вчера',
      },
      {
        'compete in a local tournament yesterday':
          'соревновались на местном турнире вчера',
      },
      {
        'discover new places in the city yesterday':
          'обнаружили новые места в городе вчера',
      },
      {
        'evaluate the progress of our project yesterday':
          'оценивали прогресс нашего проекта вчера',
      },
      {
        'recommend books to my friends yesterday':
          'рекомендовал книги своим друзьям вчера',
      },
      {
        'facilitate the workshop on leadership yesterday':
          'проводили семинар по лидерству вчера',
      },
      {
        'contribute to a team discussion yesterday':
          'вносили вклад в командное обсуждение вчера',
      },
      {
        'analyze the results of the survey yesterday':
          'анализировали результаты опроса вчера',
      },
      {
        'formulate a new strategy for our business yesterday':
          'разработали новую стратегию для нашего бизнеса вчера',
      },
      {
        'negotiate a better deal with the supplier yesterday':
          'ведомели переговоры о лучшем предложении с поставщиком вчера',
      },
      {
        'design a new logo for the company yesterday':
          'разработали новый логотип для компании вчера',
      },
      {
        'implement changes to the workflow yesterday':
          'внедрили изменения в рабочий процесс вчера',
      },
      {
        'preserve the historical buildings in our city yesterday':
          'сохраняли исторические здания в нашем городе вчера',
      },
      {
        'demonstrate the new software to the team yesterday':
          'продемонстрировали новое программное обеспечение команде вчера',
      },
      {
        'estimate the budget for the upcoming project yesterday':
          'оценивали бюджет для предстоящего проекта вчера',
      },
      {
        'discuss the potential risks yesterday':
          'обсуждали потенциальные риски вчера',
      },
      {
        'inform our clients about the changes yesterday':
          'информировали наших клиентов об изменениях вчера',
      },
      {
        'investigate the issue thoroughly yesterday':
          'исследовали проблему подробно вчера',
      },
      {
        'synthesize ideas from different areas yesterday':
          'синтезировали идеи из разных областей вчера',
      },
      {
        'challenge assumptions during the meeting yesterday':
          'проверяли предположения во время встречи вчера',
      },
      {
        'streamline the process for better efficiency yesterday':
          'оптимизировали процесс для лучшей эффективности вчера',
      },
      {
        'conduct an interview with the candidate yesterday':
          'провели интервью с кандидатом вчера',
      },
      {
        'promote the event through social media yesterday':
          'продвигали мероприятие через социальные сети вчера',
      },
      {
        'utilize feedback to improve our services yesterday':
          'использовали отзывы для улучшения наших услуг вчера',
      },
    ],
    [
      { 'work yesterday': 'работали вчера' },
      { 'collaborate yesterday': 'сотрудничали вчера' },
      { 'photograph yesterday': 'фотографировали вчера' },
      { 'participate yesterday': 'участвовали вчера' },
      { 'analyze yesterday': 'анализировали вчера' },
      { 'experiment yesterday': 'экспериментировали вчера' },
      { 'volunteer yesterday': 'работали волонтерами вчера' },
      { 'communicate yesterday': 'общались вчера' },
      { 'compete yesterday': 'соревновались вчера' },
      { 'discover yesterday': 'обнаружили вчера' },
      { 'evaluate yesterday': 'оценивали вчера' },
      { 'recommend yesterday': 'рекомендовали вчера' },
      { 'facilitate yesterday': 'проводили вчера' },
      { 'contribute yesterday': 'вносили вклад вчера' },
      { 'formulate yesterday': 'разработали вчера' },
      { 'negotiate yesterday': 'вели переговоры вчера' },
      { 'design yesterday': 'разработали вчера' },
      { 'implement yesterday': 'внедрили вчера' },
      { 'preserve yesterday': 'сохраняли вчера' },
      { 'demonstrate yesterday': 'продемонстрировали вчера' },
      { 'estimate yesterday': 'оценивали вчера' },
      { 'discuss yesterday': 'обсуждали вчера' },
      { 'inform yesterday': 'информировали вчера' },
      { 'investigate yesterday': 'исследовали вчера' },
      { 'synthesize yesterday': 'синтезировали вчера' },
      { 'challenge yesterday': 'проверяли вчера' },
      { 'streamline yesterday': 'оптимизировали вчера' },
      { 'conduct yesterday': 'провели вчера' },
      { 'promote yesterday': 'продвигали вчера' },
      { 'utilize yesterday': 'использовали вчера' },
      { 'celebrate yesterday': 'отметили вчера' },
    ],
  ],
  html: `${template}`,
};
