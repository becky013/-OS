import { useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function PreparationScreen() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState([
    { id: 1, title: "Premium puppy food", checked: true },
    { id: 2, title: "Food & water bowls", checked: true },
    { id: 3, title: "Comfortable bed", checked: false },
    { id: 4, title: "Toys for mental stimulation", checked: false },
    { id: 5, title: "Collar & leash", checked: true },
    { id: 6, title: "First vet appointment booked", checked: false },
  ]);

  const tips = [
    {
      icon: "⚠️",
      title: "Stress Reaction",
      description: "First 48 hours: Your pet may hide, refuse food, or seem anxious. This is normal.",
    },
    {
      icon: "🍽️",
      title: "Digestion Care",
      description: "Stick to their previous food for 1 week before transitioning gradually.",
    },
    {
      icon: "🏡",
      title: "Safe Space",
      description: "Create a quiet area where your pet can retreat when overwhelmed.",
    },
  ];

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#F7F5F2] to-[#FFF9F0]">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#8B7355]" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-medium text-[#8B7355]">Preparation</h1>
          <p className="text-sm text-[#B8A89A] mt-1">Get ready for your new pet</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-6">
        {/* Checklist */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h2 className="text-lg font-medium text-[#8B7355] mb-4">Essential Checklist</h2>
          <div className="space-y-3">
            {checklist.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF9F0] transition-colors cursor-pointer"
              >
                <div
                  onClick={() => toggleCheck(item.id)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                    item.checked
                      ? "bg-[#FF9F66] border-[#FF9F66]"
                      : "border-[#D4C4B0]"
                  }`}
                >
                  {item.checked && <Check className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-sm ${
                    item.checked ? "text-[#A08B7E] line-through" : "text-[#6B5B4F]"
                  }`}
                >
                  {item.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-[#8B7355]">Important Tips</h2>
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex gap-3">
                <div className="text-2xl">{tip.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-[#8B7355] mb-1">{tip.title}</h3>
                  <p className="text-sm text-[#A08B7E] leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Products */}
        <div className="bg-gradient-to-br from-[#FFE8D6] to-[#FFF9F0] rounded-3xl p-5">
          <h2 className="text-lg font-medium text-[#8B7355] mb-4">Recommended Products</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#F5E6D3] rounded-xl flex items-center justify-center text-3xl">
                🍖
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#6B5B4F]">Puppy Premium Plus</h3>
                <p className="text-xs text-[#A08B7E] mb-1">For puppies 2-6 months</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#FF9F66]">$29.99</span>
                  <span className="text-xs text-[#A08B7E] line-through">$39.99</span>
                  <span className="text-xs bg-[#FFD166] text-[#6B5B4F] px-2 py-0.5 rounded-full">
                    25% off
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#E3F2FD] rounded-xl flex items-center justify-center text-3xl">
                🎾
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#6B5B4F]">Smart Chew Toy Set</h3>
                <p className="text-xs text-[#A08B7E] mb-1">Interactive & durable</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#FF9F66]">$19.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
