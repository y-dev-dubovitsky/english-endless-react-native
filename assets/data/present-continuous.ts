import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const PRESENT_CONTINUOUS: TenseInterface = {
  name: 'Present Continuous',
  strategies: [
    [0, 0, 0],
    [1, 2, 1],
    [2, 1, 2],
  ],
  pronounts: [
    [{ I: 'Я' }],
    [
      { He: 'Он' },
      { She: 'Она' },
      { It: 'Оно' },
      { Tom: 'Том' },
      { Kate: 'Кейт' },
      { James: 'Джеймс' },
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
    ],
    [{ We: 'Мы' }],
    [{ You: 'Ты' }],
  ],
  auxiliaries: [
    [{ am: '' }, { 'am not': 'не' }],
    [{ are: '' }, { 'are not': 'не' }],
    [{ is: '' }, { 'is not': 'не' }],
  ],
  verbs: [
    [
      { 'working at present ': 'работаю в настоящий момент' },
      { 'reading now': 'читаю прямо сейчас' },
      {
        'doing homework at the moment': 'делаю домашнюю работу в данный момент',
      },
      { 'fishing now': 'рыбачу сейчас' },
      { 'speaking over the telephone': 'разговариваю по телефону' },
      { 'watching TV now': 'смотрю сейчас телевизор' },
      { 'walking down the street': 'иду вниз по улице' },
      { 'cleaning the house': 'убираю дом' },
      { 'cooking now': 'готовлю сейчас' },
      {
        'preparing for her next week exam':
          'готовлюсь к экзамену, который будет на следующей неделе',
      },
      { 'looking for a job these days': 'ищу работу сейчас' },
      {
        'waiting for the parcel coming soon':
          'жду посылку, которая скоро придет',
      },
      { 'going to the seaside this evening': 'еду на море этим вечером' },
      { 'taking paternity leave': 'беру декретный отпуск' },
      { 'growing so fast': 'расту так быстро' },
      { 'trying to tell this story': 'пытаюсь рассказать историю' },
      { 'losing our keys on the vacation': 'теряю наши ключи в отпуске' },
    ],
    [
      { 'working now': 'работает прямо сейчас' },
      { 'reading now': 'читает прямо сейчас' },
      { 'working diligently on the project': 'усердно работает над проектом' },
      {
        'going home after a long day at work':
          'идет домой после долгого рабочего дня',
      },
      {
        'reading an intriguing book about history':
          'читает увлекательную книгу о истории',
      },
      {
        'watching a fascinating documentary on wildlife':
          'смотрит увлекательный документальный фильм о животных',
      },
      {
        'playing beautiful melodies on his guitar':
          'играет красивые мелодии на своей гитаре',
      },
      {
        'eating a delicious homemade dinner with family':
          'ужинает с семьей за вкусным домашним ужином',
      },
      {
        'drinking refreshing water after a workout':
          'пьет освежающую воду после тренировки',
      },
      {
        'baking fresh bread for the weekend brunch':
          'печет свежий хлеб для воскресного завтрака',
      },
      {
        'studying hard for his upcoming mathematics exam':
          'усердно учится к предстоящему экзамену по математике',
      },
      {
        'taking a well-deserved break from work':
          'делает заслуженный перерыв от работы',
      },
      {
        'traveling abroad to explore new cultures':
          'путешествует за границу, чтобы исследовать новые культуры',
      },
      {
        'drawing a stunning picture of a sunset':
          'рисует удивительную картину заката',
      },
      {
        'singing a heartfelt song to entertain his friends':
          'поет душевную песню, чтобы развлекать друзей',
      },
      {
        'fixing his old car that has been acting up':
          'ремонтирует свою старую машину, которая подводит',
      },
      {
        'learning new languages to broaden his horizons':
          'изучает новые языки, чтобы расширить свои горизонты',
      },
      {
        'cleaning his room to create a tidy space':
          'убирает свою комнату, чтобы создать порядок',
      },
      {
        'planning an exciting trip to the mountains':
          'планирует захватывающее путешествие в горы',
      },
      {
        'playing chess with his grandfather every Sunday':
          'играет в шахматы с дедом каждое воскресенье',
      },
      {
        'watching the sunset from the beach with friends':
          'смотрит на закат с пляжа с друзьями',
      },
      {
        'visiting a museum to admire ancient artifacts':
          'посещает музей, чтобы полюбоваться древними артефактами',
      },
      {
        'attending a meeting to discuss important decisions':
          'участвует в встрече, чтобы обсудить важные решения',
      },
    ],
    [
      { 'working now': 'работают прямо сейчас' },
      { 'reading now': 'читают прямо сейчас' },
      { 'analyzing data now': 'анализируют данные прямо сейчас' },
      {
        'negotiating contracts now':
          'ведут переговоры по контрактам прямо сейчас',
      },
      {
        'developing software now':
          'разрабатывают программное обеспечение сейчас',
      },
      { 'conducting research now': 'проводят исследование прямо сейчас' },
      { 'implementing strategies now': 'внедряют стратегии сейчас' },
      { 'coordinating projects now': 'координируют проекты прямо сейчас' },
      { 'synthesizing information now': 'синтезируют информацию сейчас' },
      { 'programming algorithms now': 'программируют алгоритмы прямо сейчас' },
      { 'debugging code now': 'отлаживают код сейчас' },
      {
        'optimizing performance now':
          'оптимизируют производительность прямо сейчас',
      },
      { 'architecting systems now': 'архитектурят системы сейчас' },
      { 'prototyping devices now': 'создают прототипы устройств прямо сейчас' },
      { 'simulating scenarios now': 'симулируют сценарии сейчас' },
      { 'forecasting trends now': 'прогнозируют тенденции прямо сейчас' },
      { 'validating hypotheses now': 'проверяют гипотезы сейчас' },
      { 'orchestrating operations now': 'оркестрируют операции прямо сейчас' },
      { 'deploying applications now': 'развёртывают приложения сейчас' },
      { 'monitoring networks now': 'мониторят сети прямо сейчас' },
      { 'troubleshooting issues now': 'устраняют неполадки сейчас' },
      {
        'benchmarking systems now':
          'тестируют производительность систем прямо сейчас',
      },
      { 'visualizing data now': 'визуализируют данные сейчас' },
      { 'automating processes now': 'автоматизируют процессы прямо сейчас' },
      { 'encrypting communications now': 'шифруют коммуникации сейчас' },
      { 'calibrating instruments now': 'калибруют инструменты прямо сейчас' },
      { 'compiling reports now': 'составляют отчёты прямо сейчас' },
      { 'auditing systems now': 'проводят аудит систем сейчас' },
      {
        'synchronizing databases now':
          'синхронизируют базы данных прямо сейчас',
      },
      { 'configuring servers now': 'конфигурируют серверы сейчас' },
      { 'modelling behaviors now': 'моделируют поведение прямо сейчас' },
      { 'integrating APIs now': 'интегрируют API сейчас' },
    ],
    [
      { 'working now': 'работаешь прямо сейчас' },
      { 'reading now': 'читаешь сейчас' },
    ],
  ],
  html: `${template}`,
};
