// KrishiOS AI — Complete Multilingual & Indic Localization System
// Supports full digit conversion (0-9 -> ०-९, ૦-૯, etc.), clinical translations, and UI strings across 8 Indian languages.

export const LANGUAGES = [
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
];

export const DIGIT_MAPS = {
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  mr: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  gu: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  pa: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  ta: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯']
};

export function locNum(val, lang = 'hi') {
  if (val === undefined || val === null) return '';
  const str = String(val);
  const map = DIGIT_MAPS[lang];
  if (!map) return str;
  return str.replace(/[0-9]/g, d => map[Number(d)]);
}

export function normalizeIndicDigits(str) {
  if (!str) return str;
  const indicDigits = "०१२३४५६७८९૦૧૨૩૪૫૬૭૮૯০১২৩৪৫৬৭৮৯੦੧੨੩੪੫੬੭੮੯౦౧౨౩౪౫౬౭౮౯௦௧௨௩௪௫௬௭௮௯";
  const asciiDigits = "012345678901234567890123456789012345678901234567890123456789";
  let res = '';
  for (let ch of String(str)) {
    const idx = indicDigits.indexOf(ch);
    res += idx !== -1 ? asciiDigits[idx] : ch;
  }
  return res;
}

export const STAGE_TRANSLATIONS = {
  en: { initial: 'Initial Stage', intermediate: 'Intermediate Stage', advanced: 'Advanced Stage', healthy: 'Healthy' },
  hi: { initial: 'प्रारंभिक अवस्था', intermediate: 'मध्यम अवस्था', advanced: 'गंभीर अवस्था', healthy: 'स्वस्थ पत्ती' },
  gu: { initial: 'પ્રારંભિક તબક્કો', intermediate: 'મધ્યમ તબક્કો', advanced: 'ગંભીર તબક્કો', healthy: 'તંદુરસ્ત પાન' },
  mr: { initial: 'सुरुवातीचा टप्पा', intermediate: 'मध्यम टप्पा', advanced: 'गंभीर टप्पा', healthy: 'निरोगी पान' },
  bn: { initial: 'প্রাথমিক পর্যায়', intermediate: 'মধ্যবর্তী পর্যায়', advanced: 'মারাত্মক পর্যায়', healthy: 'সুস্থ পাতা' },
  pa: { initial: 'ਮੁੱਢਲਾ ਪੜਾਅ', intermediate: 'ਦਰਮਿਆਨਾ ਪੜਾਅ', advanced: 'ਗੰਭੀਰ ਪੜਾਅ', healthy: 'ਤੰਦਰੁਸਤ ਪੱਤਾ' },
  te: { initial: 'ప్రారంభ దశ', intermediate: 'మధ్యస్థ దశ', advanced: 'తీవ్ర దశ', healthy: 'ఆరోగ్యకరమైన ఆకు' },
  ta: { initial: 'தொடக்க நிலை', intermediate: 'இடைநிலை', advanced: 'தீவிர நிலை', healthy: 'ஆரோக்கியமான இலை' }
};

export function locStage(stage, lang = 'hi') {
  if (!stage) return '';
  const key = String(stage).toLowerCase().trim();
  const dict = STAGE_TRANSLATIONS[lang] || STAGE_TRANSLATIONS['hi'] || STAGE_TRANSLATIONS['en'];
  return dict[key] || stage;
}

export const RISK_TRANSLATIONS = {
  en: { low: 'Low Risk', moderate: 'Moderate Risk', high: 'High Risk', critical: 'Critical Risk', minimal: 'Minimal Risk' },
  hi: { low: 'कम जोखिम', moderate: 'मध्यम जोखिम', high: 'उच्च जोखिम', critical: 'अति-गंभीर जोखिम', minimal: 'न्यूनतम जोखिम' },
  gu: { low: 'ઓછું જોખમ', moderate: 'મધ્યમ જોખમ', high: 'વધુ જોખમ', critical: 'અતિ-ગંભીર જોખમ', minimal: 'નહિવત જોખમ' },
  mr: { low: 'कमी धोका', moderate: 'मध्यम धोका', high: 'उच्च धोका', critical: 'अति-गंभीर धोका', minimal: 'किमान धोका' },
  bn: { low: 'কম ঝুঁকি', moderate: 'মাঝারি ঝুঁকি', high: 'উচ্চ ঝুঁকি', critical: 'মারাত্মক ঝুঁকি', minimal: 'ন্যূনতম ঝুঁকি' },
  pa: { low: 'ਘੱਟ ਖ਼ਤਰਾ', moderate: 'ਦਰਮਿਆਨਾ ਖ਼ਤਰਾ', high: 'ਵੱਧ ਖ਼ਤਰਾ', critical: 'ਬਹੁਤ ਗੰਭੀਰ ਖ਼ਤਰਾ', minimal: 'ਘੱਟੋ-ਘੱਟ ਖ਼ਤਰਾ' },
  te: { low: 'తక్కువ ప్రమాదం', moderate: 'మధ్యస్థ ప్రమాదం', high: 'అధిక ప్రమాదం', critical: 'తీవ్రమైన ప్రమాదం', minimal: 'కనిష్ట ప్రమాదం' },
  ta: { low: 'குறைந்த ஆபத்து', moderate: 'மிதமான ஆபத்து', high: 'அதிக ஆபத்து', critical: 'மிக தீவிர ஆபத்து', minimal: 'குறைந்தபட்ச ஆபத்து' }
};

export function locRisk(risk, lang = 'hi') {
  if (!risk) return '';
  const raw = String(risk).toLowerCase().replace('risk', '').trim();
  const dict = RISK_TRANSLATIONS[lang] || RISK_TRANSLATIONS['hi'] || RISK_TRANSLATIONS['en'];
  return dict[raw] || risk;
}

export const DISEASE_TRANSLATIONS = {
  en: {
    'Tomato Early Blight': 'Tomato Early Blight',
    'Eggplant Leaf Spot': 'Eggplant Leaf Spot',
    'Tomato Fusarium Wilt': 'Tomato Fusarium Wilt',
    'Healthy Leaf': 'Healthy Leaf',
    'Fusarium Wilt (Fusarium oxysporum)': 'Tomato Fusarium Wilt',
    'Early Blight (Alternaria solani)': 'Tomato Early Blight',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'Tomato Leaf Miner'
  },
  hi: {
    'Tomato Early Blight': 'टमाटर अगेती झुलसा',
    'Eggplant Leaf Spot': 'बैंगन पत्ती धब्बा रोग',
    'Tomato Fusarium Wilt': 'टमाटर फ्यूजेरियम उकठा',
    'Healthy Leaf': 'स्वस्थ पत्ती (कोई रोग नहीं)',
    'Fusarium Wilt (Fusarium oxysporum)': 'टमाटर फ्यूजेरियम उकठा',
    'Early Blight (Alternaria solani)': 'टमाटर अगेती झुलसा',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'टमाटर पत्ती सुरंग कीट'
  },
  gu: {
    'Tomato Early Blight': 'ટામેટાનો અગેતરો ઝાળ',
    'Eggplant Leaf Spot': 'રીંગણ પાનના ટપકાંનો રોગ',
    'Tomato Fusarium Wilt': 'ટામેટાનો સુકારો (ફ્યુઝેરિયમ)',
    'Healthy Leaf': 'તંદુરસ્ત પાન (કોઈ રોગ નથી)',
    'Fusarium Wilt (Fusarium oxysporum)': 'ટામેટાનો સુકારો (ફ્યુઝેરિયમ)',
    'Early Blight (Alternaria solani)': 'ટામેટાનો અગેતરો ઝાળ',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'ટામેટા પાન કોરી ખાનાર ઈયળ'
  },
  mr: {
    'Tomato Early Blight': 'टोमॅटो करपा रोग',
    'Eggplant Leaf Spot': 'वांगी पानावरील ठिपके',
    'Tomato Fusarium Wilt': 'टोमॅटो मर रोग',
    'Healthy Leaf': 'निरोगी पान (रोगमुक्त)',
    'Fusarium Wilt (Fusarium oxysporum)': 'टोमॅटो मर रोग',
    'Early Blight (Alternaria solani)': 'टोमॅटो करपा रोग',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'टोमॅटो नागअळी (पर्णकिडा)'
  },
  bn: {
    'Tomato Early Blight': 'টমেটোর আগাম ধসা রোগ',
    'Eggplant Leaf Spot': 'বেগুনের পাতার দাগ রোগ',
    'Tomato Fusarium Wilt': 'টমেটোর উইল্ট (নেতিয়ে পড়া)',
    'Healthy Leaf': 'সুস্থ পাতা (রোগমুক্ত)',
    'Fusarium Wilt (Fusarium oxysporum)': 'টমেটোর উইল্ট (নেতিয়ে পড়া)',
    'Early Blight (Alternaria solani)': 'টমেটোর আগাম ধসা রোগ',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'টমেটো লিফ মাইনার পোকা'
  },
  pa: {
    'Tomato Early Blight': 'ਟਮਾਟਰ ਦਾ ਅਗੇਤਾ ਝੁਲਸਾ ਰੋਗ',
    'Eggplant Leaf Spot': 'ਬੈਂਗਣ ਦੇ ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ',
    'Tomato Fusarium Wilt': 'ਟਮਾਟਰ ਦਾ ਉਖੇੜਾ ਰੋਗ',
    'Healthy Leaf': 'ਤੰਦਰੁਸਤ ਪੱਤਾ (ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ)',
    'Fusarium Wilt (Fusarium oxysporum)': 'ਟਮਾਟਰ ਦਾ ਉਖੇੜਾ ਰੋਗ',
    'Early Blight (Alternaria solani)': 'ਟਮਾਟਰ ਦਾ ਅਗੇਤਾ ਝੁਲਸਾ ਰੋਗ',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'ਟਮਾਟਰ ਪੱਤਾ ਸੁਰੰਗੀ ਕੀੜਾ'
  },
  te: {
    'Tomato Early Blight': 'టొమాటో ఆకు మాడు తెగులు',
    'Eggplant Leaf Spot': 'వంకాయ ఆకు మచ్చ తెగులు',
    'Tomato Fusarium Wilt': 'టొమాటో ఎండు తెగులు',
    'Healthy Leaf': 'ఆరోగ్యకరమైన ఆకు',
    'Fusarium Wilt (Fusarium oxysporum)': 'టొమాటో ఎండు తెగులు',
    'Early Blight (Alternaria solani)': 'టొమాటో ఆకు మాడు తెగులు',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'టొమాటో ఆకు తొలుచు పురుగు'
  },
  ta: {
    'Tomato Early Blight': 'தக்காளி இலை கருகல் நோய்',
    'Eggplant Leaf Spot': 'கத்திரிக்காய் இலைப்புள்ளி நோய்',
    'Tomato Fusarium Wilt': 'தக்காளி வாடல் நோய்',
    'Healthy Leaf': 'ஆரோக்கியமான இலை',
    'Fusarium Wilt (Fusarium oxysporum)': 'தக்காளி வாடல் நோய்',
    'Early Blight (Alternaria solani)': 'தக்காளி இலை கருகல் நோய்',
    'Tomato Leaf Miner (Tuta absoluta / Liriomyza)': 'தக்காளி இலை சுரங்கப் புழு'
  }
};

export function locDisease(name, lang = 'hi') {
  if (!name) return '';
  const dict = DISEASE_TRANSLATIONS[lang] || (lang !== 'en' ? DISEASE_TRANSLATIONS['hi'] : DISEASE_TRANSLATIONS['en']);
  for (const [k, v] of Object.entries(dict)) {
    if (name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())) {
      return v;
    }
  }
  if (lang !== 'en' && DISEASE_TRANSLATIONS['hi']) {
    for (const [k, v] of Object.entries(DISEASE_TRANSLATIONS['hi'])) {
      if (name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())) {
        return v;
      }
    }
  }
  return name;
}

export const CROP_TRANSLATIONS = {
  en: { tomato: 'Tomato', eggplant: 'Eggplant (Brinjal)', wheat: 'Wheat' },
  hi: { tomato: 'टमाटर', eggplant: 'बैंगन', wheat: 'गेहूं' },
  gu: { tomato: 'ટામેટા', eggplant: 'રીંગણ', wheat: 'ઘઉં' },
  mr: { tomato: 'टोमॅटो', eggplant: 'वांगी', wheat: 'गहू' },
  bn: { tomato: 'টমেটো', eggplant: 'বেগুন', wheat: 'গম' },
  pa: { tomato: 'ਟਮਾਟਰ', eggplant: 'ਬੈਂਗਣ', wheat: 'ਕਣਕ' },
  te: { tomato: 'టొమాటో', eggplant: 'వంకాయ', wheat: 'గోధుమ' },
  ta: { tomato: 'தக்காளி', eggplant: 'கத்திரிக்காய்', wheat: 'கோதுமை' }
};

export function locCrop(crop, lang = 'hi') {
  if (!crop) return '';
  const c = String(crop).toLowerCase();
  const dict = CROP_TRANSLATIONS[lang] || (lang !== 'en' ? CROP_TRANSLATIONS['hi'] : CROP_TRANSLATIONS['en']);
  if (c.includes('eggplant') || c.includes('brinjal')) return dict.eggplant;
  if (c.includes('tomato')) return dict.tomato;
  if (c.includes('wheat')) return dict.wheat;
  return crop;
}

export const PATHOGEN_TRANSLATIONS = {
  hi: {
    'Alternaria solani': 'अल्टरनेरिया सोलानी (कवक)',
    'Cercospora melongenae': 'सर्कोस्पोरा मेलोन्जेने (कवक)',
    'Fusarium oxysporum': 'फ्यूजेरियम ऑक्सीस्पोरम (उकठा कवक)',
    'Fusarium oxysporum f.sp. lycopersici': 'फ्यूजेरियम ऑक्सीस्पोरम',
    'Solanum Mosaic Virus': 'सोलेनम मोजेक वायरस (विषाणु)',
    'Tuta absoluta / Liriomyza trifolii': 'लीफ माइनर (पत्ती सुरंग कीट)',
    'Sclerotinia sclerotiorum': 'स्क्लेरोटीनिया सफेद फफूंद'
  },
  gu: {
    'Alternaria solani': 'અલ્ટરનેરિયા સોલાની (ફૂગ)',
    'Cercospora melongenae': 'સર્કોસ્પોરા મેલોન્જેના (ફૂગ)',
    'Fusarium oxysporum': 'ફ્યુઝેરિયમ ઓક્સિસ્પોરમ (સુકારો ફૂગ)',
    'Fusarium oxysporum f.sp. lycopersici': 'ફ્યુઝેરિયમ ઓક્સિસ્પોરમ',
    'Solanum Mosaic Virus': 'સોલેનમ મોઝેક વાયરસ',
    'Tuta absoluta / Liriomyza trifolii': 'લીફ માઇનર (પાન કોરી ખાનાર)',
    'Sclerotinia sclerotiorum': 'સફેદ ફૂગ'
  },
  mr: {
    'Alternaria solani': 'अल्टरनेरिया सोलानी (बुरशी)',
    'Cercospora melongenae': 'सर्कोस्पोरा मेलोंगेने (बुरशी)',
    'Fusarium oxysporum': 'फ्युझेरियम ऑक्सिस्पोरम (मर बुरशी)',
    'Fusarium oxysporum f.sp. lycopersici': 'फ्युझेरियम ऑक्सिस्पोरम',
    'Solanum Mosaic Virus': 'सोलेनम मोझॅक व्हायरस',
    'Tuta absoluta / Liriomyza trifolii': 'नागअळी (पर्णकिडा)',
    'Sclerotinia sclerotiorum': 'पांढरी बुरशी'
  },
  bn: {
    'Alternaria solani': 'অল্টারনারিয়া সোলানি (ছত্রাক)',
    'Cercospora melongenae': 'সারকোস্পোরা মেলোনজিনা (ছত্রাক)',
    'Fusarium oxysporum': 'ফিউজারিয়াম অক্সিস্পোরাম (উইল্ট ছত্রাক)',
    'Fusarium oxysporum f.sp. lycopersici': 'ফিউজারিয়াম অক্সিস্পোরাম',
    'Solanum Mosaic Virus': 'সোলেইনাম মোজাইক ভাইরাস',
    'Tuta absoluta / Liriomyza trifolii': 'লিফ মাইনার পোকা',
    'Sclerotinia sclerotiorum': 'সাদা ছত্রাক'
  },
  pa: {
    'Alternaria solani': 'ਅਲਟਰਨੇਰੀਆ ਸੋਲਾਨੀ (ਉੱਲੀ)',
    'Cercospora melongenae': 'ਸਰਕੋਸਪੋਰਾ ਮੇਲੋਂਗੇਨਾ (ਉੱਲੀ)',
    'Fusarium oxysporum': 'ਫਿਊਜ਼ੇਰੀਅਮ ਆਕਸੀਸਪੋਰਮ (ਉਖੇੜਾ ਉੱਲੀ)',
    'Fusarium oxysporum f.sp. lycopersici': 'ਫਿਊਜ਼ੇਰੀਅਮ ਆਕਸੀਸਪੋਰਮ',
    'Solanum Mosaic Virus': 'ਸੋਲੈਨਮ ਮੋਜ਼ੇਕ ਵਾਇਰਸ',
    'Tuta absoluta / Liriomyza trifolii': 'ਲੀਫ਼ ਮਾਈਨਰ ਕੀੜਾ',
    'Sclerotinia sclerotiorum': 'ਚਿੱਟੀ ਉੱਲੀ'
  },
  te: {
    'Alternaria solani': 'ఆల్టర్నేరియా సొలాని (శిలీంధ్రం)',
    'Cercospora melongenae': 'సెర్కోస్పోరా మెలోన్జెనా (శిలీంధ్రం)',
    'Fusarium oxysporum': 'ఫ్యూసేరియం ఆక్సిస్పోరమ్ (ఎండు తెగులు)',
    'Fusarium oxysporum f.sp. lycopersici': 'ఫ్యూసేరియం ఆక్సిస్పోరమ్',
    'Solanum Mosaic Virus': 'మొజాయిక్ వైరస్',
    'Tuta absoluta / Liriomyza trifolii': 'ఆకు తొలుచు పురుగు',
    'Sclerotinia sclerotiorum': 'తెల్ల బూజు'
  },
  ta: {
    'Alternaria solani': 'ஆல்டர்னேரியா சோலானி (பூஞ்சை)',
    'Cercospora melongenae': 'செர்கோஸ்போரா மெலோங்கேனே (பூஞ்சை)',
    'Fusarium oxysporum': 'பியூசாரியம் ஆக்சிஸ்போரம் (வாடல் பூஞ்சை)',
    'Fusarium oxysporum f.sp. lycopersici': 'பியூசாரியம் ஆக்சிஸ்போரம்',
    'Solanum Mosaic Virus': 'மொசைக் வைரஸ்',
    'Tuta absoluta / Liriomyza trifolii': 'இலை சுரங்கப் புழு',
    'Sclerotinia sclerotiorum': 'வெள்ளை பூஞ்சை'
  }
};

