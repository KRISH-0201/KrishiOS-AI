"""
KrishiOS AI — Multilingual AI Agriculture Assistant Service
Module 2: AI-powered agronomy chat with Gemini LLM + Intelligent Agronomy Fallback Engine.
Supports Hindi, Gujarati, English, Hinglish, Marathi, etc.
"""

import re
import httpx
from typing import List, Dict, Any, Tuple
from app.core.config import settings
from app.schemas.chat import ChatMessage, ChatResponse, QuickTopic

# Gemini API endpoint (Gemini 2.5 Flash)
GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

SYSTEM_INSTRUCTION = """You are "KrishiOS AI Assistant" (कृषि मित्र / કૃષિ મિત્ર), an expert, empathetic, and highly knowledgeable agricultural advisor specifically dedicated to Indian farmers.

CORE GUIDELINES:
1. LANGUAGE MATCHING:
   - Always respond in the EXACT language used by the farmer (Hindi, Gujarati, English, Hinglish, Marathi, etc.).
   - Use simple, respectful, and farmer-friendly language (आप / તમે). Avoid overly complex academic jargon.

2. AGRICULTURAL EXPERTISE:
   - Provide concrete, practical guidance: exact dosages (e.g., 2 ml per liter of water, or 250-300 ml per acre).
   - Offer BOTH Chemical and Organic/Biological alternatives whenever recommending treatments (e.g., Neem oil 1500 ppm, Trichoderma viride, alongside Mancozeb or Imidacloprid).
   - Include safety warnings: wear protective masks/gloves, spray during calm weather (early morning or late evening), adhere to Pre-Harvest Intervals (PHI).

3. STRUCTURE OF ANSWERS:
   - 🌿 Disease / Issue Diagnosis & Symptoms
   - 🛡️ Recommended Solutions (Chemical + Organic)
   - ⚖️ Exact Dosage & Application Method
   - ⚠️ Crucial Precautions & Timing

4. Keep responses organized with clear bullet points and emojis for readability on mobile screens.
"""

# --------------------------------------------------------------------------- #
#  Offline Agronomy Knowledge Base (Guaranteed zero-failure fallback)         #
# --------------------------------------------------------------------------- #

