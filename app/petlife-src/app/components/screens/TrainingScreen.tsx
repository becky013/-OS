import { useState } from "react";
import { ChevronLeft, Clock, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import aiDoctorImage from "../../../assets/aec2c9b15174a8e2b44b7db9dc41e225cd83f842.png";

export function TrainingScreen() {
  const navigate = useNavigate();

  const skills = [
    {
      id: 1,
      name: "Sit",
      difficulty: "Beginner",
      duration: "7-14 days",
      progress: 60,
      emoji: "🪑",
      description: "Teach your puppy to sit on command. A foundational skill for all other training.",
    },
    {
      id: 2,
      name: "Handshake",
      difficulty: "Intermediate",
      duration: "14-21 days",
      progress: 30,
      emoji: "🤝",
      description: "A fun trick that also helps with paw handling for grooming and vet visits.",
    },
    {
      id: 3,
      name: "Potty Training",
      difficulty: "Beginner",
      duration: "21-30 days",
      progress: 80,
      emoji: "🚽",
      description: "Essential life skill. Consistency and patience are key to success.",
    },
    {
      id: 4,
      name: "Come When Called",
      difficulty: "Intermediate",
      duration: "14-21 days",
      progress: 45,
      emoji: "🔔",
      description: "Critical for safety. Start in controlled environments before outdoor practice.",
    },
    {
      id: 5,
      name: "Stay",
      difficulty: "Intermediate",
      duration: "14-21 days",
      progress: 20,
      emoji: "✋",
      description: "Builds impulse control and keeps your puppy safe in various situations.",
    },
  ];

  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain bg-gradient-to-b from-[#F7F5F2] to-[#FFF9F0]">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#8B7355]" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-medium text-[#8B7355]">Training</h1>
          <p className="text-sm text-[#B8A89A] mt-1">Build skills with Mochi</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-10 space-y-6">
        {/* AI Training Scheduler - AI Doctor Style */}
        <div className="flex items-end gap-3">
          {/* Chat bubble */}
          <div className="bg-[#EAF3FF] rounded-3xl rounded-bl-sm p-4 shadow-sm border border-[#D4E7FF] flex-1 max-w-[280px]">
            <h3 className="text-sm font-semibold text-[#5B7A9E] mb-1.5">AI Training Scheduler</h3>
            <p className="text-xs text-[#5B7A9E] leading-relaxed mb-3">
              Let me create a personalized training schedule based on your availability and Mochi's progress!
            </p>
            <button className="w-full bg-gradient-to-r from-[#64B5F6] to-[#81C784] text-white text-xs font-medium py-2.5 rounded-xl hover:shadow-md transition-all">
              Set My Schedule
            </button>
          </div>
          
          {/* AI Doctor Avatar */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#EAF3FF] overflow-hidden flex-shrink-0 animate-bounce-slow">
            <ImageWithFallback
              src={aiDoctorImage}
              alt="AI Training Doctor"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Training Skills */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-[#8B7355]">Training Skills</h2>
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-3xl">{skill.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#6B5B4F]">{skill.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        skill.difficulty === "Beginner"
                          ? "bg-[#E8F5E9] text-[#4CAF50]"
                          : "bg-[#FFE8D6] text-[#FF9F66]"
                      }`}
                    >
                      {skill.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#A08B7E] mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{skill.duration}</span>
                  </div>
                  <p className="text-sm text-[#A08B7E] mb-3">{skill.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#A08B7E]">Progress</span>
                      <span className="font-medium text-[#6B5B4F]">{skill.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F5E6D3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF9F66] rounded-full transition-all"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                className="w-full bg-[#FFF9F0] text-[#FF9F66] font-medium py-2.5 rounded-xl hover:bg-[#FFE8D6] transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                View Tutorial
              </button>

              {/* Expandable Tutorial Steps */}
              {selectedSkill === skill.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <h4 className="text-sm font-medium text-[#8B7355] mb-2">Training Steps:</h4>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-[#FF9F66] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        1
                      </div>
                      <p className="text-sm text-[#6B5B4F]">
                        Get your puppy's attention with a treat near their nose
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-[#FF9F66] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        2
                      </div>
                      <p className="text-sm text-[#6B5B4F]">
                        Move the treat slowly upward, causing them to naturally sit
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-[#FF9F66] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        3
                      </div>
                      <p className="text-sm text-[#6B5B4F]">
                        Say "Sit" clearly when their bottom touches the ground
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-[#FF9F66] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        4
                      </div>
                      <p className="text-sm text-[#6B5B4F]">
                        Reward immediately with the treat and praise
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h2 className="text-lg font-medium text-[#8B7355] mb-4">This Week's Progress</h2>
          <div className="space-y-3">
            {[
              { day: "Monday", sessions: 2, completed: 2, emoji: "✅" },
              { day: "Tuesday", sessions: 2, completed: 2, emoji: "✅" },
              { day: "Wednesday", sessions: 2, completed: 1, emoji: "🔄" },
              { day: "Thursday", sessions: 2, completed: 0, emoji: "📅" },
              { day: "Friday", sessions: 2, completed: 0, emoji: "📅" },
            ].map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-lg">{day.emoji}</span>
                <span className="text-sm font-medium text-[#6B5B4F] w-24">{day.day}</span>
                <div className="flex-1 flex gap-1">
                  {Array.from({ length: day.sessions }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-8 rounded-lg ${
                        i < day.completed ? "bg-[#81C784]" : "bg-[#F5E6D3]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#B8A89A]">
                  {day.completed}/{day.sessions}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
