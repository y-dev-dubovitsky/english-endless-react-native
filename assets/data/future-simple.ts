import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const FUTURE_SIMPLE: TenseInterface = {
  name: 'Future Simple',
  strategies: [
    [0, 0, 0],
    [1, 0, 1],
    [2, 0, 2],
    [3, 0, 3],
    [4, 0, 4],
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
  ],
  pronounts: [
    [{ I: 'Я' }],
    [
      { He: 'Он' },
      { Tom: 'Том' },
      { James: 'Джеймс' },
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
    [{ They: 'Они' }],
    [{ We: 'Мы' }],
    [{ You: 'Ты' }],
  ],
  auxiliaries: [[{ will: '' }], [{ 'will not': 'не' }]],
  verbs: [
    [
      { 'open the window tomorrow ': 'открою окно завтра' },
      { 'finish the project next week ': 'завершу проект на следующей неделе' },
      { 'call the doctor in the morning ': 'позвоню врачу утром' },
      { 'send the email by tonight ': 'отправлю письмо к вечеру' },
      {
        'cook dinner for the family tonight ':
          'приготовлю ужин для семьи сегодня вечером',
      },
      {
        'study for the exam this weekend ':
          'подготовлюсь к экзамену в эти выходные',
      },
      { 'clean the house on Saturday ': 'уберу дом в субботу' },
      {
        'meet with the client next Friday ':
          'встречусь с клиентом в следующую пятницу',
      },
      {
        'arrange the meeting next week ':
          'организую встречу на следующей неделе',
      },
      {
        'read the book by the end of the month ':
          'прочитаю книгу к концу месяца',
      },
      {
        'prepare the presentation for Monday ':
          'подготовлю презентацию к понедельнику',
      },
      { 'take the dog for a walk tomorrow ': 'выгуляю собаку завтра' },
      { 'submit the report next week ': 'подам отчет на следующей неделе' },
      { 'organize the files this afternoon ': 'упорядочу файлы сегодня днем' },
      { 'buy groceries on Saturday ': 'куплю продукты в субботу' },
      { 'repair the car by Friday ': 'починю машину к пятнице' },
      {
        'attend the meeting next Monday ':
          'посещу встречу в следующий понедельник',
      },
      {
        'visit my grandparents this weekend ':
          'навещу бабушку и дедушку в эти выходные',
      },
      {
        'finish reading the book by tomorrow ':
          'завершу чтение книги к завтрашнему дню',
      },
      {
        'make dinner for the family tonight ':
          'приготовлю ужин для семьи сегодня вечером',
      },
      { 'call my friend later ': 'позвоню другу позже' },
      {
        'start a new project next month ':
          'начну новый проект в следующем месяце',
      },
      { 'plan a vacation for summer ': 'планирую отпуск на лето' },
      { 'clean the garage on Sunday ': 'уберу гараж в воскресенье' },
      { 'attend a concert next week ': 'пойду на концерт на следующей неделе' },
      {
        'help with the homework tonight ':
          'помогу с домашним заданием сегодня вечером',
      },
      { 'pick up the package tomorrow ': 'заберу посылку завтра' },
      { 'join the gym next month ': 'запишусь в спортзал в следующем месяце' },
      { 'visit the doctor next Friday ': 'сходим к врачу в следующую пятницу' },
      {
        'send the invitations by the weekend ':
          'отправлю приглашения к выходным',
      },
      { 'prepare lunch for the picnic ': 'приготовлю обед для пикника' },
      { 'buy a new laptop next year ': 'куплю новый ноутбук в следующем году' },
      { 'write an article for the magazine ': 'напишу статью для журнала' },
      {
        'discover new restaurants in the city ':
          'открою новые рестораны в городе',
      },
      { 'finish the proposal by the deadline ': 'завершу предложение к сроку' },
      {
        'draft a new policy this week ':
          'подготовлю новую политику на этой неделе',
      },
      {
        'return the library book by next Friday ':
          'верну книгу в библиотеку к следующей пятнице',
      },
      { 'arrange a meeting with the team ': 'организую встречу с командой' },
      { 'read the news every morning ': 'читаю новости каждое утро' },
      {
        'explore the new city during the trip ':
          'исследую новый город во время поездки',
      },
      { 'find a solution to the issue soon ': 'найду решение проблемы скоро' },
      {
        'plan a project presentation for next month ':
          'планирую презентацию проекта на следующий месяц',
      },
      {
        'enjoy a quiet weekend at home ': 'наслажусь спокойными выходными дома',
      },
      {
        'celebrate my birthday with friends ':
          'отмечу день рождения с друзьями',
      },
      {
        'take a break from work next week ':
          'возьму перерыв на работе на следующей неделе',
      },
    ],
    [
      { 'open the window tomorrow ': 'откроет окно завтра' },
      { 'open the window tomorrow ': 'откроет окно завтра' },
      { 'finish the report next week ': 'завершит отчет на следующей неделе' },
      { 'call the doctor in the morning ': 'позвонит врачу утром' },
      { 'send the email by noon ': 'отправит письмо к полудню' },
      {
        'prepare dinner for the family tonight ':
          'приготовит ужин для семьи сегодня вечером',
      },
      { 'clean the garage on Saturday ': 'уберет гараж в субботу' },
      {
        'organize the meeting next week ':
          'организует встречу на следующей неделе',
      },
      {
        'study for the exam this weekend ':
          'подготовится к экзамену на этих выходных',
      },
      {
        'pick up the groceries tomorrow evening ':
          'заберет продукты завтра вечером',
      },
      { 'bake a cake for the party ': 'испечет торт для вечеринки' },
      {
        'read the book by next Friday ': 'прочитает книгу к следующей пятнице',
      },
      { 'buy the tickets for the concert ': 'купит билеты на концерт' },
      { 'repair the bike by Sunday ': 'починит велосипед к воскресенью' },
      { 'finish the project by the deadline ': 'завершит проект к сроку' },
      { 'upload the photos to the website ': 'загрузит фотографии на сайт' },
      {
        'return the library book by next week ':
          'вернет книгу в библиотеку на следующей неделе',
      },
      { 'arrange the chairs for the meeting ': 'расставит стулья для встречи' },
      { 'solve the issue by Friday ': 'решит проблему к пятнице' },
      { 'make coffee in the morning ': 'приготовит кофе утром' },
      { 'clear the desk by today ': 'уберет со стола до конца дня' },
      { 'close the window if it rains ': 'закроет окно, если пойдет дождь' },
      {
        'organize the files by the end of the day ':
          'упорядочит файлы к концу дня',
      },
      { 'finish the chores by evening ': 'завершит дела к вечеру' },
      {
        'write the article by next month ':
          'напишет статью к следующему месяцу',
      },
      { 'plan the vacation for summer ': 'спланирует отпуск на лето' },
      { 'find the keys before leaving ': 'найдет ключи перед выходом' },
      { 'send a postcard from the trip ': 'отправит открытку из поездки' },
      { 'invite friends to the party ': 'пригласит друзей на вечеринку' },
      { 'prepare the meeting agenda ': 'подготовит повестку дня для встречи' },
      { 'take a break after lunch ': 'сделает перерыв после обеда' },
      { 'book a table at the restaurant ': 'забронирует столик в ресторане' },
      {
        'study the new material tonight ':
          'изучит новый материал сегодня вечером',
      },
      {
        'call the cable company tomorrow ':
          'позвонит в кабельную компанию завтра',
      },
    ],
    [
      { 'open the window tomorrow ': 'откроют окно завтра' },
      { 'close the door tonight ': 'закроют дверь сегодня вечером' },
      {
        'prepare the presentation for Monday ':
          'подготовят презентацию к понедельнику',
      },
      {
        'finish the homework before dinner ':
          'завершат домашнее задание перед ужином',
      },
      { 'send the report by Friday ': 'отправят отчет к пятнице' },
      { 'call the technician tomorrow ': 'позвонят технику завтра' },
      {
        'organize the event next week ':
          'организуют мероприятие на следующей неделе',
      },
      { 'buy groceries for dinner ': 'купят продукты для ужина' },
      { 'clean the house this weekend ': 'уберут дом в эти выходные' },
      { 'visit the museum on Sunday ': 'посетят музей в воскресенье' },
      { 'meet the deadline next month ': 'выполнят срок в следующем месяце' },
      { 'read the book by next week ': 'прочитают книгу к следующей неделе' },
      { 'upload the pictures to the website ': 'загрузят фотографии на сайт' },
      { 'drive to the lake tomorrow ': 'поедут к озеру завтра' },
      {
        'finish the project by the end of the month ':
          'завершат проект к концу месяца',
      },
      {
        'share the documents by email ':
          'поделятся документами по электронной почте',
      },
      { 'prepare lunch for the meeting ': 'приготовят обед для встречи' },
      { 'find the keys before leaving ': 'найдут ключи перед выходом' },
      { 'take the dog for a walk later ': 'выгуляют собаку позже' },
      {
        'join the conference next week ':
          'присоединятся к конференции на следующей неделе',
      },
      { 'submit the application by Tuesday ': 'подадут заявку к вторнику' },
      { 'resolve the issue by tomorrow ': 'решат проблему к завтрашнему дню' },
      {
        'schedule the appointment for next month ':
          'назначат встречу на следующий месяц',
      },
      { 'paint the fence this weekend ': 'покрасят забор в эти выходные' },
      { 'book a flight for the holiday ': 'забронируют рейс на праздник' },
      { 'write the report by the deadline ': 'напишут отчет к сроку' },
      { 'attend the workshop on Saturday ': 'посетят мастер-класс в субботу' },
      { 'pick up the laundry on Wednesday ': 'заберут стирку в среду' },
      {
        'research the topic for the presentation ':
          'изучат тему для презентации',
      },
      { 'discuss the plans tomorrow morning ': 'обсудят планы завтра утром' },
      {
        'fix the computer by the end of the day ':
          'починят компьютер к концу дня',
      },
      { 'take the trash out before bedtime ': 'выносят мусор перед сном' },
      { 'connect the device to the Wi-Fi ': 'подключат устройство к Wi-Fi' },
      { 'prepare the budget for review ': 'подготовят бюджет для проверки' },
      { 'start the project tomorrow ': 'начнут проект завтра' },
      {
        'install the software next week ':
          'установят программное обеспечение на следующей неделе',
      },
      { 'launch the product this month ': 'запустят продукт в этом месяце' },
      { 'update the website by Friday ': 'обновят сайт к пятнице' },
      { 'book the appointment for Tuesday ': 'забронируют встречу на вторник' },
      { 'record the video tomorrow ': 'запишут видео завтра' },
      { 'adjust the settings later ': 'откорректируют настройки позже' },
      {
        'create the document before the meeting ':
          'создадут документ перед встречей',
      },
      {
        'print the flyers by the end of the week ':
          'напечатайте листовки к концу недели',
      },
      { 'fill out the application form by noon ': 'заполнят заявку к полудню' },
      { 'test the system next month ': 'проверят систему в следующем месяце' },
      {
        'assemble the furniture this weekend ': 'соберут мебель в эти выходные',
      },
      {
        'install the new features by tomorrow ':
          'установят новые функции к завтрашнему дню',
      },
      {
        'review the proposal before submitting ':
          'изучат предложение перед подачей',
      },
      { 'arrange the files by Wednesday ': 'упорядочат файлы к среде' },
      {
        'plan the trip for next month ': 'планируют поездку на следующий месяц',
      },
      {
        'secure the funding by next week ':
          'обеспечат финансирование к следующей неделе',
      },
      { 'write the article this afternoon ': 'напишут статью сегодня днем' },
      {
        'edit the photos by the end of the day ':
          'отредактируют фотографии к концу дня',
      },
      {
        'research the market before launching ': 'изучат рынок перед запуском',
      },
      { 'define the goals for the project ': 'определят цели для проекта' },
      {
        'confirm the details by tomorrow ':
          'подтвердят детали к завтрашнему дню',
      },
      { 'explore the options this week ': 'изучат варианты на этой неделе' },
      { 'check the system on Friday ': 'проверят систему в пятницу' },
      { 'outline the plan before starting ': 'составят план перед началом' },
      { 'send the updates by Monday ': 'отправят обновления к понедельнику' },
      { 'gather the team for a meeting ': 'соберут команду для встречи' },
      { 'repair the device by tomorrow ': 'починят устройство к завтра' },
      {
        'draft the contract this evening ':
          'подготовят контракт сегодня вечером',
      },
      { 'solve the problem before the deadline ': 'решат проблему до срока' },
      {
        'secure the venue for the event ': 'забронируют место для мероприятия',
      },
      {
        'monitor the progress weekly ':
          'будут отслеживать прогресс еженедельно',
      },
      {
        'distribute the materials by Tuesday ':
          'распределят материалы к вторнику',
      },
    ],
    [
      { 'open the window tomorrow ': 'откроем окно завтра' },
      { 'close the door tomorrow ': 'закроем дверь завтра' },
      {
        'prepare the report next week ': 'подготовим отчет на следующей неделе',
      },
      { 'call the manager in the morning ': 'позвоним менеджеру утром' },
      { 'cook dinner tonight ': 'приготовим ужин сегодня вечером' },
      { 'clean the office on Saturday ': 'уберем офис в субботу' },
      { 'organize the files by Friday ': 'упорядочим файлы к пятнице' },
      { 'check the emails tomorrow ': 'проверим почту завтра' },
      {
        'attend the meeting next Monday ':
          'посетим встречу в следующий понедельник',
      },
      { 'install the updates by noon ': 'установим обновления к полудню' },
      { 'gather the team this afternoon ': 'соберем команду сегодня днем' },
      { 'set the alarm for 7 a.m. ': 'поставим будильник на 7 утра' },
      {
        'review the documents by the end of the day ':
          'изучим документы к концу дня',
      },
      {
        'finish the homework for tomorrow ':
          'завершим домашнее задание к завтрашнему дню',
      },
      { 'send the invitation by Tuesday ': 'отправим приглашение к вторнику' },
      { 'pick up the laundry this weekend ': 'заберем стирку в эти выходные' },
      { 'discuss the plans for the project ': 'обсудим планы по проекту' },
      { 'buy the supplies for the meeting ': 'купим материалы для встречи' },
      { 'make a decision by Friday ': 'принять решение к пятнице' },
      {
        'help with the arrangements tomorrow ':
          'поможем с приготовлениями завтра',
      },
      { 'replace the battery by this evening ': 'заменим батарею к вечеру' },
      {
        'prepare the presentation for the conference ':
          'подготовим презентацию для конференции',
      },
      { 'record the session this afternoon ': 'запишем сессию сегодня днем' },
      { 'edit the video for the project ': 'отредактируем видео для проекта' },
      { 'deliver the package by noon ': 'доставим посылку к полудню' },
      {
        'schedule the follow-up for next week ':
          'назначим повторную встречу на следующую неделю',
      },
      {
        'plan the schedule for next month ':
          'спланируем расписание на следующий месяц',
      },
      {
        'register for the course by Monday ':
          'зарегистрируемся на курс к понедельнику',
      },
      {
        'secure the venue for the event next month ':
          'забронируем место для мероприятия в следующем месяце',
      },
      {
        'stream the event live next week ':
          'проведем трансляцию мероприятия в следующую неделю',
      },
      {
        'adjust the settings by tomorrow ':
          'откорректируем настройки к завтрашнему дню',
      },
      {
        'document the process by the end of the day ':
          'документируем процесс к концу дня',
      },
      { 'explore the options this week ': 'изучим варианты на этой неделе' },
      {
        'prepare the budget by next month ':
          'подготовим бюджет к следующему месяцу',
      },
    ],
    [
      { 'open the window tomorrow ': 'откроешь окно завтра' },
      { 'close the door tomorrow ': 'закроешь дверь завтра' },
      { 'finish the report next week ': 'завершишь отчет на следующей неделе' },
      { 'call the manager in the morning ': 'позвонишь менеджеру утром' },
      { 'cook dinner tonight ': 'приготовишь ужин сегодня вечером' },
      { 'clean the office on Saturday ': 'уберешь офис в субботу' },
      { 'organize the files by Friday ': 'упорядочишь файлы к пятнице' },
      { 'check the emails tomorrow ': 'проверишь почту завтра' },
      {
        'attend the meeting next Monday ':
          'посетишь встречу в следующий понедельник',
      },
      { 'install the updates by noon ': 'установишь обновления к полудню' },
      { 'gather the team this afternoon ': 'соберешь команду сегодня днем' },
      { 'set the alarm for 7 a.m. ': 'поставишь будильник на 7 утра' },
      {
        'review the documents by the end of the day ':
          'изучишь документы к концу дня',
      },
      {
        'finish the homework for tomorrow ':
          'завершишь домашнее задание к завтрашнему дню',
      },
      { 'send the invitation by Tuesday ': 'отправишь приглашение к вторнику' },
      { 'pick up the laundry this weekend ': 'заберешь стирку в эти выходные' },
      { 'discuss the plans for the project ': 'обсудишь планы по проекту' },
      { 'buy the supplies for the meeting ': 'купишь материалы для встречи' },
      { 'make a decision by Friday ': 'примешь решение к пятнице' },
      {
        'help with the arrangements tomorrow ':
          'поможешь с приготовлениями завтра',
      },
      { 'replace the battery by this evening ': 'заменишь батарею к вечеру' },
      {
        'prepare the presentation for the conference ':
          'подготовишь презентацию для конференции',
      },
      { 'record the session this afternoon ': 'запишешь сессию сегодня днем' },
      { 'deliver the package by noon ': 'доставишь посылку к полудню' },
      {
        'schedule the follow-up for next week ':
          'назначишь повторную встречу на следующую неделю',
      },
      {
        'plan the schedule for next month ':
          'спланируешь расписание на следующий месяц',
      },
      {
        'register for the course by Monday ':
          'зарегистрируешься на курс к понедельнику',
      },
      {
        'secure the venue for the event next month ':
          'забронируешь место для мероприятия в следующем месяце',
      },
      {
        'stream the event live next week ':
          'проведешь трансляцию мероприятия на следующей неделе',
      },
      {
        'adjust the settings by tomorrow ':
          'откорректируешь настройки к завтрашнему дню',
      },
      {
        'document the process by the end of the day ':
          'задокументируешь процесс к концу дня',
      },
      { 'explore the options this week ': 'изучишь варианты на этой неделе' },
      {
        'prepare the budget by next month ':
          'подготовишь бюджет к следующему месяцу',
      },
      { 'start the car tomorrow ': 'заведёшь машину завтра' },
      { 'unlock the door tonight ': 'откроешь дверь сегодня вечером' },
      { 'adjust the settings by noon ': 'скорректируешь настройки к полудню' },
      {
        'travel to the city next week ': 'поедешь в город на следующей неделе',
      },
      {
        'check the temperature in the morning ': 'проверишь температуру утром',
      },
      { 'share the document by Friday ': 'поделишься документом к пятнице' },
      {
        'buy a new phone this weekend ': 'купишь новый телефон в эти выходные',
      },
      {
        'decide on the menu by tomorrow ': 'решишься на меню к завтрашнему дню',
      },
      {
        'test the equipment next month ':
          'протестируешь оборудование в следующем месяце',
      },
      { 'clean the kitchen after dinner ': 'уберёшь кухню после ужина' },
      { 'send the feedback by email ': 'отправишь отзыв по электронной почте' },
      { 'connect the device to Wi-Fi ': 'подключишь устройство к Wi-Fi' },
      {
        'repair the bicycle this afternoon ': 'починишь велосипед сегодня днём',
      },
      { 'prepare the agenda for the meeting ': 'подготовишь повестку встречи' },
      {
        'print the documents before the meeting ':
          'напечатаешь документы перед встречей',
      },
      {
        'update the software by next week ':
          'обновишь программное обеспечение на следующей неделе',
      },
      {
        'organize the closet this weekend ': 'организуешь шкаф в эти выходные',
      },
      { 'drink more water tomorrow ': 'выпьешь больше воды завтра' },
      { 'discuss the project details later ': 'обсудишь детали проекта позже' },
      {
        'explore new places during the trip ':
          'исследуешь новые места во время поездки',
      },
      {
        'visit the doctor next Friday ': 'сходишь к врачу в следующую пятницу',
      },
      {
        'finish reading the book by the weekend ':
          'прочитаешь книгу к выходным',
      },
      {
        'forward the email to the team ':
          'перешлёшь электронное письмо команде',
      },
      {
        'invite colleagues to the conference ':
          'пригласишь коллег на конференцию',
      },
      {
        'celebrate the birthday next month ':
          'отметишь день рождения в следующем месяце',
      },
      { 'attend the seminar this week ': 'посетишь семинар на этой неделе' },
      { 'join the club next year ': 'войдёшь в клуб в следующем году' },
      { 'take a break after lunch ': 'сделаешь перерыв после обеда' },
      { 'make a plan for the weekend ': 'составишь план на выходные' },
      { 'reward yourself with a treat ': 'побалуешь себя угощением' },
      { 'seek advice from a mentor ': 'попросишь совета у наставника' },
      {
        'read the instructions carefully ': 'внимательно прочитаешь инструкции',
      },
      {
        'measure the distance before starting ':
          'измеришь расстояние перед стартом',
      },
    ],
  ],
  html: `${template}`,
};