OFFLINE_KNOWLEDGE = [
    {
        "keywords": ["early blight", "blight", "झुलसा", "અગેતરો ઝાળ", "કાળો ચરમી"],
        "crops": ["tomato", "potato"],
        "hi": (
            "🌿 **टमाटर / आलू का अगेती झुलसा (Early Blight) उपचार:**\n\n"
            "**लक्षण:** पत्तियों पर भूरे-काले संकेंद्रित छल्ले (Target Board spots) बनना और पत्तियां पीली पड़कर सूखना।\n\n"
            "**🛡️ रासायनिक उपचार:**\n"
            "- **मैनकोज़ेब 75% WP (Mancozeb):** 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।\n"
            "- या **एज़ोक्सीस्ट्रोबिन 23% SC (Azoxystrobin):** 1 मिली प्रति लीटर पानी।\n\n"
            "**🌱 जैविक विकल्प:**\n"
            "- **नीम तेल (Neem Oil 1500 ppm):** 3-5 मिली प्रति लीटर पानी + थोड़ा साबुन का घोल।\n"
            "- **ट्राइकोडर्मा विरिडी (Trichoderma viride):** 5 ग्राम प्रति लीटर पानी में मिलाकर शाम के समय छिड़कें।\n\n"
            "**⚠️ सावधानियां:** छिड़काव हमेशा सुबह या शाम को करें। अत्यधिक नमी और जलभराव से बचें।"
        ),
        "gu": (
            "🌿 **ટામેટા / બટાટાનો અગેતરો ઝાળ (Early Blight) ઉપાય:**\n\n"
            "**લક્ષણો:** પાંદડા પર ગોળાકાર કથ્થઈ-કાળા ડાઘા (ટાર્ગેટ બોર્ડ) અને પાન સુકાઈ જવું.\n\n"
            "**🛡️ રાસાયણિક ઉપાય:**\n"
            "- **મેન્કોઝેબ 75% WP:** ૨.૫ ગ્રામ પ્રતિ લિટર પાણીમાં ભેળવી છંટકાવ કરવો.\n"
            "- અથવા **એઝોક્સીસ્ટ્રોબિન 23% SC:** ૧ મિલી પ્રતિ લિટર પાણી.\n\n"
            "**🌱 જૈવિક ઉપાય:**\n"
            "- **લીમડાનું તેલ (Neem Oil):** ૩-૫ મિલી પ્રતિ લિટર પાણી.\n"
            "- **ટ્રાઈકોડર્મા વિરીડી:** ૫ ગ્રામ પ્રતિ લિટર પાણી.\n\n"
            "**⚠️ સાવચેતી:** છંટકાવ સવારે અથવા સાંજે કરવો અને ખેતરમાં વધુ પાણી ભરાવા ન દેવું."
        ),
        "en": (
            "🌿 **Early Blight Management (Tomato / Potato):**\n\n"
            "**Symptoms:** Brown-black circular spots with concentric rings ('target board') on older leaves.\n\n"
            "**🛡️ Chemical Treatment:**\n"
            "- **Mancozeb 75% WP:** 2.5 g/L of water spray.\n"
            "- Or **Azoxystrobin 23% SC:** 1 ml/L of water.\n\n"
            "**🌱 Organic / Biological Alternative:**\n"
            "- **Neem Oil (1500 ppm):** 3-5 ml/L of water with mild soap emulsifier.\n"
            "- **Trichoderma viride:** 5 g/L of water spray.\n\n"
            "**⚠️ Precautions:** Spray in late evening or early morning. Avoid overhead watering to limit fungal spread."
        ),
        "followups_hi": ["मैनकोज़ेब का छिड़काव कितने दिन बाद दोहराएं?", "जैविक फफूंदनाशी कैसे बनाएं?", "टमाटर में ड्रिप सिंचाई का सही समय क्या है?"],
        "followups_gu": ["મેન્કોઝેબનો ફરીથી છંટકાવ ક્યારે કરવો?", "જૈવિક કીટનાશક કેવી રીતે બનાવવું?", "ટામેટામાં ડ્રીપ પિયતનો સમય શું છે?"],
        "followups_en": ["When should I repeat the fungicide spray?", "How to prepare organic bio-pesticides?", "What is the optimal drip irrigation schedule for tomato?"]
    },
    {
        "keywords": ["leaf curl", "curl", "मरोड़िया", "पर्ण कुंचन", "કુકડવા", "વાંકડિયા"],
        "crops": ["tomato", "chilli", "papaya"],
        "hi": (
            "🌿 **पर्ण कुंचन रोग (Leaf Curl Virus) नियंत्रण:**\n\n"
            "**कारण:** यह रोग सफेद मक्खी (Whitefly) द्वारा फैलता है, जिससे पत्तियां ऊपर या नीचे की ओर मुड़ जाती हैं और पौधा बौना रह जाता है।\n\n"
            "**🛡️ सफेद मक्खी नियंत्रण (रासायनिक):**\n"
            "- **इमिडाक्लोप्रिड 17.8% SL (Imidacloprid):** 0.5 मिली प्रति लीटर पानी।\n"
            "- या **थायोमेथोक्सम 25% WG (Thiamethoxam):** 0.3-0.5 ग्राम प्रति लीटर पानी।\n\n"
            "**🌱 जैविक व भौतिक उपाय:**\n"
            "- **पीले चिपचिपे कार्ड (Yellow Sticky Traps):** 15-20 कार्ड प्रति एकड़ लगाएं।\n"
            "- **नीम का काढ़ा / नीम तेल 1500 ppm:** 4 मिली प्रति लीटर पानी।\n"
            "- संक्रमित पौधों को उखाड़कर तुरंत नष्ट करें ताकि अन्य पौधों में न फैले।"
        ),
        "gu": (
            "🌿 **પાનનો કુકડવા રોગ (Leaf Curl Virus) નિયંત્રણ:**\n\n"
            "**કારણ:** આ રોગ સફેદ માખી (Whitefly) દ્વારા ફેલાય છે. પાંદડા ઉપર કે નીચે તરફ વળી જાય છે.\n\n"
            "**🛡️ સફેદ માખી નિયંત્રણ (રાસાયણિક):**\n"
            "- **ઈમિડાક્લોપ્રિડ 17.8% SL:** ૦.૫ મિલી પ્રતિ લિટર પાણી.\n"
            "- અથવા **થાયામેથોક્ઝામ 25% WG:** ૦.૩-૦.૫ ગ્રામ પ્રતિ લિટર પાણી.\n\n"
            "**🌱 જૈવિક ઉપાય:**\n"
            "- **પીળા ચીકણા ટ્રેપ (Yellow Sticky Traps):** એકરે ૧૫-૨૦ નંગ લગાવવા.\n"
            "- **લીમડાનું તેલ:** ૪ મિલી પ્રતિ લિટર પાણી.\n"
            "- રોગિષ્ઠ છોડને ઉપાડીને ખેતર બહાર બાળી નાખવા."
        ),
        "en": (
            "🌿 **Leaf Curl Virus (TYLCV) Management:**\n\n"
            "**Cause:** Transmitted by Whiteflies (*Bemisia tabaci*). Leaves curl upwards or downwards and turn leathery.\n\n"
            "**🛡️ Vector (Whitefly) Control:**\n"
            "- **Imidacloprid 17.8% SL:** 0.5 ml/L of water.\n"
            "- Or **Thiamethoxam 25% WG:** 0.5 g/L of water.\n\n"
            "**🌱 Non-Chemical IPM Measures:**\n"
            "- Install **Yellow Sticky Traps** (15-20 traps per acre).\n"
            "- Spray **Neem Oil 1500 ppm** at 4 ml/L.\n"
            "- Uproot and burn heavily infected plants immediately to curb spread."
        ),
        "followups_hi": ["पीले चिपचिपे कार्ड कहां से मिलेंगे?", "सफेद मक्खी को जैविक तरीके से कैसे रोकें?", "क्या मिर्च में भी यही दवा काम करेगी?"],
        "followups_gu": ["પીળા ચીકણા ટ્રેપ ક્યાં મળશે?", "સફેદ માખીને જૈવિક રીતે કેવી રીતે અટકાવવી?", "મરચીમાં પણ આ જ દવા કામ કરશે?"],
        "followups_en": ["Where to place yellow sticky traps in the field?", "Organic remedies for whitefly control?", "Can this treatment be used for chilli leaf curl?"]
    },
    {
        "keywords": ["fertilizer", "खाद", "यूरिया", "खातर", "npk", "dap", "urea"],
        "crops": [],
        "hi": (
            "🌱 **संतुलित उर्वरक एवं खाद प्रबंधन (NPK Guide):**\n\n"
            "**1. बुवाई के समय (Basal Dose):**\n"
            "- गोबर की अच्छी सड़ी खाद (FYM): 4-5 टन प्रति एकड़।\n"
            "- DAP: 50 किग्रा + पोटाश (MOP): 30 किग्रा प्रति एकड़।\n\n"
            "**2. फसल की बढ़वार के समय (Vegetative Stage):**\n"
            "- यूरिया (Urea): 25-30 किग्रा प्रति एकड़ (2 से 3 किस्तों में दें)।\n"
            "- 19:19:19 (Water Soluble NPK): 5 ग्राम प्रति लीटर पानी का पर्णीय छिड़काव।\n\n"
            "**3. फूल और फल बनने के समय:**\n"
            "- 0:52:34 (MKP) या 13:0:45 (Potassium Nitrate): 5 ग्राम प्रति लीटर छिड़काव।\n\n"
            "💡 **टिप:** हमेशा मिट्टी की जांच (Soil Health Card) के आधार पर ही उर्वरकों का प्रयोग करें।"
        ),
        "gu": (
            "🌱 **સંતુલિત ખાતર વ્યવસ્થાપન (NPK માર્ગદર્શન):**\n\n"
            "**1. વાવણી સમયે:**\n"
            "- દેશી સારું કોહવાયેલું છાણિયું ખાતર: ૪-૫ ટન પ્રતિ એકર.\n"
            "- ડીએપી (DAP): ૫૦ કિગ્રા + પોટાશ (MOP): ૩૦ કિગ્રા પ્રતિ એકર.\n\n"
            "**2. વૃદ્ધિના સમયે:**\n"
            "- યુરિયા (Urea): ૨૫-૩૦ કિગ્રા પ્રતિ એકર (હપ્તામાં આપવું).\n"
            "- ૧૯:૧૯:૧૯ ખાતર: ૫ ગ્રામ પ્રતિ લિટર પાણીમાં છંટકાવ કરવો.\n\n"
            "**3. ફુલ-ફળ બેસવાના સમયે:**\n"
            "- ૦:૫૨:૩૪ અથવા ૧૩:૦:૪૫: ૫ ગ્રામ પ્રતિ લિટર છંટકાવ.\n\n"
            "💡 **સલાહ:** જમીન ચકાસણી (Soil Testing) મુજબ જ ખાતર આપવું."
        ),
        "en": (
            "🌱 **Balanced Fertilizer & Nutrient Management (NPK):**\n\n"
            "**1. Basal Application (At Sowing/Transplanting):**\n"
            "- Well-decomposed FYM / Compost: 4-5 tonnes/acre.\n"
            "- DAP: 50 kg + MOP (Potash): 30 kg per acre.\n\n"
            "**2. Vegetative Growth Stage:**\n"
            "- Urea: 25-30 kg/acre in split doses with irrigation.\n"
            "- Water Soluble NPK (19:19:19): 5 g/L foliar spray.\n\n"
            "**3. Flowering & Fruiting Stage:**\n"
            "- NPK 0:52:34 or 13:0:45: 5 g/L foliar spray for fruit size and quality.\n\n"
            "💡 **Advice:** Base your fertilizer doses on an official Soil Health Card report."
        ),
        "followups_hi": ["मिट्टी जांच (Soil Test) कैसे करवाएं?", "19:19:19 और यूरिया में क्या अंतर है?", "जैविक खाद (जीवामृत) कैसे बनाएं?"],
        "followups_gu": ["જમીન ચકાસણી કેવી રીતે કરાવવી?", "૧૯:૧૯:૧૯ અને યુરિયામાં શું તફાવત છે?", "જીવામૃત કેવી રીતે બનાવવું?"],
        "followups_en": ["How to take soil samples for testing?", "What is the difference between 19:19:19 and Urea?", "How to prepare Jeevamrut organic fertilizer?"]
    }
]

