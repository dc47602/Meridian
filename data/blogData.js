// Blog Posts Data
export const POSTS = [
  {
    id: 1,
    tag: "South America · Trekking",
    title: "Forty Hours in Patagonia Without a Plan",
    excerpt: "The wind arrived before we did. By the time our boots touched the first trail, it had already",
    author: "Siddharth Mehrotra",
    date: "Mar 2025",
    readTime: "12 min",
    gradient: "linear-gradient(135deg,#1a3a2a 0%,#0d1e14 100%)",
    body: [
      { type: "p", text: "The wind arrived before we did. By the time our boots touched the first trail, it had already declared war on our plans." },
      { type: "h2", text: "Day One: Getting Lost" },
      { type: "p", text: "Most trekking guides tell you to follow the marked path. We ignored that advice." },
      { type: "blockquote", text: "Getting lost in Patagonia isn't a detour—it's the whole point." },
      { type: "p", text: "The granite peaks emerged through the mist like accusations. Forty hours without a predetermined route taught us that the best stories aren't planned." }
    ]
  },
  {
    id: 2,
    tag: "Japan · Cities",
    title: "Kyoto in the Hour Before the Tourists Wake",
    excerpt: "There's a Kyoto that exists only between 5 and 7am, when the lanterns are still lit and the stone pat",
    author: "Siddharth Mehrotra",
    date: "Feb 2025",
    readTime: "10 min",
    gradient: "linear-gradient(135deg,#2a1515 0%,#100808 100%)",
    body: [
      { type: "p", text: "There's a Kyoto that exists only between 5 and 7am, when the lanterns are still lit and the stone paths are empty." },
      { type: "h2", text: "Before the Crowds" },
      { type: "p", text: "Fushimi Inari shrine belongs to the pilgrims and the ghosts until the tour buses arrive." },
      { type: "blockquote", text: "The real Kyoto wakes before dawn." },
      { type: "p", text: "We climbed the 10,000 torii gates in silence, past the point where most visitors ever venture." }
    ]
  },
  {
    id: 3,
    tag: "Morocco · Culture",
    title: "The Medina at Midnight: Fes Without a Map",
    excerpt: "Getting lost is the point. The 9,000 streets of Fes el-Bali were not designed to be navigated.",
    author: "Siddharth Mehrotra",
    date: "Jan 2025",
    readTime: "14 min",
    gradient: "linear-gradient(135deg,#2a1f0d 0%,#140e04 100%)",
    body: [
      { type: "p", text: "Getting lost is the point. The 9,000 streets of Fes el-Bali were not designed to be navigated." },
      { type: "h2", text: "The Medina at Midnight" },
      { type: "p", text: "The smell of leather and spices intensifies after sunset, when the tanneries cease and the food vendors emerge." },
      { type: "blockquote", text: "To understand Fes, you must surrender to being lost." },
      { type: "p", text: "We wandered deeper, guided only by the call to prayer echoing through narrow alleys." }
    ]
  },
  {
    id: 4,
    tag: "Iceland · Photography",
    title: "Chasing Light on the Snæfellsnes Peninsula",
    excerpt: "The golden hour in Iceland in summer lasts four hours. You run out of memory cards before you",
    author: "Siddharth Mehrotra",
    date: "Dec 2024",
    readTime: "11 min",
    gradient: "linear-gradient(135deg,#0d1e2e 0%,#060e16 100%)",
    body: [
      { type: "p", text: "The golden hour in Iceland in summer lasts four hours. You run out of memory cards before you run out of light." },
      { type: "h2", text: "The Snæfellsnes Circuit" },
      { type: "p", text: "Black sand beaches meet ice-sculpted mountains in a landscape that feels prehistoric." },
      { type: "blockquote", text: "Photography here is less about capturing light and more about bearing witness to it." },
      { type: "p", text: "We stayed past midnight, shooting into the luminous dusk that never quite became night." }
    ]
  },
  {
    id: 5,
    tag: "India · Food",
    title: "A Street Food Pilgrimage Through Old Delhi",
    excerpt: "The parathe walas of Chandni Chowk have been making the same eight types of bread since 1875.",
    author: "Siddharth Mehrotra",
    date: "Nov 2024",
    readTime: "9 min",
    gradient: "linear-gradient(135deg,#2a180a 0%,#140a04 100%)",
    body: [
      { type: "p", text: "The parathe walas of Chandni Chowk have been making the same eight types of bread since 1875." },
      { type: "h2", text: "Street Food Dynasties" },
      { type: "p", text: "Four generations of the same family, working the same corner, perfecting the same recipe." },
      { type: "blockquote", text: "Authenticity in travel isn't found—it's earned through repetition and respect." },
      { type: "p", text: "We ate until we couldn't move, each paratha a lesson in patience and precision." }
    ]
  }
];

