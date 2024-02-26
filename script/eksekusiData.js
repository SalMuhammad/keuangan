import {
  pengecekanSelect,
  ubahFormatData,
  pilihBulanIni,
  sortByTime,
  tampilkanData,
  $,
  munculForm,
  kategoriKetikaMasuk,
  kategoriKetikaKeluar,
  cetakNominall,
  tambahData,
  // pemasukanPerbulan,
  // saldo,
  rupiah

} from './function.js';
import {saldo, namaBulan} from './data_base.js'

//import {} from './prontEnd.js'

export let dataUang = JSON.parse(localStorage.getItem("dataUang")) || []

// console.log(dataUang)

pengecekanSelect()

// ubah Array Data uang menjadi di rangkum berdasarkan tahun, bulan dan hari
const semuaData = ubahFormatData(dataUang)
// console.log(semuaData);
//memilih bulan sekarang saja untuk di tampilkan
// console.log(semuaData);
const sekarang = new Date()
let tahunKlik = sekarang.getFullYear();
let bulanKlik = sekarang.getMonth() + 1;

let thisMonth = pilihBulanIni(semuaData, tahunKlik, bulanKlik)

//membalikan urutan isi bulan sekarang dan mebakikannya
let thisMonthReverse = sortByTime(thisMonth)
if (thisMonthReverse && Array.isArray(thisMonthReverse)) {
  thisMonthReverse.reverse()
}

tampilkanData(thisMonthReverse);

cetakNominall(thisMonthReverse);


tahunKlik = new Date().getFullYear(); 
bulanKlik = new Date().getMonth() + 1
$('.tombol-pindah-waktu figure').addEventListener('click', e => {
  if (e.target.classList.contains('bi-chevron-left')) {
    bulanKlik--;
    if (bulanKlik < 1) {
      bulanKlik = 12;
      tahunKlik--;
    }
  } else if (e.target.classList.contains('bi-chevron-right')) {
    bulanKlik++;
    if (bulanKlik > 12) {
      bulanKlik = 1;
      tahunKlik++;
    }
  }
  thisMonthReverse = sortByTime(pilihBulanIni(semuaData, tahunKlik, bulanKlik));
  if (thisMonthReverse && Array.isArray(thisMonthReverse)) {
    thisMonthReverse.reverse();
  }
  tampilkanData(thisMonthReverse)

  cetakNominall(thisMonthReverse)
  // $  ('.saldo').innerHTML = rupiah(saldo)
  // $('.nominal-masuk').innerHTML = rupiah(pemasukanPerbulan)
  // $('.nominal-keluar').innerHTML = rupiah( )
});

//1. menambah fitur hapus dan edit
//2.   ~"~    dropdown seting
//3. membuat diagram garis


// fungsi untuk mencari element <span> di dalam element <td>
function findSpan(element) {
  // mengecek element <td> apakah ada di dalam element <tr>
  let spanElement = element.querySelector('span')
  if(spanElement) {
    return spanElement
  } else {
    // jika tidak ditemukan, mencari di dalam element anaknya secara rekursif
    for (let i = 0; i< element.children.length; i++ ) {
      let childSpanElement = findSpan(element.children[i])
      if(childSpanElement) {
        return childSpanElement
      }
    }
  } 
  return null
}

const tbody = $('.table')
tbody.addEventListener("click", e => {
  if(e.target.tagName === 'TD') {
    let spanElement = findSpan(e.target.parentNode)
    if(spanElement) {
      
      // Mendapatkan nilai ID dari elemen <span> dalam elemen <td> terakhir dari blok <tr> yang diklik
      const idTransaksi =  spanElement.textContent
      const dataArr = dataUang.filter(da => da.id === idTransaksi)[0];
      let id = dataUang.indexOf(dataArr);
      munculForm()
      $(".btn").classList.add('edit')
      $(".btn").setAttribute('data-id', id)
      $('.edit').textContent = 'Edit'
      $("#nominal").value = dataArr.nominal
      $(".tanggal").value = dataArr.tanggal
      $("textarea").value = dataArr.keterangan
      $("#jenis").value = dataArr.jenis
      let htmlAlokasi
      if (dataArr.alokasi === 'dompet') {
        htmlAlokasi = $('#ke-dompet')
      } else if (dataArr.alokasi === 'dana') {
        htmlAlokasi = $('#ke-e-dana')
      } else if (dataArr.alokasi === 'darurat') {
        htmlAlokasi = $('#ke-darurat')
      }
      htmlAlokasi.setAttribute("checked", "checked")
      $('.caption .trash').style.display = 'block'
      if (dataArr.jenis === 'masuk') {
        $("#kategori-masuk").value = dataArr.kategori
        kategoriKetikaMasuk()
      } else {
        $("#kategori-keluar").value = dataArr.kategori
        kategoriKetikaKeluar()
      }
    }
  }
});

// bagian menghapus
if ($('.btn') !== null) {
  $('.bi-trash').addEventListener('click', () => {
    if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
      dataUang.splice($('.btn').getAttribute('data-id'), 1)
      localStorage.setItem("dataUang", JSON.stringify(dataUang))
      window.location = 'index.html'
      $('bi-trash').style.display = 'none'
    }
  })
}

// menghitung saldo ke semua wadah uang
dataUang.map(du => {
  // console.log(du);
  if(du.alokasi === 'dompet' && du.jenis === 'masuk') {
    saldo.dompet += parseInt(du.nominal)
  } else if(du.alokasi === 'dompet' && du.jenis === 'keluar') {
    saldo.dompet -= parseInt(du.nominal)
  } else if(du.alokasi === 'darurat' && du.jenis === 'masuk') {
    saldo.darurat += parseInt(du.nominal)
  } else if(du.alokasi === 'darurat' && du.jenis === 'keluar') {
    saldo.darurat -= parseInt(du.nominal)
  } else if(du.alokasi === 'dana' && du.jenis === 'masuk') {
    saldo.dana += parseInt(du.nominal)
  } else if(du.alokasi === 'dana' && du.jenis === 'keluar') {
    saldo.dana -= parseInt(du.nominal)
  } 
})
// console.log(saldo.dompet);
$('.saldo').innerHTML = rupiah(saldo.dompet);

// menampilkan uang di figure laianya
$('.uang-di-dompet').textContent =  rupiah(saldo.dompet)
$('.uang-di-dana').textContent = rupiah(saldo.dana)
$('.uang-darurat').textContent = rupiah(saldo.darurat)
$('.total-semua-uang').textContent = rupiah(saldo.dompet + saldo.dana + saldo.darurat)






