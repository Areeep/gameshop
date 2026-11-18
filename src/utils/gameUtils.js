/**
 * ============================================================================
 * Module      : gameUtils
 * Layer       : Utils
 *
 * Description:
 * Kumpulan fungsi murni untuk mengolah koleksi game: pengurutan, pengelompokan
 * ke array dua dimensi, penghitungan per kategori, penentuan tema level, dan
 * penjumlahan total keranjang. Semua fungsi tidak mengubah data masukan.
 * ============================================================================
 */

/** Jumlah kartu game per baris pada tampilan grid. */
export const CARDS_PER_ROW = 4;

/** Opsi pengurutan yang tersedia pada halaman Categories. */
export const SORT_OPTIONS = [
	{ value: "default", label: "Default" },
	{ value: "title", label: "Title (A-Z)" },
	{ value: "priceAsc", label: "Price (low to high)" },
	{ value: "priceDesc", label: "Price (high to low)" },
	{ value: "rating", label: "Rating (highest)" },
];

/**
 * Menghitung harga akhir sebuah game setelah diskon.
 *
 * @param {{price: number, discount: number}} game Data game.
 * @returns {number} Harga setelah diskon.
 */
export function getFinalPrice(game) {
	return game.price * (1 - game.discount);
}

/**
 * Menentukan nama tema warna lencana berdasarkan level game.
 * Menggunakan percabangan switch-case.
 *
 * @param {string} level Level game ("Entry", "Median", atau "High").
 * @returns {string} Nama kelas tema: "entry", "median", "high", atau "unknown".
 */
export function getLevelTone(level) {
	switch (level) {
		case "Entry":
			return "entry";
		case "Median":
			return "median";
		case "High":
			return "high";
		default:
			return "unknown";
	}
}

/**
 * Mengurutkan koleksi game berdasarkan kunci tertentu.
 * Array asli tidak diubah, fungsi mengembalikan salinan yang sudah terurut.
 *
 * @param {Array<object>} games Koleksi game.
 * @param {string} sortKey Salah satu nilai dari SORT_OPTIONS.
 * @returns {Array<object>} Salinan koleksi yang sudah terurut.
 */
export function sortGames(games, sortKey) {
	const sorted = [...games];

	switch (sortKey) {
		case "title":
			return sorted.sort((a, b) => a.title.localeCompare(b.title));
		case "priceAsc":
			return sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
		case "priceDesc":
			return sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
		case "rating":
			return sorted.sort((a, b) => b.rating - a.rating);
		default:
			return sorted;
	}
}

/**
 * Memecah koleksi game menjadi array dua dimensi (baris x kolom).
 * Menggunakan perulangan while.
 *
 * @param {Array<object>} games Koleksi game satu dimensi.
 * @param {number} [size=CARDS_PER_ROW] Jumlah elemen maksimum per baris.
 * @returns {Array<Array<object>>} Array dua dimensi berisi baris-baris game.
 * @throws {RangeError} Bila size bukan bilangan bulat positif.
 */
export function chunkGames(games, size = CARDS_PER_ROW) {
	if (!Number.isInteger(size) || size < 1) {
		throw new RangeError("size harus berupa bilangan bulat positif");
	}

	const rows = [];
	let index = 0;

	while (index < games.length) {
		rows.push(games.slice(index, index + size));
		index += size;
	}

	return rows;
}

/**
 * Menghitung jumlah game pada setiap kategori.
 * Menggunakan perulangan for...of.
 *
 * @param {Array<{category: string}>} games Koleksi game.
 * @returns {Record<string, number>} Objek pemetaan kategori ke jumlah game.
 */
export function countByCategory(games) {
	const counts = {};

	for (const game of games) {
		counts[game.category] = (counts[game.category] ?? 0) + 1;
	}

	return counts;
}

/**
 * Menjumlahkan harga akhir seluruh game di keranjang.
 * Menggunakan perulangan for.
 *
 * @param {Array<{price: number, discount: number}>} games Isi keranjang.
 * @returns {string} Total pembayaran dengan dua angka desimal.
 */
export function sumBagTotal(games) {
	let total = 0;

	for (let i = 0; i < games.length; i++) {
		total += getFinalPrice(games[i]);
	}

	return total.toFixed(2);
}
