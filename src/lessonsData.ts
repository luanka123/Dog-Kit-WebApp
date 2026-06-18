export interface Lezione {
  id: string;
  titolo: string;
  gratis: boolean;
  durata?: string;
  descrizione: string;
  contenuto: string;
  stepCompleti?: string[];
  consiglio?: string;
  approfondimento?: {
    titolo: string;
    introduzione: string;
    punti: { titolo: string; testo: string }[];
    conclusione: string;
    ctaPrezzo?: string;
  };
}

export interface CategoriaLezioni {
  id: string;
  nome: string;
  icona: string;
  eta: string;
  lezioni: Lezione[];
}

export const LEZIONI_DATA: CategoriaLezioni[] = [
  {
    id: 'fondamentali',
    nome: 'Fondamenti Cognitivo-Relazionali',
    icona: '🧠',
    eta: '2-4 mesi',
    lezioni: [
      {
        id: 'l1',
        titolo: '1. Oltre il Comportamentismo',
        gratis: true,
        durata: '6 min',
        descrizione: 'Sposta il focus dall\'azione esterna alla comprensione della mente e delle rappresentazioni interne del cane.',
        contenuto: 'Superare il modello S-R (Stimolo-Risposta) significa abbracciare il modello S-O-R, dove "O" rappresenta l\'Organismo. Il cane non è un automa che reagisce meccanicamente, ma un soggetto capace di rappresentazioni mentali e problem-solving. Il comportamento è il sintomo; il nostro obiettivo è agire sullo stato mentale che lo genera.',
        stepCompleti: [
          'Smetti di inibire semplicemente l\'azione esterna sgradita.',
          'Intergogati sulla rappresentazione interna che il cane ha dello stimolo (es: l\'estraneo è minaccia o risorsa?).',
          'Lavora sulla percezione cognitiva dello stimolo per modificare alla base il comportamento spontaneo.',
          'Evita punizioni fisiche o verbali che aumentano solo lo stress e l\'ansia silenziosa.'
        ],
        consiglio: '💡 Flash Card #1: Comportamento = Sintomo Mentale. Agisci sempre sulla causa interna, non sul riflesso!'
      },
      {
        id: 'l2',
        titolo: '2. La Relazione come Base',
        gratis: true,
        durata: '7 min',
        descrizione: 'Diventa una Guida Carismatica attraverso la gestione coerente delle risorse e la protezione.',
        contenuto: 'La relazione precede l\'educazione. Una vera guida non impone la forza, ma ispira fiducia diventando un punto di riferimento sicuro nei momenti di vulnerabilità. Il cane sceglie di collaborare perché stima il proprietario e lo percepisce come competente nel navigare la complessità ambientale.',
        stepCompleti: [
          'Gestisci con coerenza e calma le risorse principali (spazio, cibo, gioco).',
          'Intervieni per proteggere e rassicurare il cane quando si sente insicuro o minacciato.',
          'Dedica del tempo a esplorare ambienti naturalistici calmi, rafforzando la complicità.',
          'Sostituisci l\'imposizione forzata con l\'invito collaborativo basato sulla stima reciproca.'
        ],
        consiglio: '💡 Flash Card #2: Autorevolezza vs Coercizione. Chi protegge controlla, chi spaventa perde l\'anima del cane.'
      },
      {
        id: 'l3',
        titolo: '3. Bisogni vs Comportamenti',
        gratis: true,
        durata: '8 min',
        descrizione: 'Decodifica ogni comportamento "sgradito" come la manifestazione di un bisogno naturale insoddisfatto.',
        contenuto: 'Dietro un cane che distrugge il divano o scava nel giardino non c\'è mai un dispetto, ma la spinta vitale di un bisogno insoddisfatto (esplorativo, di masticazione o di sfogo motorio). Comprendere e incanalare la motivazione di specie è l\'unica via per una convivenza serena e priva di conflitti.',
        stepCompleti: [
          'Analizza la motivazione profonda alla base dell\'azione del cane (masticazione, esplorazione, socialità).',
          'Offri sbocchi alternativi sani e autorizzati per soddisfare quella specifica motivazione (es: masticativi naturali).',
          'Smetti di considerare la distruzione domestica come una provocazione intenzionale.',
          'Pianifica attività di attivazione mentale per canalizzare le energie cognitive ed abbassare l\'arousal.'
        ],
        consiglio: '💡 Flash Card #3: Il bisogno è il motore del cane. Soddisfa la motivazione e risolverai il sintomo.'
      },
      {
        id: 'l4',
        titolo: '4. Il Ruolo della Genetica',
        gratis: false,
        durata: '8 min',
        descrizione: 'Rispetta le predisposizioni di razza utilizzandole come punti di forza nel percorso educativo.',
        contenuto: 'La genetica canalizza e predispone specifiche tendenze d\'azione e stili cognitivi. Un Terrier o un Border Collie avranno soglie di reattività e bisogni motivazionali totalmente differenti. La plasticità cerebrale permette l\'apprendimento, ma lavorare andando contro la sua natura produce solo grave stress cronico.',
        stepCompleti: [
          'Studia le motivazioni tipiche del gruppo di razza a cui appartiene il tuo cucciolo.',
          'Progetta giochi d\'addestramento che sfruttano le sue doti innate (es: inseguimento controllato, riporto).',
          'Accetta i limiti genetici senza pretendere che un cane da guardia si comporti come un cane da festa.',
          'Struttura percorsi di desensibilizzazione specifici per le razze ad alta sensibilità sensoriale.'
        ],
        consiglio: '💡 Flash Card #4: Genetica e Plasticità Neurologica. Allena il cane che hai davanti, rispettando la sua origine.'
      },
      {
        id: 'l5',
        titolo: '5. Educatore vs Veterinario Comportamentalista',
        gratis: false,
        durata: '9 min',
        descrizione: 'Collabora con le figure corrette in caso di patologie della psiche o squilibri neurofisiologici.',
        contenuto: 'Mentre l\'educatore cinofilo si occupa dello sviluppo delle abilità relazionali, sociali e dei comandi base, il Medico Veterinario Comportamentalista diagnostica e tratta fobie gravi, ansia generalizzata, ipereccitabilità e aggressività clinica, escludendo potenziali algie (dolori cronici) o disfunzioni organiche.',
        stepCompleti: [
          'Consulta un veterinario comportamentalista se il cucciolo mostra attacchi di panico immotivati.',
          'Escludi sempre la componente dolorosa cronica se noti un cambio improvviso e aggressivo del carattere.',
          'Assati che l\'educatore e il veterinario lavorino in sinergia per una terapia integrata.',
          'Evita il fai-da-te o l\'uso di punizioni rigide di fronte ad evidenti stati di sofferenza psicologica.'
        ],
        consiglio: '💡 Flash Card #5: Diagnosi Clinica: Oltre l\'Educazione. Le ferite della mente si curano con la scienza medica.'
      }
    ]
  },
  {
    id: 'salute',
    nome: 'Salute e Primo Soccorso',
    icona: '🏥',
    eta: 'Tutte le età',
    lezioni: [
      {
        id: 'l6',
        titolo: '6. Tossine Alimentari (Alta Gravità)',
        gratis: false,
        durata: '7 min',
        descrizione: 'Proteggi il cucciolo inibendo l\'accesso a cioccolato, uva, uvetta e xilitolo.',
        contenuto: 'Alcuni alimenti innocui per noi contengono molecole estremamente tossiche per i cani. La teobromina del cioccolato può indurre arresto cardiaco e grave iperattività; l\'uva e l\'uvetta causano insufficienza renale acuta fulminante; lo xilitolo stimola un rilascio massiccio di insulina, portando a coma ipoglicemico mortale.',
        stepCompleti: [
          'Conserva cioccolato e dolci industriali in scaffali alti e chiusi ermeticamente.',
          'Rimuovi dal salotto o da terra gomme da masticare e caramelle contenenti xilitolo.',
          'Insegna a tutti in famiglia e agli ospiti il divieto assoluto di offrire chicchi d\'uva al cane.',
          'In caso di ingestione accidentale, contatta immediatamente la clinica veterinaria senza attendere i sintomi.'
        ],
        consiglio: '💡 Flash Card #6: Killer in Cucina. Xilitolo, cioccolato e uva possono essere letali anche in piccole dosi.'
      },
      {
        id: 'l7',
        titolo: '7. Tossine Alimentari (Media Gravità)',
        gratis: false,
        durata: '6 min',
        descrizione: 'Riconosci l\'impatto negativo a medio termine di cipolle, aglio e noci di Macadamia.',
        contenuto: 'Ingredienti molto usati in cucina come l\'aglio e la cipolla contengono composti solforati che danneggiano irreversibilmente i globuli rossi del cane, provocando anemia emolitica (visibile da gengive pallide, affanno e urine scure). Le noci di Macadamia colpiscono il sistema nervoso, provocando debolezza e paralisi temporanea degli arti posteriori.',
        stepCompleti: [
          'Evita di condividere avanzi della tavola conditi con sughi, soffritti o brodi vegetali umani.',
          'Controlla che non vi siano noci o nocciole sparse in giardino o nel perimetro di casa.',
          'Ispeziona le gengive del cane: devono essere di un rosa sano e lucido, mai bianche o violacee.',
          'Sostituisci i premi alimentari fatti in casa con snack naturali d\'essiccamento animale privi di condimento.'
        ],
        consiglio: '💡 Flash Card #7: Debolezza e Anemia. Soffritti e avanzi saporiti danneggiano le vie ematiche del cane.'
      },
      {
        id: 'l8',
        titolo: '8. Protocollo Colpo di Calore',
        gratis: false,
        durata: '8 min',
        descrizione: 'Applica la sequenza salvavita in caso di esposizione solare critica o temperature afose.',
        contenuto: 'I cani non sudano e l\'unico mezzo per regolare la temperatura è la respirazione affannosa. Un colpo di calore manda in blocco gli organi interni in pochi minuti. Se il cane appare barcollante, presenta bava densa e lingua rosso acceso, devi attuare immediatamente il protocollo di raffreddamento controllato.',
        stepCompleti: [
          'Sposta subito il cane in un luogo fresco, all\'ombra e ventilato.',
          'Bagna abbondantemente zampe, petto e ascelle con acqua fresca (temperatura ambiente).',
          'NON utilizzare mai acqua ghiacciata o ghiaccio: provocherebbe un vasospasmo letale.',
          'Offri piccoli sorsi d\'acqua senza forzarlo, per poi guidare d\'urgenza verso il medico veterinario.'
        ],
        consiglio: '💡 Flash Card #8: Emergenza Termica. Focus del raffreddamento graduale su petto, ascelle e polpastrelli.'
      },
      {
        id: 'l9',
        titolo: '9. La Manovra del Sale',
        gratis: false,
        durata: '7 min',
        descrizione: 'Impara l\'induzione controllata al vomito in caso d\'emergenza per l\'ingestione di esche tossiche.',
        contenuto: 'Se assisti all\'ingestione visibile di un veleno o di un corpo estraneo non tagliente nell\'arco degli ultimi 30 minuti, puoi salvare la vita al cane inducendolo a rimettere prima che la tossina venga del tutto assimilata. Questa manovra richiede l\'uso di sale grosso o acqua ossigenata alla base della lingua.',
        stepCompleti: [
          'Contatta immediatamente il veterinario o il centro antiveleni per ricevere l\'autorizzazione prima di procedere.',
          'In caso di via libera, posiziona 2 cucchiaini di sale grosso alla base della lingua del cane chiudendo la bocca per qualche secondo.',
          'In alternativa, somministra 10-15 ml di acqua ossigenata per via orale usando una siringa senza ago.',
          'Non indurre MAI il vomito se il cane ha ingerito liquidi corrosivi (acidi), vetri o se appare letargico/privo di sensi.'
        ],
        consiglio: '💡 Flash Card #9: Induzione d\'Emergenza. Svuotare lo stomaco entro mezz\'ora evita l\'assimilazione del veleno.'
      },
      {
        id: 'l10',
        titolo: '10. Numeri Rapidi e Logistica',
        gratis: false,
        durata: '5 min',
        descrizione: 'Costruisci la scheda tecnica e l\'armadietto farmaceutico d\'emergenza del cucciolo.',
        contenuto: 'In un momento di forte panico e stress, la lucidità viene meno. Organizzare preventivamente una mappa logistica con i contatti utili e un kit d\'intervento rapido ti darà un vantaggio competitivo decisivo per superare l\'impasse e salvare la vita al tuo compagno fedele.',
        stepCompleti: [
          'Compila la scheda con i numeri della clinica H24 più vicina, del veterinario curante e del Centro Antiveleni.',
          'Incolla la mappa dei contatti sul frigorifero o vicino al guinzaglio, rendendola visibile ad amici e familiari.',
          'Prepara un kit contenente garze sterili, disinfettante senza alcol, pinzette per zecche e termometro digitale.',
          'Memorizza il percorso stradale più veloce verso il pronto soccorso veterinario notturno.'
        ],
        consiglio: '💡 Flash Card #10: Protocollo Panico Zero. La preparazione batte la sfortuna. Organizzati oggi!'
      }
    ]
  },
  {
    id: 'comunicazione',
    nome: 'Comunicazione e Decodifica',
    icona: '🐕',
    eta: 'Tutte le età',
    lezioni: [
      {
        id: 'l11',
        titolo: '11. Il Ringhio come Avvertimento',
        gratis: false,
        durata: '8 min',
        descrizione: 'Non punire mai il ringhio; rispettalo sempre come un segnale pacifico d\'onestà emotiva.',
        contenuto: 'Il ringhio è un elemento fondamentale della comunicazione canina, utilizzato per stabilire distanze e allontanare una potenziale minaccia. Se punisci un cane che ringhia, inibirai il sintomo ma non la causa. Il risultato sarà un cane che, trovandosi alle strette, morderà all\'improvviso senza alcun segnale di preavviso.',
        stepCompleti: [
          'Se il cane ringhia, fermati immediatamente e fai un passo indietro per diminuire la pressione.',
          'Non sgridarlo nè punirlo: ti sta parlando sinceramente del suo disagio psicologico.',
          'Analizza l\'elemento scatenante (una carezza prolungata, la manipolazione della zampa o la difesa del cibo).',
          'Lavora sulla desensibilizzazione sistematica per ridurre l\'ansia legata a quella determinata interazione.'
        ],
        consiglio: '💡 Flash Card #11: Il Ringhio è Vita. Meglio un cane che ci parla onestamente di uno che morde in silenzio.'
      },
      {
        id: 'l12',
        titolo: '12. Whale Eye (Occhio a Mezzaluna)',
        gratis: false,
        durata: '6 min',
        descrizione: 'Impara a decodificare la sclera dell\'occhio visibile come indice di stress e minaccia percepita.',
        contenuto: 'Quando il cane gira leggermente la testa ma continua a fissare lo stimolo disturbante con lo sguardo, si rende visibile la parte bianca del bulbo oculare (sclera), creando l\'effetto di una mezzaluna bianca: il cosiddetto "Whale Eye". È un chiarissimo sintomo di profondo disagio, ansia e minaccia imminente.',
        stepCompleti: [
          'Osserva se il cane mostra il Whale Eye mentre gli accarezzi la testa o mentre un estraneo si china su di lui.',
          'Interrompi all\'istante l\'interazione e offrigli spazio rassicurante allontanando la persona o lo stimolo.',
          'Evita di fissare a tua volta il cane negli occhi: aumenterebbe esponenzialmente la sensazione di sfida.',
          'Riconosci questo segnale sottile per prevenire risposte difensive più energiche.'
        ],
        consiglio: '💡 Flash Card #12: Mezzaluna dell\'Ansia. Se vedi la parte bianca dell\'occhio, ferma l\'interazione.'
      },
      {
        id: 'l13',
        titolo: '13. Freezing (Blocco Motorio)',
        gratis: false,
        durata: '7 min',
        descrizione: 'Riconosci lo stato di immobilizzazione motoria come conflitto prima dell\'attacco o fuga.',
        contenuto: 'Il "Freezing" consiste in una rigidità muscolare improvvisa e totale nella quale il cane smette di muoversi e si "congela". Avviene quando il conflitto interno tra l\'attacco e la fuga giunge al culmine. Forzare fisicamente il cane al movimento o alla manipolazione in questo stato provoca quasi sempre un\'esplosione aggressiva di difesa.',
        stepCompleti: [
          'Non tirare il guinzaglio se noti che il cane si congela di fronte a un altro cane o stimolo.',
          'Mettiti a lato del cane fungendo da scudo visivo per allentare la pressione emotiva.',
          'Aspetta che il cane ritrovi respiro e mostri segnali di decompressione spontanea (leccatina o scrollata).',
          'Se possibile, aumenta la distanza dallo stimolo in modo lento e non minaccioso.'
        ],
        consiglio: '💡 Flash Card #13: Stop & Decompress. L\'immobilità rigida è l\'ultimo avviso prima dell\'esplosione.'
      },
      {
        id: 'l14',
        titolo: '14. Lip Licking e Sbadiglio',
        gratis: false,
        durata: '6 min',
        descrizione: 'Interpreta questi piccoli segnali di pacificazione per moderare lo stress quotidiano.',
        contenuto: 'Leccarsi ripetutamente le labbra (in assenza di cibo) o sbadigliare fuori contesto (es: durante una coccola o un rimprovero) sono i segnali di calma più diffusi. Servono al cane per tentare di autocalmarsi e comunicare intenzioni pacifiche all\'interlocutore, riducendo i livelli interni di cortisolo.',
        stepCompleti: [
          'Osserva l\'insorgenza di sbadigli frequenti in contesti sociali o di addestramento intensivo.',
          'Se il cane si lecca il tartufo mentre lo abbracci, allontanati: quell\'approccio fisico lo stressa.',
          'Usa a tua volta lo sbadiglio girando leggermente la testa per comunicare intenzione pacifica all\'animale.',
          'Fornisci pause adeguate durante le sessioni educative se noti questi chiari segnali di affaticamento.'
        ],
        consiglio: '💡 Flash Card #14: I Microsegnati. Lo sbadiglio e la leccatina sono grida d\'aiuto silenziose del cane.'
      },
      {
        id: 'l15',
        titolo: '15. Shake Off (Scrollarsi)',
        gratis: false,
        durata: '6 min',
        descrizione: 'Valorizza lo scrollarsi spontaneo come segnale di scarico dello stress accumulato.',
        contenuto: 'Scrollarsi (esattamente come quando il cane è bagnato) dopo un\'interazione intensa, una visita medica o un incontro al guinzaglio è un magnifico segnale biologico di decompressione. Significa che l\'evento pressante è terminato e il sistema parasimpatico sta ripristinando la calma neurovegetativa interna.',
        stepCompleti: [
          'Nota se il cane si scrolla dopo che un ospite prolisso ha terminato di accarezzarlo energeticamente.',
          'Consideralo come il segnale di "fine capitolo": ora il cucciolo ha azzerato l\'ansia temporanea.',
          'Favorisci il relax assecondando lo scrollamento prima di proporre nuove attività o comandi.',
          'Se non si scrolla dopo eventi stressanti, offrigli un masticativo per aiutarlo a decomprimere.'
        ],
        consiglio: '💡 Flash Card #15: Riavvio del Sistema. Lo scrollarsi scarica la tensione muscolare e mentale.'
      },
      {
        id: 'l16',
        titolo: '16. Posizioni della Coda',
        gratis: false,
        durata: '7 min',
        descrizione: 'Decodifica la rigidità, l\'altezza e il movimento come termometro dell\'arousal del cucciolo.',
        contenuto: 'Una coda in movimento non indica necessariamente felicità, ma semplicemente uno stato di eccitazione (positivo o negativo che sia). Una coda tenuta alta, rigida ed in vibrazione rapida segnala tensione, allerta o intenzione di sfida. Al contrario, la coda serrata tra le zampe posteriori (Tail Tuck) manifesta paura intensa o sottomissione.',
        stepCompleti: [
          'Evita di considerare amichevole un cane sconosciuto basandoti solo sullo scodinzolio frenetico.',
          'Valuta l\'altezza della base della coda in rapporto alla razza (es: un Levriero la tiene sempre bassa di natura).',
          'Osserva se la coda oscilla in modo rilassato o se invece vibra tesa come una corda di violino.',
          'In presenza di coda serrata, abbassati e offri una presenza protettiva senza stringere il cane in un abbraccio.'
        ],
        consiglio: '💡 Flash Card #16: Termometro Emotivo. Leggi la rigidità della coda prima di permettere l\'interazione.'
      },
      {
        id: 'l17',
        titolo: '17. Segnali Vocali',
        gratis: false,
        durata: '6 min',
        descrizione: 'Identifica le intenzioni canine leggendo l\'abbaio di allerta, richiesta o gioco.',
        contenuto: 'Le vocalizzazioni hanno scopi comunicativi precisi. Un abbaio di allerta è rapido, acuto, ripetitivo e ravvicinato; l\'abbaio di richiesta d\'attenzione presenta pause in cui il cane attende una reazione; il mugugno o il grugnito sordo durante le coccole o il riposo manifestano un profondo appagamento emotivo e fisico.',
        stepCompleti: [
          'Distingui l\'abbaio da noia (cadenzato, quasi lamentoso) dall\'abbaio territoriale.',
          'Smetti di sgridare urlando quando abbaia: scambierebbe le tue grida per un abbaio solidale.',
          'Rispondi con lodi calme alle vocalizzazioni di piacere e relax della sera.',
          'Usa il silenzio strategico per estinguere del tutto l\'abbaio di pretesa ed elemosina cibo.'
        ],
        consiglio: '💡 Flash Card #17: La Voce del Cane. Ogni suono è una richiesta; impara a distinguere noia da urgenza.'
      },
      {
        id: 'l18',
        titolo: '18. Pilorezione',
        gratis: false,
        durata: '6 min',
        descrizione: 'Interpreta il pelo spazzolato sul dorso come risposta fisiologica involontaria d\'eccitazione.',
        contenuto: 'La pilorezione (il pelo dritto lungo la schiena e il collo) è una reazione involontaria generata dal sistema nervoso simpatico. È l\'equivalente della nostra pelle d\'oca e indica esclusivamente un picco di eccitazione (ansia, sorpresa, paura o allerta), ma non necessariamente intenzioni aggressive ostili.',
        stepCompleti: [
          'Prendi nota se il pelo si raddrizza in presenza d\'incontri ravvicinati improvvisi.',
          'Aumenta la distanza dallo stimolo per consentire all\'eccitazione fisiologica di decantare con calma.',
          'Non sgridare il cane gridando pensando che stia facendo il "bullo": ha solo elevate pulsazioni cardiache.',
          'Fornisci rassicurazione fisica ponendoti al suo fianco in modo tranquillo e stabile.'
        ],
        consiglio: '💡 Flash Card #18: Adrenalina Fisica. Il pelo dritto è un termometro di arousal, non di cattiveria.'
      },
      {
        id: 'l19',
        titolo: '19. Sguardo Diretto vs Distolto',
        gratis: false,
        durata: '7 min',
        descrizione: 'Sfrutta lo sguardo distolto per abbassare la tensione sociale negli incontri quotidiani.',
        contenuto: 'Nel mondo canino, fissare intensamente negli occhi un altro soggetto equivale a una minaccia, una sfida d\'attenzione o una richiesta di sottomissione. Al contrario, spostare lo sguardo e girare la testa lateralmente è uno dei segnali di pacificazione più autorevoli ed efficaci per dichiarare l\'assenza di intenzioni minacciose.',
        stepCompleti: [
          'Insegna a ospiti ed estranei di non guardare mai fisso negli occhi il cucciolo pauroso.',
          'Gira leggermente il corpo e lo sguardo di lato quando approcci un cane che mostra segni di diffidenza.',
          'Premia la scelta spontanea del tuo cane di distogliere lo sguardo davanti a stimoli attivanti.',
          'Usa lo sguardo soffuso e rilassato per stringere un legame di complicità e intesa intima.'
        ],
        consiglio: '💡 Flash Card #19: Diplomazia Visiva. Fissare è una provocazione; girare lo sguardo è educazione canina.'
      },
      {
        id: 'l20',
        titolo: '20. Il Linguaggio del Corpo dell\'Umano',
        gratis: false,
        durata: '8 min',
        descrizione: 'Rendi coerente la tua postura fisica con i comandi verbali per facilitare l\'apprendimento.',
        contenuto: 'Il cane apprende con i canali non verbali (gesti, posture, micro-tensioni muscolari) molto prima di comprendere una parola parlata. Spesso gli umani dicono "vieni" stando protesi in avanti o bloccando il cane fisicamente, mandando messaggi contrastanti. Muoversi all\'indietro, invece, stimola la naturale propensione all\'inseguimento.',
        stepCompleti: [
          'Muoviti all\'indietro quando invochi il richiamo verbale ("Vieni!"), allungando le braccia.',
          'Evita di incurvarti pesantemente sopra la testa del cucciolo se gli stai chiedendo il "Seduto".',
          'Sii consapevole delle tue tensioni muscolari: la fretta o la rigidità irrigidiscono istantaneamente anche il cane.',
          'Allinea sempre il gesto della mano all\'istruzione acustica, mantenendo tonalità allegre e rilassate.'
        ],
        consiglio: '💡 Flash Card #20: Coerenza Umana. Il tuo corpo parla: impara a muoverti per invitare e non per bloccare.'
      }
    ]
  },
  {
    id: 'gestione',
    nome: 'Gestione dei Primi 30 Giorni',
    icona: '📅',
    eta: '2-3 mesi',
    lezioni: [
      {
        id: 'l21',
        titolo: '21. Il Set-up Logistico',
        gratis: false,
        durata: '8 min',
        descrizione: 'Organizza la corretta attrezzatura biologica: pettorina ad H (ergonomica) e lunghina.',
        contenuto: 'Per garantire uno sviluppo articolare corretto e un totale comfort psicofisico, l\'uso del collare a strozzo o della pettorina ascellare (che blocca le scapole) va abolito. La pettorina ad H svedese o romana consente il libero movimento del cucciolo e non associa il dolore al collo alla presenza d\'altri cani o stimoli.',
        stepCompleti: [
          'Acquista una pettorina modello ad H regolabile su almeno 5 punti per adattarsi alla crescita.',
          'Usa un guinzaglio lungo almeno 3 metri o una lunghina da 10 metri per le uscite in spazi aperti d\'erba.',
          'Abbandona l\'uso del guinzaglio estensibile finto-libero che mantiene il cane in costante trazione sul collo.',
          'Prepara i primi snack sani a pezzetti piccoli per stimolare la masticazione ed il focus.'
        ],
        consiglio: '💡 Flash Card #21: Libertà in Sicurezza. La pettorina ad H protegge il sistema scheletrico ed articolare.'
      },
      {
        id: 'l22',
        titolo: '22. Crate Training (Il Safe Place)',
        gratis: false,
        durata: '9 min',
        descrizione: 'Progetta il kennel come rifugio inviolabile per ritualizzare la nanna e rilassare il cucciolo.',
        contenuto: 'I cuccioli accumulano stress a causa della novità ambientale e necessitano di 18-20 ore di riposo giornaliero. Il kennel (trasportino o gabbietta rigida aperta) deve essere configurato non come una prigione, ma come una meravigliosa tana calda in cui nessun umano o bambino ha il diritto di disturbarlo.',
        stepCompleti: [
          'Posiziona il kennel in un angolo silenzioso della casa, privo di correnti d\'aria o rumore.',
          'Lancia bocconcini deliziosi all\'interno del kennel aperto lasciando che il cane entri ed esca in libertà.',
          'Consuma i primi pasti del cucciolo all\'interno del trasportino per potenziarne l\'associazione positiva.',
          'Chiudi la porticina solo per pochi secondi mentre mastica qualcosa di morbido, allungando i tempi molto gradualmente.'
        ],
        consiglio: '💡 Flash Card #22: Tana Sicura. Il kennel è il castello privato del cane; rispetta la sua quiete totale.'
      },
      {
        id: 'l23',
        titolo: '23. Decompressione Ambientale',
        gratis: false,
        durata: '8 min',
        descrizione: 'Gestisci la prima settimana escludendo stressor e puntando su masticazione ed annuso.',
        contenuto: 'Nelle prime 72 ore dall\'arrivo a casa, il livello di cortisolo (l\'ormone dello stress causato dal distacco dalla famiglia d\'origine) è alle stelle. Evita visite d\'amici, passeggiate in luoghi caotici e sessioni d\'addestramento frenetiche. Dedica i primi giorni esclusivamente a far decompandere il sistema nervoso.',
        stepCompleti: [
          'Offri masticativi naturali (nervetti, orecchie di maiale o Kong ricolmo di cibo congelato).',
          'Sfrutta la masticazione prolungata per stimolare la produzione di endorfine e indurre sonnolenza profonda.',
          'Consenti al cane di esplorare la casa stanza dopo stanza con ritmi e tempi scelti da lui.',
          'Riduci al minimo i rumori domestici (televisione, urla, aspirapolvere) in questi primi delicatissimi giorni.'
        ],
        consiglio: '💡 Flash Card #23: La Chimica della Calma. Masticare riduce l\'adrenalina e favorisce lo sviluppo cognitivo sano.'
      },
      {
        id: 'l24',
        titolo: '24. Protocollo Toilette',
        gratis: false,
        durata: '9 min',
        descrizione: 'Impara la routine per premiare il successo dei bisogni fuori entro 3 secondi.',
        contenuto: 'L\'apprendimento del vasino si basa sulla creazione di abitudini fisiologiche costanti e sul rinforzo istantaneo del comportamento corretto. Punire il cane per aver sporcato in casa gli insegnerà esclusivamente a nascondersi da te per fare i bisogni, raddoppiando l\'ansia legata alla tua presenza.',
        stepCompleti: [
          'Porta fuori il cucciolo nei momenti chiave: appena si sveglia, dopo il gioco e 15 minuti dopo i pasti.',
          'Attendi in silenzio sul prato senza distrarlo o parlare finché non decide di sporcare da solo.',
          'Premia entusiasta con cibo irresistibile entro 3 secondi esatti dalla fine del bisogno.',
          'Se sporca in casa, pulisci in assenza del cane usando detersivi enzimatici specifici privi di ammoniaca.'
        ],
        consiglio: '💡 Flash Card #24: Toilette Intelligente. Premia il successo all\'esterno; ignora e previeni gli errori interni.'
      },
      {
        id: 'l25',
        titolo: '25. Routine Biologica',
        gratis: false,
        durata: '8 min',
        descrizione: 'Struttura orari rigidi e prevedibili per pappe, sonno e passeggiate.',
        contenuto: 'La prevedibilità degli eventi riduce l\'ansia da anticipazione del cane. Strutturare giornate ordinate e cicliche permette al cucciolo di sincronizzare le sue funzioni organiche e mentali, migliorando nettamente la qualità del sonno notturno e la stabilità del comportamento durante le ore sveglie.',
        stepCompleti: [
          'Servi i pasti quotidiani sempre nello stesso range orario di riferimento.',
          'Incatesta le ore d\'attività motoria attiva tra lunghi blocchi dedicati al relax e alla nanna rilassante.',
          'Mantieni orari di scarico igienico regolari per supportare lo sviluppo sano dell\'apparato urinario.',
          'Ritualizza gli ultimi istanti della giornata offrendo un piccolo snack masticabile prima di dormire.'
        ],
        consiglio: '💡 Flash Card #25: Ritmo Biologico. Prevedibilità e costanza azzerano l\'ansia di attesa nel cucciolo.'
      }
    ]
  },
  {
    id: 'socializzazione',
    nome: 'Socializzazione (Bingo)',
    icona: '🌍',
    eta: '2-6 mesi',
    lezioni: [
      {
        id: 'l26',
        titolo: '26. Socializzazione alle Superfici',
        gratis: false,
        durata: '7 min',
        descrizione: 'Guida tattile per abituare il cane a ghiaia, grate di metallo e pavimenti lucidi.',
        contenuto: 'L\'esposizione del cucciolo a substrati di varia consistenza fisica e temperatura tattile previene blocchi motori o traumi posturali futuri in ambiente urbano. Ogni superficie inedita va presentata gradualmente senza forzature, posizionando premietti d\'incoraggiamento a terra.',
        stepCompleti: [
          'Trova luoghi tranquilli in cui far esplorare erba bagnata, corteccia, ghiaia fine e asfalto caldo.',
          'Presenta le grate metalliche dei tombini spargendovi sopra bocconcini senza tirare la corda.',
          'Abituato ai pavimenti in legno o piastrelle molto scivolose camminando a ritmi molto rilassati.',
          'Associa lodi verbali sommesse per coronare il coraggio motorio espresso dal cucciolo.'
        ],
        consiglio: '💡 Flash Card #26: Bingo Tattile. Piedini coraggiosi: la confidenza nasce dal contatto con terreni diversi.'
      },
      {
        id: 'l27',
        titolo: '27. Desensibilizzazione ai Rumori',
        gratis: false,
        durata: '8 min',
        descrizione: 'Spiegazione scientifica per l\'abito equilibrato a tuoni, fuochi d\'artificio e phon.',
        contenuto: 'L\'udito del cane è incredibilmente sensibile e i rumori forti ed improvvisi possono scatenare fobie acustiche croniche. La desensibilizzazione sistematica agisce riproducendo i suoni "killer" in ambienti protetti a un volume estremamente ridotto, mentre il cane è focalizzato in attività masticatrici rilassanti.',
        stepCompleti: [
          'Scarica o riproduci suoni registrati di temporali, sirene e traffico caotico a volume quasi impercettibile.',
          'Offri in contemporanea un Kong congelato saporito per innescare un\'associazione dopaminergica positiva.',
          'Aumenta il volume della riproduzione solo se lo sbadiglio, la rigidità corporea o l\'allerta sono del tutto assenti.',
          'Durante temporali reali, mantieni un atteggiamento gioviale e sicuro senza consolare ansiosamente il cane.'
        ],
        consiglio: '💡 Flash Card #27: Sicurezza Acustica. L\'abituazione avviene sotto soglia: il rumore deve essere un sussurro.'
      },
      {
        id: 'l28',
        titolo: '28. Incontro con le Persone',
        gratis: false,
        durata: '8 min',
        descrizione: 'Abitua il cucciolo ad estranei con cappello, bambini, divise e passeggini senza stress.',
        contenuto: 'I cani non generalizzano la figura dell\'essere umano. Per un cucciolo in crescita, un postino in uniforme, un uomo corpulento che indossa un casco o un bambino rumoroso in bicicletta possono apparire come minacce del tutto aliene se non sono mai stati presentati come elementi positivi e amichevoli della vita urbana.',
        stepCompleti: [
          'Chiedi a estranei cortesi di sedersi o accovacciarsi di lato senza fissare direttamente sugli occhi il cucciolo.',
          'Non forzare mai il cane al contatto: lascia che sia lui ad allungare spontaneamente il naso per annusare.',
          'Insegna a bambini e ospiti di non allungare mai le mani sopra la testa sensibile del cucciolo per accarezzarlo.',
          'Premia la scelta del cane di guardare l\'estraneo con calma distorcendo lo sguardo subito dopo.'
        ],
        consiglio: '💡 Flash Card #28: Biodiversità Umana. Presenta cappelli, passeggini ed ombrelli come distributori di premi.'
      },
      {
        id: 'l29',
        titolo: '29. Interazione con Altri Animali',
        gratis: false,
        durata: '9 min',
        descrizione: 'Seleziona incontri sociali competenti per evitare fobie infantili e reattività.',
        contenuto: 'La vera socializzazione interspecifica e intraspecifica non significa far giocare il tuo cucciolo con qualsiasi cane incontri al parco (cosa che favorisce eccitazione compulsiva o paura). Consiste nell\'incontrare soggetti adulti competenti ed equilibrati che gli insegnino le buone maniere e la calma.',
        stepCompleti: [
          'Evita l\'approccio incontrollato con cani nevrotici al guinzaglio teso.',
          'Incontra cani di sesso opposto equilibrati per far apprendere la ritualizzazione sociale delle distanze.',
          'Socializza con gatti domestici abituati ai cani tutelando l\'assenza di inseguimenti reciproci veloci.',
          'Premia la capacità del cucciolo di ignorare gli altri animali per restare focalizzato su di te.'
        ],
        consiglio: '💡 Flash Card #29: Socialità Competente. Pochi incontri ma di altissima qualità etologica.'
      },
      {
        id: 'l30',
        titolo: '30. Ambienti Complessi',
        gratis: false,
        durata: '9 min',
        descrizione: 'Presenta bar, mercati all\'aperto e scale mobili per fortificare il carattere.',
        contenuto: 'Guidare il cane in ambienti sensoriali ricchi (fumo d\'asfalto, passi ravvicinati, voci di mercato) richiede un approccio lento e mirato. La fretta e la saturazione degli stimoli ambientali provocano sequestri emotivi nei quali il cane cessa di imparare e accumula frustrazione e paura.',
        stepCompleti: [
          'Inizia la sessione fuori dalle ore di punta per consentire un approccio morbido all\'ambiente.',
          'Siediti al tavolo di un bar tranquillo posizionando un tappetino per delimitare il confine sicuro del cucciolo.',
          'Interrompi subito l\'esposizione se noti coda serrata, tremori, Whale Eye o se rifiuta il cibo saporito.',
          'Concludi ogni visita in un ambiente rurale calmo per permettere l\'eliminazione del cortisolo.'
        ],
        consiglio: '💡 Flash Card #30: Urbanizzazione Lenta. Lo spazio interiore del bar deve essere associato a puro relax.'
      }
    ]
  },
  {
    id: 'saltare',
    nome: 'Saltare Addosso (Metodo Ninja)',
    icona: '🥷',
    eta: '3+ mesi',
    lezioni: [
      {
        id: 'l31',
        titolo: '31. Indifferenza Strategica (Be an Anchor)',
        gratis: false,
        durata: '8 min',
        descrizione: 'Impara ad azzerare l\'attenzione sgridante per estinguere l\'euforia frenetica del rientro.',
        contenuto: 'L\'attenzione è la moneta d\'oro del cane: sgridarlo, guardarlo o spingerlo via con le mani quando ti salta addosso viene percepito come un eccellente rinforzo sociale d\'interazione fisica. La tecnica dell\'ancore consiste nel togliere qualsiasi input visuale e sonoro rendendo il salto socialmente inefficace.',
        stepCompleti: [
          'All\'ingresso in casa, mantieni un silenzio assoluto incrociando le braccia sul petto con fermezza.',
          'Girati completamente di spalle se il cane tenta di forzare il contatto visivo saltandoti davanti.',
          'Non pronunciare il suo nome, non guardarlo e non toccarlo in nessun modo finché si agita.',
          'Attendi l\'azzeramento spontaneo dell\'eccitatore motoria prima di considerare la presenza del cane.'
        ],
        consiglio: '💡 Flash Card #31: Be an Anchor. Silenzio e immobilità azzerano l\'eccitazione del rientro.'
      },
      {
        id: 'l32',
        titolo: '32. La Tecnica dello Scansarsi (Ninja Move)',
        gratis: false,
        durata: '8 min',
        descrizione: 'Applica lo spostamento laterale ninja se il cane cerca il rinforzo tattile muscolare.',
        contenuto: 'Se il cane salta non tanto per raccogliere attenzione, ma perché ama la sensazione fisica di impatto e spinta contro il tuo corpo, l\'immobilità rischia di essere inefficace. La mossa ninja consiste in un agile spostamento laterale compiuto un secondo prima del contatto corporeo, lasciando cadere le sue zampe a vuoto sul pavimento.',
        stepCompleti: [
          'Prevedi l\'andamento del salto leggendo la postura curva di carica motoria del cane.',
          'Fai un passo rapido a destra o sinistra un istante prima dell\'impatto, senza l\'uso delle mani per spingerlo.',
          'Fai scendere delicatamente le zampe del cane sul pavimento freddo senza alcun punto d\'appoggio.',
          'Premia all\'istante con un dolcetto lanciato a terra non appena si trova su tutte e quattro le zampe.'
        ],
        consiglio: '💡 Flash Card #32: Ninja Move. Mancando l\'appoggio muscolare, l\'automatismo del salto si sgretola velocemente.',
        approfondimento: {
          titolo: 'Approfondimento Scientifico: La "Tecnica Ninja" (or The Ninja Move)',
          introduzione: 'La "Tecnica Ninja" è un pilastro del protocollo operativo del Dog Kit per gestire uno dei problemi più comuni: il cane che salta addosso per salutare o richiedere attenzioni. A differenza del semplice "ignorare il cane", che spesso fallisce perché il salto è un comportamento autogratificante (il cane prova piacere nel solo contatto fisico delle zampe sul corpo umano), la Tecnica Ninja interviene fisicamente per interrompere nell\'immediato il rinforzo.',
          punti: [
            {
              titolo: '1. Il Nucleo della Tecnica: Scansarsi lateralmente',
              testo: 'L\'azione principale consiste nello scansarsi lateralmente con un pizzico di agilità nel momento esatto in cui il cane stacca le zampe da terra per saltare. L\'obiettivo: Far andare le zampe del cane "a vuoto". Invece di trovare il petto o le gambe del proprietario su cui appoggiarsi, il cane non trova nulla e ricade a terra. La logica comportamentale: Eliminando il contatto fisico, si rimuove il premio immediato (l\'autogratificazione). Il cane impara rapidamente che saltare non porta al risultato sperato.'
            },
            {
              titolo: '2. Evoluzione nel Dog Kit: L\'approccio Ibrido',
              testo: 'Nelle fonti, la Tecnica Ninja non è un\'azione isolata ma una combinazione strategica di tre elementi: 1) Scansarsi (Il Ninja Move) per far fallire il salto. 2) Tecnica della Statua (Be an Anchor): una volta che il cane è tornato a terra, diventare immobili, inespressivi e senza contatto visivo. 3) Rinforzo Positivo: interagire, accarezzare e premiare il cane solo quando tutte e quattro le zampe sono ben piantate a terra.'
            },
            {
              titolo: '3. Integrazione con il "Target Mano" (Fase Proattiva)',
              testo: 'Per evitare che il cane si senta frustrato o confuso dal "vuoto" creato dalla mossa ninja, il protocollo suggerisce di offrire un\'alternativa valida: invece di aspettare che il cane salti, si abbassa il palmo della mano verso il basso chiedendo il "Target Mano". Il cane viene addestrato a toccare la mano con il tartufo (il "pulsante magico"). Questo sposta il focus sensoriale verso il basso, rendendo fisicamente impossibile l\'esecuzione del salto e trasformando l\'energia caotica in un esercizio di autocontrollo.'
            },
            {
              titolo: '4. Consigli Tecnici per l\'efficacia',
              testo: 'Neutralità Emotiva: Durante la mossa ninja, non bisogna urlare o sgridare il cane. Reagire con eccitazione positiva o negativa insegna al cane che per ottenere attenzione basta agitarsi. Coerenza Totale: Tutti i membri della famiglia e gli ospiti devono applicare la tecnica. L\'intermittenza del permesso confonde il cane. Uso del fianco: Quando il cane si avvicina, accoglierlo dando il fianco anziché restare frontali, offrendo una superficie d\'appoggio nettamente più ridotta.'
            }
          ],
          conclusione: 'In sintesi, la Tecnica Ninja serve a togliere il premio fisico del salto, mentre il Target Mano fornisce al cane il nuovo libretto di istruzioni su come ottenere correttamente il saluto desiderato.',
          ctaPrezzo: '30-40€'
        }
      },
      {
        id: 'l33',
        titolo: '33. Rinforzo Positivo delle 4 Zampe a Terra',
        gratis: false,
        durata: '7 min',
        descrizione: 'Costruisci un\'azione incompatibile premiando solo la stabilità sul pavimento.',
        contenuto: 'La via d\'apprendimento canino predilige la chiarezza dei comportamenti alternativi. Invece di limitarci a dire "non saltare", definiamo con esattezza cosa vogliamo che faccia: stare con quattro zampe poggiate a terra. Premiando in modo massiccio questa stabilità fisica, renderemo il salto non conveniente.',
        stepCompleti: [
          'Tieni pronti snack appetitosi vicino alla porta d\'ingresso all\'altezza dei polpacci.',
          'Conserva le doti di carezza calma esclusivamente quando le quattro zampe poggiano stabili sul pavimento.',
          'Abbassa la tua altezza piegando le ginocchia per salutare il cane direttamente al suo livello biologico.',
          'Interrompi istantaneamente l\'accoglienza se noti che solleva le zampe anteriori da terra.'
        ],
        consiglio: '💡 Flash Card #33: Quattro Zampe a Terra. Accarezza e premia solo la stabilità per cementare la condotta.'
      },
      {
        id: 'l34',
        titolo: '34. Il Target Mano',
        gratis: false,
        durata: '6 min',
        descrizione: 'Insegna il pulsante magico di tocco palmo-naso ad altezza petto del cane per convogliare l\'arousal.',
        contenuto: 'L\'energia del salto non può essere soppressa, ma deve essere incanalata positivamente. Insegnare il "Target Mano" significa educare il cane a premiare il palmo della tua mano teso verso il basso con l\'uso del suo tartufo (naso). Si trasforma un salto euforico in una precisione motoria ad altezza suolo.',
        stepCompleti: [
          'Offri il palmo della mano aperto e privo di cibo all\'altezza del naso del cane a circa 15 cm di distanza.',
          'Attendi che si avvicini ad annusare spontaneamente per curiosità fisica.',
          'Nell\'istante in cui il naso tocca la pelle di\' "Sì" e consegna il premio con la mano opposta.',
          'Allena questo target nei momenti di forte eccitazione per reindirizzare le spinte motorie verso il basso.'
        ],
        consiglio: '💡 Flash Card #34: Pulsante Magico. Toccare la mano col naso sostituisce la necessità fisica del salto.'
      },
      {
        id: 'l35',
        titolo: '35. Mettere il Salto sotto Segnale',
        gratis: false,
        durata: '7 min',
        descrizione: 'Sfrutta il principio di controllo verbale "Salta" e "Scendi" per ridurre l\'azione occasionale.',
        contenuto: 'Nel training cognitivo avanzato di ThinkDog, mettere un comportamento non richiesto sotto il controllo di un comando deliberato ("Salta" vs "Scendi" o "Terra") porta all\'estinzione dell\'azione d\'eccitazione occasionale. Il cane impara ad attuare l\'azione solo quando l\'autorizzazione uditiva è esplicita.',
        stepCompleti: [
          'Invita verbalmente il cane al salto battendo le mani sul petto ("Salta!") e premiandolo calorosamente sul posto.',
          'Pronuncia subito dopo "Scendi" o "A terra!" posizionando un bocconcino delizioso vicino al pavimento.',
          'Esigi l\'assenza di rincorsa motoria se non hai pronunciato la formula d\'avvio verbale.',
          'Fissa l\'alternanza per rendere consapevole uno schema motorio precedentemente impulsivo.'
        ],
        consiglio: '💡 Flash Card #35: Controllo Razionale. Rendere cosciente l\'azione elimina la foga dell\'istinto spontaneo.'
      },
      {
        id: 'l36',
        titolo: '36. L\'Esercizio della "Semina" (Comando Calma)',
        gratis: false,
        durata: '6 min',
        descrizione: 'Sposta il focus dal canale visivo dell\'altezza a quello olfattivo del terreno.',
        contenuto: 'Il cane eccitato opera prevalentemente attraverso la vista e l\'udito (i canali ad alta attivazione emotiva). L\'attivazione dell\'olfatto (annuso) stimola la respirazione profonda, riduce i battiti cardiaci e induce una chimica di calma interna. Sparget pezzi di cibo sul pavimento agisce come interruttore calmante.',
        stepCompleti: [
          'Tieni pronti piccoli pezzetti di formaggio o wurstel tagliati finemente vicino all\'ingresso.',
          'Apri la porta dicendo con tono basso e fermo "Calma" ed esegui una semina a pioggia di cibo sul suolo.',
          'Evita qualsiasi interazione visiva diretta mentre il cane è impegnato nella ricerca olfattiva attiva.',
          'Raggiungi il soggiorno in silenzio mentre il cane raccoglie i premi rinfrescando i suoi livelli di arousal.'
        ],
        consiglio: '💡 Flash Card #36: Olfatto vs Eccitazione. Cercare cibo a terra abbassa la frequenza cardiaca a tempo di record.'
      },
      {
        id: 'l37',
        titolo: '37. Gestione degli Ospiti al Citofono',
        gratis: false,
        durata: '7 min',
        descrizione: 'Insegna il resta strutturato e istruisci l\'ospite a negare lo sguardo fintanto che c\'è foga.',
        contenuto: 'Gli ospiti rappresentano spesso un elemento d\'eccitazione ingovernabile per il cucciolo. Gestire la soglia d\'ingresso significa ritualizzare le distanze: l\'ospite deve poter varcare la soglia ignorando del tutto il cane, finché quest\'ultimo non si stabilizza spontaneamente nel suo spazio sicuro.',
        stepCompleti: [
          'Chiedi al cane di sedersi o stare sdraiato sul suo tappetino sicuro prima di girare la chiave d\'ingresso.',
          'Istruisci preventivamente l\'ospite (anche telefonando prima della salita) di non guardare e non toccare il cane.',
          'Fornisci all\'ospite snack sani da far cadere a terra lateralmente solo quando il cane cammina a quattro zampe.',
          'Usa il cancelletto interno se l\'eccitazione del cucciolo è momentaneamente ingestibile.'
        ],
        consiglio: '💡 Flash Card #37: Accoglienza Ordinata. L\'ingresso della risorsa (l\'ospite) non deve generare caos motorio.'
      },
      {
        id: 'l38',
        titolo: '38. Salto e Scendi',
        gratis: false,
        durata: '7 min',
        descrizione: 'Disinnesca il salto già compiuto offrendo un\'esplorazione d\'attrazione a terra.',
        contenuto: 'Se l\'ingresso si è svolto velocemente e il cane si trova già aggrappato alle tue gambe, lottare fisicamente provocherebbe eccitazione. Reindirizzare l\'azione con l\'esca del cibo indirizzato verso il pavimento consente di ricondurlo a quattro zampe in modo cooperativo, privo di rimproveri o irritazioni visibili.',
        stepCompleti: [
          'Mostra un bocconcino appetitoso vicino agli occhi del cane tenendo la mano chiusa.',
          'Abbassa lentamente la mano verso il pavimento tracciando una linea invisibile di discesa per il suo naso.',
          'Non appena si distende con tutte le zampe poggiate a terra, loda dicendo "Bravo scendi" e apri la mano.',
          'Allontana leggermente il corpo per non stimolare una nuova risalita motoria.'
        ],
        consiglio: '💡 Flash Card #38: Discesa Cooperativa. Nessuna spinta fisica: invoglia il baricentro a scendere col cibo.'
      },
      {
        id: 'l39',
        titolo: '39. Gestione dei Veicoli',
        gratis: false,
        durata: '8 min',
        descrizione: 'Disinnesca l\'eccitazione predatoria e i salti verso auto e ciclisti in movimento.',
        contenuto: 'Saltare contro le ruote delle auto, della bicicletta o del passeggino che sfreccia vicino è l\'espressione di un istinto predatorio fuori giri indotto da paura o forte ipereccitabilità. La gestione proattiva si attua anticipando il trigger e frapponendo il proprio corpo a barriera visiva di protezione.',
        stepCompleti: [
          'Prevedi il sopraggiungere del veicolo o del ciclista monitorando l\'attenzione dell\'animale a distanza.',
          'Spostati lateralmente fuori dalla traiettoria diretta dello stimolo in movimento.',
          'Funge da scudo frapponendo fisicamente il tuo corpo tra il cucciolo e la strada densamente trafficata.',
          'Chiedi il comando visivo di focus sul tuo volto ("Guardami!") offrendo snack saporiti mentre il veicolo passa.'
        ],
        consiglio: '💡 Flash Card #39: Scudo Umano. Proteggi la visione del cane e disinnesca l\'attivazione predatoria.'
      },
      {
        id: 'l40',
        titolo: '40. Coerenza Familiare',
        gratis: false,
        durata: '8 min',
        descrizione: 'Allinea tutti i membri della famiglia e gli ospiti per evitare l\'effetto rinforzo intermittente.',
        contenuto: 'L\'apprendimento del cane si inceppa irreparabilmente se le regole cambiano di giorno in giorno. Se anche un solo familiare accarezza il cane quando salta per gioco, l\'animale apprenderà il principio del "rinforzo intermittente" (come una slot machine): continuerà a saltare addosso a tutti, sperando che prima o poi l\'azione funzioni.',
        stepCompleti: [
          'Riunisci tutti i familiari per spiegare l\'importanza di ignorare il salto in modo sincronizzato e compatto.',
          'Insegna a tutti ad applicare il metodo "Anchor" e la mossa "Ninja" con identica precisione tecnica.',
          'Esercitati con simulazioni di rientro a casa fatte a turno per consolidare la calma della PWA.',
          'Fai capire agli ospiti che coccolare il cane agitato danneggia il suo percorso educativo.'
        ],
        consiglio: '💡 Flash Card #40: Sincronizzazione Regole. Un cane impara velocemente solo se la famiglia parla un\'unica lingua.'
      }
    ]
  },
  {
    id: 'abbaio',
    nome: 'Abbaio Eccessivo e Reattività',
    icona: '📢',
    eta: '3+ mesi',
    lezioni: [
      {
        id: 'l41',
        titolo: '41. Analisi del Diario dell\'Abbaio',
        gratis: false,
        durata: '7 min',
        descrizione: 'Mappa trigger, orari e durata per individuare la causa etologica della reattività.',
        contenuto: 'L\'abbaio è un sintomo e per curarlo dobbiamo individuarne l\'esatta origine. Un cane che abbaia per allerta territoriale richiede un intervento di rassicurazione, mentre un cane che abbaia per noia o richiesta richiede stimolazione mentale e gestione delle risorse domestiche. Compila un diario per 7 giorni per mappare la reattività.',
        stepCompleti: [
          'Annota sul taccuino l\'orario esatto in cui inizia l\'abbaio e lo stimolo scatenante (passi del vicino, citofono, passanti).',
          'Registra la durata espressa in minuti dell\'attivazione emotiva prima del ritorno alla calma naturale.',
          'Osserva la postura del corpo associata (es: pilorezione, coda fissa alta, oppure coda bassa agitata).',
          'Sfrutta questa mappa dei dati per pianificare le contromisure di de-escalation e desensibilizzazione.'
        ],
        consiglio: '💡 Flash Card #41: Mappatura Etologica. Registra i dati: conoscere l\'avversario ti permette di aiutare il cane.'
      },
      {
        id: 'l42',
        titolo: '42. Abbaio di Richiesta',
        gratis: false,
        durata: '7 min',
        descrizione: 'Smetti di rinforzare le pretese alimentari o ludiche riposizionando l\'attenzione.',
        contenuto: 'L\'abbaio finalizzato ad ottenere cibo, palline o carezze è molto insistente. Qualsiasi risposta da parte nostra—anche un secco "no!" o un sospiro indispettito—conferma al cane che abbaiare serve a scatenare la nostra interglazione. L\'unica cura è l\'estinzione sistematica del comportamento attraverso il vuoto sociale.',
        stepCompleti: [
          'Se il cane abbaia fissandoti mentre prepari il cibo, girati di spalle istantaneamente.',
          'Non parlare, non urlare e non guardarlo: diventa una statua inerte insensibile al suono.',
          'Premia la scelta spontanea di tacere anche solo per un istante pronunciando un flebile "bravo clemente" e offrendo cibo.',
          'Consolida una condotta in cui la pretesa genera il vuoto, mentre la calma e l\'attesa portano la risorsa.'
        ],
        consiglio: '💡 Flash Card #42: Estinzione Visiva. La tua attenzione è la sua benzina: se levi l\'attenzione, l\'abbaio si spegne.'
      },
      {
        id: 'l43',
        titolo: '43. Insegnamento del Comando "Silenzio"',
        gratis: false,
        durata: '6 min',
        descrizione: 'Insegna il comando d\'arresto vocale basato sulla cattura della calma momentanea.',
        contenuto: 'Catturare il comportamento consiste nel premiare lo stato spontaneo desiderato associandovi un comando preciso. Non potendo sgridare il cane che sta abbaiando (non capirebbe), aspetteremo che esaurisca spontaneamente il respiro per catturare quel secondo di silenzio inserendo il comando acustico e una prelibatezza.',
        stepCompleti: [
          'Attendi che il cane smetta di abbaiare a seguito d\'allerta territoriale del pianerottolo.',
          'Nell\'istante esatto di pausa silenziosa, mostra un premio ad altissimo valore dicendo "Silenzio" con tono sussurrato.',
          'Fornisci il bocconcino: masticare fisicamente inibisce la possibilità biomeccanica di abbaiare.',
          'Ripeti l\'associazione per addestrare l\'autocontrollo vocale su esplicita richiesta verbale.'
        ],
        consiglio: '💡 Flash Card #43: Cattura il Silenzio. Premia la bocca chiusa e allena il controllo emotivo.'
      },
      {
        id: 'l44',
        titolo: '44. Stimolazione Mentale e Masticazione',
        gratis: false,
        durata: '8 min',
        descrizione: 'Riduci l\'abbaio compulsivo da noia offrendo carichi cognitivi rinfrescanti.',
        contenuto: 'Moltissimi cani vocalizzano in appartamento semplicemente perché sono annoiati o hanno un accumulo di frustrazione psicofisica. Fornire giochi masticabili duri o tappetini di fiuto (Snuffle Mat) riduce drasticamente l\'arousal generale e consuma le energie residue in modo estremamente sano, calmante ed intelligente.',
        stepCompleti: [
          'Offri corna di cervo, radici d\'erica o tendini d\'animale essiccati per stimolare la masticazione.',
          'Nascondi razioni di crocchette all\'interno di un tappetino per costringere a intense sessioni olfattive di fiuto.',
          'Prepara giochi di problem solving in legno o plastica prima di uscire di casa per andare al lavoro.',
          'Assati un rilascio costante di endorfine calmanti per debellare l\'impulso di allerta territoriale.'
        ],
        consiglio: '💡 Flash Card #44: Stanchezza Cognitiva. Dieci minuti di fiuto profondo stancano il cane più di un\'ora di corsa.'
      },
      {
        id: 'l45',
        titolo: '45. Rumori Bianchi e Barriere Visive',
        gratis: false,
        durata: '8 min',
        descrizione: 'Applica l\'isolamento sensoriale protettivo per abbassare l\'arousal generale in casa.',
        contenuto: 'La reattività all\'abbaio domestico è spesso amplificata da input visivi ed acustici che tengono il cane in costante stato di difesa e vigilanza. Applicare barriere fisiche e mascherare i rumori esterni azzera l\'accumulo di stress, consentendo un riposo completo e rigenerante in camera o tana.',
        stepCompleti: [
          'Usa rumori bianchi generati da app o musica d\'organo classica a basso volume nei pressi della porta d\'ingresso.',
          'Applica pellicole oscuranti sabbiate sui vetri delle finestre basse per impedire la vista di passanti o macchine.',
          'Sposta la cuccia del cucciolo fuori dal canale di passaggio diretto d\'ingresso.',
          'Crea un ambiente ovattato per consentire il completo sonno e azzerare l\'ansia acustica territoriale.'
        ],
        consiglio: '💡 Flash Card #45: Protezione Sensoriale. Meno stimoli esterni riceve, meno reazioni vocali esprimerà.'
      }
    ]
  },
  {
    id: 'richiamo',
    nome: 'Richiamo Infallibile (Recallers)',
    icona: '🪃',
    eta: '3+ mesi',
    lezioni: [
      {
        id: 'l46',
        titolo: '46. La Regola della Chiamata Unica',
        gratis: false,
        durata: '10 min',
        descrizione: 'Chiama il cane una sola volta; se esita muoviti all\'indietro in modo invitante.',
        contenuto: 'Chiamare ripetutamente il cane ("Milo, Milo, vieni, vieni qui, vieni!") desensibilizza l\'udito a quel comando verbale. Il nome deve essere pronunciato una sola volta con allegria. Se il cane non risponde istantaneamente, non inseguirlo (lo scambierebbe per un gioco), ma inizia a correre via nella direzione opposta gridando.',
        stepCompleti: [
          'Pronuncia il segnale di richiamo ("Vieni!") una sola volta ad alto volume e tonalità calda.',
          'Se il cane si blocca a guardarti senza muoversi, gira sui tachi e parti di corsa all\'indietro.',
          'Allarga le braccia per favorire l\'accoglienza visiva al suolo.',
          'Premia l\'arrivo entusiasta del cucciolo con una festa pazzesca e cibo umido dal valore spaziale.'
        ],
        consiglio: '💡 Flash Card #46: Deposito di Fiducia. Risparmia le chiamate: ripetere il comando ne distrugge la credibilità.'
      },
      {
        id: 'l47',
        titolo: '47. Mai Punire al Ritorno',
        gratis: false,
        durata: '9 min',
        descrizione: 'Evita l\'associazione "Ritorno = Fine dei giochi o rimprovero" festeggiando sempre.',
        contenuto: 'Se sgridi il tuo cane perché ha impiegato 20 minuti a ritornare da te dopo essere scappato dietro a un piccione, lui associerà la tua rabbia all\'azione che sta compiendo in quell\'istante esatto: il ritorno. Il risultato sarà un cane che la prossima volta fuggirà ancora più lontano per timore d\'essere sgridato.',
        stepCompleti: [
          'Mantieni i nervi saldi e festeggia in modo eccezionale il rientro del cane, indipendentemente dal ritardo accumulato.',
          'Associa il ritorno a premi straordinari (paté di fegato, pezzetti di tacchino caldo o il suo gioco preferito).',
          'Evita di rimettere subito il guinzaglio per andartene a casa non appena ritorna da te.',
          'Insegna al cucciolo che tornare equivale a un decollo di puro entusiasmo fisico solidale.'
        ],
        consiglio: '💡 Flash Card #47: Festa Incondizionata. Tornare da te deve sempre essere l\'esperienza migliore della passeggiata.'
      },
      {
        id: 'l48',
        titolo: '48. Il Richiamo "Trattenuto"',
        gratis: false,
        durata: '8 min',
        descrizione: 'Usa l\'aiutante per trattenere fisicamente il cane raddoppiando l\'entusiasmo della rincorsa.',
        contenuto: 'La fisica dell\'attesa e della barriera aumenta la reattività emotiva del cane e il desiderio viscerale di raggiungerti veloci. Chiedendo a un familiare di trattenere il cucciolo mentre tu scappi via a nasconderti, creerai una meravigliosa foga cooperativa d\'inseguimento utile a rinsaldare i riflessi del comando.',
        stepCompleti: [
          'Fai tenere fermo il cucciolo per la pettorina da un amico o un familiare.',
          'Scappa correndo ridendo a gran voce in mezzo a un prato o dietro ad un albero.',
          'Pronuncia il segnale di richiamo ad alto volume: l\'aiutante rilascerà la presa istantaneamente.',
          'Accogli il cucciolo che sfreccia verso di te a quattro zampe premiandolo generosamente col gioco ricreativo.'
        ],
        consiglio: '💡 Flash Card #48: Trattenuta Motivazionale. La barriera del rilascio aumenta l\'energia e la velocità di ritorno.'
      },
      {
        id: 'l49',
        titolo: '49. Uso del Fischietto',
        gratis: false,
        durata: '8 min',
        descrizione: 'Associa il fischietto a premi di valore monumentale per tagliare i rumori ambientali.',
        contenuto: 'La voce umana trasmette inevitabilmente rabbia, panico, frustrazione e ansia, emozioni che allontanano il cane spaventato. Un fischietto professionale ad ultrasuoni o a toni fissi produce un suono neutro, non influenzabile dalle emozioni e udibile a chilometri di distanza anche in mezzo a vento e pioggia battente.',
        stepCompleti: [
          'Soffia nel fischietto in casa da distanze cortissime offrendo cibo dal valore monumentale (es. pollo lesso calda).',
          'Assisti alla creazione del condizionamento riflesso: fischio equivale a risorsa pazzesca.',
          'Allena il richiamo col fischietto all\'aperto in parchi spopolati facendolo fischiare solo una volta.',
          'Usa questo strumento per sbloccare il ritorno rapido in situazioni reali d\'emergenza.'
        ],
        consiglio: '💡 Flash Card #49: Fischio Salvavita. Strumento neutro e limpido: una chiamata che taglia qualsiasi rumore.'
      },
      {
        id: 'l50',
        titolo: '50. Generalizzazione in Ambienti Diversi',
        gratis: false,
        durata: '9 min',
        descrizione: 'Allena il richiamo stabile in contesti a difficoltà e distrazioni crescenti.',
        contenuto: 'L\'apprendimento del cane è strettamente contestuale: essere bravi a tornare in soggiorno non garantisce in alcun modo d\'essere affidabili all\'esterno di fronte a una cagna in calore o a un piccione al parco. Allena il richiamo generalizzando la risposta a contesti complessi e svariati in modo progressivo.',
        stepCompleti: [
          'Pratica il comando di richiamo in stanze diverse della casa prima di uscire in giardino.',
          'Allena il rientro nel box auto, poi nel vialetto privato, poi nel perimetro di un parchetto recintato spopolato.',
          'Aumenta i parametri inserendo stimoli reali (presenza d\'altri cani da lontano) protetto dalla tua lunghina.',
          'Premia con regolarità per sancire lo sblocco mentale e l\'affidabilità dei suoi riflessi.'
        ],
        consiglio: '💡 Flash Card #50: Generalizzazione. Allena e testa il richiamo in cento posti diversi prima di osare la libertà.'
      }
    ]
  },
  {
    id: 'paure',
    nome: 'Gestione Paure e Risorse',
    icona: '🛡️',
    eta: 'Tutte le età',
    lezioni: [
      {
        id: 'l51',
        titolo: '51. Look and Treat',
        gratis: false,
        durata: '8 min',
        descrizione: 'Riprogetta le associazioni emotive di fronte a biciclette, passanti o stimoli temuti.',
        contenuto: 'La reattività da paura nasce da un collegamento neuronale negativo nei confronti di uno stimolo ("vedo la bici = pericolo"). Con il metodo "Look and Treat", sfrutteremo la vista dello stimolo temuto (tenuto rigorosamente sotto la soglia d\'allarme) per innescare un\'associazione dopaminergica positiva proponendo bocconi succulenti.',
        stepCompleti: [
          'Posizionati a una distanza tale per cui il cane possa osservare il trigger (es: bicicletta) senza agitarsi o abbaiare.',
          'Non appena lo sguardo del cane incrocia lo stimolo, di\' "Sì" e consegna subito un premio delizioso.',
          'Ripeti l\'esercizio: la vista dello stimolo si trasforma nel segnale indicante che sta arrivando cibo.',
          'Riduci progressivamente e lentamente le distanze solo se noti rilassamento posturale globale.'
        ],
        consiglio: '💡 Flash Card #51: Look and Treat. Trasforma le ombre paurose in meravigliosi premonitori di risorse.'
      },
      {
        id: 'l52',
        titolo: '52. Gestione della Ciotola e Risorse',
        gratis: false,
        durata: '8 min',
        descrizione: 'Evita la difesa possessiva della ciotola dimostrando che la tua vicinanza aggiunge valore.',
        contenuto: 'La difesa delle risorse (cibo, giochi, divani) nasce dall\'ansia atavica di privazione. Sottrarre intenzionalmente la ciotola al cucciolo mentre mangia nel tentativo di insegnargli la sottomissione provocherà esclusivamente ringhi difensivi. Dobbiamo dimostrare che la nostra presenza non sottrae nulla, anzi arricchisce la ciotola.',
        stepCompleti: [
          'Non toccare, disturbare o fissare il cane mentre sta digerendo il suo pasto quotidiano.',
          'Se devi passare vicino alla ciotola, lancia lateralmente un pezzetto di wurstel squisito senza fermarti.',
          'Insegna il comando "Lascia" facendo scambi equi con giochi o cibo alternativo appetitoso.',
          'Evita ogni conflitto fisico: la fiducia si costruisce dimostrando che i suoi tesori sono inviolabili.'
        ],
        consiglio: '💡 Flash Card #52: Difesa Risorse. La tua vicinanza deve essere sinonimo di abbondanza, mai di furto.'
      },
      {
        id: 'l53',
        titolo: '53. Ringhio verso Sconosciuti',
        gratis: false,
        durata: '8 min',
        descrizione: 'Frapponi il tuo corpo come scudo protettivo visivo per allontanare la minaccia sociale.',
        contenuto: 'Quando il cane ringhia o abbaia contro un estraneo per strada, manifesta un intollerabile disagio sociale correlato ad un approccio troppo pressante. Se agisci come scudo frapponendoti fisicamente, dimostrerai al cane di essere una guida leader competente capace di gestire l\'incontro al suo posto, abbassandone i battiti cardiaci.',
        stepCompleti: [
          'Riconosci i segnali di allerta fisici del cucciolo (rigidità, Whale Eye, coda ad antenna).',
          'Spostati lateralmente ponendoti fisicamente tra il cane e l\'estraneo che si sta avvicinando.',
          'Chiedi gentilmente al passante di non guardare ed evitare di toccare il cucciolo spaventato.',
          'Allontanati con calma premiando il comportamento rilassato espresso durante la manovra.'
        ],
        consiglio: '💡 Flash Card #53: Scudo Leader. Gestisci lo spazio sociale per il tuo cane evitandogli di dover ringhiare.'
      },
      {
        id: 'l54',
        titolo: '54. Confidence Building e Nosework',
        gratis: false,
        durata: '9 min',
        descrizione: 'Usa la ricerca olfattiva per fortificare l\'autostima e risolvere le insicurezze del cucciolo.',
        contenuto: 'La fiducia in se stessi è fondamentale per lo sviluppo armonico del cucciolo. Il Nosework (ricerca olfattiva di cibo o oggetti) stimola il problem-solving autonomo e aumenta i livelli di dopamina. Risolvendo piccoli enigmi olfattivi, il cane riduce lo stress e impara a gestire in modo maturo le novità fisiche ambientali.',
        stepCompleti: [
          'Prepara scatole di cartone vuote ricolme d\'erba tagliata e piccoli premietti sparsi all\'interno.',
          'Attendi che il cane affronti ed annusi il misterioso cartone trovando le soluzioni da solo in totale autonomia.',
          'Aumenta gradualmente la complessità nascondendo i premi sotto bicchieri di plastica capovolti.',
          'Sfrutta queste vittorie cognitive per fortificare l\'autostima dei cuccioli geneticamente diffidenti o insicuri.'
        ],
        consiglio: '💡 Flash Card #54: Autostima Olfattiva. Trovare soluzioni col naso trasforma le paure del cane in puro coraggio.'
      },
      {
        id: 'l55',
        titolo: '55. Il Sandwich Emotivo',
        gratis: false,
        durata: '9 min',
        descrizione: 'Pianifica attività di decompressione e pulizia ematica prima e dopo eventi stressanti critici.',
        contenuto: 'Le visite cliniche o la spazzolatura complessa consumano le riserve di pazienza neurologica del cucciolo. Il "Sandwich Emotivo" è una formidabile tecnica di management etologico che racchiude l\'evento stressante all\'interno di due spesse fette di attività calme e appaganti di fiuto e masticazione prolungata.',
        stepCompleti: [
          'Prima dell\'evento (es: veterinario), fai una passeggiata naturalistica molto rilassata senza tirare.',
          'Durante l\'evento critico, usa esche saporite liquide (tubetto di paté o formaggio spalmabile canino).',
          'Dopo l\'evento, offri istantaneamente un Kong congelato o un osso naturale per sciacquare l\'adrenalina.',
          'Conserva il divieto assoluto di stimoli frenetici o corse d\'eccitazione motoria nelle ore successive.'
        ],
        consiglio: '💡 Flash Card #55: Sandwich Calma. Maschera lo stress avvolgendolo in fette d\'amore, masticazione ed annuso.'
      }
    ]
  }
];
