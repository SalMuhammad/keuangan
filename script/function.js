import {
  dataUang
  // thisMonthReverse
} from './eksekusiData.js'

import { 
  namaBulan,
  saldo
} from './data_base.js'
// console.log(saldo.dompet);
// pengecekanSelect
// kategoriKetikaMasuk

/* export function hapusData(id){
//$('bi-trash').addEventListener('click',()=>{
  if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
    dataUang.splice(id, 1)
    localStorage.setItem("dataUang", JSON.stringify(dataUang))
//		tampilkanData()
  } 
//})
}*/
// ubahFormatData
//fungsi dom
export function $(varr) {
  return document.querySelector(varr)
}
export function $all(varr) {
  return document.querySelectorAll(varr)
}

//memunculkan form 
export function munculForm() {
  $('.layoting').style.display = "block"
  $('.trash').style.display = "none"
  tampilkanwaktuSekarang()
}

//menghilangkan form
export function closes() {
  $('.layoting').style.display = "none"
  $(".btn").classList.remove('edit')
  $(".btn").textContent = "Tambahkan"
  $('#ke-dompet').checked = true
  kategoriKetikaKeluar()
  // $('.caption .trash').innerHTML = ''
  $('.trash').style.display = "block"
  $('.form').reset()
}

//pengecekan select
export function pengecekanSelect() {
  $('#jenis').addEventListener("change", () => {
    if ($('#jenis').value === "masuk") {
      kategoriKetikaMasuk()
    } else {
      kategoriKetikaKeluar()
    }
  })
}

//fungsi kategori ketika masuk
export function kategoriKetikaMasuk() {
  // $('.kategori-masuk').classList.remove('hidden')
  $("#jenis").classList.add('teal')
  $("#jenis").classList.remove('red')
  $(".masuk").style.display = "block"
  $(".keluar").style.display = "none"
}

//fungsi ketika kategori keluar
export function kategoriKetikaKeluar() {
  // $('.kategori-masuk').classList.add('hidden')
  $("#jenis").classList.add('red')
  $("#jenis").classList.remove('teal')
  $(".masuk").style.display = "none"
  $(".keluar").style.display = "block"
}

