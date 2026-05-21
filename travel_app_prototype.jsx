import React, { useMemo, useState } from "react";
import {
  MapPin, Clock, Heart, CheckCircle2, Camera, Ship, Sunrise, Utensils,
  Search, Star, Route, Info, Waves, Home, Map, Luggage, Snail,
  BookOpen, CalendarDays, Train, Bus
} from "lucide-react";
import { motion } from "framer-motion";

const googleMap = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const trip = {
  title: "蘭嶼．真比基尼",
  enTitle: "LANYU REAL BIKINI",
  subtitle: "把時間交給海風，讓浪聲帶路；在晨光與夜色之間，慢慢靠近島的節奏。"
};

const filterTags = [
  { label: "美食", icon: Utensils, color: "#f3d57b" },
  { label: "發呆", icon: Sunrise, color: "#9fc6bd" },
  { label: "拍照", icon: Camera, color: "#f7b39e" },
  { label: "浮潛", icon: Waves, color: "#8ec2c9" },
];

const days = [
  {
    id: "day0", label: "Day 0", date: "6/4", title: "出發前一晚", stamp: "NIGHT TRAIN",
    desc: "普悠瑪448車次前往台東", image: "train", color: "#2f5f63",
    items: [
      { time: "18:00", title: "下班、吃晚餐", place: "台北", type: "日常", icon: Utensils, note: "旅程開始前，先把晚餐吃飽、行李確認好，準備進入海島模式。", tags: ["🍜 美食"] },
      { time: "20:00", title: "搭乘普悠瑪448", place: "台北 → 台東", type: "交通", icon: Route, note: "夜晚的火車很適合把日常留在台北，慢慢切換成旅行狀態。", tags: [] },
    ],
  },
  {
    id: "day1", label: "Day 1", date: "6/5", title: "抵達蘭嶼・南半圈環島", stamp: "ARRIVAL DAY",
    desc: "東清・野銀・紅頭・漁人・青青草原・夜市", image: "coast", color: "#f3d57b",
    items: [
      { time: "06:10", title: "民宿集合前往港口", place: "台東", type: "集合", icon: Route, note: "一早集合前往港口，記得先吃暈船藥，不要把旅行的第一段交給暈船。", tags: [] },
      { time: "07:00", title: "搭船前往蘭嶼", place: "台東 → 蘭嶼", type: "交通", icon: Ship, note: "今天的海風從船上開始，抵達後就正式進入真比基尼行程。", tags: ["🌴 發呆"] },
      { time: "09:00", title: "港口前往東清住宿", place: "港口 → 東清", type: "移動", icon: Route, note: "車程約30分鐘，先把行李安頓好，再慢慢開始島上的節奏。", tags: [] },
      { time: "10:30", title: "東清灣散步", place: "東清灣", type: "景點", icon: Camera, note: "抵達後的第一個海邊，適合散步、看海、拍第一張海島照片，也適合發呆。", tags: ["🌴 發呆", "📸 拍照"], map: googleMap("東清灣") },
      { time: "11:30", title: "東清早午餐", place: "東清", type: "餐食", icon: Utensils, note: "東清或野銀選一個地方吃午餐，先以東清海景早餐為主。", tags: ["🍜 美食"], map: googleMap("東清三十三號早餐店"), shops: [
        { name: "東清三十三號早餐店", type: "海景早餐・蛋餅", map: googleMap("東清三十三號早餐店") },
        { name: "美亞美早餐店", type: "培根捲", map: googleMap("美亞美早餐店") },
        { name: "東清樓下早餐", type: "早餐", map: googleMap("東清樓下早餐") },
      ]},
      { time: "13:30", title: "野銀地下屋與部落", place: "野銀", type: "文化", icon: Info, note: "地下屋需預約導覽，適合慢慢走、慢慢看，拍照前也要留意當地規範。", tags: ["🍜 美食", "📸 拍照", "🌴 發呆"], map: googleMap("蘭嶼 野銀地下屋"), shops: [
        { name: "野銀地下屋", type: "需預約導覽", map: googleMap("蘭嶼 野銀地下屋") },
        { name: "1984鐵皮屋早餐", type: "奶茶・古早味麵", map: googleMap("野銀 1984鐵皮屋早餐") },
        { name: "197食堂", type: "丼飯", map: googleMap("蘭嶼 197食堂") },
        { name: "海廢食堂", type: "午餐・晚餐", map: googleMap("蘭嶼 海廢食堂") },
        { name: "孵日", type: "手工冰淇淋・明信片", map: googleMap("蘭嶼 孵日") },
      ]},
      { time: "15:30", title: "南端岩石海岸", place: "南端", type: "景點", icon: Camera, note: "沿著海岸線騎車，停下來拍幾張風很大的照片，感受蘭嶼南端的岩石地景。", tags: ["📸 拍照", "🌴 發呆"], map: googleMap("蘭嶼 南端岩石") },
      { time: "17:00", title: "青青草原夕陽", place: "青青草原", type: "景點", icon: Sunrise, note: "走步道看日落，提早抵達比較不趕，找一個風舒服的位置發呆等夕陽。", tags: ["🌴 發呆", "📸 拍照"], map: googleMap("青青草原 蘭嶼") },
      { time: "18:00", title: "東清夜市", place: "東清", type: "夜市", icon: Utensils, note: "第一晚安排東清夜市，吃完就近去酒吧比較順。", tags: ["🍜 美食"], map: googleMap("東清夜市"), shops: [
        { name: "東清夜市", type: "夜市位置", map: googleMap("東清夜市") },
        { name: "魚你相芋", type: "地瓜芋頭飛魚餅", map: googleMap("東清夜市 魚你相芋") },
        { name: "小米甜甜圈", type: "甜點", map: googleMap("東清夜市 小米甜甜圈") },
        { name: "鋼管滷味", type: "滷味", map: googleMap("東清夜市 鋼管滷味") },
        { name: "潮間帶海鮮", type: "海鮮", map: googleMap("東清夜市 潮間帶海鮮") },
      ]},
      { time: "20:30", title: "海飲露天酒吧", place: "東清", type: "夜晚", icon: Utensils, note: "隔天要潛水，微醺就好。重點是海風、聊天和安全走回民宿。", tags: ["🍜 美食", "🌴 發呆"], map: googleMap("海飲露天酒吧") },
    ],
  },
  {
    id: "day2", label: "Day 2", date: "6/6", title: "水上活動＋北半圈環島", stamp: "OCEAN DAY",
    desc: "日出・浮潛・情人洞・朗島部落・燈塔・燒烤", image: "rocks", color: "#f7b39e",
    items: [
      { time: "04:30", title: "野銀冷泉日出", place: "野銀冷泉", type: "日出", icon: Sunrise, note: "起得來的人去泡泡水看清晨，起不來的人繼續睡。帶拖鞋，讓早上的身體慢慢醒來。", tags: ["🌴 發呆", "📸 拍照"], map: googleMap("野銀冷泉") },
      { time: "07:30", title: "海景早餐", place: "東清三十三號", type: "早餐", icon: Utensils, note: "早晨海景很適合慢慢吃早餐，先補充體力再下水。", tags: ["🍜 美食", "🌴 發呆"], map: googleMap("東清三十三號早餐店") },
      { time: "08:30", title: "浮潛、深潛", place: "東清秘境", type: "體驗", icon: Star, note: "今天是海的一天。前一晚不要喝太多，下水前確認裝備與身體狀況。", tags: ["🤿 浮潛"], map: googleMap("東清秘境") },
      { time: "11:30", title: "東清午餐休息", place: "東清", type: "餐食", icon: Utensils, note: "水上活動後先吃飯休息，下午再開始北半圈環島。", tags: ["🍜 美食"], map: googleMap("島旦嶼"), shops: [
        { name: "島旦嶼", type: "牛肉莓果漢堡・辣椒醬", map: googleMap("島旦嶼") },
        { name: "以斯拉", type: "泰式料理", map: googleMap("蘭嶼 以斯拉") },
        { name: "野海子簡餐", type: "炒飯", map: googleMap("蘭嶼 野海子簡餐") },
        { name: "人魚和貓", type: "簡餐套餐", map: googleMap("蘭嶼 人魚和貓") },
        { name: "流浪浮球", type: "牛肉漢堡", map: googleMap("蘭嶼 流浪浮球") },
        { name: "Oyawa餐飲部", type: "Taco 餅", map: googleMap("蘭嶼 Oyawa餐飲部") },
      ]},
      { time: "14:00", title: "北半圈環島", place: "東清 → 情人洞 → 朗島 → 椰油 → 紅頭", type: "路線", icon: Route, note: "一路都是海岸、部落與公路風景，適合邊騎邊停、不要趕路。", tags: ["🌴 發呆", "📸 拍照"], map: googleMap("蘭嶼 情人洞") },
      { time: "14:30", title: "情人洞", place: "東清", type: "景點", icon: Camera, note: "岩岸風很大，拍照時注意腳步。這裡適合拍一張很不像日常的照片。", tags: ["📸 拍照", "🌴 發呆"], map: googleMap("蘭嶼 情人洞") },
      { time: "15:30", title: "朗島部落散步", place: "朗島", type: "部落", icon: MapPin, note: "朗島部落適合慢慢散步，也可以找咖啡、甜點或小吃補充能量。", tags: ["🍜 美食", "🌴 發呆", "📸 拍照"], map: googleMap("蘭嶼 朗島部落"), shops: [
        { name: "朗島部落", type: "部落散步", map: googleMap("蘭嶼 朗島部落") },
        { name: "伊娜傳統手工藝品", type: "傳統飾品", map: googleMap("蘭嶼 伊娜傳統手工藝品") },
        { name: "單眼皮滷味", type: "辣椒醬推薦", map: googleMap("蘭嶼 單眼皮滷味") },
        { name: "角落咖啡", type: "甜點・西西里咖啡", map: googleMap("蘭嶼 角落咖啡") },
        { name: "米蘭水", type: "甜點店・可內用", map: googleMap("蘭嶼 米蘭水") },
      ]},
      { time: "16:30", title: "蘭嶼燈塔・紅頭岩", place: "西側海岸", type: "景點", icon: Camera, note: "沿路風景很像公路電影，適合停下來拍照，也適合什麼都不做地看海。", tags: ["📸 拍照", "🌴 發呆"], map: googleMap("蘭嶼燈塔") },
      { time: "17:00", title: "氣象站夕陽", place: "紅頭", type: "景點", icon: Sunrise, note: "有點陡，要走一段路，但視野很值得。太累就改去蜜月灣踏水看日落。", tags: ["🌴 發呆", "📸 拍照"], map: googleMap("蘭嶼氣象站") },
      { time: "18:00", title: "東清燒烤", place: "東清", type: "晚餐", icon: Utensils, note: "第二晚用燒烤收尾。喝酒勿騎車，吃完以安全回住宿為主。", tags: ["🍜 美食"], map: googleMap("蘭嶼 東清燒烤") },
      { time: "21:00", title: "民宿耍廢", place: "東清", type: "休息", icon: Utensils, note: "留一點時間給海風、聊天和耍廢，隔天還要搭船，不要喝醉死。", tags: ["🌴 發呆"], map: googleMap("富的夢背包客棧") },
    ],
  },
  {
    id: "day3", label: "Day 3", date: "6/7", title: "浮潛＋收尾返程", stamp: "LAST MORNING",
    desc: "紅頭浮潛・午餐・買伴手禮・搭船回台東", image: "bay", color: "#9fc6bd",
    items: [
      { time: "05:00", title: "東清灣日出", place: "東清灣／氣象站", type: "景點", icon: Sunrise, note: "最後一天的日出比較像告別，起得來就去看，起不來就把睡飽當成收尾。", tags: ["🌴 發呆", "📸 拍照"], map: googleMap("東清灣") },
      { time: "05:30", title: "收行李休息", place: "民宿", type: "整理", icon: Luggage, note: "確認退房時間，把濕衣物、證件、船票和暈船藥整理好。", tags: [] },
      { time: "08:00", title: "早餐時間", place: "東清／紅頭", type: "早餐", icon: Utensils, note: "最後一天早餐可依出發區域彈性選擇，不要吃太趕，還要接水上行程。", tags: ["🍜 美食"], map: googleMap("美亞美早餐店"), shops: [
        { name: "美亞美早餐店", type: "培根捲", map: googleMap("美亞美早餐店") },
        { name: "東清樓下早餐", type: "早餐", map: googleMap("東清樓下早餐") },
        { name: "阿力給早餐", type: "飛魚飯糰・核桃吐司", map: googleMap("蘭嶼 阿力給早餐") },
        { name: "雅gen早中餐", type: "綠色炸彈", map: googleMap("蘭嶼 雅gen早中餐") },
      ]},
      { time: "09:00", title: "紅頭浮潛", place: "紅頭部落", type: "體驗", icon: Star, note: "龍門港、潮池或蘭底潛水都可彈性安排。注意船隻進出與自身狀況。", tags: ["🤿 浮潛"], map: googleMap("蘭底潛水") },
      { time: "11:30", title: "最後午餐", place: "紅頭／漁人／椰油", type: "餐食", icon: Utensils, note: "依回港動線選擇紅頭、漁人或椰油用餐，順便補伴手禮。", tags: ["🍜 美食"], map: googleMap("無餓不坐 蘭嶼"), shops: [
        { name: "無餓不坐", type: "風味餐・需訂位", map: googleMap("無餓不坐 蘭嶼") },
        { name: "蘭嶼漂流木餐廳", type: "飛魚卵燉飯・烤山豬肉", map: googleMap("蘭嶼漂流木餐廳") },
        { name: "唯舟食町", type: "水餃・煎餃・辣拌麵", map: googleMap("蘭嶼 唯舟食町") },
        { name: "瑟郎冰沙", type: "章魚炒飯・辣椒醬", map: googleMap("蘭嶼 瑟郎冰沙") },
        { name: "小米阿粨", type: "肉羹麵・阿粨", map: googleMap("蘭嶼 小米阿粨") },
        { name: "阿東刈包", type: "刈包・炒飯", map: googleMap("蘭嶼 阿東刈包") },
      ]},
      { time: "15:30", title: "搭船回台東", place: "蘭嶼港口", type: "交通", icon: Ship, note: "15:00 前記得吃暈船藥，提前到港口，讓回程不要壓線。", tags: [], map: googleMap("蘭嶼開元港") },
      { time: "17:30", title: "台東晚餐", place: "台東", type: "餐食", icon: Utensils, note: "回到台東後簡單吃晚餐，九格浪或台鐵便當都可以。", tags: ["🍜 美食"], map: googleMap("九格浪原住民風味餐") },
      { time: "19:03", title: "新自強445回台北", place: "台東 → 台北", type: "交通", icon: Route, note: "旅程正式結束，把曬過的夏天帶回台北。", tags: [] },
    ],
  },
];

