"use strict";

const componentCatalog = {
  compressor: {
    name: "Kompressor",
    short: "K",
    description: "Kompressor siqilgan havoni bosh rezervuarga uzatish uchun xizmat qiladi."
  },
  mainReservoir: {
    name: "Bosh rezervuar",
    short: "BR",
    description: "Bosh rezervuar tormoz tizimi ishlashi uchun zarur bo‘lgan siqilgan havo zaxirasini to‘playdi."
  },
  driverValve: {
    name: "Mashinist krani",
    short: "MK",
    description: "Mashinist krani zaryadlash, perekrisha, tormozlash va bo‘shatish jarayonlarini boshqaradi."
  },
  feedLine: {
    name: "Ta’minlash magistrali",
    short: "TM",
    description: "Ta’minlash magistrali kompressordan bosh rezervuar va mashinist kranigacha siqilgan havo uzatadi."
  },
  brakeLine: {
    name: "Tormoz magistrali",
    short: "TM",
    description: "Tormoz magistrali boshqaruv bosimini poyezd bo‘ylab uzatadi va avtomatik tormozlarda buyruq kanali vazifasini bajaradi."
  },
  brakeCylinder: {
    name: "Tormoz silindri",
    short: "TS",
    description: "Siqilgan havo bosimi porshenni siljitadi; porshen shtoki richagli uzatma orqali tormoz kolodkasiga kuch beradi."
  },
  brakeShoe: {
    name: "Tormoz kolodkasi",
    short: "TK",
    description: "Richagli uzatma bergan kuch ta’sirida kolodka g‘ildirakning aylanish yuzasiga siqilib, tormoz kuchini hosil qiladi."
  },
  distributor: {
    name: "Havo taqsimlagich",
    short: "HT",
    description: "Tormozlashda zaxira rezervuarini tormoz silindri bilan, bo‘shatishda esa silindrni atmosfera bilan tutashtiradi."
  },
  auxiliaryReservoir: {
    name: "Zaxira rezervuari",
    short: "ZR",
    description: "Zaryadlashda siqilgan havo to‘planadi; tormozlashda shu zaxira havo taqsimlagich orqali tormoz silindriga beriladi."
  },
  electroValves: {
    name: "Elektromagnit ventillar",
    short: "EV",
    description: "Tormoz va bo‘shatish ventillari elektr buyruqlariga ko‘ra pnevmatik kanallarni ulaydi yoki uzadi."
  },
  controlCircuit: {
    name: "Elektr boshqaruv zanjiri",
    short: "EZ",
    description: "Mashinist krani kontrolleridan kelgan elektr signali poyezd bo‘ylab elektromagnit ventillarga uzatiladi."
  },
  relayValve: {
    name: "Qayta ulash klapani",
    short: "QK",
    description: "Elektr qismida nosozlik yuz bersa, pnevmatik havo taqsimlagich orqali tormozlash imkonini saqlaydi."
  }
};

const stateCatalog = {
  idle: { icon: "○", name: "Boshlang‘ich holat", short: "Tizim ko‘rinishi", hidden: true },
  charge: { icon: "⇢", name: "Zaryadlash", short: "Havo zaxirasini to‘ldirish" },
  ready: { icon: "✓", name: "Poyezd holati", short: "Zaryadlangan va tormozlar bo‘shatilgan holat" },
  brake: { icon: "↓", name: "Tormozlash", short: "Tormoz kuchini hosil qilish" },
  lap: { icon: "Ⅱ", name: "Perekrisha", short: "Tormozlashda hosil qilingan bosimni o‘zgartirmay ushlab turish" },
  release: { icon: "↺", name: "Bo‘shatish", short: "Tormozni bo‘shatish" }
};

const automaticNextState = {
  charge: "ready",
  brake: "lap",
  release: "ready"
};

