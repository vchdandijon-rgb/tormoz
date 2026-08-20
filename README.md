# Tormoz sinovi — o‘zbekcha interaktiv dastur

Windows 10/11 uchun vagon tormoz tizimlarini o‘rganishga mo‘ljallangan zamonaviy, internet talab qilmaydigan o‘quv-sinov dasturi.

## Dastur tarkibi

- 4 ta tormoz tizimi sxemasi;
- eski dasturdan vektor ko‘rinishda tiklangan original chizmalar;
- zaryadlash, tormozlash, perekrisha va bo‘shatish holatlari;
- eski EXE ichidan tiklangan original 12 kadr/soniyali animatsiyalar;
- siqilgan havoning aynan quvur ichidan yurishi;
- tormoz silindri shtogi, richag va kolodkaning harakatlanishi;
- tormoz bo‘shatilganda kolodka va richagning boshlang‘ich holatga qaytishi;
- zaryadlashda quvur ichidan uzluksiz yuradigan havo zarralari;
- bosh rezervuar, magistral va tormoz silindrining animatsiyaga bog‘langan jonli bosim ko‘rsatkichlari;
- yuqorida joylashgan zaryadlash, tormozlash, perekrisha va bo‘shatish tugmalari;
- “Asosiy elementlar” rejimida har bir qurilmaga chiziq bilan ulangan o‘zbekcha nomlar;
- qurilma nomini bosganda ochiladigan o‘zbekcha texnik izoh;
- skrollsiz, ekran o‘lchamiga avtomatik moslashadigan katta sxema oynasi;
- 12 savoldan iborat mini-test;
- to‘liq ekran rejimi;
- internetga ulanmasdan ishlash.

## Windows’da tekshirish

1. Kompyuterga **Node.js LTS** o‘rnating.
2. Loyiha papkasidagi `START.bat` faylini ikki marta bosing.
3. Birinchi ishga tushishda kerakli paketlar avtomatik yuklanadi.

Qo‘lda ishga tushirish:

```bat
npm install
npm start
```

## Tayyor EXE yaratish

Eng oson usul: `BUILD_EXE.bat` faylini ikki marta bosing.

Yoki terminalda:

```bat
npm install
npm run dist:win
```

Tayyor fayllar `release` papkasida paydo bo‘ladi:

- o‘rnatuvchi `Tormoz-sinovi-Setup-1.4.1-x64.exe`;
- o‘rnatmasdan ishlaydigan `Tormoz-sinovi-Portable-1.4.1-x64.exe`.

`npm warn deprecated` xabarlari eski yordamchi paketlar haqidagi ogohlantirishdir va EXE yig‘ilishini to‘xtatmaydi. `npm audit fix --force` bu loyiha uchun tavsiya etilmaydi, chunki u Electron bilan mos kelmaydigan asosiy versiyalarni majburan o‘rnatishi mumkin.

## GitHub orqali avtomatik EXE olish

Loyihani GitHub’ga to‘liq yuklang. `Actions` bo‘limida **Windows EXE yaratish** jarayoni avtomatik boshlanadi. Jarayon tugagach, `Artifacts` ichidan **Tormoz-sinovi-Windows** faylini yuklab oling.

## Tuzilma

```text
electron/      Windows oynasi va xavfsiz tizim buyruqlari
src/           interfeys, sxemalar, animatsiya va test
.github/       GitHub Actions orqali EXE yig‘ish
BUILD_EXE.bat  bir bosishda Windows EXE yaratish
START.bat      dasturni sinov rejimida ishga tushirish
```

## 1.4.1 versiyadagi Windows EXE tuzatishi

- electron-builder tanimaydigan `${target}` makrosi konfiguratsiyadan olib tashlandi.
- NSIS o‘rnatuvchi va o‘rnatmasdan ishlaydigan Portable EXE uchun alohida, to‘qnashmaydigan fayl nomlari belgilandi.
- `BUILD_EXE.bat` eski `release` papkasini xavfsiz tozalab, yig‘ilgan EXE fayllar nomini ekranga chiqaradigan qilindi.

## 1.4 yakuniy versiyadagi “Dastur haqida” bo‘limi

- Yuqori boshqaruv paneliga `Dastur haqida` tugmasi qo‘shildi.
- Tugma orqali ochiladigan oynada dastur vazifasi, to‘rtta interaktiv sxema, beshta ish holati, havo oqimi, bosim ko‘rsatkichlari, asosiy qurilmalar izohi va test bo‘limi haqida qisqa ma’lumot berildi.
- Muallif ma’lumoti `Andijon vagon deposi ishlab chiqarish-texnik bo‘limi boshlig‘i G‘aniyev Farruxbek` shaklida joylashtirildi.
- Ma’lumot oynasi kompyuter va telefon ekranlariga moslashtirildi; `Escape`, yopish tugmasi yoki qoraytirilgan tashqi maydon orqali yopiladi.

## 1.3 yakuniy versiyadagi tormoz silindri oqimi

- 2-sxemada `Tormozlash` vaqtida zaxira rezervuaridan havo taqsimlagich orqali tormoz silindriga borayotgan siqilgan havo qizil harakatlanuvchi oqim bilan ko‘rsatiladi.
- Havo tormoz silindriga yetib borganda silindr kamerasi bosqichma-bosqich rang bilan to‘ladi va yuqoridagi bosim ko‘rsatkichi bilan sinxron ishlaydi.
- Avtomatik `Perekrisha` holatiga o‘tilganda tormoz silindridagi bosim yo‘li sariq rangda saqlanib, havo oqimi to‘xtaganini va bosim ushlab turilganini ko‘rsatadi.

## 1.2 yakuniy versiyadagi qo‘shimcha tuzatishlar