const preparationData = {
  notices: ["上涼亭要脫鞋子", "下水請勿擦防曬乳液，請物理防曬、穿防寒衣", "不要單穿比基尼在部落裡", "晚上會車時記得切近燈，不要開遠光燈", "部落參觀、拍照前先詢問", "拼板舟拍照或觸摸前要先詢問，不能直接坐上去"],
  checklist: ["個人證件（健保卡或身分證）", "換洗衣物、拖鞋", "盥洗用品", "化妝用品", "防曬外套、帽子、墨鏡", "充電線、相機、記憶卡", "暈船藥、耳機、口罩", "毛巾、防水袋、玩水用品"],
  transport: {
    outbound: {
      title: "去程路線",
      steps: [
        { icon: Train, title: "台鐵", desc: "6/4 20:00｜台北搭普悠瑪448 → 台東" },
        { icon: Bus, title: "接駁車", desc: "6/5 06:10｜台東住宿 → 富岡漁港" },
        { icon: Ship, title: "船班", desc: "6/5 07:00｜台東 → 蘭嶼" },
      ],
    },
    returnTrip: {
      title: "回程路線",
      steps: [
        { icon: Ship, title: "船班", desc: "6/7 15:00｜蘭嶼 → 台東" },
        { icon: Bus, title: "接駁車", desc: "6/7｜富岡漁港 → 台東火車站" },
        { icon: Train, title: "台鐵", desc: "6/7 19:03｜台東搭新自強445 → 台北" },
      ],
    },
  },
  stay: [
    { name: "逗宅甘青年旅舘", place: "台東", price: "7500 元（包棟）", note: "不提供牙刷、牙膏、毛巾", map: googleMap("逗宅甘青年旅舘 台東市仁二街8號") },
    { name: "富的夢背包客棧", place: "蘭嶼東清", price: "24000 元（包棟）", note: "兩晚住宿", map: googleMap("富的夢背包客棧 臺東縣蘭嶼鄉138-7號") },
  ],
};