const schemes = [
  {
    id: 1,
    color: "#28d7e9",
    canvasZoom: 1.14,
    title: "To‘g‘ridan-to‘g‘ri ta’sir qiluvchi avtomatik bo‘lmagan tormoz",
    description: "Mashinist krani tormoz silindrlariga beriladigan siqilgan havoni to‘g‘ridan-to‘g‘ri boshqaradi.",
    image: "assets/scheme-1-direct-nonautomatic.svg",
    animations: {
      charge: { base: "assets/animations/s1-charge" },
      ready: { fromState: "charge", holdLastFrame: true },
      brake: { base: "assets/animations/s1-brake" },
      lap: { base: "assets/animations/s1-brake", holdLastFrame: true },
      release: { base: "assets/animations/s1-release" }
    },
    animationLabels: {
      charge: { text: "Zaryadlash", left: "37.1%", top: "0%", width: "8.6%" }
    },
    annotations: [
      { text: "P = 9 kgk/sm²", left: 26.2, top: 28.4, kind: "pressure" },
      { text: "Atm.", left: 45.0, top: 15.8, kind: "atmosphere" },
      { text: "Lokomotiv", left: 49.2, top: 29.6, kind: "zone" },
      { text: "Vagon", left: 83.2, top: 29.6, kind: "zone" }
    ],
    chargePaths: [
      { path: "M 76 95 H 238 Q 258 95 258 116 V 216 Q 258 236 280 236", start: 0.08, end: 0.54 },
      { path: "M 368 236 Q 404 236 404 215 V 104 Q 404 85 423 85 H 443", start: 0.46, end: 0.92 }
    ],
    chargeFills: [
      { x: 292, y: 217, width: 65, height: 36, radius: 10, start: 0.25, end: 0.58 }
    ],
    pressureTimelines: {
      charge: [
        { at: 0.00, reservoir: 0.0, line: 0.0, cylinder: 0.0 },
        { at: 0.18, reservoir: 2.0, line: 0.0, cylinder: 0.0 },
        { at: 0.55, reservoir: 6.0, line: 0.0, cylinder: 0.0 },
        { at: 0.88, reservoir: 9.0, line: 0.0, cylinder: 0.0 },
        { at: 1.00, reservoir: 9.0, line: 0.0, cylinder: 0.0 }
      ]
    },
    components: [
      ["compressor", 11.6, 16.6, 11, 8], ["mainReservoir", 29.5, 34.9, 24, 52], ["driverValve", 41.5, 12.6, 48, 6],
      ["brakeLine", 82.7, 34.9, 80, 22], ["brakeCylinder", 58.2, 45.0, 51, 56], ["brakeShoe", 61.8, 52.8, 70, 62]
    ],
    flows: {
      idle: [],
      charge: [
        ["blue", "M 900 3150 L 2600 3150 L 3200 3600 L 4000 3600 L 4300 3300 L 4300 2200"],
        ["blue", "M 4300 3300 L 10200 3300"]
      ],
      brake: [
        ["red", "M 3300 3600 L 4000 3600 L 4300 3300 L 10200 3300"],
        ["red", "M 5700 3300 L 5700 4300 L 6500 4300"],
        ["red", "M 8300 3300 L 8300 4300 L 9100 4300"]
      ],
      lap: [
        ["amber", "M 4300 3300 L 10200 3300"],
        ["amber", "M 5700 3300 L 5700 4300 L 6500 4300 M 8300 3300 L 8300 4300 L 9100 4300"]
      ],
      release: [
        ["release", "M 9100 4300 L 8300 4300 L 8300 3300 L 4300 3300 L 4300 2200"],
        ["release", "M 6500 4300 L 5700 4300 L 5700 3300"]
      ]
    },
    states: {
      idle: state("Tizimning umumiy sxemasi", "Asosiy qismlar va pnevmatik bog‘lanishlar", "Sxemadagi ko‘k belgilarni bosib, har bir elementning vazifasini ko‘ring.", 0, 0),
      charge: state("Zaryadlash jarayoni", "Faqat ta’minlash qismi va bosh rezervuar zaryadlanadi", "Siqilgan havo kompressordan bosh rezervuarga va mashinist kranining kirish qismigacha uzatiladi. Kran chiqishi yopiq: tormoz magistrali va silindrlar bosimsiz qoladi.", 0, 0),
      ready: state("Poyezd holati", "Bosh rezervuar zaryadlangan, tormozlar bo‘shatilgan", "Bosh rezervuarda 9 kgk/sm² havo zaxirasi tayyor. Mashinist kranining tormoz silindrlariga olib boruvchi kanali yopiq; silindrlar atmosfera bilan tutashgan va kolodkalar g‘ildirakdan uzoqda turadi.", 0, 0),
      brake: state("Tormozlash jarayoni", "Havo to‘g‘ridan-to‘g‘ri tormoz silindrlariga beriladi", "Mashinist krani kanalni ochadi. Bosh rezervuardagi siqilgan havo magistral orqali tormoz silindrlariga kirib, kolodkalarni g‘ildirakka siqadi.", 3.5, 3.5),
      lap: state("Perekrisha holati", "Tormoz silindridagi bosim saqlanadi", "Kran kanallari yopiladi. Tormoz silindrlaridagi belgilangan bosim va hosil bo‘lgan tormoz kuchi o‘zgarmas holda ushlab turiladi.", 3.5, 3.5),
      release: state("Bo‘shatish jarayoni", "Tormoz silindri atmosfera bilan tutashadi", "Silindrlardagi siqilgan havo atmosfera kanaliga chiqariladi. Porshen va richagli uzatma boshlang‘ich holatga qaytadi.", 0, 0)
    }
  },
  // Eski Flash menyusidagi 2-sxema s3-prefiksli tiklangan media fayllariga tegishli.
  {
    id: 2,
    color: "#49a7ff",
    canvasZoom: 1.18,
    title: "To‘g‘ridan-to‘g‘ri ta’sir qilmaydigan avtomatik tormoz",
    description: "Magistral bosimi pasayganda havo taqsimlagich zaxira rezervuaridan tormoz silindriga havo uzatadi.",
    image: "assets/scheme-3-direct-automatic.svg",
    animations: {
      charge: { base: "assets/animations/s3-charge" },
      ready: { fromState: "charge", holdLastFrame: true },
      brake: { base: "assets/animations/s3-brake" },
      lap: { base: "assets/animations/s3-brake", holdLastFrame: true },
      release: { base: "assets/animations/s3-release" }
    },
    animationLabels: {
      charge: { text: "Zaryadlash", left: "56.4%", top: "0%", width: "8.6%" }
    },
    annotations: [
      { text: "P = 9 kgk/sm²", left: 35.4, top: 22.6, kind: "pressure" },
      { text: "Atm.", left: 53.2, top: 5.0, kind: "atmosphere" },
      { text: "Atm.", left: 68.8, top: 58.0, kind: "atmosphere" },
      { text: "P = 4,6 kgk/sm²", left: 94.0, top: 40.0, kind: "aux-pressure" },
      { text: "Lokomotiv", left: 57.0, top: 26.0, kind: "zone" },
      { text: "Vagon", left: 85.2, top: 26.0, kind: "zone" }
    ],
    chargePaths: [
      { path: "M 155 55 H 326 Q 350 55 350 78 V 171 Q 350 195 374 195", start: 0.02, end: 0.26 },
      { path: "M 458 195 H 474 Q 495 195 495 174 V 68 Q 495 47 516 47", start: 0.20, end: 0.43 },
      { path: "M 550 68 V 188 Q 550 212 574 212 H 1004", start: 0.38, end: 0.72 },
      { path: "M 680 212 V 310 Q 680 338 708 338 H 744", start: 0.60, end: 0.82 },
      { path: "M 818 338 V 286 Q 818 267 839 267 H 851", start: 0.76, end: 0.96 }
    ],
    chargeFills: [
      { x: 381, y: 172, width: 72, height: 45, radius: 10, start: 0.12, end: 0.33 },
      { x: 855, y: 244, width: 76, height: 50, radius: 12, start: 0.82, end: 1.00 }
    ],
    brakePaths: [
      { path: "M 856 267 H 840 Q 818 267 818 289 V 337 H 790", start: 0.04, end: 0.46 },
      { path: "M 790 350 H 815 V 386 Q 815 403 832 403 H 858", start: 0.36, end: 0.84 }
    ],
    brakeFills: [
      { x: 871, y: 383, width: 56, height: 38, radius: 10, start: 0.70, end: 1.00 }
    ],
    pressureTimelines: {
      charge: [
        { at: 0.00, reservoir: 0.0, line: 0.0, cylinder: 0.0 },
        { at: 0.35, reservoir: 3.2, line: 0.0, cylinder: 0.0 },
        { at: 0.68, reservoir: 9.0, line: 0.0, cylinder: 0.0 },
        { at: 0.86, reservoir: 9.0, line: 2.8, cylinder: 0.0 },
        { at: 1.00, reservoir: 9.0, line: 5.0, cylinder: 0.0 }
      ]
    },
    components: [
      ["compressor", 20.0, 14.1, 13, 6], ["mainReservoir", 38.2, 28.8, 34, 41], ["driverValve", 49.9, 9.0, 57, 7],
      ["brakeLine", 82.7, 31.4, 80, 22], ["distributor", 69.5, 50.3, 62, 58], ["auxiliaryReservoir", 81.4, 39.6, 89, 33],
      ["brakeCylinder", 81.8, 60.7, 89, 57], ["brakeShoe", 85.9, 71.0, 90, 76]
    ],
    flows: {
      idle: [],
      charge: [
        ["blue", "M 1700 3300 L 3500 3300 L 4700 3300 L 5200 3100 L 10200 3100"],
        ["blue", "M 6800 3100 L 6800 4200 L 8100 4200"]
      ],
      brake: [
        ["red", "M 3900 3700 L 5000 3300 L 10200 3300"],
        ["red", "M 6800 3300 L 6800 4800 L 8200 4800 L 8500 5600"]
      ],
      lap: [
        ["amber", "M 6800 3300 L 6800 4800 L 8500 4800 L 8500 5600"]
      ],
      release: [
        ["release", "M 8800 5600 L 8500 4800 L 7000 4800 L 6800 5700"]
      ]
    },
    states: {
      idle: state("Tizimning umumiy sxemasi", "Avtomatik tormozning asosiy qismlari", "Bu tizim magistral uzilganda yoki bosim keskin pasayganda ham avtomatik ravishda tormozlashni boshlaydi.", 0, 0),
      charge: state("Zaryadlash jarayoni", "Magistral 5,0 va zaxira rezervuar 4,6 kgk/sm² gacha to‘ldiriladi", "Mashinist krani tormoz magistralini 5,0 kgk/sm² ish bosimigacha to‘ldiradi. Havo taqsimlagich orqali zaxira rezervuarida 4,6 kgk/sm² siqilgan havo to‘planadi; tormoz silindri bosimsiz qoladi.", 5.0, 0),
      ready: state("Poyezd holati", "Magistral va zaxira rezervuari zaryadlangan", "Tormoz magistralida 5,0 kgk/sm², zaxira rezervuarida 4,6 kgk/sm² bosim saqlanadi. Havo taqsimlagich bo‘shatish holatida: tormoz silindri bosimsiz va kolodka g‘ildirakdan uzoqda.", 5.0, 0),
      brake: state("Tormozlash jarayoni", "Magistral bosimi kamaytiriladi", "Bosim pasayishini sezgan havo taqsimlagich zaxira rezervuarini tormoz silindri bilan tutashtiradi. Kolodka g‘ildirakka siqiladi.", 3.5, 2.6),
      lap: state("Perekrisha holati", "Belgilangan tormoz kuchi saqlanadi", "Havo taqsimlagich zaxira rezervuari va tormoz silindri orasidagi oqimni to‘xtatadi; silindr bosimi barqarorlashadi.", 3.5, 2.6),
      release: state("Bo‘shatish jarayoni", "Magistral bosimi qayta oshiriladi", "Havo taqsimlagich silindrni atmosfera bilan tutashtiradi va zaxira rezervuarini qayta zaryadlash holatiga o‘tkazadi.", 5.0, 0)
    }
  },
  // Eski Flash menyusidagi 3-sxema s2-prefiksli media fayllariga tegishli;
  // ushbu oilada brake/release nomlari ham mexanik harakatga nisbatan teskari chiqqan.
  {
    id: 3,
    color: "#36d49b",
    canvasZoom: 1.12,
    title: "To‘g‘ridan-to‘g‘ri ta’sir qiluvchi avtomatik tormoz",
    description: "Tormoz kuchi mashinist krani bilan boshqariladi, avtomatik elementlar esa xavfsizlikni ta’minlaydi.",
    image: "assets/scheme-2-indirect-automatic.svg",
    animations: {
      charge: { synthetic: true, duration: 7.2 },
      ready: { fromState: "charge", holdLastFrame: true },
      brake: { base: "assets/animations/s2-release" },
      lap: { base: "assets/animations/s2-release", holdLastFrame: true },
      release: { base: "assets/animations/s2-brake" }
    },
    animationLabels: {
      charge: { text: "Zaryadlash", left: "47%", top: "2%", width: "12%" }
    },
    annotations: [
      { text: "P = 9 kgk/sm²", left: 28.1, top: 38.4, kind: "pressure" },
      { text: "Atm.", left: 41.6, top: 15.0, kind: "atmosphere" },
      { text: "Atm.", left: 59.4, top: 56.0, kind: "atmosphere" },
      { text: "P = 6,5 kgk/sm²", left: 91.0, top: 33.0, kind: "aux-pressure" },
      { text: "Lokomotiv", left: 49.0, top: 15.2, kind: "zone" },
      { text: "Vagon", left: 83.0, top: 15.2, kind: "zone" }
    ],
    chargePaths: [
      { path: "M 78 151 H 247 Q 276 151 276 180 V 278 Q 276 295 293 295", start: 0.05, end: 0.32 },
      { path: "M 384 295 H 397 Q 421 295 421 270 V 157", start: 0.25, end: 0.49 },
      { path: "M 443 137 H 1042", start: 0.43, end: 0.72 },
      { path: "M 608 137 V 207", start: 0.58, end: 0.76 },
      { path: "M 608 207 V 236 H 742 V 295 H 809 Q 831 295 831 270 V 205 Q 831 195 844 195 H 856", start: 0.69, end: 0.96 }
    ],
    chargeFills: [
      { x: 304, y: 277, width: 73, height: 36, radius: 10, start: 0.18, end: 0.42 },
      { x: 866, y: 175, width: 68, height: 38, radius: 11, start: 0.76, end: 0.98 }
    ],
    pressureTimelines: {
      charge: [
        { at: 0.00, reservoir: 0.0, line: 0.0, cylinder: 0.0 },
        { at: 0.22, reservoir: 3.5, line: 0.0, cylinder: 0.0 },
        { at: 0.48, reservoir: 9.0, line: 0.0, cylinder: 0.0 },
        { at: 0.72, reservoir: 9.0, line: 3.2, cylinder: 0.0 },
        { at: 1.00, reservoir: 9.0, line: 5.0, cylinder: 0.0 }
      ]
    },
    components: [
      ["compressor", 13.4, 22.2, 11, 10], ["mainReservoir", 30.6, 45.1, 24, 58], ["driverValve", 38.3, 20.1, 45, 8],
      ["brakeLine", 72.7, 20.1, 73, 10], ["distributor", 59.5, 41.0, 57, 58], ["auxiliaryReservoir", 82.4, 29.0, 87, 18],
      ["brakeCylinder", 88.0, 51.0, 87, 62], ["brakeShoe", 92.0, 60.0, 90, 75]
    ],
    flows: {
      idle: [],
      charge: [
        ["blue", "M 900 3050 L 2900 3050 L 3900 3050 L 10200 3050"],
        ["blue", "M 6100 3050 L 6100 3600 L 7200 3600 L 8200 4000"]
      ],
      brake: [
        ["red", "M 8200 4000 L 7200 4000 L 6400 4300 L 6400 5300 L 8700 5300"]
      ],
      lap: [
        ["amber", "M 6400 4300 L 6400 5300 L 8700 5300"],
        ["amber", "M 8200 4000 L 7200 4000"]
      ],
      release: [
        ["release", "M 9000 5300 L 6800 5300 L 6400 5000 L 6400 6000"]
      ]
    },
    states: {
      idle: state("Tizimning umumiy sxemasi", "To‘g‘ridan-to‘g‘ri va avtomatik boshqaruv birlashgan", "Tizim normal boshqaruvda tezkor ishlaydi, magistral shikastlanganda esa avtomatik himoya vazifasini bajaradi.", 0, 0),
      charge: state("Zaryadlash jarayoni", "Magistral va 6,5 kgk/sm² zaxira rezervuari zaryadlanadi", "Kompressor bosh rezervuarda 9 kgk/sm² havo zaxirasini hosil qiladi. Tormoz magistrali 5 kgk/sm², zaxira rezervuari esa 6,5 kgk/sm² gacha zaryadlanadi; tormoz silindri bosimsiz qoladi.", 5.0, 0),
      ready: state("Poyezd holati", "Tizim zaryadlangan va harakatga tayyor", "Bosh rezervuarda 9 kgk/sm², tormoz magistralida 5 kgk/sm² va zaxira rezervuarida 6,5 kgk/sm² bosim saqlanadi. Tormoz silindri atmosfera bilan tutashgan, kolodka g‘ildirakdan uzoqda.", 5.0, 0),
      brake: state("Tormozlash jarayoni", "Boshqaruv bosimi tormoz silindriga uzatiladi", "Siqilgan havo pnevmatik kanallar orqali silindrga beriladi. Porshen richagli uzatmani harakatga keltiradi.", 3.8, 3.0),
      lap: state("Perekrisha holati", "Tormoz bosimi belgilangan qiymatda qoladi", "Klapanning muvozanat holati silindrdagi bosimni saqlab, tormoz kuchining o‘zgarib ketishiga yo‘l qo‘ymaydi.", 3.8, 3.0),
      release: state("Bo‘shatish jarayoni", "Silindrdagi havo atmosferaga chiqariladi", "Magistral ish bosimi tiklanadi, tormoz silindri bo‘shaydi va kolodka g‘ildirakdan uzoqlashadi.", 5.0, 0)
    }
  },
  {
    id: 4,
    color: "#ffb84d",
    canvasZoom: 1.08,
    title: "Elektropnevmatik tormoz",
    description: "Elektr signali tormoz buyruqlarini bir vaqtda uzatadi, pnevmatik qism esa ijrochi kuchni hosil qiladi.",
    image: "assets/scheme-4-electropneumatic.svg",
    animations: {
      charge: { base: "assets/animations/s4-charge" },
      ready: { fromState: "charge", holdLastFrame: true },
      brake: { base: "assets/animations/s4-brake" },
      lap: { base: "assets/animations/s4-lap" },
      release: { base: "assets/animations/s4-release" }
    },
    animationLabels: {
      charge: { text: "Zaryadlash", left: "30.1%", top: "22.8%", width: "8.8%" }
    },
    annotations: [
      { text: "P = 9 kgk/sm²", left: 13.3, top: 40.2, kind: "pressure" },
      { text: "Atm.", left: 28.0, top: 25.5, kind: "atmosphere" },
      { text: "Lokomotiv", left: 33.0, top: 75.0, kind: "zone" },
      { text: "Vagon", left: 78.5, top: 75.0, kind: "zone" }
    ],
    chargePaths: [],
    pressureTimelines: {
      charge: [
        { at: 0.00, reservoir: 0.0, line: 0.0, cylinder: 0.0 },
        { at: 0.20, reservoir: 2.0, line: 0.0, cylinder: 0.0 },
        { at: 0.52, reservoir: 9.0, line: 0.0, cylinder: 0.0 },
        { at: 0.78, reservoir: 9.0, line: 3.5, cylinder: 0.0 },
        { at: 1.00, reservoir: 9.0, line: 5.0, cylinder: 0.0 }
      ]
    },
    components: [
      ["compressor", 10.5, 71.0, 12, 83], ["mainReservoir", 10.7, 45.5, 16, 55], ["driverValve", 23.9, 30.3, 15, 24], ["controlCircuit", 68.2, 12.6, 68, 5],
      ["auxiliaryReservoir", 46.8, 30.8, 47, 20], ["electroValves", 70.6, 27.4, 82, 20], ["relayValve", 43.6, 52.5, 40, 62],
      ["brakeCylinder", 80.8, 52.5, 88, 45], ["brakeShoe", 88.2, 67.3, 89, 78]
    ],
    flows: {
      idle: [],
      charge: [
        ["blue", "M 1200 5400 L 2200 4300 L 3600 4300 L 5600 4300 L 5600 5200 L 8200 5200"],
        ["blue", "M 5600 4300 L 5600 3400 L 7200 3400"]
      ],
      brake: [
        ["electric", "M 1000 1900 L 9900 1900"],
        ["red", "M 5000 3400 L 6500 3400 L 7000 3900 L 7000 5200 L 8500 5200"]
      ],
      lap: [
        ["electric", "M 1000 2050 L 9900 2050"],
        ["amber", "M 7000 3900 L 7000 5200 L 8500 5200"]
      ],
      release: [
        ["release", "M 8800 5200 L 7000 5200 L 7000 6000"]
      ]
    },
    states: {
      idle: state("Tizimning umumiy sxemasi", "Elektr va pnevmatik qismlar", "Elektr boshqaruv zanjiri buyruqni tez uzatadi; pnevmatik qurilmalar tormoz silindrida zarur kuchni hosil qiladi.", 0, 0),
      charge: state("Zaryadlash jarayoni", "Pnevmatik zaxira to‘ldiriladi", "Tormoz magistrali va zaxira rezervuari ish bosimigacha zaryadlanadi. Elektromagnit ventillar bo‘shatish holatida turadi.", 5.0, 0),
      ready: state("Poyezd holati", "Pnevmatik qism zaryadlangan, elektr zanjiri nazorat holatida", "Tormoz magistrali va zaxira rezervuari ish bosimida. Elektromagnit ventillar tormoz silindrini bosimsiz holatda ushlab turadi; kolodka g‘ildirakdan uzoqda.", 5.0, 0),
      brake: state(
        "Tormozlash jarayoni",
        "Kontroller kontaktlarni tutashtiradi",
        "Tormozlash vaqtida mashinist krani kontrolleri tegishli kontaktlarni tutashtiradi. Elektr toki elektromagnit ventillarning g‘altaklariga ta’sir qiladi. Tormoz ventili ochilib, siqilgan havo tormoz silindriga yo‘naltiriladi.",
        5.0,
        3.2,
        "Mashinist krani kontrolleri tegishli kontaktlarni tutashtiradi va elektr toki elektromagnit ventillarning g‘altaklariga uzatiladi."
      ),
      lap: state("Perekrisha holati", "Tormoz bosimi elektr boshqaruv bilan saqlanadi", "Tok faqat bo‘shatish ventilining g‘altagida qoladi; tormoz ventili toksizlanadi va silindr bosimi o‘zgarmaydi.", 5.0, 3.2),
      release: state(
        "Bo‘shatish jarayoni",
        "Kontroller kontaktlari uziladi",
        "Bo‘shatish vaqtida mashinist krani kontrolleridagi kontaktlar uziladi. Elektromagnit ventillarning g‘altaklari toksizlanadi. Bo‘shatish ventili tormoz silindrini atmosfera bilan tutashtiradi.",
        5.0,
        0,
        "Mashinist krani kontrolleridagi kontaktlar uziladi va elektromagnit ventillarning g‘altaklari toksizlanadi."
      )
    }
  }
];

