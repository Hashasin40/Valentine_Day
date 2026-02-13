# 💕 Valentine Web - Buat Ucapan Valentine Romantis

Website modern untuk membuat dan berbagi ucapan Valentine yang indah. Dibuat dengan React, TailwindCSS, dan Framer Motion.

## ✨ Fitur

- 🖼️ **Upload Foto** - Tambahkan foto spesial untuk orang tersayang
- 💬 **Pesan Romantis** - Tulis pesan cinta yang berkesan
- 🎨 **4 Tema Warna** - Pink, Purple, Red, dan Pastel
- 🔗 **Link Unik** - Generate link untuk dibagikan
- 📱 **Responsive** - Tampilan optimal di semua device
- 💾 **Tanpa Backend** - Data tersimpan di localStorage
- ⬇️ **Download Card** - Simpan ucapan sebagai gambar PNG
- 🎊 **Animasi indah** - Floating hearts dan confetti

## 🚀 Cara Install

```bash
# Clone atau masuk ke direktori project
cd valentine-web3

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

## 🏃 Cara Run

### Development Mode
```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Production Build
```bash
npm run build
```

File build akan tersimpan di folder `dist/`.

## 📦 Dependencies

| Package | Version | Fungsi |
|---------|---------|--------|
| react | ^19.2.0 | UI Framework |
| react-dom | ^19.2.0 | React DOM |
| react-router-dom | ^7.x | Routing |
| framer-motion | ^11.x | Animasi |
| uuid | ^9.x | Generate unique ID |
| html2canvas | ^1.4.x | Screenshot element |
| react-icons | ^5.x | Icon library |
| tailwindcss | ^4.1.x | Styling |

## 📁 Struktur Project

```
valentine-web3/
├── src/
│   ├── components/
│   │   ├── HeartAnimation.jsx  # Animasi floating hearts
│   │   ├── ThemeSelector.jsx   # Selector tema warna
│   │   └── ValentineCard.jsx   # Card tampilan ucapan
│   ├── pages/
│   │   ├── Home.jsx            # Halaman utama
│   │   ├── Create.jsx          # Form buat ucapan
│   │   ├── ValentineView.jsx   # Tampilan ucapan
│   │   └── NotFound.jsx        # Halaman 404
│   ├── utils/
│   │   └── storage.js          # Fungsi localStorage
│   ├── App.jsx                 # Router setup
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Cara Penggunaan

### 1. Buat Ucapan Baru
1. Klik "Buat Ucapan Valentine"
2. Isi nama pengirim dan penerima
3. Tulis pesan cinta
4. (Opsional) Upload foto
5. Pilih tema warna
6. Klik "Generate Link"

### 2. Bagikan Ucapan
1. Klik tombol "Copy Link" untuk menyalin URL
2. Bagikan ke orang tersayang
3. Mereka bisa membuka link untuk melihat ucapan

### 3. Download Card
1. Klik tombol "Download" untuk simpan sebagai gambar
2. Bisa dishare langsung ke WhatsApp/Instagram

## 🔧 Deploy ke Vercel

### Cara 1: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Cara 2: Via GitHub
1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Vercel akan otomatis build dan deploy

### Cara 3: Manual Upload
1. Jalankan `npm run build`
2. Upload folder `dist/` ke Vercel

## ⚠️ Catatan Penting

- **localStorage hanya tersimpan di browser pembuat** - Penerima tidak bisa melihat ucapan jika pembuat menghapus cache
- Untuk fitur sharing yang lebih baik, pertimbangkan untuk menggunakan backend/database
- Foto disimpan sebagai Base64 - max 5MB per gambar

## 🎨 Tema yang Tersedia

| Tema | Gradient | Karakter |
|------|----------|----------|
| Pink Romance | Pink → Rose | Feminin & romantis |
| Purple Dream | Purple → Fuchsia | Mystical & beautiful |
| Red Passion | Red → Pink | Passionate & bold |
| Pastel Love | Rose → Teal → Blue | Soft & gentle |

## 📱 Responsive Design

Website ini sudah:
- ✅ Mobile-first approach
- ✅ Optimal di semua ukuran layar
- ✅ Touch-friendly buttons
- ✅ Fast loading

## 🛠️ Tech Stack

- **React 19** - UI Library
- **Vite** - Build Tool
- **TailwindCSS 4** - Utility-first CSS
- **Framer Motion** - Animation Library
- **React Router** - Client-side Routing

## 📄 License

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.

---

Dibuat dengan ❤️ untuk Valentine's Day 💕
# Valentine_Day
