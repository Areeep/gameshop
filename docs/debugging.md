# Catatan Debugging

Catatan galat yang ditemukan saat pengembangan, analisis, dan perbaikannya.

## 1. `npm ci` gagal: lock file tidak sinkron

**Kode kesalahan**

```
npm error code EUSAGE
npm error `npm ci` can only install packages when your package.json and package-lock.json are in sync.
npm error Missing: @emnapi/core@1.11.3 from lock file
npm error Invalid: lock file's @emnapi/wasi-threads@1.2.2 does not satisfy @emnapi/wasi-threads@1.2.3
```

**Analisis kriteria build.** `npm ci` menolak berjalan bila `package-lock.json`
tidak cocok dengan `package.json`. Setelah gagal, `npm run build` juga gagal
dengan `sh: vite: command not found` karena `node_modules` tidak terpasang.
Penyebab: lock file tidak ikut diperbarui saat dependensi bertransitif (paket
`@emnapi/*`, dependensi opsional bundler) berubah.

**Perbaikan.** Jalankan `npm install` untuk menyelaraskan lock file, commit
`package-lock.json`, lalu verifikasi ulang:

```bash
npm install
npm ci            # berhasil
npm run lint      # ESLint: No issues found
npm run build     # vite build: built in ~0.3s tanpa galat
```

## 2. Kriteria lulus build dan eksekusi

| Pemeriksaan | Perintah | Kriteria lulus |
|---|---|---|
| Sintaks dan aturan kode | `npm run lint` | tidak ada galat atau peringatan ESLint |
| Kompilasi | `npm run build` | `vite build` selesai (`✓ built in ...`), tidak ada galat |
| Eksekusi | `npm run dev`, buka halaman Categories, Bag | tidak ada galat di konsol browser; filter, sortir, dan total keranjang bekerja |
| Fungsi pengolah data | uji manual `src/utils/gameUtils.js` | `sortGames`, `chunkGames`, `countByCategory`, `sumBagTotal` memberi hasil sesuai harapan; `chunkGames(games, 0)` melempar `RangeError` |