function state(heading, subtitle, text, linePressure, cylinderPressure, technicalNote = "") {
  const reservoirPressure = heading.startsWith("Tizimning") ? 0 : 9;
  return { heading, subtitle, text, technicalNote, reservoirPressure, linePressure, cylinderPressure };
}

const quizQuestions = [
  quiz("Asosiy qismlar", "Kompressorning asosiy vazifasi nima?", ["Tormoz kolodkasini sovitish", "Siqilgan havo hosil qilish", "Elektr kuchlanishini oshirish", "G‘ildirak tezligini o‘lchash"], 1, "Kompressor tormoz tizimi uchun siqilgan havo hosil qiladi va uni bosh rezervuarga uzatadi."),
  quiz("Havo zaxirasi", "Bosh rezervuar nima uchun xizmat qiladi?", ["Siqilgan havo zaxirasini to‘plash", "Tormoz kuchini o‘lchash", "Kolodkani g‘ildirakka siqish", "Elektr signalini uzatish"], 0, "Bosh rezervuar tormoz va yordamchi pnevmatik qurilmalar uchun siqilgan havo zaxirasini saqlaydi."),
  quiz("Boshqaruv", "Mashinist krani qaysi jarayonlarni boshqaradi?", ["Faqat tormozlashni", "Faqat zaryadlashni", "Zaryadlash, tormozlash, perekrisha va bo‘shatishni", "Faqat kompressorni"], 2, "Mashinist krani pnevmatik tormozning barcha asosiy ish holatlarini boshqaradi."),
  quiz("Avtomatik tormoz", "To‘g‘ridan-to‘g‘ri ta’sir qilmaydigan avtomatik tormozda magistral bosimi pasaysa nima sodir bo‘ladi?", ["Tormoz bo‘shaydi", "Havo taqsimlagich tormozlashni boshlaydi", "Kompressor o‘chadi", "Elektr zanjiri uziladi"], 1, "Bosimning pasayishi havo taqsimlagich uchun tormozlash buyrug‘i hisoblanadi."),
  quiz("Havo taqsimlagich", "Tormozlashda havo taqsimlagich qaysi qurilmalarni tutashtiradi?", ["Bosh rezervuar va kompressor", "Zaxira rezervuari va tormoz silindri", "Silindr va atmosfera", "Elektr zanjiri va magistral"], 1, "Zaxira rezervuaridagi havo havo taqsimlagich orqali tormoz silindriga beriladi."),
  quiz("Bo‘shatish", "Tormoz bo‘shatilganda silindrdagi havo qayerga chiqadi?", ["Bosh rezervuarga", "Kompressorga", "Atmosferaga", "Zaxira rezervuariga"], 2, "Bo‘shatish holatida tormoz silindri atmosfera kanali bilan tutashtiriladi."),
  quiz("Ijrochi qism", "Tormoz silindridagi porshen nimani harakatga keltiradi?", ["Elektr kontaktini", "Richagli tormoz uzatmasini", "Kompressor valini", "Magistral kranini"], 1, "Porshen shtoki richagli uzatmaga kuch beradi va kolodkani g‘ildirakka yaqinlashtiradi."),
  quiz("Tormoz kuchi", "Tormoz kolodkasi qayerga siqiladi?", ["O‘q bo‘yniga", "Buksa korpusiga", "G‘ildirakning aylanish yuzasiga", "Rels tagiga"], 2, "Kolodkaning g‘ildirak aylanish yuzasiga ishqalanishi tormoz kuchini hosil qiladi."),
  quiz("Xavfsizlik", "Nima sababdan magistral uzilganda avtomatik tormoz ishga tushadi?", ["Bosim keskin pasaygani uchun", "Kuchlanish oshgani uchun", "Kompressor tezlashgani uchun", "Kolodka qizigani uchun"], 0, "Avtomatik tormoz magistral bosimining pasayishini tormozlash buyrug‘i sifatida qabul qiladi."),
  quiz("Elektropnevmatik tormoz", "Elektropnevmatik tizimning muhim afzalligi nima?", ["Havo kerak bo‘lmaydi", "Buyruq vagonlarga elektr orqali tez va bir vaqtda uzatiladi", "Tormoz silindri bo‘lmaydi", "Faqat lokomotiv tormozlanadi"], 1, "Elektr signalining tez tarqalishi poyezd bo‘ylab tormozlarning deyarli bir vaqtda ishlashini ta’minlaydi."),
  quiz("Perekrisha", "Perekrisha holatining vazifasi nima?", ["Bosimni belgilangan qiymatda saqlash", "Barcha havoni chiqarish", "Rezervuarni yuvish", "Kompressorni ta’mirlash"], 0, "Perekrisha zaryadlash tugaganini bildirmaydi. U tormozlashda hosil qilingan tormoz silindri bosimini o‘zgartirmay ushlab turadi."),
  quiz("Zaryadlash", "Zaryadlash tugagach tizim qaysi holatga o‘tishi kerak?", ["Perekrisha", "Tormozlash", "Poyezd holati", "Favqulodda tormozlash"], 2, "Zaryadlashdan keyin tizim Poyezd holatiga o‘tadi: magistral va rezervuarlar zaryadlangan, tormoz silindri esa deyarli bosimsiz bo‘ladi.")
];

