import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Bot,
  FileText,
  Mic,
  MicOff,
  MessageSquarePlus,
  Send,
  ShieldAlert,
  Sparkles,
  StopCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useOffline } from '../../context/OfflineContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface AssistantSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

interface HealthSummary {
  patientId: string;
  date: string;
  language: 'en' | 'hi' | 'mr';
  conversation: Message[];
  complaint: string;
  symptoms: string;
  duration: string;
  severity: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  recommendations: string[];
}

const CHAT_HISTORY_KEY = 'arogya_setu_ai_history_v1';
const CHAT_SUMMARY_KEY = 'arogya_setu_ai_health_summary_v1';

const suggestedQuestions: Record<'en' | 'hi' | 'mr', string[]> = {
  en: ['I have a fever', 'I have a cough', 'My blood pressure is high', 'Diabetes information', 'Nearby hospital', 'Government health schemes', 'Contact doctor'],
  hi: ['मुझे बुखार है', 'मुझे खांसी है', 'मेरे BP में वृद्धि है', 'मधुमेह के बारे में जानकारी', 'पास का अस्पताल', 'सरकारी स्वास्थ्य योजना', 'डॉक्टर से संपर्क करें'],
  mr: ['मला ताप आला आहे', 'मला खोकला आहे', 'माझे BP वाढले आहे', 'मधुमेहाबद्दल माहिती', 'जवळचे हॉस्पिटल', 'सरकारी आरोग्य योजना', 'डॉक्टरशी संपर्क']
};

const languageNames: Record<'en' | 'hi' | 'mr', string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' };
const voiceLanguages: Record<'en' | 'hi' | 'mr', string> = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };

const emergencyPatterns = [
  'chest pain', 'chest', 'shortness of breath', 'breathlessness', 'difficulty breathing', 'severe bleeding', 'unconscious',
  'fainting', 'stroke', 'seizure', 'collapse', 'severe allergy', 'anaphylaxis', 'very high fever', 'blue lips', 'सीने में दर्द', 'छाती', 'सांस लेने में कठिनाई', 'रक्तस्त्राव', 'बेहोशी', 'छातीतील वेदना', 'सांस घ्यायला त्रास', 'भयंकर ताप'
];

