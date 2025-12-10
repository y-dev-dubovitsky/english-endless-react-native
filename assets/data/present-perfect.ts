import { TenseInterface } from '../../app/types';
const template = 'info about time';

export const PRESENT_PERFECT: TenseInterface = {
  name: 'Present Perfect',
  strategies: [
    [0, 0, 0],
    [0, 1, 0],
    [1, 2, 0],
    [1, 3, 0],
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
  auxiliaries: [
    [{ have: '' }],
    [{ 'have not': 'не' }],
    [{ has: '' }],
    [{ 'has not': 'не' }],
  ],
  verbs: [
    [
      { 'worked once': 'поработал однажды' },
      { 'worked once': 'поработал однажды' },
      { 'sang once': 'спел однажды' },
      { 'wrote once': 'написал однажды' },
      { 'read once': 'прочитал однажды' },
      { 'built once': 'построил однажды' },
      { 'saw once': 'увидел однажды' },
      { 'heard once': 'услышал однажды' },
      { 'drove once': 'проехал однажды' },
      { 'ate once': 'съел однажды' },
      { 'drank once': 'выпил однажды' },
      { 'investigated once': 'расследовал однажды' },
      { 'invented once': 'изобрел однажды' },
      { 'discovered once': 'открыл однажды' },
      { 'explored once': 'исследовал однажды' },
      { 'designed once': 'спроектировал однажды' },
      { 'engineered once': 'спроектировал однажды' },
      { 'constructed once': 'построил однажды' },
      { 'developed once': 'разработал однажды' },
      { 'programmed once': 'запрограммировал однажды' },
      { 'coded once': 'написал код однажды' },
      { 'painted once': 'рисовал однажды' },
      { 'sculpted once': 'ваял однажды' },
      { 'composed once': 'сочинил однажды' },
      { 'conducted once': 'дирижировал однажды' },
      { 'directed once': 'режиссировал однажды' },
      { 'produced once': 'продюсировал однажды' },
      { 'choreographed once': 'ставил хореографию однажды' },
      { 'improvised once': 'импровизировал однажды' },
      { 'perfected once': 'совершенствовал однажды' },
      { 'mastered once': 'освоил однажды' },
      {
        'studied mathematics intensely once':
          'интенсивно изучал математику однажды',
      },
      {
        'practiced violin diligently once':
          'усердно практиковал скрипку однажды',
      },
      {
        'performed on stage dramatically once':
          'драматично выступал на сцене однажды',
      },
      {
        'presented research comprehensively once':
          'всесторонне представил исследование однажды',
      },
      {
        'discussed philosophy deeply once':
          'глубоко обсуждал философию однажды',
      },
      {
        'debated politics passionately once':
          'страстно дебатировал о политике однажды',
      },
      {
        'negotiated contracts successfully once':
          'успешно договорился по контрактам однажды',
      },
      {
        'collaborated internationally effectively once':
          'эффективно сотрудничал на международном уровне однажды',
      },
      {
        'researhed quantum physics thoroughly once':
          'тщательно исследовал квантовую физику однажды',
      },
      {
        'experimented with chemicals carefully once':
          'осторожно экспериментировал с химикатами однажды',
      },
      {
        'analyzed data statistically once':
          'статистически анализировал данные однажды',
      },
      {
        'synthesized compounds chemically once':
          'химически синтезировал соединения однажды',
      },
      {
        'tested hypotheses scientifically once':
          'научно тестировал гипотезы однажды',
      },
      {
        'validated theories experimentally once':
          'экспериментально валидировал теории однажды',
      },
      {
        'optimized algorithms computationally once':
          'вычислительно оптимизировал алгоритмы однажды',
      },
      {
        'implemented systems efficiently once':
          'эффективно внедрил системы однажды',
      },
      {
        'integrated APIs seamlessly once': 'бесшовно интегрировал API однажды',
      },
      {
        'automated processes intelligently once':
          'интеллектуально автоматизировал процессы однажды',
      },
      {
        'digitalized archives completely once':
          'полностью оцифровал архивы однажды',
      },
      {
        'innovated technology radically once':
          'радикально инноваровал технологию однажды',
      },
    ],
    [
      { 'worked once': 'поработали однажды' },
      { 'traveled once': 'путешествовали однажды' },
      { 'created once': 'создали однажды' },
      { 'discovered once': 'открыли однажды' },
      { 'invented once': 'изобрели однажды' },
      { 'explored once': 'исследовали однажды' },
      { 'designed once': 'спроектировали однажды' },
      { 'organized once': 'организовали однажды' },
      { 'celebrated once': 'отпраздновали однажды' },
      { 'completed once': 'завершили однажды' },
      { 'achieved once': 'достигли однажды' },
      { 'studied once': 'учились однажды' },
      { 'practiced once': 'тренировались однажды' },
      { 'performed once': 'выступали однажды' },
      { 'presented once': 'представили однажды' },
      { 'discussed once': 'обсудили однажды' },
      { 'debated once': 'дебатировали однажды' },
      { 'negotiated once': 'договорились однажды' },
      { 'collaborated once': 'сотрудничали однажды' },
      { 'researched once': 'исследовали однажды' },
      { 'experimented once': 'экспериментировали однажды' },
      { 'analyzed once': 'проанализировали однажды' },
      { 'synthesized once': 'синтезировали однажды' },
      { 'tested once': 'протестировали однажды' },
      { 'validated once': 'проверили однажды' },
      { 'optimized once': 'оптимизировали однажды' },
      { 'implemented once': 'внедрили однажды' },
      { 'integrated once': 'интегрировали однажды' },
      { 'automated once': 'автоматизировали однажды' },
      { 'digitalized once': 'оцифровали однажды' },
      { 'innovated once': 'проинноваровали однажды' },
      {
        'developed software collaboratively once':
          'совместно разработали программное обеспечение однажды',
      },
      {
        'architected solutions innovatively once':
          'инновационно спроектировали решения однажды',
      },
      {
        'prototyped devices experimentally once':
          'экспериментально создали прототипы устройств однажды',
      },
      {
        'simulated scenarios realistically once':
          'реалистично симулировали сценарии однажды',
      },
      {
        'forecasted trends accurately once':
          'точно прогнозировали тенденции однажды',
      },
      {
        'validated hypotheses rigorously once':
          'строго проверили гипотезы однажды',
      },
      {
        'orchestrated operations smoothly once':
          'гладко оркестрировали операции однажды',
      },
      {
        'deployed applications successfully once':
          'успешно развернули приложения однажды',
      },
      {
        'monitored networks continuously once':
          'непрерывно мониторили сети однажды',
      },
      {
        'troubleshot issues efficiently once':
          'эффективно устранили неполадки однажды',
      },
      {
        'benchmarked systems competitively once':
          'конкурентоспособно протестировали системы однажды',
      },
      {
        'visualized data interactively once':
          'интерактивно визуализировали данные однажды',
      },
      {
        'encrypted communications securely once':
          'безопасно зашифровали коммуникации однажды',
      },
      {
        'calibrated instruments precisely once':
          'точно откалибровали инструменты однажды',
      },
      {
        'compiled reports systematically once':
          'систематично составили отчеты однажды',
      },
      {
        'audited systems thoroughly once':
          'тщательно провели аудит систем однажды',
      },
      {
        'synchronized databases reliably once':
          'надежно синхронизировали базы данных однажды',
      },
      {
        'configured servers optimally once':
          'оптимально сконфигурировали серверы однажды',
      },
      {
        'modelled behaviors predictively once':
          'предсказательно смоделировали поведение однажды',
      },
      {
        'integrated APIs flawlessly once':
          'безупречно интегрировали API однажды',
      },
    ],
  ],
  html: `${template}`,
};
