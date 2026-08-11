import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Settings,
  Award,
  Heart,
  Gift,
  ChevronRight,
  Camera,
  Calendar,
  Share2,
  X,
  Plus,
  Upload,
} from "lucide-react";
import userAvatar from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_51_04_AM.png";
import petAvatar from "../../../imports/可爱柯基小犬与智能宠物标签_1.png";

export function ProfileScreen() {
  const [showPetProfile, setShowPetProfile] = useState(false);
  const [showUploadMedical, setShowUploadMedical] = useState(false);
  const [medicalNotes, setMedicalNotes] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState<string[]>([]);

  const stats = [
    { label: "Posts", value: 24, icon: Camera },
    { label: "Training Days", value: 45, icon: Calendar },
    { label: "Donations", value: 3, icon: Heart },
  ];

  const achievements = [
    { name: "7-Day Streak", emoji: "🔥", date: "Earned today" },
    { name: "First Post", emoji: "📸", date: "March 15, 2026" },
    { name: "Rescue Hero", emoji: "❤️", date: "April 1, 2026" },
    { name: "Potty Master", emoji: "🚽", date: "March 25, 2026" },
    { name: "Social Butterfly", emoji: "🦋", date: "March 20, 2026" },
  ];

  const feedingLogs = [
    { date: "Today", meals: 3, water: 4, treats: 1 },
    { date: "Yesterday", meals: 3, water: 5, treats: 2 },
    { date: "April 3", meals: 3, water: 3, treats: 1 },
    { date: "April 2", meals: 3, water: 4, treats: 2 },
    { date: "April 1", meals: 3, water: 5, treats: 1 },
  ];

  return (
    <div className="min-h-full bg-[#FFF9F0]">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-[#6B5B4F]">Profile</h1>
          <button className="p-2 hover:bg-[#FFF9F0] rounded-full transition-colors">
            <Settings className="w-6 h-6 text-[#A08B7E]" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#FFE8D6] to-[#FF9F66]">
            <ImageWithFallback
              src={userAvatar}
              alt="Sarah Chen"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#6B5B4F]">Sarah Chen</h2>
            <p className="text-sm text-[#A08B7E]">Pet parent since March 2026</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-[#FFF9F0] rounded-2xl p-3 text-center">
                <Icon className="w-5 h-5 text-[#FF9F66] mx-auto mb-1" />
                <div className="text-xl font-semibold text-[#6B5B4F]">{stat.value}</div>
                <div className="text-xs text-[#A08B7E]">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Pet Profile - Clickable */}
        <button
          onClick={() => setShowPetProfile(true)}
          className="w-full bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#6B5B4F]">My Pet</h2>
            <ChevronRight className="w-5 h-5 text-[#A08B7E]" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F5E6D3]">
              <ImageWithFallback
                src={petAvatar}
                alt="Mochi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-[#6B5B4F] mb-1">Mochi</h3>
              <p className="text-sm text-[#A08B7E]">Golden Retriever • 4 months</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-2 py-1 rounded-full">
                  Male
                </span>
                <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-1 rounded-full">
                  Vaccinated
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Coupons */}
        <div className="bg-gradient-to-r from-[#FFD166] to-[#FFBE8A] rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-8 h-8" />
            <div className="flex-1">
              <h2 className="font-semibold mb-1">My Coupons</h2>
              <p className="text-sm opacity-90">You have 6 coupons available</p>
            </div>
            <div className="text-3xl font-bold">6</div>
          </div>
          <button className="w-full bg-white text-[#FFD166] font-medium py-2.5 rounded-2xl hover:bg-opacity-90 transition-colors">
            View Coupons
          </button>
        </div>

        {/* Charity Contribution */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#E8D5BF]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 flex-1">
              <Heart className="w-5 h-5 text-[#FF6B6B] fill-[#FF6B6B] mt-0.5" />
              <div className="flex-1">
                <h2 className="text-base font-semibold text-[#6B5B4F] mb-1">Charity Contribution</h2>
                <p className="text-xs text-[#A08B7E] mb-2">Convert points to donations</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#66BB6A]">$85</span>
                  <span className="text-xs text-[#A08B7E]">donated this year</span>
                </div>
              </div>
            </div>
            <button className="text-xs text-[#66BB6A] font-medium px-3 py-1.5 border border-[#66BB6A] rounded-full hover:bg-[#66BB6A] hover:text-white transition-colors whitespace-nowrap">
              Donate
            </button>
          </div>
        </div>

        {/* NFC Tag */}
        <div className="bg-gradient-to-br from-[#E3F2FD] to-[#F3E5F5] rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl">
              🏷️
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-[#6B5B4F] mb-1">Smart Pet Tag</h2>
              <p className="text-sm text-[#A08B7E]">NFC tag connected</p>
            </div>
          </div>
          <button className="w-full bg-white text-[#64B5F6] font-medium py-2.5 rounded-2xl hover:bg-opacity-90 transition-colors">
            Manage Device
          </button>
        </div>

        {/* Share Profile */}
        <button className="w-full bg-[#FF9F66] text-white font-medium py-3.5 rounded-2xl hover:bg-[#FF8A4D] transition-colors shadow-sm flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          Share My Pet Profile
        </button>
      </div>

      {/* Pet Profile Modal */}
      {showPetProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#6B5B4F]">Mochi's Profile</h2>
              <button
                onClick={() => setShowPetProfile(false)}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B5B4F]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Pet Info */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F5E6D3]">
                  <ImageWithFallback
                    src={petAvatar}
                    alt="Mochi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#6B5B4F] mb-1">Mochi</h3>
                  <p className="text-sm text-[#A08B7E] mb-2">
                    Golden Retriever • 4 months
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-2 py-1 rounded-full">
                      Male
                    </span>
                    <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-1 rounded-full">
                      Vaccinated
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FFE8D6] rounded-3xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#FFD166]" />
                  <h3 className="text-lg font-semibold text-[#6B5B4F]">Achievements</h3>
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
                    >
                      <div className="text-2xl">{achievement.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#6B5B4F] text-sm">
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-[#A08B7E]">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feeding Logs */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#6B5B4F]">Feeding Logs</h3>
                  <button className="text-sm text-[#FF9F66] font-medium">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {feedingLogs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#FFF9F0] rounded-xl"
                    >
                      <span className="text-sm font-medium text-[#6B5B4F]">
                        {log.date}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-[#A08B7E]">
                        <span>🍽️ {log.meals}</span>
                        <span>💧 {log.water}</span>
                        <span>🦴 {log.treats}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload Medical Record Button */}
              <button
                onClick={() => {
                  setShowUploadMedical(true);
                  setShowPetProfile(false);
                }}
                className="w-full bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] text-white font-medium py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Medical Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Experience Modal */}
      {showUploadMedical && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#6B5B4F]">Upload Medical Record</h2>
              <button
                onClick={() => setShowUploadMedical(false)}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B5B4F]" />
              </button>
            </div>

            {/* Upload Content */}
            <div className="px-6 py-6 space-y-5">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  Add Photos
                </label>
                <button className="w-full h-48 border-2 border-dashed border-[#E8D5BF] rounded-2xl bg-[#FFF9F0] hover:bg-[#FFE8D6] transition-colors flex flex-col items-center justify-center gap-3">
                  <Camera className="w-12 h-12 text-[#A08B7E]" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#6B5B4F]">Tap to upload photos</p>
                    <p className="text-xs text-[#A08B7E] mt-1">Or drag and drop here</p>
                  </div>
                </button>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-04-05"
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    Visit Time
                  </label>
                  <input
                    type="time"
                    defaultValue="14:30"
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                  />
                </div>
              </div>

              {/* Clinic Info */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  Clinic/Hospital Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Shanghai Pet Clinic"
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                />
              </div>

              {/* Visit Type */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  Visit Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Vaccination", "Check-up", "Emergency", "Surgery", "Dental", "Grooming"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        if (selectedVaccine.includes(type)) {
                          setSelectedVaccine(selectedVaccine.filter(v => v !== type));
                        } else {
                          setSelectedVaccine([...selectedVaccine, type]);
                        }
                      }}
                      className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                        selectedVaccine.includes(type)
                          ? "bg-[#64B5F6] border-[#64B5F6] text-white"
                          : "bg-[#FFF9F0] border-[#E8D5BF] text-[#6B5B4F] hover:bg-[#E3F2FD] hover:border-[#64B5F6]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vital Signs */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                  Vital Signs (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#A08B7E] mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="12.5"
                      step="0.1"
                      className="w-full px-3 py-2 bg-[#FFF9F0] border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A08B7E] mb-1">Temperature (°C)</label>
                    <input
                      type="number"
                      placeholder="38.5"
                      step="0.1"
                      className="w-full px-3 py-2 bg-[#FFF9F0] border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                    />
                  </div>
                </div>
              </div>

              {/* Doctor Notes */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  Doctor's Notes / Diagnosis
                </label>
                <textarea
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  placeholder="Record diagnosis, prescriptions, recommendations..."
                  className="w-full h-32 px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6] resize-none"
                />
              </div>

              {/* Medications */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  Medications (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Antibiotics, Vitamins..."
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                />
              </div>

              {/* Next Visit */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  Next Visit Date (Optional)
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Save Medical Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}