function quiz(topic, question, answers, correct, explanation) {
  return { topic, question, answers, correct, explanation };
}

const views = {
  home: document.getElementById("homeView"),
  scheme: document.getElementById("schemeView"),
  quiz: document.getElementById("quizView")
};
const appShell = document.querySelector(".app-shell");

let currentScheme = schemes[0];
let currentState = "idle";
let currentQuestion = 0;
let currentScore = 0;
let answered = false;
let animationRequest = 0;
let pressureAnimationFrame = 0;
let stateTransitionTimer = 0;
let elementsMode = false;
let brakeApplied = false;
let displayedPressure = { reservoir: 0, line: 0, cylinder: 0 };
let aboutReturnFocus = null;

function showView(name) {
  Object.entries(views).forEach(([key, element]) => element.classList.toggle("active", key === name));
  const schemeMode = name === "scheme";
  const homeMode = name === "home";
  document.body.classList.toggle("scheme-mode", schemeMode);
  document.body.classList.toggle("home-mode", homeMode);
  appShell.classList.toggle("scheme-mode", schemeMode);
  appShell.classList.toggle("home-mode", homeMode);
  if (!schemeMode) {
    const video = document.getElementById("schemeAnimation");
    video.pause();
    cancelAnimationFrame(pressureAnimationFrame);
    window.clearTimeout(stateTransitionTimer);
    animationRequest += 1;
  }
  window.scrollTo({ top: 0 });
  if (schemeMode) requestAnimationFrame(fitDiagramCanvas);
}

