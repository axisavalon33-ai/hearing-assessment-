/* =====================================================================
   ALL ON-SCREEN TEXT FOR THE HEARING STATION
   ---------------------------------------------------------------------
   HOW TO EDIT
   - Each language has its own block below: en (English), si (Sinhala),
     ta (Tamil). The same "key" (the word before the colon) appears in
     every language.
   - Only change the text INSIDE the quotation marks "like this".
   - Do not delete the quotation marks, the colons, or the commas at the
     end of each line.
   - If your text needs a quotation mark inside it, use ' or “ ” instead.
   - {name} is replaced automatically with the condition's short name.
   - After saving, reload the page in Chrome to see the change.
   ===================================================================== */

window.TEXT = {

  /* ------------------------------------------------------------------ */
  en: {
    languageName: "English",
    exhibition: "MEDSCOPE II – Neurosurgery and Neuroscience",
    sectionTitle: "Hearing",
    chooseLanguage: "Choose language",
    homeIntro: "How well do you hear? Try a quick hearing check, or hear what the world sounds like with a hearing problem.",
    headphones: "Please put on the headphones",

    btnTest: "Test your hearing",
    btnTestSub: "A quick check with the hearWHO app",
    btnExperience: "Experience hearing loss",
    btnExperienceSub: "Hear speech the way people with hearing problems hear it",

    footer: "Simulation for education only – not a medical test.",
    home: "Home",
    back: "Back",

    ackTitle: "Before you start",
    ack1: "This is a screening simulation, not a medical diagnosis.",
    ack2: "For ages 16+.",
    ack3: "If you are worried about your hearing, see a doctor.",
    ackCheck: "I understand",
    continue: "Continue",
    ackAppNote: "The hearWHO app will open. When you finish, come back to this screen.",

    listTitle: "Experience hearing loss",
    listSub: "Choose a condition. Wear the headphones.",

    presbyName: "Age-related hearing loss (presbycusis)",
    presbyShort: "Age-related hearing loss",
    presbyCard: "Getting older",
    presbyText: "As we age, the tiny hair cells and nerve fibres for high-pitched sounds wear out first. Speech sounds muffled and people hear but can't make out words, especially in noisy places.",
    presbyTodo: "Get a hearing test if you often ask people to repeat themselves. Hearing aids help a lot.",

    noiseName: "Noise-induced hearing loss",
    noiseShort: "Noise-induced hearing loss",
    noiseCard: "Too much loud sound",
    noiseText: "Loud music, earphones at high volume, or machinery can permanently damage the hair cells and nerve in the inner ear. It sounds muffled and often comes with ringing.",
    noiseTodo: "Keep earphones below 60% volume, take breaks, and use ear protection around loud machines. This damage cannot be reversed, but it can be prevented.",

    tinnName: "Tinnitus",
    tinnShort: "Tinnitus",
    tinnCard: "Hearing sounds that aren't there",
    tinnText: "Tinnitus is hearing a sound that isn't really there – ringing, buzzing or hissing. It often comes with damage to the inner ear or hearing nerve.",
    tinnTodo: "If tinnitus is in one ear only, sudden, or pulses with your heartbeat, see a doctor.",

    neuroName: "Acoustic neuroma (vestibular schwannoma)",
    neuroShort: "Acoustic neuroma",
    neuroCard: "A growth on the hearing nerve",
    neuroText: "A non-cancerous tumour growing on the hearing and balance nerve. It slowly reduces hearing in one ear, often with ringing and sometimes dizziness. It can be treated with surgery or radiotherapy.",
    neuroTodo: "Hearing loss or ringing in only one ear should always be checked by a doctor.",

    play: "Play",
    stop: "Stop",
    playAgain: "Play again",
    labelNormal: "NORMAL HEARING",
    labelWith: "WITH {name}",
    labelReady: "Press Play to listen",
    pressPlayHint: "First 5 seconds: normal hearing. Then the same speech with the condition.",
    compareHint: "Tap to compare at any time:",
    toggleNormal: "Normal",
    whatToDo: "What to do",

    severity: "Severity",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",

    tinnSound: "Choose the sound",
    ring: "Ring",
    buzz: "Buzz",
    hiss: "Hiss",

    stage: "How far it has grown",
    early: "Early",
    late: "Late",
    leftEarOnly: "Affects the LEFT ear only",
    lrReminder: "Check the headphones: L on your left ear, R on your right ear.",
    lrTest: "Test left / right",
    lrLeft: "LEFT",
    lrRight: "RIGHT",

    dOuter: "Outer ear",
    dMiddle: "Middle ear",
    dInner: "Inner ear (cochlea)",
    dNerve: "Hearing nerve",
    dBrain: "Brain",
    dProblem: "Problem area",
    dTumour: "Tumour",

    audioLoading: "Loading sound…",
    audioMissing: "The speech recording was not found.",
    chooseFile: "Choose audio file",
    audioError: "This file could not be played. Please try an MP3 file.",
    changeAudio: "Change audio file",
    audioReady: "Audio ready"
  },

  /* ------------------------------------------------------------------ */
  si: {
    languageName: "සිංහල",
    exhibition: "MEDSCOPE II – ස්නායු ශල්‍යකර්ම සහ ස්නායු විද්‍යාව",
    sectionTitle: "ශ්‍රවණය",
    chooseLanguage: "භාෂාව තෝරන්න",
    homeIntro: "ඔබට කොතරම් හොඳින් ඇසෙනවාද? කෙටි ශ්‍රවණ පරීක්ෂාවක් කර බලන්න, නැතහොත් ශ්‍රවණ ගැටලුවක් ඇති විට ලෝකය ඇසෙන ආකාරය අත්විඳින්න.",
    headphones: "කරුණාකර හෙඩ්ෆෝන් පළඳින්න",

    btnTest: "ඔබේ ශ්‍රවණය පරීක්ෂා කරන්න",
    btnTestSub: "hearWHO යෙදුම සමඟ කෙටි පරීක්ෂාවක්",
    btnExperience: "ශ්‍රවණ හානිය අත්විඳින්න",
    btnExperienceSub: "ශ්‍රවණ ගැටලු ඇති අයට කතාව ඇසෙන ආකාරය අසන්න",

    footer: "අධ්‍යාපනය සඳහා පමණක් වූ අනුකරණයකි – වෛද්‍ය පරීක්ෂණයක් නොවේ.",
    home: "මුල් පිටුව",
    back: "ආපසු",

    ackTitle: "ආරම්භ කිරීමට පෙර",
    ack1: "මෙය පරීක්ෂණ අනුකරණයක් පමණි, වෛද්‍ය රෝග විනිශ්චයක් නොවේ.",
    ack2: "වයස අවුරුදු 16 සහ ඊට වැඩි අය සඳහා.",
    ack3: "ඔබේ ශ්‍රවණය ගැන කනස්සල්ලක් ඇත්නම්, වෛද්‍යවරයෙකු හමුවන්න.",
    ackCheck: "මම මෙය තේරුම් ගතිමි",
    continue: "ඉදිරියට",
    ackAppNote: "hearWHO යෙදුම විවෘත වේ. අවසන් වූ පසු, මෙම තිරයට නැවත පැමිණෙන්න.",

    listTitle: "ශ්‍රවණ හානිය අත්විඳින්න",
    listSub: "තත්ත්වයක් තෝරන්න. හෙඩ්ෆෝන් පළඳින්න.",

    presbyName: "වයස්ගත වීම නිසා ඇතිවන ශ්‍රවණ හානිය (ප්‍රෙස්බිකියුසිස්)",
    presbyShort: "වයස නිසා ශ්‍රවණ හානිය",
    presbyCard: "වයසට යාම",
    presbyText: "වයසට යත්ම, උස් හඬවල් (high-pitched sounds) ඇසීමට උදව් වන කුඩා රෝම සෛල සහ ස්නායු තන්තු මුලින්ම ගෙවී යයි. කතාව අපැහැදිලිව ඇසෙන අතර, විශේෂයෙන් ඝෝෂාකාරී ස්ථානවලදී, හඬ ඇසුණත් වචන තේරුම් ගැනීමට අපහසු වේ.",
    presbyTodo: "අනෙක් අයගෙන් නැවත කියන්නැයි ඔබ නිතර ඉල්ලන්නේ නම්, ශ්‍රවණ පරීක්ෂණයක් කරගන්න. ශ්‍රවණාධාරක (hearing aids) ඉතා උපකාරී වේ.",

    noiseName: "ඝෝෂාව නිසා ඇතිවන ශ්‍රවණ හානිය",
    noiseShort: "ඝෝෂාව නිසා ශ්‍රවණ හානිය",
    noiseCard: "අධික ශබ්දය",
    noiseText: "අධික හඬින් සංගීතය, ඉහළ ශබ්දයෙන් ඉයර්ෆෝන් භාවිතය, හෝ යන්ත්‍රවල ශබ්දය නිසා අභ්‍යන්තර කනේ රෝම සෛල සහ ස්නායුවට ස්ථිර හානි සිදු විය හැක. ශබ්ද අපැහැදිලිව ඇසෙන අතර, බොහෝ විට කනේ නාදයක් (ringing) ද ඇසේ.",
    noiseTodo: "ඉයර්ෆෝන් ශබ්දය 60%ට වඩා අඩුවෙන් තබා ගන්න, අතරින් පතර විවේක ගන්න, සහ ශබ්ද අධික යන්ත්‍ර අසල කන් ආරක්ෂක භාවිත කරන්න. මෙම හානිය නැවත සුව කළ නොහැකි නමුත්, එය වළක්වා ගත හැක.",

    tinnName: "ටිනිටස් (කනේ ශබ්ද ඇසීම)",
    tinnShort: "ටිනිටස්",
    tinnCard: "නැති ශබ්ද ඇසීම",
    tinnText: "ටිනිටස් යනු සැබවින්ම නොමැති ශබ්දයක් ඇසීමයි – නාදයක්, ගුමු ගුමු හඬක් හෝ ෂ් හඬක්. එය බොහෝ විට අභ්‍යන්තර කනට හෝ ශ්‍රවණ ස්නායුවට සිදුවන හානිය සමඟ ඇති වේ.",
    tinnTodo: "ටිනිටස් එක් කනක පමණක් ඇත්නම්, හදිසියේ ඇති වූයේ නම්, හෝ හෘද ස්පන්දනය සමඟ තාලයට ඇසේ නම්, වෛද්‍යවරයෙකු හමුවන්න.",

    neuroName: "ඇකූස්ටික් නියුරෝමාව (වෙස්ටිබියුලර් ෂ්වානෝමාව)",
    neuroShort: "ඇකූස්ටික් නියුරෝමාව",
    neuroCard: "ශ්‍රවණ ස්නායුවේ වර්ධනයක්",
    neuroText: "ශ්‍රවණ හා සමබරතා ස්නායුව මත වැඩෙන, පිළිකාවක් නොවන ගෙඩියකි. එය සෙමින් එක් කනක ශ්‍රවණය අඩු කරන අතර, බොහෝ විට කනේ නාදයක් සහ සමහර විට කරකැවිල්ල ද ඇති කරයි. ශල්‍යකර්මයෙන් හෝ විකිරණ ප්‍රතිකාර මඟින් එයට ප්‍රතිකාර කළ හැක.",
    neuroTodo: "එක් කනක පමණක් ශ්‍රවණ හානියක් හෝ නාදයක් ඇත්නම්, සැමවිටම වෛද්‍යවරයෙකු ලවා පරීක්ෂා කරවා ගන්න.",

    play: "වාදනය",
    stop: "නවත්වන්න",
    playAgain: "නැවත වාදනය",
    labelNormal: "සාමාන්‍ය ශ්‍රවණය",
    labelWith: "{name} සමඟ",
    labelReady: "සවන් දීමට වාදනය ඔබන්න",
    pressPlayHint: "මුල් තත්පර 5: සාමාන්‍ය ශ්‍රවණය. පසුව එම කතාවම මෙම තත්ත්වය සහිතව.",
    compareHint: "සසඳා බැලීමට ඕනෑම වේලාවක ඔබන්න:",
    toggleNormal: "සාමාන්‍ය",
    whatToDo: "කළ යුතු දේ",

    severity: "බරපතලකම",
    mild: "මෘදු",
    moderate: "මධ්‍යම",
    severe: "දැඩි",

    tinnSound: "ශබ්දය තෝරන්න",
    ring: "නාදය",
    buzz: "ගුමු හඬ",
    hiss: "ෂ් හඬ",

    stage: "ගෙඩිය වර්ධනය වී ඇති ප්‍රමාණය",
    early: "මුල් අවධිය",
    late: "පසු අවධිය",
    leftEarOnly: "බලපාන්නේ වම් කනට පමණි",
    lrReminder: "හෙඩ්ෆෝන් පරීක්ෂා කරන්න: L වම් කනට, R දකුණු කනට.",
    lrTest: "වම / දකුණ පරීක්ෂාව",
    lrLeft: "වම",
    lrRight: "දකුණ",

    dOuter: "පිටත කන",
    dMiddle: "මැද කන",
    dInner: "අභ්‍යන්තර කන (කොක්ලියාව)",
    dNerve: "ශ්‍රවණ ස්නායුව",
    dBrain: "මොළය",
    dProblem: "ගැටලුව ඇති ස්ථානය",
    dTumour: "ගෙඩිය",

    audioLoading: "ශබ්දය පූරණය වෙමින්…",
    audioMissing: "කතා පටිගත කිරීම හමු නොවීය.",
    chooseFile: "ශ්‍රව්‍ය ගොනුවක් තෝරන්න",
    audioError: "මෙම ගොනුව වාදනය කළ නොහැක. කරුණාකර MP3 ගොනුවක් උත්සාහ කරන්න.",
    changeAudio: "ශ්‍රව්‍ය ගොනුව වෙනස් කරන්න",
    audioReady: "ශබ්දය සූදානම්"
  },

  /* ------------------------------------------------------------------ */
  ta: {
    languageName: "தமிழ்",
    exhibition: "MEDSCOPE II – நரம்பியல் அறுவை சிகிச்சை மற்றும் நரம்பியல்",
    sectionTitle: "செவித்திறன்",
    chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    homeIntro: "உங்களுக்கு எவ்வளவு நன்றாகக் கேட்கிறது? ஒரு சிறிய செவித்திறன் சோதனையைச் செய்து பாருங்கள், அல்லது கேட்டல் பிரச்சினை இருக்கும்போது உலகம் எப்படிக் கேட்கும் என்பதை அனுபவியுங்கள்.",
    headphones: "தயவுசெய்து ஹெட்ஃபோன்களை அணியுங்கள்",

    btnTest: "உங்கள் செவித்திறனைச் சோதியுங்கள்",
    btnTestSub: "hearWHO செயலியுடன் ஒரு சிறிய சோதனை",
    btnExperience: "செவித்திறன் இழப்பை அனுபவியுங்கள்",
    btnExperienceSub: "கேட்டல் பிரச்சினை உள்ளவர்களுக்குப் பேச்சு எப்படிக் கேட்கிறது என்று கேளுங்கள்",

    footer: "கல்விக்கான பாவனை மட்டுமே – இது மருத்துவப் பரிசோதனை அல்ல.",
    home: "முகப்பு",
    back: "பின்செல்",

    ackTitle: "தொடங்குவதற்கு முன்",
    ack1: "இது ஒரு பரிசோதனைப் பாவனை மட்டுமே, மருத்துவ நோயறிதல் அல்ல.",
    ack2: "16 வயதும் அதற்கு மேற்பட்டவர்களுக்கும்.",
    ack3: "உங்கள் செவித்திறன் குறித்துக் கவலை இருந்தால், மருத்துவரை அணுகுங்கள்.",
    ackCheck: "நான் இதைப் புரிந்துகொண்டேன்",
    continue: "தொடரவும்",
    ackAppNote: "hearWHO செயலி திறக்கும். முடிந்ததும் இந்தத் திரைக்குத் திரும்பி வாருங்கள்.",

    listTitle: "செவித்திறன் இழப்பை அனுபவியுங்கள்",
    listSub: "ஒரு நிலையைத் தேர்ந்தெடுங்கள். ஹெட்ஃபோன்களை அணியுங்கள்.",

    presbyName: "வயது தொடர்பான செவித்திறன் இழப்பு (பிரெஸ்பைகியூசிஸ்)",
    presbyShort: "வயது தொடர்பான செவித்திறன் இழப்பு",
    presbyCard: "வயதாகுதல்",
    presbyText: "வயதாகும்போது, உயர் சுருதி ஒலிகளுக்கான சிறிய மயிர்க் கலங்களும் நரம்பு இழைகளும் முதலில் தேய்ந்துவிடுகின்றன. பேச்சு மங்கலாகக் கேட்கும்; குறிப்பாகச் சத்தமான இடங்களில், ஒலி கேட்டாலும் சொற்களைப் புரிந்துகொள்ள முடியாது.",
    presbyTodo: "மற்றவர்களை அடிக்கடி மீண்டும் சொல்லும்படி கேட்கிறீர்கள் என்றால், செவித்திறன் பரிசோதனை செய்துகொள்ளுங்கள். செவிப்புலன் கருவிகள் (hearing aids) பெரிதும் உதவும்.",

    noiseName: "சத்தத்தால் ஏற்படும் செவித்திறன் இழப்பு",
    noiseShort: "சத்தத்தால் ஏற்படும் செவித்திறன் இழப்பு",
    noiseCard: "அதிக சத்தம்",
    noiseText: "உரத்த இசை, அதிக ஒலியில் இயர்ஃபோன்கள், அல்லது இயந்திரங்களின் சத்தம் உள் காதிலுள்ள மயிர்க் கலங்களையும் நரம்பையும் நிரந்தரமாகச் சேதப்படுத்தலாம். ஒலிகள் மங்கலாகக் கேட்கும்; பெரும்பாலும் காதில் ரீங்கார ஒலியும் சேர்ந்து வரும்.",
    noiseTodo: "இயர்ஃபோன் ஒலியளவை 60%க்குக் கீழே வைத்திருங்கள், இடையிடையே ஓய்வு எடுங்கள், உரத்த இயந்திரங்களுக்கு அருகில் காது பாதுகாப்புச் சாதனங்களைப் பயன்படுத்துங்கள். இந்தச் சேதத்தைச் சரிசெய்ய முடியாது, ஆனால் தடுக்க முடியும்.",

    tinnName: "காதிரைச்சல் (டினிடஸ்)",
    tinnShort: "காதிரைச்சல்",
    tinnCard: "இல்லாத ஒலிகள் கேட்பது",
    tinnText: "காதிரைச்சல் என்பது உண்மையில் இல்லாத ஒரு ஒலியைக் கேட்பது – மணியொலி, ரீங்காரம் அல்லது ‘ஸ்ஸ்’ ஒலி. இது பெரும்பாலும் உள் காது அல்லது கேட்டல் நரம்பின் சேதத்துடன் சேர்ந்து வருகிறது.",
    tinnTodo: "காதிரைச்சல் ஒரு காதில் மட்டும் இருந்தால், திடீரென்று தோன்றினால், அல்லது இதயத் துடிப்புடன் சேர்ந்து துடித்தால், மருத்துவரை அணுகுங்கள்.",

    neuroName: "அக்கூஸ்டிக் நியூரோமா (வெஸ்டிபுலர் ஷ்வானோமா)",
    neuroShort: "அக்கூஸ்டிக் நியூரோமா",
    neuroCard: "கேட்டல் நரம்பில் ஒரு கட்டி",
    neuroText: "கேட்டல் மற்றும் சமநிலை நரம்பில் வளரும் புற்றுநோய் அல்லாத ஒரு கட்டி. இது ஒரு காதின் கேட்கும் திறனை மெதுவாகக் குறைக்கிறது; பெரும்பாலும் காதிரைச்சலும், சில வேளைகளில் தலைச்சுற்றலும் ஏற்படும். அறுவை சிகிச்சை அல்லது கதிர்வீச்சு சிகிச்சை மூலம் இதற்குச் சிகிச்சையளிக்கலாம்.",
    neuroTodo: "ஒரு காதில் மட்டும் கேட்டல் இழப்பு அல்லது ரீங்காரம் இருந்தால், எப்போதும் மருத்துவரிடம் பரிசோதித்துக்கொள்ள வேண்டும்.",

    play: "இயக்கு",
    stop: "நிறுத்து",
    playAgain: "மீண்டும் இயக்கு",
    labelNormal: "சாதாரண கேட்டல்",
    labelWith: "{name} உடன்",
    labelReady: "கேட்க ‘இயக்கு’ அழுத்துங்கள்",
    pressPlayHint: "முதல் 5 வினாடிகள்: சாதாரண கேட்டல். பின்னர் அதே பேச்சு இந்த நிலையுடன்.",
    compareHint: "ஒப்பிட்டுப் பார்க்க எந்நேரமும் அழுத்துங்கள்:",
    toggleNormal: "சாதாரணம்",
    whatToDo: "என்ன செய்ய வேண்டும்",

    severity: "தீவிரம்",
    mild: "லேசானது",
    moderate: "மிதமானது",
    severe: "கடுமையானது",

    tinnSound: "ஒலியைத் தேர்ந்தெடுங்கள்",
    ring: "மணியொலி",
    buzz: "ரீங்காரம்",
    hiss: "ஸ்ஸ் ஒலி",

    stage: "கட்டி எவ்வளவு வளர்ந்துள்ளது",
    early: "ஆரம்ப நிலை",
    late: "பிந்திய நிலை",
    leftEarOnly: "இடது காதை மட்டுமே பாதிக்கிறது",
    lrReminder: "ஹெட்ஃபோனைச் சரிபாருங்கள்: L இடது காதில், R வலது காதில்.",
    lrTest: "இடது / வலது சோதனை",
    lrLeft: "இடது",
    lrRight: "வலது",

    dOuter: "வெளிக் காது",
    dMiddle: "நடுக் காது",
    dInner: "உள் காது (கொக்ளியா)",
    dNerve: "கேட்டல் நரம்பு",
    dBrain: "மூளை",
    dProblem: "பிரச்சினை உள்ள இடம்",
    dTumour: "கட்டி",

    audioLoading: "ஒலி ஏற்றப்படுகிறது…",
    audioMissing: "பேச்சுப் பதிவு கிடைக்கவில்லை.",
    chooseFile: "ஒலிக் கோப்பைத் தேர்ந்தெடுங்கள்",
    audioError: "இந்தக் கோப்பை இயக்க முடியவில்லை. MP3 கோப்பை முயற்சிக்கவும்.",
    changeAudio: "ஒலிக் கோப்பை மாற்று",
    audioReady: "ஒலி தயார்"
  }
};