- O‘ng texnik izoh panelidagi sarlavha, jarayon matni va qurilma tavsifi o‘quv xonasida uzoqroq masofadan o‘qishga qulay qilib kattalashtirildi.
- Sxemalar kesilmasdan kattaroq ko‘rinishi uchun har bir chizmaning bo‘sh pastki maydoniga mos alohida masshtab belgilandi.
- 2-sxemaning zaryadlashida havo kompressordan bosh rezervuar, mashinist krani, tormoz magistrali, havo taqsimlagich va zaxira rezervuarigacha quvur ichida bosqichma-bosqich harakatlanadi.
- Elektropnevmatik tormozning `Tormozlash` va `Bo‘shatish` holatlariga eski dasturdagi texnik izohlarning aniq o‘zbekcha mazmuni yirik, ajratilgan kartochka ko‘rinishida qo‘shildi.
- 2-sxema nomi kelishilgan termin bo‘yicha `To‘g‘ridan-to‘g‘ri ta’sir qilmaydigan avtomatik tormoz` shakliga keltirildi.

## 1.1 yakuniy versiyadagi texnik audit va tuzatishlar

- Sxema nomlari yakuniy texnik terminologiyaga keltirildi: 1- va 3-sxemalar `To‘g‘ridan-to‘g‘ri ta’sir qiluvchi`, 2-sxema `To‘g‘ridan-to‘g‘ri ta’sir qilmaydigan avtomatik tormoz` deb nomlandi.
- Tormoz holatlari texnik jihatdan to‘g‘ri ketma-ketlikka keltirildi: `Zaryadlash → Poyezd holati`, `Tormozlash → Perekrisha`, `Bo‘shatish → Poyezd holati`.
- `Perekrisha` zaryad tugaganini bildiruvchi holat sifatida emas, tormozlashda hosil qilingan silindr bosimini o‘zgartirmay ushlab turuvchi holat sifatida ishlaydi.
- Tormozlash bosqichi bajarilmaguncha `Perekrisha` bloklanadi va uning vazifasi o‘ng texnik izoh panelida tushuntiriladi.
- Sxema oynasi chap tomonga tekislanib kattalashtirildi; o‘ng tomonda jarayon va qurilma vazifalari uchun doimiy texnik izoh paneli joylashtirildi.
- “Asosiy elementlar” rejimida qurilmaning nomini ham, sxemadagi qurilmaning o‘zini ham bosish mumkin; izoh sxema ustini yopmasdan o‘ng panelda ochiladi.

- To‘rtta sxemaning barcha original animatsiyalari kadrma-kadr qayta tekshirildi.
- 1-sxemada zaryadlash yo‘li texnik jihatdan to‘g‘rilanib, havo tormoz silindrlariga noto‘g‘ri kirib borishi bartaraf etildi.
- 3- va 4-sxemalarda original bosqichli havo tarqalishi saqlandi; 2-sxemada original videoda yetishmagan quvur ichidagi oqim alohida sinxron qatlam orqali tiklandi.
- Bosim ko‘rsatkichlari zaryadlash bosqichlariga mos vaqt nuqtalari bo‘yicha sinxronlashtirildi.
- “Asosiy elementlar” chiziqlarining barcha tayanch nuqtalari haqiqiy qurilma markazlariga qayta o‘lchab joylashtirildi.
- 2-sxemadagi ruscha zaryadlash yozuvi o‘zbekcha yozuv bilan yopildi.
- Bosh menyu va simulator 1365×768 hamda boshqa odatiy ekranlarda pastga skroll qilinmaydigan qilib moslashtirildi.
- Original Flash animatsiyalaridagi shtok, richag, kolodkaning siqilishi va bo‘shatishda qaytishi o‘zgartirilmagan.
- Eski dasturdagi bosh rezervuar bosimi qayta tekshirilib, barcha sxemalarda `P = 9 kgk/sm²` qiymatiga keltirildi; tormoz magistrali ish bosimi `5 kgk/sm²` bo‘lib qoldi.
- Sxemalarga `Lokomotiv`, `Vagon`, `Atm.` va rezervuar bosimi yozuvlari qaytarildi.
- 3-sxemaning zaryadlashida chizma kadr o‘rtasida boshqa ko‘rinishga almashib ketishi bartaraf etildi: asosiy sxema o‘zgarmaydi, faqat havo quvur bo‘ylab bosqichma-bosqich yuradi.
- 2-sxemadagi zaxira rezervuarning eski dasturda ko‘rsatilgan `P = 4,6 kgk/sm²` ish qiymati sxemaga kiritildi.
- Eski dastur bilan solishtirishda 2- va 3-sxemalarning vektor tasvirlari hamda animatsiyalari o‘zaro almashgani aniqlandi va asl tartibga qaytarildi: 2-sxema — to‘g‘ridan-to‘g‘ri ta’sir qilmaydigan avtomatik, 3-sxema — to‘g‘ridan-to‘g‘ri ta’sir qiluvchi avtomatik tormoz.
- Murakkab punktirli 3-sxemada noto‘g‘ri bog‘langan tormozlash va bo‘shatish animatsiyalari almashtirildi: tormozlashda kolodka g‘ildirakka yopishadi, bo‘shatishda uzoqlashadi.
- Perekrisha holati tormozlashning yakuniy, kolodka g‘ildirakka yopishgan kadrida ushlab turiladi.
- 3-sxemadagi zaxira rezervuar bosimi eski dasturga muvofiq `P = 6,5 kgk/sm²` qilib ko‘rsatildi.

## Keyingi versiya uchun reja

- depo logotipi va rasmiy nomini joylashtirish;
- test natijalarini PDF hisobotga chiqarish;
- lotin, kirill va rus tillari;
- mas’ul xodim nomi va aloqa ma’lumotlari.
