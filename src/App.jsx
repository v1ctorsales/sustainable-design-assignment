import React, { useState } from "react";
import {
  Home,
  Camera,
  CloudRain,
  Mic,
  TrendingUp,
  Type,
  ChevronDown,
  ChevronUp,
  Sun,
  Cloud,
  Send,
  Plus,
  Minus,
  CloudLightning,
  Wind,
} from "lucide-react";

// --- MOCK SHADCN UI COMPONENTS ---
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- VIEWS ---

// 1. Home: Main screen with Açaí Price
// 1. Home: Main screen with Açaí Price
const HomeView = () => {
  const [showChart, setShowChart] = useState(false);

  // Mock historical data for the chart
  const historicalData = [
    { day: "Nov", price: 4.17 },
    { day: "Dec", price: 4.23 },
    { day: "Jan", price: 4.02 },
    { day: "Feb", price: 4.3 },
    { day: "Mar", price: 4.51 },
  ];

  // Find max price to calculate relative bar heights
  const maxPrice = Math.max(...historicalData.map((d) => d.price));

  const today = new Date();

  const getDynamicDate = (daysToSubtract) => {
    const date = new Date(today);
    date.setDate(date.getDate() - daysToSubtract);
    return date.toLocaleDateString("pt-BR");
  };

  // For the scheduled meeting (7 days in the future)
  const data7 = new Date(today);
  data7.setDate(today.getDate() + 7);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in">
      <h2 className="text-xl font-bold text-gray-800">Today's Market</h2>

      <Card className="bg-emerald-600 border-none text-white text-center p-0 shadow-md relative overflow-hidden transition-all duration-300">
        <div
          className={`p-6 transition-all duration-300 ${showChart ? "pb-12" : "pb-14"}`}
        >
          {!showChart ? (
            // Default View: Just Price and (per Kg)
            <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
              <h1 className="text-4xl text-emerald-700 font-black tracking-tighter mb-1">
                $4.51
              </h1>
              <p className="text-emerald-700 text-sm font-medium">(per Kg)</p>
            </div>
          ) : (
            // Chart View: Historical Prices
            <div className="flex flex-col h-40 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <hr className="border-emerald-700/20 w-full mb-3" />

              <h3 className="text-emerald-700 font-medium mb-4 text-sm">
                Price average for the past months
              </h3>

              <div className="relative flex-1 w-full flex items-end border-b border-emerald-500/50 pb-2">
                {/* SVG Line Chart Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pb-2 overflow-visible z-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polyline
                    // MUDANÇA AQUI: Trocamos * 100 por * 70 para abaixar a linha no eixo Y
                    points={historicalData
                      .map(
                        (d, i) =>
                          `${10 + i * 20},${100 - (d.price / maxPrice) * 70}`,
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#047857" // text-emerald-700
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Pontos da linha (bolinhas) */}
                  {historicalData.map((d, i) => (
                    <circle
                      key={`point-${i}`}
                      cx={10 + i * 20}
                      // MUDANÇA AQUI: Trocamos * 100 por * 70
                      cy={100 - (d.price / maxPrice) * 70}
                      r="2.5"
                      fill="#047857"
                      className="animate-in zoom-in"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </svg>

                {/* CSS Bar Chart (Fundo) */}
                <div className="flex justify-between items-end w-full h-full relative z-0">
                  {historicalData.map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1 h-full justify-end"
                    >
                      <span className="text-[10px] text-emerald-800 font-bold mb-1 z-20">
                        ${data.price.toFixed(2)}
                      </span>
                      <div
                        className="w-full max-w-[20px] bg-black/5 rounded-t-sm"
                        // MUDANÇA AQUI: Trocamos * 100% por * 70%
                        style={{ height: `${(data.price / maxPrice) * 70}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between w-full mt-2">
                {historicalData.map((data, index) => (
                  <span
                    key={index}
                    className="text-[10px] text-emerald-700 flex-1 text-center font-medium"
                  >
                    {data.day}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button for Toggle */}
        <button
          onClick={() => setShowChart(!showChart)}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 !bg-transparent !border-none !shadow-none outline-none p-2 flex items-center justify-center hover:!bg-black/5 active:scale-95 transition-transform z-10"
          aria-label={showChart ? "Hide Chart" : "Show Chart"}
        >
          {showChart ? (
            <Minus size={24} strokeWidth={3} className="text-black" />
          ) : (
            <Plus size={24} strokeWidth={3} className="text-black" />
          )}
        </button>
      </Card>

      {/* Header with WhatsApp Button */}
      <div className="flex items-center justify-between mt-4 mb-2">
        <h3 className="font-semibold text-gray-700">Recent News & Alerts</h3>
        <button className="flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-full shadow-sm hover:bg-[#20bd5a] active:scale-95 transition-all text-xs font-semibold">
          {/* WhatsApp Official SVG Icon */}
          <svg
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Share
        </button>
      </div>

      {/* Card 1: Today */}
      <Card className="flex p-0 overflow-hidden min-h-[88px]">
        <div className="w-24 bg-emerald-100 flex-shrink-0 relative">
          <img
            src="/static/imgs/acai3.jpg"
            alt="Açaí berries"
            className="absolute inset-0 w-full object-cover h-full"
          />
        </div>
        <div className="flex flex-col flex-1 p-3 justify-between">
          <p className="text-sm text-gray-600 leading-snug">
            Companies are buying heavily and for a good price this week. Good
            opportunity to sell!
          </p>
          <span className="text-[10px] font-medium text-gray-400 self-end mt-2">
            {getDynamicDate(0)}
          </span>
        </div>
      </Card>
      {/* Card 2: Today - 1 */}
      <Card className="flex p-0 overflow-hidden min-h-[88px]">
        <div className="w-24 bg-blue-100 flex-shrink-0 relative">
          <img
            src="/static/imgs/rio.jpg"
            alt="Meeting"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 p-3 justify-between">
          <p className="text-sm text-gray-600 leading-snug">
            Açaí collectors from Pará general meeting is scheduled to{" "}
            {data7.toLocaleDateString("pt-BR")}.
          </p>
          <span className="text-[10px] font-medium text-gray-400 self-end mt-2">
            {getDynamicDate(1)}
          </span>
        </div>
      </Card>

      {/* Card 3: Today - 2 */}
      <Card className="flex p-0 overflow-hidden min-h-[88px]">
        <div className="w-24 bg-amber-100 flex-shrink-0 relative">
          <img
            src="/static/imgs/lei.jpeg"
            alt="Law and Documents"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 p-3 justify-between">
          <p className="text-sm text-gray-600 leading-snug">
            New federal law could reduce taxation for açaí collectors. Know how
            you could benefit.
          </p>
          <span className="text-[10px] font-medium text-gray-400 self-end mt-2">
            {getDynamicDate(2)}
          </span>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        {/* Card 4: Today - 3 (The new card) */}
        <Card className="flex p-0 overflow-hidden min-h-[88px]">
          <div className="w-24 bg-orange-100 flex-shrink-0 relative">
            <img
              src="/static/imgs/rios.jpg"
              alt="River transport"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 p-3 justify-between">
            <p className="text-sm text-gray-600 leading-snug">
              River levels are rising steadily. Ensure safe transport by
              properly securing your harvest baskets.
            </p>
            <span className="text-[10px] font-medium text-gray-400 self-end mt-2">
              {getDynamicDate(3)}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 2. Log View: OCR / Voice / Text Entry
const LogView = () => (
  <div className="flex flex-col gap-4 animate-in fade-in">
    <h2 className="text-xl font-bold text-gray-800">Register Harvest</h2>
    <p className="text-sm text-gray-500">
      How would you like to record today's collection?
    </p>

    <div className="grid grid-cols-2 gap-4 mt-2">
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center py-6 h-32 gap-2"
      >
        <Camera size={32} />
        <span>Take Photo</span>
      </Button>
      <Button
        variant="outline"
        className="flex flex-col items-center justify-center py-6 h-32 gap-2"
      >
        <Mic size={32} />
        <span>Voice Memo</span>
      </Button>
    </div>

    <div className="relative mt-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-gray-50 text-gray-500">Or type manually</span>
      </div>
    </div>

    <Card className="flex items-center gap-2 mt-2">
      <Type size={20} className="text-gray-400" />
      <input
        type="number"
        placeholder="Enter Kg collected..."
        className="flex-1 bg-transparent outline-none text-gray-700"
      />
      <Button>Save</Button>
    </Card>
  </div>
);

// 3. Weather View: 7-day forecast with actionable insights
const WeatherView = () => {
  const [expandedDay, setExpandedDay] = useState(0);

  const forecast = [
    {
      day: "Today",
      temp: "28°C",
      icon: <Sun className="text-yellow-500" />,
      insight: "Excellent day to harvest. Clear skies expected all day.",
    },
    {
      day: "Tomorrow",
      temp: "26°C",
      icon: <CloudRain className="text-blue-500" />,
      insight:
        "Heavy rain expected in the afternoon. Anticipate your harvest to the morning.",
    },
    {
      day: "Wednesday",
      temp: "25°C",
      icon: <Cloud className="text-gray-400" />,
      insight: "Cloudy but safe for navigating the river. Good conditions.",
    },
    {
      day: "Thursday",
      temp: "27°C",
      icon: <CloudRain className="text-blue-400" />,
      insight:
        "Scattered morning showers. Harvesting is possible, but keep baskets covered to avoid spoiling the fruit.",
    },
    {
      day: "Friday",
      temp: "24°C",
      icon: <CloudLightning className="text-purple-600" />,
      insight:
        "High risk of thunderstorms. Avoid river transport today and stay safe.",
    },
    {
      day: "Saturday",
      temp: "31°C",
      icon: <Sun className="text-orange-500" />,
      insight:
        "Intense heat. Harvest early in the morning to preserve fruit quality and prevent dehydration.",
    },
    {
      day: "Sunday",
      temp: "29°C",
      icon: <Cloud className="text-gray-400" />,
      insight:
        "Stable and warm conditions. Ideal for planning the week's logistics and transport.",
    },
    {
      day: "Monday",
      temp: "26°C",
      icon: <Wind className="text-teal-500" />,
      insight:
        "Strong winds expected along the river. Secure boats properly and check for fallen branches in the grove.",
    },
    {
      day: "Tuesday",
      temp: "25°C",
      icon: <CloudRain className="text-blue-600" />,
      insight:
        "Prolonged rainfall returning. Focus on equipment maintenance and indoor tasks.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 animate-in fade-in pb-20">
      <h2 className="text-xl font-bold text-gray-800">Weather Insights</h2>

      <div className="flex flex-col gap-3">
        {forecast.map((item, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all ${
              expandedDay === index ? "border-emerald-500 bg-emerald-50/30" : ""
            }`}
          >
            <div
              className="flex items-center justify-between p-4"
              onClick={() =>
                setExpandedDay(expandedDay === index ? null : index)
              }
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-semibold text-gray-700">{item.day}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-bold">{item.temp}</span>
                {expandedDay === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            {expandedDay === index && (
              <div className="px-4 pb-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed mt-2 pt-3">
                <span className="font-semibold text-emerald-700 block mb-1">
                  Recommendation:
                </span>
                {item.insight}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// 4. Chatbot View: Voice interaction
const ChatView = () => (
  <div className="flex flex-col h-full animate-in fade-in">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Voice Assistant</h2>

    <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 mb-4 overflow-y-auto flex flex-col gap-4">
      {/* Mock Chat bubbles */}
      <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none self-start max-w-[80%]">
        <p className="text-sm text-gray-700">
          Hello! Ask me about prices, weather, or farming tips using your voice.
        </p>
      </div>
      <div className="bg-emerald-100 p-3 rounded-lg rounded-tr-none self-end max-w-[80%]">
        <p className="text-sm text-emerald-900">🎤 Audio message (0:04s)</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none self-start max-w-[80%] flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
          <Mic size={16} />
        </div>
        <p className="text-sm text-gray-700">Playing response...</p>
      </div>
    </div>

    <div className="flex justify-center items-center py-4">
      <button className="bg-emerald-600 text-white w-20 h-20 rounded-full shadow-lg shadow-emerald-200 flex items-center justify-center hover:bg-emerald-700 transition-transform active:scale-95">
        <Mic size={36} />
      </button>
    </div>
    <p className="text-center text-xs text-gray-400 mt-2">Tap and speak</p>
  </div>
);

// --- MAIN APP LAYOUT ---
export default function AcaiApp() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 flex justify-center">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md bg-gray-50 h-screen flex flex-col relative shadow-2xl overflow-hidden">
        {/* Top Header */}
        <header className="bg-emerald-700 text-white p-4 shadow-sm flex items-center justify-between z-10">
          <h1 className="text-4xl font-bold tracking-wide">Açaí Harvest Hub</h1>
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold">
            RC
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          {activeTab === "home" && <HomeView />}
          {activeTab === "log" && <LogView />}
          {activeTab === "weather" && <WeatherView />}
          {activeTab === "chat" && <ChatView />}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-10 pb-safe">
          <NavItem
            icon={<Home size={24} />}
            label="Home"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <NavItem
            icon={<Camera size={24} />}
            label="Log"
            isActive={activeTab === "log"}
            onClick={() => setActiveTab("log")}
          />
          <NavItem
            icon={<CloudRain size={24} />}
            label="Weather"
            isActive={activeTab === "weather"}
            onClick={() => setActiveTab("weather")}
          />
          <NavItem
            icon={<Mic size={24} />}
            label="Assistant"
            isActive={activeTab === "chat"}
            onClick={() => setActiveTab("chat")}
          />
        </nav>
      </div>
    </div>
  );
}

// Helper for Bottom Nav
const NavItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-16 transition-colors ${
      isActive ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"
    }`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