// Destination Cards
export const DESTINATIONS = [
  { region: "India", name: "Tadoba", count: "1 stories", num: "01" },
  { region: "India", name: "Pench", count: "1 stories", num: "02" },
  { region: "India", name: "Goa", count: "3 stories", num: "03" },
  { region: "India", name: "Tirupati", count: "2 stories", num: "04" },
  { region: "India", name: "Haridwar", count: "1 stories", num: "05" },
  { region: "India", name: "Vrindavan", count: "1 stories", num: "06" },
  { region: "India", name: "Rishikesh", count: "1 stories", num: "07" },
  { region: "India", name: "Agra", count: "1 stories", num: "08" }
];

// Photo Journal Data
export const PHOTOS = [
  { id: 1, emoji: "🏔️", bg: "linear-gradient(135deg,#1a3a2a 0%,#0d1e14 100%)", tag: "Patagonia", title: "First light on the Torres", meta: "Sony A7IV · f/8 · 1/250s", location: "Torres del Paine, Chile", date: "Apr 2025", tall: true },
  { id: 2, emoji: "⛩️", bg: "linear-gradient(135deg,#2a1515 0%,#100808 100%)", tag: "Kyoto", title: "Fushimi Inari at 5am", meta: "Sony A7IV · f/4 · 1/60s", location: "Kyoto, Japan", date: "Mar 2025" },
  { id: 3, emoji: "🌅", bg: "linear-gradient(135deg,#2a1f0d 0%,#140e04 100%)", tag: "Morocco", title: "Golden hour, Fes el-Bali", meta: "Sony A7IV · f/5.6 · 1/400s", location: "Fes, Morocco", date: "Feb 2025" },
  { id: 4, emoji: "🧊", bg: "linear-gradient(135deg,#0d1e2e 0%,#060e16 100%)", tag: "Iceland", title: "Grey glacier terminus", meta: "Sony A7IV · f/11 · 1/500s", location: "Snæfellsnes, Iceland", date: "Jan 2025", tall: true },
  { id: 5, emoji: "🍛", bg: "linear-gradient(135deg,#2a180a 0%,#140a04 100%)", tag: "India", title: "Chandni Chowk morning", meta: "Sony A7IV · f/2.8 · 1/200s", location: "Old Delhi, India", date: "Dec 2024" },
  { id: 6, emoji: "🌿", bg: "linear-gradient(135deg,#0e2018 0%,#060f0b 100%)", tag: "Vietnam", title: "Terraced rice fields", meta: "Sony A7IV · f/8 · 1/320s", location: "Sapa, Vietnam", date: "Nov 2024" },
  { id: 7, emoji: "🏛️", bg: "linear-gradient(135deg,#201510 0%,#100804 100%)", tag: "Ethiopia", title: "Rock-hewn churches", meta: "Sony A7IV · f/4 · 1/100s", location: "Lalibela, Ethiopia", date: "Oct 2024" },
  { id: 8, emoji: "🌊", bg: "linear-gradient(135deg,#0a1a28 0%,#050d14 100%)", tag: "Portugal", title: "Atlantic coast at dusk", meta: "Sony A7IV · f/8 · 1/800s", location: "Nazaré, Portugal", date: "Sep 2024" },
  { id: 9, emoji: "🦙", bg: "linear-gradient(135deg,#1e2a18 0%,#0c1308 100%)", tag: "Patagonia", title: "Guanaco at Valle del Francés", meta: "Sony A7IV · f/5.6 · 1/640s", location: "Torres del Paine, Chile", date: "Aug 2024" },
  { id: 10, emoji: "🏯", bg: "linear-gradient(135deg,#2a1818 0%,#120a0a 100%)", tag: "Japan", title: "Himeji Castle at dusk", meta: "Sony A7IV · f/8 · 1/100s", location: "Himeji, Japan", date: "Jul 2024" },
  { id: 11, emoji: "🐪", bg: "linear-gradient(135deg,#2e1e08 0%,#150e04 100%)", tag: "Morocco", title: "Sahara edge, near Merzouga", meta: "Sony A7IV · f/16 · 1/1000s", location: "Merzouga, Morocco", date: "Jun 2024" },
  { id: 12, emoji: "🌋", bg: "linear-gradient(135deg,#0f1820 0%,#06090e 100%)", tag: "Iceland", title: "Volcanic lava field", meta: "Sony A7IV · f/11 · 1/250s", location: "Reykjanes, Iceland", date: "May 2024", tall: true }
];

