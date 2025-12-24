import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const FUTURE_CONTINUOUS: TenseInterface = {
  name: 'Future Continuous',
  strategies: [
    [0, 0, 0],
    [1, 1, 0],
    [2, 2, 0],
    [3, 3, 0],
    [4, 4, 0],
  ],
  pronounts: [
    [
      { I: 'Я' },
      { 'I have finished my business, I': 'Я закончил свои дела, Я' },
    ],
    [
      { He: 'Он' },
      { She: 'Она' },
      { It: 'Оно' },
      { Tom: 'Том' },
      { Kate: 'Кейт' },
      { James: 'Джеймс' },
      { Tom: 'Том' },
      { James: 'Джеймс' },
      { 'Samwise Gamgee': 'Сэмуайз Гэмджи' },
      { 'Donnie Darko': 'Донни Дарко' },
      { 'Rocky Balboa': 'Рокки Бальбоа' },
      { Groot: 'Грут' },
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
      { Boxers: 'Боксеры' },
      { Players: 'Игроки' },
      { Workers: 'Рабочие' },
      { Programmers: 'Программисты' },
      { Clowns: 'Клоуны' },
      { 'Police officers': 'Полицейские' },
      { Scientists: 'Ученые' },
      { Housewives: 'Домохозяйки' },
      { Sellers: 'Продавцы' },
      { Writers: 'Писатели' },
      { Musicians: 'Музыканты' },
      { Friends: 'Друзья' },
      { Programmers: 'Программисты' },
      { Gymnasts: 'Гимнасты' },
      { Leaders: 'Руководители' },
      { 'Cooks ': 'Повара' },
      { 'Mechanics ': 'Механики' },
      { 'Tutors ': 'Репетиторы' },
      { 'Coaches ': 'Тренеры' },
      { 'Photographers ': 'Фотографы' },
      { 'Farmers ': 'Фермеры' },
      { 'Plumbers ': 'Сантехники' },
      { 'Electricians ': 'Электрики' },
      { 'Accountants ': 'Бухгалтера' },
      { 'Programmers ': 'Программисты' },
      { 'Lawyers ': 'Юристы' },
      { 'Architects ': 'Архитекторы' },
      { 'Carpenters ': 'Плотники' },
      { 'Mechanics ': 'Механики' },
      { 'Bakers ': 'Пекари' },
      { 'Barbers ': 'Парикмахеры' },
      { 'Waiters ': 'Официанты' },
      { 'Cashiers ': 'Кассиры' },
      { 'Waitresses ': 'Официантки' },
      { 'Coaches ': 'Тренеры' },
      { 'Social Workers ': 'Социальные работники' },
      { 'Surveyors ': 'Геодезисты' },
      { 'Veterinarians ': 'Ветеринары' },
      { 'Dentists ': 'Стоматологи' },
      { 'Illusionists ': 'Иллюзионисты' },
      { 'Sommelier ': 'Сомелье' },
      { 'Futurists ': 'Долгосрочные прогнозисты' },
      { 'Mixologists ': 'Миксологи' },
      { 'Cryptographers ': 'Криптографы' },
      { 'Urban Explorers ': 'Городские исследователи' },
      { 'Sculptors ': 'Скульпторы' },
      { 'Content Creators ': 'Создатели контента' },
      { 'Gaming Streamers ': 'Геймеры-стримеры' },
      { 'Voice Actors ': 'Дикторы' },
      { 'Astrologers ': 'Астрологи' },
      { 'Stunt Performers ': 'Каскадеры' },
      { 'Culinary Artists ': 'Кулинарные художники' },
      { 'Fashion Stylists ': 'Мода-стилисты' },
      { 'Sound Designers ': 'Звуковые дизайнеры' },
      { 'Translators ': 'Переводчики' },
      { 'Life Coaches ': 'Коучи по жизни' },
      { 'Art Curators ': 'Куратора искусства' },
      { 'Tech Innovators ': 'Технологические новаторы' },
      { 'Toy Designers ': 'Дизайнеры игрушек' },
      { 'Pet Influencers ': 'Влиятельные личности для животных' },
      { 'Adventure Tour Guides ': 'Гиды по приключениям' },
      { 'Digital Nomads ': 'Цифровые кочевники' },
      { 'Experience Designers ': 'Дизайнеры впечатлений' },
      { 'Theme Park Designers ': 'Дизайнеры тематических парков' },
      { 'Alternative Therapists ': 'Альтернативные терапевты' },
      { 'Social Media Analysts ': 'Аналитики социальных медиа' },
      { 'Underwater Photographers ': 'Подводные фотографы' },
      { 'Luxury Travel Advisors ': 'Консультанты по роскошным путешествиям' },
      { 'Digital Artists ': 'Цифровые художники' },
      { 'Drone Operators ': 'Операторы дронов' },
      { 'Aquaponic Farmers ': 'Аквапонные фермеры' },
    ],
    [{ We: 'Мы' }],
    [{ You: 'Ты' }],
  ],
  auxiliaries: [
    [{ 'will be': 'буду' }, { 'will not': 'не буду' }],
    [{ 'will be': 'будет' }, { 'will not': 'не будет' }],
    [{ 'will be': 'будут' }, { 'will not': 'не будут' }],
    [{ 'will be': 'будем' }, { 'will not': 'не будем' }],
    [{ 'will be': 'будешь' }, { 'will not': 'не будешь' }],
  ],
  verbs: [
    [
      { "dancing at 5 o'clock": 'танцевать в 5 часов' },
      { 'reading this time tomorrow ': 'читать в это время завтра' },
      {
        'taking a bath the same time next week':
          'принимать душ в то же самое время на следующей неделе',
      },
      {
        'waiting for you here at 9 a.m. tomorrow':
          'ждать тебя здесь завтра в девять утра',
      },
      {
        'playing football all day next Sunday':
          'играть в футбол весь день в следующее воскресенье',
      },
      { 'cooking dinner when she leaves': 'готовить обед, когда она уйдет' },
      {
        'washing the car when the postman comes':
          ' мыть машину, когда придет почтальон',
      },
      {
        'washing the glass when the worker comes':
          'мыть стакан, когда придет рабочий',
      },
      {
        'watching the game when the rain starts':
          'смотреть игру, когда начнется дождь',
      },
      {
        'making cocktails and Ann will be meeting guests':
          'делать коктейли, а Анна будет встречать гостей',
      },
      {
        'making dinner and Jam will be meeting guests':
          'делать ужин, а Джем будет встречать гостей',
      },
      {
        'listening to music, Jake will be reading a book':
          'слушать музыку, а Джейк будет читать книгу',
      },
      {
        'sitting, watching movie and eating a pie':
          'сидеть, смотреть фильм и есть пирог',
      },
      {
        'meeting Jake’s parents this evening':
          'встречаться с родителями Джейка сегодня вечером',
      },
      {
        'meeting Jake’s parents from two till three':
          'встречаться с родителями Джейка с двух до трех',
      },
      {
        'waiting for you here from Monday till Friday':
          'ждать тебя здесь с понедельника по пятницу',
      },
      {
        'studying English grammar from nine till eleven':
          'заниматься английской грамматикой с девяти до одиннадцати',
      },
      {
        'working on the project from morning till evening':
          'работать над проектом с утра до вечера',
      },
      {
        'talking to my friends from five till seven':
          'разговаривать с моими друзьями с пяти до семи',
      },
      {
        'reading interesting books from January till March':
          'читать интересные книги с января по март',
      },
      {
        'walking in the park from spring till autumn':
          'гулять в парке с весны до осени',
      },
      {
        'visiting grandparents from Christmas till New Year':
          'навещать бабушку и дедушку с Рождества до Нового года',
      },
      {
        'organizing events from planning till execution':
          'организовывать мероприятия от планирования до выполнения',
      },
      {
        'translating documents from English till Russian':
          'переводить документы с английского на русский',
      },
      {
        'meditating in garden from first light till full morning':
          'медитировать в саду с первых лучей до полного утра',
      },
      {
        "babysitting neighbor's kids from four thirty till seven":
          'сидеть с соседскими детьми с четырех тридцати до семи',
      },
      {
        'researching topics from primary till secondary sources':
          'исследовать темы от первичных до вторичных источников',
      },
      {
        'gardening in backyard from planting till harvesting':
          'заниматься садоводством во дворе от посадки до сбора урожая',
      },
      {
        'cycling through city from north till south':
          'ездить на велосипеде по городу с севера на юг',
      },
      {
        'preparing presentation from outline till final version':
          'готовить презентацию от плана до финальной версии',
      },
      {
        'hiking in mountains from base till summit':
          'ходить в поход в горах от подножия до вершины',
      },
      {
        'hiking in mountains from base till summit':
          'ходить в поход в горах от подножия до вершины',
      },
      {
        'studying at university all day tomorrow':
          'изучать в университете весь день завтра',
      },
      {
        'traveling across Europe in the summer':
          'путешествовать по Европе летом',
      },
      {
        'cooking dinner together this evening':
          'готовить ужин вместе сегодня вечером',
      },
      {
        'repairing the bike in the garage later':
          'ремонтировать велосипед в гараже позже',
      },
      {
        'writing the report until midnight': 'писать отчет до полуночи',
      },
      {
        'practicing piano for two hours every day':
          'упражняться на пианино два часа каждый день',
      },
      {
        'working on the project throughout the night':
          'работать над проектом всю ночь',
      },
      {
        'discussing strategies in the meeting room':
          'обсуждать стратегии в会议 комнате',
      },
      {
        'painting the house next weekend': 'красить дом на следующих выходных',
      },
      {
        'running in the park every morning': 'бегать в парке каждое утро',
      },
      {
        'waiting for the bus at the station': 'ждать автобус на станции',
      },
      {
        'playing football with friends after school':
          'играть в футбол с друзьями после школы',
      },
      {
        'reading a book in the garden this afternoon':
          'читать книгу в саду сегодня днем',
      },
      {
        'taking photos during the trip': 'делать фотографии во время поездки',
      },
      {
        'watching a movie at home tonight':
          'смотреть фильм дома сегодня вечером',
      },
      {
        'shopping for groceries in the market': 'делать покупки на рынке',
      },
      {
        'visiting family next month': 'навестить семью в следующем месяце',
      },
      {
        'exploring the city on foot': 'исследовать город пешком',
      },
      {
        'attending the conference next week':
          'посещать конференцию на следующей неделе',
      },
      {
        'enjoying a picnic at the park on Sunday':
          'наслаждаться пикником в парке в воскресенье',
      },
      {
        'learning a new language for fun': 'учить новый язык для удовольствия',
      },
      {
        'organizing a fundraiser at school':
          'организовывать благотворительный сбор в школе',
      },
      {
        'participating in a charity event next month':
          'участвовать в благотворительном мероприятии в следующем месяце',
      },
      {
        'cycling along the river in the morning':
          'кататься на велосипеде вдоль реки утром',
      },
      {
        'skiing in the Alps this winter':
          'кататься на лыжах в Альпах этой зимой',
      },
      {
        'fishing by the lake during the vacation':
          'ловить рыбу у озера во время отпуска',
      },
      {
        'gardening in the backyard next Saturday':
          'заниматься садоводством в саду в следующую субботу',
      },
      {
        'running a marathon next year': 'бежать марафон в следующем году',
      },
      {
        'holding a meeting at 3 PM tomorrow':
          'проводить встречу завтра в 15:00',
      },
      {
        'playing board games with family tonight':
          'играть в настольные игры с семьей сегодня вечером',
      },
      {
        'cleaning the house this weekend': 'убирать дом на этих выходных',
      },
      {
        'taking a course online next month':
          'проходить курс онлайн в следующем месяце',
      },
      {
        'running errands all day on Saturday':
          'ездить по делам весь день в субботу',
      },
      {
        'packing for the trip in the evening':
          'паковать вещи для поездки вечером',
      },
      {
        'baking cookies for the party': 'печь печенье для вечеринки',
      },
      {
        'hiking along the coast during the weekend':
          'ходить в поход вдоль побережья на выходных',
      },
      {
        'conducting interviews all week': 'проводить собеседования всю неделю',
      },
      {
        'heading to the gym after work': 'идти в спортзал после работы',
      },
      {
        'painting a mural on the wall': 'рисовать мурал на стене',
      },
      {
        'training for the competition every day':
          'готовиться к соревнованиям каждый день',
      },
      {
        'visiting museums during the vacation':
          'посещать музеи во время отпуска',
      },
      {
        'sneaking a snack before dinner': 'утаивать перекус перед ужином',
      },
      {
        'cleaning up the backyard this fall': 'убирать задний двор этой осенью',
      },
      {
        'taking the dog for a walk tomorrow': 'выгуливать собаку завтра',
      },
      {
        'hosting a dinner party this weekend': 'проводить ужин в эти выходные',
      },
      {
        'watching the sunset by the beach': 'смотреть на закат на пляже',
      },
      {
        'going to a concert on Friday night':
          'идти на концерт в пятницу вечером',
      },
      {
        'discovering new cafes in the city': 'открывать новые кафе в городе',
      },
      {
        'sailing in the lake during summer': 'кататься на лодке на озере летом',
      },
      {
        'sharing stories around the campfire': 'делиться историями у костра',
      },
      {
        'attending yoga classes every Sunday':
          'посещать занятия йогой каждое воскресенье',
      },
      {
        'starting a new workout routine next month':
          'начинать новую тренировочную программу в следующем месяце',
      },
      {
        'learning to play guitar this winter':
          'учиться играть на гитаре этой зимой',
      },
      {
        'decorating the house for the holidays': 'украшать дом к праздникам',
      },
      {
        'organizing a community event next month':
          'организовывать городское мероприятие в следующем месяце',
      },
      {
        'practicing meditation every morning':
          'практиковать медитацию каждое утро',
      },
      {
        'taking a road trip in the summer': 'ехать в поездку на машине летом',
      },
      {
        'hiking in the mountains every weekend':
          'ходить в поход в горах каждые выходные',
      },
      {
        'spending time with family during the holidays':
          'проводить время с семьей во время праздников',
      },
      {
        'cooking a new recipe on Sunday': 'готовить новый рецепт в воскресенье',
      },
      {
        'visiting friends on the weekend': 'навещать друзей на выходных',
      },
      {
        'attending a festival next month':
          'посещать фестиваль в следующем месяце',
      },
      {
        'exploring nature trails this spring':
          'исследовать тропы природы этой весной',
      },
      {
        'hunting for antiques at the flea market':
          'искать антиквариат на блошином рынке',
      },
      {
        'flying to different countries this year':
          'лететь в разные страны в этом году',
      },
      {
        'playing tennis in the evenings': 'играть в теннис по вечерам',
      },
      {
        'doing volunteer work at the shelter':
          'заниматься волонтерской работой в приюте',
      },
      {
        'writing in a journal every day': 'писать в журнал каждый день',
      },
      {
        'attending a workshop on art techniques':
          'посещать мастер-класс по художественным техникам',
      },
      {
        'running a small business from home': 'вести малый бизнес из дома',
      },
      {
        'practicing calligraphy in the evenings':
          'упражняться в каллиграфии по вечерам',
      },
      {
        'supporting local businesses during the holiday season':
          'поддерживать местные предприятия в праздничный сезон',
      },
    ],
  ],
  html: `${template}`,
};
