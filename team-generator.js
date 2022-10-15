'use strict';

/** Membuat kelompok yang beranggotakan nama acak
 * berdasarkan daftar nama yg diberikan
 * @param {list[list[string]]} daftarNama - Daftar nama calon anggota kelompok
 * @param {int} jumlahKelompok - Jumlah kelompok yang akan dibuat
 */
export function buatKelompok(daftarNama, jumlahKelompok) {
  let kelompok = Array.from({ length: jumlahKelompok }, _ => []);
  let indeks = 0;
  for (let daftar of daftarNama) {
    acak(daftar);
    for (let nama of daftar) {
      if (nama) kelompok[indeks].push(nama);
      if (++indeks >= kelompok.length) indeks = 0;
    }
  }
  for (let [indeks, kel] of kelompok.entries())
    if (!kel.length) kelompok.splice(indeks, 1);
  return kelompok;
}

export function acak(daftar) {
  for (let indeks in daftar) {
    let indeksAcak = parseInt(Math.random() * daftar.length);
    [daftar[indeks], daftar[indeksAcak]] = [daftar[indeksAcak], daftar[indeks]]
  }
}
