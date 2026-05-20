import fs from 'fs';
import axios from 'axios';

/* =========================================================
   SOURCE FEED
========================================================= */

const SOURCE_URL =
  'https://palmy.com.ua/marketplace-integration/google-feed?langId=3';


/* ================================
     1. МАПА ДЛЯ ОДНОРАЗОК
  ================================= */

  const labelMap = {
    "1500 Ultra": "1500",
    "1500": "1500",
    "2000": "2000",
    "BC10000 Touch": "BC10000",
    "BC10000": "BC10000",
    "BC15000": "BC15000",
    "BC18000": "BC18000",
    "BC20000 Touch": "BC20000",
    "BC20000": "BC20000",
    "BC5000 Ultra": "BC5000",
    "BC5000": "BC5000",
    "COMBO 25000": "COMBO 25000",
    "COMBO Pro 30000": "COMBO 30000",
    "CR8000": "CR8000",
    "EP8000": "EP8000",
    "FS18000": "FS18000",
    "GH 33000": "GH33000",
    "GH23000": "GH23000",
    "Ice King 30000": "Ice King 30000",
    "LUX 1500": "1500",
    "LUX 2000": "2000",
    "Moon Night 40000": "Moon Night 40000",
    "Trio 40000": "Trio 40000",
    "King Pro 40000": "lush king pro 40000",
    "Ельф у Барі BC45000": "BC45000",
    "Nic King 30000": "Ice King 30000",
    "Pi7000": "Pi7000",
    "Pi9000": "Pi9000",
    "Planet 25000": "Planet 25000",
    "Планета 25000": "Planet 25000",
    "RabBeats RC10000": "RC10000",
    "D1 13000": "RAYA D1 13000",
    "D2 20000": "RAYA D2 20000",
    "D3 25000": "Raya D3 25000",
    "RI3000": "RI3000",
    "Sour King 30000": "Ice King 30000",
    "Sweet King 30000": "Ice King 30000",
    "TE6000": "TE6000",
    "ВС4000": "ВС4000",
    "Flonq Ultra 20000": "Flonq Ultra 20000",
    "Флонг Ультра 20000": "Flonq Ultra 20000",
    "Flonq Max 12000": "Flonq Max 12000",
    "Флонг Макс 12000": "Flonq Max 12000",
    "GORD 4000": "GORD 4000",
    "Hello Synix 30000": "Hello Synix 30000",
    "InstaBar WT20000": "InstaBar WT20000",
    "Katana 20000": "Katana 20000",
    "Lavie Milk 7000": "Lavie Milk 7000",
    "MO10000": "Lost Mary",
    "OS12000": "Lost Mary",
    "TURBO-X 25000": "Rif Bar",
    "Vozol 10000": "Vozol 10000",
    "Vozol 12000": "Vozol 12000",
    "Vozol Rave 40000": "Vozol Rave 40000",
    "Vozol Star 20000": "Vozol Star 20000",
    "Vozol Vista 20000": "Vozol Vista 20000",
    "Возол 10000": "Vozol 10000",
    "Возол 12000": "Vozol 12000",
    "Возол Rave 40000": "Vozol Rave 40000",
    "Возол Star 20000": "Vozol Star 20000",
    "Возол Vista 20000": "Vozol Vista 20000"
  };

  /* ================================
     2. МАПА МОДЕЛЕЙ POD
  ================================= */

  const deviceModelBrandMap = {
    "Ельф Elfa 850": "Elf Bar",
    "Ельф ELFX Silver": "Elf Bar",
    "Ельф Mate 500": "Elf Bar",
    "Ельф RF350": "Elf Bar",
    "Geek AQ 1000": "GeekVape",
    "Geek Digiflavor Digi-U 1000": "GeekVape",
    "Geek Obelisk U 800": "GeekVape",
    "Jtech Evio Box 1000": "Joyetech",
    "LV Ursa Nano 800": "Lost Vape",
    "ОХВА XLIM Classic 1000": "OXVA",
    "ОХВА XLIM GO 1000": "OXVA",
    "Nord 4 2000": "Smok",
    "Novo 5 900": "Smok",
    "VP XROS 3 1000": "Vaporesso",
    "Argus G2 1000": "Voopoo",
    "VMATE PRO 900": "Voopoo"
  };

  /* ================================
     3. FALLBACK БРЕНДИ
  ================================= */

  const deviceBrandTriggers = {
    "ОХВА": "OXVA",
    "OXVA": "OXVA",
    "Ельф": "Elf Bar",
    "Elf": "Elf Bar",
    "Geek": "GeekVape",
    "Jtech": "Joyetech",
    "LV": "Lost Vape",
    "Nord": "Smok",
    "Novo": "Smok",
    "SOLUS": "Smok",
    "VP": "Vaporesso",
    "XROS": "Vaporesso",
    "ХRОS": "Vaporesso",
    "Argus": "Voopoo",
    "VMATE": "Voopoo"
  };

  /* ================================
     4. МАПА ТЮТЮНУ
  ================================= */

  const tobaccoBrandMap = {
    "420": "заправка 420",
    "Absolem": "заправка Absolem",
    "Adalya": "заправка Adalya",
    "Afzal": "заправка Afzal",
    "Al Fakher": "заправка Al Fakher",
    "Al Shaha": "заправка Al Shaha",
    "Arawak": "заправка Arawak",
    "Art X": "заправка Art X",
    "Azure": "заправка Azure",
    "Bagator": "заправка Bagator",
    "Balli": "заправка Balli",
    "Banshee": "заправка Banshee",
    "Black&White": "заправка Black White",
    "BlackSmok": "заправка BlackSmok",
    "Blast Smoke": "заправка Blast Smoke",
    "Buta": "заправка Buta",
    "Chefs": "заправка Chefs",
    "Creepy": "заправка Creepy",
    "CULTt": "заправка CULTt",
    "Custom": "заправка Custom",
    "DAIM": "заправка DAIM",
    "Dead Horse": "заправка Dead Horse",
    "Duman": "заправка Duman",
    "Enigma": "заправка Enigma",
    "Flow": "заправка Flow",
    "Fumari": "заправка Fumari",
    "Fusion": "заправка Fusion",
    "Gedonist": "заправка Gedonist",
    "Glitch": "заправка Glitch",
    "Heven": "заправка Heven",
    "Hookanuti": "заправка Hookanuti",
    "Indigo Smoke": "заправка Indigo Smoke",
    "Jibiar": "заправка Jibiar",
    "Lagom": "заправка Lagom",
    "Loud": "заправка Loud",
    "Milano": "заправка Milano",
    "Mint": "заправка Mint",
    "Molfar": "заправка Molfar",
    "Orwell": "заправка Orwell",
    "Pixtea": "заправка Pixtea",
    "Serbetli": "заправка Serbetli",
    "Shogun": "заправка Shogun",
    "Single": "заправка Single",
    "Smoke Angels": "заправка Smoke Angels",
    "Space Tea": "заправка Space Tea",
    "Spirit": "заправка Spirit",
    "Swipe": "заправка Swipe",
    "Tangiers": "заправка Tangiers",
    "Turbo": "заправка Turbo",
    "Unity": "заправка Unity",
    "WhiteSmok": "заправка WhiteSmok",
    "Yolo": "заправка Yolo",
    "Yummy": "заправка Yummy",
    "СамСварил": "заправка СамСварил"
};

