import { useState } from "react";
import { ChevronLeft, ChevronRight, Gift, X, Clock, Utensils, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import aiDoctorImage from "../../../assets/aec2c9b15174a8e2b44b7db9dc41e225cd83f842.png";

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isBirthday?: boolean;
  isToday?: boolean;
  hasTraining?: boolean;
}

export function FeedingGuideScreen() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const currentYear = 2026;
  const today = 15; // March 15, 2026

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendar = (month: number): CalendarDay[] => {
    const firstDay = new Date(currentYear, month, 1).getDay();
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, month, 0).getDate();

    const calendar: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendar.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isBirthday = month === 0 && i === 10; // January 10
      const isToday = month === 2 && i === 15; // March 15
      const hasTraining = month === 2 && i >= 11 && i <= 15; // March 11-15 (5 days of handshake training)

      calendar.push({
        day: i,
        isCurrentMonth: true,
        isBirthday,
        isToday,
        hasTraining,
      });
    }

    // Next month days
    const remainingDays = 42 - calendar.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendar.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return calendar;
  };

  const calendarDays = generateCalendar(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleOpenChat = () => {
    // You can implement chat modal here similar to HomeScreen
    console.log("Open AI chat");
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#F7F5F2] to-[#FFF9F0]">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-medium text-[#8B7355]">Feeding Guide</h1>
        <p className="text-sm text-[#B8A89A] mt-1">Track Mochi's journey and training</p>
      </div>

      {/* AI Doctor Recommendation */}
      <div className="px-6 pb-4">
        <div className="flex items-end gap-3">
          {/* Chat bubble */}
          <div className="bg-[#EAF3FF] rounded-3xl rounded-br-sm p-3.5 shadow-sm border border-[#D4E7FF] flex-1">
            <p className="text-xs text-[#5B7A9E] leading-relaxed mb-2">
              <span className="font-semibold">Recommended Training:</span> Start teaching Mochi to "Sit"!
              It's a foundational skill that makes other training easier.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#5B7A9E]">
              <span>Duration: 7-14 days</span>
              <span>Difficulty: Beginner</span>
            </div>
          </div>
          
          {/* AI Doctor Avatar */}
          <motion.button
            onClick={handleOpenChat}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#EAF3FF] overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
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

      {/* Calendar Section */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="w-9 h-9 rounded-full bg-[#F7F5F2] flex items-center justify-center hover:bg-[#EAE5E0] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#8B7355]" />
            </button>
            <h2 className="text-lg font-medium text-[#8B7355]">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-full bg-[#F7F5F2] flex items-center justify-center hover:bg-[#EAE5E0] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#8B7355]" />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-[#B8A89A] py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayInfo, index) => (
              <div
                key={index}
                className={`relative aspect-square flex items-center justify-center rounded-xl text-sm transition-all ${
                  !dayInfo.isCurrentMonth
                    ? "text-[#D4C4B0]"
                    : dayInfo.isToday
                    ? "bg-[#FF9F66] text-white font-semibold shadow-md"
                    : dayInfo.isBirthday
                    ? "bg-[#FFE8D6] text-[#FF9F66] font-medium"
                    : dayInfo.hasTraining
                    ? "bg-[#E3F2FD] text-[#5B7A9E] font-medium"
                    : "text-[#8B7355]"
                }`}
              >
                {dayInfo.day}
                {dayInfo.isBirthday && (
                  <Gift className="absolute top-0.5 right-0.5 w-3 h-3 text-[#FF9F66]" />
                )}
                {dayInfo.hasTraining && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5B7A9E] rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-[#FF9F66] rounded"></div>
              <span className="text-[#8B7355]">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-[#FFE8D6] rounded"></div>
              <span className="text-[#8B7355]">Birthday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-[#E3F2FD] rounded"></div>
              <span className="text-[#8B7355]">Training</span>
            </div>
          </div>
        </div>
      </div>

      {/* Training Status */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setShowTrainingPlan(true)}
          className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/50 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🤝</div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-medium text-[#8B7355]">Handshake Training</h3>
              <p className="text-xs text-[#B8A89A]">5 days completed</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-[#FF9F66]">5</p>
              <p className="text-xs text-[#B8A89A]">days</p>
            </div>
          </div>
          <div className="w-full h-2 bg-[#F5E6D3] rounded-full overflow-hidden">
            <div className="h-full bg-[#FF9F66] rounded-full" style={{ width: "35%" }} />
          </div>
        </button>
      </div>

      {/* Training Progress */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-medium text-[#8B7355] mb-4">Training Progress</h3>
          <div className="space-y-3">
            {[
              { skill: "Sit", progress: 80, emoji: "🪑" },
              { skill: "Stay", progress: 45, emoji: "✋" },
              { skill: "Come", progress: 60, emoji: "🔔" },
              { skill: "Handshake", progress: 35, emoji: "🤝" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-[#6B5B4F]">{item.skill}</span>
                  </div>
                  <span className="font-medium text-[#FF9F66]">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#F5E6D3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#81C784] rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={() => navigate("/preparation")}
          className="flex-1 bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"
        >
          <div className="text-3xl mb-2">📦</div>
          <h3 className="text-sm font-medium text-[#8B7355] mb-1">Preparation</h3>
          <p className="text-xs text-[#B8A89A]">Essential checklist & tips</p>
        </button>

        <button
          onClick={() => navigate("/training")}
          className="flex-1 bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100"
        >
          <div className="text-3xl mb-2">🎓</div>
          <h3 className="text-sm font-medium text-[#8B7355] mb-1">Training</h3>
          <p className="text-xs text-[#B8A89A]">Skills & progress tracking</p>
        </button>
      </div>

      {/* Training Plan Modal */}
      {showTrainingPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#FF9F66] to-[#FFB088] px-6 pt-6 pb-5 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <h2 className="text-xl font-semibold">Handshake Training</h2>
                    <p className="text-sm opacity-90">AI Generated Plan</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTrainingPlan(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Day 5/14</span>
                <span>•</span>
                <span>35% Complete</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Overview */}
              <div className="bg-gradient-to-br from-[#EAF3FF] to-[#E3F2FD] rounded-3xl p-5">
                <h3 className="font-semibold text-[#5B7A9E] mb-3 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  Training Overview
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/80 rounded-xl p-3">
                    <p className="text-xs text-[#B8A89A] mb-1">Duration</p>
                    <p className="font-semibold text-[#6B5B4F]">14 Days</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-3">
                    <p className="text-xs text-[#B8A89A] mb-1">Sessions/Day</p>
                    <p className="font-semibold text-[#6B5B4F]">3-5 times</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-3">
                    <p className="text-xs text-[#B8A89A] mb-1">Session Length</p>
                    <p className="font-semibold text-[#6B5B4F]">5-10 min</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-3">
                    <p className="text-xs text-[#B8A89A] mb-1">Difficulty</p>
                    <p className="font-semibold text-[#6B5B4F]">Beginner</p>
                  </div>
                </div>
              </div>

              {/* Daily Schedule */}
              <div>
                <h3 className="font-semibold text-[#6B5B4F] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF9F66]" />
                  Daily Training Schedule
                </h3>
                <div className="space-y-3">
                  {[
                    { time: "8:00 AM", label: "Morning Session", desc: "After breakfast, when Mochi is energetic" },
                    { time: "1:00 PM", label: "Afternoon Session", desc: "Before afternoon nap" },
                    { time: "6:00 PM", label: "Evening Session", desc: "Before dinner time" },
                  ].map((session, index) => (
                    <div key={index} className="bg-[#FFF9F0] rounded-2xl p-4 border border-[#E8D5BF]">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                          {index === 0 ? "🌅" : index === 1 ? "☀️" : "🌆"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-[#FF9F66]" />
                            <span className="font-semibold text-[#6B5B4F]">{session.time}</span>
                          </div>
                          <p className="text-sm font-medium text-[#8B7355]">{session.label}</p>
                        </div>
                      </div>
                      <p className="text-xs text-[#A08B7E] ml-[76px]">{session.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Method with Treats */}
              <div>
                <h3 className="font-semibold text-[#6B5B4F] mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#FF9F66]" />
                  Food-Based Training Method
                </h3>
                <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FFE8D6] rounded-3xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF9F66] text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#6B5B4F] mb-1">Hold treat in closed fist</h4>
                      <p className="text-sm text-[#A08B7E]">Let Mochi smell the treat but don't open your hand yet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF9F66] text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#6B5B4F] mb-1">Present your hand and say \"Shake\"</h4>
                      <p className="text-sm text-[#A08B7E]">Wait for Mochi to paw at your hand</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF9F66] text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#6B5B4F] mb-1">Reward immediately</h4>
                      <p className="text-sm text-[#A08B7E]">Open your hand and give the treat + praise enthusiastically!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF9F66] text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#6B5B4F] mb-1">Repeat 5-10 times per session</h4>
                      <p className="text-sm text-[#A08B7E]">Keep sessions short and fun to maintain interest</p>
                    </div>
                  </div>
                </div>

                {/* Treat Tips */}
                <div className="mt-4 bg-[#FFFBF0] border border-[#FFD166] rounded-2xl p-4">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">💡</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#8B7355] mb-1">Treat Tips</h4>
                      <ul className="text-sm text-[#A08B7E] space-y-1">
                        <li>• Use small, soft treats that are easy to chew</li>
                        <li>• Keep treats at room temperature for better scent</li>
                        <li>• Limit to 10% of daily calorie intake</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 14-Day Progress Tracker */}
              <div>
                <h3 className="font-semibold text-[#6B5B4F] mb-4">14-Day Check-in Tracker</h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 14 }).map((_, index) => {
                    const dayNum = index + 1;
                    const isCompleted = checkedDays.includes(dayNum);
                    const isToday = dayNum === 5;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (isCompleted) {
                            setCheckedDays(checkedDays.filter(d => d !== dayNum));
                          } else {
                            setCheckedDays([...checkedDays, dayNum]);
                          }
                        }}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xs transition-all ${
                          isCompleted
                            ? "bg-[#81C784] text-white shadow-md"
                            : isToday
                            ? "bg-[#FF9F66] text-white shadow-md ring-2 ring-[#FF9F66] ring-offset-2"
                            : "bg-[#F5E6D3] text-[#A08B7E] hover:bg-[#E8D5BF]"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 mb-0.5" />
                        ) : (
                          <span className="text-lg mb-0.5">🤝</span>
                        )}
                        <span className="font-medium">D{dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Check-in Button */}
              <button className="w-full bg-gradient-to-r from-[#81C784] to-[#66BB6A] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Check In Today's Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
