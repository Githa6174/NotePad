# 📝 NotePad App (Proyek Tugas)

Ini adalah aplikasi pencatat (NotePad) sederhana yang dibuat menggunakan React Native (Expo) dan Firebase. Aplikasi ini memungkinkan pengguna untuk mendaftar, login (menggunakan Email atau Google), dan membuat catatan pribadi yang disimpan dengan aman di Cloud Firestore.

## ✨ Fitur Utama

* **Autentikasi Firebase (Native):**
    * Daftar Akun (Email/Password)
    * Login (Email/Password)
    * Login dengan **Google** (menggunakan `@react-native-google-signin/google-signin`)
    * Logout
    * Manajemen Sesi (Pengguna tetap login setelah aplikasi ditutup)
* **Database Cloud Firestore (Native):**
    * **Create:** Membuat catatan baru (Judul + Isi).
    * **Read:** Menampilkan daftar catatan secara *real-time* yang hanya milik pengguna yang sedang login.
    * **Update:** Mengedit catatan yang sudah ada di halaman terpisah.
    * **Delete:** Menghapus catatan.
* **Navigasi:**
    * Alur Autentikasi (Auth Flow) yang memisahkan layar Login dan layar utama aplikasi.
    * Navigasi Stack (React Navigation) untuk pindah dari 'Home' ke 'Detail'.
* **Styling:**
    * Tampilan UI kustom yang bersih untuk Halaman Login, Home, dan Detail.
    * Logo aplikasi kustom, input yang rapi, dan *layout* daftar catatan.

## 🚀 Teknologi yang Digunakan

* **React Native** (dengan **Expo** - *Development Build*)
* **TypeScript**
* **Firebase (Native SDK v9)**:
    * `@react-native-firebase/app`
    * `@react-native-firebase/auth`
    * `@react-native-firebase/firestore`
* **Google Sign-In**:
    * `@react-native-google-signin/google-signin`
* **React Navigation** (Native Stack)
* **Expo Vector Icons** (untuk ikon Hapus)

## 🔧 Setup dan Instalasi

Ini adalah proyek Expo yang menggunakan *library native*, sehingga **wajib** dijalankan menggunakan **Development Build** (`npx expo run:android`).

1.  **Clone repositori:**
    ```bash
    git clone [https://github.com/username/repo-name.git](https://github.com/username/repo-name.git)
    cd repo-name
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```
    *(Jika gagal, hapus `node_modules` dan `package-lock.json` lalu jalankan lagi)*

3.  **Setup Firebase (Android):**
    * Buat proyek di [Firebase Console](https://console.firebase.google.com/).
    * Aktifkan **Authentication** (Email/Password dan Google).
    * Aktifkan **Firestore Database**.
    * Daftarkan aplikasi Android Anda (di Setelan Proyek) dengan **Package Name** yang benar (misal: `com.githa.NotePad`).
    * **SHA-1:** Pastikan Anda menambahkan sidik jari SHA-1 debug Anda (didapat dari `cd android && .\gradlew signingReport`) ke aplikasi Android di Firebase Console.
    * Unduh file **`google-services.json`**.

4.  **Tempatkan File Konfigurasi:**
    * Tempatkan file `google-services.json` yang baru diunduh ke dalam folder **`/`** (folder utama) proyek Anda.

5.  **Konfigurasi Kunci Google:**
    * Buka [Google Cloud Console](https://console.cloud.google.com/) > Credentials.
    * Pastikan Kunci **Web Client ID** (untuk Google Sign-In) sudah ada.
    * Buka file `app/screens/Login.tsx`.
    * Cari `GoogleSignin.configure` dan masukkan `webClientId` Anda di sana.

6.  **Jalankan Aplikasi:**
    * Pastikan emulator Android Anda berjalan.
    * Bangun dan jalankan aplikasi:
        ```bash
        npx expo run:android
        ```

## 📁 Struktur File Penting
