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
  Activity,
  FileText,
  Stethoscope,
  Thermometer,
  Scale,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";
import userAvatar from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_51_04_AM.png";
import petAvatar from "../../../imports/可爱柯基小犬与智能宠物标签_1.png";
import { useLanguage } from "../../i18n";

export function ProfileScreen() {
  const { t } = useLanguage();
  const [showPetProfile, setShowPetProfile] = useState(false);
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [showPhysicalCondition, setShowPhysicalCondition] = useState(false);
  const [showUploadMedical, setShowUploadMedical] = useState(false);
  const [medicalNotes, setMedicalNotes] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState<string[]>([]);

  const stats = [
    { label: t("Posts"), value: 24, icon: Camera },
    { label: t("Training Days"), value: 45, icon: Calendar },
    { label: t("Donations"), value: 3, icon: Heart },
  ];

  const achievements = [
    { name: t("7-Day Streak"), emoji: "🔥", date: t("Earned today") },
    { name: t("First Post"), emoji: "📸", date: t("March 15, 2026") },
    { name: t("Rescue Hero"), emoji: "❤️", date: t("April 1, 2026") },
    { name: t("Potty Master"), emoji: "🚽", date: t("March 25, 2026") },
    { name: t("Social Butterfly"), emoji: "🦋", date: t("March 20, 2026") },
  ];

  // Daily logs captured from the Home screen quick-log buttons (Feed / Water / Potty)
  const feedingLogs = [
    {
      date: t("Today"),
      fullDate: t("April 5, 2026"),
      meals: 3,
      water: 4,
      treats: 1,
      grams: 260,
      ml: 380,
      potty: 5,
      appetite: "Excellent",
      note: t("Finished every meal. Extra energetic after the morning walk."),
    },
    {
      date: t("Yesterday"),
      fullDate: t("April 4, 2026"),
      meals: 3,
      water: 5,
      treats: 2,
      grams: 270,
      ml: 430,
      potty: 6,
      appetite: "Excellent",
      note: t("Two training treats during the 'Sit' session."),
    },
    {
      date: t("April 3"),
      fullDate: t("April 3, 2026"),
      meals: 3,
      water: 3,
      treats: 1,
      grams: 230,
      ml: 290,
      potty: 4,
      appetite: "Fair",
      note: t("Left about a quarter of dinner. Drank less than usual."),
    },
    {
      date: t("April 2"),
      fullDate: t("April 2, 2026"),
      meals: 3,
      water: 4,
      treats: 2,
      grams: 245,
      ml: 360,
      potty: 6,
      appetite: "Good",
      note: t("One soft stool in the evening after trying a new treat brand."),
    },
    {
      date: t("April 1"),
      fullDate: t("April 1, 2026"),
      meals: 3,
      water: 5,
      treats: 1,
      grams: 255,
      ml: 400,
      potty: 5,
      appetite: "Excellent",
      note: t("Normal day. Slept through the night without waking."),
    },
  ];

  const petInfo = [
    { label: t("Name"), value: "Mochi" },
    { label: t("Breed"), value: t("Pembroke Welsh Corgi") },
    { label: t("Sex"), value: t("Male (not neutered)") },
    { label: t("Age"), value: t("4 months") },
    { label: t("Date of Birth"), value: t("December 8, 2025") },
    { label: t("Adopted"), value: t("March 1, 2026") },
    { label: t("Microchip"), value: t("NFC tag linked") },
    { label: t("Allergies"), value: t("None recorded") },
  ];

  const vitals = [
    { label: t("Weight"), value: "7.8", unit: "kg", icon: Scale, tone: "#FF9F66", hint: t("+0.5 kg this week") },
    { label: t("Temperature"), value: "38.4", unit: "°C", icon: Thermometer, tone: "#64B5F6", hint: t("Normal range") },
    { label: t("Heart Rate"), value: "112", unit: "bpm", icon: Activity, tone: "#EF5350", hint: t("Normal for puppy") },
    { label: t("Body Condition"), value: "5", unit: "/9", icon: Stethoscope, tone: "#66BB6A", hint: t("Ideal") },
  ];

  const weightTrend = [
    { label: t("Mar 8"), kg: 5.4 },
    { label: t("Mar 15"), kg: 6.1 },
    { label: t("Mar 22"), kg: 6.7 },
    { label: t("Mar 29"), kg: 7.3 },
    { label: t("Apr 5"), kg: 7.8 },
  ];

  const observations = [
    { date: t("April 5"), text: t("Coat shiny, eyes clear, no limping after a 15-minute walk."), tone: "good" },
    { date: t("April 3"), text: t("Slightly reduced appetite and water intake for one day. Back to normal the next morning."), tone: "watch" },
    { date: t("April 2"), text: t("One soft stool after a new treat brand. Treat discontinued, stool firm since."), tone: "watch" },
    { date: t("March 29"), text: t("Weekly weigh-in 7.3 kg — tracking along the breed growth curve."), tone: "good" },
    { date: t("March 25"), text: t("Second DHPP vaccination, no adverse reaction observed."), tone: "good" },
  ];

  const healthPlan = [
    { name: t("DHPP — 1st dose"), date: t("February 22, 2026"), status: "done" },
    { name: t("DHPP — 2nd dose"), date: t("March 25, 2026"), status: "done" },
    { name: t("Deworming"), date: t("March 30, 2026"), status: "done" },
    { name: t("Rabies vaccination"), date: t("Due April 22, 2026"), status: "upcoming" },
    { name: t("4-month health check"), date: t("Due April 12, 2026"), status: "upcoming" },
  ];

  const avgGrams = Math.round(
    feedingLogs.reduce((sum, log) => sum + log.grams, 0) / feedingLogs.length
  );
  const avgMl = Math.round(
    feedingLogs.reduce((sum, log) => sum + log.ml, 0) / feedingLogs.length
  );
  const avgPotty = (
    feedingLogs.reduce((sum, log) => sum + log.potty, 0) / feedingLogs.length
  ).toFixed(1);
  const maxWeight = Math.max(...weightTrend.map((w) => w.kg));
  const minWeight = Math.min(...weightTrend.map((w) => w.kg));
  // Scale bars from a baseline just below the lowest reading so week-to-week gains stay readable
  const barHeight = (kg: number) =>
    26 + ((kg - (minWeight - 0.8)) / (maxWeight - (minWeight - 0.8))) * 68;

  return (
    <div className="min-h-full bg-[#FFF9F0]">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-[#6B5B4F]">{t("Profile")}</h1>
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
            <p className="text-sm text-[#A08B7E]">{t("Pet parent since March 2026")}</p>
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
            <h2 className="text-lg font-semibold text-[#6B5B4F]">{t("My Pet")}</h2>
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
              <p className="text-sm text-[#A08B7E]">{t("Pembroke Welsh Corgi • 4 months")}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-2 py-1 rounded-full">
                  {t("Male")}
                </span>
                <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-1 rounded-full">
                  {t("Vaccinated")}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Medical Record - Clickable */}
        <button
          onClick={() => setShowMedicalRecord(true)}
          className="w-full bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#6B5B4F]">{t("Medical Record")}</h2>
            <ChevronRight className="w-5 h-5 text-[#A08B7E]" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-[#42A5F5]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-[#A08B7E] mb-2">
                {t("Physical condition & vet documents")}
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-[#E8F5E9] text-[#66BB6A] px-2 py-1 rounded-full">
                  {t("Healthy")}
                </span>
                <span className="text-xs bg-[#FFF3E0] text-[#FF9F66] px-2 py-1 rounded-full">
                  {t("2 upcoming")}
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
              <h2 className="font-semibold mb-1">{t("My Coupons")}</h2>
              <p className="text-sm opacity-90">{t("You have 6 coupons available")}</p>
            </div>
            <div className="text-3xl font-bold">6</div>
          </div>
          <button className="w-full bg-white text-[#FFD166] font-medium py-2.5 rounded-2xl hover:bg-opacity-90 transition-colors">
            {t("View Coupons")}
          </button>
        </div>

        {/* Charity Contribution */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#E8D5BF]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 flex-1">
              <Heart className="w-5 h-5 text-[#FF6B6B] fill-[#FF6B6B] mt-0.5" />
              <div className="flex-1">
                <h2 className="text-base font-semibold text-[#6B5B4F] mb-1">{t("Charity Contribution")}</h2>
                <p className="text-xs text-[#A08B7E] mb-2">{t("Convert points to donations")}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#66BB6A]">$85</span>
                  <span className="text-xs text-[#A08B7E]">{t("donated this year")}</span>
                </div>
              </div>
            </div>
            <button className="text-xs text-[#66BB6A] font-medium px-3 py-1.5 border border-[#66BB6A] rounded-full hover:bg-[#66BB6A] hover:text-white transition-colors whitespace-nowrap">
              {t("Donate")}
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
              <h2 className="font-semibold text-[#6B5B4F] mb-1">{t("Smart Pet Tag")}</h2>
              <p className="text-sm text-[#A08B7E]">{t("NFC tag connected")}</p>
            </div>
          </div>
          <button className="w-full bg-white text-[#64B5F6] font-medium py-2.5 rounded-2xl hover:bg-opacity-90 transition-colors">
            {t("Manage Device")}
          </button>
        </div>

        {/* Share Profile */}
        <button className="w-full bg-[#FF9F66] text-white font-medium py-3.5 rounded-2xl hover:bg-[#FF8A4D] transition-colors shadow-sm flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          {t("Share My Pet Profile")}
        </button>
      </div>

      {/* Pet Profile Modal */}
      {showPetProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#6B5B4F]">{t("Mochi's Profile")}</h2>
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
                    {t("Pembroke Welsh Corgi • 4 months")}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-2 py-1 rounded-full">
                      {t("Male")}
                    </span>
                    <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-1 rounded-full">
                      {t("Vaccinated")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FFE8D6] rounded-3xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#FFD166]" />
                  <h3 className="text-lg font-semibold text-[#6B5B4F]">{t("Achievements")}</h3>
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
                  <h3 className="text-lg font-semibold text-[#6B5B4F]">{t("Feeding Logs")}</h3>
                  <button className="text-sm text-[#FF9F66] font-medium">
                    {t("View All")}
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

              {/* Open Medical Record */}
              <button
                onClick={() => {
                  setShowMedicalRecord(true);
                  setShowPetProfile(false);
                }}
                className="w-full bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] text-white font-medium py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-5 h-5" />
                {t("Open Medical Record")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medical Record Hub Modal */}
      {showMedicalRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between z-10">
              <h2 className="text-xl font-semibold text-[#6B5B4F]">{t("Medical Record")}</h2>
              <button
                onClick={() => setShowMedicalRecord(false)}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B5B4F]" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              {/* Summary strip */}
              <div className="bg-gradient-to-r from-[#E3F2FD] to-[#F3E5F5] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F5E6D3] flex-shrink-0">
                  <ImageWithFallback
                    src={petAvatar}
                    alt="Mochi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#6B5B4F]">Mochi</h3>
                  <p className="text-xs text-[#A08B7E]">
                    {t("Pembroke Welsh Corgi • 4 months • 7.8 kg")}
                  </p>
                  <p className="text-xs text-[#66BB6A] mt-1 font-medium">
                    {t("Overall status: Healthy")}
                  </p>
                </div>
              </div>

              {/* Entry: Physical Condition Record */}
              <button
                onClick={() => {
                  setShowPhysicalCondition(true);
                  setShowMedicalRecord(false);
                }}
                className="w-full bg-white border border-[#E8D5BF] rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-[#66BB6A] transition-all text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-[#66BB6A]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[#6B5B4F]">{t("Physical Condition Record")}</h3>
                  <p className="text-xs text-[#A08B7E] mt-0.5">
                    {t("Vitals, growth and the last 5 days of feeding logs")}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A08B7E] flex-shrink-0" />
              </button>

              {/* Entry: Upload Medical Record */}
              <button
                onClick={() => {
                  setShowUploadMedical(true);
                  setShowMedicalRecord(false);
                }}
                className="w-full bg-white border border-[#E8D5BF] rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-[#64B5F6] transition-all text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                  <Upload className="w-6 h-6 text-[#42A5F5]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[#6B5B4F]">{t("Upload Medical Record")}</h3>
                  <p className="text-xs text-[#A08B7E] mt-0.5">
                    {t("Add clinic visits, prescriptions and report photos")}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A08B7E] flex-shrink-0" />
              </button>

              {/* Health plan preview */}
              <div className="bg-[#FFF9F0] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#FF9F66]" />
                  <h3 className="text-sm font-semibold text-[#6B5B4F]">{t("Vaccination & Care Plan")}</h3>
                </div>
                <div className="space-y-2">
                  {healthPlan.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          item.status === "done" ? "bg-[#66BB6A]" : "bg-[#FFB74D]"
                        }`}
                      />
                      <span className="text-xs text-[#6B5B4F] flex-1">{item.name}</span>
                      <span
                        className={`text-xs ${
                          item.status === "done" ? "text-[#A08B7E]" : "text-[#FF9F66] font-medium"
                        }`}
                      >
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Physical Condition Record Modal */}
      {showPhysicalCondition && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center gap-3 z-10">
              <button
                onClick={() => {
                  setShowPhysicalCondition(false);
                  setShowMedicalRecord(true);
                }}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5 text-[#6B5B4F]" />
              </button>
              <h2 className="text-lg font-semibold text-[#6B5B4F] flex-1">
                {t("Physical Condition Record")}
              </h2>
              <button
                onClick={() => setShowPhysicalCondition(false)}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-[#6B5B4F]" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Pet Information */}
              <div className="bg-white rounded-3xl border border-[#E8D5BF] p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5E6D3] flex-shrink-0">
                    <ImageWithFallback
                      src={petAvatar}
                      alt="Mochi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#6B5B4F]">Mochi</h3>
                    <p className="text-xs text-[#A08B7E]">{t("Record updated April 5, 2026")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {petInfo.map((info, index) => (
                    <div key={index}>
                      <p className="text-[11px] text-[#A08B7E]">{info.label}</p>
                      <p className="text-sm font-medium text-[#6B5B4F]">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Vitals */}
              <div>
                <h3 className="text-base font-semibold text-[#6B5B4F] mb-3">{t("Current Vitals")}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {vitals.map((vital, index) => {
                    const Icon = vital.icon;
                    return (
                      <div
                        key={index}
                        className="bg-[#FFF9F0] rounded-2xl p-4 border border-[#F0E2D0]"
                      >
                        <Icon className="w-5 h-5 mb-2" style={{ color: vital.tone }} />
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-semibold text-[#6B5B4F]">
                            {vital.value}
                          </span>
                          <span className="text-xs text-[#A08B7E]">{vital.unit}</span>
                        </div>
                        <p className="text-xs text-[#6B5B4F] mt-0.5">{vital.label}</p>
                        <p className="text-[11px] text-[#A08B7E] mt-1">{vital.hint}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Growth Trend */}
              <div className="bg-white rounded-3xl border border-[#E8D5BF] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#66BB6A]" />
                  <h3 className="text-base font-semibold text-[#6B5B4F]">{t("Weight Trend")}</h3>
                  <span className="text-xs text-[#66BB6A] ml-auto font-medium">
                    {t("+2.4 kg in 4 weeks")}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {weightTrend.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[11px] font-medium text-[#6B5B4F]">{point.kg}</span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#FFD9B8] to-[#FF9F66]"
                        style={{ height: `${barHeight(point.kg)}px` }}
                      />
                      <span className="text-[10px] text-[#A08B7E]">{point.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#A08B7E] mt-3">
                  {t("Tracking along the expected growth curve for a 4-month Pembroke Welsh Corgi (7–9 kg).")}
                </p>
              </div>

              {/* Recent Feeding Records */}
              <div className="bg-white rounded-3xl border border-[#E8D5BF] p-5">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-[#FF9F66]" />
                  <h3 className="text-base font-semibold text-[#6B5B4F]">
                    {t("Recent Feeding Records")}
                  </h3>
                </div>
                <p className="text-xs text-[#A08B7E] mb-4">
                  {t("Last 5 days, logged from the Home screen")}
                </p>

                {/* Averages */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-[#FFF9F0] rounded-xl p-3 text-center">
                    <div className="text-base font-semibold text-[#6B5B4F]">{avgGrams}g</div>
                    <div className="text-[10px] text-[#A08B7E]">{t("Avg food / day")}</div>
                  </div>
                  <div className="bg-[#F5FAFF] rounded-xl p-3 text-center">
                    <div className="text-base font-semibold text-[#6B5B4F]">{avgMl}ml</div>
                    <div className="text-[10px] text-[#A08B7E]">{t("Avg water / day")}</div>
                  </div>
                  <div className="bg-[#FCF7FD] rounded-xl p-3 text-center">
                    <div className="text-base font-semibold text-[#6B5B4F]">{avgPotty}</div>
                    <div className="text-[10px] text-[#A08B7E]">{t("Avg potty / day")}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {feedingLogs.map((log, index) => (
                    <div key={index} className="bg-[#FFF9F0] rounded-2xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium text-[#6B5B4F]">{log.date}</span>
                          <span className="text-[11px] text-[#A08B7E] ml-2">{log.fullDate}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            log.appetite === "Excellent"
                              ? "bg-[#E8F5E9] text-[#66BB6A]"
                              : log.appetite === "Good"
                              ? "bg-[#FFF3E0] text-[#FF9F66]"
                              : "bg-[#FFEBEE] text-[#EF5350]"
                          }`}
                        >
                          {t(log.appetite)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#A08B7E] mb-2">
                        <span>🍽️ {log.meals} {t("meals")} · {log.grams}g</span>
                        <span>💧 {log.water}× · {log.ml}ml</span>
                        <span>🦴 {log.treats} {t("treats")}</span>
                        <span>🚽 {log.potty}×</span>
                      </div>
                      <p className="text-[11px] text-[#8B7355] leading-relaxed">{log.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observations */}
              <div className="bg-white rounded-3xl border border-[#E8D5BF] p-5">
                <h3 className="text-base font-semibold text-[#6B5B4F] mb-4">
                  {t("Health Observations")}
                </h3>
                <div className="space-y-3">
                  {observations.map((observation, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <span
                          className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                            observation.tone === "good" ? "bg-[#66BB6A]" : "bg-[#FFB74D]"
                          }`}
                        />
                        {index < observations.length - 1 && (
                          <span className="w-px flex-1 bg-[#F0E2D0] mt-1" />
                        )}
                      </div>
                      <div className="pb-3">
                        <p className="text-xs font-medium text-[#6B5B4F]">{observation.date}</p>
                        <p className="text-xs text-[#A08B7E] leading-relaxed mt-0.5">
                          {observation.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assessment */}
              <div className="bg-[#EAF3FF] rounded-3xl p-4 border border-[#D4E7FF]">
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="w-4 h-4 text-[#5B7A9E]" />
                  <h3 className="text-sm font-semibold text-[#5B7A9E]">{t("AI Doctor Assessment")}</h3>
                </div>
                <p className="text-xs text-[#5B7A9E] leading-relaxed">
                  {t("Mochi's intake, hydration and growth are all within the healthy range for a 4-month-old Pembroke Welsh Corgi. The dip on April 3 was short-lived and followed a change of treats — worth watching, but not concerning on its own. Keep meals at 3 per day and book the 4-month check-up before April 12.")}
                </p>
              </div>

              {/* Actions */}
              <button
                onClick={() => {
                  setShowPhysicalCondition(false);
                  setShowUploadMedical(true);
                }}
                className="w-full bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                {t("Attach a Vet Report")}
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
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center gap-3 z-10">
              <button
                onClick={() => {
                  setShowUploadMedical(false);
                  setShowMedicalRecord(true);
                }}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5 text-[#6B5B4F]" />
              </button>
              <h2 className="text-lg font-semibold text-[#6B5B4F] flex-1">{t("Upload Medical Record")}</h2>
              <button
                onClick={() => setShowUploadMedical(false)}
                className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center hover:bg-[#E8D5BF] transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-[#6B5B4F]" />
              </button>
            </div>

            {/* Upload Content */}
            <div className="px-6 py-6 space-y-5">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  {t("Add Photos")}
                </label>
                <button className="w-full h-48 border-2 border-dashed border-[#E8D5BF] rounded-2xl bg-[#FFF9F0] hover:bg-[#FFE8D6] transition-colors flex flex-col items-center justify-center gap-3">
                  <Camera className="w-12 h-12 text-[#A08B7E]" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#6B5B4F]">{t("Tap to upload photos")}</p>
                    <p className="text-xs text-[#A08B7E] mt-1">{t("Or drag and drop here")}</p>
                  </div>
                </button>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    {t("Visit Date")}
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-04-05"
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                    {t("Visit Time")}
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
                  {t("Clinic/Hospital Name")}
                </label>
                <input
                  type="text"
                  placeholder={t("e.g., Shanghai Pet Clinic")}
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                />
              </div>

              {/* Visit Type */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  {t("Visit Type")}
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
                      {t(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vital Signs */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-3">
                  {t("Vital Signs (Optional)")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#A08B7E] mb-1">{t("Weight (kg)")}</label>
                    <input
                      type="number"
                      placeholder="7.8"
                      step="0.1"
                      className="w-full px-3 py-2 bg-[#FFF9F0] border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A08B7E] mb-1">{t("Temperature (°C)")}</label>
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
                  {t("Doctor's Notes / Diagnosis")}
                </label>
                <textarea
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  placeholder={t("Record diagnosis, prescriptions, recommendations...")}
                  className="w-full h-32 px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6] resize-none"
                />
              </div>

              {/* Medications */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  {t("Medications (Optional)")}
                </label>
                <input
                  type="text"
                  placeholder={t("e.g., Antibiotics, Vitamins...")}
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                />
              </div>

              {/* Next Visit */}
              <div>
                <label className="block text-sm font-medium text-[#6B5B4F] mb-2">
                  {t("Next Visit Date (Optional)")}
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D5BF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64B5F6]"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                {t("Save Medical Record")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}