import { Resource, TrainingDay } from './types';

export const RESOURCES: Resource[] = [
  {
    id: 'welcome',
    title: 'Benvenuto in Milo Everwood!',
    description: 'Introduzione al mondo Milo Everwood e alle risorse del Dog Kit.',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1_akvapCGrn8GmK9cPRPP1yN32AjZB4K3/view?usp=drive_link'
  },
  {
    id: 'dog-kit-ita',
    title: 'Dog Kit ITA (Guida completa)',
    description: 'La guida completa con tutto ciò che ti serve per gestire il tuo cucciolo: routine, salute, addestramento e molto altro.',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1oovFrzHNtcU-TZ1UcSQGzIFNIerkFFLr/view?usp=sharing'
  },
  {
    id: 'problems-solutions',
    title: 'Guida pratica 10 problemi del cane e Soluzioni',
    description: 'Strategie efficaci per risolvere i comportamenti problematici più comuni del tuo cucciolo.',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/14UYhIhlGzVO5owv3n6AjjKADElhqreZ5/view?usp=sharing'
  },
  {
    id: 'golden-rules',
    title: "Le 10 regole d'oro per Educare il tuo cane",
    description: "I principi fondamentali per un'educazione efficace basata sul rispetto e la comprensione del tuo cane.",
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1R2WkUzhDImhYGImK3-s-BAEt4UdlGmlx/view?usp=drive_link'
  },
  {
    id: 'first-aid',
    title: 'Primo soccorso canino',
    description: 'Manuale essenziale per gestire le emergenze e proteggere la salute del tuo cucciolo in situazioni critiche.',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1L4MUQMWdzKop4NpOOVEHO0WlWA-6E1/view?usp=sharing'
  },
  {
    id: 'five-minutes-guide',
    title: 'Guida 5 minuti al giorno col cane',
    description: 'Mini-guida PDF per applicare il metodo dei 5 minuti quotidiani con il tuo cane.',
    type: 'pdf',
    url: 'https://drive.google.com/file/d/1Hm0ldWJtyJvjwMHaQoH4IOHydeK3O-o/view?usp=sharing'
  },
  {
    id: 'video-disasters',
    title: 'I 10 "Disastri" dei cuccioli',
    description: 'Scopri le situazioni più comuni che creano problemi e come prevenirle efficacemente.',
    type: 'video',
    url: 'https://drive.google.com/file/d/1z7-pvPcv0lhxI2CblyF3-PYVbuXw7UUk/view?usp=sharing'
  },
  {
    id: 'video-welcome',
    title: 'Benvenuto Cucciolo',
    description: 'Video slideshow completo per affrontare con successo la prima settimana con il tuo nuovo cucciolo.',
    type: 'video',
    url: 'https://drive.google.com/file/d/1HAYTXkrL8dpIPgDw670eSknxmEXl4tG/view?usp=sharing'
  },
  {
    id: 'video-five-minutes',
    title: '5 minuti al giorno col Cane',
    description: 'Video dedicato al metodo dei 5 minuti per rafforzare il legame ogni giorno.',
    type: 'video',
    url: 'https://drive.google.com/file/d/1cZ47ZrGqe7tGwrIIQOd48kqFBtLaoElK/view?usp=sharing'
  },
  {
    id: 'podcast-ethology',
    title: 'Guida etologica al primo mese del cucciolo',
    description: 'Tutto ciò che devi sapere per affrontare con successo le prime settimane con il tuo nuovo amico.',
    type: 'audio',
    url: 'https://drive.google.com/file/d/11-OwYuF91BbbZnoh1sB72HPYLbzwMPUJ/view?usp=sharing'
  },
  {
    id: 'podcast-no-punishment',
    title: 'Risolvere i problemi del cane senza punizioni',
    description: 'Metodi efficaci e positivi per correggere i comportamenti indesiderati del tuo cucciolo.',
    type: 'audio',
    url: 'https://drive.google.com/file/d/1_Qg_5qLd5KQyuTkgO-YxMeBkyTj7xFYL/view?usp=sharing'
  }
];