// Social Media Posts
export const SOCIAL_POSTS = [
  { id: 1, platform: "ig", handle: "@meridian.journal", emoji: "🏔️", bg: "linear-gradient(135deg,#1a3a2a,#0d1e14)", text: "The Torres at 6am — three granite spires, zero other humans. Spent two hours alone before the first guide arrived.", hashtags: ["#Patagonia", "#TravelPhotography", "#Wanderlust"], likes: "2.4K", comments: "89", linkedPost: 1, featured: true },
  { id: 2, platform: "tw", handle: "@meridian_journal", emoji: "🧵", bg: "linear-gradient(135deg,#0d1520,#060c14)", text: "Thread: 7 things nobody tells you before doing the Torres del Paine W Circuit in Patagonia", hashtags: ["#Travel", "#Hiking"], likes: "1.8K", comments: "342", linkedPost: 1 },
  { id: 3, platform: "yt", handle: "Meridian Journal", emoji: "🎬", bg: "linear-gradient(135deg,#200a0a,#0e0404)", text: "NEW VIDEO: 48 hours in Fes Medina without a guide — what we found vs. what the guidebooks promised", hashtags: ["#FesExplored", "#Morocco"], likes: "3.2K", comments: "156", linkedPost: 3 },
  { id: 4, platform: "ig", handle: "@meridian.journal", emoji: "⛩️", bg: "linear-gradient(135deg,#2a1515,#100808)", text: "Fushimi Inari at 4:50am. We were the third group here. By 7am there were 500+ people on the stairs.", hashtags: ["#Kyoto", "#EarlyMorning", "#Japan"], likes: "5.1K", comments: "203", linkedPost: 2 },
  { id: 5, platform: "tw", handle: "@meridian_journal", emoji: "📸", bg: "linear-gradient(135deg,#1a180a,#0e0c04)", text: "The Sony A7IV is overkill for travel photography in the best way. Entire Iceland trip on two batteries.", hashtags: ["#Photography", "#Gear"], likes: "892", comments: "127", linkedPost: 4 },
  { id: 6, platform: "ig", handle: "@meridian.journal", emoji: "🌅", bg: "linear-gradient(135deg,#2a1f0d,#140e04)", text: "Roof terrace, Fes medina, 5:30pm. The call to prayer from six different minarets overlapping at once.", hashtags: ["#Fes", "#CulturalTravel", "#Morocco"], likes: "3.7K", comments: "91", linkedPost: 3 }
];

