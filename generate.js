import fs from 'fs';
import axios from 'axios';

const SOURCE_URL = 'https://palmy.com.ua/marketplace-integration/google-feed?langId=3';

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
   2. POD MODELS
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
   4. ТЮТЮН
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

/* ================================
   HELPERS
================================= */

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveByMap(title, map) {
  const entries = Object.entries(map)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [key, value] of entries) {
    const regex = new RegExp(escapeRegExp(key), 'i');
    if (regex.test(title)) return value;
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
  const re = new RegExp(`<g:${tag}>([\\s\\S]*?)<\\/g:${tag}>`, 'i');
  const m = content.match(re);
  return m ? m[1].trim() : '';
}

function normType(type) {
  return (type || '')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeHtmlEntities(str) {
  return (str || '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function escapeXml(str) {
  return (str || '')
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

/* ================================
   MAIN
================================= */

async function generateFeed() {

  console.log('START FEED GENERATION');

  const response = await axios.get(SOURCE_URL, {
    timeout: 120000
  });

  const xml = response.data;

  let output = '<?xml version="1.0" encoding="UTF-8"?>\n';
  output += '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n';
  output += '<channel>\n';

  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

  for (const content of items) {

    const id = getTag(content, 'id');
    const title = getTag(content, 'title');
    const description = getTag(content, 'description');
    const link = getTag(content, 'link');
    const image_link = getTag(content, 'image_link');
    const availability = getTag(content, 'availability');
    const priceStr = getTag(content, 'price');
    const brandSrc = getTag(content, 'brand');
    const conditionSrc = getTag(content, 'condition');
    const product_type = getTag(content, 'product_type');
    const google_category = getTag(content, 'google_product_category');

    const tNorm = normType(product_type);
    const price = priceStr
      ? parseFloat(priceStr.replace(',', '.'))
      : 0;

    const isDisposable = tNorm.includes('Одноразові');
    const isPodDevice = tNorm.includes('Багаторазові пристрої > Пристрої');
    const isTobacco = tNorm.includes('Кальяни > Тютюн');

    let label1 = '';
    let label2 = '';
    let brandOut = brandSrc;

    // =========================
    // LABELS

    if (isTobacco) {

      label1 = 'суміш';

      const cleanBrand = decodeHtmlEntities(brandSrc).trim();

      let tobaccoBrand = resolveByMap(cleanBrand, tobaccoBrandMap);

      if (!tobaccoBrand) {
        tobaccoBrand = resolveByMap(title, tobaccoBrandMap);
      }

      if (tobaccoBrand) {
        label2 = tobaccoBrand;
      }

    }
    else if (
      tNorm.includes('Багаторазові пристрої > Рідини > Набір для самозамісу') ||
      tNorm.includes('Багаторазові пристрої > Рідини > Готові рідини')
    ) {

      label1 = 'рідини';

      if (brandSrc) {
        label2 = brandSrc;
      }

    }
    else if (isDisposable) {

      label1 = price > 730 ? 'ТОП' : 'Дешеві';
      label2 = resolveByMap(title, labelMap);

    }
    else if (isPodDevice) {

      label1 = 'pods';

      const brandName = resolveDeviceBrand(title, brandSrc);

      if (brandName) {
        label2 = brandName;
      }

      brandOut = 'NoName';
    }

    // =========================
    // XML ITEM

    let newItem = '    <item>\n';

    newItem += `<g:id>${escapeXml(id)}</g:id>\n`;
    newItem += `<g:title><![CDATA[${safeCDATA(title)}]]></g:title>\n`;
    newItem += `<g:description><![CDATA[${safeCDATA(description)}]]></g:description>\n`;
    newItem += `<g:link>${escapeXml(link)}</g:link>\n`;

    if (image_link) {
      newItem += `<g:image_link>${escapeXml(image_link)}</g:image_link>\n`;
    }

    newItem += `<g:availability>${availability}</g:availability>\n`;
    newItem += `<g:price>${priceStr}</g:price>\n`;

    if (brandOut) {
      newItem += `<g:brand>${escapeXml(brandOut)}</g:brand>\n`;
    }

    newItem += `<g:condition>${conditionSrc}</g:condition>\n`;
    newItem += `<g:product_type>${escapeXml(product_type)}</g:product_type>\
   }
