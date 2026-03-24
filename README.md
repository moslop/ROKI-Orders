# 🧥 ROKI Website — Deployment Guide

## Files
```
roki-website/
  index.html   → الصفحة الرئيسية
  order.html   → صفحة الطلب
  style.css    → التصميم
  i18n.js      → الترجمة (EN / AR / FR)
  main.js      → النافبار والأنيميشن
  order.js     → الفورم والإرسال
  README.md    → هذا الملف
```

---

## 📧 إعداد الإيميل (Formspree) — مطلوب أولاً

1. اذهب إلى: https://formspree.io
2. سجّل حساب بإيميلك
3. اضغط **"+ New Form"**
4. اكتب اسم: `ROKI Orders`
5. ستحصل على رابط مثل: `https://formspree.io/f/xqabc123`
6. افتح ملف `order.js`
7. ابحث عن هذا السطر:
   ```
   const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
   ```
8. استبدل `YOUR_FORM_ID_HERE` برمزك الخاص

---

## 🚀 الرفع على GitHub ثم Vercel

### الخطوة 1 — رفع على GitHub
```bash
# 1. إنشاء مجلد وتهيئة git
cd roki-website
git init
git add .
git commit -m "Initial ROKI website"

# 2. إنشاء repository على GitHub
# اذهب إلى github.com → New Repository
# اسمه: roki-website
# اتركه Public أو Private

# 3. ربط ورفع
git remote add origin https://github.com/YOUR_USERNAME/roki-website.git
git branch -M main
git push -u origin main
```

### الخطوة 2 — نشر على Vercel
1. اذهب إلى: https://vercel.com
2. سجّل بحساب GitHub
3. اضغط **"Add New Project"**
4. اختر repository: `roki-website`
5. اضغط **"Deploy"**
6. ✅ موقعك جاهز على رابط مثل: `roki-website.vercel.app`

---

## 💬 WhatsApp
الرقم محفوظ تلقائياً: **+213 655 295 217**
عند الطلب يفتح WhatsApp تلقائياً مع تفاصيل الطلب.

---

## 🌐 اللغات
- EN (English) — الإنجليزية
- AR (Arabic) — العربية مع دعم RTL
- FR (French) — الفرنسية