# Quick topics for front-end suggestions
QUICK_TOPICS = [
    QuickTopic(
        id="qt_early_blight",
        category="Disease Protection",
        question_hi="टमाटर में झुलसा (Early Blight) रोग के लक्षण और दवा क्या है?",
        question_gu="ટામેટામાં અગેતરા ઝાળ (Early Blight) રોગના લક્ષણ અને દવા શું છે?",
        question_en="What are the symptoms and treatments for Tomato Early Blight?"
    ),
    QuickTopic(
        id="qt_leaf_curl",
        category="Pest & Virus",
        question_hi="पत्तियों में मरोड़िया (Leaf Curl) रोग और सफेद मक्खी का इलाज बताएं।",
        question_gu="પાનમાં કુકડવા (Leaf Curl) રોગ અને સફેદ માખીનો ઉપાય જણાવો.",
        question_en="How to control Leaf Curl Virus and Whitefly in crops?"
    ),
    QuickTopic(
        id="qt_fertilizer",
        category="Nutrients",
        question_hi="फसल के लिए सही NPK खाद का अनुपात और छिड़काव का समय क्या है?",
        question_gu="પાક માટે સાચા NPK ખાતરનું પ્રમાણ અને છંટકાવનો સમય જણાવો.",
        question_en="What is the balanced NPK schedule and timing for vegetables?"
    ),
    QuickTopic(
        id="qt_neem_oil",
        category="Organic Farming",
        question_hi="नीम तेल (Neem Oil) का सही स्प्रे अनुपात और बनाने की विधि क्या है?",
        question_gu="લીમડાના તેલનો (Neem Oil) છંટકાવ કરવાનું સાચું પ્રમાણ જણાવો.",
        question_en="What is the right dilution and spraying method for Neem Oil?"
    ),
]


