# 🚀 Panduan Deploy ke Hostinger

## Metode 1: Upload Manual via File Manager (Paling Mudah)

### Langkah-langkah:

1. **Login ke Hostinger Control Panel (hPanel)**
   - Buka: https://hpanel.hostinger.com
   - Login dengan akun Hostinger Anda

2. **Buka File Manager**
   - Di hPanel, cari menu "Files" → "File Manager"
   - Klik "File Manager"

3. **Navigasi ke Folder public_html**
   - Buka folder `public_html` (ini adalah root website Anda)
   - Hapus semua file lama di dalamnya (jika ada)

4. **Upload File dari Folder dist**
   - Klik tombol "Upload Files"
   - Select semua file dan folder di dalam folder `dist/` proyek Anda:
     ```
     dist/
       ├── index.html
       ├── .htaccess
       ├── assets/
       └── images/ (jika ada)
     ```
   - Upload SEMUA file tersebut ke `public_html`
   
5. **Pastikan Struktur Folder Benar**
   Struktur di `public_html` harus seperti ini:
   ```
   public_html/
     ├── index.html
     ├── .htaccess
     ├── assets/
     │   ├── index-xxxxxx.css
     │   └── index-xxxxxx.js
     └── images/ (jika ada)
   ```

6. **Test Website**
   - Buka domain Anda di browser
   - Test semua halaman untuk memastikan routing berfungsi

---

## Metode 2: Upload via FTP/SFTP (Lebih Cepat)

### Langkah-langkah:

1. **Install FTP Client**
   - Download FileZilla: https://filezilla-project.org
   - Install FileZilla di komputer Anda

2. **Dapatkan Kredensial FTP dari Hostinger**
   - Login ke hPanel
   - Pergi ke "Files" → "FTP Accounts"
   - Catat informasi:
     - Host: ftp.yourdomain.com (atau IP server)
     - Username: ftpusername@yourdomain.com
     - Password: (password FTP Anda)
     - Port: 21 (FTP) atau 22 (SFTP)

3. **Connect dengan FileZilla**
   - Buka FileZilla
   - Masukkan Host, Username, Password, Port
   - Klik "Quickconnect"

4. **Upload Files**
   - Di panel kiri (local), navigasi ke folder `dist/` proyek Anda
   - Di panel kanan (remote), navigasi ke folder `public_html/`
   - Hapus file lama di `public_html/`
   - Drag & drop semua file dari `dist/` ke `public_html/`

5. **Verify Upload**
   - Pastikan semua file ter-upload dengan benar
   - Check bahwa file `.htaccess` juga ter-upload

---

## Metode 3: Git Deployment (Otomatis - Recommended)

### Setup Satu Kali:

1. **Enable Git di Hostinger**
   - Login ke hPanel
   - Pergi ke "Advanced" → "Git"
   - Klik "Create Repository"

2. **Clone Repository**
   - Masukkan URL repo GitHub Anda
   - Branch: main
   - Deploy path: public_html

3. **Setup Build Command**
   - Hostinger belum support build otomatis untuk Vite
   - Anda tetap harus build manual dan push folder dist

### Cara Deploy Setiap Ada Update:

```bash
# 1. Build project
npm run build

# 2. Commit perubahan build
git add dist/
git commit -m "build: Update production build"
git push origin main

# 3. Di Hostinger Git panel, klik "Pull" untuk update
```

---

## ⚙️ Environment Variables

Jangan lupa set environment variables di Hostinger:

1. **Via hPanel**
   - Pergi ke "Advanced" → "Environment Variables"
   - Tambahkan:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_key
     ```

2. **Via .env file (Tidak Recommended untuk Production)**
   - Jangan upload file `.env` ke server
   - Gunakan environment variables panel di hPanel

---

## 🔧 Troubleshooting

### 1. Page Not Found / 404 Error
**Solusi:**
- Pastikan file `.htaccess` ada di folder `public_html/`
- Check isi file `.htaccess` sudah benar (sudah tersedia di folder dist/)

### 2. Blank Page / White Screen
**Solusi:**
- Buka Browser Console (F12) → lihat error
- Biasanya karena path asset salah
- Check file `index.html` - pastikan path CSS dan JS benar

### 3. CSS/JS Not Loading
**Solusi:**
- Check apakah folder `assets/` ter-upload dengan benar
- Check permission folder (chmod 755)
- Clear browser cache

### 4. Routing Tidak Bekerja
**Solusi:**
- Pastikan file `.htaccess` ada
- Check Apache mod_rewrite enabled (contact Hostinger support)

### 5. API/Supabase Error
**Solusi:**
- Check environment variables sudah di-set dengan benar
- Test Supabase connection dari browser console

---

## 📝 Checklist Deploy

- [ ] Build project (`npm run build`)
- [ ] Upload semua file dari `dist/` ke `public_html/`
- [ ] Upload file `.htaccess`
- [ ] Set environment variables di Hostinger
- [ ] Test semua halaman utama
- [ ] Test routing (navigasi antar halaman)
- [ ] Test form submission
- [ ] Test Supabase connection
- [ ] Check responsive di mobile
- [ ] Clear cache dan test lagi

---

## 🎯 Quick Command untuk Update

Setiap kali ada perubahan:

```bash
# 1. Build
npm run build

# 2. Upload via FTP atau File Manager
# Upload isi folder dist/ ke public_html/

# Atau jika pakai Git:
git add .
git commit -m "update: description"
git push origin main
# Lalu pull di Hostinger Git panel
```

---

## 💡 Tips

1. **Backup Database**: Selalu backup Supabase sebelum deploy perubahan besar
2. **Test Lokal**: Test di local dengan `npm run preview` sebelum upload
3. **Monitor**: Check error logs di Hostinger hPanel → "Statistics" → "Error Logs"
4. **Cache**: Setelah deploy, clear browser cache untuk lihat perubahan terbaru
5. **SSL**: Pastikan SSL certificate aktif (gratis dari Hostinger)

---

## 📞 Support

Jika ada masalah:
1. Check Hostinger Knowledge Base: https://support.hostinger.com
2. Contact Hostinger Live Chat Support
3. Check browser console untuk error messages