export function locPathogen(pathogen, lang = 'hi') {
  if (!pathogen) return '';
  const dict = PATHOGEN_TRANSLATIONS[lang] || (lang !== 'en' ? PATHOGEN_TRANSLATIONS['hi'] : null);
  if (dict && dict[pathogen]) return dict[pathogen];
  for (const k in (dict || {})) {
    if (pathogen.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(pathogen.toLowerCase())) {
      return dict[k];
    }
  }
  if (lang !== 'en' && PATHOGEN_TRANSLATIONS['hi']) {
    for (const k in PATHOGEN_TRANSLATIONS['hi']) {
      if (pathogen.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(pathogen.toLowerCase())) {
        return PATHOGEN_TRANSLATIONS['hi'][k];
      }
    }
  }
  return pathogen;
}

export const LATIN_CROP_TRANSLATIONS = {
  hi: {
    'Solanum lycopersicum': 'सोलेनम लाइकोपर्सिकम (टमाटर)',
    'Solanum melongena': 'सोलेनम मेलोन्जेना (बैंगन)',
    'Triticum aestivum': 'ट्रिटिकम एस्टिवम (गेहूं)'
  },
  gu: {
    'Solanum lycopersicum': 'સોલેનમ લાઇકોપરસિકમ (ટામેટા)',
    'Solanum melongena': 'સોલેનમ મેલોન્જેના (રીંગણ)',
    'Triticum aestivum': 'ટ્રિટિકમ એસ્ટિવમ (ઘઉં)'
  },
  mr: {
    'Solanum lycopersicum': 'सोलेनम लायकोपर्सिकम (टोमॅटो)',
    'Solanum melongena': 'सोलेनम मेलोंगेना (वांगी)',
    'Triticum aestivum': 'ट्रिटिकम एस्टिव्हम (गहू)'
  },
  bn: {
    'Solanum lycopersicum': 'সোলাইনাম লাইকোপারসিকাম (টমেটো)',
    'Solanum melongena': 'সোলাইনাম মেলোনজিনা (বেগুন)',
    'Triticum aestivum': 'ট্রিটিকাম এসটিভাম (গম)'
  },
  pa: {
    'Solanum lycopersicum': 'ਸੋਲੇਨਮ ਲਾਈਕੋਪਰਸਿਕਮ (ਟਮਾਟਰ)',
    'Solanum melongena': 'ਸੋਲੇਨਮ ਮੇਲੋਂਗੇਨਾ (ਬੈਂਗਣ)',
    'Triticum aestivum': 'ਟ੍ਰਿਟਿਕਮ ਐਸਟੀਵਮ (ਕਣਕ)'
  },
  te: {
    'Solanum lycopersicum': 'సోలనం లైకోపెర్సికం (టొమాటో)',
    'Solanum melongena': 'సోలనం మెలోన్జెనా (వంకాయ)',
    'Triticum aestivum': 'ట్రిటికం ఈస్టివం (గోధుమ)'
  },
  ta: {
    'Solanum lycopersicum': 'சோலனம் லைகோபெர்சிகம் (தக்காளி)',
    'Solanum melongena': 'சோலனம் மெலோங்கேனா (கத்திரிக்காய்)',
    'Triticum aestivum': 'டிரிட்டிகம் ஏஸ்டிவம் (கோதுமை)'
  }
};

export function locLatin(latin, lang = 'hi') {
  if (!latin) return '';
  const dict = LATIN_CROP_TRANSLATIONS[lang] || (lang !== 'en' ? LATIN_CROP_TRANSLATIONS['hi'] : null);
  if (dict && dict[latin]) return dict[latin];
  if (lang !== 'en' && LATIN_CROP_TRANSLATIONS['hi'] && LATIN_CROP_TRANSLATIONS['hi'][latin]) {
    return LATIN_CROP_TRANSLATIONS['hi'][latin];
  }
  return latin;
}

export function locIntervention(win, lang = 'hi') {
  if (!win) return '';
  if (lang === 'hi') {
    if (win.includes('Quarantine')) return 'तत्काल प्रभावित पौधों को अलग करें';
    return locNum(win.replace(/Hours? Intervention Window/i, 'घंटे के भीतर उपचार आवश्यक'), 'hi');
  }
  if (lang === 'gu') {
    if (win.includes('Quarantine')) return 'તાત્કાલિક રોગગ્રસ્ત છોડ અલગ કરો';
    return locNum(win.replace(/Hours? Intervention Window/i, 'કલાકમાં નિયંત્રણ જરૂરી'), 'gu');
  }
  if (lang === 'mr') {
    if (win.includes('Quarantine')) return 'तात्काळ रोगट झाडे बाजूला करा';
    return locNum(win.replace(/Hours? Intervention Window/i, 'तासांत उपचार आवश्यक'), 'mr');
  }
  if (lang === 'bn') {
    if (win.includes('Quarantine')) return 'তাৎক্ষণিকভাবে আক্রান্ত গাছ আলাদা করুন';
    return locNum(win.replace(/Hours? Intervention Window/i, 'ঘণ্টার মধ্যে ব্যবস্থা নিন'), 'bn');
  }
  if (lang === 'pa') {
    if (win.includes('Quarantine')) return 'ਤੁਰੰਤ ਬਿਮਾਰ ਪੌਦੇ ਵੱਖ ਕਰੋ';
    return locNum(win.replace(/Hours? Intervention Window/i, 'ਘੰਟਿਆਂ ਅੰਦਰ ਇਲਾਜ ਜ਼ਰੂਰੀ'), 'pa');
  }
  if (lang === 'te') {
    if (win.includes('Quarantine')) return 'వెంటనే సోకిన మొక్కలను వేరు చేయండి';
    return locNum(win.replace(/Hours? Intervention Window/i, 'గంటల్లో నివారణ అవసరం'), 'te');
  }
  if (lang === 'ta') {
    if (win.includes('Quarantine')) return 'உடனடியாக பாதிக்கப்பட்ட செடிகளை பிரிக்கவும்';
    return locNum(win.replace(/Hours? Intervention Window/i, 'மணி நேரத்திற்குள் சிகிச்சை'), 'ta');
  }
  return win;
}

export function locDosage(dosage, lang = 'hi') {
  if (!dosage) return '';
  if (lang === 'hi') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'प्रति १५ लीटर नैपसैक स्प्रेयर पंप');
    s = s.replace(/g\b/i, ' ग्राम');
    return locNum(s, 'hi');
  }
  if (lang === 'gu') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'પ્રતિ ૧૫ લિટર સ્પ્રે પંપ');
    s = s.replace(/g\b/i, ' ગ્રામ');
    return locNum(s, 'gu');
  }
  if (lang === 'mr') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'प्रति १५ लिटर स्प्रे पंप');
    s = s.replace(/g\b/i, ' ग्रॅम');
    return locNum(s, 'mr');
  }
  if (lang === 'bn') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'প্রতি ১৫ লিটার স্প্রেয়ার পাম্প');
    s = s.replace(/g\b/i, ' গ্রাম');
    return locNum(s, 'bn');
  }
  if (lang === 'pa') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'ਪ੍ਰਤੀ ੧੫ ਲੀਟਰ ਸਪਰੇਅ ਪੰਪ');
    s = s.replace(/g\b/i, ' ਗ੍ਰਾਮ');
    return locNum(s, 'pa');
  }
  if (lang === 'te') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'ప్రతి ౧౫ లీటర్ల పంపుకు');
    s = s.replace(/g\b/i, ' గ్రాములు');
    return locNum(s, 'te');
  }
  if (lang === 'ta') {
    let s = dosage.replace(/per 15L Knapsack Sprayer Pump/i, 'ஒரு ௧௫ லிட்டர் தெளிப்பான் பம்பிற்கு');
    s = s.replace(/g\b/i, ' கிராம்');
    return locNum(s, 'ta');
  }
  return dosage;
}

export const PRESET_LOCALIZATIONS = {
  'sample-early-blight': {
    hi: {
      projection: 'उपचार न करने पर अगले ७ से १० दिनों में यह फफूंद आसपास की ३५% पत्तियों में फैलकर निचली कैनोपी को नष्ट कर सकती है।',
      organic: 'बेसिलस सबटिलिस या नीम का तेल (५ मिली/लीटर) का ५ दिन के अंतराल पर छिड़काव करें। संक्रमित पत्तियों को हटाकर नष्ट करें।',
      chemical: 'मैंकोजेब ७५% डब्ल्यूपी @ २.५ ग्राम प्रति लीटर पानी का घोल बनाकर पत्तियों पर दोनों तरफ समान रूप से छिड़काव करें।',
      tankDosage: '३७.५ ग्राम प्रति १५ लीटर स्प्रेयर पंप',
      preventive: [
        'टपक सिंचाई (ड्रिप) अपनाएं ताकि पत्तियों पर ३ घंटे से अधिक नमी न रहे',
        'पौधों के बीच ६० सेमी की दूरी रखें ताकि हवा का संचार बना रहे',
        'टमाटर कुल (सोलेनेसी) के अलावा अन्य फसलों के साथ ३ वर्षीय फसल चक्र अपनाएं'
      ]
    },
    gu: {
      projection: 'સારવાર ન કરવાથી આગામી ૭ થી ૧૦ દિવસમાં આ ફૂગ નજીકના પાંદડાઓમાં ૩૫% સુધી ફેલાઈને પાન ખેરવી શકે છે.',
      organic: 'બેસિલસ સબટિલિસ અથવા લીમડાનું તેલ (૫ મિલી/લિટર) ૫ દિવસના અંતરે છંટકાવ કરો. રોગગ્રસ્ત નીચેના પાંદડા કાપીને બાળી નાખો.',
      chemical: 'મેન્કોઝેબ ૭૫% WP @ ૨.૫ ગ્રામ પ્રતિ લિટર પાણીમાં ઓગાળીને પાંદડાની બંને બાજુ સમાન રીતે છંટકાવ કરવો.',
      tankDosage: '૩૭.૫ ગ્રામ પ્રતિ ૧૫ લિટર પંપ',
      preventive: [
        'ટપક પિયત પદ્ધતિ અપનાવો જેથી પાન પર ૩ કલાકથી વધુ ભેજ ન રહે',
        'છોડ વચ્ચે ૬૦ સેમીનું અંતર રાખો જેથી પવનની અવરજવર જળવાઈ રહે',
        '૩ વર્ષીય પાક ફેરબદલીનું પાલન કરવું'
      ]
    },
    mr: {
      projection: 'उपचार न केल्यास पुढील ७ ते १० दिवसांत बुरशी लगतच्या पानांवर ३५% पर्यंत पसरून पाने गळू शकतात.',
      organic: 'बॅसिलस सबटिलिस किंवा कडुनिंब तेल (५ मिली/लिटर) ५ दिवसांच्या अंतराने फवारावे. प्रादुर्भाव झालेली पाने काढून नष्ट करावीत.',
      chemical: 'मॅन्कोझेब ७५% डब्ल्यूपी @ २.५ ग्रॅम प्रति लिटर पाण्यात मिसळून पानांच्या दोन्ही बाजूंवर फवारावे.',
      tankDosage: '३७.५ ग्रॅम प्रति १५ लिटर स्प्रे पंप',
      preventive: [
        'ठिबक सिंचन पद्धत वापरा जेणेकरून पानांवर ३ तासांपेक्षा जास्त वेळ ओलावा राहणार नाही',
        'रोपांमध्ये ६० सेमी अंतर ठेवा',
        '३ वर्षांचे पीक फेरपालट चक्र अवलंबावे'
      ]
    }
  },
  'sample-eggplant-spot': {
    hi: {
      projection: 'रोग अभी प्रारंभिक अवस्था में है। उच्च आर्द्रता (>६५%) में अगले ७ दिनों में धब्बों की संख्या दोगुनी हो सकती है।',
      organic: 'ट्राइकोडर्मा विरिडी जैव-कवकनाशक @ ५ ग्राम/लीटर का शाम के समय पत्तियों पर छिड़काव करें।',
      chemical: 'कॉपर ऑक्सीक्लोराइड ५०% डब्ल्यूपी @ २.५ ग्राम प्रति लीटर पानी का छिड़काव करके कवक बीजाणुओं को रोकें।',
      tankDosage: '३५.० ग्राम प्रति १५ लीटर स्प्रेयर पंप',
      preventive: [
        'फसल कटाई के बाद गिरे हुए रोगग्रस्त अवशेषों को इकट्ठा करके नष्ट करें',
        'शाम के समय फव्वारा सिंचाई से बचें',
        'संतुलित नाइट्रोजन उर्वरक दें ताकि अत्यधिक कोमल वृद्धि न हो'
      ]
    },
    gu: {
      projection: 'રોગ હાલ પ્રારંભિક તબક્કામાં છે. વધુ ભેજ (>૬૫%) હોય તો આગામી ૭ દિવસમાં ટપકાં બમણા થઈ શકે છે.',
      organic: 'ટ્રાઇકોડર્મા વિરીડી @ ૫ ગ્રામ/લિટર સાંજના સમયે પાન પર છંટકાવ કરવો.',
      chemical: 'કોપર ઓક્સીક્લોરાઇડ ૫૦% WP @ ૨.૫ ગ્રામ પ્રતિ લિટર પાણીમાં મિક્સ કરી છંટકાવ કરવો.',
      tankDosage: '૩૫.૦ ગ્રામ પ્રતિ ૧૫ લિટર પંપ',
      preventive: [
        'રોગગ્રસ્ત પાંદડા અને કચરો ખેતરમાંથી દૂર કરી બાળી નાખવો',
        'સાંજના સમયે પાન ભીંજાય તેવો પિયત ટાળવો',
        'નાઇટ્રોજન ખાતરનો સંતુલિત ઉપયોગ કરવો'
      ]
    },
    mr: {
      projection: 'रोग सध्या प्राथमिक टप्प्यात आहे. जास्त आर्द्रतेमध्ये पुढील ७ दिवसांत ठिपके दुप्पट होऊ शकतात.',
      organic: 'ट्रायकोडर्मा व्हिरिडी @ ५ ग्रॅम/लिटर सायंकाळी पानांवर फवारावे.',
      chemical: 'कॉपर ऑक्सिक्लोराईડ ५०% डब्ल्यूपी @ २.५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारावे.',
      tankDosage: '३५.० ग्रॅम प्रति १५ लिटर स्प्रे पंप',
      preventive: [
        'रोगट पाने आणि अवशेष शेतातून काढून जाळून टाकावेत',
        'संध्याकाळच्या वेळी वरून पाणी देणे टाळावे',
        'नत्रयुक्त खतांचा संतुलित वापर करावा'
      ]
    }
  },
  'sample-fusarium-wilt': {
    hi: {
      projection: 'पौधे की संवहनी नलिकाओं में गंभीर रुकावट। तत्काल रोकथाम न करने पर अगले ३ से ५ दिनों में संपूर्ण पौधा सूख सकता है।',
      organic: 'सूडोमोनास फ्लोरेसेंस जैव-कवकनाशक (१० मिली/लीटर) से जड़ों के पास ड्रेंचिंग करें। अत्यधिक सूखे पौधों को उखाड़ कर नष्ट करें।',
      chemical: 'कार्बेन्डाजिम ५०% डब्ल्यूपी @ २.० ग्राम प्रति लीटर पानी का तने एवं जड़ों के पास ड्रेंचिंग (तर-बतर) करें।',
      tankDosage: '३०.० ग्राम प्रति १५ लीटर स्प्रेयर पंप',
      preventive: [
        'गर्मियों में गहरी जुताई करें और २५ माइक्रोन पॉलीथिन फिल्म से जमीन का सौरीकरण करें',
        'रोग-प्रतिरोधी किस्मों या ग्राफ्टेड पौधों का प्रयोग करें'
      ]
    },
    gu: {
      projection: 'છોડની રસવાહિનીઓમાં ગંભીર અવરોધ. તાત્કાલિક પગલાં ન લેવાય તો આગામી ૩ થી ૫ દિવસમાં છોડ સંપૂર્ણ સુકાઈ જશે.',
      organic: 'સ્યુડોમોનાસ ફ્લોરેસન્સ (૧૦ મિલી/લિટર) થી મૂળમાં ડ્રેન્ચિંગ કરો. સુકાઈ ગયેલા છોડને મૂળમાંથી ઉખેડી બાળી નાખો.',
      chemical: 'કાર્બેન્ડાઝીમ ૫૦% WP @ ૨.૦ ગ્રામ પ્રતિ લિટર પાણીમાં મૂળ પાસે જમીનમાં રેડવું (ડ્રેન્ચિંગ).',
      tankDosage: '૩૦.૦ ગ્રામ પ્રતિ ૧૫ લિટર પંપ',
      preventive: [
        'ઉનાળામાં ઊંડી ખેડ કરી ૨૫ માઇક્રોન પારદર્શક પ્લાસ્ટિકથી જમીન સોલારાઇઝ કરો',
        'રોગપ્રતિકારક જાતો અથવા કલમી રોપાઓ વાવો'
      ]
    },
    mr: {
      projection: 'झाडाच्या रसवाहिन्यांमध्ये तीव्र अडथळा. त्वरित उपाययोजना न केल्यास पुढील ३ ते ५ दिवसांत झाड पूर्णपणे सुकू शकते.',
      organic: 'स्यूडोमोनास फ्लोरोसन्स (१० मिली/लिटर) मुळाशी टाकावे. रोगट झाडे उपटून नष्ट करावीत.',
      chemical: 'कार्बेन्डाझिम ५०% डब्ल्यूपी @ २.० ग्रॅम प्रति लिटर पाणी मुळाशी ओतावे.',
      tankDosage: '३०.० ग्रॅम प्रति १५ लिटर स्प्रे पंप',
      preventive: [
        'उन्हाळ्यात जमिनीची खोल नांगरणी करून प्लॅस्टिकच्या साहाय्याने सौर निर्जंतुकीकरण करावे',
        'रोगप्रतिकारक वाणांचा वापर करावा'
      ]
    }
  }
};

