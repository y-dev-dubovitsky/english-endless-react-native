import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const FUTURE_PERFECT: TenseInterface = {
  name: 'Future Perfect',
  strategies: [
    [0, 0, 0],
    [1, 0, 1],
    [2, 0, 2],
    [3, 0, 3],
    [4, 0, 4],
    [0, 1, 0],
    [1, 1, 1],
    [2, 1, 2],
    [3, 1, 3],
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
      { 'Peter Venkman': 'Питер Венкман' },
      { 'Johnny Depp': 'Джонни Депп' },
      { 'Leonardo DiCaprio': 'Леонардо Ди Каприо' },
      { 'Will Smith': 'Уилл Смит' },
      { 'Jim carrey': 'Джим Керри' },
      { 'Brad Pitt': 'Брэд Питт' },
      { 'Keanu Reeves': 'Киану Ривз' },
      { 'Tom Hardy': 'Том Харди' },
      { 'Tom Hanks': 'Том Хэнкс' },
      { 'Matthew David McConaughey': 'Мэттью Дэвид МакКонахи' },
      { 'Anthony Hopkins': 'Энтони Хопкинс' },
      { 'Tom Cruise': 'Том Круз' },
      { 'Walter Bruce Willis': 'Уо́лтер Брюс Уи́ллис' },
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
  auxiliaries: [[{ 'will have': '' }], [{ 'will not have': 'не' }]],
  verbs: [
    [
      { 'opened the window by 8 p.m. ': 'открою окно к 8 часам' },
      { 'opened the bottle by 6 p.m. ': 'открою бутылку к 6 часам вечера' },
      { 'bought the groceries by Saturday. ': 'куплю продукты к субботе' },
      { 'cleaned the car by noon. ': 'помою машину к полудню' },
      {
        'finished the book by next Friday. ':
          'прочитаю книгу к следующей пятнице',
      },
      { 'set the alarm by 10 p.m. ': 'поставлю будильник к 10 часам вечера' },
      {
        'prepared the presentation by Thursday. ':
          'подготовлю презентацию к четвергу',
      },
      { 'installed the app by tonight. ': 'установлю приложение к вечеру' },
      { 'fixed the computer by morning. ': 'починю компьютер к утру' },
      {
        'arranged the furniture by the weekend. ':
          'расставлю мебель к выходным',
      },
      { 'finished the painting by summer. ': 'завершу картину к лету' },
      { 'researched the topic by Monday. ': 'изучу тему к понедельнику' },
      { 'created the website by launch day. ': 'создам сайт к дню запуска' },
      {
        'sorted out the issues by next month. ':
          'разберусь с проблемами к следующему месяцу',
      },
      {
        'met the deadline by the end of the week. ':
          'выполню срок к концу недели',
      },
      {
        'updated the database by 5 p.m. ':
          'обновлю базу данных к 5 часам вечера',
      },
      {
        'revised the document by tomorrow. ':
          'переработаю документ к завтрашнему дню',
      },
      {
        'visited the museum by next weekend. ':
          'посещение музея вплоть до следующих выходных',
      },
      {
        'planned the trip by summer break. ':
          'планирую поездку к летним каникулам',
      },
      {
        'submitted the report by Friday evening. ':
          'отправлю отчет к пятнице вечером',
      },
      { 'baked the cake by the party. ': 'испечу торт к вечеринке' },
      { 'emptied the trash by morning. ': 'вынесу мусор к утру' },
      {
        'completed the analysis by the end of the month. ':
          'завершу анализ к концу месяца',
      },
      {
        'answered the questions by the end of the day. ':
          'отвечу на вопросы к концу дня',
      },
      {
        'registered for the course by tomorrow. ':
          'зарегистрируюсь на курс к завтрашнему дню',
      },
      {
        'sorted the documents by Monday. ': 'разберу документы к понедельнику',
      },
      { 'uploaded the files by noon. ': 'загружу файлы к полудню' },
      {
        'repaired the fence by next week. ':
          'отремонтирую забор к следующей неделе',
      },
      {
        'cleaned the windows by Saturday evening. ':
          'помою окна к субботнему вечеру',
      },
      {
        'finalized the plans by next month. ':
          'завершу планы к следующему месяцу',
      },
      {
        'reviewed the proposal by the meeting. ': 'изучу предложение к встрече',
      },
      { 'called the contractor by Friday. ': 'позвоню подрядчику к пятнице' },
      {
        'conducted the survey by the end of the semester. ':
          'проведу опрос к концу семестра',
      },
      {
        'arranged the schedule by next week. ':
          'составлю расписание к следующей неделе',
      },
      { 'finished the cleanup by noon. ': 'закончу уборку к полудню' },
    ],
    [
      { 'opened the window by 8 p.m. ': 'откроет окно к 8 часам' },
      { 'opened the bottle by 6 p.m. ': 'откроет бутылку к 6 часам вечера' },
      { 'opened the window by 8 p.m. ': 'откроет окно к 8 часам' },
      { 'cleaned the house by 6 p.m. ': 'уберет дом к 6 часам вечера' },
      { 'finished the task by noon. ': 'завершит задание к полудню' },
      {
        'prepared the presentation by Friday. ':
          'подготовит презентацию к пятнице',
      },
      {
        'organized the files by tomorrow. ':
          'упорядочит файлы к завтрашнему дню',
      },
      {
        'planned the event by next week. ':
          'спланирует мероприятие к следующей неделе',
      },
      { 'returned the book by Tuesday. ': 'вернет книгу к вторнику' },
      { 'visited the museum by the weekend. ': 'посетит музей к выходным' },
      { 'prepared dinner by 7 p.m. ': 'приготовит ужин к 7 часам вечера' },
      { 'cleaned the kitchen by 5 p.m. ': 'уберет кухню к 5 часам вечера' },
      { 'arranged the furniture by Saturday. ': 'расставит мебель к субботе' },
      { 'decorated the room by the party. ': 'украсит комнату к вечеринке' },
      { 'washed the clothes by Friday. ': 'постирает одежду к пятнице' },
      {
        'called the doctor by the end of the day. ':
          'позвонит врачу к концу дня',
      },
      {
        'scheduled the meeting by next Monday. ':
          'назначит встречу к следующему понедельнику',
      },
      {
        'visited the doctor by tomorrow. ': 'сходим к врачу к завтрашнему дню',
      },
      { 'sent the package by Wednesday. ': 'отправлю посылку к среде' },
      {
        'updated the software by next month. ':
          'обновит программное обеспечение к следующему месяцу',
      },
      {
        'handled the request by 10 a.m. ': 'обработает запрос к 10 часам утра',
      },
      { 'gathered the materials by Saturday. ': 'соберет материалы к субботе' },
      {
        'furnished the apartment by next week. ':
          'обставит квартиру к следующей неделе',
      },
      {
        'filed the documents by the end of the week. ':
          'подаст документы к концу недели',
      },
      { 'finished the report by 4 p.m. ': 'завершит отчет к 4 часам дня' },
      {
        'arranged the meeting by next Friday. ':
          'организует встречу к следующей пятнице',
      },
      { 'drafted the plan by Thursday. ': 'подготовит план к четвергу' },
      { 'edited the video by the weekend. ': 'отредактирует видео к выходным' },
      {
        'visited the project site by the end of the week. ':
          'посмотрит место проекта к концу недели',
      },
      {
        'packed for the trip by Friday evening. ':
          'упакует вещи для поездки к пятнице вечеру',
      },
      {
        'finished the analysis by next month. ':
          'завершит анализ к следующему месяцу',
      },
      {
        'revised the document by the end of the day. ':
          'переработает документ к концу дня',
      },
      { 'investigated the issue by Friday. ': 'изучит вопрос к пятнице' },
      {
        'prepared the budget by tomorrow. ':
          'подготовит бюджет к завтрашнему дню',
      },
      {
        'calculated the expenses by the end of the day. ':
          'рассчитает расходы к концу дня',
      },
      {
        'organized the team by next week. ':
          'организует команду к следующей неделе',
      },
      {
        'arranged the travel plans by the weekend. ':
          'организует планы поездки к выходным',
      },
    ],
    [
      { 'opened the window by 8 p.m. ': 'откроют окно к 8 часам' },
      { 'opened the bottle by 6 p.m. ': 'откроют бутылку к 6 часам вечера' },
      {
        'finished the novel by the end of the month. ':
          'завершат роман к концу месяца',
      },
      {
        'organized the workshop by next week. ':
          'организуют мастер-класс к следующей неделе',
      },
      { 'discussed the topic by the meeting. ': 'обсудят тему к встрече' },
      { 'prepared the cake by the party. ': 'приготовят торт к вечеринке' },
      {
        'planned the itinerary by tomorrow. ':
          'спланируют маршрут к завтрашнему дню',
      },
      { 'submitted the form by the deadline. ': 'подадут форму к сроку' },
      { 'mapped the journey by Friday. ': 'проложат путь к пятнице' },
      { 'reviewed the proposal by Wednesday. ': 'изучат предложение к среде' },
      { 'updated the report by 3 p.m. ': 'обновят отчет к 3 часам дня' },
      {
        'launched the campaign by the weekend. ':
          'запустят кампанию к выходным',
      },
      { 'calibrated the instruments by noon. ': 'калибруют приборы к полудню' },
      { 'finished the layout by Monday. ': 'завершат макет к понедельнику' },
      {
        'assembled the furniture by tomorrow evening. ':
          'соберут мебель к завтрашнему вечеру',
      },
      {
        'adopted the strategy by next meeting. ':
          'примут стратегию к следующей встрече',
      },
      {
        'processed the data by the end of the week. ':
          'обработают данные к концу недели',
      },
      { 'logged the hours by Friday. ': 'запишут часы к пятнице' },
      {
        'revised the guidelines by the next update. ':
          'пересмотрят рекомендации к следующему обновлению',
      },
      {
        'cross-checked the facts by the report submission. ':
          'проверят факты к подаче отчета',
      },
      {
        'formatted the document by 2 p.m. ':
          'отформатируют документ к 2 часам дня',
      },
      {
        'circulated the newsletter by the end of the month. ':
          'разошлют информационный бюллетень к концу месяца',
      },
      { 'found the solution by the deadline. ': 'найдут решение к сроку' },
      {
        'mapped the site by next week. ':
          'составят карту сайта к следующей неделе',
      },
      {
        'scanned the files by Friday evening. ':
          'отсканируют файлы к вечеру пятницы',
      },
      {
        'synchronized the schedules by next month. ':
          'синхронизируют расписания к следующему месяцу',
      },
      {
        'linked the accounts by the end of the day. ':
          'свяжут аккаунты к концу дня',
      },
      {
        'streamlined the process by next quarter. ':
          'оптимизируют процесс к следующему кварталу',
      },
      { 'filled the inventory by Wednesday. ': 'пополнят инвентарь к среде' },
      {
        'compiled the observations by the conclusion of the experiment. ':
          'соберут наблюдения к завершению эксперимента',
      },
      {
        'illustrated the concepts by the presentation. ':
          'иллюстрируют концепции к презентации',
      },
      {
        'aligned the goals by next year. ': 'согласуют цели к следующему году',
      },
      {
        'tightened the security by the event date. ':
          'усилят безопасность к дате мероприятия',
      },
      {
        'finalized the details by the next phase. ':
          'завершат детали к следующему этапу',
      },
      {
        'identified the risks by the project start. ':
          'выявят риски к началу проекта',
      },
      {
        'planned the budget by the end of the month. ':
          'рассчитают бюджет к концу месяца',
      },
    ],
    [
      { 'opened the window by 8 p.m. ': 'откроем окно к 8 часам' },
      { 'opened the bottle by 6 p.m. ': 'откроем бутылку к 6 часам вечера' },
      { 'finished the report by 8 p.m. ': 'завершим отчет к 8 часам' },
      { 'cleaned the house by 5 p.m. ': 'уберем дом к 5 часам вечера' },
      { 'cooked dinner by 7 p.m. ': 'приготовим ужин к 7 часам вечера' },
      {
        'prepared the presentation by noon. ':
          'подготовим презентацию к полудню',
      },
      {
        'organized the files by tomorrow. ':
          'упорядочим файлы к завтрашнему дню',
      },
      { 'sent the invitations by Friday. ': 'отправим приглашения к пятнице' },
      {
        'painted the room by next week. ':
          'покрасим комнату к следующей неделе',
      },
      { 'washed the car by the weekend. ': 'помоем машину к выходным' },
      {
        'booked the tickets by Friday evening. ':
          'забронируем билеты к вечеру пятницы',
      },
      { 'repaired the bike by Saturday. ': 'починим велосипед к субботе' },
      {
        'visited the museum by the end of the month. ':
          'посетим музей к концу месяца',
      },
      {
        'submitted the application by Tuesday morning. ':
          'подадим заявку к утру вторника',
      },
      {
        'finished the book by the end of the week. ':
          'прочитаем книгу к концу недели',
      },
      {
        'registered for the course by next month. ':
          'зарегистрируемся на курс к следующему месяцу',
      },
      {
        'updated the software by Thursday. ':
          'обновим программное обеспечение к четвергу',
      },
      {
        'arranged the furniture by the party. ': 'расставим мебель к вечеринке',
      },
      { 'resolved the issues by Monday. ': 'решим проблемы к понедельнику' },
      { 'gathered the materials by Friday. ': 'соберем материалы к пятнице' },
      { 'filled out the form by noon. ': 'заполним форму к полудню' },
      { 'baked the cake by the party. ': 'испечем торт к вечеринке' },
      {
        'fixed the plumbing by Saturday morning. ':
          'починим сантехнику к субботнему утру',
      },
      {
        'finished the design by next week. ':
          'завершим дизайн к следующей неделе',
      },
      {
        'drafted the proposal by the end of the day. ':
          'подготовим предложение к концу дня',
      },
      { 'cleaned the windows by 3 p.m. ': 'помоем окна к 3 часам дня' },
      {
        'secured the funds by next month. ':
          'обеспечим финансирование к следующему месяцу',
      },
      {
        'organized the event by Saturday. ': 'организуем мероприятие к субботе',
      },
      {
        'installed the equipment by Friday afternoon. ':
          'установим оборудование к пятнице дню',
      },
      { 'returned the book by tomorrow. ': 'вернем книгу к завтрашнему дню' },
      { 'compiled the data by the deadline. ': 'соберем данные к сроку' },
      {
        'synchronized the systems by next week. ':
          'синхронизируем системы к следующей неделе',
      },
      {
        'finalized the agenda by Monday. ': 'утвердим повестку к понедельнику',
      },
      { 'confirmed the appointment by noon. ': 'подтвердим встречу к полудню' },
      {
        'evaluated the results by the end of the semester. ':
          'оценим результаты к концу семестра',
      },
      { 'cleaned out the garage by the weekend. ': 'уберем гараж к выходным' },
    ],
    [
      { 'opened the window by 8 p.m. ': 'откроешь окно к 8 часам' },
      { 'opened the bottle by 6 p.m. ': 'откроешь бутылку к 6 часам вечера' },
      { 'finished the report by 5 p.m. ': 'завершишь отчет к 5 часам вечера' },
      {
        'completed the presentation by noon. ':
          'завершишь презентацию к полудню',
      },
      {
        'cleaned the house by Saturday evening. ':
          'уберёшь дом к субботнему вечеру',
      },
      { 'made dinner by 7 p.m. ': 'приготовишь ужин к 7 часам вечера' },
      { 'packed the suitcase by dawn. ': 'упакуешь чемодан к рассвету' },
      { 'prepared the garden by spring. ': 'подготовишь сад к весне' },
      {
        'arranged the meeting by Thursday. ': 'организуешь встречу к четвергу',
      },
      { 'read the book by the weekend. ': 'прочитаешь книгу к выходным' },
      {
        'submitted the application by Friday noon. ':
          'подашь заявку к пятнице дню',
      },
      {
        'washed the car by Sunday morning. ':
          'помоешь машину к воскресному утру',
      },
      {
        'finished cleaning the kitchen by 8 p.m. ':
          'уберёшь кухню к 8 часам вечера',
      },
      {
        'completed the training by next week. ':
          'завершишь обучение к следующей неделе',
      },
      {
        'resolved the issues by the end of the day. ':
          'решишь проблемы к концу дня',
      },
      {
        'sent the invitations by Monday morning. ':
          'отправишь приглашения к понедельнику утром',
      },
      {
        'revised the document by Friday afternoon. ':
          'пересмотришь документ к пятнице днём',
      },
      {
        'installed the software by the weekend. ':
          'установишь программное обеспечение к выходным',
      },
      {
        'updated the website by next month. ':
          'обновишь веб-сайт к следующему месяцу',
      },
      {
        'painted the living room by Saturday. ': 'покрасишь гостиную к субботе',
      },
      {
        'organized the files by the end of the week. ':
          'организуешь файлы к концу недели',
      },
      {
        'drafted the new policy by tomorrow. ':
          'создашь новый документ к завтрашнему дню',
      },
      {
        'finished reading the report by lunchtime. ':
          'прочитаешь отчет к обеду',
      },
      {
        'scheduled the appointment by Tuesday. ':
          'планируешь встречу к вторнику',
      },
      { 'wrote the article by the deadline. ': 'написала статью к сроку' },
      {
        'prepared snacks by the party time. ':
          'приготовишь закуски к началу вечеринки',
      },
      {
        'transferred the files by the end of the day. ':
          'перенесёшь файлы к концу дня',
      },
      {
        'finalized the budget by next meeting. ':
          'завершишь бюджет к следующей встрече',
      },
      {
        'resolved the disputes by next week. ':
          'разрешишь споры к следующей неделе',
      },
      {
        'logged the hours by the end of the month. ':
          'запишешь часы к концу месяца',
      },
      { 'completed the repairs by Friday. ': 'завершишь ремонт к пятнице' },
      {
        'finished shopping by Saturday afternoon. ':
          'завершишь покупки к субботнему послеобеду',
      },
      {
        'streamed the presentation by 3 p.m. ':
          'трансляция презентации начнется к 3 часам дня',
      },
      {
        'wrote thank-you notes by the weekend. ':
          'напишешь благодарственные записки к выходным',
      },
      { 'picked up the groceries by noon. ': 'заберёшь продукты к полудню' },
      {
        'made the arrangements by tomorrow evening. ':
          'оформишь все договоренности к завтрашнему вечеру',
      },
      {
        'finished the assignment by the due date. ':
          'завершишь задание к сроку',
      },
      {
        'received feedback by the end of the day. ':
          'получишь обратную связь к концу дня',
      },
      {
        'cleared the doubts by next session. ':
          'разрешишь сомнения к следующей сессии',
      },
      {
        'returned the calls by the end of the day. ': 'перезвонишь к концу дня',
      },
      {
        'scheduled the follow-up by next Monday. ':
          'планируешь повторную встречу к следующему понедельнику',
      },
      {
        'reached out to clients by the end of the week. ':
          'свяжешься с клиентами к концу недели',
      },
      {
        'visited the site by next month. ': 'посетишь сайт к следующему месяцу',
      },
      {
        'finished the analysis by the end of the quarter. ':
          'завершишь анализ к концу квартала',
      },
      {
        'collected the results by the project deadline. ':
          'соберёшь результаты к сроку проекта',
      },
      {
        'submitted the report by the end of the month. ':
          'подашь отчет к концу месяца',
      },
    ],
  ],
  html: `${template}`,
};