function createSchemeCards() {
  const grid = document.getElementById("schemeGrid");
  schemes.forEach((scheme) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "scheme-card";
    card.style.setProperty("--card-color", scheme.color);
    card.innerHTML = `
      <span class="card-number">SXEMA ${scheme.id}</span>
      <div class="card-diagram" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <h3>${scheme.title}</h3>
      <div class="card-footer"><span>Interaktiv sxemani ochish</span><span class="card-arrow">→</span></div>
    `;
    card.addEventListener("click", () => openScheme(scheme.id));
    grid.appendChild(card);
  });
}

function openScheme(id) {
  currentScheme = schemes.find((scheme) => scheme.id === id) || schemes[0];
  currentState = "idle";
  brakeApplied = false;
  document.getElementById("schemeNumber").textContent = `SXEMA ${currentScheme.id}`;
  document.getElementById("schemeTitle").textContent = currentScheme.title;
  document.getElementById("schemeDescription").textContent = currentScheme.description;
  const image = document.getElementById("schemeImage");
  image.src = currentScheme.image;
  image.alt = `${currentScheme.title} sxemasi`;
  renderStates();
  renderComponents();
  renderAnnotations();
  showView("scheme");
  selectState("idle");
}

function renderStates() {
  const list = document.getElementById("stateList");
  list.replaceChildren();
  Object.entries(stateCatalog).forEach(([key, item]) => {
    if (item.hidden) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "state-button";
    button.dataset.state = key;
    button.title = item.short;
    button.innerHTML = `<span>${item.icon}</span><strong>${item.name}</strong>`;
    button.addEventListener("click", () => selectState(key));
    list.appendChild(button);
  });
  refreshStateButtons();
}

function refreshStateButtons() {
  document.querySelectorAll(".state-button").forEach((button) => {
    const isLapLocked = button.dataset.state === "lap" && !brakeApplied;
    button.classList.toggle("active", !elementsMode && button.dataset.state === currentState);
    button.classList.toggle("locked", isLapLocked);
    button.setAttribute("aria-disabled", String(isLapLocked));
    if (isLapLocked) button.title = "Perekrisha tormozlash bosqichidan keyin ishlaydi";
    else button.title = stateCatalog[button.dataset.state].short;
  });
}

function showOperationNotice(heading, text) {
  document.getElementById("processIcon").textContent = "i";
  document.getElementById("processHeading").textContent = heading;
  document.getElementById("processText").textContent = text;
  renderTechnicalNote("");
  const next = document.getElementById("nextStateNote");
  next.hidden = true;
}

function renderTechnicalNote(text) {
  const note = document.getElementById("stateTechnicalNote");
  const copy = document.getElementById("stateTechnicalNoteText");
  if (!note || !copy) return;
  copy.textContent = text || "";
  note.hidden = !text;
}

function selectState(key, options = {}) {
  if (!currentScheme.states[key]) return;
  if (key === "lap" && !brakeApplied) {
    showOperationNotice(
      "Perekrisha hozir faol emas",
      "Perekrisha zaryadlash tugaganini bildirmaydi. Avval tormozlash bosqichi bajariladi; shundan keyin u tormoz silindridagi hosil bo‘lgan bosimni o‘zgartirmay ushlab turadi."
    );
    document.querySelector('[data-state="lap"]')?.classList.add("attention");
    window.setTimeout(() => document.querySelector('[data-state="lap"]')?.classList.remove("attention"), 700);
    return;
  }

  window.clearTimeout(stateTransitionTimer);
  if (elementsMode) setElementsMode(false);
  if (key === "brake") brakeApplied = true;
  if (["idle", "charge", "ready", "release"].includes(key)) brakeApplied = false;
  currentState = key;
  const stateMeta = stateCatalog[key];
  const stateData = currentScheme.states[key];
  refreshStateButtons();
  document.getElementById("stateTitle").textContent = stateMeta.name;
  document.getElementById("stateSubtitle").textContent = stateData.subtitle;
  document.getElementById("processHeading").textContent = stateData.heading;
  document.getElementById("processText").textContent = stateData.text;
  document.getElementById("processIcon").textContent = stateMeta.icon;
  renderTechnicalNote(stateData.technicalNote);
  const nextState = automaticNextState[key];
  const next = document.getElementById("nextStateNote");
  next.hidden = !nextState || Boolean(options.hold);
  if (nextState) next.textContent = `Jarayon tugagach: ${stateCatalog[nextState].name}`;
  updatePressure(getPressureStart(key));
  renderChargeFlow(key === "ready" ? "charge" : key);
  renderBrakeFlow(key);
  playOriginalAnimation(key);
}

function getPressureTarget(stateKey) {
  const stateData = currentScheme.states[stateKey];
  return {
    reservoir: stateData.reservoirPressure,
    line: stateData.linePressure,
    cylinder: stateData.cylinderPressure
  };
}

function getPressureStart(stateKey) {
  if (stateKey === "charge" || stateKey === "idle") return { reservoir: 0, line: 0, cylinder: 0 };
  if (stateKey === "brake") return getPressureTarget("charge");
  if (stateKey === "release") return getPressureTarget("brake");
  return getPressureTarget(stateKey);
}

function interpolatePressure(start, end, progress) {
  return {
    reservoir: start.reservoir + (end.reservoir - start.reservoir) * progress,
    line: start.line + (end.line - start.line) * progress,
    cylinder: start.cylinder + (end.cylinder - start.cylinder) * progress
  };
}

function getPressureAtProgress(stateKey, progress) {
  const timeline = currentScheme.pressureTimelines?.[stateKey];
  if (timeline?.length) {
    if (progress <= timeline[0].at) return { ...timeline[0] };
    const last = timeline[timeline.length - 1];
    if (progress >= last.at) return { ...last };

    for (let index = 1; index < timeline.length; index += 1) {
      const next = timeline[index];
      if (progress > next.at) continue;
      const previous = timeline[index - 1];
      const segmentProgress = (progress - previous.at) / Math.max(next.at - previous.at, 0.001);
      const eased = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
      return interpolatePressure(previous, next, eased);
    }
  }

  const start = getPressureStart(stateKey);
  const target = getPressureTarget(stateKey);
  const eased = progress * (2 - progress);
  return interpolatePressure(start, target, eased);
}