//fungsi rupiah
export function rupiah(bilangan) {
  // Ubah angka menjadi string
  var number_string = bilangan.toString();

  // Cek apakah angka negatif
  var isNegative = false;
  if (number_string[0] === '-') {
    isNegative = true;
    number_string = number_string.slice(1); // Hapus tanda minus
  }

  // Hitung sisa panjang string saat dibagi 3
  var sisa = number_string.length % 3;

  // Bagian pertama (sebelum titik) dari string Rupiah
  var rupiah = number_string.substr(0, sisa);

  // Bagian ribuan dalam bentuk grup-grup tiga digit
  var ribuan = number_string.substr(sisa).match(/\d{3}/g);

  // Jika ada grup ribuan, tambahkan pemisah ribuan (.)
  if (ribuan) {
    // Tentukan apakah ada digit sebelum pemisah
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  // Tambahkan tanda minus jika angka awalnya negatif
  if (isNegative) {
    rupiah = '-' + rupiah;
  }

  // Kembalikan string Rupiah yang diformat
  return rupiah;
}


function generateUniqueId() {
  // Membuat string acak menggunakan metode Math.random()
  let uniqueId = Math.random().toString(36).substring(2, 8);

  // Cek apakah id sudah ada
  if (document.getElementById(uniqueId)) {
    // Jika id sudah ada, panggil fungsi generateUniqueId() lagi untuk membuat id yang berbeda
    return generateUniqueId();
  }
  // Jika id belum ada, return id yang telah dihasilkan
  return uniqueId;
  // let jenis = $("#jenis").value
  // let nominal = nominalTransaksi !== undefined ? nominalTransaksi:  $('#nominal').value
  // let tanggal = tanggalTransaksi !== undefined ? tanggalTransaksi : $('#tanggal').value
  // let keterangan = kategoriTransaksi !== undefined ? kategoriTransaksi : $('#keterangan').value
  // let kategori = document.getElementById(jenis === "masuk" ? "kategori-masuk" : "kategori-keluar").value
  // let alokasi = $('input[name="pilih-penyimpanan"]:checked').value
}

//fungsi tambah data
export function tambahData(kategoriTransaksi, nominalTransaksi, tanggalTransaksi, alokasiTransaksi, keteranganTransaksi) { // semua argurmen ini adalah kiriman untuk metode transaksi
  let jenis = kategoriTransaksi !== undefined ? kategoriTransaksi : $('#jenis').value
  let nominal = nominalTransaksi !== undefined ? nominalTransaksi : $('#nominal').value
  let tanggal = tanggalTransaksi !== undefined ? tanggalTransaksi : $('#tanggal').value

  let kategori
  let keterangan
  if(kategoriTransaksi === undefined) {
     kategori = document.getElementById(jenis === "masuk" ? "kategori-masuk" : "kategori-keluar").value
     keterangan = !$('#keterangan').value === '' ? 'transfer' : $('#keterangan').value
  } else {
    kategori = kategoriTransaksi
    keterangan = keteranganTransaksi
  }
  console.log(jenis);
  console.log(kategori);

  let alokasi = alokasiTransaksi !== undefined ? alokasiTransaksi : $('input[name="pilih-penyimpanan"]:checked').value
  // console.log(keterangan);
  // console.log(JSON.parse(localStorage.dataUang));
  if (!$('#nominal').value && nominalTransaksi === undefined) {
    alert('form belum di isi')
  } else if (!$('#nominal').value && kategoriTransaksi === undefined) {
    alert('nominal wajib di isi')
  } else {
    let data = {
      tanggal,
      nominal,
      kategori,
      keterangan,
      alokasi,
      jenis,
      id: generateUniqueId()
    }
    // console.log(data)
    if (!$(".btn").classList.contains("edit")) {
      dataUang.push(data)
      localStorage.setItem("dataUang", JSON.stringify(dataUang))
      $('form').reset()
    } else {
      let id = $(".btn").getAttribute('data-id')
      dataUang[id].jenis = $("#jenis").value
      dataUang[id].alokasi = alokasi
      dataUang[id].kategori = kategori
      dataUang[id].tanggal = $("#tanggal").value
      dataUang[id].nominal = $("#nominal").value
      dataUang[id].keterangan = $("#keterangan").value
      localStorage.setItem("dataUang", JSON.stringify(dataUang))
    } 
    closes(); 
    // window.location = 'index.html'//tampilkanData(thisMonthReverse);
  }
}

//fungsi menambahkan total ke ke Array DataUang
export function tambahTotal(objek) {
  for (const tanggal in objek) {
    let totalPemasukan = 0;
    let totalPengeluaran = 0;

    objek[tanggal].forEach((transaksi) => {
      const nominal = parseInt(transaksi.nominal)

      if (transaksi.jenis === "masuk") {
        totalPemasukan += nominal;
      } else if (transaksi.jenis === "keluar") {
        totalPengeluaran += nominal;
      }

    });
    objek[tanggal].push(totalPemasukan);
    objek[tanggal].push(totalPengeluaran);
  }
  return objek;
}

function add3Dots(string, limit) {
  var dots = "...";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
}

export function ubahFormatData(dataAwal) {
  const dataBaru = {};
  dataAwal.forEach(item => {
    const tanggal = new Date(item.tanggal);
    const tahun = tanggal.getFullYear();
    const bulan = String(tanggal.getMonth() + 1);
    const minggu = getWeekNumber(tanggal); // Menggunakan fungsi getWeekNumber (lihat di bawah)
    const hari = String(tanggal.getDate());

    if (!dataBaru[tahun]) {
      dataBaru[tahun] = {};
    }
    if (!dataBaru[tahun][bulan]) {
      dataBaru[tahun][bulan] = {};
    }
    if (!dataBaru[tahun][bulan][minggu]) {
      dataBaru[tahun][bulan][minggu] = {};
    }
    if (!dataBaru[tahun][bulan][minggu][hari]) {
      dataBaru[tahun][bulan][minggu][hari] = [];
    }
    dataBaru[tahun][bulan][minggu][hari].push(item);
  });

  return dataBaru;
}

// Fungsi untuk mendapatkan nomor minggu dalam tahun
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Mulai dari hari Senin (1) hingga Minggu (7)
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7); // Hitung nomor minggu
}


