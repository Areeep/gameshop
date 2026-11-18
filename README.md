# Gameshop

Aplikasi toko game sederhana berbasis React dan Vite. Pengguna dapat melihat
promo, memfilter dan mengurutkan game per kategori, menyimpan game ke library,
dan memasukkan game ke keranjang dengan total pembayaran otomatis.

## Struktur

| Folder | Isi |
|---|---|
| `src/pages` | Halaman: Home, Categories, MyLibrary, Bag, Header, Main |
| `src/components` | Komponen: GameCard, GameRating, GameSwiper, SideMenu, dll. |
| `src/contexts` | `AppContext` untuk state library dan keranjang |
| `src/utils/gameUtils.js` | Fungsi murni pengolah koleksi game (lihat di bawah) |
| `src/data` | Data statis navigasi, filter, dan tautan sosial |
| `public/api/gamesData.json` | Data game |

## Fungsi di `gameUtils.js`

| Fungsi | Konsep | Dipakai di |
|---|---|---|
| `getLevelTone` | percabangan `switch-case` | `GameCard.jsx` |
| `sortGames` | pengurutan array | `Categories.jsx` |
| `chunkGames` | perulangan `while`, array dua dimensi | `Categories.jsx` |
| `countByCategory` | perulangan `for...of` | `Categories.jsx` |
| `sumBagTotal` | perulangan `for` | `Bag.jsx` |

## Menjalankan

```bash
npm install
npm run dev      # pengembangan
npm run lint     # pemeriksaan ESLint
npm run build    # build produksi
```