/* =========================================================
   HELPERS
========================================================= */

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function safeCDATA(text) {
  return String(text || '')
    .replace(/]]>/g, ']]]]><![CDATA[>');
}

function decodeHtmlEntities(str) {

  return String(str || '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function cleanText(text) {

  return String(text || '')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveByMap(text, map) {

  if (!text) return '';

  const entries = Object.entries(map)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [key, value] of entries) {

    const regex = new RegExp(
      `(^|[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9])${escapeRegExp(key)}([^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9]|$)`,
      'i'
    );

    if (regex.test(text)) {
      return value;
    }
  }

  return '';
}

function resolveDeviceBrand(title, brandSrc) {

  let brand = resolveByMap(title, deviceModelBrandMap);

  if (brand) return brand;

  brand = resolveByMap(title, deviceBrandTriggers);

  if (brand) return brand;

  if (brandSrc && brandSrc.trim() !== '') {
    return brandSrc.trim();
  }

  return '';
}

function getTag(content, tag) {

  const regex = new RegExp(
    `<g:${tag}>([\\s\\S]*?)<\\/g:${tag}>`,
    'i'
  );

  const match = content.match(regex);

  return match
    ? cleanText(match[1])
    : '';
}

function normalizeProductType(type) {

  return String(type || '')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/* =========================================================
   LABEL 1
========================================================= */

function getLabel1(productType, price) {

  const type = normalizeProductType(productType);

  // =========================
  // Одноразки

  if (
    type === 'Одноразові Гаджети' ||
    type === 'Гаджети'
  ) {

    return price > 730
      ? 'ТОП'
      : 'Дешеві';
  }

  // =========================
  // Картриджі

  if (
    type === 'Багаторазові пристрої > Картриджи' ||
    type === 'Змінні картриджи для ароматизатори'
  ) {

    return 'Картриджи';
  }

  // =========================
  // Рідини

  if (
    type === 'Багаторазові пристрої > Рідини > Набір для самозамісу' ||
    type === 'Багаторазові пристрої > Рідини > Готові рідини' ||
    type === 'Рідина для ароматизаторів'
  ) {

    return 'рідини';
  }

  // =========================
  // Pods

  if (
    type === 'Багаторазові пристрої > Пристрої' ||
    type === 'Ароматизатори'
  ) {

    return 'pods';
  }

  // =========================
  // Стартові набори

  if (
    type === 'Багаторазові пристрої > Стартові набори' ||
    type === 'Набори ароматизаторів'
  ) {

    return 'Стартові набори';
  }

  // =========================
  // Суміш

  if (
    type === 'Кальяни > Тютюн' ||
    type === 'Пристрої для дому'
  ) {

    return 'суміш';
  }

  return '';
}

/* =========================================================
   LABEL 2
========================================================= */

function getLabel2(label1, title, brand) {

  // =========================
  // Одноразки

  if (
    label1 === 'ТОП' ||
    label1 === 'Дешеві'
  ) {

    return resolveByMap(title, labelMap) || '';
  }

  // =========================
  // Pods

  if (label1 === 'pods') {

    return resolveDeviceBrand(title, brand);
  }

  // =========================
  // Суміш

  if (label1 === 'суміш') {

    const cleanBrand = decodeHtmlEntities(brand)
      .replace(/&/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanBrand) return '';

    return 'заправка ' + cleanBrand;
  }

  // =========================
  // Рідини / Картриджі / Набори

  if (
    label1 === 'рідини' ||
    label1 === 'Картриджи' ||
    label1 === 'Стартові набори'
  ) {

    return brand || '';
  }

  return '';
}

/* =========================================================
   GENERATE FEED
========================================================= */

async function generateFeed() {

  console.log('=================================');
  console.log('START FEED GENERATION');
  console.log('=================================');

  const response = await axios.get(SOURCE_URL, {
    timeout: 120000
  });

  const xml = response.data;

  const items =
    xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

  console.log('ITEMS FOUND:', items.length);

  let output = '';

  output += '<?xml version="1.0" encoding="UTF-8"?>\n';

  output += '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n';

  output += '<channel>\n';

  output += '<title>Palmy Feed</title>\n';

  output += '<link>https://palmy.com.ua</link>\n';

  output += '<description>Generated Feed</description>\n';

  // =====================================================
  // LOOP
  // =====================================================

  for (const item of items) {

    const id = getTag(item, 'id');

    if (!id) continue;

    const title =
      getTag(item, 'title');

    const description =
      getTag(item, 'description');

    const link =
      getTag(item, 'link');

    const imageLink =
      getTag(item, 'image_link');

    const availability =
      getTag(item, 'availability');

    const priceStr =
      getTag(item, 'price');

    const googleCategory =
      getTag(item, 'google_product_category');

    const productType =
      getTag(item, 'product_type');

    const brand =
      getTag(item, 'brand');

    const condition =
      getTag(item, 'condition') || 'new';

    // =====================================================
    // PRICE
    // =====================================================

    const price = parseFloat(
      String(priceStr)
        .replace(',', '.')
        .replace(/[^\d.]/g, '')
    ) || 0;

    // =====================================================
    // LABELS
    // =====================================================

    const label1 =
      getLabel1(productType, price);

    const label2 =
      getLabel2(label1, title, brand);

    // =====================================================
    // BRAND OUTPUT
    // =====================================================

    let brandOut = brand;

    if (label1 === 'pods') {
      brandOut = 'NoName';
    }

    // =====================================================
    // XML ITEM
    // =====================================================

    output += '<item>\n';

    output +=
      `<g:id>${escapeXml(id)}</g:id>\n`;

    output +=
      `<g:title><![CDATA[${safeCDATA(title)}]]></g:title>\n`;

    output +=
      `<g:description><![CDATA[${safeCDATA(description)}]]></g:description>\n`;

    output +=
      `<g:link>${escapeXml(link)}</g:link>\n`;

    if (imageLink) {

      output +=
        `<g:image_link>${escapeXml(imageLink)}</g:image_link>\n`;
    }

    output +=
      `<g:availability>${escapeXml(availability)}</g:availability>\n`;

    output +=
      `<g:price>${escapeXml(priceStr)}</g:price>\n`;

    if (brandOut) {

      output +=
        `<g:brand>${escapeXml(brandOut)}</g:brand>\n`;
    }

    output +=
      `<g:condition>${escapeXml(condition)}</g:condition>\n`;

    if (googleCategory) {

      output +=
        `<g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>\n`;
    }

    if (productType) {

      output +=
        `<g:product_type>${escapeXml(productType)}</g:product_type>\n`;
    }

    if (label1) {

      output +=
        `<g:custom_label_1>${escapeXml(label1)}</g:custom_label_1>\n`;
    }

    if (label2) {

      output +=
        `<g:custom_label_2>${escapeXml(label2)}</g:custom_label_2>\n`;
    }

    output += '</item>\n';
  }

  // =====================================================
  // END XML
  // =====================================================

  output += '</channel>\n';

  output += '</rss>';

  // =====================================================
  // SAVE
  // =====================================================

  fs.writeFileSync(
    'feed.xml',
    output,
    'utf8'
  );

  console.log('=================================');
  console.log('FEED GENERATED SUCCESSFULLY');
  console.log('feed.xml updated');
  console.log('=================================');
}

/* =========================================================
   RUN
========================================================= */

generateFeed()
  .catch(error => {

    console.error('=================================');
    console.error('FEED GENERATION ERROR');
    console.error(error);
    console.error('=================================');

    process.exit(1);
  });