export function susunDataPerhariDariBulan(data) {
  // Menggabungkan semua data menjadi satu array
  if (data !== null && typeof data === 'object') {
    const mergedArray = Object.values(data).flat()
    // Mengurutkan array berdasarkan waktu menggunakan metode .sort()
    return mergedArray.reverse();
  }
}

export function tampilkanwaktuSekarang() {
  const dt = new Date();
  const timeZoneOffset = + 420; // 7 jam = 7 x 60 menit = -420 menit
  const localDate = new Date(dt.getTime() + timeZoneOffset * 60 * 1000);
  const currentDate = localDate.toISOString().slice(0, 16);
  $("#tanggal").value = currentDate;
}

export function pilihBulanIni(data, currentYear, currentMonth) {
  $('.tombol-pindah-waktu span:nth-child(2)').innerHTML = namaBulan[currentMonth - 1]
  $('.tombol-pindah-waktu span:nth-child(3)').innerHTML = currentYear
  if (!data[currentYear] || !data[currentYear][currentMonth]) {
    $(".container .table").innerHTML = ` <span class="confir-data-kosong">Tidak ada transaksi di bulan ${namaBulan[currentMonth - 1]} tahun ${currentYear}</span>`
    return null; // Tidak ada data untuk bulan ini
  }
  const currentMonthData = data[currentYear][currentMonth];
  // Menggabungkan semua data tanggal di dalam bulan
  const tanggalData = {};
  for (const minggu in currentMonthData) {
    if (currentMonthData[minggu] && typeof currentMonthData[minggu] === 'object') {
      for (const tanggal in currentMonthData[minggu]) {
        if (currentMonthData[minggu][tanggal] && currentMonthData[minggu][tanggal].length > 0) {
          tanggalData[tanggal] = currentMonthData[minggu][tanggal];
        }
      }
    }
  }

  return tanggalData;
}