def detect_language(text: str, user_hint: str = "auto") -> str:
    """Detects whether text is Hindi (Devanagari), Gujarati, or English."""
    if user_hint and user_hint != "auto":
        return user_hint

    # Check for Gujarati unicode range 0A80-0AFF
    if re.search(r'[\u0A80-\u0AFF]', text):
        return "gu"
    # Check for Devanagari (Hindi/Marathi) range 0900-097F
    if re.search(r'[\u0900-\u097F]', text):
        return "hi"
    return "en"


def _find_offline_match(query: str, crop: str = None) -> Tuple[str, List[str]]:
    """Searches offline knowledge base for an accurate match."""
    q_lower = query.lower()
    lang = detect_language(query)

    for item in OFFLINE_KNOWLEDGE:
        for kw in item["keywords"]:
            if kw.lower() in q_lower:
                if lang == "gu":
                    return item["gu"], item.get("followups_gu", [])
                elif lang == "hi":
                    return item["hi"], item.get("followups_hi", [])
                else:
                    return item["en"], item.get("followups_en", [])

    # Default general response if no specific keyword matched
    if lang == "gu":
        return (
            "🌾 **નમસ્કાર ખેડૂત મિત્ર!**\n\n"
            "તમારો પ્રશ્ન કૃષિ નિષ્ણાતને મળ્યો છે. તમારા પાકને લગતી વિગતો જેમ કે:\n"
            "- પાકનું નામ (દા.ત. ટામેટા, કપાસ, ઘઉં)\n"
            "- પાંદડા કે થડ પર દેખાતા લક્ષણો\n"
            "- પાકની ઉંમર (દિવસો)\n\n"
            "આ વિગતો જણાવશો તો ચોક્કસ દવા, માપ અને જૈવિક ઉપાય જણાવી શકાશે.",
            ["ટામેટામાં પાન પીળા પડવાનો ઉપાય?", "લીમડાના તેલનો છંટકાવ કેવી રીતે કરવો?", "ખાતર આપવાનો સાચો સમય?"]
        )
    elif lang == "hi":
        return (
            "🌾 **नमस्ते किसान भाई!**\n\n"
            "आपका प्रश्न प्राप्त हुआ है। सटीक समाधान पाने के लिए कृपया ये विवरण बताएं:\n"
            "- फसल का नाम (जैसे टमाटर, कपास, गेहूं, आलू)\n"
            "- पत्तियों या फल पर दिखने वाले लक्षण (दाग, पीलापन, कीड़े)\n"
            "- फसल कितने दिन की है\n\n"
            "इन विवरणों के आधार पर हम आपको सटीक कीटनाशक/फफूंदनाशी की मात्रा और जैविक उपाय बता सकेंगे।",
            ["टमाटर में पत्तियां पीली क्यों हो रही हैं?", "नीम तेल का स्प्रे कैसे करें?", "खाद देने का सही समय क्या है?"]
        )
    else:
        return (
            "🌾 **Hello Farmer Friend!**\n\n"
            "I received your agricultural inquiry. To give you the most accurate dosage and remedy, please share:\n"
            "- Crop name (e.g., Tomato, Cotton, Wheat, Potato)\n"
            "- Visual symptoms (yellowing, circular spots, curling leaves, pests)\n"
            "- Age of the crop\n\n"
            "Based on this, I will recommend both chemical and organic treatments with precise dosages per liter.",
            ["How to treat yellowing tomato leaves?", "How to use neem oil effectively?", "When is the best time to apply NPK?"]
        )


