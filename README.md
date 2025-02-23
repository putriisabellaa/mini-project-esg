# # Simple Auth App
## 📌 Deskripsi Proyek  
Mini proyek berbasis web dikembangkan menggunakan **Laravel (Backend) dan Next.js (Frontend)**, serta **MySQL** sebagai database. Sistem ini memiliki fitur autentikasi menggunakan **JWT**, dashboard dengan beberapa menu utama, logout, dan dukungan multi-bahasa (**Indonesia, Inggris, Mandarin**).

---

## 🚀 Teknologi yang Digunakan  

### **Frontend (Next.js)**
- Next.js 
- Typescript
- i18n (Internationalization) untuk multi-bahasa
- Vercel (Deployment)

---

## 🔑 Fitur Utama  

### **1️⃣ Login dengan JWT Authentication**  
- Pengguna bisa login dengan email dan password.  
- Jika berhasil, backend Laravel akan mengirimkan **JWT token** ke frontend.  
- Token ini digunakan untuk mengakses halaman dashboard.  

### **2️⃣ Dashboard (Hanya Tampilan Saja)**  
Setelah login, pengguna akan diarahkan ke dashboard yang berisi menu berikut:  
✅ **Dashboard** berisi informasi dasar pengguna  
✅ **Employee**  
✅ **Purchasing**  
✅ **Finance**  
✅ **Warehouse**  

### **3️⃣ Logout System**  
- Pengguna bisa logout dengan mengklik tombol **Logout** di dashboard.  
- JWT token akan dihapus dari local storage, sehingga pengguna harus login kembali untuk mengakses sistem.  

### **4️⃣ Dukungan Multi-Bahasa**  
- Sistem mendukung **3 bahasa**: **Indonesia, Inggris, Mandarin**.  
- Pengguna dapat mengganti bahasa melalui tombol pilihan bahasa.  
- Implementasi menggunakan **i18n** di Next.js untuk mengganti teks sesuai bahasa yang dipilih.  

---

## ⚙️ Instalasi & Menjalankan Proyek  

### **1️⃣ Clone Repository**  
```bash
git clone https://github.com/putriisabellaa/mini-project-esg.git
cd mini-project-esg

```
### **2️⃣ Menjalankan Frontend (Next.js)**  
```bash
npm install
npm run dev