const spots = [
  { name: "蘭嶼燈塔", area: "西北側", mood: "📸 拍照", desc: "西北角海岸的公路感拍照景點。", x: "10%", y: "20%", level: "major", color: "#f7b39e", map: googleMap("蘭嶼燈塔") },
  { name: "紅頭岩", area: "西北側", mood: "📸 拍照", desc: "西北側海岸拍照點，適合順路停靠。", x: "11%", y: "27%", level: "major", color: "#f7b39e", map: googleMap("蘭嶼 紅頭岩") },
  { name: "朗島部落", area: "北側", mood: "🍜 美食・🌴 發呆", desc: "北側部落散步、咖啡甜點與傳統手工藝品。", x: "31%", y: "17%", level: "major", color: "#f3d57b", map: googleMap("蘭嶼 朗島部落") },
  { name: "雙獅岩", area: "北側", mood: "📸 拍照", desc: "北側海岸線上的順路拍照點。", x: "58%", y: "16%", level: "minor", color: "#f7b39e", map: googleMap("蘭嶼 雙獅岩") },
  { name: "情人洞", area: "東北側", mood: "📸 拍照", desc: "東北側岩岸風景與拍照點，風大時注意腳步。", x: "64%", y: "33%", level: "major", color: "#f7b39e", map: googleMap("蘭嶼 情人洞") },
  { name: "東清灣", area: "東清", mood: "🌴 發呆・📸 拍照", desc: "東側海灣，適合看日出、散步與海岸拍照。", x: "62%", y: "44%", level: "major", color: "#9fc6bd", map: googleMap("東清灣") },
  { name: "東清秘境", area: "東清", mood: "🤿 浮潛", desc: "東清周邊水上活動與浮潛安排。", x: "66%", y: "39%", level: "minor", color: "#8ec2c9", map: googleMap("東清秘境") },
  { name: "野銀冷泉", area: "野銀", mood: "🌴 發呆・📸 拍照", desc: "東南側清晨泡水、看日出與慢慢醒來的地方。", x: "70%", y: "58%", level: "major", color: "#9fc6bd", map: googleMap("野銀冷泉") },
  { name: "野銀地下屋", area: "野銀", mood: "🍜 美食・📸 拍照", desc: "東南側部落文化參觀，周邊也有小店可順路休息。", x: "67%", y: "63%", level: "major", color: "#f3d57b", map: googleMap("蘭嶼 野銀地下屋") },
  { name: "青青草原", area: "南端", mood: "🌴 發呆・📸 拍照", desc: "南端草坡與步道，適合等夕陽與看海發呆。", x: "55%", y: "86%", level: "major", color: "#9fc6bd", map: googleMap("青青草原 蘭嶼") },
  { name: "龍門港", area: "南側", mood: "🤿 浮潛", desc: "西南側跳港與玩水點，注意船隻進出。", x: "63%", y: "81%", level: "minor", color: "#8ec2c9", map: googleMap("蘭嶼 龍門港") },
  { name: "蘭嶼氣象站", area: "山線", mood: "🌴 發呆・📸 拍照", desc: "位於山線視野高處，可看日出、夕陽或星星。", x: "47%", y: "56%", level: "major", color: "#9fc6bd", map: googleMap("蘭嶼氣象站") },
  { name: "椰油部落", area: "西側", mood: "🍜 美食・🌴 發呆", desc: "西側補貨、吃冰與順路散步的區域。", x: "17%", y: "47%", level: "minor", color: "#f3d57b", map: googleMap("蘭嶼 椰油部落") },
  { name: "蜜月灣", area: "西側", mood: "🌴 發呆", desc: "西側踏水、看日落與放空的備案點。", x: "22%", y: "55%", level: "minor", color: "#9fc6bd", map: googleMap("蘭嶼 蜜月灣") },
];