async def call_gemini_api(message: str, history: List[ChatMessage], crop: str = None, lang_hint: str = "auto") -> Tuple[str, List[str]]:
    """Calls Google Gemini API with system instructions and chat history."""
    if not settings.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured")

    contents = []

    # Insert historical context
    for msg in history[-6:]:  # Keep last 6 messages for context
        role = "model" if msg.role == "assistant" else "user"
        contents.append({"role": role, "parts": [{"text": msg.content}]})

    # Prepare user query with crop context
    prompt_text = message
    if crop:
        prompt_text = f"[Crop: {crop}] {message}"
    contents.append({"role": "user", "parts": [{"text": prompt_text}]})

    payload = {
        "systemInstruction": {
            "parts": [{"text": SYSTEM_INSTRUCTION}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 900,
        }
    }

    url = f"{GEMINI_ENDPOINT}?key={settings.GEMINI_API_KEY}"

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(url, json=payload)
        resp.raise_for_status()
        data = resp.json()

        reply = data["candidates"][0]["content"]["parts"][0]["text"]

        # Generate follow-up suggestions based on detected language
        lang = detect_language(message, lang_hint)
        if lang == "gu":
            followups = ["આ દવાનો છંટકાવ કેટલા દિવસે ફરી કરવો?", "જૈવિક વિકલ્પ જણાવો", "શું આની સાથે ખાતર આપી શકાય?"]
        elif lang == "hi":
            followups = ["इस दवा का छिड़काव कितने दिनों बाद दोहराएं?", "इसका कोई जैविक/देसी उपचार बताएं", "क्या इसके साथ कोई टॉनिक मिला सकते हैं?"]
        else:
            followups = ["When should I repeat this spray?", "Are there organic alternatives?", "Can I mix foliar fertilizer with this?"]

        return reply, followups


async def get_assistant_reply(
    message: str,
    history: List[ChatMessage] = None,
    crop: str = None,
    language: str = "auto"
) -> ChatResponse:
    """
    Main entry point for Module 2:
    1. Tries Gemini API if key is present.
    2. Gracefully falls back to KrishiOS Agronomy Knowledge Engine if API is unavailable.
    """
    history = history or []
    detected_lang = detect_language(message, language)

    # 1. Try Gemini LLM if configured
    if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY.strip():
        try:
            reply_text, followups = await call_gemini_api(message, history, crop, detected_lang)
            return ChatResponse(
                reply=reply_text,
                detected_language=detected_lang,
                suggested_followups=followups,
                source="gemini_ai"
            )
        except Exception as e:
            # Log error internally and smoothly fall back
            print(f"[Assistant Service] Gemini API call failed ({e}), using offline knowledge engine.")

    # 2. Intelligent Offline Fallback
    reply_text, followups = _find_offline_match(message, crop)
    return ChatResponse(
        reply=reply_text,
        detected_language=detected_lang,
        suggested_followups=followups,
        source="krishios_knowledge_engine"
    )