function updatePressure(values) {
  displayedPressure = values;
  document.getElementById("reservoirPressure").textContent = values.reservoir.toFixed(1);
  document.getElementById("linePressure").textContent = values.line.toFixed(1);
  document.getElementById("cylinderPressure").textContent = values.cylinder.toFixed(1);
  document.getElementById("reservoirMeter").style.width = `${Math.min(values.reservoir / 9 * 100, 100)}%`;
  document.getElementById("lineMeter").style.width = `${Math.min(values.line / 6 * 100, 100)}%`;
  document.getElementById("cylinderMeter").style.width = `${Math.min(values.cylinder / 5 * 100, 100)}%`;
}

function syncPressureToVideo(stateKey, video, request) {
  cancelAnimationFrame(pressureAnimationFrame);

  const draw = () => {
    if (request !== animationRequest || currentState !== stateKey || elementsMode) return;
    const rawProgress = video.duration > 0 ? video.currentTime / video.duration : 0;
    const progress = Math.max(0, Math.min(rawProgress, 1));
    updatePressure(getPressureAtProgress(stateKey, progress));
    updateChargeFlowProgress(progress);
    updateBrakeFlowProgress(progress);
    if (!video.paused && !video.ended) pressureAnimationFrame = requestAnimationFrame(draw);
  };

  draw();
}

function completeStateAnimation(stateKey, request) {
  if (request !== animationRequest || currentState !== stateKey || elementsMode) return;
  const nextState = automaticNextState[stateKey];
  if (!nextState) return;
  stateTransitionTimer = window.setTimeout(() => {
    if (request !== animationRequest || currentState !== stateKey || elementsMode) return;
    selectState(nextState, { automatic: true });
  }, 420);
}

function playOriginalAnimation(stateKey, forceReplay = false) {
  const request = ++animationRequest;
  const image = document.getElementById("schemeImage");
  const video = document.getElementById("schemeAnimation");
  const canvas = document.getElementById("diagramCanvas");
  const label = document.getElementById("animationStateLabel");
  const replay = document.getElementById("replayAnimation");
  const configuredClip = currentScheme.animations[stateKey];
  const inheritedClip = configuredClip?.fromState ? currentScheme.animations[configuredClip.fromState] : null;
  const clip = configuredClip ? { ...inheritedClip, ...configuredClip } : null;

  video.pause();
  video.onloadedmetadata = null;
  video.onended = null;
  video.onerror = null;

  if (!clip) {
    video.hidden = true;
    image.hidden = false;
    label.hidden = true;
    replay.disabled = true;
    canvas.classList.remove("animating");
    updatePressure(getPressureTarget(stateKey));
    return;
  }

  replay.disabled = Boolean(clip.holdLastFrame);
  image.hidden = true;
  video.hidden = false;
  const translatedLabel = currentScheme.animationLabels?.[stateKey]
    || (stateKey === "ready" && currentScheme.animationLabels?.charge
      ? { ...currentScheme.animationLabels.charge, text: "Poyezd holati" }
      : null);
  if (translatedLabel) {
    label.textContent = translatedLabel.text;
    label.style.left = translatedLabel.left;
    label.style.top = translatedLabel.top;
    label.style.width = translatedLabel.width;
    label.hidden = false;
  } else {
    label.hidden = true;
  }

  if (clip.synthetic) {
    video.hidden = true;
    image.hidden = false;
    replay.disabled = Boolean(clip.holdLastFrame);

    if (clip.holdLastFrame && !forceReplay) {
      canvas.classList.remove("animating");
      updatePressure(getPressureTarget(stateKey));
      updateChargeFlowProgress(1);
      updateBrakeFlowProgress(1);
      return;
    }

    canvas.classList.add("animating");
    const startedAt = performance.now();
    const durationMs = Math.max(Number(clip.duration) || 6, 1) * 1000;

    const drawSyntheticFrame = (now) => {
      if (request !== animationRequest || currentState !== stateKey || elementsMode) return;
      const progress = Math.max(0, Math.min((now - startedAt) / durationMs, 1));
      updatePressure(getPressureAtProgress(stateKey, progress));
      updateChargeFlowProgress(progress);
      updateBrakeFlowProgress(progress);
      if (progress < 1) {
        pressureAnimationFrame = requestAnimationFrame(drawSyntheticFrame);
      } else {
        canvas.classList.remove("animating");
        updatePressure(getPressureTarget(stateKey));
        updateChargeFlowProgress(1);
        updateBrakeFlowProgress(1);
        completeStateAnimation(stateKey, request);
      }
    };

    updatePressure(getPressureAtProgress(stateKey, 0));
    updateChargeFlowProgress(0);
    updateBrakeFlowProgress(0);
    pressureAnimationFrame = requestAnimationFrame(drawSyntheticFrame);
    return;
  }

  const loadAndStart = () => {
    if (request !== animationRequest) return;
    if (clip.holdLastFrame && !forceReplay) {
      video.currentTime = Math.max(0, video.duration - 0.08);
      video.pause();
      canvas.classList.remove("animating");
      updatePressure(getPressureTarget(stateKey));
      updateBrakeFlowProgress(1);
      return;
    }
    video.currentTime = 0;
    updatePressure(getPressureAtProgress(stateKey, 0));
    updateChargeFlowProgress(0);
    updateBrakeFlowProgress(0);
    canvas.classList.add("animating");
    video.play()
      .then(() => syncPressureToVideo(stateKey, video, request))
      .catch(() => {
        canvas.classList.remove("animating");
        updatePressure(getPressureTarget(stateKey));
      });
  };

  if (video.dataset.base !== clip.base) {
    video.dataset.base = clip.base;
    video.replaceChildren();
    const webm = document.createElement("source");
    webm.src = `${clip.base}.webm`;
    webm.type = "video/webm";
    const mp4 = document.createElement("source");
    mp4.src = `${clip.base}.mp4`;
    mp4.type = "video/mp4";
    video.append(webm, mp4);
    video.onloadedmetadata = loadAndStart;
    video.load();
  } else if (video.readyState >= 1) {
    loadAndStart();
  } else {
    video.onloadedmetadata = loadAndStart;
  }

  video.onended = () => {
    if (request === animationRequest) {
      canvas.classList.remove("animating");
      updatePressure(getPressureTarget(stateKey));
      updateChargeFlowProgress(1);
      updateBrakeFlowProgress(1);
      completeStateAnimation(stateKey, request);
    }
  };
  video.onerror = () => {
    if (request !== animationRequest) return;
    video.hidden = true;
    image.hidden = false;
    label.hidden = true;
    canvas.classList.remove("animating");
    updatePressure(getPressureTarget(stateKey));
  };
}

function replayCurrentAnimation() {
  if (currentState === "idle" || elementsMode) return;
  updatePressure(getPressureStart(currentState));
  playOriginalAnimation(currentState, true);
}

function renderChargeFlow(stateKey) {
  const overlay = document.getElementById("chargeFlowOverlay");
  overlay.replaceChildren();
  const visible = stateKey === "charge" && Array.isArray(currentScheme.chargePaths) && currentScheme.chargePaths.length > 0;
  overlay.classList.toggle("visible", visible);
  if (!visible) return;

  (currentScheme.chargeFills || []).forEach((fill) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(fill.x));
    rect.setAttribute("y", String(fill.y));
    rect.setAttribute("width", "0");
    rect.setAttribute("height", String(fill.height));
    rect.setAttribute("rx", String(fill.radius || 0));
    rect.setAttribute("class", "charge-reservoir-fill");
    rect.dataset.start = String(fill.start ?? 0);
    rect.dataset.end = String(fill.end ?? 1);
    rect.dataset.fullWidth = String(fill.width);
    overlay.appendChild(rect);
  });

  currentScheme.chargePaths.forEach((segment, index) => {
    const pathData = typeof segment === "string" ? segment : segment.path;
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "charge-segment");
    group.dataset.start = String(typeof segment === "string" ? 0 : segment.start ?? 0);
    group.dataset.end = String(typeof segment === "string" ? 1 : segment.end ?? 1);

    const pipeFill = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pipeFill.setAttribute("d", pathData);
    pipeFill.setAttribute("class", "charged-pipe");

    const particles = document.createElementNS("http://www.w3.org/2000/svg", "path");
    particles.setAttribute("d", pathData);
    particles.setAttribute("class", "air-particles");
    particles.style.animationDelay = `${index * -0.18}s`;
    group.append(pipeFill, particles);
    overlay.appendChild(group);

    const pathLength = Math.max(pipeFill.getTotalLength(), 1);
    group.dataset.length = String(pathLength);
    pipeFill.style.strokeDasharray = String(pathLength);
    pipeFill.style.strokeDashoffset = String(pathLength);
    particles.style.opacity = "0";
  });

  updateChargeFlowProgress(0);
}