export function locPresetField(presetId, field, fallback, lang = 'hi') {
  if (PRESET_LOCALIZATIONS[presetId] && PRESET_LOCALIZATIONS[presetId][lang] && PRESET_LOCALIZATIONS[presetId][lang][field]) {
    return PRESET_LOCALIZATIONS[presetId][lang][field];
  }
  if (lang !== 'en' && PRESET_LOCALIZATIONS[presetId] && PRESET_LOCALIZATIONS[presetId]['hi'] && PRESET_LOCALIZATIONS[presetId]['hi'][field]) {
    return PRESET_LOCALIZATIONS[presetId]['hi'][field];
  }
  return fallback;
}

export const WEATHER_ALERT_TRANSLATIONS = {
  hi: {
    'Early Blight (Alternaria solani)': {
      reason: 'तापमान > २८°से और आर्द्रता > ७०% कवक बीजाणु अंकुरण के लिए अनुकूल है।',
      action: 'पत्तियों की बारीकी से जांच करें। शाम को मैंकोजेब या कॉपर फफूंदनाशक का छिड़काव करें।'
    },
    'Leaf Curl Virus (TYLCV)': {
      reason: 'गर्म और शुष्क मौसम सफेद मक्खी की सक्रियता को बढ़ाता है, जिससे वायरस फैलता है।',
      action: 'सफेद मक्खी नियंत्रण के लिए इमिडाक्लोप्रिड या थायमेथोक्सम का छिड़काव करें। पीले चिपचिपे ट्रैप लगाएं।'
    },
    'Downy Mildew / Fungal Diseases': {
      reason: 'अधिक वर्षा एवं उच्च आर्द्रता से फंगल संक्रमण का गंभीर खतरा उत्पन्न हो सकता है।',
      action: 'अति-महत्वपूर्ण: वर्षा से पूर्व सुरक्षात्मक फफूंदनाशक का छिड़काव करें। जल निकासी सुनिश्चित करें।'
    },
    'General Pest Activity': {
      reason: 'हल्का मौसम सामान्य कीटों (माहू, थ्रिप्स, लीफ माइनर) की वृद्धि के लिए अनुकूल है।',
      action: 'खेत के किनारों और पत्तियों की निचली सतह की जांच करें।'
    }
  },
  gu: {
    'Early Blight (Alternaria solani)': {
      reason: 'તાપમાન > ૨૮°સે અને ભેજ > ૭૦% ફૂગના ફેલાવા માટે અનુકૂળ છે.',
      action: 'પાંદડાની તપાસ કરો. સાંજે મેન્કોઝેબ અથવા કોપર ફૂગનાશકનો છંટકાવ કરવો.'
    },
    'Leaf Curl Virus (TYLCV)': {
      reason: 'ગરમ અને સૂકું વાતાવરણ સફેદ માખીનો ઉપદ્રવ વધારે છે જેથી વાયરસ ફેલાય છે.',
      action: 'સફેદ માખી નિયંત્રણ માટે ઇમિડાક્લોપ્રિડનો છંટકાવ કરો. પીળા સ્ટીકી ટ્રેપ લગાવો.'
    },
    'Downy Mildew / Fungal Diseases': {
      reason: 'વધુ વરસાદ અને ભેજથી ફૂગજન્ય રોગોનો ગંભીર ભય છે.',
      action: 'વરસાદ પહેલાં ફૂગનાશકનો છંટકાવ કરો. પાણીના નિકાલની વ્યવસ્થા કરો.'
    },
    'General Pest Activity': {
      reason: 'હળવું વાતાવરણ સામાન્ય જીવાતો માટે અનુકૂળ છે.',
      action: 'ખેતરના શેઢા અને પાંદડાની નીચે તપાસ કરો.'
    }
  }
};

export function locWeatherReason(reason, disease, lang = 'hi') {
  if (lang === 'en') return reason;
  const dict = WEATHER_ALERT_TRANSLATIONS[lang] || WEATHER_ALERT_TRANSLATIONS['hi'];
  for (const k in dict) {
    if (disease && disease.toLowerCase().includes(k.toLowerCase())) {
      return dict[k].reason;
    }
  }
  return locNum(reason, lang);
}

export function locWeatherAction(action, disease, lang = 'hi') {
  if (lang === 'en') return action;
  const dict = WEATHER_ALERT_TRANSLATIONS[lang] || WEATHER_ALERT_TRANSLATIONS['hi'];
  for (const k in dict) {
    if (disease && disease.toLowerCase().includes(k.toLowerCase())) {
      return dict[k].action;
    }
  }
  return locNum(action, lang);
}

export const QUICK_TOPICS_BY_LANG = {
  hi: [
    { title: 'अगेती झुलसा के लक्षण', prompt: 'टमाटर में अगेती झुलसा (अर्ली ब्लाइट) के लक्षण और उपचार क्या हैं?' },
    { title: 'ड्रिप सिंचाई का सही समय', prompt: 'टमाटर की फसल में ड्रिप सिंचाई का सबसे सही समय क्या है?' },
    { title: 'नीम तेल का छिड़काव', prompt: 'फंगल रोग से बचाव के लिए नीम तेल की सही खुराक क्या है?' },
    { title: 'उकठा रोग का समाधान', prompt: 'टमाटर के पौधों में उकठा (फ्यूजेरियम विल्ट) रोग का उपचार कैसे करें?' },
    { title: 'सफेद मक्खी पर नियंत्रण', prompt: 'सफेद मक्खी कीट से फसल को बचाने के जैविक उपाय बताएं?' },
    { title: 'एनपीके खाद का संतुलन', prompt: 'टमाटर में फल लगने की अवस्था में कौन सा एनपीके खाद देना चाहिए?' }
  ],
  gu: [
    { title: 'અગેતરો ઝાળ લક્ષણો', prompt: 'ટામેટામાં અગેતરા ઝાળના લક્ષણો અને સારવાર શું છે?' },
    { title: 'ટપક પિયત સમય', prompt: 'ટામેટાના પાકમાં ટપક પિયત આપવાનો શ્રેષ્ઠ સમય કયો છે?' },
    { title: 'લીમડાના તેલની માત્રા', prompt: 'ફૂગના નિયંત્રણ માટે લીમડાના તેલનું યોગ્ય પ્રમાણ કેટલું રાખવું?' },
    { title: 'સુકારો રોગ નિયંત્રણ', prompt: 'ટામેટામાં સુકારો (ફ્યુઝેરિયમ) રોગનો ઉપાય કેવી રીતે કરવો?' },
    { title: 'સફેદ માખી નિયંત્રણ', prompt: 'સફેદ માખીથી પાકને બચાવવા માટેના જૈવિક ઉપાયો જણાવો.' },
    { title: 'ખાતર વ્યવસ્થાપન', prompt: 'ટામેટામાં ફળ બેસવાના સમયે કયું ખાતર આપવું જોઈએ?' }
  ],
  mr: [
    { title: 'करपा रोगाची लक्षणे', prompt: 'टोमॅटोमधील करपा रोगाची लक्षणे आणि उपाय काय आहेत?' },
    { title: 'ठिबक सिंचनाची वेळ', prompt: 'टोमॅटो पिकासाठी ठिबक सिंचनाची योग्य वेळ कोणती?' },
    { title: 'कडुनिंब तेल प्रमाण', prompt: 'बुरशीजन्य रोगांवर कडुनिंब तेलाची योग्य मात्रा किती असावी?' },
    { title: 'मर रोगाचे नियंत्रण', prompt: 'टोमॅटोच्या झाडांमधील मर रोगावर उपाय कसा करावा?' },
    { title: 'पांढरी माशी नियंत्रण', prompt: 'पांढरी माशीपासून पिकाचे संरक्षण कसे करावे?' },
    { title: 'खत व्यवस्थापन', prompt: 'टोमॅटो फळधारणा अवस्थेत कोणती खते द्यावीत?' }
  ],
  bn: [
    { title: 'আগাম ধসা রোগ লক্ষণ', prompt: 'টমেটোতে আগাম ধসা রোগের লক্ষণ ও প্রতিকার কী?' },
    { title: 'ড্রিপ সেচের সময়', prompt: 'টমেটো ফসলে ড্রিপ সেচ দেওয়ার সেরা সময় কোনটি?' },
    { title: 'নিম তেলের মাত্রা', prompt: 'ছত্রাক দমনে নিম তেলের সঠিক মাত্রা কত?' },
    { title: 'উইল্ট রোগ প্রতিরোধ', prompt: 'টমেটো গাছে উইল্ট বা ঢলে পড়া রোগের চিকিৎসা কীভাবে করবেন?' },
    { title: 'সাদা মাছি দমন', prompt: 'সাদা মাছি নিয়ন্ত্রণের জৈব উপায় কী?' },
    { title: 'সার ব্যবস্থাপনা', prompt: 'টমেটোতে ফল ধরার সময় কোন সার দেওয়া উচিত?' }
  ],
  pa: [
    { title: 'ਅਗੇਤਾ ਝੁਲਸਾ ਲੱਛਣ', prompt: 'ਟਮਾਟਰ ਵਿੱਚ ਅਗੇਤੇ ਝੁਲਸੇ ਦੇ ਲੱਛਣ ਅਤੇ ਇਲਾਜ ਕੀ ਹਨ?' },
    { title: 'ਸਿੰਚਾਈ ਦਾ ਸਮਾਂ', prompt: 'ਟਮਾਟਰ ਦੀ ਫ਼ਸਲ ਲਈ ਤੁਪਕਾ ਸਿੰਚਾਈ ਦਾ ਸਹੀ ਸਮਾਂ ਕੀ ਹੈ?' },
    { title: 'ਨਿੰਮ ਤੇਲ ਦੀ ਖੁਰਾਕ', prompt: 'ਉੱਲੀ ਰੋਗਾਂ ਤੋਂ ਬਚਾਅ ਲਈ ਨਿੰਮ ਤੇਲ ਦੀ ਸਹੀ ਮਾਤਰਾ ਕਿੰਨੀ ਹੋਵੇ?' },
    { title: 'ਉਖੇੜਾ ਰੋਗ ਦਾ ਹੱਲ', prompt: 'ਟਮਾਟਰ ਵਿੱਚ ਉਖੇੜਾ ਰੋਗ ਦਾ ਇਲਾਜ ਕਿਵੇਂ ਕਰੀਏ?' },
    { title: 'ਚਿੱਟੀ ਮੱਖੀ ਦੀ ਰੋਕਥਾਮ', prompt: 'ਚਿੱਟੀ ਮੱਖੀ ਤੋਂ ਫ਼ਸਲ ਨੂੰ ਬਚਾਉਣ ਦੇ ਦੇਸੀ ਤਰੀਕੇ ਦੱਸੋ।' },
    { title: 'ਖਾਦ ਪ੍ਰਬੰਧਨ', prompt: 'ਫ਼ਲ ਲੱਗਣ ਸਮੇਂ ਕਿਹੜੀ ਖਾਦ ਪਾਉਣੀ ਚਾਹੀਦੀ ਹੈ?' }
  ],
  te: [
    { title: 'ఆకు మాడు తెగులు', prompt: 'టొమాటో ఆకు మాడు తెగులు లక్షణాలు మరియు నివారణ ఏమిటి?' },
    { title: 'బిందు సేద్యం సమయం', prompt: 'టొమాటో పంటకు బిందు సేద్యం చేయడానికి సరైన సమయం ఏది?' },
    { title: 'వేప నూనె మోతాదు', prompt: 'శిలీంధ్రాల నివారణకు వేప నూనె సరైన మోతాదు ఎంత?' },
    { title: 'ఎండు తెగులు చికిత్స', prompt: 'టొమాటో ఎండు తెగులును ఎలా నియంత్రించాలి?' },
    { title: 'తెల్లదోమ నివారణ', prompt: 'తెల్లదోమ నియంత్రణకు సేంద్రీయ పద్ధతులు ఏమిటి?' },
    { title: 'ఎరువుల యాజమాన్యం', prompt: 'కాత దశలో టొమాటోకు ఏ ఎరువులు వాడాలి?' }
  ],
  ta: [
    { title: 'இலை கருகல் நோய்', prompt: 'தக்காளியில் இலை கருகல் நோயின் அறிகுறிகள் மற்றும் சிகிச்சை என்ன?' },
    { title: 'சொட்டு நீர் பாசனம்', prompt: 'தக்காளிக்கு சொட்டு நீர் பாசனம் செய்ய சிறந்த நேரம் எது?' },
    { title: 'வேப்ப எண்ணெய் அளவு', prompt: 'பூஞ்சை நோய்களுக்கு வேப்ப எண்ணெயின் சரியான அளவு என்ன?' },
    { title: 'வாடல் நோய் தடுப்பு', prompt: 'தக்காளி வாடல் நோயை எவ்வாறு கட்டுப்படுத்துவது?' },
    { title: 'வெள்ளை ஈ கட்டுப்பாடு', prompt: 'வெள்ளை ஈ தாக்கத்திலிருந்து பயிரை காக்கும் இயற்கை வழிகள் யாவை?' },
    { title: 'உர மேலாண்மை', prompt: 'காய் பிடிக்கும் தருணத்தில் என்ன உரம் இட வேண்டும்?' }
  ],
  en: [
    { title: 'Early Blight Symptoms', prompt: 'What are the symptoms and treatment for tomato early blight?' },
    { title: 'Drip Irrigation Timing', prompt: 'What is the best time for drip irrigation in tomato?' },
    { title: 'Neem Oil Dosage', prompt: 'What is the correct neem oil dosage for organic fungal control?' },
    { title: 'Fusarium Wilt', prompt: 'How to treat Fusarium wilt in tomato plants?' },
    { title: 'Whitefly Control', prompt: 'How to control whitefly (TYLCV vector) organically?' },
    { title: 'NPK Fertilizer', prompt: 'What NPK ratio is best for fruiting stage tomatoes?' }
  ]
};

