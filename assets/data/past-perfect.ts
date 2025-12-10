import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const PAST_PERFECT: TenseInterface = {
  name: 'Past Perfect',
  strategies: [
    [0, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [1, 1, 0],
    [2, 0, 1],
    [2, 1, 1],
  ],
  pronounts: [
    [{ I: 'Я' }, { You: 'Ты' }],
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
    ],
    [{ They: 'Они' }, { We: 'Мы' }],
  ],
  auxiliaries: [[{ had: '' }], [{ 'had not': 'не' }]],
  verbs: [
    [
      { "already worked by six o'clock": 'поработал к шести часам' },
      { "already worked by six o'clock": 'уже поработал к шести часам' },
      { 'already finished by noon': 'уже закончил к полудню' },
      { 'already started by morning': 'уже начал к утру' },
      { 'already completed by deadline': 'уже завершил к сроку' },
      { 'already prepared by evening': 'уже подготовил к вечеру' },
      { 'already arrived by midnight': 'уже прибыл к полуночи' },
      { 'already solved by deadline': 'уже решил к дедлайну' },
      { 'already submitted by cutoff': 'уже отправил к отсечке' },
      { 'already delivered by schedule': 'уже доставил по расписанию' },
      { 'already accomplished by target': 'уже достиг к цели' },
      {
        'already analyzed by three PM': 'уже проанализировал к трём часам дня',
      },
      { 'already implemented by Friday': 'уже внедрил к пятнице' },
      { 'already optimized by Monday': 'уже оптимизировал к понедельнику' },
      {
        'already synthesized by tomorrow': 'уже синтезировал к завтрашнему дню',
      },
      {
        'already simulated by next week': 'уже симулировал к следующей неделе',
      },
      { 'already validated by assessment': 'уже проверил к оценке' },
      { 'already coordinated by milestone': 'уже скоординировал к вехе' },
      {
        'already integrated by deployment':
          'уже проинтегрировал к развёртыванию',
      },
      {
        'already configured by installation': 'уже сконфигурировал к установке',
      },
      { 'already calibrated by inspection': 'уже откалибровал к инспекции' },
    ],
    [
      { "already worked by six o'clock": 'поработали к шести часам' },
      { 'already discussed by six AM': 'уже обсудили к шести утра' },
      { 'already negotiated by three PM': 'уже договорились к трём часам дня' },
      { 'already collaborated by seven PM': 'уже сотрудничали к семи вечера' },
      {
        'already coordinated by eight AM': 'уже скоординировали к восьми утра',
      },
      {
        'already consulted by nine AM': 'уже проконсультировали к девяти утра',
      },
      {
        'already brainstormed by ten AM':
          'уже провели мозговой штурм к десяти утра',
      },
      { 'already debated by eleven AM': 'уже дебатировали к одиннадцати утра' },
      { 'already mediated by noon': 'уже посредничали к полудню' },
      { 'already arbitrated by one PM': 'уже арбитрировали к часу дня' },
      { 'already reconciled by two PM': 'уже примирили к двум часам дня' },
      { 'already researched by four PM': 'уже исследовали к четырём вечера' },
      {
        'already experimented by five PM':
          'уже экспериментировали к пяти вечера',
      },
      { 'already investigated by six PM': 'уже расследовали к шести вечера' },
      { 'already analyzed by seven PM': 'уже проанализировали к семи вечера' },
      {
        'already documented by eight PM':
          'уже задокументировали к восьми вечера',
      },
      { 'already synthesized by nine PM': 'уже синтезировали к девяти вечера' },
      { 'already simulated by ten PM': 'уже симулировали к десяти вечера' },
      {
        'already tested by eleven PM':
          'уже протестировали к одиннадцати вечера',
      },
      { 'already validated by midnight': 'уже проверили к полуночи' },
      { 'already verified by one AM': 'уже верифицировали к часу ночи' },
    ],
  ],
  html: `${template}`,
};