function updateChargeFlowProgress(progress) {
  document.querySelectorAll(".charge-reservoir-fill").forEach((fill) => {
    const start = Number(fill.dataset.start);
    const end = Number(fill.dataset.end);
    const fullWidth = Number(fill.dataset.fullWidth);
    const localProgress = Math.max(0, Math.min((progress - start) / Math.max(end - start, 0.001), 1));
    fill.setAttribute("width", String(fullWidth * localProgress));
    fill.style.opacity = String(Math.min(localProgress * 1.4, 0.82));
  });

  document.querySelectorAll(".charge-segment").forEach((group) => {
    const start = Number(group.dataset.start);
    const end = Number(group.dataset.end);
    const length = Number(group.dataset.length);
    const localProgress = Math.max(0, Math.min((progress - start) / Math.max(end - start, 0.001), 1));
    const pipe = group.querySelector(".charged-pipe");
    const particles = group.querySelector(".air-particles");
    group.style.opacity = localProgress > 0 ? "1" : "0";
    pipe.style.strokeDashoffset = String(length * (1 - localProgress));
    const particleProgress = Math.max(0, Math.min((localProgress - 0.16) / 0.22, 1));
    particles.style.opacity = String(particleProgress);
  });
}

function renderBrakeFlow(stateKey) {
  const overlay = document.getElementById("brakeFlowOverlay");
  overlay.replaceChildren();
  overlay.classList.remove("mode-brake", "mode-lap");

  const isBrakeState = stateKey === "brake" || stateKey === "lap";
  const paths = currentScheme.brakePaths || [];
  const visible = isBrakeState && paths.length > 0;
  overlay.classList.toggle("visible", visible);
  if (!visible) return;

  const holdPressure = stateKey === "lap";
  overlay.classList.add(holdPressure ? "mode-lap" : "mode-brake");

  (currentScheme.brakeFills || []).forEach((fill) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(fill.x));
    rect.setAttribute("y", String(fill.y));
    rect.setAttribute("width", "0");
    rect.setAttribute("height", String(fill.height));
    rect.setAttribute("rx", String(fill.radius || 0));
    rect.setAttribute("class", "brake-cylinder-fill");
    rect.dataset.start = String(fill.start ?? 0);
    rect.dataset.end = String(fill.end ?? 1);
    rect.dataset.fullWidth = String(fill.width);
    overlay.appendChild(rect);
  });

  paths.forEach((segment, index) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "brake-segment");
    group.dataset.start = String(segment.start ?? 0);
    group.dataset.end = String(segment.end ?? 1);

    const pressurePipe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pressurePipe.setAttribute("d", segment.path);
    pressurePipe.setAttribute("class", "brake-pressure-pipe");

    const particles = document.createElementNS("http://www.w3.org/2000/svg", "path");
    particles.setAttribute("d", segment.path);
    particles.setAttribute("class", "brake-air-particles");
    particles.style.animationDelay = `${index * -0.19}s`;
    group.append(pressurePipe, particles);
    overlay.appendChild(group);

    const pathLength = Math.max(pressurePipe.getTotalLength(), 1);
    group.dataset.length = String(pathLength);
    pressurePipe.style.strokeDasharray = String(pathLength);
    pressurePipe.style.strokeDashoffset = String(pathLength);
    particles.style.opacity = "0";
  });

  updateBrakeFlowProgress(holdPressure ? 1 : 0);
}

function updateBrakeFlowProgress(progress) {
  const overlay = document.getElementById("brakeFlowOverlay");
  if (!overlay?.classList.contains("visible")) return;
  const holdPressure = overlay.classList.contains("mode-lap");

  overlay.querySelectorAll(".brake-cylinder-fill").forEach((fill) => {
    const start = Number(fill.dataset.start);
    const end = Number(fill.dataset.end);
    const fullWidth = Number(fill.dataset.fullWidth);
    const localProgress = holdPressure ? 1 : Math.max(0, Math.min((progress - start) / Math.max(end - start, 0.001), 1));
    fill.setAttribute("width", String(fullWidth * localProgress));
    fill.style.opacity = String(Math.min(localProgress * 1.25, 0.78));
  });

  overlay.querySelectorAll(".brake-segment").forEach((group) => {
    const start = Number(group.dataset.start);
    const end = Number(group.dataset.end);
    const length = Number(group.dataset.length);
    const localProgress = holdPressure ? 1 : Math.max(0, Math.min((progress - start) / Math.max(end - start, 0.001), 1));
    const pipe = group.querySelector(".brake-pressure-pipe");
    const particles = group.querySelector(".brake-air-particles");
    group.style.opacity = localProgress > 0 ? "1" : "0";
    pipe.style.strokeDashoffset = String(length * (1 - localProgress));
    const particleProgress = Math.max(0, Math.min((localProgress - 0.12) / 0.20, 1));
    particles.style.opacity = holdPressure ? "0" : String(particleProgress);
  });
}

function renderComponents() {
  const lines = document.getElementById("elementLines");
  const layer = document.getElementById("elementLabelLayer");
  lines.replaceChildren();
  layer.replaceChildren();
  resetComponentDetail();

  currentScheme.components.forEach(([key, x, y, labelX, labelY]) => {
    const component = componentCatalog[key];
    const anchorX = x * 10;
    const anchorY = y * 10;
    const endX = labelX * 10;
    const endY = labelY * 10;
    const elbowX = anchorX + (endX - anchorX) * 0.58;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("d", `M ${anchorX} ${anchorY} L ${elbowX} ${anchorY} L ${endX} ${endY}`);
    line.setAttribute("class", "element-leader");
    line.dataset.component = key;

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", String(anchorX));
    dot.setAttribute("cy", String(anchorY));
    dot.setAttribute("r", "5");
    dot.setAttribute("class", "element-anchor");
    dot.dataset.component = key;
    lines.append(line, dot);

    const label = document.createElement("button");
    label.type = "button";
    label.className = "element-label";
    label.dataset.component = key;
    label.style.left = `${labelX}%`;
    label.style.top = `${labelY}%`;
    label.innerHTML = `<span>${component.short}</span><strong>${component.name}</strong>`;
    label.addEventListener("click", () => selectComponent(key));

    const hotspot = document.createElement("button");
    hotspot.type = "button";
    hotspot.className = "element-hotspot";
    hotspot.dataset.component = key;
    hotspot.style.left = `${x}%`;
    hotspot.style.top = `${y}%`;
    hotspot.setAttribute("aria-label", `${component.name} haqida izohni ochish`);
    hotspot.title = component.name;
    hotspot.addEventListener("click", () => selectComponent(key));

    layer.append(hotspot, label);
  });
}

function renderAnnotations() {
  const layer = document.getElementById("diagramAnnotationLayer");
  layer.replaceChildren();
  (currentScheme.annotations || []).forEach((annotation) => {
    const item = document.createElement("span");
    item.className = `diagram-annotation ${annotation.kind || "note"}`;
    item.style.left = `${annotation.left}%`;
    item.style.top = `${annotation.top}%`;
    item.textContent = annotation.text;
    layer.appendChild(item);
  });
}

function selectComponent(key) {
  const component = componentCatalog[key];
  document.querySelectorAll("[data-component]").forEach((element) => {
    element.classList.toggle("active", element.dataset.component === key);
  });
  const detail = document.getElementById("componentDetail");
  detail.hidden = false;
  detail.innerHTML = `
    <div class="component-detail-icon" aria-hidden="true">${component.short}</div>
    <div class="component-detail-copy">
      <span>TANLANGAN QURILMA</span>
      <strong>${component.name}</strong>
      <p>${component.description}</p>
    </div>
  `;
  document.getElementById("diagramInspector").classList.add("has-component");
}

function resetComponentDetail() {
  const detail = document.getElementById("componentDetail");
  detail.hidden = true;
  detail.replaceChildren();
  document.getElementById("diagramInspector")?.classList.remove("has-component");
}