export function tampilkanData(dataArr) {
  // Membuat objek untuk menyimpan data per hari
  // console.log(object);
  const dataPerHari = {};
  if (typeof dataArr !== 'undefined' && dataArr !== null) {
    // Memisahkan data berdasarkan tanggal
    dataArr.forEach(data => {
      // Mengambil tanggal saja dari string tanggal
      const tanggal = data.tanggal.slice(0, 10);
      if (!dataPerHari[tanggal]) {
        dataPerHari[tanggal] = [];
      }
      dataPerHari[tanggal].push(data);
    })
    tambahTotal(dataPerHari)
    let tableHtml = "";
    for (const tanggal in dataPerHari) {
      // console.log(tanggal);
      let pengeluaran = dataPerHari[tanggal].length - 1
      let pemasukan = dataPerHari[tanggal].length - 2
      const date = new Date(tanggal); // membuat objek Date dari string tanggal
      const dinten = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][date.getDay()];
      const tgl = tanggal.slice(8, 10)
      const bln = tanggal.slice(5, 7)
      const thn = tanggal.slice(0, 4)
      tableHtml += `
        <tr class"row">
          <th>
            <div class="flex">
              <b class="tgl flex"><span>${tgl}</span></b>
              <div class="">
                <div class="bulan-tahun">${bln}-${thn}</div>
                <div class="dinten">${dinten}</div>
              </div>
           </div>
         </th>
         <th class="pemasukan"><span class="nominal">${rupiah(dataPerHari[tanggal][pemasukan])}</span></th>
          <th class="pengeluaran">
            <span class="nominal">${rupiah(dataPerHari[tanggal][pengeluaran])}
            </span>
          </th>
          <th class="hidden">detile</th>
        </tr>
    `;
      dataPerHari[tanggal].pop()
      dataPerHari[tanggal].pop()

      //meluping value objek dataPerHari
      if (typeof dataPerHari[tanggal] !== 'undefined'/* && dataPerHari[tanggal] !== null*/) {
        dataPerHari[tanggal].forEach((data, id) => {
          // const jenis = data.jenis === "masuk" ? "Pemasukan" : "Pengeluaran";
          let tr
          if(data.jenis === "masuk") {
            tr = '<tr class="pemasukan">'
          } else if(data.jenis === "keluar") {
            tr = '<tr class="pengeluaran">'
          } else tr = '<tr class="transfer">'

          tableHtml += tr;
          tableHtml += `
	         <td>${data.kategori}</td>
	         <td>${add3Dots(data.keterangan, 30)}</td>
           <td class="nominal">
              ${rupiah(data.nominal)}
              <span class="id-transaksi w-0 text-[0]">${data.id}</span>
           </td>
           <td class="detile hidden text-[0]">🔍</td>
        </tr>
        `;
        })
      }
      if (document.querySelector(".table")) { document.querySelector(".table").innerHTML = tableHtml } else { alert('data gagal di muat!'); }
      ;
      // document.querySelector('.table').innerHTML = tableHtml
    }
  }
}

//rupiah
// tambahData
export function cetakNominall(bulanSekarang) {
  let pemasukanPerbulan = 0
  let pengeluaranPerbulan = 0
  let saldo = 0
  if (bulanSekarang) {
    bulanSekarang.map(satuanTransaksi => {
      if (satuanTransaksi.jenis === 'masuk') {
        return pemasukanPerbulan += JSON.parse(satuanTransaksi.nominal)
      } else if (satuanTransaksi.jenis === 'keluar') {
        return pengeluaranPerbulan += JSON.parse(satuanTransaksi.nominal)
      }
    })
  }
  saldo = pemasukanPerbulan - pengeluaranPerbulan
  
  $('.nominal-masuk').innerHTML = rupiah(pemasukanPerbulan)
  $('.nominal-keluar').innerHTML = rupiah(pengeluaranPerbulan)
  // $('.saldo').innerHTML = rupiah(saldo.dompet)
  $('#bulan-sekarang').addEventListener('change', ()=> $('.saldo').innerHTML = rupiah(saldo))
}


export function close(ellem) {
  ellem.classList.add('hidden')
}
export function muncul(ellem) {
  ellem.classList.remove('hidden')
}

// funsi transfer duit
export function pindahUang(inputNominal, alokasiTransaksi, keteranganTransaksi) {
  let admin = inputNominal.value < 500000 ? 3000 : 5000;
  let alokasiAdmin = '';

  const parentElement = inputNominal.parentElement;
  if (parentElement && parentElement.nextElementSibling) {
    const children1 = parentElement.nextElementSibling.children[1];
    if (children1 && children1.children) {
      const parendPilihanModal = children1.children;
      
      // Setelah mendeklarasikan variabel `parendPilihanModal`, barulah Anda dapat mengakses properti checked dari elemen cash.
      // parendPilihanModal.cash.checked = true;

      if (parendPilihanModal.cash.checked) {
        alokasiAdmin = 'dompet';
      } else if (parendPilihanModal.dana.checked) {
        alokasiAdmin = 'dana';
      } else {
        alert('SILAKAN pilih bayar admin!')
      }

      tambahData('keluar', admin, new Date(), alokasiAdmin, `admin ${keteranganTransaksi}`);
    }
  }
  
  tambahData('transfer', inputNominal.value, new Date(), alokasiTransaksi, keteranganTransaksi);
}


