import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, BookOpen, ShoppingBag, Users, User } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/feeding", icon: BookOpen, label: "Guide" },
    { path: "/shop", icon: ShoppingBag, label: "Shop" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-full min-h-0 flex flex-col overflow-hidden bg-[#FFF9F0]">
      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="relative flex-shrink-0 bg-white border-t border-[#F5E6D3] shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center h-20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                  active ? "text-[#FF9F66]" : "text-[#A0A0A0]"
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