// Routes Data
export const ROUTES = [
  {
    id: "r1",
    num: "01",
    title: "Torres del Paine Circuit",
    region: "Patagonia, Chile",
    mode: "🥾 Trek",
    date: "Apr 2025",
    live: true,
    taken: { distance: "112 km", duration: "9 days", elevation: "+4,820 m", waypoints: ["Puerto Natales", "Refugio Chileno", "Mirador Las Torres", "Campamento Italiano", "Grey Glacier", "Puerto Natales"] },
    best: { distance: "98 km", duration: "8 days", elevation: "+4,100 m", waypoints: ["Puerto Natales", "Mirador Las Torres", "Valle del Francés", "Grey Glacier", "Puerto Natales"] },
    diff: { time: "−1 day", distance: "−14 km", note: "Skipping the less-scenic northern loop saves a full day. W Circuit fully open, no snow." },
    conditions: [
      { color: "#4a8c6a", text: "W Circuit fully open — no closures (Apr 2025)" },
      { color: "#d4a853", text: "Grey Glacier: 2hr wait at suspension bridge on weekends" },
      { color: "#4a8c6a", text: "Refugios fully staffed and restocked" }
    ],
    paths: { taken: "M 100 360 C 112 330 128 302 142 278 C 156 254 160 232 166 210 C 172 188 180 170 192 154 C 206 136 224 126 236 112 C 250 96 256 78 248 62 C 240 46 222 40 208 48 C 194 56 188 74 180 100 C 172 124 166 150 160 176 C 154 202 148 228 150 255 C 152 282 158 305 168 328 C 178 351 192 365 200 375", best: "M 100 360 C 125 320 155 280 190 250 C 215 225 232 200 248 160 C 264 120 268 80 260 60 C 252 40 235 38 220 52 C 205 66 200 90 198 120 C 196 150 195 180 200 210 C 205 240 215 265 228 285 C 241 305 256 320 268 335" },
    pois: [
      { x: 100, y: 360, label: "Puerto Natales", type: "start" },
      { x: 248, y: 62, label: "Las Torres", type: "peak" },
      { x: 206, y: 224, label: "Valle Francés", type: "stop" },
      { x: 88, y: 364, label: "Grey Glacier", type: "stop" }
    ]
  },
  {
    id: "r2",
    num: "02",
    title: "Kyoto Heritage Walk",
    region: "Kyoto, Japan",
    mode: "🚶 Walk",
    date: "Mar 2025",
    live: false,
    taken: { distance: "22 km", duration: "2 days", elevation: "+680 m", waypoints: ["Fushimi Inari", "Tofukuji", "Gion", "Kinkakuji", "Arashiyama"] },
    best: { distance: "18 km", duration: "1.5 days", elevation: "+520 m", waypoints: ["Fushimi Inari (5am)", "Ninenzaka", "Gion Alley", "Arashiyama"] },
    diff: { time: "−half day", distance: "−4 km", note: "The Kinkakuji detour adds 2 hours for a site best seen later. Tofukuji to Ninenzaka is more scenic." },
    conditions: [
      { color: "#d4a853", text: "Cherry blossom: crowds at Arashiyama from 9am" },
      { color: "#4a8c6a", text: "Fushimi Inari summit: ~90 min from base" }
    ],
    paths: { taken: "M 80 350 C 95 320 115 295 132 272 C 149 249 156 228 166 208 C 176 188 184 170 196 155 C 210 138 226 130 236 116 C 248 100 250 82 242 68 C 234 54 217 50 204 59 C 191 68 188 86 192 110 C 196 134 204 158 216 180 C 228 202 240 220 250 240", best: "M 80 350 C 105 310 140 270 175 240 C 205 215 230 190 250 160 C 265 140 270 115 260 95 C 250 75 230 70 210 85 C 190 100 185 125 190 150 C 195 175 208 198 225 220" },
    pois: [
      { x: 80, y: 350, label: "Fushimi Inari", type: "start" },
      { x: 242, y: 68, label: "Summit", type: "peak" },
      { x: 199, y: 228, label: "Gion", type: "stop" },
      { x: 149, y: 325, label: "Arashiyama", type: "stop" }
    ]
  },
  {
    id: "r3",
    num: "03",
    title: "Fes Medina Deep Dive",
    region: "Fes el-Bali, Morocco",
    mode: "🚶 Walk",
    date: "Feb 2025",
    live: false,
    taken: { distance: "8 km", duration: "1 day", elevation: "+320 m", waypoints: ["Bab Bou Jeloud", "Madrasa Bou Inania", "Chouara Tannery", "Al-Qarawiyyin", "Nejjarine"] },
    best: { distance: "6 km", duration: "1 day", elevation: "+240 m", waypoints: ["Bab Bou Jeloud", "Chouara Tannery (9am)", "Al-Qarawiyyin", "Nejjarine"] },
    diff: { time: "Same day", distance: "−2 km", note: "Arrive at the tannery at 9am for best light. Al-Qarawiyyin is more rewarding than the Madrasa." },
    conditions: [
      { color: "#4a8c6a", text: "Tannery viewpoint free from leather shops above" },
      { color: "#c45230", text: "Friday: Al-Qarawiyyin closed to visitors" }
    ],
    paths: { taken: "M 110 320 C 124 298 140 276 156 255 C 172 234 178 214 186 194 C 194 174 202 157 214 143 C 227 128 243 122 252 108 C 263 93 264 76 255 64 C 246 52 229 50 216 59 C 203 68 200 86 206 110 C 212 134 222 158 234 180 C 246 202 258 220 268 235", best: "M 110 320 C 135 290 165 260 195 235 C 220 215 240 190 255 160 C 265 140 268 115 258 95 C 248 75 228 70 208 85 C 188 100 185 125 195 150 C 205 175 220 195 235 215" },
    pois: [
      { x: 110, y: 320, label: "Bab Bou Jeloud", type: "start" },
      { x: 255, y: 64, label: "Chouara Tannery", type: "peak" },
      { x: 208, y: 231, label: "Al-Qarawiyyin", type: "stop" },
      { x: 152, y: 321, label: "Nejjarine", type: "stop" }
    ]
  }
];