function Tape({ className = "" }) {
  return <div className={`absolute h-7 w-28 rotate-[-8deg] bg-[#f5d56e]/70 shadow-sm ${className}`} />;
}

function PhotoIllustration({ type }) {
  return (
    <div className="relative h-40 overflow-hidden rounded-[1.2rem] border-2 border-[#d8c7a3] bg-[#8ec2c9]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8ec2c9] via-[#e7f0ea] to-[#f3d57b]" />
      <div className="absolute left-6 top-5 h-16 w-16 rounded-full bg-[#f3d57b] shadow-[0_0_0_10px_rgba(243,213,123,0.25)]" />
      {type === "train" && <><div className="absolute bottom-9 left-0 h-8 w-full bg-[#2f5f63]/25" /><div className="absolute bottom-14 left-6 h-10 w-36 rounded-t-2xl border-2 border-[#243d3f] bg-[#fff9e8]" /><div className="absolute bottom-20 left-12 h-3 w-7 rounded-full bg-[#7eb6bd]" /><div className="absolute bottom-20 left-24 h-3 w-7 rounded-full bg-[#7eb6bd]" /></>}
      {type === "coast" && <><div className="absolute bottom-10 left-[-20%] h-20 w-[140%] rotate-[-8deg] rounded-[50%] bg-[#fff9e8]/90" /><div className="absolute bottom-3 right-6 h-20 w-32 rounded-t-full bg-[#2f5f63]/55" /><div className="absolute bottom-9 left-8 h-1 w-28 rotate-[-12deg] bg-[#243d3f]" /></>}
      {type === "rocks" && <><div className="absolute bottom-0 left-0 h-20 w-full bg-[#2f5f63]/35" /><div className="absolute bottom-12 left-8 h-20 w-20 rounded-t-full bg-[#243d3f]/70" /><div className="absolute bottom-12 left-28 h-28 w-24 rounded-t-full bg-[#243d3f]/55" /><div className="absolute bottom-8 right-8 h-16 w-28 rounded-t-full bg-[#243d3f]/50" /></>}
      {type === "bay" && <><div className="absolute bottom-0 left-0 h-24 w-full bg-[#fff9e8]/85" /><div className="absolute bottom-12 left-[-10%] h-24 w-[70%] rounded-[50%] bg-[#7eb6bd]" /><div className="absolute bottom-12 right-[-5%] h-28 w-[65%] rounded-[50%] bg-[#2f5f63]/55" /></>}
    </div>
  );
}

