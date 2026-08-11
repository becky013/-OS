import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, Droplets, Footprints, Mic, Send, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import corgiImage from "../../../assets/35cb47e2d1ed49b7b322120b4f718b3123eea65e.png";
import aiDoctorImage from "../../../assets/aec2c9b15174a8e2b44b7db9dc41e225cd83f842.png";
import { useLanguage } from "../../i18n";

type PetMood = "happy" | "normal" | "tired" | "warning";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function HomeScreen() {
  const { t, lang, setLang } = useLanguage();
  const [petMood, setPetMood] = useState<PetMood>("happy");
  const [logs, setLogs] = useState({
    feed: 2,
    water: 3,
    potty: 1,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isPottyModalOpen, setIsPottyModalOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showWaterAdvanced, setShowWaterAdvanced] = useState(false);
  const [showPottyAdvanced, setShowPottyAdvanced] = useState(false);
  const [feedingData, setFeedingData] = useState({
    time: "",
    foodType: "",
    portion: "",
    reaction: "",
    exactGrams: "",
    notes: "",
  });
  const [waterData, setWaterData] = useState({
    time: "",
    source: "",
    amount: "",
    behavior: "",
    exactMl: "",
    notes: "",
  });
  const [pottyData, setPottyData] = useState({
    time: "",
    type: "",
    location: "",
    consistency: "",
    color: "",
    notes: "",
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Mochi is doing great today! Consider a short walk after the next meal.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleLog = (type: "feed" | "water" | "potty") => {
    if (type === "feed") {
      setIsFeedModalOpen(true);
      return;
    }
    if (type === "water") {
      setIsWaterModalOpen(true);
      return;
    }
    setIsPottyModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText);
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("feed") || input.includes("food") || input.includes("eat")) {
      return "For a 3-6 month old corgi puppy, I recommend feeding 3-4 times a day with high-quality puppy food. Make sure to use a measuring cup to avoid overfeeding!";
    } else if (input.includes("walk") || input.includes("exercise")) {
      return "At this age, short walks (10-15 minutes) 2-3 times a day are perfect. Avoid overexertion as Mochi's bones are still developing!";
    } else if (input.includes("train") || input.includes("behavior")) {
      return "Great question! Start with basic commands like 'sit' and 'stay'. Keep training sessions short (5-10 minutes) and always use positive reinforcement with treats!";
    } else if (input.includes("health") || input.includes("vet")) {
      return "Make sure Mochi is up to date on vaccinations. At this age, a vet checkup every 3-4 weeks is recommended until 4 months old.";
    } else if (input.includes("play") || input.includes("toy")) {
      return "Puppies need mental stimulation! Try puzzle toys, soft chew toys, and interactive play. Avoid toys small enough to be swallowed.";
    } else {
      return "I'm here to help with any questions about Mochi's care! Feel free to ask about feeding, training, health, or daily routines.";
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t("Voice input is not supported in your browser. Please try Chrome or Edge."));
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const moodConfig = {
    happy: { scale: 1, brightness: 1.1, opacity: 1 },
    normal: { scale: 1, brightness: 1, opacity: 1 },
    tired: { scale: 0.98, brightness: 0.95, opacity: 0.9 },
    warning: { scale: 1, brightness: 1, opacity: 1 },
  };

  const currentMood = moodConfig[petMood];

  return (
    <div
      className="h-full flex flex-col bg-gradient-to-b from-[#F7F5F2] to-[#FFF4CC] overflow-hidden"
    >
      {/* Minimal Header */}
      <div className="pt-6 pb-3 px-6 text-center flex-shrink-0 relative">
        <h2 className="text-lg font-medium text-[#8B7355]">Mochi</h2>
        <p className="text-xs text-[#B8A89A] mt-0.5">{t("3–6 months old")}</p>

        {/* Language switch */}
        <div className="absolute right-5 top-5 flex items-center gap-0.5 bg-white/70 backdrop-blur-sm rounded-full p-0.5 shadow-sm border border-white/60">
          {(["en", "zh"] as const).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-label={code === "en" ? "Switch to English" : "切换到中文"}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                lang === code
                  ? "bg-[#FF9F66] text-white shadow-sm"
                  : "text-[#8B7355] hover:bg-white/70"
              }`}
            >
              {code === "en" ? "EN" : "中文"}
            </button>
          ))}
        </div>
      </div>

      {/* Top Reminder Cards */}
      <div className="px-6 pb-2 space-y-2 flex-shrink-0">
        {/* Feeding Reminder */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-3 shadow-sm border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFF4CC] rounded-2xl flex items-center justify-center text-sm">
              🍽️
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-medium text-[#8B7355] mb-0.5">{t("Next Feeding")}</h4>
              <p className="text-[10px] text-[#B8A89A]">{t("Recommended at 3:00 PM")}</p>
            </div>
          </div>
        </div>

        {/* Offline Event Reminder */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-3 shadow-sm border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFE8D6] rounded-2xl flex items-center justify-center text-sm">
              📍
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-medium text-[#8B7355] mb-0.5">{t("Pet Meetup Nearby")}</h4>
              <p className="text-[10px] text-[#B8A89A]">{t("Riverside Dog Park • Tomorrow 10:00 AM")}</p>
            </div>
            <button className="text-[10px] text-[#FF9F66] font-medium">{t("View")}</button>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="px-6 pb-2 flex-shrink-0">
        <div className="flex items-end gap-3 justify-end">
          {/* Chat bubble */}
          <div className="bg-[#EAF3FF] rounded-3xl rounded-br-sm p-3 shadow-sm border border-[#D4E7FF] max-w-[220px]">
            <p className="text-[11px] text-[#5B7A9E] leading-relaxed">
              {t("Mochi is doing great today! Consider a short walk after the next meal.")}
            </p>
          </div>
          
          {/* AI Doctor Avatar */}
          <motion.button
            onClick={() => setIsChatOpen(true)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#EAF3FF] overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ImageWithFallback
              src={aiDoctorImage}
              alt="AI Doctor"
              className="w-full h-full object-cover"
            />
          </motion.button>
        </div>
      </div>

      {/* Main Pet Avatar - Central Focus */}
      <div className="flex items-center justify-center px-8 flex-1">
        <motion.div
          className="relative w-full max-w-[360px]"
          animate={{
            scale: [currentMood.scale, currentMood.scale * 1.02, currentMood.scale],
            opacity: currentMood.opacity,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Soft shadow underneath */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-[#8B7355]/5 rounded-full blur-xl" />

          {/* Pet Image */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ImageWithFallback
              src={corgiImage}
              alt="Mochi the Corgi"
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Daily Logging Buttons - Minimal */}
      <div className="px-8 pb-6 flex-shrink-0">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleLog("feed")}
            className="flex flex-col items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-3xl hover:bg-white/80 transition-all shadow-sm"
          >
            <Heart className="w-5 h-5 text-[#FF9F66]" strokeWidth={1.5} />
            <span className="text-xs font-medium text-[#8B7355]">{t("Feed")}</span>
          </button>
          <button
            onClick={() => handleLog("water")}
            className="flex flex-col items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-3xl hover:bg-white/80 transition-all shadow-sm"
          >
            <Droplets className="w-5 h-5 text-[#64B5F6]" strokeWidth={1.5} />
            <span className="text-xs font-medium text-[#8B7355]">{t("Water")}</span>
          </button>
          <button
            onClick={() => handleLog("potty")}
            className="flex flex-col items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-3xl hover:bg-white/80 transition-all shadow-sm"
          >
            <Footprints className="w-5 h-5 text-[#AB47BC]" strokeWidth={1.5} />
            <span className="text-xs font-medium text-[#8B7355]">{t("Potty")}</span>
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full bg-white rounded-t-[2rem] shadow-2xl max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#EAF3FF] overflow-hidden">
                    <ImageWithFallback
                      src={aiDoctorImage}
                      alt="AI Doctor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#8B7355]">{t("AI Pet Doctor")}</h3>
                    <p className="text-xs text-[#B8A89A]">{t("Always here to help")}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-3xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-[#FF9F66] text-white rounded-br-sm"
                          : "bg-[#EAF3FF] text-[#5B7A9E] rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{t(message.text)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVoiceInput}
                    disabled={isListening}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-white text-[#FF9F66] hover:bg-[#FFE8D6]"
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={t("Ask about Mochi's care...")}
                    className="flex-1 px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-[#FF9F66] text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="w-11 h-11 rounded-2xl bg-[#FF9F66] text-white flex items-center justify-center hover:bg-[#FF8A4C] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {isListening ? t("Listening...") : t("Tap mic for voice, or type your question")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed Modal */}
      <AnimatePresence>
        {isFeedModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setIsFeedModalOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full bg-white rounded-t-[2rem] shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#FF9F66] to-[#FFB088] px-6 py-4 text-white z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-semibold">{t("Feeding Record")}</h3>
                      <p className="text-xs opacity-90">{t("Log Mochi's meal")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFeedModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-6 py-6 space-y-6">
                {/* ① Time */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    {t("① Time")}
                  </label>
                  <input
                    type="time"
                    value={feedingData.time}
                    onChange={(e) => setFeedingData({ ...feedingData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F66] text-sm"
                  />
                </div>

                {/* ② Food Type */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                    {t("② Food Type")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "dry", label: t("Dry Food"), emoji: "🥘" },
                      { value: "wet", label: t("Wet Food"), emoji: "🥫" },
                      { value: "mixed", label: t("Mixed"), emoji: "🍱" },
                      { value: "treats", label: t("Treats/Rewards"), emoji: "🦴" },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFeedingData({ ...feedingData, foodType: type.value })}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                          feedingData.foodType === type.value
                            ? "border-[#FF9F66] bg-[#FFE8D6] text-[#FF9F66]"
                            : "border-[#E8D5BF] bg-[#FFF9F0] text-[#6B5B4F] hover:border-[#FF9F66]"
                        }`}
                      >
                        <span className="text-xl">{type.emoji}</span>
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ③ Portion */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                    {t("③ Portion")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "small", label: t("Small"), emoji: "🥄" },
                      { value: "normal", label: t("Normal"), emoji: "🍽️" },
                      { value: "large", label: t("Large"), emoji: "🍴" },
                    ].map((portion) => (
                      <button
                        key={portion.value}
                        onClick={() => setFeedingData({ ...feedingData, portion: portion.value })}
                        className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                          feedingData.portion === portion.value
                            ? "border-[#FF9F66] bg-[#FFE8D6] text-[#FF9F66]"
                            : "border-[#E8D5BF] bg-[#FFF9F0] text-[#6B5B4F] hover:border-[#FF9F66]"
                        }`}
                      >
                        <span className="text-2xl">{portion.emoji}</span>
                        <span className="text-sm font-medium">{portion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Section - Collapsible */}
                <div className="border-t border-[#E8D5BF] pt-4">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between p-3 bg-[#FFF9F0] rounded-xl hover:bg-[#FFE8D6] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#6B5B4F]">
                      {t("Advanced Options (Optional)")}
                    </span>
                    {showAdvanced ? (
                      <ChevronUp className="w-5 h-5 text-[#A08B7E]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#A08B7E]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-5">
                          {/* Pet's Eating Reaction */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                              {t("Mochi's Eating Reaction")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: "excited", label: t("Excited"), emoji: "😋" },
                                { value: "finished", label: t("Finished"), emoji: "😊" },
                                { value: "half", label: t("Half Eaten"), emoji: "😐" },
                                { value: "barely", label: t("Barely Touched"), emoji: "😕" },
                              ].map((reaction) => (
                                <button
                                  key={reaction.value}
                                  onClick={() => setFeedingData({ ...feedingData, reaction: reaction.value })}
                                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                                    feedingData.reaction === reaction.value
                                      ? "border-[#FF9F66] bg-[#FFE8D6] text-[#FF9F66]"
                                      : "border-[#E8D5BF] bg-[#FFF9F0] text-[#6B5B4F] hover:border-[#FF9F66]"
                                  }`}
                                >
                                  <span className="text-lg">{reaction.emoji}</span>
                                  <span className="text-xs font-medium">{reaction.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Exact Grams */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                              {t("Exact Weight (grams)")}
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={feedingData.exactGrams}
                                onChange={(e) => setFeedingData({ ...feedingData, exactGrams: e.target.value })}
                                placeholder={t("e.g., 150")}
                                className="w-full px-4 py-3 pr-12 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F66] text-sm"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#A08B7E]">
                                g
                              </span>
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                              {t("Notes")}
                            </label>
                            <textarea
                              value={feedingData.notes}
                              onChange={(e) => setFeedingData({ ...feedingData, notes: e.target.value })}
                              placeholder={t("e.g., Fed treats from another house...")}
                              rows={3}
                              className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9F66] text-sm resize-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => {
                    setLogs((prev) => ({ ...prev, feed: prev.feed + 1 }));
                    setPetMood("happy");
                    setIsFeedModalOpen(false);
                    setShowAdvanced(false);
                    // Reset form
                    setFeedingData({
                      time: "",
                      foodType: "",
                      portion: "",
                      reaction: "",
                      exactGrams: "",
                      notes: "",
                    });
                  }}
                  disabled={!feedingData.time || !feedingData.foodType || !feedingData.portion}
                  className="w-full bg-gradient-to-r from-[#FF9F66] to-[#FFB088] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  {t("Save Feeding Record")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Water Modal */}
      <AnimatePresence>
        {isWaterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setIsWaterModalOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full bg-white rounded-t-[2rem] shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#64B5F6] to-[#90CAF9] px-6 py-4 text-white z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-semibold">{t("Water Record")}</h3>
                      <p className="text-xs opacity-90">{t("Log Mochi's drink")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsWaterModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-6 py-6 space-y-6">
                {/* ① Time */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    {t("① Time")}
                  </label>
                  <input
                    type="time"
                    value={waterData.time}
                    onChange={(e) => setWaterData({ ...waterData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5FAFF] border border-[#CFE5FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6] text-sm"
                  />
                </div>

                {/* ② Source */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                    {t("② Water Source")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "bowl", label: t("Bowl"), emoji: "🥣" },
                      { value: "fountain", label: t("Fountain"), emoji: "⛲" },
                      { value: "bottle", label: t("Bottle"), emoji: "🍼" },
                      { value: "food", label: t("From Food"), emoji: "🥫" },
                    ].map((source) => (
                      <button
                        key={source.value}
                        onClick={() => setWaterData({ ...waterData, source: source.value })}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                          waterData.source === source.value
                            ? "border-[#64B5F6] bg-[#E3F2FD] text-[#3B8FD4]"
                            : "border-[#CFE5FA] bg-[#F5FAFF] text-[#6B5B4F] hover:border-[#64B5F6]"
                        }`}
                      >
                        <span className="text-xl">{source.emoji}</span>
                        <span className="text-sm font-medium">{source.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ③ Amount */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                    {t("③ Amount")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "sip", label: t("A Few Sips"), emoji: "💧" },
                      { value: "normal", label: t("Normal"), emoji: "💦" },
                      { value: "lots", label: t("A Lot"), emoji: "🌊" },
                    ].map((amount) => (
                      <button
                        key={amount.value}
                        onClick={() => setWaterData({ ...waterData, amount: amount.value })}
                        className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all ${
                          waterData.amount === amount.value
                            ? "border-[#64B5F6] bg-[#E3F2FD] text-[#3B8FD4]"
                            : "border-[#CFE5FA] bg-[#F5FAFF] text-[#6B5B4F] hover:border-[#64B5F6]"
                        }`}
                      >
                        <span className="text-2xl">{amount.emoji}</span>
                        <span className="text-xs font-medium text-center">{amount.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Section */}
                <div className="border-t border-[#CFE5FA] pt-4">
                  <button
                    onClick={() => setShowWaterAdvanced(!showWaterAdvanced)}
                    className="w-full flex items-center justify-between p-3 bg-[#F5FAFF] rounded-xl hover:bg-[#E3F2FD] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#6B5B4F]">
                      {t("Advanced Options (Optional)")}
                    </span>
                    {showWaterAdvanced ? (
                      <ChevronUp className="w-5 h-5 text-[#7FA8C9]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#7FA8C9]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showWaterAdvanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-5">
                          {/* Drinking Behaviour */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                              {t("Mochi's Drinking Behaviour")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: "eager", label: t("Eager"), emoji: "😃" },
                                { value: "normal", label: t("Normal"), emoji: "🙂" },
                                { value: "reluctant", label: t("Reluctant"), emoji: "😐" },
                                { value: "refused", label: t("Refused"), emoji: "😕" },
                              ].map((behavior) => (
                                <button
                                  key={behavior.value}
                                  onClick={() => setWaterData({ ...waterData, behavior: behavior.value })}
                                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                                    waterData.behavior === behavior.value
                                      ? "border-[#64B5F6] bg-[#E3F2FD] text-[#3B8FD4]"
                                      : "border-[#CFE5FA] bg-[#F5FAFF] text-[#6B5B4F] hover:border-[#64B5F6]"
                                  }`}
                                >
                                  <span className="text-lg">{behavior.emoji}</span>
                                  <span className="text-xs font-medium">{behavior.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Exact Volume */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                              {t("Exact Volume (ml)")}
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={waterData.exactMl}
                                onChange={(e) => setWaterData({ ...waterData, exactMl: e.target.value })}
                                placeholder={t("e.g., 120")}
                                className="w-full px-4 py-3 pr-12 bg-[#F5FAFF] border border-[#CFE5FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6] text-sm"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#7FA8C9]">
                                ml
                              </span>
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                              {t("Notes")}
                            </label>
                            <textarea
                              value={waterData.notes}
                              onChange={(e) => setWaterData({ ...waterData, notes: e.target.value })}
                              placeholder={t("e.g., Drank a lot after the afternoon walk...")}
                              rows={3}
                              className="w-full px-4 py-3 bg-[#F5FAFF] border border-[#CFE5FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6] text-sm resize-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <button
                  onClick={() => {
                    setLogs((prev) => ({ ...prev, water: prev.water + 1 }));
                    setPetMood("happy");
                    setIsWaterModalOpen(false);
                    setShowWaterAdvanced(false);
                    setWaterData({
                      time: "",
                      source: "",
                      amount: "",
                      behavior: "",
                      exactMl: "",
                      notes: "",
                    });
                  }}
                  disabled={!waterData.time || !waterData.source || !waterData.amount}
                  className="w-full bg-gradient-to-r from-[#64B5F6] to-[#90CAF9] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Droplets className="w-5 h-5" />
                  {t("Save Water Record")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Potty Modal */}
      <AnimatePresence>
        {isPottyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setIsPottyModalOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full bg-white rounded-t-[2rem] shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#AB47BC] to-[#CE93D8] px-6 py-4 text-white z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Footprints className="w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-semibold">{t("Potty Record")}</h3>
                      <p className="text-xs opacity-90">{t("Log Mochi's bathroom break")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPottyModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="px-6 py-6 space-y-6">
                {/* ① Time */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    {t("① Time")}
                  </label>
                  <input
                    type="time"
                    value={pottyData.time}
                    onChange={(e) => setPottyData({ ...pottyData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FCF7FD] border border-[#E9D3EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#AB47BC] text-sm"
                  />
                </div>

                {/* ② Type */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                    {t("② Type")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "pee", label: t("Pee"), emoji: "💧" },
                      { value: "poop", label: t("Poop"), emoji: "💩" },
                      { value: "both", label: t("Both"), emoji: "🚽" },
                      { value: "attempt", label: t("Tried, Nothing"), emoji: "🤔" },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setPottyData({ ...pottyData, type: type.value })}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                          pottyData.type === type.value
                            ? "border-[#AB47BC] bg-[#F3E5F5] text-[#8E3BA0]"
                            : "border-[#E9D3EF] bg-[#FCF7FD] text-[#6B5B4F] hover:border-[#AB47BC]"
                        }`}
                      >
                        <span className="text-xl">{type.emoji}</span>
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ③ Location */}
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                    {t("③ Location")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "pad", label: t("Pee Pad"), emoji: "🧻" },
                      { value: "outdoor", label: t("Outdoors"), emoji: "🌳" },
                      { value: "accident", label: t("Accident"), emoji: "⚠️" },
                    ].map((location) => (
                      <button
                        key={location.value}
                        onClick={() => setPottyData({ ...pottyData, location: location.value })}
                        className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all ${
                          pottyData.location === location.value
                            ? "border-[#AB47BC] bg-[#F3E5F5] text-[#8E3BA0]"
                            : "border-[#E9D3EF] bg-[#FCF7FD] text-[#6B5B4F] hover:border-[#AB47BC]"
                        }`}
                      >
                        <span className="text-2xl">{location.emoji}</span>
                        <span className="text-xs font-medium text-center">{location.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Section */}
                <div className="border-t border-[#E9D3EF] pt-4">
                  <button
                    onClick={() => setShowPottyAdvanced(!showPottyAdvanced)}
                    className="w-full flex items-center justify-between p-3 bg-[#FCF7FD] rounded-xl hover:bg-[#F3E5F5] transition-colors"
                  >
                    <span className="text-sm font-medium text-[#6B5B4F]">
                      {t("Advanced Options (Optional)")}
                    </span>
                    {showPottyAdvanced ? (
                      <ChevronUp className="w-5 h-5 text-[#A98BB2]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#A98BB2]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showPottyAdvanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-5">
                          {/* Consistency */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                              {t("Stool Consistency")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: "firm", label: t("Firm & Formed"), emoji: "✅" },
                                { value: "soft", label: t("Soft"), emoji: "🌤️" },
                                { value: "watery", label: t("Watery"), emoji: "💦" },
                                { value: "hard", label: t("Hard / Dry"), emoji: "🪨" },
                              ].map((consistency) => (
                                <button
                                  key={consistency.value}
                                  onClick={() => setPottyData({ ...pottyData, consistency: consistency.value })}
                                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                                    pottyData.consistency === consistency.value
                                      ? "border-[#AB47BC] bg-[#F3E5F5] text-[#8E3BA0]"
                                      : "border-[#E9D3EF] bg-[#FCF7FD] text-[#6B5B4F] hover:border-[#AB47BC]"
                                  }`}
                                >
                                  <span className="text-lg">{consistency.emoji}</span>
                                  <span className="text-xs font-medium">{consistency.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Colour */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                              {t("Colour")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: "brown", label: t("Healthy Brown"), emoji: "🟤" },
                                { value: "dark", label: t("Very Dark"), emoji: "⚫" },
                                { value: "yellow", label: t("Yellow / Pale"), emoji: "🟡" },
                                { value: "blood", label: t("Blood Present"), emoji: "🔴" },
                              ].map((color) => (
                                <button
                                  key={color.value}
                                  onClick={() => setPottyData({ ...pottyData, color: color.value })}
                                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all ${
                                    pottyData.color === color.value
                                      ? "border-[#AB47BC] bg-[#F3E5F5] text-[#8E3BA0]"
                                      : "border-[#E9D3EF] bg-[#FCF7FD] text-[#6B5B4F] hover:border-[#AB47BC]"
                                  }`}
                                >
                                  <span className="text-lg">{color.emoji}</span>
                                  <span className="text-xs font-medium">{color.label}</span>
                                </button>
                              ))}
                            </div>
                            {pottyData.color === "blood" && (
                              <p className="text-xs text-[#E57373] mt-2">
                                {t("Blood in stool should be checked by a vet. Tap the AI Doctor for next steps.")}
                              </p>
                            )}
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                              {t("Notes")}
                            </label>
                            <textarea
                              value={pottyData.notes}
                              onChange={(e) => setPottyData({ ...pottyData, notes: e.target.value })}
                              placeholder={t("e.g., Went by himself right after the walk...")}
                              rows={3}
                              className="w-full px-4 py-3 bg-[#FCF7FD] border border-[#E9D3EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#AB47BC] text-sm resize-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <button
                  onClick={() => {
                    setLogs((prev) => ({ ...prev, potty: prev.potty + 1 }));
                    setPetMood("happy");
                    setIsPottyModalOpen(false);
                    setShowPottyAdvanced(false);
                    setPottyData({
                      time: "",
                      type: "",
                      location: "",
                      consistency: "",
                      color: "",
                      notes: "",
                    });
                  }}
                  disabled={!pottyData.time || !pottyData.type || !pottyData.location}
                  className="w-full bg-gradient-to-r from-[#AB47BC] to-[#CE93D8] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Footprints className="w-5 h-5" />
                  {t("Save Potty Record")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