// Quick Prompts for AI Writing Assistant
export const QUICK_PROMPTS = [
  "Write an atmospheric opening paragraph for my destination",
  "Suggest a vivid sensory detail to add",
  "Help me write a compelling blockquote",
  "Improve the flow of my draft",
  "Suggest a title that evokes a strong sense of place"
];

// About Page Data
export const GEAR = [
  { name: "Sony A7 IV", desc: "Primary body — mirrorless, 33MP", cat: "Camera" },
  { name: "24–70mm f/2.8 GM", desc: "My one-lens compromise", cat: "Lens" },
  { name: "Osprey Aether 65", desc: "For any trek over 3 days", cat: "Backpack" },
  { name: "Peak Design Travel Tripod", desc: "Compact, reliable, worth the weight", cat: "Gear" }
];

export const PLACES_VISITED = [
  { flag: "🇦🇷", name: "Patagonia", year: "2025" },
  { flag: "🇯🇵", name: "Kyoto", year: "2025" },
  { flag: "🇲🇦", name: "Fes", year: "2025" },
  { flag: "🇮🇸", name: "Iceland", year: "2024" },
  { flag: "🇮🇳", name: "Delhi", year: "2024" },
  { flag: "🇻🇳", name: "Sapa", year: "2024" },
  { flag: "🇪🇹", name: "Lalibela", year: "2023" },
  { flag: "🇵🇹", name: "Portugal", year: "2023" }
];
