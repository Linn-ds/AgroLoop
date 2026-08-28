/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { User, CheckCircle2, MapPin, BarChart3, Package, CloudSun, X, Map as MapIcon, AlertTriangle, ChevronLeft, Phone, Globe, Sun, CloudRain, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const priceData = [
  { day: 'Mon', price: 2800 },
  { day: 'Tue', price: 2750 },
  { day: 'Wed', price: 2700 },
  { day: 'Thu', price: 2600 },
  { day: 'Fri', price: 2550 },
  { day: 'Sat', price: 2500 },
  { day: 'Sun', price: 2500 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [showBid, setShowBid] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lang, setLang] = useState('en');
  const [showMapModal, setShowMapModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const t = (enStr: string, myStr: string) => lang === 'en' ? enStr : myStr;

  const handleDecision = () => {
    setShowBid(false);
    setToastMessage(t("Decision recorded. AgriLoop Hub Operator has been notified.", "ဆုံးဖြတ်ချက် မှတ်တမ်းတင်ထားပါသည်။ AgriLoop Hub အော်ပရေတာကို အကြောင်းကြားထားပါသည်။"));
    
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'my' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center sm:p-6 font-sans">
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-[800px] bg-gray-100 sm:rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col sm:border-[12px] sm:border-gray-700">
        
        {/* App Header */}
        <header className="bg-white px-6 pt-10 pb-5 border-b border-gray-200 flex items-center justify-between shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowProfileModal(true)}
              className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 border-2 border-[#2D6A4F] font-bold active:scale-95 transition-transform"
              title="View Profile"
            >
              <User size={20} />
            </button>
            <div>
              <h1 className="text-[14px] font-bold text-gray-900 leading-tight">{t("Hello, Aung", "မင်္ဂလာပါ အောင်")}</h1>
              <p className="text-[12px] text-gray-500 font-medium">{t("My Farm Dashboard", "ကျွန်ုပ်၏ လယ်ယာဒက်ရှ်ဘုတ်")}</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]"></div>
              <span className="text-[12px] font-medium text-gray-500">{t("Hub Connected", "ဟပ်ချိတ်ဆက်ထားသည်")}</span>
            </div>
            <button 
              onClick={() => setShowMapModal(true)}
              className="flex items-center gap-1 text-[11px] font-bold text-[#1E3A8A] bg-blue-50 px-2 py-1 rounded-full active:scale-95 transition-transform"
            >
              <MapPin size={12} /> {t("Hub Locations", "ဟပ်တည်နေရာများ")}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-5 pb-32">
          
          <AnimatePresence mode="wait">
            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Inventory Card */}
                <section className="bg-white rounded-[20px] p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[14px] font-bold text-gray-700 uppercase tracking-wide">{t("My Inventory", "ကျွန်ုပ်၏ ကုန်ပစ္စည်း")}</h2>
                    <button 
                      onClick={() => setShowReportModal(true)}
                      className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md active:scale-95 transition-transform"
                    >
                      <AlertTriangle size={12} /> {t("Report Error", "အမှားတင်ပြရန်")}
                    </button>
                  </div>
                  
                  <div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-[13px] text-gray-600">{t("Commodity:", "ကုန်စည်:")} <span className="font-semibold text-gray-900">{t("Tomatoes", "ခရမ်းချဉ်သီး")}</span></div>
                      <div className="text-[13px] text-gray-600">{t("Grade:", "အဆင့်:")} <span className="font-semibold text-gray-900">A</span></div>
                      <div className="text-[13px] text-gray-600">{t("Amount:", "ပမာဏ:")} <span className="font-semibold text-gray-900">250 kg</span></div>
                      <div className="text-[13px] text-gray-600">{t("Crates:", "သေတ္တာ:")} <span className="font-semibold text-gray-900">10</span></div>
                    </div>

                    <div className="bg-sky-100 text-sky-700 py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                      <span>❄️</span>
                      <span>{t("10°C Pre-Cooled (14 days shelf life remaining)", "၁၀°C အအေးခံထားသည် (သက်တမ်း ၁၄ ရက် ကျန်သေးသည်)")}</span>
                    </div>
                  </div>
                </section>

                {/* B2B Smart Match Bid */}
                <AnimatePresence>
                  {showBid && (
                    <motion.section 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20, height: 0, marginTop: 0, padding: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#F0FFF4] rounded-[20px] p-4 border-2 border-[#2D6A4F]"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <h2 className="text-[14px] font-bold text-[#065F46] uppercase tracking-wide">🔔 {t("1 New Buyer Offer", "ဝယ်ယူသူ ကမ်းလှမ်းချက်အသစ် ၁ ခု")}</h2>
                        </div>
                        <p className="text-[14px] text-[#065F46] leading-[1.4]">
                          <span className="font-bold">Mandalay Canning Factory</span> {t("is offering a guaranteed floor price of", "သည် အာမခံကြမ်းခင်းဈေး")} <span className="font-bold">2,300 MMK/kg</span> {t("for all 10 crates.", "ဖြင့် သေတ္တာ ၁၀ လုံးလုံးကို ကမ်းလှမ်းထားသည်။")}
                        </p>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Market Intelligence Card */}
                <section className="bg-white rounded-[20px] p-4 shadow-sm">
                  <h2 className="text-[14px] font-bold text-gray-700 uppercase tracking-wide mb-3">{t("Live Market Pulse", "ဈေးကွက် အခြေအနေ")}</h2>
                  
                  <div className="text-[#D00000] font-bold text-[15px] mb-2.5">
                     {t("Yangon Wholesale: 2,500 MMK/kg (Price Dropping ⬇️)", "ရန်ကုန် လက်ကား: ၂၅၀၀ ကျပ်/ကီလို (ဈေးကျနေသည် ⬇️)")}
                  </div>

                  <div className="border-t border-gray-100 pt-2.5 mt-2.5 mb-4">
                     <div className="flex justify-between text-[13px] py-1 text-gray-600">
                        <span>{t("Cabbage", "ဂေါ်ဖီထုပ်")}</span>
                        <span>{t("800 MMK (Stable)", "၈၀၀ ကျပ် (တည်ငြိမ်)")}</span>
                     </div>
                     <div className="flex justify-between text-[13px] py-1 text-gray-600">
                        <span>{t("Green Chillies", "ငရုတ်သီးစိမ်း")}</span>
                        <span className="text-[#059669] font-semibold">{t("3,500 MMK (Rising)", "၃၅၀၀ ကျပ် (တက်နေသည်)")}</span>
                     </div>
                  </div>

                  {/* Recharts Mini Bar Chart */}
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">{t("Tomato Price History (Last 7 Days)", "ခရမ်းချဉ်သီး ဈေးနှုန်း သမိုင်း (ပြီးခဲ့သော ၇ ရက်)")}</h3>
                    <div className="h-32 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                          <YAxis domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                            itemStyle={{ color: '#065F46', fontWeight: 'bold' }}
                            labelStyle={{ color: '#6B7280' }}
                          />
                          <Bar dataKey="price" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'hubs' && (
              <motion.div
                key="hubs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <section className="bg-white rounded-[20px] p-4 shadow-sm">
                  <h2 className="text-[14px] font-bold text-gray-700 uppercase tracking-wide mb-3">{t("AgriLoop Hubs", "AgriLoop ဟပ်များ")}</h2>
                  <p className="text-[13px] text-gray-600 mb-4">
                    {t("Find the nearest cold storage and collection centers for your produce.", "သင်၏ ထွက်ကုန်များအတွက် အနီးဆုံး အအေးခန်းနှင့် စုဆောင်းရေးစင်တာများကို ရှာပါ။")}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-100 rounded-xl bg-gray-50 flex items-start gap-3">
                      <div className="mt-1 text-[#2D6A4F]"><MapPin size={18} /></div>
                      <div>
                        <h4 className="font-bold text-[14px] text-gray-900">Yangon Central Hub</h4>
                        <p className="text-[12px] text-gray-500">12km away • Capacity: 85% full</p>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-100 rounded-xl bg-gray-50 flex items-start gap-3">
                      <div className="mt-1 text-[#2D6A4F]"><MapPin size={18} /></div>
                      <div>
                        <h4 className="font-bold text-[14px] text-gray-900">Bago Regional Center</h4>
                        <p className="text-[12px] text-gray-500">45km away • Capacity: 40% full</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowMapModal(true)}
                    className="w-full mt-4 p-3 bg-blue-50 text-[#1E3A8A] font-bold text-[14px] rounded-[12px] flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <MapIcon size={16} /> {t("View Interactive Map", "အပြန်အလှန် မြေပုံကို ကြည့်ပါ")}
                  </button>
                </section>
              </motion.div>
            )}

            {activeTab === 'weather' && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <section className="bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-[20px] p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-[24px] font-bold leading-tight">Yangon</h2>
                      <p className="text-sky-100 text-[13px] font-medium">{t("Partly Cloudy", "တိမ်အနည်းငယ်ထူထပ်သည်")}</p>
                    </div>
                    <CloudSun size={40} className="text-yellow-300 drop-shadow-md" />
                  </div>
                  <div className="text-[48px] font-bold leading-none mb-4">28°C</div>
                  <div className="grid grid-cols-2 gap-4 border-t border-sky-300/30 pt-4 mt-2">
                    <div>
                      <div className="text-sky-100 text-[11px] uppercase tracking-wide">{t("Humidity", "စိုထိုင်းဆ")}</div>
                      <div className="font-semibold text-[14px]">65%</div>
                    </div>
                    <div>
                      <div className="text-sky-100 text-[11px] uppercase tracking-wide">{t("Precipitation", "မိုးရွာသွန်းမှု")}</div>
                      <div className="font-semibold text-[14px]">10%</div>
                    </div>
                  </div>
                </section>

                {/* 5-Day Forecast */}
                <section className="bg-white rounded-[20px] py-4 shadow-sm overflow-hidden">
                  <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-3 px-4">{t("5-Day Forecast", "၅-ရက် ရာသီဥတု ခန့်မှန်းချက်")}</h3>
                  <div className="flex overflow-x-auto gap-3 px-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {[
                      { dayEn: 'Tomorrow', dayMy: 'မနက်ဖြန်', icon: Sun, tempDay: '30°', tempNight: '22°', color: 'text-yellow-500' },
                      { dayEn: 'Wed', dayMy: 'ဗုဒ္ဓဟူး', icon: CloudSun, tempDay: '29°', tempNight: '23°', color: 'text-yellow-400' },
                      { dayEn: 'Thu', dayMy: 'ကြာသပတေး', icon: CloudRain, tempDay: '26°', tempNight: '21°', color: 'text-blue-400' },
                      { dayEn: 'Fri', dayMy: 'သောကြာ', icon: Cloud, tempDay: '27°', tempNight: '22°', color: 'text-gray-400' },
                      { dayEn: 'Sat', dayMy: 'စနေ', icon: Sun, tempDay: '31°', tempNight: '23°', color: 'text-yellow-500' },
                    ].map((forecast, i) => (
                      <div key={i} className="flex flex-col items-center justify-center bg-gray-50 rounded-[16px] p-3 min-w-[70px] shrink-0 border border-gray-100">
                        <span className="text-[11px] font-bold text-gray-500 mb-2">{t(forecast.dayEn, forecast.dayMy)}</span>
                        <forecast.icon size={24} className={`${forecast.color} mb-2`} />
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-bold text-gray-900">{forecast.tempDay}</span>
                          <span className="text-[11px] font-medium text-gray-400">{forecast.tempNight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <style>{`
                    .overflow-x-auto::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                </section>

                <section className="bg-white rounded-[20px] p-4 shadow-sm">
                  <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-3">{t("Farming Advice", "လယ်ယာ အကြံပြုချက်")}</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {t("Good conditions for harvesting. Ensure harvested crops are moved to shade quickly to maintain 10°C pre-cooling efficiency.", "ရိတ်သိမ်းရန် အခြေအနေကောင်းပါသည်။ အအေးခံမှု ထိရောက်စေရန် ရိတ်သိမ်းပြီးသော သီးနှံများကို အရိပ်ထဲသို့ အမြန်ရွှေ့ပါ။")}
                  </p>
                </section>

                <section className="bg-white rounded-[20px] p-4 shadow-sm">
                  <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-3">{t("Cultivation Tips", "စိုက်ပျိုးရေး အကြံပြုချက်များ")}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        <strong className="text-gray-800">{t("Watering:", "ရေသွင်းခြင်း:")}</strong> {t("Light irrigation in the late afternoon if dry.", "မြေဆီလွှာ အစိုဓာတ် တည်ငြိမ်သင့်သည်။ ခြောက်သွေ့ပါက ညနေခင်းတွင် ရေအနည်းငယ် သွင်းပေးပါ။")}
                      </p>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        <strong className="text-gray-800">{t("Pest Control:", "ပိုးမွှားနှိမ်နင်းရေး:")}</strong> {t("Moderate humidity is ideal for scouting. Check undersides of tomato leaves for aphids.", "အလယ်အလတ် စိုထိုင်းဆသည် ပိုးမွှားစစ်ဆေးရန် သင့်တော်သည်။ ခရမ်းချဉ်ပင် အရွက်အောက်ဘက်ရှိ ပျပိုးများကို စစ်ဆေးပါ။")}
                      </p>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        <strong className="text-gray-800">{t("Fertilization:", "မြေသြဇာကျွေးခြင်း:")}</strong> {t("Good weather for foliar feeding. Apply liquid fertilizer early morning.", "အရွက်ဖျန်း မြေသြဇာ ပက်ဖျန်းရန် သင့်တော်သော ရာသီဥတုဖြစ်သည်။ နံနက်စောစော အရည်မြေသြဇာ ပက်ဖျန်းပါ။")}
                      </p>
                    </li>
                  </ul>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Map Modal */}
        <AnimatePresence>
          {showMapModal && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute inset-0 z-50 bg-white flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-bold text-[16px] text-gray-900">{t("Nearby Hubs Map", "အနီးအနားရှိ ဟပ်များ မြေပုံ")}</h3>
                <button onClick={() => setShowMapModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600 active:scale-95">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 bg-[#e5e7eb] relative overflow-hidden">
                {/* Dummy Map Background (Grid Pattern) */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#9ca3af 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                
                {/* Decorative Map Elements (Rivers/Roads) */}
                <div className="absolute top-[20%] left-[-10%] w-[120%] h-8 bg-blue-300/30 transform rotate-12"></div>
                <div className="absolute top-[-10%] left-[30%] w-6 h-[120%] bg-white/60 transform -rotate-[15deg]"></div>
                <div className="absolute top-[-10%] left-[50%] w-4 h-[120%] bg-white/60 transform rotate-[5deg]"></div>

                {/* Pin 1 - Yangon */}
                <div className="absolute top-[45%] left-[45%] flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#ea4335] text-white p-1.5 rounded-full shadow-lg z-10 mb-1">
                    <MapPin size={20} className="fill-[#ea4335]" />
                  </div>
                  <div className="bg-white/95 backdrop-blur text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm text-gray-800 text-center whitespace-nowrap border border-gray-100">
                    Yangon Central Hub
                  </div>
                </div>

                {/* Pin 2 - Bago */}
                <div className="absolute top-[25%] left-[65%] flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#ea4335] text-white p-1.5 rounded-full shadow-lg z-10 mb-1">
                    <MapPin size={20} className="fill-[#ea4335]" />
                  </div>
                  <div className="bg-white/95 backdrop-blur text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm text-gray-800 text-center whitespace-nowrap border border-gray-100">
                    Bago Regional Center
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20">
                   <div className="text-[12px] text-gray-600 font-medium flex items-center gap-2">
                     <div className="w-3 h-3 bg-[#ea4335] rounded-full"></div>
                     AgriLoop Authorized Facilities
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Modal */}
        <AnimatePresence>
          {showProfileModal && (
            <motion.div 
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-50 bg-gray-50 flex flex-col"
            >
              <div className="flex items-center p-4 border-b border-gray-200 bg-white shadow-sm">
                <button onClick={() => setShowProfileModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600 active:scale-95 mr-3">
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-bold text-[16px] text-gray-900">{t("My Profile", "ကျွန်ုပ်၏ ပရိုဖိုင်")}</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-20">
                <div className="flex flex-col items-center mt-4">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 border-4 border-[#2D6A4F] mb-4 shadow-sm">
                    <User size={48} />
                  </div>
                  <h2 className="text-[20px] font-bold text-gray-900">{t("Aung", "အောင်")}</h2>
                  <p className="text-[14px] text-gray-500 font-medium">{t("Registered Farmer", "မှတ်ပုံတင်ထားသော လယ်သမား")}</p>
                </div>
                
                <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 space-y-5">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide">{t("Contact Information", "ဆက်သွယ်ရန် အချက်အလက်")}</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Phone size={18} /></div>
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide">{t("Phone Number", "ဖုန်းနံပါတ်")}</p>
                      <p className="text-[14px] font-semibold text-gray-900 mt-0.5">+95 9 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><MapPin size={18} /></div>
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide">{t("Region", "ဒေသ")}</p>
                      <p className="text-[14px] font-semibold text-gray-900 mt-0.5">Bago Region, Myanmar</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Package size={18} /></div>
                    <div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wide">{t("Hub ID", "ဟပ် ID")}</p>
                      <p className="text-[14px] font-semibold text-gray-900 mt-0.5">#4829-X</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-4">{t("Preferences", "စိတ်ကြိုက်ရွေးချယ်မှုများ")}</h3>
                  <button 
                    onClick={toggleLanguage}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-[14px] active:scale-[0.98] transition-transform border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600">
                        <Globe size={16} />
                      </div>
                      <span className="text-[14px] font-semibold text-gray-800">{t("Language", "ဘာသာစကား")}</span>
                    </div>
                    <span className="text-[12px] font-bold text-[#2D6A4F] bg-green-100/50 px-3 py-1.5 rounded-lg border border-green-200/50">
                      {lang === 'en' ? 'English' : 'မြန်မာ'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report Error Modal */}
        <AnimatePresence>
          {showReportModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-5"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                className="bg-white w-full max-w-[320px] rounded-[24px] p-6 shadow-2xl flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4 text-red-600">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="font-bold text-[16px] text-gray-900">{t("Report Error", "အမှားတင်ပြရန်")}</h3>
                </div>
                
                <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
                  {t("Please detail the inventory mismatch or input error. The Hub Operator will contact you shortly.", "ကုန်ပစ္စည်း ကွဲလွဲမှု သို့မဟုတ် အမှားကို အသေးစိတ် ဖော်ပြပါ။ ဟပ် အော်ပရေတာမှ သင့်အား မကြာမီ ဆက်သွယ်ပါမည်။")}
                </p>

                <textarea 
                  rows={4}
                  placeholder={t("E.g., Crate amount is listed as 10, but I deposited 8.", "ဥပမာ- သေတ္တာအရေအတွက် ၁၀ ခုဟု ပြနေသော်လည်း ကျွန်ုပ် ၈ ခုသာ အပ်နှံခဲ့သည်။")}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[12px] p-3 text-[13px] focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none mb-5"
                ></textarea>

                <div className="flex gap-3 mt-auto">
                  <button 
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold text-[14px] rounded-[12px] active:scale-95 transition-transform"
                  >
                    {t("Cancel", "ပယ်ဖျက်မည်")}
                  </button>
                  <button 
                    onClick={() => {
                      setShowReportModal(false);
                      setToastMessage(t("Report submitted successfully.", "အစီရင်ခံစာ အောင်မြင်စွာ တင်သွင်းပြီးပါပြီ။"));
                      setTimeout(() => setToastMessage(null), 5000);
                    }}
                    className="flex-1 py-3 bg-red-600 text-white font-bold text-[14px] rounded-[12px] active:scale-95 transition-transform"
                  >
                    {t("Submit", "တင်ပြမည်")}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notification */}
        <AnimatePresence>
           {toastMessage && (
             <motion.div
               initial={{ opacity: 0, y: -20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9, y: -10 }}
               className="absolute top-5 left-1/2 -translate-x-1/2 w-[80%] bg-gray-900 text-white py-3 px-5 rounded-[10px] text-[13px] font-medium text-center z-[60] shadow-lg flex items-center justify-center gap-2"
             >
               <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
               <p>{toastMessage}</p>
             </motion.div>
           )}
        </AnimatePresence>

        {/* Decision Engine (Only visible on Inventory tab when bid is active) */}
        <AnimatePresence>
          {showBid && activeTab === 'inventory' && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[72px] left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] rounded-t-[24px]"
            >
              <div className="flex flex-col gap-2.5">
                <button 
                  onClick={handleDecision}
                  className="w-full p-4 bg-[#1E3A8A] text-white font-bold text-[15px] rounded-[14px] transition-opacity hover:opacity-90 active:opacity-80"
                >
                  {t("Keep in Storage (Wait 4 Days)", "သိုလှောင်ထားပါ (၄ ရက် စောင့်ပါ)")}
                </button>
                <button 
                  onClick={handleDecision}
                  className="w-full p-4 bg-[#40916C] text-white font-bold text-[15px] rounded-[14px] transition-opacity hover:opacity-90 active:opacity-80"
                >
                  {t("Sell Now (Smart Match)", "ယခုရောင်းမည် (စမတ်မက်ချ်)")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center pb-5 pt-3 z-30">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'inventory' ? 'text-[#2D6A4F]' : 'text-gray-400'}`}
          >
            <Package size={22} className={activeTab === 'inventory' ? 'stroke-2' : 'stroke-[1.5]'} />
            <span className="text-[10px] font-bold">{t("Inventory", "ကုန်စည်")}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('market')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'market' ? 'text-[#2D6A4F]' : 'text-gray-400'}`}
          >
            <BarChart3 size={22} className={activeTab === 'market' ? 'stroke-2' : 'stroke-[1.5]'} />
            <span className="text-[10px] font-bold">{t("Market", "ဈေးကွက်")}</span>
          </button>

          <button 
            onClick={() => setActiveTab('hubs')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'hubs' ? 'text-[#2D6A4F]' : 'text-gray-400'}`}
          >
            <MapIcon size={22} className={activeTab === 'hubs' ? 'stroke-2' : 'stroke-[1.5]'} />
            <span className="text-[10px] font-bold">{t("Hubs", "ဟပ်များ")}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('weather')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'weather' ? 'text-[#2D6A4F]' : 'text-gray-400'}`}
          >
            <CloudSun size={22} className={activeTab === 'weather' ? 'stroke-2' : 'stroke-[1.5]'} />
            <span className="text-[10px] font-bold">{t("Weather", "ရာသီဥတု")}</span>
          </button>
        </nav>

      </div>
    </div>
  );
}

