import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const PAST_CONTINUOUS: TenseInterface = {
  name: 'Past Continuous',
  strategies: [
    [0, 0, 0],
    [1, 0, 1],
    [2, 1, 2],
    [3, 1, 2],
    [4, 1, 4],
  ],
  pronounts: [
    [{ I: 'Я' }],
    [
      { He: 'Он' },
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
      { Astrologers: 'Астрологи' },
      { Cryptographers: 'Криптографы' },
      { Dancers: 'Танцоры' },
      { Ecologists: 'Экологи' },
      { Futurists: 'Футуристы' },
      { Geologists: 'Геологи' },
      { Historians: 'Историки' },
      { Illusionists: 'Иллюзионисты' },
      { Jugglers: 'Жонглеры' },
      { Kinetics: 'Кинетики' },
      { Linguists: 'Лингвисты' },
      { Mathematicians: 'Математики' },
      { Nautical: 'Моряки' },
      { Operatic: 'Оперные певцы' },
      { Psychiatrists: 'Психиатры' },
      { Quizzers: 'Викторинисты' },
      { Rhetoricians: 'Риторики' },
      { Seafarers: 'Мореплаватели' },
      { Tacticians: 'Тактики' },
      { Utopians: 'Утописты' },
      { Vintners: 'Виноделы' },
      { Weathercasters: 'Метеорологи' },
      { Xenologists: 'Ксенофилы' },
      { Yogi: 'Йоги' },
      { Zoologists: 'Зоологи' },
      { Artificers: 'Мастера' },
      { Blacksmiths: 'Кузнецы' },
      { Cartomancers: 'Гадалки по картам' },
      { Diplomats: 'Дипломаты' },
      { Ethnographers: 'Этнографы' },
      { Fabricators: 'Создатели' },
      { Glaziers: 'Стекольщики' },
      { Harbingers: 'Предвестники' },
      { Ichthyologists: 'Ихтиологи' },
      { Juggernauts: 'Джаггернауты' },
      { Keepers: 'Хранители' },
      { Lithographers: 'Литографы' },
      { Minstrels: 'Менестрели' },
      { Navigators: 'Навигаторы' },
      { Operatives: 'Оперативники' },
      { Philosophers: 'Философы' },
      { Quacks: 'Шарлатаны' },
      { Refineries: 'Рафинеры' },
      { Scribes: 'Писцы' },
      { Translators: 'Переводчики' },
    ],
    [{ We: 'Мы' }],
    [{ You: 'Ты' }],
  ],
  auxiliaries: [
    [{ was: '' }, { 'was not': 'не' }],
    [{ were: '' }, { 'were not': 'не' }],
  ],
  verbs: [
    [
      { 'reading last Monday ': 'читал в прошлый понедельник' },
      { 'reading the whole evening': 'читал весь вечер' },
      { 'cooking the whole evening': 'готовил весь вечер' },
      { 'dancing the whole evening': 'танцевал весь вечер' },
      { 'dancing all night long': 'танцевал всю ночь' },
      { 'dancing the whole morning': 'танцевал все утро' },
      { 'reading all day long': 'читал весь день' },
      { 'taking a shower': 'принимал душ' },
      { 'still dancing at midnight': 'танцевал все еще в полночь' },
      {
        'cleaning the house when the phone rang':
          'убирал дом в то время как зазвонил телефон',
      },
      {
        'cooking dinner when Jam suddenly cut his finger':
          'готовил обед, когда Джем внезапно порезал палец',
      },
      {
        'eating my soup when Matthey came home':
          'ел суп, когда Метью пришел домой',
      },
      {
        'doing her makeup while she was talking over the telephone':
          'делал макияж во время разговора по телефону',
      },
      {
        'drinking a cup of coffee while they were sitting at that restaurant':
          'пил кофе, когда сидели в том ресторане',
      },
      {
        'hoping to meet her at the bookstore but she didn’t come':
          'надеялся встретить её в книжном магазине, но она не пришла',
      },
      {
        'thinking of cooking a pie but we wanted some pizza.':
          'думал приготовить пирог, но мы хотели пиццы.',
      },
    ],
    [
      { 'working all night long': 'работал всю ночь' },
      { 'reading all night long': 'читал всю ночь' },
      { 'reading a book': 'читал книгу' },
      { 'watching TV': 'смотрел телевизор' },
      { 'cooking dinner': 'готовил ужин' },
      { 'playing soccer': 'играл в футбол' },
      { 'studying for exams': 'готовился к экзаменам' },
      { 'writing a letter': 'писал письмо' },
      { 'cleaning the house': 'убирал в доме' },
      { 'listening to music': 'слушал музыку' },
      { 'painting a picture': 'рисовал картину' },
      { 'working on a project': 'работал над проектом' },
      { 'writing an essay all day long': 'писал эссе весь день' },
      {
        'playing video games for several hours':
          'играл в видеоигры несколько часов',
      },
      {
        'watching the sunset until it got dark':
          'смотрел на закат, пока не стемнело',
      },
      {
        'cooking a big dinner for the family all evening':
          'готовил большой ужин для семьи весь вечер',
      },
      {
        'reading a novel on the couch all afternoon':
          'читал роман на диване весь день',
      },
      {
        'cleaning the garage from morning till evening':
          'убирал в гараже с утра до вечера',
      },
      {
        'studying for my finals late at night':
          'готовился к экзаменам поздно ночью',
      },
      {
        'playing the piano for hours before the concert':
          'играл на пианино несколько часов перед концертом',
      },
      {
        'practicing my presentation throughout the week':
          'репетировал свою презентацию на протяжении недели',
      },
      {
        'watching documentaries all weekend long':
          'смотрел документальные фильмы весь уикенд',
      },
    ],
    [
      { 'working all night long': 'работали всю ночь' },
      { 'reading all night long': 'читали всю ночь' },
      { 'reading a book all evening': 'читали книгу весь вечер' },
      { 'cooking dinner for the family': 'готовили ужин для семьи' },
      { 'watching a movie together': 'смотрели фильм вместе' },
      { 'playing basketball all afternoon': 'играли в баскетбол весь день' },
      {
        'studying for the exam late at night':
          'учились к экзамену поздно ночью',
      },
      { 'cleaning the house all weekend': 'убирали дом весь уикенд' },
      { 'working on a project for weeks': 'работали над проектом недели' },
      { 'writing emails throughout the morning': 'писали письма всё утро' },
      { 'driving to the coast all day': 'ехали к побережью весь день' },
      { 'painting the fence for hours': 'краскали забор несколько часов' },
      { 'walking in the park every Saturday': 'гуляли в парке каждую субботу' },
      { 'running a marathon during the race': 'бегали марафон во время гонки' },
      { 'discussing the book in class': 'обсуждали книгу на уроке' },
      { 'waiting for the bus all morning': 'ждали автобус всё утро' },
      { 'shopping for groceries all afternoon': 'делали покупки весь день' },
      { 'working in the garden every spring': 'работали в саду каждую весну' },
      { 'building the new shed together': 'строили новый сарай вместе' },
      { 'taking photos of the event': 'фотографировали мероприятие' },
      { 'chatting with friends all night': 'общались с друзьями всю ночь' },
    ],
    [
      { 'working all night long': 'работал всю ночь' },
      { 'reading all night long': 'читал всю ночь' },
      { 'studying all night long': 'учился всю ночь' },
      { 'playing the guitar for hours': 'играл на гитаре несколько часов' },
      { 'cooking a feast all day': 'готовил пиршество весь день' },
      { 'reading articles for research': 'читал статьи для исследования' },
      { 'watching the stars all weekend': 'смотрел на звезды весь уикенд' },
      {
        'cleaning the room before guests arrived':
          'убирал комнату перед приходом гостей',
      },
      {
        'preparing a presentation for the meeting':
          'готовил презентацию для собрания',
      },
      { 'painting the house all summer': 'красил дом всё лето' },
      { 'driving through the mountains all day': 'ехал через горы весь день' },
      {
        'listening to podcasts during work': 'слушал подкасты во время работы',
      },
      {
        'shopping for clothes all afternoon': 'делал покупки одежды весь день',
      },
      { 'practicing yoga every morning': 'занимался йогой каждое утро' },
      { 'watching tutorials on cooking': 'смотрел уроки по кулинарии' },
      { 'taking notes during the lecture': 'делал заметки во время лекции' },
      {
        'training for a competition every week':
          'тренировался к соревнованиям каждую неделю',
      },
    ],
  ],
  html: `${template}`,
};