function setElementsMode(active) {
  elementsMode = active;
  const canvas = document.getElementById("diagramCanvas");
  const toggle = document.getElementById("elementsToggle");
  const video = document.getElementById("schemeAnimation");
  const image = document.getElementById("schemeImage");
  const label = document.getElementById("animationStateLabel");
  const workspace = document.getElementById("diagramWorkspace");

  toggle.classList.toggle("active", active);
  toggle.setAttribute("aria-pressed", String(active));
  canvas.classList.toggle("show-elements", active);
  workspace.classList.toggle("elements-mode", active);
  if (!active) {
    resetComponentDetail();
    refreshStateButtons();
    return;
  }

  window.clearTimeout(stateTransitionTimer);
  animationRequest += 1;
  cancelAnimationFrame(pressureAnimationFrame);
  video.pause();
  video.hidden = true;
  image.hidden = false;
  label.hidden = true;
  canvas.classList.remove("animating");
  refreshStateButtons();
  document.getElementById("stateTitle").textContent = "Asosiy elementlar";
  document.getElementById("stateSubtitle").textContent = "Qurilmaning o‘zini yoki uning nomini bosing";
  document.getElementById("processIcon").textContent = "⌖";
  document.getElementById("processHeading").textContent = "Asosiy elementlarni o‘rganish";
  document.getElementById("processText").textContent = "Sxemadagi belgilangan qurilmaning ustiga yoki uning nomiga bosing. Qurilmaning vazifasi shu o‘ng panelda ko‘rsatiladi.";
  renderTechnicalNote("");
  document.getElementById("nextStateNote").hidden = true;
  resetComponentDetail();
}

function toggleElementsMode() {
  if (elementsMode) {
    setElementsMode(false);
    selectState(currentState);
  } else {
    setElementsMode(true);
  }
}

function fitDiagramCanvas() {
  const stage = document.getElementById("diagramStage");
  const canvas = document.getElementById("diagramCanvas");
  if (!stage || !canvas || !views.scheme.classList.contains("active")) return;
  const availableWidth = stage.clientWidth;
  const availableHeight = stage.clientHeight;
  const ratio = 1100 / 676;
  let width = availableWidth;
  let height = width / ratio;
  if (height > availableHeight) {
    const requestedZoom = Number(currentScheme?.canvasZoom) || 1.08;
    const safeZoom = Math.min(requestedZoom, availableWidth / Math.max(availableHeight * ratio, 1));
    height = availableHeight * safeZoom;
    width = height * ratio;
  }
  canvas.style.width = `${Math.max(1, Math.floor(width))}px`;
  canvas.style.height = `${Math.max(1, Math.floor(height))}px`;
}

function startQuiz() {
  currentQuestion = 0;
  currentScore = 0;
  document.getElementById("quizIntro").hidden = true;
  document.getElementById("quizResult").hidden = true;
  document.getElementById("quizContent").hidden = false;
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const item = quizQuestions[currentQuestion];
  document.getElementById("questionCounter").textContent = `${currentQuestion + 1} / ${quizQuestions.length}`;
  document.getElementById("quizProgressBar").style.width = `${(currentQuestion + 1) / quizQuestions.length * 100}%`;
  document.getElementById("quizScore").textContent = `${currentScore} ball`;
  document.getElementById("questionTopic").textContent = item.topic.toUpperCase();
  document.getElementById("questionText").textContent = item.question;
  document.getElementById("answerExplanation").hidden = true;
  document.getElementById("nextQuestion").hidden = true;

  const list = document.getElementById("answerList");
  list.replaceChildren();
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><strong>${answer}</strong>`;
    button.addEventListener("click", () => answerQuestion(index));
    list.appendChild(button);
  });
}

function answerQuestion(index) {
  if (answered) return;
  answered = true;
  const item = quizQuestions[currentQuestion];
  if (index === item.correct) currentScore += 1;
  document.getElementById("quizScore").textContent = `${currentScore} ball`;
  document.querySelectorAll(".answer-button").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === item.correct) button.classList.add("correct");
    if (buttonIndex === index && index !== item.correct) button.classList.add("wrong");
  });
  const explanation = document.getElementById("answerExplanation");
  explanation.textContent = item.explanation;
  explanation.hidden = false;
  const next = document.getElementById("nextQuestion");
  next.textContent = currentQuestion + 1 === quizQuestions.length ? "Natijani ko‘rish →" : "Keyingi savol →";
  next.hidden = false;
}

function nextQuestion() {
  if (!answered) return;
  currentQuestion += 1;
  if (currentQuestion >= quizQuestions.length) {
    showQuizResult();
    return;
  }
  renderQuestion();
}

function showQuizResult() {
  document.getElementById("quizContent").hidden = true;
  document.getElementById("quizResult").hidden = false;
  const percent = Math.round(currentScore / quizQuestions.length * 100);
  document.getElementById("resultPercent").textContent = `${percent}%`;
  let title = "Mavzuni qayta ko‘rib chiqing";
  if (percent >= 90) title = "A’lo natija!";
  else if (percent >= 75) title = "Yaxshi natija";
  else if (percent >= 60) title = "Qoniqarli natija";
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultText").textContent = `${quizQuestions.length} savoldan ${currentScore} tasiga to‘g‘ri javob berdingiz.`;
  try {
    const best = Number(localStorage.getItem("tormozQuizBest") || 0);
    if (percent > best) localStorage.setItem("tormozQuizBest", String(percent));
  } catch (_) {
    // The training app remains fully functional when storage is unavailable.
  }
}

function openQuiz() {
  showView("quiz");
  document.getElementById("quizIntro").hidden = false;
  document.getElementById("quizContent").hidden = true;
  document.getElementById("quizResult").hidden = true;
}

function setAboutModal(open) {
  const modal = document.getElementById("aboutModal");
  if (open) {
    aboutReturnFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    window.setTimeout(() => document.getElementById("aboutClose").focus(), 0);
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  const returnTarget = aboutReturnFocus;
  aboutReturnFocus = null;
  if (returnTarget && typeof returnTarget.focus === "function") returnTarget.focus();
}

async function windowAction(action) {
  if (window.desktopAPI?.windowAction) {
    await window.desktopAPI.windowAction(action);
    return;
  }
  if (action === "toggle-fullscreen") {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
    return;
  }
  if (action === "quit") {
    showView("home");
  }
}

function bindEvents() {
  const goHome = () => showView("home");
  document.getElementById("brandHome").addEventListener("click", goHome);
  document.getElementById("homeButton").addEventListener("click", goHome);
  document.getElementById("schemeBack").addEventListener("click", goHome);
  document.getElementById("aboutButton").addEventListener("click", () => setAboutModal(true));
  document.getElementById("aboutClose").addEventListener("click", () => setAboutModal(false));
  document.getElementById("aboutBackdrop").addEventListener("click", () => setAboutModal(false));
  document.getElementById("quizButton").addEventListener("click", openQuiz);
  document.getElementById("startQuiz").addEventListener("click", startQuiz);
  document.getElementById("retryQuiz").addEventListener("click", startQuiz);
  document.getElementById("resultHome").addEventListener("click", goHome);
  document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
  document.getElementById("fullscreenButton").addEventListener("click", () => windowAction("toggle-fullscreen"));
  document.getElementById("quitButton").addEventListener("click", () => windowAction("quit"));
  document.getElementById("replayAnimation").addEventListener("click", replayCurrentAnimation);
  document.getElementById("elementsToggle").addEventListener("click", toggleElementsMode);
  window.addEventListener("resize", fitDiagramCanvas);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("aboutModal").hidden) {
      event.preventDefault();
      setAboutModal(false);
      return;
    }
    if (event.key === "F11") {
      event.preventDefault();
      windowAction("toggle-fullscreen");
    } else if (event.key === "Escape" && !document.fullscreenElement) {
      goHome();
    }
  });
}

createSchemeCards();
bindEvents();
showView("home");
if (typeof ResizeObserver !== "undefined") {
  new ResizeObserver(fitDiagramCanvas).observe(document.getElementById("diagramStage"));
}
window.setTimeout(() => document.getElementById("splash").classList.add("hidden"), 850);
