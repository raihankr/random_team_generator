'use strict';

import * as tg from './team-generator.js';
let $ = q => document.querySelector(q);
$.all = q => document.querySelectorAll(q);
let banyakDaftar = () => $.all('textarea[class~=daftar]').length;

if (localStorage.daftarNama) {
  $('#daftar-nama > div').innerHTML = '';
  for (let [indeks, daftar] of JSON.parse(localStorage.daftarNama).entries()) {
    let elemen = tambahDaftar();
    elemen.value = daftar.join('\n');
  }
}

$('#form').addEventListener('submit', e => {
  e.preventDefault();
  let jumlahKelompok = $('#jumlah-kelompok').value;
  let daftarNama = getDaftarNama();

  $('#hasil > .kolom').innerHTML = '';
  let daftarKelompok = tg.buatKelompok(daftarNama, jumlahKelompok);
  for (let [indeks, kelompok] of daftarKelompok.entries()) {
    let details = document.createElement('details');
    details.open = true;
    let summary = document.createElement('summary');
    summary.innerHTML = 'Kelompok ' + (indeks + 1);
    details.appendChild(summary);

    let ul = document.createElement('ul');
    for (let nama of kelompok) {
      let li = document.createElement('li');
      li.innerHTML = nama;
      ul.appendChild(li);
    }
    details.appendChild(ul);
    $('#hasil > .kolom').appendChild(details);
  }
  $('#hasil > .kolom').data = daftarKelompok;
});

$('#tambah-daftar').addEventListener('click', tambahDaftar);

$('#hapus-daftar').addEventListener('click', () => {
  if (banyakDaftar() <= 1) return;
  $('#daftar-nama > div').removeChild($('#daftar' + banyakDaftar()))
  cachingDaftarNama();
});

$('#daftar1').addEventListener('change', cachingDaftarNama);

$('#salin-hasil').addEventListener('click', async () => {
  let daftarKelompok = $('#hasil > .kolom').data;
  try {
    // $('#hasil > .kolom')
    await navigator.clipboard.writeText(
      daftarKelompok.map(
        (kelompok, indeks) => 'Kelompok ' + (indeks + 1) + ':\n- ' + kelompok.join('\n- ')).join('\n\n'));
    alert('Teks disalin ke clipboard');
  } catch (err) { console.log(err); }
});

$('#info-daftar-nama').addEventListener('click', () => alert(
    'INFO:\n\n'+
    'Setiap nama dalam daftar akan diacak lalu dibagi menjadi n kelompok.\n\n'+
    'Setiap nama dalam daftar dipisahkan dengan garis baru.\n\n'+
    'Jika terdapat lebih dari satu daftar, setiap daftar akan dibagi menjadi n kelompok lalu digabungkan dengan '+
    'kelompok dari daftar lain.'
  ))

function getDaftarNama() {
  let daftarNama = [];
  for (let textarea of $.all('textarea[class~=daftar]'))
    daftarNama.push(textarea.value.split('\n').map(s => s.trim()));
  return daftarNama;
}

function tambahDaftar() {
  let elemen = document.createElement('textarea');
  elemen.id = 'daftar' + (banyakDaftar() + 1);
  elemen.classList.add('daftar', 'grey-div');
  $('#daftar-nama > div').appendChild(elemen);
  elemen.addEventListener('change', cachingDaftarNama);
  return elemen;
}

function cachingDaftarNama() {
  localStorage.daftarNama = JSON.stringify(getDaftarNama());
}