export const UI_DICTIONARY = {
  hi: {
    brandTitle: 'कृषिOS AI',
    brandSubtitle: 'सटीक फसल रोग विज्ञान एवं प्रगति विश्लेषण प्रणाली',
    systemStatus: 'जीपीयू ऑनलाइन • मॉडल सक्रिय',
    tabScan: 'रोग स्कैनर',
    tabWeather: 'मौसम व स्प्रे',
    tabChat: 'कृषि मित्र AI',
    tabHistory: 'निदान रिकॉर्ड्स',
    tabProfile: 'किसान प्रोफाइल व खेत',
    selectTargetCrop: 'लक्षित फसल का चयन करें',
    crops: { tomato: 'टमाटर', eggplant: 'बैंगन', wheat: 'गेहूं' },
    telemetryTitle: 'पत्ता रोग परीक्षण केंद्र',
    telemetryDesc: 'पत्ते की फोटो से रोग का प्रकार, अवस्था और ७-१० दिन की प्रगति का सटीक वैज्ञानिक विश्लेषण प्राप्त करें।',
    uploadAreaTitle: 'पत्ते की फोटो यहाँ खींचें या अपलोड करें',
    uploadAreaSub: 'स्पष्ट फोटो चुनें (JPG, PNG या WEBP प्रारूप)',
    quickPresets: 'परीक्षण हेतु बेंचमार्क सैंपल',
    btnAnalyze: 'रोग का विश्लेषण करें',
    btnAnalyzing: 'एआई द्वारा घाव की स्कैनिंग जारी...',
    resultsHeader: 'रोग निदान एवं प्रगति रिपोर्ट',
    severityMetric: 'पत्ते पर संक्रमण का प्रतिशत',
    futureProjectionTitle: '७-१० दिन बाद रोग प्रगति का पूर्वानुमान',
    rxOrganicTitle: 'जैविक एवं प्राकृतिक उपचार',
    rxChemicalTitle: 'रासायनिक दवा व अनुशंसित खुराक',
    preventiveTitle: 'बचाव व रोकथाम के उपाय',
    weatherHeadline: 'छिड़काव अनुकूलता मौसम पूर्वानुमान',
    weatherAdvisoryTitle: 'दवा छिड़काव के लिए अनुकूल समय: सक्रिय',
    weatherAdvisoryBody: 'तापमान अनुकूल है और हवा की गति नियंत्रित है। अगले ८ घंटों में वर्षा की संभावना नहीं है।',
    tempLabel: 'तापमान',
    humidityLabel: 'आर्द्रता',
    windLabel: 'हवा की गति',
    dewLabel: 'ओस बिंदु',
    tempUnit: '°से',
    speedUnit: 'किमी/घंटा',
    percentUnit: '%',
    acresUnit: 'एकड़',
    chatPlaceholder: 'रोग, फफूंदनाशक या दवा की मात्रा के बारे में पूछें...',
    sendBtn: 'भेजें',
    historyTitle: 'किसान स्कैन इतिहास रिकॉर्ड',
    btnDownloadReport: 'दवा पर्ची (Rx Slip)',
    profileTitle: 'किसान प्रोफाइल एवं खेत प्रबंधन',
    profileDesc: 'खेत का रकबा, मिट्टी का प्रकार, सिंचाई व्यवस्था और समग्र फसल स्वास्थ्य स्कोर का प्रबंधन करें।',
    saveProfile: 'प्रोफाइल सुरक्षित करें',
    savedMsg: 'प्रोफाइल सफलतापूर्वक अपडेट हो गई!',
    
    // Auth Portal Strings
    welcomeTitle: 'कृषिOS AI में आपका स्वागत है',
    welcomeSub: 'भारतीय किसानों के लिए सटीक एआई फसल रोग निदान एवं कृषि सलाहकार मंच',
    signInTab: 'किसान लॉगिन',
    registerTab: 'नया किसान खाता बनाएं',
    fullNameLabel: 'किसान का पूरा नाम',
    fullNamePlaceholder: 'उदा. रमेश पटेल',
    identifierLabel: 'मोबाइल नंबर या जीमेल',
    identifierPlaceholder: 'उदा. ९८२५०१२३४५ या ramesh@gmail.com',
    passwordLabel: 'पासवर्ड',
    btnSignIn: 'खाते में लॉगिन करें',
    btnRegister: 'नया खाता पंजीकृत करें',
    btnDemo: '✨ डेमो खाता देखें (जांच हेतु)',
    logoutBtn: 'लॉगआउट',
    dbConnected: 'डेटाबेस से सक्रिय जुड़ा हुआ',
    emptyHistoryTitle: 'अभी तक कोई स्कैन रिकॉर्ड मौजूद नहीं है',
    emptyHistoryDesc: 'अपनी फसल की पहली जांच के लिए "रोग स्कैनर" टैब पर जाएं और पत्ते की फोटो अपलोड करें।',
    kpiHealth: 'खेत स्वास्थ्य स्कोर',
    kpiArea: 'कुल जोत रकबा',
    kpiScans: 'कुल संपन्न स्कैन',
    kpiAlerts: 'सक्रिय रोग चेतावनी',

    // Detailed Localization Keys
    subtagDL: 'डीप लर्निंग रोग गंभीरता विश्लेषण प्रणाली',
    spectralMatrix: 'स्पेक्ट्रल मैट्रिक्स',
    channelsLabel: 'चैनल्स',
    rgbChannels: 'आरजीबी',
    presetsLoaded: 'बेंचमार्क सैंपल उपलब्ध',
    severityUnit: 'संक्रमण',
    aiConfidence: 'एआई सटीकता',
    lesionRegions: 'घाव क्षेत्र',
    pathogenTaxonomyLabel: 'रोगजनक कवक / वर्गीकरण',
    cropHostLabel: 'लक्षित फसल',
    modelTomato: 'योलो v11 + पिक्सेल विश्लेषण',
    modelEggplant: 'मोबाइलनेटवी३-लार्ज',
    tankDosageLabel: 'स्प्रे पंप खुराक:',
    timelineTitle: 'अनुशंसित १४-दिवसीय दवा छिड़काव समय सारणी',
    day1Label: 'पहला दिन (१)',
    day1Desc: 'पत्तियों पर रासायनिक छिड़काव',
    day4Label: 'चौथा दिन (४)',
    day4Desc: 'जड़ों के पास वायु संचार व सफाई',
    day8Label: 'आठवां दिन (८)',
    day8Desc: 'नीम तेल जैविक सुरक्षा कवच',
    day14Label: 'चौदहवां दिन (१४)',
    day14Desc: 'फसल की पुनः स्कैनिंग व जांच',
    subtagWeather: 'मौसम विज्ञान एवं कृषि टेलीमेट्री',
    cityPlaceholder: 'शहर या जिले का नाम दर्ज करें (उदा. आणंद, सूरत, पुणे)...',
    btnGetAdvisory: 'मौसम सलाह प्राप्त करें',
    fetchingWeather: 'जानकारी प्राप्त हो रही है...',
    weatherAdvisoryCaution: 'छिड़काव समय: सावधानी अपेक्षित',
    optimalWindowLabel: 'सर्वोत्तम समय',
    diseaseRiskAlertsTitle: 'मौसम आधारित रोग प्रसार चेतावनी',
    irrigationRecommendationTitle: 'सिंचाई सलाह एवं प्रबंधन',
    irrigationNeeded: 'आज सिंचाई की आवश्यकता है',
    irrigationNotNeeded: 'आज सिंचाई की आवश्यकता नहीं है',
    bestTimeLabel: 'अनुकूल समय',
    emptyWeatherDesc: 'मौसम एवं छिड़काव सलाह देखने के लिए शहर का नाम दर्ज कर बटन दबाएं।',
    quickTopicsTitle: 'त्वरित कृषि प्रश्न',
    chatHeaderTitle: 'कृषि मित्र एआई सलाहकार',
    chatHeaderSubtitle: 'फास्टएपीआई एवं जेमिनी एलएलएम ऑनलाइन',
    liveIndicator: 'सक्रिय',
    chatSending: 'कृषि मित्र वैज्ञानिक सलाह तैयार कर रहा है...',
    subtagHistory: 'स्थायी टेलीमेट्री लॉग्स',
    connectedDbText: 'डेटाबेस से सक्रिय जुड़ा हुआ • किसान खाता:',
    signInRequired: 'लॉगिन आवश्यक है',
    btnExportJson: 'जेएसओएन डाउनलोड',
    btnExportCsv: 'सीएसवी डाउनलोड',
    justNow: 'अभी-अभी',
    farmerDefault: 'किसान',
    subtagProfile: 'कृषि जोत एवं भूमि टेलीमेट्री रजिस्टर',
    statusOptimal: 'उत्कृष्ट स्थिति',
    totalScansCompleted: 'कुल संपन्न जांच',
    statusNormal: 'सुरक्षित स्थिति',
    profileFormHeader: 'किसान एवं खेत प्रोफाइल सेटिंग्स',
    mobileLabel: 'मोबाइल / संपर्क सूत्र',
    stateLabel: 'राज्य',
    districtLabel: 'जिला',
    talukaLabel: 'तहसील / गांव',
    landHoldingLabel: 'कुल भूमि जोत (एकड़)',
    soilClassLabel: 'मृदा वर्गीकरण',
    irrigationSystemLabel: 'सिंचाई प्रणाली',
    registeredCropsLabel: 'पंजीकृत फसलें',
    acreageAllocationHeader: 'खेत में फसल रकबा आवंटन',
    soilHealthHeader: 'मृदा स्वास्थ्य स्थिति',
    soilHealthBody: 'मिट्टी में नमी २४% (अनुकूल)। जैविक कार्बन: ०.६८%। एनपीके अनुपात सोलेनेसी कुल की सब्जियों के लिए संतुलित है।',
    rxModalTitle: 'फसल रोग निदान एवं उपचार पर्ची',
    specimenIdLabel: 'नमूना संख्या',
    dateLabel: 'दिनांक',
    farmerOwnerLabel: 'किसान / खेत स्वामी',
    hostCropLabel: 'लक्षित फसल एवं रोग निदान',
    measuredSeverityLabel: 'संक्रमण की मापी गई गंभीरता',
    leafAreaAffected: 'पत्ती क्षेत्र प्रभावित',
    prescribedFormulationHeader: 'अनुशंसित उपचार दवा एवं खुराक',
    primaryChemicalSpray: 'प्राथमिक रासायनिक स्प्रे',
    secondaryBioShield: 'द्वितीयक जैविक सुरक्षा',
    foliarInoculant: 'पत्तियों का जैव-कवच',
    btnPrintRx: 'दवा पर्ची प्रिंट करें',
    btnClose: 'बंद करें',
    authenticating: 'प्रमाणीकरण जारी...',
    enterpriseFooter: 'कृषिOS AI • सटीक फसल विकृति विज्ञान निर्णय सहायता प्रणाली • पायटॉर्च UNet++ एवं YOLOv11 मल्टी-स्टेज आर्किटेक्चर'
  },
  gu: {
    brandTitle: 'કૃષિOS AI',
    brandSubtitle: 'ચોકસાઈ પાક રોગ નિદાન અને ગંભીરતા વિશ્લેષણ સિસ્ટમ',
    systemStatus: 'જીપીયુ ઓનલાઇન • મોડેલ સક્રિય',
    tabScan: 'રોગ સ્કેનર',
    tabWeather: 'હવામાન અને છંટકાવ',
    tabChat: 'કૃષિ મિત્ર AI',
    tabHistory: 'રેકોર્ડ્સ',
    tabProfile: 'ખેડૂત પ્રોફાઇલ અને ખેતર',
    selectTargetCrop: 'પાક પસંદ કરો',
    crops: { tomato: 'ટામેટા', eggplant: 'રીંગણ', wheat: 'ઘઉં' },
    telemetryTitle: 'પર્ણ રોગ પરીક્ષણ કેન્દ્ર',
    telemetryDesc: 'પાનના ફોટા પરથી રોગનો પ્રકાર, સ્થિતિ અને ૭-૧૦ દિવસના ફેલાવાનો સચોટ અંદાજ મેળવો.',
    uploadAreaTitle: 'પાનનો ફોટો અહીં અપલોડ કરો',
    uploadAreaSub: 'સ્પષ્ટ ફોટો પસંદ કરો (JPG, PNG અથવા WEBP)',
    quickPresets: 'પરીક્ષણ માટે નમૂના પાન',
    btnAnalyze: 'રોગનું વિશ્લેષણ કરો',
    btnAnalyzing: 'સ્કેનિંગ ચાલુ છે...',
    resultsHeader: 'રોગ નિદાન અને પ્રોગ્રેસ રિપોર્ટ',
    severityMetric: 'ચેપની ગંભીરતા (ટકાવારી)',
    futureProjectionTitle: '૭-૧૦ દિવસ પછી રોગ ફેલાવાનો અંદાજ',
    rxOrganicTitle: 'જૈવિક અને કુદરતી ઉપચાર',
    rxChemicalTitle: 'રાસાયણિક દવા અને પ્રમાણ',
    preventiveTitle: 'રોગ અટકાવવાના પગલાં',
    weatherHeadline: 'દવા છંટકાવ અનુકૂળતા હવામાન રિપોર્ટ',
    weatherAdvisoryTitle: 'દવા છાંટવા માટે ઉત્તમ સમય: સક્રિય',
    weatherAdvisoryBody: 'તાપમાન અનુકૂળ છે અને પવન શાંત છે. આગામી ૮ કલાક વરસાદની કોઈ શક્યતા નથી.',
    tempLabel: 'તાપમાન',
    humidityLabel: 'ભેજનું પ્રમાણ',
    windLabel: 'પવનની ગતિ',
    dewLabel: 'ઝાકળ બિંદુ',
    tempUnit: '°સે',
    speedUnit: 'કિમી/કલાક',
    percentUnit: '%',
    acresUnit: 'એકર',
    chatPlaceholder: 'રોગ કે દવાની માત્રા વિશે કંઈપણ પૂછો...',
    sendBtn: 'મોકલો',
    historyTitle: 'ખેડૂત સ્કેન ઇતિહાસ રેકોર્ડ',
    btnDownloadReport: 'દવા ચિઠ્ઠી (Rx Slip)',
    profileTitle: 'ખેડૂત પ્રોફાઇલ અને જમીન વિગતો',
    profileDesc: 'જમીનનું ક્ષેત્રફળ, માટીનો પ્રકાર, પિયત વ્યવસ્થા અને પાક સ્વાસ્થ્યનું સંચાલન કરો.',
    saveProfile: 'પ્રોફાઇલ સાચવો',
    savedMsg: 'પ્રોફાઇલ સફળતાપૂર્વક અપડેટ થઈ ગઈ!',
    
    // Auth Portal Strings
    welcomeTitle: 'કૃષિOS AI માં આપનું સ્વાગત છે',
    welcomeSub: 'ભારતીય ખેડૂતો માટે સચોટ પાક રોગ નિદાન અને કૃષિ માર્ગદર્શન મંચ',
    signInTab: 'ખેડૂત સાઇન ઇન',
    registerTab: 'નવું ખેડૂત ખાતું બનાવો',
    fullNameLabel: 'ખેડૂતનું પૂરું નામ',
    fullNamePlaceholder: 'દા.ત. રમેશ પટેલ',
    identifierLabel: 'મોબાઇલ નંબર અથવા જીમેલ',
    identifierPlaceholder: 'દા.ત. ૯૮૨૫૦૧૨૩૪૫ અથવા ramesh@gmail.com',
    passwordLabel: 'પાસવર્ડ',
    btnSignIn: 'ખાતામાં પ્રવેશ કરો',
    btnRegister: 'નવું ખાતું નોંધણી કરો',
    btnDemo: '✨ ડેમો ખાતું જુઓ (ચકાસણી માટે)',
    logoutBtn: 'લૉગ આઉટ',
    dbConnected: 'ડેટાબેઝ સાથે સક્રિય જોડાયેલ',
    emptyHistoryTitle: 'હજુ સુધી કોઈ સ્કેન રેકોર્ડ ઉપલબ્ધ નથી',
    emptyHistoryDesc: 'તમારા પાકની પ્રથમ તપાસ માટે "રોગ સ્કેનર" પર જાઓ અને પાનનો ફોટો અપલોડ કરો.',
    kpiHealth: 'ખેતર સ્વાસ્થ્ય સ્કોર',
    kpiArea: 'કુલ જમીન ક્ષેત્રફળ',
    kpiScans: 'કુલ સ્કેન કરેલ',
    kpiAlerts: 'સક્રિય રોગ ચેતવણી',

    subtagDL: 'ડીપ લર્નિંગ રોગ તીવ્રતા વિશ્લેષણ પ્રણાલી',
    spectralMatrix: 'સ્પેક્ટ્રલ મેટ્રિક્સ',
    channelsLabel: 'ચેનલ્સ',
    rgbChannels: 'આરજીબી',
    presetsLoaded: 'સેમ્પલ ઉપલબ્ધ',
    severityUnit: 'સંક્રમણ',
    aiConfidence: 'AI ચોકસાઈ',
    lesionRegions: 'અસરગ્રસ્ત વિસ્તાર',
    pathogenTaxonomyLabel: 'રોગકારક ફૂગ / વર્ગીકરણ',
    cropHostLabel: 'લક્ષિત પાક',
    modelTomato: 'YOLOv11 + પિક્સેલ વિશ્લેષણ',
    modelEggplant: 'મોબાઇલનેટ-વી૩',
    tankDosageLabel: 'પંપ માત્રા:',
    timelineTitle: '૧૪-દિવસીય દવા છંટકાવ સમયપત્રક',
    day1Label: 'દિવસ ૧',
    day1Desc: 'પાંદડા પર રાસાયણિક છંટકાવ',
    day4Label: 'દિવસ ૪',
    day4Desc: 'મૂળ પાસે હવા સંચાર અને સફાઈ',
    day8Label: 'દિવસ ૮',
    day8Desc: 'લીમડાના તેલનો જૈવિક છંટકાવ',
    day14Label: 'દિવસ ૧૪',
    day14Desc: 'પાકની પુનઃ ચકાસણી અને સ્કેનિંગ',
    subtagWeather: 'હવામાન વિજ્ઞાન અને કૃષિ ટેલિમેટ્રી',
    cityPlaceholder: 'શહેર અથવા જિલ્લાનું નામ દાખલ કરો (દા.ત. આણંદ, સુરત, પુણે)...',
    btnGetAdvisory: 'હવામાન સલાહ મેળવો',
    fetchingWeather: 'માહિતી મેળવી રહ્યું છે...',
    weatherAdvisoryCaution: 'છંટકાવ સમય: સાવચેતી જરૂરી',
    optimalWindowLabel: 'શ્રેષ્ઠ સમય',
    diseaseRiskAlertsTitle: 'હવામાન આધારિત રોગ ફેલાવાની ચેતવણી',
    irrigationRecommendationTitle: 'પિયત સલાહ અને વ્યવસ્થાપન',
    irrigationNeeded: 'આજે પિયતની જરૂર છે',
    irrigationNotNeeded: 'આજે પિયતની જરૂર નથી',
    bestTimeLabel: 'અનુકૂળ સમય',
    emptyWeatherDesc: 'હવામાન અને છંટકાવ સલાહ જોવા માટે શહેરનું નામ દાખલ કરો.',
    quickTopicsTitle: 'ઝડપી પ્રશ્નો',
    chatHeaderTitle: 'કૃષિ મિત્ર AI સલાહકાર',
    chatHeaderSubtitle: 'FastAPI અને Gemini AI સક્રિય',
    liveIndicator: 'સક્રિય',
    chatSending: 'કૃષિ મિત્ર વૈજ્ઞાનિક સલાહ તૈયાર કરી રહ્યું છે...',
    subtagHistory: 'સ્થાયી ટેલિમેટ્રી લોગ્સ',
    connectedDbText: 'ડેટાબેઝ સાથે જોડાયેલ • ખેડૂત ખાતું:',
    signInRequired: 'લૉગિન જરૂરી છે',
    btnExportJson: 'JSON ડાઉનલોડ',
    btnExportCsv: 'CSV ડાઉનલોડ',
    justNow: 'હમણાં જ',
    farmerDefault: 'ખેડૂત',
    subtagProfile: 'કૃષિ જમીન અને ટેલિમેટ્રી રજિસ્ટર',
    statusOptimal: 'ઉત્કૃષ્ટ સ્થિતિ',
    totalScansCompleted: 'કુલ સંપન્ન તપાસ',
    statusNormal: 'સામાન્ય સ્થિતિ',
    profileFormHeader: 'ખેડૂત અને ખેતર પ્રોફાઇલ સેટિંગ્સ',
    mobileLabel: 'મોબાઇલ / સંપર્ક',
    stateLabel: 'રાજ્ય',
    districtLabel: 'જિલ્લો',
    talukaLabel: 'તાલુકો / ગામ',
    landHoldingLabel: 'કુલ જમીન (એકર)',
    soilClassLabel: 'જમીનનો પ્રકાર',
    irrigationSystemLabel: 'પિયત પદ્ધતિ',
    registeredCropsLabel: 'નોંધાયેલ પાક',
    acreageAllocationHeader: 'ખેતરમાં પાક વિસ્તાર ફાળવણી',
    soilHealthHeader: 'જમીન સ્વાસ્થ્ય સ્થિતિ',
    soilHealthBody: 'જમીનમાં ભેજ ૨૪% (અનુકૂળ). જૈવિક કાર્બન: ૦.૬૮%. એનપીકે પ્રમાણ શાકભાજી માટે સંતુલિત છે.',
    rxModalTitle: 'પાક રોગ નિદાન અને દવા ચિઠ્ઠી',
    specimenIdLabel: 'નમૂના ક્રમાંક',
    dateLabel: 'તારીખ',
    farmerOwnerLabel: 'ખેડૂત / માલિક',
    hostCropLabel: 'પાક અને રોગ નિદાન',
    measuredSeverityLabel: 'રોગની માપેલી ગંભીરતા',
    leafAreaAffected: 'પાન વિસ્તાર અસરગ્રસ્ત',
    prescribedFormulationHeader: 'ભલામણ કરેલ દવા અને માત્રા',
    primaryChemicalSpray: 'પ્રાથમિક રાસાયણિક છંટકાવ',
    secondaryBioShield: 'દ્વિતીય જૈવિક સુરક્ષા',
    foliarInoculant: 'પાંદડાનું જૈવ-કવચ',
    btnPrintRx: 'દવા ચિઠ્ઠી પ્રિન્ટ કરો',
    btnClose: 'બંધ કરો',
    authenticating: 'પ્રમાણીકરણ ચાલુ છે...',
    enterpriseFooter: 'કૃષિOS AI • ચોક્કસ પાક રોગ વિજ્ઞાન નિર્ણય સહાયક પ્રણાલી • PyTorch UNet++ અને YOLOv11 આર્કિટેક્ચર'
  },
  mr: {
    brandTitle: 'कृषीOS AI',
    brandSubtitle: 'अचूक पीक रोग निदान व वाढ विश्लेषण प्रणाली',
    systemStatus: 'GPU ऑनलाइन • मॉडेल सक्रिय',
    tabScan: 'रोग स्कॅनर',
    tabWeather: 'हवामान व फवारणी',
    tabChat: 'कृषी मित्र AI',
    tabHistory: 'नोंदी',
    tabProfile: 'शेतकरी प्रोफाइल',
    selectTargetCrop: 'पीक निवडा',
    crops: { tomato: 'टोमॅटो', eggplant: 'वांगी', wheat: 'गहू' },
    telemetryTitle: 'पर्ण रोग परीक्षण केंद्र',
    telemetryDesc: 'पानाच्या फोटोवरून रोगाचा प्रकार, तीव्रता आणि ७-१० दिवसांचा अंदाज मिळवा.',
    uploadAreaTitle: 'पानाचा फोटो अपलोड करा',
    uploadAreaSub: 'स्पष्ट फोटो निवडा (JPG, PNG किंवा WEBP)',
    quickPresets: 'चाचणीसाठी नमुना पाने',
    btnAnalyze: 'रोगाचे विश्लेषण करा',
    btnAnalyzing: 'स्कॅनिंग सुरू आहे...',
    resultsHeader: 'रोग निदान व अहवाल',
    severityMetric: 'रोगाची तीव्रता (टक्केवारी)',
    futureProjectionTitle: '७-१० दिवसांचा अंदाज',
    rxOrganicTitle: 'जैविक व नैसर्गिक उपाय',
    rxChemicalTitle: 'रासायनिक औषध व प्रमाण',
    preventiveTitle: 'प्रतिबंधात्मक उपाय',
    weatherHeadline: 'फवारणी अनुकूलता हवामान अंदाज',
    weatherAdvisoryTitle: 'फवारणीसाठी अनुकूल वेळ: सक्रिय',
    weatherAdvisoryBody: 'हवामान अनुकूल आहे. पुढील ८ तास पाऊस नाही.',
    tempLabel: 'तापमान',
    humidityLabel: 'आर्द्रता',
    windLabel: 'वाऱ्याचा वेग',
    dewLabel: 'दव बिंदू',
    tempUnit: '°से',
    speedUnit: 'किमी/तास',
    percentUnit: '%',
    acresUnit: 'एकर',
    chatPlaceholder: 'रोगाबद्दल काहीही विचारा...',
    sendBtn: 'पाठवा',
    historyTitle: 'मागील स्कॅन नोंदी',
    btnDownloadReport: 'औषध चिठ्ठी',
    profileTitle: 'शेतकरी प्रोफाइल व शेत व्यवस्थापन',
    profileDesc: 'जमीन, मातीचा प्रकार, सिंचन आणि पीक आरोग्य व्यवस्थापित करा.',
    saveProfile: 'बदल जतन करा',
    savedMsg: 'माहिती अद्यतनित झाली!',
    welcomeTitle: 'कृषीOS AI मध्ये आपले स्वागत आहे',
    welcomeSub: 'शेतकऱ्यांसाठी अचूक पीक रोग निदान आणि कृषी सल्लागार व्यासपीठ',
    signInTab: 'शेतकरी लॉगिन',
    registerTab: 'नवीन शेतकरी खाते तयार करा',
    fullNameLabel: 'शेतकऱ्याचे पूर्ण नाव',
    fullNamePlaceholder: 'उदा. विठ્ठल पाटील',
    identifierLabel: 'मोबाईल क्रमांक किंवा ईमेल',
    identifierPlaceholder: 'उदा. ९८२५०१२३४५ किंवा farmer@gmail.com',
    passwordLabel: 'पासवर्ड',
    btnSignIn: 'खात्यात लॉगिन करा',
    btnRegister: 'नवीन खाते नोंदणी करा',
    btnDemo: '✨ डेमो खाते पहा',
    logoutBtn: 'लॉगआउट',
    dbConnected: 'डेटाबेस जोडलेला आहे',
    emptyHistoryTitle: 'अद्याप कोणत्याही स्कॅन नोंदी नाहीत',
    emptyHistoryDesc: 'आपल्या पिकाच्या पहिल्या तपासणीसाठी "रोग स्कॅनर" वर जा आणि पानाचा फोटो अपलोड करा.',
    kpiHealth: 'शेत आरोग्य स्कोअर',
    kpiArea: 'एकूण क्षेत्र',
    kpiScans: 'एकूण स्कॅन',
    kpiAlerts: 'सक्रिय रोग इशारे',
    subtagDL: 'डीप लर्निंग रोग तीव्रता विश्लेषण प्रणाली',
    spectralMatrix: 'स्पेक्ट्रल मॅट्रिक्स',
    channelsLabel: 'चॅनेल्स',
    rgbChannels: 'आरजीबी',
    presetsLoaded: 'नमुने उपलब्ध',
    severityUnit: 'संसर्ग',
    aiConfidence: 'AI अचूकता',
    lesionRegions: 'जखम क्षेत्र',
    pathogenTaxonomyLabel: 'रोगकारक बुरशी / वर्गीकरण',
    cropHostLabel: 'लक्षित पीक',
    modelTomato: 'YOLOv11 + पिक्सेल विश्लेषण',
    modelEggplant: 'मोबाइलनेट-v3',
    tankDosageLabel: 'स्प्रे पंप डोस:',
    timelineTitle: '१४-दिवसीय औषध फवारणी वेळापत्रक',
    day1Label: 'दिवस १',
    day1Desc: 'पानांवर रासायनिक फवारणी',
    day4Label: 'दिवस ४',
    day4Desc: 'मुळांजवळ हवा खेळती ठेवणे व स्वच्छता',
    day8Label: 'दिवस ८',
    day8Desc: 'कडुनिंब तेल जैविक सुरक्षा कवच',
    day14Label: 'दिवस १४',
    day14Desc: 'पिकाची पुनर्तपासणी व स्कॅनिंग',
    subtagWeather: 'हवामानशास्त्र व कृषी टेलिमेट्री',
    cityPlaceholder: 'शहर किंवा जिल्ह्याचे नाव टाका (उदा. पुणे, नाशिक)...',
    btnGetAdvisory: 'हवामान सल्ला मिळवा',
    fetchingWeather: 'माहिती मिळवत आहे...',
    weatherAdvisoryCaution: 'फवारणी कालावधी: खबरदारी बाळगा',
    optimalWindowLabel: 'उत्तम वेळ',
    diseaseRiskAlertsTitle: 'हवामान आधारित रोग चेतावणी',
    irrigationRecommendationTitle: 'सिंचन सल्ला आणि व्यवस्थापन',
    irrigationNeeded: 'आज पाणी देण्याची शिफारस',
    irrigationNotNeeded: 'आज पाणी देण्याची आवश्यकता नाही',
    bestTimeLabel: 'योग्य वेळ',
    emptyWeatherDesc: 'हवामान व फवारणी सल्ला पाहण्यासाठी शहराचे नाव टाका.',
    quickTopicsTitle: 'जलद कृषी प्रश्न',
    chatHeaderTitle: 'कृषी मित्र AI सल्लागार',
    chatHeaderSubtitle: 'FastAPI व Gemini AI ऑनलाइन',
    liveIndicator: 'सक्रिय',
    chatSending: 'कृषी मित्र कृषी सल्ला तयार करत आहे...',
    subtagHistory: 'कायमस्वरूपी टेलिमेट्री नोंदी',
    connectedDbText: 'डेटाबेसशी जोडलेले • शेतकरी खाते:',
    signInRequired: 'लॉगिन आवश्यक आहे',
    btnExportJson: 'JSON डाउनलोड',
    btnExportCsv: 'CSV डाउनलोड',
    justNow: 'आत्ताच',
    farmerDefault: 'शेतकरी',
    subtagProfile: 'जमीन व कृषी टेलिमेट्री नोंदणी',
    statusOptimal: 'उत्कृष्ट स्थिती',
    totalScansCompleted: 'एकूण तपासण्या',
    statusNormal: 'सामान्य स्थिती',
    profileFormHeader: 'शेतकरी आणि शेत प्रोफाइल सेटिंग्ज',
    mobileLabel: 'मोबाईल / संपर्क',
    stateLabel: 'राज्य',
    districtLabel: 'जिल्हा',
    talukaLabel: 'तालुका / गाव',
    landHoldingLabel: 'एकूण जमीन (एकर)',
    soilClassLabel: 'मातीचा प्रकार',
    irrigationSystemLabel: 'सिंचन पद्धत',
    registeredCropsLabel: 'नोंदणीकृत पिके',
    acreageAllocationHeader: 'शेतातील पीक क्षेत्र वाटप',
    soilHealthHeader: 'माती आरोग्य स्थिती',
    soilHealthBody: 'मातीतील ओलावा २४% (अनुकूल). सेंद्रिय कार्बन: ०.६८%. भाजीपाल्यासाठी एनपीके समतोल आहे.',
    rxModalTitle: 'पीक रोग निदान व औषध चिठ्ठी',
    specimenIdLabel: 'नमुना क्रमांक',
    dateLabel: 'दिनांक',
    farmerOwnerLabel: 'शेतकरी / मालक',
    hostCropLabel: 'पीक आणि रोग निदान',
    measuredSeverityLabel: 'मोजलेली रोग तीव्रता',
    leafAreaAffected: 'पानाचा भाग बाधित',
    prescribedFormulationHeader: 'शिफारस केलेले औषध व प्रमाण',
    primaryChemicalSpray: 'प्राथमिक रासायनिक फवारणी',
    secondaryBioShield: 'दुय्यम जैविक सुरक्षा',
    foliarInoculant: 'पानांचे जैव-कवच',
    btnPrintRx: 'औषध चिठ्ठी प्रिंट करा',
    btnClose: 'बंद करा',
    authenticating: 'प्रमाणीकरण सुरू आहे...',
    enterpriseFooter: 'कृषीOS AI • अचूक पीक विकृती विज्ञान निर्णय सहाय्य प्रणाली • PyTorch UNet++ व YOLOv11 आर्किटेक्चर'
  },
  bn: {
    brandTitle: 'কৃষিOS AI',
    brandSubtitle: 'নির্ভুল ফসল রোগ নির্ণয় ও বৃদ্ধি বিশ্লেষণ প্ল্যাটফর্ম',
    systemStatus: 'GPU অনলাইন • মডেল সক্রিয়',
    tabScan: 'রোগ স্ক্যানার',
    tabWeather: 'আবহাওয়া ও স্প্রে',
    tabChat: 'কৃষি মিত্র AI',
    tabHistory: 'রেকর্ড',
    tabProfile: 'কৃষক প্রোফাইল',
    selectTargetCrop: 'ফসল নির্বাচন করুন',
    crops: { tomato: 'টমেটো', eggplant: 'বেগুন', wheat: 'গম' },
    telemetryTitle: 'পাতা রোগ পরীক্ষা কেন্দ্র',
    telemetryDesc: 'পাতার ছবি থেকে রোগের ধরন, তীব্রতা এবং ৭-১০ দিনের বিস্তার পূর্বাভাস জানুন।',
    uploadAreaTitle: 'পাতার ছবি আপলোড করুন',
    uploadAreaSub: 'পরিষ্কার ছবি বেছে নিন (JPG, PNG বা WEBP)',
    quickPresets: 'নমুনা পাতা',
    btnAnalyze: 'রোগ বিশ্লেষণ করুন',
    btnAnalyzing: 'স্ক্যানিং চলছে...',
    resultsHeader: 'রোগ নির্ণয় রিপোর্ট',
    severityMetric: 'রোগের তীব্রতা',
    futureProjectionTitle: '৭-১০ দিনের পূর্বাভাস',
    rxOrganicTitle: 'জৈব প্রতিকার',
    rxChemicalTitle: 'রাসায়নিক ওষুধ ও মাত্রা',
    preventiveTitle: 'প্রতিরোধমূলক ব্যবস্থা',
    weatherHeadline: 'কীটনাশক স্প্রে আবহাওয়া বার্তা',
    weatherAdvisoryTitle: 'স্প্রে করার উপযুক্ত সময়: সক্রিয়',
    weatherAdvisoryBody: 'আগামী ৮ ঘণ্টা বৃষ্টি হবে না। স্প্রে করার ভালো সময়।',
    tempLabel: 'তাপমাত্রা',
    humidityLabel: 'আর্দ্রতা',
    windLabel: 'বাতাসের গতি',
    dewLabel: 'শিশিরাঙ্ক',
    tempUnit: '°সে',
    speedUnit: 'কিমি/ঘণ্টা',
    percentUnit: '%',
    acresUnit: 'একর',
    chatPlaceholder: 'রোগ সম্পর্কে জিজ্ঞাসা করুন...',
    sendBtn: 'পাঠান',
    historyTitle: 'পূর্ববর্তী স্ক্যান রেকর্ড',
    btnDownloadReport: 'প্রেসক্রিপশন স্লিপ',
    profileTitle: 'কৃষক প্রোফাইল ও খামার ব্যবস্থাপনা',
    profileDesc: 'জমি, মাটির ধরন, সেচ এবং ফসলের স্বাস্থ্য পরিচালনা করুন।',
    saveProfile: 'সংরক্ষণ করুন',
    savedMsg: 'তথ্য আপডেট হয়েছে!',
    welcomeTitle: 'কৃষিOS AI-তে স্বাগতম',
    welcomeSub: 'কৃষকদের জন্য নির্ভরযোগ্য ফসল রোগ নির্ণয় প্ল্যাটফর্ম',
    signInTab: 'কৃষক লগইন',
    registerTab: 'নতুন অ্যাকাউন্ট তৈরি',
    fullNameLabel: 'কৃষকের পূর্ণ নাম',
    fullNamePlaceholder: 'যেমন: শুভ্র দাস',
    identifierLabel: 'মোবাইল নম্বর বা ইমেইল',
    identifierPlaceholder: 'যেমন: ৯৮২৫০১২৩৪৫ বা farmer@gmail.com',
    passwordLabel: 'পাসওয়ার্ড',
    btnSignIn: 'লগইন করুন',
    btnRegister: 'নিবন্ধন করুন',
    btnDemo: '✨ ডেমো অ্যাকাউন্ট দেখুন',
    logoutBtn: 'লগআউট',
    dbConnected: 'ডাটাবেস যুক্ত হয়েছে',
    emptyHistoryTitle: 'এখনও কোনো স্ক্যান রেকর্ড নেই',
    emptyHistoryDesc: 'আপনার ফসলের প্রথম পরীক্ষার জন্য "রোগ স্ক্যানার"-এ যান এবং পাতার ছবি আপলোড করুন।',
    kpiHealth: 'খামার স্বাস্থ্য স্কোর',
    kpiArea: 'মোট জমি',
    kpiScans: 'মোট স্ক্যান',
    kpiAlerts: 'সক্রিয় রোগ সতর্কতা',
    subtagDL: 'ডিপ লার্নিং রোগ তীব্রতা বিশ্লেষণ পাইপলাইন',
    spectralMatrix: 'স্পেকট্রাল ম্যাট্রিক্স',
    channelsLabel: 'চ্যানেল',
    rgbChannels: 'আরজিবি',
    presetsLoaded: 'নমুনা উপলব্ধ',
    severityUnit: 'সংক্রমণ',
    aiConfidence: 'এআই নির্ভুলতা',
    lesionRegions: 'ক্ষত এলাকা',
    pathogenTaxonomyLabel: 'জীবাণু ছত্রাক / শ্রেণিবিন্যাস',
    cropHostLabel: 'নির্ধারিত ফসল',
    modelTomato: 'YOLOv11 + পিক্সেল বিশ্লেষণ',
    modelEggplant: 'মোবাইলনেট-ভি৩',
    tankDosageLabel: 'স্প্রে পাম্প ডোজ:',
    timelineTitle: '১৪ দিনের কীটনাশক স্প্রে সময়সূচী',
    day1Label: '১ম দিন',
    day1Desc: 'পাতায় রাসায়নিক স্প্রে',
    day4Label: '৪র্থ দিন',
    day4Desc: 'শিকড়ে বায়ু চলাচল ও পরিচ্ছন্নতা',
    day8Label: '৮ম দিন',
    day8Desc: 'নিম তেল জৈব সুরক্ষা স্প্রে',
    day14Label: '১৪তম দিন',
    day14Desc: 'ফসলের পুনর্নিরীক্ষণ ও স্ক্যান',
    subtagWeather: 'আবহাওয়া বিজ্ঞান ও কৃষি টেলিমেট্রি',
    cityPlaceholder: 'শহর বা জেলার নাম লিখুন...',
    btnGetAdvisory: 'পরামর্শ পান',
    fetchingWeather: 'লোড হচ্ছে...',
    weatherAdvisoryCaution: 'স্প্রে করার সময়: সতর্কতা প্রয়োজন',
    optimalWindowLabel: 'অনুকূল সময়',
    diseaseRiskAlertsTitle: 'আবহাওয়া ভিত্তিক রোগ বিস্তার সতর্কতা',
    irrigationRecommendationTitle: 'সেচ পরামর্শ ও ব্যবস্থাপনা',
    irrigationNeeded: 'আজ সেচ দেওয়ার পরামর্শ',
    irrigationNotNeeded: 'আজ সেচের প্রয়োজন নেই',
    bestTimeLabel: 'উপযুক্ত সময়',
    emptyWeatherDesc: 'আবহাওয়া ও স্প্রে পরামর্শ দেখতে শহরের নাম লিখুন।',
    quickTopicsTitle: 'দ্রুত কৃষি প্রশ্ন',
    chatHeaderTitle: 'কৃষি মিত্র এআই উপদেষ্টা',
    chatHeaderSubtitle: 'FastAPI এবং Gemini AI সক্রিয়',
    liveIndicator: 'সক্রিয়',
    chatSending: 'কৃষি মিত্র কৃষি পরামর্শ তৈরি করছে...',
    subtagHistory: 'টেলিমেট্রি রেকর্ড',
    connectedDbText: 'ডাটাবেস যুক্ত • কৃষক অ্যাকাউন্ট:',
    signInRequired: 'লগইন আবশ্যক',
    btnExportJson: 'JSON ডাউনলোড',
    btnExportCsv: 'CSV ডাউনলোড',
    justNow: 'এইমাত্র',
    farmerDefault: 'কৃষক',
    subtagProfile: 'জমি ও টেলিমেট্রি রেজিস্টার',
    statusOptimal: 'উৎকৃষ্ট অবস্থা',
    totalScansCompleted: 'মোট সম্পন্ন পরীক্ষা',
    statusNormal: 'স্বাভাবিক অবস্থা',
    profileFormHeader: 'কৃষক ও খামার প্রোফাইল সেটিংস',
    mobileLabel: 'মোবাইল / যোগাযোগ',
    stateLabel: 'রাজ্য',
    districtLabel: 'জেলা',
    talukaLabel: 'উপজেলা / গ্রাম',
    landHoldingLabel: 'মোট জমি (একর)',
    soilClassLabel: 'মাটির ধরন',
    irrigationSystemLabel: 'সেচ ব্যবস্থা',
    registeredCropsLabel: 'নিবন্ধিত ফসল',
    acreageAllocationHeader: 'জমিতে ফসল বরাদ্দ',
    soilHealthHeader: 'মাটির স্বাস্থ্য স্থিতি',
    soilHealthBody: 'মাটিতে আর্দ্রতা ২৪% (অনুকূল)। জৈব কার্বন: ০.৬৮%। শাকসবজির জন্য এনপিকে সুষম।',
    rxModalTitle: 'ফসল রোগ নির্ণয় ও প্রেসক্রিপশন স্লিপ',
    specimenIdLabel: 'নমুনা নম্বর',
    dateLabel: 'তারিখ',
    farmerOwnerLabel: 'কৃষক / খামার মালিক',
    hostCropLabel: 'ফসল ও রোগ নির্ণয়',
    measuredSeverityLabel: 'পরিমাপকৃত রোগের তীব্রতা',
    leafAreaAffected: 'পাতার এলাকা আক্রান্ত',
    prescribedFormulationHeader: 'প্রস্তাবিত ওষুধ ও মাত্রা',
    primaryChemicalSpray: 'প্রাথমিক রাসায়নিক স্প্রে',
    secondaryBioShield: 'দ্বিতীয় জৈব সুরক্ষা',
    foliarInoculant: 'পাতার জৈব-ঢাল',
    btnPrintRx: 'প্রেসক্রিপশন প্রিন্ট করুন',
    btnClose: 'বন্ধ করুন',
    authenticating: 'যাচাই করা হচ্ছে...',
    enterpriseFooter: 'কৃষিOS AI • সুনির্দিষ্ট ফসল রোগ বিজ্ঞান সিদ্ধান্ত সহায়তা প্ল্যাটফর্ম • PyTorch UNet++ এবং YOLOv11'
  },
  pa: {
    brandTitle: 'ਕ੍ਰਿਸ਼ੀOS AI',
    brandSubtitle: 'ਸ਼ੁੱਧ ਫ਼ਸਲ ਰੋਗ ਨਿਦਾਨ ਅਤੇ ਵਾਧਾ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਣਾਲੀ',
    systemStatus: 'GPU ਆਨਲਾਈਨ • ਮਾਡਲ ਸਰਗਰਮ',
    tabScan: 'ਰੋਗ ਸਕੈਨਰ',
    tabWeather: 'ਮੌਸਮ ਤੇ ਸਪਰੇਅ',
    tabChat: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ AI',
    tabHistory: 'ਰਿਕਾਰਡ',
    tabProfile: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
    selectTargetCrop: 'ਫ਼ਸਲ ਚੁਣੋ',
    crops: { tomato: 'ਟਮਾਟਰ', eggplant: 'ਬੈਂਗਣ', wheat: 'ਕਣਕ' },
    telemetryTitle: 'ਪੱਤਾ ਰੋਗ ਜਾਂਚ ਕੇਂਦਰ',
    telemetryDesc: 'ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਤੋਂ ਰੋਗ ਦੀ ਕਿਸਮ, ਸਥਿਤੀ ਅਤੇ ੭-੧੦ ਦਿਨਾਂ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ।',
    uploadAreaTitle: 'ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
    uploadAreaSub: 'ਸਾਫ਼ ਫ਼ੋਟੋ ਚੁਣੋ (JPG, PNG ਜਾਂ WEBP)',
    quickPresets: 'ਨਮੂਨਾ ਪੱਤੇ',
    btnAnalyze: 'ਰੋਗ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    btnAnalyzing: 'ਸਕੈਨਿੰਗ ਜਾਰੀ ਹੈ...',
    resultsHeader: 'ਰੋਗ ਨਿਦਾਨ ਰਿਪੋਰਟ',
    severityMetric: 'ਰੋਗ ਦੀ ਗੰਭੀਰਤਾ',
    futureProjectionTitle: '੭-੧੦ ਦਿਨਾਂ ਦਾ ਅਨੁਮਾਨ',
    rxOrganicTitle: 'ਜੈਵਿਕ ਇਲਾਜ',
    rxChemicalTitle: 'ਰਸਾਇਣਕ ਦਵਾਈ ਅਤੇ ਮਾਤਰਾ',
    preventiveTitle: 'ਰੋਕਥਾਮ ਦੇ ਉਪਾਅ',
    weatherHeadline: 'ਕੀਟਨਾਸ਼ਕ ਸਪਰੇਅ ਮੌਸਮ ਸਲਾਹ',
    weatherAdvisoryTitle: 'ਸਪਰੇਅ ਲਈ ਅਨੁਕੂਲ ਮੌਸਮ: ਸਕਿਰਿਆ',
    weatherAdvisoryBody: 'ਅਗਲੇ ੮ ਘੰਟੇ ਮੀਂਹ ਨਹੀਂ ਹੋਵੇਗਾ। ਸਪਰੇਅ ਲਈ ਚੰਗਾ ਸਮਾਂ ਹੈ।',
    tempLabel: 'ਤਾਪਮਾਨ',
    humidityLabel: 'ਨਮੀ',
    windLabel: 'ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ',
    dewLabel: 'ਤ੍ਰੇਲ ਬਿੰਦੂ',
    tempUnit: '°ਸੈ',
    speedUnit: 'ਕਿਮੀ/ਘੰਟਾ',
    percentUnit: '%',
    acresUnit: 'ਏਕੜ',
    chatPlaceholder: 'ਰੋਗ ਬਾਰੇ ਪੁੱਛੋ...',
    sendBtn: 'ਭੇਜੋ',
    historyTitle: 'ਪਿਛਲੇ ਸਕੈਨ ਰਿਕਾਰਡ',
    btnDownloadReport: 'ਦਵਾਈ ਪਰਚੀ',
    profileTitle: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ & ਖੇਤ ਪ੍ਰਬੰਧਨ',
    profileDesc: 'ਜ਼ਮੀਨ, ਮਿੱਟੀ ਦੀ ਕਿਸਮ, ਸਿੰਚਾਈ ਅਤੇ ਫ਼ਸਲ ਸਿਹਤ ਸੰਭਾਲੋ।',
    saveProfile: 'ਤਬਦੀਲੀਆਂ ਸੰਭਾਲੋ',
    savedMsg: 'ਜਾਣਕਾਰੀ ਅੱਪਡੇਟ ਹੋਈ!',
    welcomeTitle: 'ਕ੍ਰਿਸ਼ੀOS AI ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    welcomeSub: 'ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਸ਼ੁੱਧ ਫ਼ਸਲ ਰੋਗ ਨਿਦਾਨ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ ਪਲੇਟਫਾਰਮ',
    signInTab: 'ਕਿਸਾਨ ਲੌਗਇਨ',
    registerTab: 'ਨਵਾਂ ਕਿਸਾਨ ਖਾਤਾ ਬਣਾਓ',
    fullNameLabel: 'ਕਿਸਾਨ ਦਾ ਪੂਰਾ ਨਾਂ',
    fullNamePlaceholder: 'ਜਿਵੇਂ: ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ',
    identifierLabel: 'ਮੋਬਾਈਲ ਨੰਬਰ ਜਾਂ ਈਮੇਲ',
    identifierPlaceholder: 'ਜਿਵੇਂ: ੯੮੨੫੦੧੨੩੪੫ ਜਾਂ farmer@gmail.com',
    passwordLabel: 'ਪਾਸਵਰਡ',
    btnSignIn: 'ਖਾਤੇ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ',
    btnRegister: 'ਨਵਾਂ ਖਾਤਾ ਬਣਾਓ',
    btnDemo: '✨ ਡੈਮੋ ਖਾਤਾ ਵੇਖੋ',
    logoutBtn: 'ਲੌਗਆਊਟ',
    dbConnected: 'ਡਾਟਾਬੇਸ ਜੁੜਿਆ ਹੋਇਆ',
    emptyHistoryTitle: 'ਅਜੇ ਕੋਈ ਸਕੈਨ ਰਿਕਾਰਡ ਨਹੀਂ ਹੈ',
    emptyHistoryDesc: 'ਆਪਣੀ ਫ਼ਸਲ ਦੀ ਪਹਿਲੀ ਜਾਂਚ ਲਈ "ਰੋਗ ਸਕੈਨਰ" ਤੇ ਜਾਓ ਅਤੇ ਪੱਤੇ ਦੀ ਫ਼ੋਟੋ ਅੱਪਲੋਡ ਕਰੋ।',
    kpiHealth: 'ਖੇਤ ਸਿਹਤ ਸਕੋਰ',
    kpiArea: 'ਕੁੱਲ ਜ਼ਮੀਨ',
    kpiScans: 'ਕੁੱਲ ਸਕੈਨ',
    kpiAlerts: 'ਸਰਗਰਮ ਰੋਗ ਚੇਤਾਵਨੀਆਂ',
    subtagDL: 'ਡੀਪ ਲਰਨਿੰਗ ਰੋਗ ਗੰਭੀਰਤਾ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਣਾਲੀ',
    spectralMatrix: 'ਸਪੈਕਟ੍ਰਲ ਮੈਟ੍ਰਿਕਸ',
    channelsLabel: 'ਚੈਨਲ',
    rgbChannels: 'ਆਰਜੀਬੀ',
    presetsLoaded: 'ਨਮੂਨੇ ਉਪਲਬਧ',
    severityUnit: 'ਸੰਕਰਮਣ',
    aiConfidence: 'AI ਸ਼ੁੱਧਤਾ',
    lesionRegions: 'ਜ਼ਖਮੀ ਖੇਤਰ',
    pathogenTaxonomyLabel: 'ਰੋਗ ਕਾਰਕ / ਵਰਗੀਕਰਨ',
    cropHostLabel: 'ਲਕਸ਼ਿਤ ਫ਼ਸਲ',
    modelTomato: 'YOLOv11 + ਪਿਕਸਲ ਵਿਸ਼ਲੇਸ਼ਣ',
    modelEggplant: 'ਮੋਬਾਈਲਨੈੱਟ-ਵੀ੩',
    tankDosageLabel: 'ਸਪਰੇਅ ਪੰਪ ਖੁਰਾਕ:',
    timelineTitle: '੧੪-ਦਿਨਾਂ ਸਪਰੇਅ ਸਮਾਂ-ਸਾਰਣੀ',
    day1Label: 'ਦਿਨ ੧',
    day1Desc: 'ਪੱਤਿਆਂ ਤੇ ਰਸਾਇਣਕ ਸਪਰੇਅ',
    day4Label: 'ਦਿਨ ੪',
    day4Desc: 'ਜੜ੍ਹਾਂ ਕੋਲ ਹਵਾ ਸੰਚਾਰ',
    day8Label: 'ਦਿਨ ੮',
    day8Desc: 'ਨਿੰਮ ਤੇਲ ਜੈਵਿਕ ਸੁਰੱਖਿਆ',
    day14Label: 'ਦਿਨ ੧੪',
    day14Desc: 'ਫ਼ਸਲ ਦੀ ਮੁੜ ਜਾਂਚ',
    subtagWeather: 'ਮੌਸਮ ਵਿਗਿਆਨ ਅਤੇ ਖੇਤੀ ਟੈਲੀਮੈਟਰੀ',
    cityPlaceholder: 'ਸ਼ਹਿਰ ਜਾਂ ਜ਼ਿਲ੍ਹੇ ਦਾ ਨਾਂ ਦਰਜ ਕਰੋ...',
    btnGetAdvisory: 'ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ',
    fetchingWeather: 'ਜਾਣਕਾਰੀ ਲੈ ਰਹੇ ਹਾਂ...',
    weatherAdvisoryCaution: 'ਸਪਰੇਅ ਸਮਾਂ: ਸਾਵਧਾਨੀ ਲੋੜੀਂਦੀ',
    optimalWindowLabel: 'ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ',
    diseaseRiskAlertsTitle: 'ਮੌਸਮ ਅਧਾਰਤ ਰੋਗ ਚੇਤਾਵਨੀ',
    irrigationRecommendationTitle: 'ਸਿੰਚਾਈ ਸਲਾਹ',
    irrigationNeeded: 'ਅੱਜ ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਹੈ',
    irrigationNotNeeded: 'ਅੱਜ ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ',
    bestTimeLabel: 'ਢੁਕਵਾਂ ਸਮਾਂ',
    emptyWeatherDesc: 'ਮੌਸਮ ਅਤੇ ਸਪਰੇਅ ਸਲਾਹ ਦੇਖਣ ਲਈ ਸ਼ਹਿਰ ਦਾ ਨਾਂ ਦਰਜ ਕਰੋ।',
    quickTopicsTitle: 'ਤੁਰੰਤ ਖੇਤੀ ਸਵਾਲ',
    chatHeaderTitle: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ AI ਸਲਾਹਕਾਰ',
    chatHeaderSubtitle: 'FastAPI ਅਤੇ Gemini AI ਆਨਲਾਈਨ',
    liveIndicator: 'ਸਰਗਰਮ',
    chatSending: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਖੇਤੀ ਸਲਾਹ ਤਿਆਰ ਕਰ ਰਿਹਾ ਹੈ...',
    subtagHistory: 'ਟੈਲੀਮੈਟਰੀ ਲੌਗਜ਼',
    connectedDbText: 'ਡਾਟਾਬੇਸ ਨਾਲ ਜੁੜਿਆ • ਕਿਸਾਨ ਖਾਤਾ:',
    signInRequired: 'ਲੌਗਇਨ ਲੋੜੀਂਦਾ ਹੈ',
    btnExportJson: 'JSON ਡਾਊਨਲੋਡ',
    btnExportCsv: 'CSV ਡਾਊਨਲੋਡ',
    justNow: 'ਹੁਣੇ',
    farmerDefault: 'ਕਿਸਾਨ',
    subtagProfile: 'ਜ਼ਮੀਨ ਅਤੇ ਟੈਲੀਮੈਟਰੀ ਰਜਿਸਟਰ',
    statusOptimal: 'ਵਧੀਆ ਸਥਿਤੀ',
    totalScansCompleted: 'ਕੁੱਲ ਜਾਂਚ',
    statusNormal: 'ਆਮ ਸਥਿਤੀ',
    profileFormHeader: 'ਕਿਸਾਨ ਅਤੇ ਖੇਤ ਪ੍ਰੋਫਾਈਲ ਸੈਟਿੰਗਾਂ',
    mobileLabel: 'ਮੋਬਾਈਲ / ਸੰਪਰਕ',
    stateLabel: 'ਰਾਜ',
    districtLabel: 'ਜ਼ਿਲ੍ਹਾ',
    talukaLabel: 'ਤਹਿਸੀਲ / ਪਿੰਡ',
    landHoldingLabel: 'ਕੁੱਲ ਜ਼ਮੀਨ (ਏਕੜ)',
    soilClassLabel: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
    irrigationSystemLabel: 'ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀ',
    registeredCropsLabel: 'ਦਰਜ ਫ਼ਸਲਾਂ',
    acreageAllocationHeader: 'ਖੇਤ ਵਿੱਚ ਫ਼ਸਲ ਵੰਡ',
    soilHealthHeader: 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਸਥਿਤੀ',
    soilHealthBody: 'ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ੨੪% (ਵਧੀਆ)। ਜੈਵਿਕ ਕਾਰਬਨ: ੦.੬੮%।',
    rxModalTitle: 'ਫ਼ਸਲ ਰੋਗ ਨਿਦਾਨ ਅਤੇ ਇਲਾਜ ਪਰਚੀ',
    specimenIdLabel: 'ਨਮੂਨਾ ਨੰਬਰ',
    dateLabel: 'ਮਿਤੀ',
    farmerOwnerLabel: 'ਕਿਸਾਨ / ਮਾਲਕ',
    hostCropLabel: 'ਫ਼ਸਲ ਅਤੇ ਰੋਗ',
    measuredSeverityLabel: 'ਮਾਪੀ ਗਈ ਰੋਗ ਗੰਭੀਰਤਾ',
    leafAreaAffected: 'ਪੱਤੇ ਦਾ ਖੇਤਰ ਪ੍ਰਭਾਵਿਤ',
    prescribedFormulationHeader: 'ਸਿਫਾਰਸ਼ ਕੀਤੀ ਦਵਾਈ ਅਤੇ ਮਾਤਰਾ',
    primaryChemicalSpray: 'ਮੁੱਖ ਰਸਾਇਣਕ ਸਪਰੇਅ',
    secondaryBioShield: 'ਦੂਜਾ ਜੈਵਿਕ ਬਚਾਅ',
    foliarInoculant: 'ਪੱਤਿਆਂ ਦਾ ਜੈਵ-ਢਾਲ',
    btnPrintRx: 'ਇਲਾਜ ਪਰਚੀ ਪ੍ਰਿੰਟ ਕਰੋ',
    btnClose: 'ਬੰਦ ਕਰੋ',
    authenticating: 'ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...',
    enterpriseFooter: 'ਕ੍ਰਿਸ਼ੀOS AI • ਸ਼ੁੱਧ ਫ਼ਸਲ ਰੋਗ ਵਿਗਿਆਨ ਫੈਸਲਾ ਸਹਾਇਤਾ ਪ੍ਰਣਾਲੀ • PyTorch UNet++ ਅਤੇ YOLOv11'
  },
  te: {
    brandTitle: 'కృషిOS AI',
    brandSubtitle: 'ఖచ్చితమైన పంట వ్యాధి నిర్ధారణ వ్యవస్థ',
    systemStatus: 'GPU ఆన్‌లైన్ • మోడల్ సక్రియం',
    tabScan: 'వ్యాధి స్కానర్',
    tabWeather: 'వాతావరణం & పురుగుమందు',
    tabChat: 'కృషి మిత్ర AI',
    tabHistory: 'రికార్డులు',
    tabProfile: 'రైతు ప్రొఫైల్',
    selectTargetCrop: 'పంట ఎంచుకోండి',
    crops: { tomato: 'టొమాటో', eggplant: 'వంకాయ', wheat: 'గోధుమ' },
    telemetryTitle: 'ఆకు వ్యాధి పరీక్ష కేంద్రం',
    telemetryDesc: 'ఆకు ఫోటో నుండి వ్యాధి రకం, తీవ్రత మరియు ౭-౧౦ రోజుల అంచనా పొందండి.',
    uploadAreaTitle: 'ఆకు ఫోటో అప్‌లోడ్ చేయండి',
    uploadAreaSub: 'స్పష్టమైన ఫోటో ఎంచుకోండి (JPG/PNG)',
    quickPresets: 'నమూనా ఆకులు',
    btnAnalyze: 'వ్యాధిని విశ్లేషించండి',
    btnAnalyzing: 'స్కానింగ్ జరుగుతోంది...',
    resultsHeader: 'వ్యాధి నివేదిక',
    severityMetric: 'వ్యాధి తీవ్రత',
    futureProjectionTitle: '౭-౧౦ రోజుల అంచనా',
    rxOrganicTitle: 'జైవిక నివారణ',
    rxChemicalTitle: 'రసాయన మందు & మోతాదు',
    preventiveTitle: 'నివారణ చర్యలు',
    weatherHeadline: 'పురుగుమందు పిచికారీ వాతావరణ సూచన',
    weatherAdvisoryTitle: 'పిచికారీకి అనువైన వాతావరణం: సక్రియం',
    weatherAdvisoryBody: 'తదుపరి ౮ గంటలు వర్షం అంచనా లేదు.',
    tempLabel: 'ఉష్ణోగ్రత',
    humidityLabel: 'తేమ',
    windLabel: 'గాలి వేగం',
    dewLabel: 'మంచు బిందువు',
    tempUnit: '°సెం',
    speedUnit: 'కిమీ/గం',
    percentUnit: '%',
    acresUnit: 'ఎకరాలు',
    chatPlaceholder: 'వ్యాధి గురించి అడగండి...',
    sendBtn: 'పంపండి',
    historyTitle: 'గత స్కాన్ రికార్డులు',
    btnDownloadReport: 'ప్రిస్క్రిప్షన్ స్లిప్',
    profileTitle: 'రైతు ప్రొఫైల్ & పొలం నిర్వహణ',
    profileDesc: 'భూమి, మట్టి రకం, నీటిపారుదల మరియు పంట ఆరోగ్యం నిర్వహించండి.',
    saveProfile: 'మార్పులు సేవ్ చేయండి',
    savedMsg: 'సమాచారం అప్‌డేట్ అయింది!',
    welcomeTitle: 'కృషిOS AI కి స్వాగతం',
    welcomeSub: 'రైతుల కోసం అధునాతన పంట వ్యాధి నిర్ధారణ వేదిక',
    signInTab: 'రైతు లాగిన్',
    registerTab: 'కొత్త ఖాతా నమోదు',
    fullNameLabel: 'రైతు పూర్తి పేరు',
    fullNamePlaceholder: 'ఉదా. రవి వర్మ',
    identifierLabel: 'మొబైల్ నంబర్ లేదా ఈమెయిల్',
    identifierPlaceholder: 'ఉదా. ౯౮౨౫౦౧౨౩౪౫',
    passwordLabel: 'పాస్‌వర్డ్',
    btnSignIn: 'లాగిన్ చేయండి',
    btnRegister: 'ఖాతా సృష్టించండి',
    btnDemo: '✨ డెమో ఖాతా చూడండి',
    logoutBtn: 'లాగౌట్',
    dbConnected: 'డేటాబేస్ అనుసంధానమైంది',
    emptyHistoryTitle: 'ఇంకా ఎలాంటి స్కాన్ రికార్డులు లేవు',
    emptyHistoryDesc: 'మీ పంట మొదటి పరీక్ష కోసం "వ్యాధి స్కానర్" కి వెళ్లి ఆకు ఫోటోను అప్‌లోడ్ చేయండి.',
    kpiHealth: 'పొలం ఆరోగ్య స్కోరు',
    kpiArea: 'మొత్తం పొలం విస్తీర్ణం',
    kpiScans: 'పూర్తయిన స్కాన్‌లు',
    kpiAlerts: 'సక్రియ హెచ్చరికలు',
    subtagDL: 'డీప్ లెర్నింగ్ వ్యాధి తీవ్రత విశ్లేషణ వ్యవస్థ',
    spectralMatrix: 'స్పెక్ట్రల్ మ్యాట్రిక్స్',
    channelsLabel: 'ఛానెల్స్',
    rgbChannels: 'RGB',
    presetsLoaded: 'నమూనాలు సిద్ధం',
    severityUnit: 'తీవ్రత',
    aiConfidence: 'AI ఖచ్చితత్వం',
    lesionRegions: 'గాయం ప్రాంతాలు',
    pathogenTaxonomyLabel: 'వ్యాధికారక శిలీంధ్రం / వర్గీకరణ',
    cropHostLabel: 'పంట రకం',
    modelTomato: 'YOLOv11 + పిక్సెల్ విశ్లేషణ',
    modelEggplant: 'మొబైల్‌నెట్-v3',
    tankDosageLabel: 'స్ప్రే పంపు మోతాదు:',
    timelineTitle: '౧౪ రోజుల పిచికారీ షెడ్యూల్',
    day1Label: 'రోజు ౧',
    day1Desc: 'ఆకులపై రసాయన పిచికారీ',
    day4Label: 'రోజు ౪',
    day4Desc: 'వేర్ల వద్ద గాలి ప్రసరణ',
    day8Label: 'రోజు ౮',
    day8Desc: 'వేప నూనె జైవిక పిచికారీ',
    day14Label: 'రోజు ౧౪',
    day14Desc: 'పంట పునః పరిశీలన & స్కాన్',
    subtagWeather: 'వాతావరణ శాస్త్రం & వ్యవసాయ టెలిమెట్రీ',
    cityPlaceholder: 'నగరం పేరు నమోదు చేయండి...',
    btnGetAdvisory: 'సలహా పొందండి',
    fetchingWeather: 'లోడ్ అవుతోంది...',
    weatherAdvisoryCaution: 'పిచికారీ సమయం: జాగ్రత్త అవసరం',
    optimalWindowLabel: 'అనువైన సమయం',
    diseaseRiskAlertsTitle: 'వాతావరణ ఆధారిత వ్యాధి హెచ్చరికలు',
    irrigationRecommendationTitle: 'నీటిపారుదల సిఫార్సు',
    irrigationNeeded: 'ఈరోజు నీరు పెట్టడం మంచిది',
    irrigationNotNeeded: 'ఈరోజు నీరు అవసరం లేదు',
    bestTimeLabel: 'ఉత్తమ సమయం',
    emptyWeatherDesc: 'వాతావరణం మరియు పిచికారీ సలహా చూడటానికి నగరం పేరు నమోదు చేయండి.',
    quickTopicsTitle: 'త్వరిత ప్రశ్నలు',
    chatHeaderTitle: 'కృషి మిత్ర AI సలహాదారు',
    chatHeaderSubtitle: 'FastAPI & Gemini AI ఆన్‌లైన్',
    liveIndicator: 'సక్రియం',
    chatSending: 'కృషి మిత్ర సిఫార్సును సిద్ధం చేస్తోంది...',
    subtagHistory: 'టెలిమెట్రీ లాగ్స్',
    connectedDbText: 'డేటాబేస్ అనుసంధానమైంది • రైతు ఖాతా:',
    signInRequired: 'లాగిన్ అవసరం',
    btnExportJson: 'JSON డౌన్‌లోడ్',
    btnExportCsv: 'CSV డౌన్‌లోడ్',
    justNow: 'ఇప్పుడే',
    farmerDefault: 'రైతు',
    subtagProfile: 'భూమి & వ్యవసాయ టెలిమెట్రీ రిజిస్టర్',
    statusOptimal: 'ఉత్తమ స్థితి',
    totalScansCompleted: 'మొత్తం స్కాన్‌లు',
    statusNormal: 'సాధారణ స్థితి',
    profileFormHeader: 'రైతు & పొలం ప్రొఫైల్ సెట్టింగ్‌లు',
    mobileLabel: 'మొబైల్ / సంప్రదింపు',
    stateLabel: 'రాష్ట్రం',
    districtLabel: 'జిల్లా',
    talukaLabel: 'మండలం / గ్రామం',
    landHoldingLabel: 'మొత్తం భూమి (ఎకరాలు)',
    soilClassLabel: 'మట్టి వర్గీకరణ',
    irrigationSystemLabel: 'నీటిపారుదల వ్యవస్థ',
    registeredCropsLabel: 'నమోదైన పంటలు',
    acreageAllocationHeader: 'పొలంలో పంట విస్తీర్ణ కేటాయింపు',
    soilHealthHeader: 'నేల ఆరోగ్య స్థితి',
    soilHealthBody: 'నేలలో తేమ ౨౪% (అనుకూలం). సేంద్రీయ కర్బనం: ౦.౬౮%.',
    rxModalTitle: 'పంట వ్యాధి నిర్ధారణ & ప్రిస్క్రిప్షన్',
    specimenIdLabel: 'నమూనా సంఖ్య',
    dateLabel: 'తేదీ',
    farmerOwnerLabel: 'రైతు / యజమాని',
    hostCropLabel: 'పంట & వ్యాధి',
    measuredSeverityLabel: 'కొలిచిన వ్యాధి తీవ్రత',
    leafAreaAffected: 'ఆకు భాగం ప్రభావితం',
    prescribedFormulationHeader: 'సిఫార్సు చేసిన మందు & మోతాదు',
    primaryChemicalSpray: 'ప్రాథమిక రసాయన పిచికారీ',
    secondaryBioShield: 'ద్వితీయ జైవిక రక్షణ',
    foliarInoculant: 'ఆకుల జీవ రక్షణ',
    btnPrintRx: 'ప్రిస్క్రిప్షన్ ప్రింట్ చేయండి',
    btnClose: 'మూసివేయి',
    authenticating: 'ధృవీకరిస్తోంది...',
    enterpriseFooter: 'కృషిOS AI • ఖచ్చితమైన పంట వ్యాధి విజ్ఞాన నిర్ణయ మద్దతు వ్యవస్థ • PyTorch UNet++ & YOLOv11'
  },
  ta: {
    brandTitle: 'கிருஷிOS AI',
    brandSubtitle: 'துல்லியமான பயிர் நோய் கண்டறிதல் அமைப்பு',
    systemStatus: 'GPU ஆன்லைன் • மாதிரி செயலில்',
    tabScan: 'நோய் ஸ்கேனர்',
    tabWeather: 'வானிலை & தெளிப்பு',
    tabChat: 'கிருஷி மித்ரா AI',
    tabHistory: 'பதிவுகள்',
    tabProfile: 'விவசாயி சுயவிவரம்',
    selectTargetCrop: 'பயிரை தேர்ந்தெடுக்கவும்',
    crops: { tomato: 'தக்காளி', eggplant: 'கத்திரிக்காய்', wheat: 'கோதுமை' },
    telemetryTitle: 'இலை நோய் பரிசோதனை மையம்',
    telemetryDesc: 'இலை படத்திலிருந்து நோய் வகை, தீவிரம் மற்றும் ௭-౧౦ நாள் முன்னறிவிப்பு பெறுங்கள்.',
    uploadAreaTitle: 'இலை படத்தை பதிவேற்றவும்',
    uploadAreaSub: 'தெளிவான படத்தை தேர்ந்தெடுக்கவும் (JPG/PNG)',
    quickPresets: 'மாதிரி இலைகள்',
    btnAnalyze: 'நோயை பகுப்பாய்வு செய்யவும்',
    btnAnalyzing: 'ஸ்கேனிங் நடக்கிறது...',
    resultsHeader: 'நோய் அறிக்கை',
    severityMetric: 'நோய் தீவிரம்',
    futureProjectionTitle: '௭-౧౦ நாள் முன்னறிவிப்பு',
    rxOrganicTitle: 'இயற்கை சிகிச்சை',
    rxChemicalTitle: 'ரசாயன மருந்து & அளவு',
    preventiveTitle: 'தடுப்பு நடவடிக்கைகள்',
    weatherHeadline: 'பூச்சிக்கொல்லி தெளிப்பு வானிலை அறிவுரை',
    weatherAdvisoryTitle: 'தெளிப்புக்கு ஏற்ற வானிலை: செயலில்',
    weatherAdvisoryBody: 'அடுத்த ௮ மணி நேரத்தில் மழை இல்லை.',
    tempLabel: 'வெப்பநிலை',
    humidityLabel: 'ஈரப்பதம்',
    windLabel: 'காற்று வேகம்',
    dewLabel: 'பனி புள்ளி',
    tempUnit: '°செ',
    speedUnit: 'கிமீ/மணி',
    percentUnit: '%',
    acresUnit: 'ஏக்கர்',
    chatPlaceholder: 'நோய் பற்றி கேளுங்கள்...',
    sendBtn: 'அனுப்பு',
    historyTitle: 'கடந்த ஸ்கேன் பதிவுகள்',
    btnDownloadReport: 'மருந்து சீட்டு',
    profileTitle: 'விவசாயி சுயவிவரம் & நிலம் மேலாண்மை',
    profileDesc: 'நிலம், மண் வகை, நீர்ப்பாசனம் மற்றும் பயிர் ஆரோக்கியம் நிர்வகிக்கவும்.',
    saveProfile: 'மாற்றங்களை சேமிக்கவும்',
    savedMsg: 'தகவல் புதுப்பிக்கப்பட்டது!',
    welcomeTitle: 'கிருஷிOS AI-க்கு வரவேற்கிறோம்',
    welcomeSub: 'விவசாயிகளுக்கான துல்லியமான பயிர் நோய் கண்டறிதல் தளம்',
    signInTab: 'விவசாயி உள்நுழைவு',
    registerTab: 'புதிய விவசாயி பதிவு',
    fullNameLabel: 'விவசாயியின் முழு பெயர்',
    fullNamePlaceholder: 'எ.கா. செந்தில் குமார்',
    identifierLabel: 'மொபைல் எண் அல்லது மின்னஞ்சல்',
    identifierPlaceholder: 'எ.கா. ௯௮௨௫௦௧௨௩௪௫',
    passwordLabel: 'கடவுச்சொல்',
    btnSignIn: 'உள்நுழையவும்',
    btnRegister: 'கணக்கை உருவாக்கவும்',
    btnDemo: '✨ மாதிரி கணக்கு காண்க',
    logoutBtn: 'வெளியேறு',
    dbConnected: 'தரவுத்தளம் இணைக்கப்பட்டது',
    emptyHistoryTitle: 'இதுவரை எந்த ஸ்கேன் பதிவுகளும் இல்லை',
    emptyHistoryDesc: 'உங்கள் பயிரின் முதல் பரிசோதனைக்கு "நோய் ஸ்கேனர்" சென்று இலை புகைப்படத்தை பதிவேற்றவும்.',
    kpiHealth: 'பண்ணை சுகாதார மதிப்பெண்',
    kpiArea: 'மொத்த நிலப்பரப்பு',
    kpiScans: 'மொத்த ஸ்கேன்கள்',
    kpiAlerts: 'செயலில் உள்ள எச்சரிக்கைகள்',
    subtagDL: 'டீப் லேர்னிங் நோய் தீவிர பகுப்பாய்வு அமைப்பு',
    spectralMatrix: 'ஸ்பெக்ட்ரல் மேட்ரிக்ஸ்',
    channelsLabel: 'சேனல்கள்',
    rgbChannels: 'RGB',
    presetsLoaded: 'மாதிரிகள் தயார்',
    severityUnit: 'தீவிரம்',
    aiConfidence: 'AI துல்லியம்',
    lesionRegions: 'காய பகுதிகள்',
    pathogenTaxonomyLabel: 'நோய்க்காரணி பூஞ்சை / வகைப்பாடு',
    cropHostLabel: 'பயிர் வகை',
    modelTomato: 'YOLOv11 + பிக்சல் பகுப்பாய்வு',
    modelEggplant: 'மொபைல்நெட்-v3',
    tankDosageLabel: 'தெளிப்பான் அளவு:',
    timelineTitle: '௧௪ நாள் தெளிப்பு கால அட்டவணை',
    day1Label: 'நாள் ௧',
    day1Desc: 'இலைகளில் ரசாயன தெளிப்பு',
    day4Label: 'நாள் ௪',
    day4Desc: 'வேர் பகுதியில் காற்று சுழற்சி',
    day8Label: 'நாள் ௮',
    day8Desc: 'வேப்ப எண்ணெய் இயற்கை தெளிப்பு',
    day14Label: 'நாள் ௧௪',
    day14Desc: 'பயிர் மறு ஆய்வு & ஸ்கேன்',
    subtagWeather: 'வானிலை அறிவியல் & விவசாய டெலிமெட்ரி',
    cityPlaceholder: 'நகரத்தின் பெயரை உள்ளிடவும்...',
    btnGetAdvisory: 'ஆலோசனை பெறுக',
    fetchingWeather: 'பெறுகிறது...',
    weatherAdvisoryCaution: 'தெளிப்பு நேரம்: எச்சரிக்கை தேவை',
    optimalWindowLabel: 'சிறந்த நேரம்',
    diseaseRiskAlertsTitle: 'வானிலை சார்ந்த நோய் எச்சரிக்கைகள்',
    irrigationRecommendationTitle: 'நீர்ப்பாசன பரிந்துரை',
    irrigationNeeded: 'இன்று பாசனம் பரிந்துரைக்கப்படுகிறது',
    irrigationNotNeeded: 'இன்று பாசனம் தேவையில்லை',
    bestTimeLabel: 'ஏற்ற நேரம்',
    emptyWeatherDesc: 'வானிலை மற்றும் தெளிப்பு ஆலோசனையைக் காண நகரத்தின் பெயரை உள்ளிடவும்.',
    quickTopicsTitle: 'விரைவு வினாக்கள்',
    chatHeaderTitle: 'கிருஷி மித்ரா AI ஆலோசகர்',
    chatHeaderSubtitle: 'FastAPI & Gemini AI ஆன்லைன்',
    liveIndicator: 'செயலில்',
    chatSending: 'கிருஷி மித்ரா பரிந்துரையை தயாரிக்கிறது...',
    subtagHistory: 'டெலிமெட்ரி பதிவுகள்',
    connectedDbText: 'தரவுத்தளம் இணைக்கப்பட்டது • விவசாயி கணக்கு:',
    signInRequired: 'உள்நுழைவு தேவை',
    btnExportJson: 'JSON பதிவிறக்கம்',
    btnExportCsv: 'CSV பதிவிறக்கம்',
    justNow: 'இப்போது',
    farmerDefault: 'விவசாயி',
    subtagProfile: 'நிலம் & வேளாண்மை டெலிமெட்ரி பதிவேடு',
    statusOptimal: 'சிறந்த நிலை',
    totalScansCompleted: 'மொத்த பரிசோதனைகள்',
    statusNormal: 'சாதாரண நிலை',
    profileFormHeader: 'விவசாயி & பண்ணை அமைப்புகள்',
    mobileLabel: 'கைப்பேசி / தொடர்பு',
    stateLabel: 'மாநிலம்',
    districtLabel: 'மாவட்டம்',
    talukaLabel: 'வட்டம் / கிராமம்',
    landHoldingLabel: 'மொத்த நிலம் (ஏக்கர்)',
    soilClassLabel: 'மண் வகைப்பாடு',
    irrigationSystemLabel: 'நீர்ப்பாசன முறை',
    registeredCropsLabel: 'பதிவு செய்யப்பட்ட பயிர்கள்',
    acreageAllocationHeader: 'பண்ணை பயிர் பரப்பளவு ஒதுக்கீடு',
    soilHealthHeader: 'மண் ஆரோக்கிய நிலை',
    soilHealthBody: 'மண்ணில் ஈரப்பதம் ௨௪% (ஏற்றது). கரிம கார்பன்: ௦.௬௮%.',
    rxModalTitle: 'பயிர் நோய் கண்டறிதல் & மருந்து சீட்டு',
    specimenIdLabel: 'மாதிரி எண்',
    dateLabel: 'தேதி',
    farmerOwnerLabel: 'விவசாயி / உரிமையாளர்',
    hostCropLabel: 'பயிர் & நோய்',
    measuredSeverityLabel: 'அளவிடப்பட்ட நோய் தீவிரம்',
    leafAreaAffected: 'இலை பகுதி பாதிக்கப்பட்டது',
    prescribedFormulationHeader: 'பரிந்துரைக்கப்பட்ட மருந்து & அளவு',
    primaryChemicalSpray: 'முதன்மை ரசாயன தெளிப்பு',
    secondaryBioShield: 'இரண்டாம் இயற்கை பாதுகாப்பு',
    foliarInoculant: 'இலை உயிரியல் கவசம்',
    btnPrintRx: 'மருந்து சீட்டை அச்சிடுங்கள்',
    btnClose: 'மூடு',
    authenticating: 'சரிபார்க்கிறது...',
    enterpriseFooter: 'கிருஷிOS AI • துல்லியமான பயிர் நோயியல் முடிவு ஆதரவு அமைப்பு • PyTorch UNet++ & YOLOv11'
  },
  en: {
    brandTitle: 'KRISHI•OS AI',
    brandSubtitle: 'Precision Crop Pathology & Severity Telemetry',
    systemStatus: 'GPU INFERENCE ONLINE',
    tabScan: 'Pathology Scanner',
    tabWeather: 'Microclimate & Spray',
    tabChat: 'Agronomy AI',
    tabHistory: 'Registry',
    tabProfile: 'Farmer Profile & Farm',
    selectTargetCrop: 'TARGET CROP HOST',
    crops: { tomato: 'Tomato', eggplant: 'Eggplant (Brinjal)', wheat: 'Wheat & Cereals' },
    telemetryTitle: 'Optical Leaf Telemetry',
    telemetryDesc: 'Upload foliar photography to calculate pixel-level lesion segmentation, disease stage, and 10-day progression forecast.',
    uploadAreaTitle: 'Drag & Drop Foliar Specimen or Browse',
    uploadAreaSub: 'Accepts RGB foliage captures in JPG, PNG or WEBP (Max 25MB)',
    quickPresets: 'BENCHMARK CLINICAL PRESETS',
    btnAnalyze: 'Execute Diagnostic Analysis',
    btnAnalyzing: 'Segmenting Foliar Lesions...',
    resultsHeader: 'PATHOLOGY DIAGNOSIS REPORT',
    severityMetric: 'Lesion Severity Index',
    futureProjectionTitle: '7–10 Day Progression Forecast',
    rxOrganicTitle: 'Bio-Control & Organic Regimen',
    rxChemicalTitle: 'Chemical Fungicide Protocol',
    preventiveTitle: 'Prophylactic Cultural Controls',
    weatherHeadline: 'Microclimate Spray Window Intelligence',
    weatherAdvisoryTitle: 'OPTIMAL FOLIAR SPRAY WINDOW: ACTIVE',
    weatherAdvisoryBody: 'Ambient temp with suitable humidity and wind velocity. Zero rain forecasted for the next 8 hours.',
    tempLabel: 'Ambient Temp',
    humidityLabel: 'Relative Humidity',
    windLabel: 'Wind Velocity',
    dewLabel: 'Dew Point',
    tempUnit: '°C',
    speedUnit: 'km/h',
    percentUnit: '%',
    acresUnit: 'Acres',
    chatPlaceholder: 'Inquire regarding fungal protocols, dosage, soil...',
    sendBtn: 'Transmit',
    historyTitle: 'Historical Foliar Diagnostic Records',
    btnDownloadReport: 'Prescription Slip',
    profileTitle: 'Farmer Profile & Agricultural Telemetry',
    profileDesc: 'Manage landholding records, soil classification, irrigation infrastructure, and view farm health analytics.',
    saveProfile: 'Save Profile Changes',
    savedMsg: 'Profile successfully updated!',
    welcomeTitle: 'Welcome to KrishiOS AI',
    welcomeSub: 'Autonomous Foliar Pathology & Agricultural Intelligence Platform for Indian Farmers',
    signInTab: 'Farmer Sign In',
    registerTab: 'New Farmer Registration',
    fullNameLabel: 'Farmer Full Name',
    fullNamePlaceholder: 'e.g. Ramesh Patel',
    identifierLabel: 'Mobile Number or Email',
    identifierPlaceholder: 'e.g. 9825012345 or ramesh@gmail.com',
    passwordLabel: 'Password',
    btnSignIn: 'Sign In to Account',
    btnRegister: 'Register Farmer Account',
    btnDemo: '✨ Demo Account (Testing)',
    logoutBtn: 'Sign out',
    dbConnected: 'Connected to Database',
    emptyHistoryTitle: 'No scans recorded yet',
    emptyHistoryDesc: 'Upload or capture a leaf photo in the "Pathology Scanner" tab to perform your first diagnosis.',
    kpiHealth: 'Farm Health Score',
    kpiArea: 'Total Landholding',
    kpiScans: 'Completed Scans',
    kpiAlerts: 'Active Pathology Alerts',
    subtagDL: 'DEEP LEARNING SEVERITY EXTRACTION PIPELINE',
    spectralMatrix: 'SPECTRAL MATRIX',
    channelsLabel: 'CHANNELS',
    rgbChannels: 'RGB',
    presetsLoaded: 'Presets Loaded',
    severityUnit: 'Severity',
    aiConfidence: 'AI Confidence',
    lesionRegions: 'Lesion BBoxes',
    pathogenTaxonomyLabel: 'CAUSAL PATHOGEN / TAXONOMY',
    cropHostLabel: 'CROP HOST',
    modelTomato: 'YOLOv11 + Pixel Analysis',
    modelEggplant: 'MobileNetV3-Large',
    tankDosageLabel: 'Tank Mix:',
    timelineTitle: 'RECOMMENDED 14-DAY SPRAY INTERVENTION SCHEDULE',
    day1Label: 'DAY 1',
    day1Desc: 'Foliar Chemical Spray',
    day4Label: 'DAY 4',
    day4Desc: 'Root Zone Aeration',
    day8Label: 'DAY 8',
    day8Desc: 'Bio-Shield Neem Spray',
    day14Label: 'DAY 14',
    day14Desc: 'Optical Re-Scan',
    subtagWeather: 'METEOROLOGICAL TELEMETRY',
    cityPlaceholder: 'Enter city name (e.g. Surat, Anand, Pune)...',
    btnGetAdvisory: 'Get Advisory',
    fetchingWeather: 'Fetching...',
    weatherAdvisoryCaution: 'SPRAY WINDOW: CAUTION',
    optimalWindowLabel: 'Optimal Window',
    diseaseRiskAlertsTitle: 'WEATHER-BASED DISEASE RISK ALERTS',
    irrigationRecommendationTitle: 'IRRIGATION RECOMMENDATION',
    irrigationNeeded: 'Irrigation Recommended Today',
    irrigationNotNeeded: 'Irrigation Not Required Today',
    bestTimeLabel: 'Best time',
    emptyWeatherDesc: 'Enter a city name and click Get Advisory to see live weather data and spray window recommendations.',
    quickTopicsTitle: 'QUICK TOPIC PROMPTS',
    chatHeaderTitle: 'Krishi Mitra Agronomic Intelligence',
    chatHeaderSubtitle: 'FastAPI & Gemini LLM Pipeline Online',
    liveIndicator: 'LIVE',
    chatSending: 'Krishi Mitra is generating agronomic recommendation...',
    subtagHistory: 'PERSISTENT TELEMETRY LOGS',
    connectedDbText: 'Connected to Database • Account:',
    signInRequired: 'Sign in required',
    btnExportJson: 'Export JSON',
    btnExportCsv: 'Export CSV',
    justNow: 'Just now',
    farmerDefault: 'Farmer',
    subtagProfile: 'AGRONOMIC LANDHOLDING & TELEMETRY REGISTRY',
    statusOptimal: 'Optimal',
    totalScansCompleted: 'Total scans',
    statusNormal: 'Normal',
    profileFormHeader: 'Farmer & Farm Profile Settings',
    mobileLabel: 'Mobile / Contact',
    stateLabel: 'State',
    districtLabel: 'District',
    talukaLabel: 'Taluka / Village',
    landHoldingLabel: 'Total Land Holding (Acres)',
    soilClassLabel: 'Soil Classification',
    irrigationSystemLabel: 'Irrigation System',
    registeredCropsLabel: 'Registered Crops',
    acreageAllocationHeader: 'Farm Crop Acreage Allocation',
    soilHealthHeader: 'Soil Health Status',
    soilHealthBody: 'Soil moisture is at 24% (Optimal). Organic carbon content: 0.68%. Nitrogen-Phosphorus-Potassium (NPK) balanced for solanaceous vegetable vine load.',
    rxModalTitle: 'CLINICAL PATHOLOGY PRESCRIPTION',
    specimenIdLabel: 'SPECIMEN ID',
    dateLabel: 'DATE',
    farmerOwnerLabel: 'FARMER / OWNER',
    hostCropLabel: 'HOST CROP & PATHOLOGY',
    measuredSeverityLabel: 'MEASURED LESION SEVERITY',
    leafAreaAffected: 'Leaf Area Affected',
    prescribedFormulationHeader: 'PRESCRIBED REMEDIATION FORMULATION',
    primaryChemicalSpray: 'Primary Chemical Spray',
    secondaryBioShield: 'Secondary Bio-Shield',
    foliarInoculant: 'Foliar Inoculant',
    btnPrintRx: 'Print Official Rx Slip',
    btnClose: 'Close',
    authenticating: 'Authenticating...',
    enterpriseFooter: 'KRISHI•OS AI • Precision Crop Pathology Decision Support System • PyTorch UNet++ & YOLOv11 Multi-Stage Architecture'
  }
};

export function getTranslation(lang = 'hi') {
  const base = UI_DICTIONARY[lang] || UI_DICTIONARY['hi'];
  if (lang !== 'en') {
    return new Proxy(base, {
      get(target, prop) {
        if (prop in target && target[prop] !== undefined && target[prop] !== '') {
          return target[prop];
        }
        return (UI_DICTIONARY['hi'] && UI_DICTIONARY['hi'][prop]) || '';
      }
    });
  }
  return base;
}