export const TRAINING_DAYS: TrainingDay[] = [
  {
    id: 'monday',
    day: 'Lunedì',
    title: 'Addestramento',
    description: 'Insegna al tuo cane un comando di base (es. seduto, resta) utilizzando brevi sessioni, concentrandoti sulla coerenza e sul rinforzo positivo.',
    tip: 'Pazienza e ripetizioni costanti sono le chiavi per il successo.',
    completed: false
  },
  {
    id: 'tuesday',
    day: 'Martedì',
    title: 'Dai il Cinque',
    description: 'Insegna al tuo cane il comando "dai il cinque" per stimolare la sua mente e premiarlo con il divertimento. Un gioco interattivo che fortifica il vostro legame!',
    completed: false
  },
  {
    id: 'wednesday',
    day: 'Mercoledì',
    title: 'Esercizio Olfatto',
    description: "Offri al tuo cane un'ampia opportunità di utilizzare il suo incredibile senso dell'olfatto attraverso giochi di ricerca. Questa attività stimola la mente e riduce lo stress.",
    completed: false
  },
  {
    id: 'thursday',
    day: 'Giovedì',
    title: "Esplora l'Ambiente",
    description: "Porta il tuo cane in una breve esplorazione di una nuova strada o di un parco diverso, incoraggiandolo ad annusare e scoprire l'ambiente circostante.",
    completed: false
  },
  {
    id: 'friday',
    day: 'Venerdì',
    title: 'Gioco del Riporto',
    description: 'Dedica minuti attivi e divertenti con il cane giocando alcuni turni di riporto.',
    tip: 'Utilizza un gioco robusto, incoraggia con entusiasmo e varia i lanci.',
    completed: false
  },
  {
    id: 'saturday',
    day: 'Sabato',
    title: 'Gioca Insieme',
    description: "I giochi sono un ottimo modo per aumentare l'affiatamento. Dedica qualche minuto a giocare insieme a un gioco che entrambi amate: riporto, tira e molla, o nascondino.",
    completed: false
  },
  {
    id: 'sunday',
    day: 'Domenica',
    title: 'Passeggiata Tranquilla',
    description: "Una passeggiata tranquilla offre un'ottima opportunità per rafforzare il legame. Fai una lunga camminata insieme, fermandoti a esplorare e a godervi i momenti di calma.",
    completed: false
  }
];

export const FAQ_DATA = [
  {
    category: "Addestramento Base",
    questions: [
      {
        q: "Come insegno il comando 'Seduto'?",
        a: "Tieni un premietto vicino al naso del cane. Sposta la mano verso l'alto e leggermente indietro sopra la sua testa. Quando segue il premio con il naso, il suo sedere si abbasserà naturalmente. Appena si siede, dì 'Seduto', premialo e fagli le coccole."
      },
      {
        q: "Il mio cucciolo tira al guinzaglio, cosa faccio?",
        a: "Non appena il guinzaglio si tende, fermati immediatamente. Non tirare indietro, aspetta che il cane si giri verso di te o allenti la tensione. Quando lo fa, premialo e riprendi a camminare. La costanza è fondamentale: camminare deve essere un'attività collaborativa, non una gara di forza."
      },
      {
        q: "Come gestire il richiamo?",
        a: "Inizia in un ambiente senza distrazioni (come il corridoio di casa). Usa un tono allegro e un nome specifico per il richiamo (es. 'Vieni!'). Quando arriva, festeggia come se avesse vinto una medaglia d'oro. Mai sgridare un cane che torna da te, anche se ci ha messo molto tempo."
      }
    ]
  },
  {
    category: "Comportamento & Socializzazione",
    questions: [
      {
        q: "Perché il mio cucciolo morde mani e vestiti?",
        a: "È il loro modo di esplorare il mondo e giocare. Se morde troppo forte, emetti un piccolo guaito ('Ahi!') e interrompi il gioco per 30 secondi. Offrigli immediatamente un gioco masticabile alternativo. Imparerà che mordere la pelle interrompe il divertimento, mentre mordere i giochi lo continua."
      },
      {
        q: "Come socializzare correttamente il cucciolo?",
        a: "Socializzare non significa far incontrare tutti i cani del quartiere. Significa esporre il cucciolo a nuovi suoni, superfici, persone e animali in modo positivo e controllato. Assicurati che ogni nuova esperienza sia associata a qualcosa di piacevole (premietti o lodi) e non forzarlo mai se ha paura."
      }
    ]
  },
  {
    category: "Salute & Igiene",
    questions: [
      {
        q: "Ogni quanto devo lavare il mio cane?",
        a: "In genere, una volta ogni 1-3 mesi è sufficiente, a meno che non si rotoli nel fango. Lavaggi troppo frequenti possono rimuovere gli oli naturali della pelle. Usa sempre uno shampoo specifico per cani, poiché il loro pH è diverso dal nostro."
      },
      {
        q: "Come pulire le orecchie?",
        a: "Usa un batuffolo di cotone inumidito con un detergente auricolare specifico. Pulisci solo la parte visibile del padiglione auricolare. Non inserire mai cotton fioc nel condotto uditivo, potresti causare danni gravi."
      }
    ]
  },
  {
    category: "Gestione Quotidiana",
    questions: [
      {
        q: "Quante volte al giorno deve mangiare un cucciolo?",
        a: "Fino ai 6 mesi, è consigliabile suddividere la razione giornaliera in 3 pasti. Dopo i 6 mesi, si può passare a 2 pasti (mattina e sera). Cerca di mantenere orari regolari per aiutare la digestione e l'educazione ai bisogni fuori casa."
      },
      {
        q: "Il cane abbaia quando resta solo, cosa fare?",
        a: "Inizia con assenze brevissime (pochi secondi) e aumenta gradualmente. Lasciagli un gioco interattivo (come un Kong ripieno) per tenerlo occupato. Non fare grandi cerimonie quando esci o quando rientri: la tua partenza deve essere percepita come un evento normale e non stressante."
      }
    ]
  }
];
