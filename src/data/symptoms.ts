export type SymptomTriageLevel = 'emergency' | 'warning' | 'monitor';

export interface SymptomAdvice {
  do: string[];
  dont: string[];
}

export interface Symptom {
  id: string;
  name: string;
  description: string;
  triageLevel: SymptomTriageLevel;
  causes: string[];
  advice: SymptomAdvice;
  relatedLessonId?: string; // Collego lezioni dell'Academy
  relatedLessonTitle?: string;
}

export const SYMPTOMS_DATA: Symptom[] = [
  {
    id: 'pipi_casa',
    name: 'Pipì in Casa 💦',
    description: 'Il cane urina negli spazi domestici, talvolta subito dopo essere rientrato dalla passeggiata.',
    triageLevel: 'monitor',
    causes: [
      'Infezione delle vie urinarie o cistite',
      'Ansia da separazione o stress ambientale',
      'Mancato apprendimento delle regole igieniche (cucciolo)',
      'Marcatura territoriale da eccitazione'
    ],
    advice: {
      do: [
        'Usa detergenti enzimatici specifici (NO ammoniaca o candeggina).',
        'Aumenta le uscite e premia con enfasi ogni volta che urina fuori.',
        'Pulisci fuori dalla vista del cane per evitare che lo veda come un gioco.'
      ],
      dont: [
        'NON sgridare o punire il cane a posteriori (aumenta solo lo stress).',
        'NON strofinare mai il muso del cane sulla pipì (gesto coercitivo e inutile).',
        'NON limitare l\'accesso all\'acqua a meno che non lo dica il veterinario.'
      ]
    },
    relatedLessonId: 'l3',
    relatedLessonTitle: '3. Bisogni vs Comportamenti'
  },
  {
    id: 'non_mangia',
    name: 'Non Mangia 🥣',
    description: 'Rifiuto totale o parziale del cibo abituale (inappetenza) per oltre 12-24 ore.',
    triageLevel: 'warning',
    causes: [
      'Dolore dentale o gengivite',
      'Nausea, gastrite o problemi digestivi',
      'Febbre o stato infettivo iniziale',
      'Stress da cambiamento o sbalzo termico (caldo eccessivo)'
    ],
    advice: {
      do: [
        'Monitora l\'energia complessiva e controlla se beve regolarmente.',
        'Prova a scaldare leggermente la pappa o aggiungi del brodo di pollo tiepido scondito.',
        'Ispeziona delicatamente la bocca per verificare ferite o denti dondolanti.'
      ],
      dont: [
        'NON forzare assolutamente il cane a mangiare inserendo cibo in bocca.',
        'NON lasciare la ciotola a terra tutto il giorno (crea rifiuto psicologico).',
        'NON offrire continuamente "snack premio" per pietà, per evitare vizi alimentari.'
      ]
    },
    relatedLessonId: 'l3',
    relatedLessonTitle: '3. Bisogni vs Comportamenti'
  },
  {
    id: 'vomita',
    name: 'Vomito 🤮',
    description: 'Espulsione attiva di cibo parzialmente digerito, succhi gastrici gialli o bava schiumosa.',
    triageLevel: 'warning',
    causes: [
      'Ingestione di corpi estranei o cibo avariato in giardino',
      'Indigestione, gastrite acuta o colpo di freddo',
      'Presenza di parassiti intestinali',
      'Sintomo di colpo di calore o avvelenamento (se associato ad altri segni)'
    ],
    advice: {
      do: [
        'Rimuovi il cibo per 12 ore per far riposare l\'apparato digerente.',
        'Offri acqua fresca in piccolissime quantità ma frequentemente (evita disidratazione).',
        'Contatta il veterinario se il vomito si ripete più di 3 volte in poche ore o contiene sangue.'
      ],
      dont: [
        'NON somministrare farmaci per umani (es. Plasil o biochetasi) di tua iniziativa.',
        'NON somministrare pappa solida subito dopo un episodio di vomito.',
        'NON forzarlo a bere grandi quantità d\'acqua in una sola volta (stimola il vomito).'
      ]
    },
    relatedLessonId: 'l1',
    relatedLessonTitle: '1. Oltre il Comportamentismo'
  },
  {
    id: 'diarrea',
    name: 'Diarrea 💩',
    description: 'Emissione frequente di feci liquide, molli o con presenza di muco.',
    triageLevel: 'warning',
    causes: [
      'Cambio repentino della marca di crocchette',
      'Infezioni batteriche, parassiti intestinali (es. Giardia)',
      'Ingestione di sporcizia o erba trattata',
      'Forte stress emotivo o sbalzo di temperatura'
    ],
    advice: {
      do: [
        'Lascia l\'acqua sempre a disposizione per scongiurare la disidratazione.',
        'Fai un digiuno controllato di 12 ore, poi offri porzioni minime di riso stracotto e sciacquato.',
        'Conserva un campione di feci in un barattolo pulito per l\'analisi veterinaria.'
      ],
      dont: [
        'NON dare latticini, formaggi o cibi grassi per "compattare" le feci.',
        'NON somministrare fermenti lattici umani senza aver consultato il medico veterinario.',
        'NON sottovalutare il problema se il cane è un cucciolo sotto i 6 mesi.'
      ]
    },
    relatedLessonId: 'l3',
    relatedLessonTitle: '3. Bisogni vs Comportamenti'
  },
  {
    id: 'zoppica',
    name: 'Zoppica 🐾',
    description: 'Il cane evita di appoggiare una zampa a terra o cammina in modo asimmetrico e rigido.',
    triageLevel: 'warning',
    causes: [
      'Presenza di schegge, spine o forasacchi tra i polpastrelli',
      'Trauma muscolare, distorsione o microfrattura da salto/gioco',
      'Infiammazione articolare o artrosi (specie se anziano)',
      'Puntura d\'insetto o morso di zecca sulla zampa'
    ],
    advice: {
      do: [
        'Esamina attentamente i polpastrelli e lo spazio interdigitale con una torcia.',
        'Metti il cane a riposo assoluto in un\'area limitata (evita scale e salti sul divano).',
        'Applica un impacco freddo se noti un rigonfiamento evidente.'
      ],
      dont: [
        'NON somministrare MAI antinfiammatori per umani (aspirina, ibuprofene sono tossici/letali!).',
        'NON forzarlo a camminare per "sciogliere" la zampa.',
        'NON tentare di raddrizzare o tirare la zampa se sospetti una lussazione.'
      ]
    },
    relatedLessonId: 'l2',
    relatedLessonTitle: '2. La Relazione come Base'
  },
  {
    id: 'apatia',
    name: 'È Apatico/Letargico 💤',
    description: 'Il cane è insolitamente stanco, non risponde agli stimoli e rifiuta le attività preferite.',
    triageLevel: 'emergency',
    causes: [
      'Infezione sistemica o stato febbrile elevato',
      'Dolore acuto localizzato o generalizzato',
      'Anemia severa o perdita di sangue interna',
      'Disidratazione o sbilanciamento elettrolitico'
    ],
    advice: {
      do: [
        'Solleva delicatamente il labbro per verificare il colore delle gengive (devono essere rosa brillante).',
        'Controlla se risponde al richiamo o ad un rumore familiare.',
        'Se le gengive sono bianche/pallide o il cane non si alza, corri subito dal veterinario.'
      ],
      dont: [
        'NON ignorare l\'apatia se dura da più di qualche ora.',
        'NON costringere il cane a muoversi o fare sforzi fisici.',
        'NON lasciarlo al sole o in stanze calde e afose.'
      ]
    },
    relatedLessonId: 'l1',
    relatedLessonTitle: '1. Oltre il Comportamentismo'
  },
  {
    id: 'respiro_strano',
    name: 'Respira in modo Strano 🫁',
    description: 'Respiro troppo rapido a riposo (affanno), tosse convulsa, sibili o difficoltà ad inspirare.',
    triageLevel: 'emergency',
    causes: [
      'Colpo di calore in corso (ipertermia)',
      'Reazione allergica acuta o shock anafilattico (puntura d\'insetto)',
      'Soffocamento da ostruzione di corpo estraneo in gola',
      'Problemi cardiaci congestizi o edema polmonare'
    ],
    advice: {
      do: [
        'Mantieni la massima calma (la tua agitazione aumenta il suo panico e il consumo di ossigeno).',
        'Sfila collare o pettorina per facilitare l\'espansione toracica.',
        'Se noti gengive o lingua bluastre, si tratta di asfissia: corri in clinica d\'urgenza.'
      ],
      dont: [
        'NON somministrare liquidi o cibo per bocca (rischio di soffocamento).',
        'NON indurre il vomito se sospetti l\'inalazione di un oggetto.',
        'NON posizionare il cane in ambienti caldi o privi di ricambio d\'aria.'
      ]
    },
    relatedLessonId: 'l2',
    relatedLessonTitle: '2. La Relazione come Base'
  }
];
