import { Heart, Star, ShoppingCart, Truck, Plus, Minus } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import productImage from "../../../imports/250520_proplan-puppy_shred_chicken_rice_1080_01_1-1.png";
import probioticsImage from "../../../imports/IMG_0578_1.png";
import { useLanguage } from "../../i18n";

export function ShopScreen() {
  const { t } = useLanguage();
  const [cart, setCart] = useState<Record<number, number>>({});

  const products = [
    {
      id: 1,
      name: t("Puppy Premium Plus"),
      category: t("Puppy Food"),
      age: t("2-6 months"),
      price: 120,
      originalPrice: 160,
      discount: 25,
      rating: 4.8,
      reviews: 342,
      image: productImage,
      badge: t("Best for Mochi"),
    },
    {
      id: 2,
      name: t("Probiotics"),
      category: t("Supplement"),
      age: t("All ages"),
      price: 450,
      originalPrice: 590,
      discount: 24,
      rating: 4.9,
      reviews: 521,
      image: probioticsImage,
      badge: t("Popular"),
    },
    {
      id: 3,
      name: t("Puppy Growth Formula"),
      category: t("Puppy Food"),
      age: t("6-12 months"),
      price: 155,
      originalPrice: 199,
      discount: 22,
      rating: 4.7,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1697422836692-043e0fee1fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZG9nJTIwZm9vZCUyMGtpYmJsZXxlbnwxfHx8fDE3NzUyNzUxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: t("New"),
    },
  ];

  const addToCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find(p => p.id === Number(productId));
      return sum + (product ? product.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-full bg-[#FFF9F0]">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#6B5B4F]">{t("Proplan Shop")}</h1>
        <p className="text-sm text-[#A08B7E]">
          {t("Personalized recommendations for Mochi")}
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Rescue Support Banner */}
        <div className="bg-gradient-to-r from-[#81C784] to-[#66BB6A] rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-8 h-8 fill-white" />
            <div className="flex-1">
              <h2 className="font-semibold mb-1">{t("Support Rescue Animals")}</h2>
              <p className="text-sm opacity-90">
                {t("Convert your purchases into donations for shelters")}
              </p>
            </div>
          </div>
          <button className="w-full bg-white text-[#66BB6A] font-medium py-3 rounded-2xl hover:bg-opacity-90 transition-colors">
            {t("Learn More")}
          </button>
        </div>

        {/* Subscription Offer */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-[#FFD166]">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#FF9F66]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#6B5B4F] mb-1">
                {t("Monthly Subscription")}
              </h3>
              <p className="text-sm text-[#A08B7E] mb-2">
                {t("Save 15% with auto-delivery")}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#FFD166] text-[#6B5B4F] px-2 py-1 rounded-full font-medium">
                  {t("Free Shipping")}
                </span>
                <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-1 rounded-full font-medium">
                  {t("Cancel Anytime")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[#6B5B4F]">
            {t("Recommended for You")}
          </h2>
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-[#F5E6D3] rounded-xl overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#6B5B4F] truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#A08B7E]">{product.category} • {product.age}</p>
                    </div>
                    {product.badge && (
                      <span className="text-xs bg-[#FFD166] text-[#6B5B4F] px-2 py-1 rounded-full font-medium whitespace-nowrap">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-[#FFD166] fill-[#FFD166]" />
                    <span className="text-xs font-medium text-[#6B5B4F]">
                      {product.rating}
                    </span>
                    <span className="text-xs text-[#A08B7E]">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-semibold text-[#FF9F66]">
                          ¥{product.price}
                        </span>
                        <span className="text-xs text-[#A08B7E] line-through">
                          ¥{product.originalPrice}
                        </span>
                      </div>
                      <span className="text-xs bg-[#FFE8D6] text-[#FF9F66] px-2 py-0.5 rounded-full">
                        {product.discount}% {t("off")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {cart[product.id] > 0 ? (
                        <div className="flex items-center">
                          <button
                            className="bg-[#FF9F66] text-white p-2.5 rounded-xl hover:bg-[#FF8A4D] transition-colors"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="mx-2 text-[#6B5B4F] font-medium">
                            {cart[product.id]}
                          </span>
                          <button
                            className="bg-[#FF9F66] text-white p-2.5 rounded-xl hover:bg-[#FF8A4D] transition-colors"
                            onClick={() => addToCart(product.id)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-[#FF9F66] text-white p-2.5 rounded-xl hover:bg-[#FF8A4D] transition-colors"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Removed Rescue Donation Option */}
            </div>
          ))}
        </div>

        {/* Free Trial Banner */}
        <div className="bg-gradient-to-br from-[#FFE8D6] to-[#FFF9F0] rounded-3xl p-5">
          <div className="text-center">
            <div className="text-4xl mb-2">🎁</div>
            <h3 className="font-semibold text-[#6B5B4F] mb-1">{t("Free Trial Available")}</h3>
            <p className="text-sm text-[#A08B7E] mb-3">
              {t("Try any product risk-free for 14 days")}
            </p>
            <button className="bg-[#FF9F66] text-white font-medium py-2.5 px-6 rounded-full hover:bg-[#FF8A4D] transition-colors">
              {t("Start Free Trial")}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Shopping Cart */}
      {getTotalItems() > 0 && (
        <button
          className="fixed bottom-24 right-4 bg-[#FF9F66] text-white rounded-full p-4 shadow-2xl hover:bg-[#FF8A4D] transition-all hover:scale-110 z-10"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <div className="absolute -top-2 -right-2 bg-white text-[#FF9F66] rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
              {getTotalItems()}
            </div>
          </div>
          <div className="mt-1 text-xs font-medium">
            ¥{getTotalPrice().toFixed(0)}
          </div>
        </button>
      )}
    </div>
  );
}