const buildWelcomeMessage = (language: 'en' | 'hi' | 'mr'): Message => {
  if (language === 'mr') {
    return { id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`, sender: 'bot', text: 'नमस्कार! मी आरोग्य सेतू AI हेल्थ असिस्टंट आहे. आज आपल्याला कोणत्या आरोग्य समस्येची चिंता आहे? ताप, खोकला, छातीत दुखणे किंवा इतर लक्षणे सांगा.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  }
  if (language === 'hi') {
    return { id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`, sender: 'bot', text: 'नमस्ते! मैं आरोग्य सेतु AI हेल्थ असिस्टेंट हूँ। आज आपको कौन सी स्वास्थ्य समस्या है? बुखार, खांसी, सीने में दर्द या अन्य लक्षण बताएं।', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  }
  return { id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`, sender: 'bot', text: 'Hello! I am the Arogya Setu AI Health Assistant. Tell me what symptoms you are experiencing today, including fever, cough, chest discomfort, or other concerns.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
};

const createNewSession = (language: 'en' | 'hi' | 'mr'): AssistantSession => ({
  id: `session-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: language === 'mr' ? 'नवीन संभाषण' : language === 'hi' ? 'नया वार्तालाप' : 'New conversation',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [buildWelcomeMessage(language)]
});

const normalizeText = (text: string) => text.toLowerCase().replace(/[^a-zA-Z0-9\s\u0900-\u097F]/g, ' ');

const getRiskLevel = (text: string): 'LOW' | 'MEDIUM' | 'HIGH' => {
  const normalized = normalizeText(text);
  const emergencyMatch = emergencyPatterns.some(keyword => normalized.includes(keyword));
  if (emergencyMatch) return 'HIGH';
  if (/(fever|ताप|बुखार|cough|खांसी|खोकला|headache|दर्द|血 pressure|bp|blood pressure|रक्तचाप|सUGAR|मधुमेह)/i.test(normalized)) {
    return 'MEDIUM';
  }
  return 'LOW';
};

const getBotReply = (userText: string, language: 'en' | 'hi' | 'mr') => {
  const normalized = normalizeText(userText);
  const isEmergency = emergencyPatterns.some(keyword => normalized.includes(keyword));
  const isFever = /(fever|ताप|बुखार|high temperature)/i.test(normalized);
  const isCough = /(cough|खांसी|खोकला)/i.test(normalized);
  const isHeadache = /(headache|सिरदर्द|head)/i.test(normalized);
  const isStomachPain = /(stomach|belly|pain|पेट|उदर)/i.test(normalized);
  const isBloodPressure = /(bp|blood pressure|रक्तचाप|blod pressure)/i.test(normalized);
  const isDiabetes = /(diabetes|मधुमेह|sugar)/i.test(normalized);
  const isMedicine = /(medicine|medicines|disease|औषध|दवा)/i.test(normalized);
  const isScheme = /(scheme|plan|योजना|सरकारी)/i.test(normalized);
  const isHospital = /(hospital|clinic|nearest|जवळचे|अस्पताल|हॉस्पिटल)/i.test(normalized);
  const isDoctor = /(doctor|physician|डॉक्टर|वैद्य)/i.test(normalized);

  const followUp = language === 'mr'
    ? 'तुमच्या आजाराबद्दल काही मूलभूत माहिती देणे उपयुक्त ठरेल: लक्षण किती दिवसांपासून आहेत? तापमान किती आहे? श्वास घेण्यास त्रास आहे का?'
    : language === 'hi'
    ? 'आपके स्वास्थ्य के बारे में कुछ मूल जानकारी मददगार होगी: लक्षण कितने दिनों से हैं? तापमान कितना है? क्या सांस लेने में परेशानी है?' 
    : 'A few details would help: how long the symptoms have been present, your temperature, and whether breathing is difficult.';

  if (isEmergency) {
    const emergencyText = language === 'mr'
      ? 'Emergency: कृपया तात्काळ १०८ रुग्णवाहिका कॉल करा किंवा नजीकच्या रुग्णालयात जा. गंभीर लक्षणांमध्ये स्वतःची उपचारपद्धत करू नका.'
      : language === 'hi'
      ? 'Emergency: कृपया तुरंत १०८ एम्बुलेंस को कॉल करें या निकटतम अस्पताल जाएं। गंभीर लक्षणों के लिए स्वयं उपचार न करें।'
      : 'Emergency: Please contact emergency medical services or visit the nearest hospital immediately. Do not attempt self-treatment for serious symptoms.';

    return { text: `${emergencyText} ${followUp}`, risk: 'HIGH' as const, nextStep: language === 'mr' ? 'तत्काळ १०८ किंवा नजीकचे रुग्णालय. सांस/छातीच्या लक्षणांसाठी त्वरित तपासणी करा.' : language === 'hi' ? 'तुरंत १०८ या निकटतम अस्पताल जाएं। सांस/सीने के दर्द के लिए तुरंत परीक्षण करें।' : 'Call 108 or go to the nearest emergency department immediately. Do not delay evaluation for breathing or chest symptoms.' };
  }

  if (isFever) {
    return { text: language === 'mr' ? 'ताप असल्यास भरपूर पाणी प्या, आराम करा, आणि तापमान नियमितपणे मोजा. जर ताप ३ दिवसांपेक्षा जास्त टिकला, खोकला किंवा श्वास घेण्यास त्रास झाला, तर प्राथमिक आरोग्य केंद्र किंवा डॉक्टराशी संपर्क करा.' : language === 'hi' ? 'बुखार होने पर पर्याप्त पानी पिएं, आराम करें और शरीर का तापमान नियमित रूप से मापें। यदि बुखार 3 दिनों से अधिक रहता है, खांसी या सांस की तकलीफ है, तो PHC या डॉक्टर से परामर्श लें।' : 'For fever, drink fluids, rest, and monitor temperature. If fever lasts more than 3 days or you have cough or breathing difficulty, consult a doctor or nearest PHC.', risk: 'MEDIUM' as const, nextStep: language === 'mr' ? 'पीएचसी किंवा आरोग्य सेविकेशी संपर्क करा.' : language === 'hi' ? 'PHC या स्वास्थ्य कार्यकर्ता से संपर्क करें।' : 'Contact your PHC or local health worker for review.' };
  }

  if (isCough) {
    return { text: language === 'mr' ? 'खोकल्यास पाणी, गरम पाणी, आणि आराम करा. जर खोकल्याबरोबर ताप, श्वास घेण्यास त्रास किंवा छातीत दुखणे असेल, तर डॉक्टरांची तपासणी करणे योग्य आहे.' : language === 'hi' ? 'खांसी में पर्याप्त पानी पिएं, गर्म पानी लें और आराम करें। यदि खांसी के साथ बुखार, सांस की तकलीफ या सीने में दर्द हो, तो डॉक्टर से परामर्श लें।' : 'For cough, rest, warm fluids, and hydration are helpful. If it comes with fever, breathing difficulty, or chest pain, seek medical assessment promptly.', risk: 'MEDIUM' as const, nextStep: language === 'mr' ? 'दोन दिवसांपेक्षा जास्त खोकला असेल तर डॉक्टरांकडे जा.' : language === 'hi' ? 'यदि खांसी 2 दिनों से अधिक रहती है, तो डॉक्टर से मिलें।' : 'If the cough lasts more than 2 days or worsens, consult a doctor.' };
  }

  if (isHeadache) {
    return { text: language === 'mr' ? 'सिरदुखीवर विश्रांती, हवं असल्यास आरामदायक पाणी घ्या. जर भयंकर वेदना, उलट्या, चक्कर येणे किंवा एकाग्रता कमी झाली तर डॉक्टरांची तपासणी करा.' : language === 'hi' ? 'सिरदर्द में आराम करें और पर्याप्त तरल पदार्थ पिएं। अगर तेज दर्द, उल्टी, चक्कर या कमजोरी है, तो डॉक्टर से सलाह लें।' : 'For headache, rest and hydration are useful. If it is severe, accompanied by vomiting, dizziness, or weakness, seek medical evaluation.', risk: 'MEDIUM' as const, nextStep: language === 'mr' ? 'अत्यंत तीव्र वेदना किंवा इतर लक्षणे असल्यास तपासणी करा.' : language === 'hi' ? 'अत्यधिक दर्द या अन्य लक्षणों के लिए चिकित्सा जांच करें।' : 'Seek professional assessment if the pain is severe or accompanied by other symptoms.' };
  }

  if (isStomachPain) {
    return { text: language === 'mr' ? 'पोटदुखीवर हळूच जेवण घ्या, पाणी प्या, आणि आराम करा. जर उलट्या, रक्त, ज्वर, किंवा तीव्र दुखणे असेल तर तात्काळ डॉक्टरांशी संपर्क करा.' : language === 'hi' ? 'पेट दर्द में हल्का भोजन करें, पानी पिएं और आराम करें। अगर उल्टी, रक्त, बुखार या तेज दर्द हो, तो तुरंत डॉक्टर से संपर्क करें।' : 'For stomach pain, rest, hydration, and light meals can help. If there is vomiting, blood, fever, or severe pain, seek urgent care.', risk: 'MEDIUM' as const, nextStep: language === 'mr' ? 'उलट्या किंवा रक्त दिसल्यास तत्काळ तपासणी करा.' : language === 'hi' ? 'अगर उल्टी या रक्त दिखाई दे तो तुरंत परीक्षण करें।' : 'Seek urgent assessment if vomit, blood, or severe pain occurs.' };
  }

  if (isBloodPressure) {
    return { text: language === 'mr' ? 'रक्तदाब नियंत्रित ठेवण्यासाठी नियमितपणे दैनंदिन जीवनशैली, Sodium कमी, व्यायाम, आणि औषधे योग्य पद्धतीने घ्या. अधिक माहिती किंवा BP रीडिंग समजण्यासाठी डॉक्टरांची तपासणी करा.' : language === 'hi' ? 'रक्तचाप को नियंत्रित रखने के लिए नियमित जीवनशैली, कम नमक, व्यायाम और दवाओं का सही उपयोग करें। BP रीडिंग के लिए डॉक्टर से सलाह लें।' : 'For blood pressure concerns, follow routine lifestyle measures, reduce salt, stay active, and review medication use with a clinician for accurate control.', risk: 'MEDIUM' as const, nextStep: language === 'mr' ? 'रक्तदाब खूप जास्त असल्यास तात्काळ तपासणी करा.' : language === 'hi' ? 'अगर रक्तचाप बहुत अधिक है तो तुरंत जांच करें।' : 'If readings are very high or symptoms worsen, seek urgent clinical review.' };
  }

  if (isDiabetes) {
    return { text: language === 'mr' ? 'मधुमेहाबद्दल नियमित आहार, शारीरिक सक्रियता, आणि औषधांचे वेळेवर सेवन आवश्यक आहे. ब्लड शुगर तपासणी नियमित करा आणि डॉक्टरांचा सल्ला घ्या.' : language === 'hi' ? 'मधुमेह को नियंत्रित करने के लिए नियमित आहार, शारीरिक गतिविधि और दवाओं का सही समय पर उपयोग करें। रक्त शर्करा परीक्षण और डॉक्टर के परामर्श से मार्गदर्शन लें।' : 'For diabetes, maintain a balanced diet, regular activity, medication adherence, and routine blood sugar checks. Review with your doctor if readings remain high.', risk: 'MEDIUM' as const, nextStep: language === 'mr' ? 'कमी शर्करा किंवा अस्थिरतेचे लक्षण असल्यास डॉक्टरांची तपासणी करा.' : language === 'hi' ? 'यदि शुगर कम या अस्थिर महसूस हो तो डॉक्टर से मिलें।' : 'See a doctor if you have low sugar symptoms or persistent high readings.' };
  }

  if (isMedicine) {
    return { text: language === 'mr' ? 'औषधे घेत असताना डोस, वेळ, आणि सह-औषधांबद्दल डॉक्टरांची सूचना समजून घ्या. स्वतःची दवा बदलू नका.' : language === 'hi' ? 'दवा लेते समय सही खुराक, समय और अन्य दवाओं के बारे में डॉक्टर की सलाह लें। बिना सलाह के दवा नहीं बदलें।' : 'When taking medicines, follow the prescribed dose, timing, and avoid changing medications without medical advice.', risk: 'LOW' as const, nextStep: language === 'mr' ? 'दुष्परिणाम किंवा ओव्हरडोस असल्यास त्वरित आरोग्य सेवेशी संपर्क करा.' : language === 'hi' ? 'साइड इफेक्ट या ओवरडोज होने पर तुरंत स्वास्थ्य सेवा से संपर्क करें।' : 'Seek care immediately if there are side effects or concern about overdose.' };
  }

  if (isScheme) {
    return { text: language === 'mr' ? 'सरकारी आरोग्य योजना आणि लाभांसाठी स्थानिक PHC, ASHA, किंवा सरकारी आरोग्य केंद्राशी संपर्क करा. योजना पात्रता आणि अर्ज प्रक्रिया तपासा.' : language === 'hi' ? 'सरकारी स्वास्थ्य योजनाओं और लाभों के लिए स्थानीय PHC, ASHA या सरकारी स्वास्थ्य केंद्र से संपर्क करें। पात्रता और आवेदन प्रक्रिया देखें।' : 'For government health schemes, contact your nearest PHC, ASHA worker, or government health center for application and eligibility guidance.', risk: 'LOW' as const, nextStep: language === 'mr' ? 'संबंधित योजना दस्तावेज पत्रांची पडताळणी करा.' : language === 'hi' ? 'उपयुक्त योजना के दस्तावेज़ सत्यापित करें।' : 'Verify required documents and scheme eligibility at your local facility.' };
  }

  if (isHospital || isDoctor) {
    return { text: language === 'mr' ? 'जवळचे सरकारी आरोग्य केंद्र किंवा रुग्णालयाची तपासणी करा. आपल्यासाठी तात्काळ भेट, टेलिकन्सल्टेशन, किंवा रेफरल उपलब्ध आहे.' : language === 'hi' ? 'निकटतम सरकारी स्वास्थ्य केंद्र या अस्पताल से संपर्क करें। टेलीकंसल्टेशन या रेफरल भी उपलब्ध है।' : 'You can reach the nearest public health center or hospital for assessment. Teleconsultation or referral support is also available.', risk: 'LOW' as const, nextStep: language === 'mr' ? 'जवळचे हॉस्पिटल किंवा PHC भेट द्या.' : language === 'hi' ? 'निकटतम अस्पताल या PHC जाएं।' : 'Visit the nearest hospital or PHC for evaluation.' };
  }

  return { text: language === 'mr' ? 'सामान्य आरोग्य सल्ला: विश्रांती, पुरेसे पाणी, योग्य आहार आणि वेळेवर तपासणी महत्त्वाची आहे. जर लक्षणे टिकलीत राहिली तर डॉक्टरांशी संपर्क करा.' : language === 'hi' ? 'सामान्य स्वास्थ्य सलाह: आराम, पर्याप्त पानी, स्वस्थ आहार और समय पर जांच करें। यदि लक्षण बने रहते हैं तो डॉक्टर से परामर्श लें।' : 'General health guidance: rest, hydration, balanced nutrition, and regular follow-up are important. If symptoms persist or worsen, consult a qualified doctor.', risk: 'LOW' as const, nextStep: language === 'mr' ? 'जर लक्षणे वाढली तर डॉक्टरांची तपासणी करा.' : language === 'hi' ? 'यदि लक्षण खराब हों तो डॉक्टर से परामर्श लें।' : 'If symptoms worsen, book a consultation with a doctor.' };
};

const buildSummaryFromSession = (session: AssistantSession, language: 'en' | 'hi' | 'mr'): HealthSummary => {
  const userMessages = session.messages.filter(message => message.sender === 'user');
  const complaint = userMessages.at(-1)?.text?.trim() || 'General health query';
  const symptoms = Array.from(new Set(userMessages.flatMap(message => normalizeText(message.text).split(/\s+/)).filter(word => word.length > 3))).slice(0, 8).join(', ') || 'General wellness';
  const duration = /\b(\d+)\s*(day|days|week|weeks|month|months|दिवस|हफ्ते|महिना|महीने)\b/i.test(complaint) ? complaint.match(/\b(\d+)\s*(day|days|week|weeks|month|months|दिवस|हफ्ते|महिना|महीने)\b/i)?.[0] || 'Not specified' : 'Not specified';
  const riskLevel = getRiskLevel(complaint);

  const recommendations = language === 'mr'
    ? ['आरोग्य सेवा, डॉक्टरांचा सल्ला, आणि आवश्यक तपासणी करा.', 'ताप, श्वास, किंवा तीव्र लक्षणांवर लक्ष ठेवा.', 'सारांश डॉक्टरांच्या नोंदीमध्ये सेव्ह झाला आहे.']
    : language === 'hi'
    ? ['स्वास्थ्य सेवा और डॉक्टर से परामर्श लें।', 'बुखार, सांस या तेज दर्द पर ध्यान दें।', 'सारांश डॉक्टर के रिकॉर्ड में सेव किया गया है।']
    : ['Follow medical advice and schedule appropriate care.', 'Monitor fever, breathing, or severe pain closely.', 'Summary saved for clinician review.'];

  const summaryText = language === 'mr'
    ? `आरोग्य तपासणी सारांश: मुख्य तक्रार ${complaint}. लक्षणे: ${symptoms}. कालावधी: ${duration}. जोखीम: ${riskLevel}. पुढील कृती: ${riskLevel === 'HIGH' ? 'तत्काळ रुग्णालय/१०८' : 'डॉक्टरांना भेट द्या किंवा PRIMARY AROGYA केंद्रावर तपासणी करा.'}`
    : language === 'hi'
    ? `स्वास्थ्य सारांश: मुख्य शिकायत ${complaint}. लक्षण: ${symptoms}. अवधि: ${duration}. जोखिम: ${riskLevel}. अगला कदम: ${riskLevel === 'HIGH' ? 'तुरंत अस्पताल/१०८' : 'डॉक्टर से परामर्श करें या PHC पर जांच करें।'}`
    : `Health summary: complaint ${complaint}. Symptoms: ${symptoms}. Duration: ${duration}. Risk: ${riskLevel}. Recommended action: ${riskLevel === 'HIGH' ? 'Immediate emergency assessment / 108' : 'Consult a clinician or PHC for follow-up.'}`;

  return {
    patientId: 'ABHA-2026-01',
    date: new Date().toISOString(),
    language,
    conversation: session.messages,
    complaint,
    symptoms,
    duration,
    severity: riskLevel === 'HIGH' ? 'Severe' : riskLevel === 'MEDIUM' ? 'Moderate' : 'Mild',
    riskLevel,
    summary: summaryText,
    recommendations
  };
};

export const AiHealthAssistant: React.FC = () => {
  const { language, setLanguage } = useAccessibility();
  const { isOnline } = useOffline();
  const [chatSessions, setChatSessions] = useState<AssistantSession[]>(() => {
    if (typeof window === 'undefined') return [createNewSession('en')];
    try {
      const saved = window.localStorage.getItem(CHAT_HISTORY_KEY);
      if (!saved) return [createNewSession(language as 'en' | 'hi' | 'mr')];
      const parsed = JSON.parse(saved) as AssistantSession[];
      return parsed.length ? parsed : [createNewSession(language as 'en' | 'hi' | 'mr')];
    } catch {
      return [createNewSession(language as 'en' | 'hi' | 'mr')];
    }
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'new';
    try {
      return window.localStorage.getItem(`${CHAT_HISTORY_KEY}-active`) || chatSessions[0]?.id || 'new';
    } catch {
      return chatSessions[0]?.id || 'new';
    }
  });
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [recentSummary, setRecentSummary] = useState<HealthSummary | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentLanguage = useMemo<'en' | 'hi' | 'mr'>(() => language as 'en' | 'hi' | 'mr', [language]);
  const activeSession = chatSessions.find(session => session.id === activeSessionId) || chatSessions[0] || createNewSession(currentLanguage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatSessions));
      if (activeSessionId) window.localStorage.setItem(`${CHAT_HISTORY_KEY}-active`, activeSessionId);
    }
  }, [chatSessions, activeSessionId]);

  useEffect(() => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionCtor) setVoiceSupported(true);
    return () => {
      recognitionRef.current?.stop();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages.length, isTyping]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(CHAT_SUMMARY_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as HealthSummary[];
          setRecentSummary(parsed[0] || null);
        } catch {
          setRecentSummary(null);
        }
      }
    }
  }, [activeSessionId]);

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLanguages[currentLanguage];
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (!voiceSupported) {
      setStatusMessage(language === 'mr' ? 'ब्राउझर हा आवाज ओळखण्यास सपोर्ट करत नाही.' : language === 'hi' ? 'इस ब्राउज़र में आवाज पहचान उपलब्ध नहीं है।' : 'This browser does not support speech recognition.');
      return;
    }

    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = voiceLanguages[currentLanguage];
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setStatusMessage(language === 'mr' ? 'माइक सक्रिय आहे...' : language === 'hi' ? 'माइक्रोफोन सक्रिय है...' : 'Microphone active...');
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((result: any) => result[0]?.transcript ?? '').join(' ').trim();
      if (transcript) setInputVal(transcript);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setStatusMessage(language === 'mr' ? `व्हॉइस ओळखण्यात समस्या आली: ${event?.error || 'unknown'}. कृपया मॅन्युअली टाइप करा.` : language === 'hi' ? `वॉयस पहचान में समस्या: ${event?.error || 'unknown'}. कृपया मैन्युअल रूप से लिखें।` : `Voice recognition issue: ${event?.error || 'unknown'}. Please type your message manually.`);
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setStatusMessage(language === 'mr' ? 'कृपया संदेश टाका.' : language === 'hi' ? 'कृपया संदेश लिखें।' : 'Please enter a message.');
      return;
    }

    const currentMessages = activeSession?.messages || [];
    const userMessage: Message = { id: `user-${Date.now()}`, sender: 'user', text: trimmed, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedMessages = [...currentMessages, userMessage];

    setChatSessions(prev => prev.map(session => session.id === activeSessionId ? { ...session, messages: updatedMessages, updatedAt: new Date().toISOString() } : session));
    setInputVal('');
    setIsTyping(true);
    setStatusMessage(language === 'mr' ? 'आरोग्य सहाय्यक विचार करत आहे...' : language === 'hi' ? 'स्वास्थ्य सहायक विचार कर रहा है...' : 'Assistant is evaluating your query...');

    window.setTimeout(() => {
      const reply = getBotReply(trimmed, currentLanguage);
      const replyMessage: Message = { id: `bot-${Date.now()}`, sender: 'bot', text: `${reply.text} ${reply.nextStep}`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      const finalMessages = [...updatedMessages, replyMessage];

      setChatSessions(prev => prev.map(session => session.id === activeSessionId ? { ...session, messages: finalMessages, updatedAt: new Date().toISOString() } : session));
      setIsTyping(false);
      setStatusMessage(language === 'mr' ? 'सल्ला तयार झाला.' : language === 'hi' ? 'सुझाव तैयार है।' : 'Response ready.');
      if (reply.risk === 'HIGH') {
        speakResponse(language === 'mr' ? 'आपत्काल सेवा आवश्यक आहे. कृपया १०८ वर कॉल करा किंवा नजीकच्या रुग्णालयात जा.' : language === 'hi' ? 'आपातकालीन सेवा आवश्यक है। कृपया १०८ पर कॉल करें या निकटतम अस्पताल जाएं।' : 'Emergency care is needed. Please contact 108 or the nearest hospital.');
      } else {
        speakResponse(reply.text);
      }
    }, 900);
  };

  const handleNewConversation = () => {
    const session = createNewSession(currentLanguage);
    setChatSessions(prev => [session, ...prev]);
    setActiveSessionId(session.id);
    setInputVal('');
    setStatusMessage(language === 'mr' ? 'नवीन संभाषण सुरू झाले.' : language === 'hi' ? 'नया संवाद शुरू हुआ है।' : 'New conversation started.');
  };

  const handleGenerateSummary = () => {
    if (!activeSession || activeSession.messages.length <= 1) {
      setStatusMessage(language === 'mr' ? 'सारांश तयार करण्यासाठी प्रथम प्रश्न विचारा.' : language === 'hi' ? 'सारांश बनाने के लिए पहले प्रश्न पूछें।' : 'Ask a health question first to generate a summary.');
      return;
    }

    const summary = buildSummaryFromSession(activeSession, currentLanguage);
    const saved = (() => {
      try {
        const existing = JSON.parse(window.localStorage.getItem(CHAT_SUMMARY_KEY) || '[]') as HealthSummary[];
        return [summary, ...existing].slice(0, 6);
      } catch {
        return [summary];
      }
    })();

    window.localStorage.setItem(CHAT_SUMMARY_KEY, JSON.stringify(saved));
    setRecentSummary(summary);
    setStatusMessage(language === 'mr' ? 'आरोग्य सारांश सेव्ह झाला आहे.' : language === 'hi' ? 'स्वास्थ्य सारांश सेव हो गया है।' : 'Health summary saved successfully.');
  };

  return (
    <div className="bg-white border border-gov-gray-300 rounded-xl shadow-sm overflow-hidden flex flex-col h-[760px] w-full">
      <div className="bg-gov-navy text-white px-4 py-3 border-b border-gov-navyDark">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gov-saffron text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">AROGYA SETU AI HEALTH ASSISTANT</div>
              <div className="text-sm font-bold text-white">
                {language === 'mr' ? 'तुमचा बहुभाषिक आरोग्य सहकारी' : language === 'hi' ? 'आपका बहुभाषी डिजिटल स्वास्थ्य साथी' : 'Your multilingual digital health companion'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {isOnline ? (language === 'mr' ? 'ऑनलाइन' : language === 'hi' ? 'ऑनलाइन' : 'ONLINE') : (language === 'mr' ? 'ऑफलाइन' : language === 'hi' ? 'ऑफलाइन' : 'OFFLINE')}
            </span>

            <select value={language} onChange={(event) => setLanguage(event.target.value as 'en' | 'hi' | 'mr')} className="rounded border border-white/20 bg-white/10 px-2 py-1.5 text-[10px] text-white outline-none focus:ring-1 focus:ring-amber-300" aria-label="Select language">
              {Object.entries(languageNames).map(([code, label]) => (
                <option key={code} value={code} className="text-gov-navy">{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <aside className="hidden w-72 border-r border-gov-gray-200 bg-slate-50 p-3 md:flex md:flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-gov-gray-200">
            <div className="flex items-center gap-2 text-gov-navy font-bold text-xs uppercase">
              <MessageSquarePlus className="h-4 w-4 text-gov-saffron" />
              {language === 'mr' ? 'पूर्वीचे संभाषणे' : language === 'hi' ? 'पिछले चैट' : 'Recent conversations'}
            </div>
            <button type="button" onClick={handleNewConversation} className="rounded border border-gov-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-gov-navy hover:bg-slate-100">
              {language === 'mr' ? 'नवीन' : language === 'hi' ? 'नया' : 'New'}
            </button>
          </div>

          <div className="mt-3 space-y-2 overflow-y-auto pr-1">
            {chatSessions.map(session => (
              <button key={session.id} type="button" onClick={() => setActiveSessionId(session.id)} className={`w-full rounded-lg border px-2 py-2 text-left transition-colors ${session.id === activeSessionId ? 'border-gov-navy bg-gov-navy text-white' : 'border-gov-gray-200 bg-white text-slate-700 hover:border-gov-gray-300'}`}>
                <div className="text-[10px] font-bold uppercase opacity-75">{new Date(session.updatedAt).toLocaleDateString([], { day: '2-digit', month: 'short' })}</div>
                <div className="mt-1 text-xs font-medium">{session.title}</div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between gap-2 border-b border-gov-gray-200 bg-slate-50 px-4 py-2 text-[10px] text-slate-600">
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 text-gov-navy" />
              <span className="font-semibold uppercase tracking-wider">
                {language === 'mr' ? 'आरोग्य वाचून घेतले जात आहे' : language === 'hi' ? 'स्वास्थ्य मार्गदर्शन सक्रिय है' : 'Health guidance mode active'}
              </span>
            </div>

            <button type="button" onClick={handleGenerateSummary} className="rounded bg-gov-navy px-2.5 py-1.5 font-bold text-white hover:bg-gov-navyLight">
              {language === 'mr' ? 'आरोग्य सारांश तयार करा' : language === 'hi' ? 'स्वास्थ्य सारांश बनाएं' : 'Generate Health Summary'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gov-gray-50 p-4">
            <div className="mb-3 flex items-start gap-2 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{language === 'mr' ? 'ही सेवा नैदानिक निदान नाही. गंभीर लक्षणांचे वेळी आपत्कालीन सेवा घ्या.' : language === 'hi' ? 'यह सेवा निदान नहीं है; गंभीर लक्षणों में आपातकालीन सहायता लें।' : 'This is informational guidance only; contact emergency services for severe symptoms.'}</span>
            </div>

            {activeSession?.messages.map(message => (
              <div key={message.id} className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${message.sender === 'user' ? 'bg-gov-navy text-white rounded-br-md' : 'bg-white text-gov-gray-800 border border-gov-gray-200 rounded-bl-md'}`}>
                  <div className="leading-relaxed whitespace-pre-line">{message.text}</div>
                  <div className={`mt-1 text-[10px] ${message.sender === 'user' ? 'text-slate-200' : 'text-slate-500'}`}>{message.timestamp}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl border border-gov-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                  <div className="flex items-center gap-2 text-gov-gray-700">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gov-navy [animation-delay:-0.2s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gov-navy [animation-delay:-0.1s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gov-navy" />
                    </div>
                    <span>{language === 'mr' ? 'आरोग्य सहाय्यक विचार करत आहे...' : language === 'hi' ? 'स्वास्थ्य सहायक सोच रहा है...' : 'Assistant is thinking...'}</span>
                  </div>
                </div>
              </div>
            )}

            {recentSummary && (
              <div className="mt-4 rounded-xl border-2 border-gov-navy bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 text-gov-navy font-bold uppercase text-[11px]">
                    <FileText className="h-4 w-4 text-gov-saffron" />
                    {language === 'mr' ? 'आरोग्य सारांश' : language === 'hi' ? 'स्वास्थ्य सारांश' : 'Health Assistant Summary'}
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${recentSummary.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : recentSummary.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{recentSummary.riskLevel}</span>
                </div>

                <div className="mt-3 space-y-2 text-[11px] text-slate-700">
                  <div><span className="font-bold text-slate-500">{language === 'mr' ? 'तक्रार:' : language === 'hi' ? 'शिकायत:' : 'Complaint:'}</span> {recentSummary.complaint}</div>
                  <div><span className="font-bold text-slate-500">{language === 'mr' ? 'लक्षणे:' : language === 'hi' ? 'लक्षण:' : 'Symptoms:'}</span> {recentSummary.symptoms}</div>
                  <div><span className="font-bold text-slate-500">{language === 'mr' ? 'कालावधी:' : language === 'hi' ? 'अवधि:' : 'Duration:'}</span> {recentSummary.duration}</div>
                  <div><span className="font-bold text-slate-500">{language === 'mr' ? 'जोखीम स्तर:' : language === 'hi' ? 'जोखिम स्तर:' : 'Risk level:'}</span> {recentSummary.riskLevel}</div>
                  <div><span className="font-bold text-slate-500">{language === 'mr' ? 'सल्ला:' : language === 'hi' ? 'सलाह:' : 'Suggested action:'}</span> {recentSummary.summary}</div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gov-gray-200 bg-white px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedQuestions[currentLanguage].map(item => (
                <button key={item} type="button" onClick={() => setInputVal(item)} className="rounded-full border border-gov-gray-300 bg-white px-3 py-1.5 text-[11px] font-medium text-gov-navy hover:border-gov-navy hover:bg-slate-50 transition-colors">
                  {item}
                </button>
              ))}
            </div>

            {statusMessage && <div className="mb-3 rounded border border-sky-200 bg-sky-50 px-2.5 py-2 text-[11px] text-sky-800">{statusMessage}</div>}

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button type="button" onClick={startListening} className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${isListening ? 'border-rose-600 bg-rose-100 text-rose-700' : 'border-gov-gray-300 bg-gov-gray-100 text-gov-gray-700 hover:bg-gov-gray-200'}`} title={language === 'mr' ? 'व्हॉइस इनपुट' : language === 'hi' ? 'वॉयस इनपुट' : 'Voice input'}>
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <button type="button" onClick={isListening ? stopListening : undefined} className={`flex h-11 w-11 items-center justify-center rounded-full border ${isListening ? 'border-gov-navy bg-gov-navy text-white' : 'border-gov-gray-200 bg-slate-50 text-slate-500'}`} title={language === 'mr' ? 'ऐकणे थांबवा' : language === 'hi' ? 'रिकॉग्निशन रोकें' : 'Stop listening'}>
                <StopCircle className="h-4 w-4" />
              </button>

              <button type="button" onClick={isSpeaking ? stopSpeaking : undefined} className={`flex h-11 w-11 items-center justify-center rounded-full border ${isSpeaking ? 'border-gov-saffron bg-gov-saffron text-white' : 'border-gov-gray-200 bg-slate-50 text-slate-500'}`} title={language === 'mr' ? 'भाषण थांबवा' : language === 'hi' ? 'आवाज़ बंद करें' : 'Stop speaking'}>
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <input value={inputVal} onChange={(event) => setInputVal(event.target.value)} placeholder={language === 'mr' ? 'तुमची लक्षणे किंवा प्रश्न टाईप करा...' : language === 'hi' ? 'अपने लक्षण या प्रश्न लिखें...' : 'Describe symptoms or ask a health question...'} className="flex-1 rounded border border-gov-gray-300 bg-gov-gray-50 px-3 py-2.5 text-sm text-gov-gray-800 outline-none focus:border-gov-navy focus:ring-1 focus:ring-gov-navy" />

              <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-gov-navy text-white shadow-sm hover:bg-gov-navyLight" title={language === 'mr' ? 'पाठवा' : language === 'hi' ? 'भेजें' : 'Send'}>
                <Send className="h-4 w-4" />
              </button>

              <button type="button" className="flex h-11 items-center justify-center rounded-full bg-rose-600 px-3 text-[10px] font-bold text-white hover:bg-rose-700" onClick={() => window.open('tel:108', '_self')}>
                {language === 'mr' ? '१०८' : language === 'hi' ? '१०८' : '108'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
