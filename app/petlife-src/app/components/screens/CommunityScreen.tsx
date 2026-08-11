import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  Search,
  AlertCircle,
  Star,
} from "lucide-react";
import recommendIcon from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_40_35_AM_2.png";
import eventsIcon from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_40_35_AM_3.png";
import findIcon from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_40_35_AM_4.png";
import lostPetsIcon from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_40_35_AM_5.png";
import adoptionIcon from "../../../imports/ChatGPT_Image_Apr_19,_2026,_01_40_35_AM_6.png";

export function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<"recommend" | "events" | "find" | "lost" | "adoption">(
    "recommend"
  );

  const menuItems = [
    {
      id: "recommend",
      label: "Recommend",
      icon: "📱",
      image: recommendIcon,
    },
    {
      id: "events",
      label: "Events",
      icon: "📅",
      image: eventsIcon,
    },
    {
      id: "find",
      label: "Find",
      icon: "🗺️",
      image: findIcon,
    },
    {
      id: "lost",
      label: "Lost Pets",
      icon: "🔔",
      image: lostPetsIcon,
    },
    {
      id: "adoption",
      label: "Adoption",
      icon: "❤️",
      image: adoptionIcon,
    },
  ];

  return (
    <div className="min-h-full bg-[#FFF9F0]">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#6B5B4F] mb-3">Community</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A08B7E]" />
          <input
            type="text"
            placeholder="Search posts, events, pets..."
            className="w-full pl-10 pr-4 py-3 bg-[#FFF9F0] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F66]"
          />
        </div>
      </div>

      {/* Menu - 5 items in one row */}
      <div className="px-4 py-4 bg-white border-b border-[#F5E6D3]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className="flex-1 min-w-0 flex flex-col items-center gap-2 py-3 px-2 transition-all"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`text-[10px] font-medium text-center leading-tight ${
                activeTab === item.id ? "text-[#FF9F66]" : "text-[#8B7355]"
              }`}>
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === "recommend" && <RecommendContent />}
        {activeTab === "events" && <EventsContent />}
        {activeTab === "find" && <FindContent />}
        {activeTab === "lost" && <LostPetsContent />}
        {activeTab === "adoption" && <AdoptionContent />}
      </div>
    </div>
  );
}

function RecommendContent() {
  const posts = [
    {
      id: 1,
      user: { name: "Emma Wilson", avatar: "👩" },
      time: "2 hours ago",
      content: "Milo learned to sit today! So proud of my little guy 🥹",
      hashtags: ["#puppygrowth", "#trainingchallenge"],
      image: "https://images.unsplash.com/photo-1651212508936-dfb6f6ea3d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMHB1cHB5fGVufDF8fHx8MTc3NTI3NTYwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 127,
      comments: 23,
    },
    {
      id: 2,
      user: { name: "Sarah Chen", avatar: "👩" },
      time: "5 hours ago",
      content: "Luna's first visit to the dog park! She made so many friends 🐕",
      hashtags: ["#puppygrowth", "#dogpark"],
      image: "https://images.unsplash.com/photo-1764942988847-bdc223f6391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwYXJrJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzUzODEzNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 89,
      comments: 15,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Post Button */}
      <button className="w-full bg-[#FF9F66] text-white font-medium py-3 rounded-2xl hover:bg-[#FF8A4D] transition-colors shadow-sm">
        Share Your Pet's Story
      </button>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-3xl p-4 shadow-sm">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#FFE8D6] rounded-full flex items-center justify-center text-xl">
              {post.user.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#6B5B4F]">{post.user.name}</h3>
              <p className="text-xs text-[#A08B7E]">{post.time}</p>
            </div>
          </div>

          {/* Content */}
          <p className="text-sm text-[#6B5B4F] mb-2">{post.content}</p>
          <div className="flex gap-2 mb-3">
            {post.hashtags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-[#64B5F6] bg-[#E3F2FD] px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Image */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3">
            <ImageWithFallback
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 border-t border-[#F5E6D3]">
            <button className="flex items-center gap-2 text-sm text-[#A08B7E] hover:text-[#FF9F66] transition-colors">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-[#A08B7E] hover:text-[#64B5F6] transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-[#A08B7E] hover:text-[#81C784] transition-colors ml-auto">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventsContent() {
  const events = [
    {
      id: 1,
      title: "Pet School: Basic Training",
      date: "April 12, 2026",
      time: "10:00 AM - 12:00 PM",
      location: "Central Park - North Meadow",
      attendees: 24,
      maxAttendees: 30,
      category: "Training",
      emoji: "🎓",
    },
    {
      id: 2,
      title: "Puppy Playdate Social",
      date: "April 15, 2026",
      time: "2:00 PM - 4:00 PM",
      location: "Riverside Dog Park",
      attendees: 18,
      maxAttendees: 25,
      category: "Social",
      emoji: "🐾",
    },
    {
      id: 3,
      title: "Pet Care Workshop",
      date: "April 20, 2026",
      time: "6:00 PM - 8:00 PM",
      location: "Pet Haven Community Center",
      attendees: 12,
      maxAttendees: 20,
      category: "Workshop",
      emoji: "🏥",
    },
  ];

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FFE8D6] rounded-2xl flex items-center justify-center text-2xl shrink-0">
              {event.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-[#6B5B4F]">{event.title}</h3>
                <span className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-2 py-1 rounded-full">
                  {event.category}
                </span>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-sm text-[#A08B7E]">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A08B7E]">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A08B7E]">
                  {event.attendees}/{event.maxAttendees} attending
                </span>
                <button className="bg-[#FF9F66] text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-[#FF8A4D] transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FindContent() {
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);

  const places = [
    {
      id: 1,
      name: "WEST BUND",
      type: "Dog Park",
      rating: 4.8,
      distance: "0.5 km",
      rules: "Leash required until inside",
      emoji: "🛝",
      coordinates: { lat: 31.1637, lng: 121.4543 },
      reviews: [
        {
          user: "Mike Johnson",
          rating: 5,
          comment: "Perfect for puppies! Very clean and well-maintained. Mochi loves playing here!",
          date: "2 days ago",
          petFriendly: true,
        },
        {
          user: "Lisa Wang",
          rating: 4,
          comment: "Great space but can get crowded on weekends. Best time is early morning.",
          date: "1 week ago",
          petFriendly: true,
        },
        {
          user: "Tom Brown",
          rating: 5,
          comment: "Excellent facilities with separate areas for small and large dogs. Highly recommend!",
          date: "2 weeks ago",
          petFriendly: true,
        },
      ],
    },
    {
      id: 2,
      name: "Paws & Coffee",
      type: "Pet-Friendly Cafe",
      rating: 4.9,
      distance: "1.2 km",
      rules: "Outdoor seating only",
      emoji: "☕",
      coordinates: { lat: 31.1700, lng: 121.4600 },
      reviews: [
        {
          user: "Emma Davis",
          rating: 5,
          comment: "Love this place! They have water bowls and treats for pets. Staff is super friendly.",
          date: "3 days ago",
          petFriendly: true,
        },
      ],
    },
    {
      id: 3,
      name: "Pet Paradise Store",
      type: "Pet Store",
      rating: 4.7,
      distance: "0.8 km",
      rules: "All pets welcome",
      emoji: "🏪",
      coordinates: { lat: 31.1580, lng: 121.4500 },
      reviews: [
        {
          user: "Sarah Chen",
          rating: 4,
          comment: "Good selection of products. Prices are reasonable.",
          date: "5 days ago",
          petFriendly: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Google Map Style View */}
      <div className="w-full h-72 bg-[#E8E4DC] rounded-3xl overflow-hidden relative shadow-md">
        {/* Realistic map background with streets and water */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F2F0EB] to-[#E8E4DC]">
          {/* Streets pattern */}
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="streets" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="#F5F3EE"/>
                <line x1="0" y1="30" x2="60" y2="30" stroke="#E1DDD5" strokeWidth="1.5"/>
                <line x1="30" y1="0" x2="30" y2="60" stroke="#E1DDD5" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)" />
          </svg>
          
          {/* River/Water area - Huangpu River */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-[#B8D4E8] opacity-40 transform rotate-12 translate-x-1/4"></div>
          
          {/* Green areas */}
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-[#C8E6C9] opacity-30"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-[#C8E6C9] opacity-30"></div>
        </div>

        {/* Map labels */}
        <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-xl shadow-sm text-xs font-medium text-[#8B7355] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#FF6B6B]" />
          Shanghai
        </div>

        {/* Zoom controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-[#8B7355] font-bold hover:bg-gray-50 transition-colors">
            +
          </button>
          <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-[#8B7355] font-bold hover:bg-gray-50 transition-colors">
            −
          </button>
        </div>

        {/* Current location indicator */}
        <div className="absolute top-4 right-16 w-3 h-3 bg-[#4285F4] rounded-full shadow-lg border-2 border-white animate-pulse"></div>

        {/* Place markers on map */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* WEST BUND marker - featured */}
          <div className="relative">
            <button
              onClick={() => setSelectedPlace(selectedPlace === 1 ? null : 1)}
              className="relative group"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 transition-transform group-hover:scale-110">
                <MapPin className="w-12 h-12 text-[#FF6B6B] fill-[#FF6B6B] drop-shadow-lg" />
              </div>
              <div className="bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-medium text-[#6B5B4F] whitespace-nowrap mt-2 border border-gray-200">
                🛝 WEST BUND
              </div>
            </button>
          </div>

          {/* Additional markers */}
          <div className="absolute top-1/3 right-1/4">
            <button
              onClick={() => setSelectedPlace(selectedPlace === 2 ? null : 2)}
              className="group"
            >
              <MapPin className="w-8 h-8 text-[#64B5F6] fill-[#64B5F6] drop-shadow-lg transition-transform group-hover:scale-110" />
            </button>
          </div>
          <div className="absolute bottom-1/3 left-1/3">
            <button
              onClick={() => setSelectedPlace(selectedPlace === 3 ? null : 3)}
              className="group"
            >
              <MapPin className="w-8 h-8 text-[#81C784] fill-[#81C784] drop-shadow-lg transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        {/* Street labels (Google Maps style) */}
        <div className="absolute bottom-1/2 left-1/4 text-[10px] font-medium text-[#5F6368] opacity-60 transform -rotate-12">
          Longteng Ave
        </div>
        <div className="absolute top-1/3 right-1/2 text-[10px] font-medium text-[#5F6368] opacity-60">
          Ruining Rd
        </div>
      </div>

      {/* Selected Place Reviews */}
      {selectedPlace && (
        <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-[#FF9F66]">
          {places
            .filter((place) => place.id === selectedPlace)
            .map((place) => (
              <div key={place.id}>
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-[#F5E6D3]">
                  <div className="text-3xl">{place.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#6B5B4F] mb-1">{place.name}</h3>
                    <p className="text-sm text-[#A08B7E] mb-2">
                      {place.type} • ⭐ {place.rating} • {place.distance}
                    </p>
                    <p className="text-xs bg-[#FFF9F0] text-[#6B5B4F] px-2 py-1 rounded-lg inline-block">
                      📋 {place.rules}
                    </p>
                  </div>
                </div>

                <h4 className="font-semibold text-[#6B5B4F] mb-3">User Reviews</h4>
                <div className="space-y-3">
                  {place.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-[#FFF9F0] rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-[#6B5B4F] text-sm">
                            {review.user}
                          </h5>
                          <p className="text-xs text-[#A08B7E]">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "text-[#FFD166] fill-[#FFD166]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#6B5B4F] mb-2">{review.comment}</p>
                      {review.petFriendly && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-2 py-1 rounded-full">
                            ✓ Pet Friendly
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-[#FF9F66] text-white font-medium py-3 rounded-xl hover:bg-[#FF8A4D] transition-colors">
                  Add Your Review
                </button>
              </div>
            ))}
        </div>
      )}

      <h2 className="text-lg font-semibold text-[#6B5B4F]">Nearby Places</h2>

      {places.map((place) => (
        <button
          key={place.id}
          onClick={() => setSelectedPlace(selectedPlace === place.id ? null : place.id)}
          className={`w-full bg-white rounded-2xl p-4 shadow-sm transition-all ${
            selectedPlace === place.id ? "ring-2 ring-[#FF9F66]" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#FFE8D6] rounded-xl flex items-center justify-center text-2xl shrink-0">
              {place.emoji}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-[#6B5B4F]">{place.name}</h3>
                <span className="text-xs text-[#A08B7E]">{place.distance}</span>
              </div>
              <p className="text-sm text-[#A08B7E] mb-2">{place.type} • ⭐ {place.rating}</p>
              <p className="text-xs text-[#6B5B4F] bg-[#FFF9F0] px-2 py-1 rounded-lg inline-block">
                📋 {place.rules}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function LostPetsContent() {
  const lostPets = [
    {
      id: 1,
      name: "Max",
      type: "Golden Retriever",
      lastSeen: "Downtown - 5th Ave",
      time: "3 hours ago",
      distance: "1.2 miles away",
      contact: "Contact Sarah",
      image: "https://images.unsplash.com/photo-1651212508936-dfb6f6ea3d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMHB1cHB5fGVufDF8fHx8MTc3NTI3NTYwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Alert Banner */}
      <div className="bg-[#FFE8D6] rounded-3xl p-5 border-2 border-[#FF9F66]">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-[#FF9F66] shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-[#6B5B4F] mb-1">Help Find Lost Pets</h3>
            <p className="text-sm text-[#A08B7E] mb-3">
              Enable location to see lost pets near you
            </p>
            <button className="bg-[#FF9F66] text-white text-sm font-medium py-2 px-4 rounded-xl hover:bg-[#FF8A4D] transition-colors">
              Enable Location
            </button>
          </div>
        </div>
      </div>

      {/* Post Lost Pet Button */}
      <button className="w-full bg-white text-[#FF9F66] font-medium py-3 rounded-2xl border-2 border-[#FF9F66] hover:bg-[#FFF9F0] transition-colors">
        Report Lost Pet
      </button>

      {/* Lost Pets */}
      {lostPets.map((pet) => (
        <div key={pet.id} className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-[#F5E6D3] rounded-2xl overflow-hidden shrink-0">
              <ImageWithFallback
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-[#6B5B4F]">{pet.name}</h3>
                  <p className="text-sm text-[#A08B7E]">{pet.type}</p>
                </div>
                <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-1 rounded-full">
                  URGENT
                </span>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2 text-xs text-[#A08B7E]">
                  <MapPin className="w-3 h-3" />
                  <span>{pet.lastSeen}</span>
                </div>
                <p className="text-xs text-[#A08B7E]">{pet.time} • {pet.distance}</p>
              </div>
              <button className="w-full bg-[#FF9F66] text-white text-sm font-medium py-2 rounded-xl hover:bg-[#FF8A4D] transition-colors">
                {pet.contact}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdoptionContent() {
  const adoptionPets = [
    {
      id: 1,
      name: "Bella",
      type: "Mixed Breed",
      age: "8 months",
      gender: "Female",
      organization: "Happy Paws Rescue",
      location: "Downtown Shelter",
      image: "https://images.unsplash.com/photo-1769634847839-64142e1dd4c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBhZG9wdGlvbiUyMHNoZWx0ZXJ8ZW58MXx8fHwxNzc1MzgxMzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      traits: ["Friendly", "Vaccinated", "House-trained"],
    },
  ];

  return (
    <div className="space-y-4">
      {adoptionPets.map((pet) => (
        <div key={pet.id} className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4">
            <ImageWithFallback
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-3">
            <h3 className="text-xl font-semibold text-[#6B5B4F] mb-1">{pet.name}</h3>
            <p className="text-sm text-[#A08B7E] mb-3">
              {pet.type} • {pet.age} • {pet.gender}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {pet.traits.map((trait, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#E3F2FD] text-[#64B5F6] px-3 py-1 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-[#A08B7E] mb-4">
              <MapPin className="w-4 h-4" />
              <span>{pet.organization} • {pet.location}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-[#FF9F66] text-white font-medium py-3 rounded-xl hover:bg-[#FF8A4D] transition-colors">
              Adopt
            </button>
            <button className="flex-1 bg-[#F5E6D3] text-[#6B5B4F] font-medium py-3 rounded-xl hover:bg-[#E8D5BF] transition-colors">
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}