function Pill({ children, active, onClick }) {
  return <button onClick={onClick} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${active ? "border-[#8f2f1f] bg-[#8f2f1f] text-[#fff9e8] shadow-sm" : "border-[#d8c7a3] bg-[#fff9e8]/85 text-[#6e5a3f] hover:bg-white"}`}>{children}</button>;
}

function getCategoryMeta(tagText) {
  const text = tagText.replace(/[🍜🌴📸🤿#]/g, "").trim();
  return filterTags.find((tag) => tag.label === text) || null;
}

function CategoryBadge({ tag }) {
  const meta = getCategoryMeta(tag);
  if (!meta) return null;
  const Icon = meta.icon;
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-[#243d3f]" style={{ backgroundColor: meta.color }}>
      <Icon size={12} />
      {meta.label}
    </span>
  );
}

function CategoryList({ mood }) {
  const labels = filterTags.filter((tag) => mood.includes(tag.label));
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((tag) => {
        const Icon = tag.icon;
        return (
          <span key={tag.label} className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-[#243d3f]" style={{ backgroundColor: tag.color }}>
            <Icon size={12} />
            {tag.label}
          </span>
        );
      })}
    </div>
  );
}

function ItemCard({ item, checked, liked, onCheck, onLike }) {
  const Icon = item.icon;
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[1.7rem] border-2 border-[#2f5f63]/15 bg-[#fff9e8] p-4 shadow-[6px_6px_0_rgba(47,95,99,0.12)]">
      <div className="absolute right-4 top-3 rotate-0 rounded-full border border-[#8f2f1f]/30 bg-[#fff9e8] px-3 py-1 text-[10px] font-bold tracking-widest text-[#8f2f1f] shadow-sm">{item.type}</div>
      <div className="flex gap-4">
        <div className="rounded-2xl border-2 border-[#2f5f63] bg-[#9fc6bd] p-3 text-[#173b3f] shadow-[3px_3px_0_rgba(47,95,99,0.25)]"><Icon size={22} /></div>
        <div className="min-w-0 flex-1 pr-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f3d57b] px-3 py-1 text-xs font-bold text-[#4d3f2b]"><Clock size={13} />{item.time}</div>
          <h3 className="mt-3 text-lg font-black tracking-tight text-[#243d3f]">{item.title}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-[#7a684d]"><MapPin size={14} /><span>{item.place}</span>{item.map && <a href={item.map} target="_blank" rel="noopener noreferrer" title="Google Maps" onClick={(event) => event.stopPropagation()} className="relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d8c7a3] bg-white text-[#2f5f63] transition hover:border-[#2f5f63] hover:bg-[#f3d57b] active:scale-95"><MapPin size={13} /></a>}</div>
          <p className="mt-3 text-sm leading-6 text-[#5f513d]">{item.note}</p>
          {item.shops && (
            <details className="mt-4 overflow-hidden rounded-[1.2rem] border border-[#d8c7a3] bg-white/45">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-black text-[#8f2f1f] transition hover:bg-[#fff3d6]"><span>推薦店家／細項</span><span className="text-lg leading-none text-[#7a684d]">⌄</span></summary>
              <div className="border-t border-[#e8dcc0] p-3"><div className="grid gap-2">{item.shops.map((shop) => <a key={shop.name} href={shop.map} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#fff9e8]/80 px-3 py-3 transition hover:bg-[#fdf0c8] active:scale-[0.99]"><div className="min-w-0 flex-1"><div className="text-sm font-black text-[#243d3f]">{shop.name}</div><div className="mt-1 text-xs text-[#7a684d]">{shop.type}</div></div><div className="text-[#8f2f1f]"><MapPin size={16} /></div></a>)}</div></div>
            </details>
          )}
          <div className="mt-3 flex flex-wrap gap-2">{item.tags.map((tag) => <CategoryBadge key={tag} tag={tag} />)}</div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2"><button onClick={onLike} className={`rounded-full border-2 p-2 ${liked ? "border-[#c95d44] bg-[#f7b39e] text-[#8f2f1f]" : "border-[#d8c7a3] bg-white/60 text-[#9b8b70]"}`}><Heart size={18} fill={liked ? "currentColor" : "none"} /></button><button onClick={onCheck} className={`rounded-full border-2 p-2 ${checked ? "border-[#2f5f63] bg-[#9fc6bd] text-[#173b3f]" : "border-[#d8c7a3] bg-white/60 text-[#9b8b70]"}`}><CheckCircle2 size={18} /></button></div>
    </motion.div>
  );
}

function TripOverview({ selectedDay, setSelectedDay, setActivePage }) {
  return <section className="mt-8"><div className="mb-4 flex items-center gap-2 text-[#2f5f63]"><BookOpen size={20} /><h2 className="text-xl font-black">旅程總覽</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{days.map((day) => <button key={day.id} onClick={() => { setSelectedDay(day.id); setActivePage("itinerary"); setTimeout(() => document.getElementById("itinerary-title")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); }} className={`rounded-[1.6rem] border-2 bg-[#fff9e8] p-3 text-left shadow-[4px_4px_0_rgba(47,95,99,0.12)] transition hover:-translate-y-1 ${selectedDay === day.id ? "border-[#2f5f63]" : "border-[#d8c7a3]"}`}><div className="relative"><PhotoIllustration type={day.image} /><div className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center whitespace-pre-line rounded-full border-2 border-white text-center text-xs font-black leading-tight text-white" style={{ background: day.color }}>{day.label.replace(" ", "\n")}</div></div><div className="px-2 pb-3 pt-4"><div className="text-lg font-black text-[#243d3f]">{day.date}</div><div className="mt-1 whitespace-pre-line text-xl font-black leading-tight text-[#243d3f]">{day.title}</div><p className="mt-3 text-sm leading-6 text-[#6e5a3f]">{day.desc}</p></div></button>)}</div></section>;
}

function TransportCard({ group }) {
  return (
    <div className="rounded-[1.5rem] border border-[#d8c7a3] bg-[#fff9e8]/80 p-4">
      <div className="text-sm font-black tracking-[0.15em] text-[#243d3f]">{group.title}</div>
      <div className="mt-1 text-xs font-bold tracking-[0.12em] text-[#8f2f1f]">TIMELINE</div>
      <div className="mt-4 grid gap-0">
        {group.steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={`${group.title}-${step.title}-${index}`} className="relative flex gap-3 pb-4 last:pb-0">
              {index !== group.steps.length - 1 && (
                <div className="absolute left-5 top-10 h-[calc(100%-2.5rem)] border-l-2 border-dashed border-[#c9b486]" />
              )}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#243d3f] bg-[#f3d57b] text-[#243d3f] shadow-[3px_3px_0_rgba(36,61,63,0.12)]">
                <Icon size={18} />
              </div>
              <div className="min-w-0 rounded-2xl bg-white/60 px-3 py-2">
                <div className="text-sm font-black text-[#243d3f]">{step.title}</div>
                <div className="mt-1 text-sm leading-6 text-[#5f513d]">{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PreparationSection() {
  const [checkedItems, setCheckedItems] = useState({});
  return <section className="mt-6 rounded-[2.4rem] border-2 border-[#243d3f] bg-[#fff9e8] p-5 shadow-[10px_10px_0_rgba(36,61,63,0.18)] md:p-7"><div><div className="inline-flex rounded-full border-2 border-[#8f2f1f] bg-[#f3d57b] px-4 py-2 text-xs font-black tracking-[0.22em] text-[#8f2f1f]">BEFORE THE TRIP</div><h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#243d3f] md:text-4xl">行前準備</h2><p className="mt-3 text-[#6e5a3f]">出發前確認好所有東西，這樣到了蘭嶼才能真的放鬆。</p></div><div className="mt-7 rounded-[2rem] border-2 border-[#d8c7a3] bg-[#f7b39e]/25 p-5"><div className="text-xs font-black tracking-[0.22em] text-[#8f2f1f]">ISLAND RULES</div><h3 className="mt-1 text-xl font-black">注意事項</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{preparationData.notices.map((notice) => <div key={notice} className="flex gap-3 rounded-2xl bg-[#fff9e8]/75 p-3 text-sm leading-6 text-[#5f513d]"><div className="mt-1 h-2 w-2 rounded-full bg-[#c95d44]" /><div>{notice}</div></div>)}</div></div><div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><div className="rounded-[2rem] border-2 border-[#d8c7a3] bg-white/50 p-5"><div className="text-xs font-black tracking-[0.22em] text-[#2f5f63]">PACKING LIST</div><h3 className="mt-1 text-xl font-black">行李清單</h3><div className="mt-5 grid gap-3">{preparationData.checklist.map((item) => { const active = checkedItems[item]; return <button key={item} onClick={() => setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }))} className={`flex items-center gap-4 rounded-[1.4rem] border-2 p-4 text-left transition ${active ? "border-[#2f5f63] bg-[#9fc6bd]/40" : "border-[#d8c7a3] bg-[#fff9e8]"}`}><div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-sm font-black ${active ? "border-[#2f5f63] bg-[#2f5f63] text-white" : "border-[#c9b486] text-[#c9b486]"}`}>✓</div><div className="text-sm font-medium text-[#5f513d]">{item}</div></button>; })}</div></div><div className="grid gap-5"><div className="rounded-[2rem] border-2 border-[#d8c7a3] bg-[#9fc6bd]/25 p-5"><div className="text-xs font-black tracking-[0.22em] text-[#2f5f63]">TRANSPORT</div><h3 className="mt-1 text-xl font-black">交通資訊</h3><div className="mt-4 grid gap-4">{Object.values(preparationData.transport).map((group) => <TransportCard key={group.title} group={group} />)}</div></div><div className="rounded-[2rem] border-2 border-[#d8c7a3] bg-[#f3d57b]/25 p-5"><div className="text-xs font-black tracking-[0.22em] text-[#8f2f1f]">STAY</div><h3 className="mt-1 text-xl font-black">住宿資訊</h3><div className="mt-4 grid gap-4">{preparationData.stay.map((stay) => <div key={stay.name} className="rounded-[1.5rem] border border-[#d8c7a3] bg-[#fff9e8]/80 p-4"><div className="text-xs font-black tracking-[0.2em] text-[#c95d44]">{stay.place}</div><div className="mt-1 flex items-center gap-2"><div className="text-lg font-black text-[#243d3f]">{stay.name}</div><a href={stay.map} target="_blank" rel="noopener noreferrer" title="Google Maps" className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d8c7a3] bg-white text-[#2f5f63] transition hover:border-[#2f5f63] hover:bg-[#f3d57b] active:scale-95"><MapPin size={13} /></a></div><div className="mt-2 text-sm text-[#5f513d]">{stay.price}</div><div className="mt-1 text-sm text-[#7a684d]">{stay.note}</div></div>)}</div></div></div></div></section>;
}

function IslandMap() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const activeSpot = selectedSpot || spots[0];

  return (
    <section className="mb-6 rounded-[2rem] border-2 border-[#2f5f63]/20 bg-[#fff9e8] p-5 shadow-[8px_8px_0_rgba(47,95,99,0.12)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">島嶼地圖</h2>
          <p className="mt-1 text-sm text-[#6e5a3f]">依蘭嶼南北狹長的輪廓重繪，點選景點可查看簡介與導航。</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#5f513d]">
        {filterTags.map((tag) => {
          const Icon = tag.icon;
          return (
            <span key={tag.label} className="inline-flex items-center gap-1 rounded-full px-3 py-1 ring-1 ring-[#d8c7a3]" style={{ backgroundColor: tag.color }}>
              <Icon size={12} />
              {tag.label}
            </span>
          );
        })}
      </div>

      <div className="relative mt-5 h-[520px] overflow-hidden rounded-[1.75rem] border-2 border-[#2f5f63] bg-gradient-to-br from-[#8ec2c9] via-[#dff0f1] to-[#f3d57b]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 260" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lanyuSea" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8ec2c9" />
              <stop offset="55%" stopColor="#dff0f1" />
              <stop offset="100%" stopColor="#f3d57b" />
            </linearGradient>
          </defs>
          <rect width="200" height="260" fill="url(#lanyuSea)" />
          <path
            d="M110 18 C130 22 148 36 156 55 C165 78 162 102 156 124 C149 147 147 167 151 188 C155 212 144 232 124 240 C102 249 78 240 63 223 C48 205 45 185 47 162 C49 140 41 124 33 108 C24 90 23 67 34 50 C48 29 77 15 110 18 Z"
            fill="#2f9a59"
            stroke="#2f5f63"
            strokeWidth="2"
          />
          <path
            d="M110 28 C126 31 141 43 147 59 C154 79 151 100 146 120 C140 143 139 164 142 183 C145 203 137 220 120 228 C101 236 82 229 68 214 C56 199 54 181 56 161 C58 141 50 125 42 110 C34 95 33 73 42 58 C54 40 79 28 110 28 Z"
            fill="none"
            stroke="#fff9e8"
            strokeWidth="2"
            opacity="0.9"
          />
          <path
            d="M55 122 C80 118 102 118 122 120 C138 122 150 126 160 130"
            fill="none"
            stroke="#fff9e8"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeLinecap="round"
            opacity="0.95"
          />
        </svg>

        <div className="absolute left-[49%] top-[48%] rounded-full bg-[#fff9e8]/92 px-3 py-1 text-[10px] font-black tracking-[0.15em] text-[#8f2f1f] shadow-sm">中橫公路</div>
        <div className="absolute left-[60%] top-[34%] text-[10px] font-black tracking-[0.18em] text-[#243d3f]/70">東清</div>
        <div className="absolute left-[64%] top-[58%] text-[10px] font-black tracking-[0.18em] text-[#243d3f]/70">野銀</div>
        <div className="absolute left-[26%] top-[20%] text-[10px] font-black tracking-[0.18em] text-[#243d3f]/70">朗島</div>
        <div className="absolute left-[18%] top-[48%] text-[10px] font-black tracking-[0.18em] text-[#243d3f]/70">椰油</div>
        <div className="absolute left-[35%] top-[73%] text-[10px] font-black tracking-[0.18em] text-[#243d3f]/70">紅頭</div>
        <div className="absolute left-[48%] top-[88%] text-[10px] font-black tracking-[0.18em] text-[#243d3f]/70">青青草原</div>
        <div className="absolute bottom-5 left-5 rounded-full bg-[#fff9e8]/80 px-4 py-2 text-xs font-black tracking-[0.2em] text-[#2f5f63]">ISLAND MAP</div>

        {spots.map((spot) => {
          const isSelected = activeSpot.name === spot.name;
          const size = spot.level === "major" ? "h-10 w-10" : "h-8 w-8";
          return (
            <button
              key={spot.name}
              type="button"
              onClick={() => setSelectedSpot(spot)}
              style={{ left: spot.x, top: spot.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition ${isSelected ? "z-20 scale-110" : "z-10"}`}
              title={spot.name}
            >
              <div
                className={`${size} flex items-center justify-center rounded-full border-2 border-[#243d3f] text-[#243d3f] shadow-[3px_3px_0_rgba(36,61,63,0.22)]`}
                style={{ backgroundColor: spot.color }}
              >
                <MapPin size={spot.level === "major" ? 20 : 16} fill="currentColor" />
              </div>
              {spot.level === "major" && (
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#fff9e8]/95 px-2 py-1 text-[10px] font-black text-[#243d3f] shadow-sm">
                  {spot.name}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-[1.7rem] border-2 border-[#d8c7a3] bg-white/60 p-4 shadow-[4px_4px_0_rgba(47,95,99,0.1)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-black tracking-[0.2em] text-[#c95d44]">{activeSpot.area}</div>
            <h3 className="mt-1 text-xl font-black text-[#243d3f]">{activeSpot.name}</h3>
            <div className="mt-2"><CategoryList mood={activeSpot.mood} /></div>
            <p className="mt-3 text-sm leading-6 text-[#5f513d]">{activeSpot.desc}</p>
          </div>
          <a href={activeSpot.map} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#243d3f] bg-[#f3d57b] px-4 py-2 text-sm font-black text-[#243d3f] shadow-[3px_3px_0_rgba(36,61,63,0.18)] transition active:scale-95">
            <MapPin size={16} />導航
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <button
            key={`list-${spot.name}`}
            type="button"
            onClick={() => setSelectedSpot(spot)}
            className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${activeSpot.name === spot.name ? "border-[#2f5f63] bg-[#9fc6bd]/40" : "border-[#d8c7a3] bg-white/45"}`}
          >
            <div className="font-black text-[#243d3f]">{spot.name}</div>
            <div className="mt-2"><CategoryList mood={spot.mood} /></div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ItinerarySection({ day, query, setQuery, filteredItems, liked, setLiked, checked, setChecked }) {
  return <><div id="itinerary-title" className="scroll-mt-28 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><div className="text-sm font-black tracking-[0.2em] text-[#8f2f1f]">{day.stamp}</div><h2 className="text-2xl font-black">{day.label}｜{day.title}</h2></div><div className="relative w-full md:w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b8b70]" size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜尋景點、餐食、拍照…" className="w-full rounded-full border-2 border-[#d8c7a3] bg-[#fff9e8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#2f5f63]" /></div></div><div className="mb-5 flex gap-2 overflow-x-auto pb-2">
  <Pill active={!query} onClick={() => setQuery("")}>全部</Pill>
  {filterTags.map((tag) => {
    const Icon = tag.icon;
    return (
      <Pill
        key={tag.label}
        active={query === tag.label}
        onClick={() => setQuery(tag.label)}
      >
        <span className="flex items-center gap-2">
          <Icon size={14} />
          {tag.label}
        </span>
      </Pill>
    );
  })}
</div><div className="grid gap-4">{filteredItems.map((item) => { const key = `${day.id}-${item.time}-${item.title}`; return <ItemCard key={key} item={item} liked={!!liked[key]} checked={!!checked[key]} onLike={() => setLiked((s) => ({ ...s, [key]: !s[key] }))} onCheck={() => setChecked((s) => ({ ...s, [key]: !s[key] }))} />; })}</div></>;
}

function DayTabs({ selectedDay, setSelectedDay, setActivePage }) {
  const handleSelectDay = (dayId) => { setSelectedDay(dayId); setActivePage("itinerary"); setTimeout(() => document.getElementById("itinerary-title")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); };
  return <div className="sticky top-3 z-20 mt-6 rounded-full border border-[#d8c7a3] bg-[#fff9e8]/90 px-3 py-3 shadow-[0_8px_24px_rgba(36,61,63,0.12)] backdrop-blur"><div className="flex gap-2 overflow-x-auto">{days.map((d) => <button key={d.id} onClick={() => handleSelectDay(d.id)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${selectedDay === d.id ? "border-[#2f5f63] bg-[#9fc6bd] text-[#173b3f]" : "border-[#d8c7a3] bg-white/65 text-[#6e5a3f]"}`}>{d.label}</button>)}</div></div>;
}

function BottomNav({ activePage, setActivePage }) {
  const items = [{ id: "home", label: "首頁", icon: Home }, { id: "map", label: "地圖", icon: Map }, { id: "itinerary", label: "行程", icon: CalendarDays }, { id: "prep", label: "行前準備", icon: Luggage }, { id: "fav", label: "收藏", icon: Heart }];
  return <div className="sticky bottom-4 z-30 mx-auto mt-8 max-w-4xl rounded-full border border-[#d8c7a3] bg-[#fff9e8]/90 px-4 py-3 shadow-[0_10px_30px_rgba(36,61,63,0.16)] backdrop-blur"><div className="grid grid-cols-5 gap-2">{items.map((item) => { const Icon = item.icon; const active = activePage === item.id; return <button key={item.id} onClick={() => { setActivePage(item.id); if (item.id === "itinerary") { setTimeout(() => document.getElementById("itinerary-title")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); } }} className={`flex flex-col items-center gap-1 rounded-full py-1 text-xs font-bold transition ${active ? "text-[#c95d44]" : "text-[#7a684d]"}`}><Icon size={22} fill={active && item.id === "home" ? "currentColor" : "none"} /><span>{item.label}</span></button>; })}</div></div>;
}

export default function TravelAppPrototype() {
  const [activePage, setActivePage] = useState("home");
  const [selectedDay, setSelectedDay] = useState("day1");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState({});
  const [checked, setChecked] = useState({});
  const day = days.find((d) => d.id === selectedDay) || days[1];
  const filteredItems = useMemo(() => { const q = query.trim(); if (!q) return day.items; return day.items.filter((item) => [item.title, item.place, item.type, item.note, ...item.tags].join(" ").includes(q)); }, [day, query]);
  const favoriteItems = days.flatMap((d) => d.items.map((item) => ({ ...item, dayId: d.id, dayLabel: d.label, dayTitle: d.title })).filter((item) => liked[`${item.dayId}-${item.time}-${item.title}`]));
  return <div className="min-h-screen bg-[#e7f0ea] text-[#243d3f]"><div className="pointer-events-none fixed inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#243d3f 1px, transparent 1px)", backgroundSize: "12px 12px" }} /><section className="relative mx-auto max-w-6xl px-5 py-6 md:py-10"><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[2.4rem] border-2 border-[#2f5f63] bg-[#fff9e8] p-5 shadow-[12px_12px_0_rgba(47,95,99,0.2)] md:p-8"><Tape className="left-10 top-5" /><div className="absolute right-8 top-5 hidden rotate-[8deg] rounded-full border-2 border-[#c95d44] bg-[#fff9e8]/80 px-5 py-4 text-center text-xs font-black leading-6 tracking-[0.16em] text-[#c95d44] md:block">2026<br />SUMMER<br />LAN YU</div><div className="relative z-10"><div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[#8f2f1f] bg-[#f3d57b] px-4 py-2 text-xs font-black tracking-[0.18em] text-[#8f2f1f]"><Waves size={16} /> REAL ISLAND SUMMER</div><h1 className="text-5xl font-black leading-none tracking-[-0.06em] text-[#243d3f] md:text-7xl">{trip.title}</h1><div className="mt-2 text-sm font-black tracking-[0.35em] text-[#c95d44]">{trip.enTitle}</div><p className="mt-4 max-w-xl text-xs leading-6 text-[#5f513d] md:text-sm md:leading-7">{trip.subtitle}</p>{activePage === "home" && <TripOverview selectedDay={selectedDay} setSelectedDay={setSelectedDay} setActivePage={setActivePage} />}</div></motion.div>{activePage === "itinerary" && <DayTabs selectedDay={selectedDay} setSelectedDay={setSelectedDay} setActivePage={setActivePage} />}{activePage === "prep" && <PreparationSection />}{(activePage === "map" || activePage === "itinerary") && <main className="mt-6">{activePage === "map" && <IslandMap />}{activePage === "itinerary" && <ItinerarySection day={day} query={query} setQuery={setQuery} filteredItems={filteredItems} liked={liked} setLiked={setLiked} checked={checked} setChecked={setChecked} />}</main>}{activePage === "fav" && <section className="mt-6 rounded-[2rem] border-2 border-[#2f5f63]/20 bg-[#fff9e8] p-5 shadow-[8px_8px_0_rgba(47,95,99,0.12)] md:p-8"><div className="flex items-center gap-3"><Heart className="text-[#c95d44]" size={32} fill="currentColor" /><div><h2 className="text-2xl font-black">收藏清單</h2><p className="mt-1 text-sm text-[#6e5a3f]">你按愛心收藏的行程會集中在這裡。</p></div></div>{favoriteItems.length === 0 ? <div className="mt-6 rounded-[1.5rem] border border-[#d8c7a3] bg-white/50 p-6 text-center text-[#6e5a3f]">目前還沒有收藏。回到行程頁按愛心，就會出現在這裡。</div> : <div className="mt-6 grid gap-4">{favoriteItems.map((item) => { const key = `${item.dayId}-${item.time}-${item.title}`; return <ItemCard key={key} item={item} liked={!!liked[key]} checked={!!checked[key]} onLike={() => setLiked((s) => ({ ...s, [key]: !s[key] }))} onCheck={() => setChecked((s) => ({ ...s, [key]: !s[key] }))} />; })}</div>}</section>}<button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#243d3f] bg-[#f3d57b] text-lg font-black text-[#243d3f] shadow-[4px_4px_0_rgba(36,61,63,0.18)] transition active:scale-95" aria-label="回到最上方" title="回到最上方">↑</button><BottomNav activePage={activePage} setActivePage={setActivePage} /></section></div>;
}
