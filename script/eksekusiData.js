import {
  pengecekanSelect,
  ubahFormatData,
  pilihBulanIni,
  susunDataPerhariDariBulan,
  tampilkanData,
  $,
  munculForm,
  kategoriKetikaMasuk,
  kategoriKetikaKeluar,
  cetakNominall,
  tambahData,
  // pemasukanPerbulan,
  // saldo,
  rupiah,
  pindahUang

} from './function.js';
//export let admin = document.querySelector('#admin-dana-ke-cash').value
import {saldo, namaBulan} from './data_base.js'

// console.log(saldo);
//import {} from './prontEnd.js'

export let dataUang = JSON.parse(localStorage.getItem("dataUang")) || []


pengecekanSelect()

// ubah Array Data uang menjadi di rangkum berdasarkan tahun, bulan dan hari
const semuaData = ubahFormatData(dataUang)

const sekarang = new Date()
let tahunKlik = sekarang.getFullYear();9
let bulanKlik = sekarang.getMonth() + 1;

//memilih bulan sekarang saja untuk di tampilkan
let thisMonth = pilihBulanIni(semuaData, tahunKlik, bulanKlik)
// console.log(thisMonth)
//membalikan urutan isi bulan sekarang
let hariPerBulan = susunDataPerhariDariBulan(thisMonth)

if (hariPerBulan && Array.isArray(hariPerBulan)) {  // mengecek apakah array isi hariPerBulan ada isinya?
  tampilkanData(hariPerBulan);
  cetakNominall(hariPerBulan);
}

// Bagian toggle sorting data
$('.icon-sorting').addEventListener('click', () => {
  if (hariPerBulan && Array.isArray(hariPerBulan)) { // mengecek apakah array isi hariPerBulan ada isinya?
    const isAscending = !$('.icon-sorting').classList.contains('bi-sort-numeric-up'); // mengecek elemen $('.icon-sorting') apakah tidak memiliki class bi-sort-numeric-up
    const sortedData = isAscending ? 
                      hariPerBulan.slice().reverse() :  // jika class bi-sort-numeric-up tidak ada maka balikan datanya dari 9 ke 1
                      hariPerBulan.slice();
    tampilkanData(sortedData);
    cetakNominall(sortedData);
  }
});

// tahunKlik = new Date().getFullYear(); 
// bulanKlik = new Date().getMonth() + 1
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
  hariPerBulan = susunDataPerhariDariBulan(pilihBulanIni(semuaData, tahunKlik, bulanKlik));
  if (hariPerBulan && Array.isArray(hariPerBulan)) {
    hariPerBulan
  }
  tampilkanData(hariPerBulan)
  cetakNominall(hariPerBulan)
  // $  ('.saldo').innerHTML = rupiah(saldo)
  // $('.nominal-masuk').innerHTML = rupiah(pemasukanPerbulan)
  // $('.nominal-keluar').innerHTML = rupiah( )
});


//1. menambah fitur hapus dan edit
//2.   ~"~    dropdown seting
//3. membuat diagram garis


//* fungsi untuk mencari element <span> di dalam element <td>
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
})

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

// // menghitung saldo ke semua wadah uang

// dataUang.map(du => {
//   const nominal = parseInt(du.nominal);
//   switch (du.alokasi) {
//     case 'dompet':
//       if (du.jenis === 'masuk') saldo.dompet += nominal;
//       else if (du.jenis === 'keluar') saldo.dompet -= nominal;
//       break;
//     case 'darurat':
//       if (du.jenis === 'masuk') saldo.darurat += nominal;
//       else if (du.jenis === 'keluar') saldo.darurat -= nominal;
//       break;
//     case 'dana':
//       if (du.jenis === 'masuk') saldo.dana += nominal;
//       else if (du.jenis === 'keluar') saldo.dana -= nominal;
//       break;
//     case 'transfer':
//       if (du.alokasi === 'cash-ke-dana') {
//         saldo.dompet -= nominal;
//         saldo.dana += nominal;
//       } else if (du.alokasi === 'cash-ke-darurat') {
//         saldo.dompet -= nominal;
//         saldo.darurat += nominal;
//       } else if (du.alokasi === 'dana-ke-cash') {
//         saldo.dana -= nominal;
//         saldo.dompet += nominal;
//       } else if (du.alokasi === 'dana-ke-darurat') {
//         saldo.dana -= nominal;
//         saldo.darurat += nominal;
//       } else if (du.alokasi === 'darurat-ke-cash') {
//         saldo.darurat -= nominal;
//         saldo.dompet += nominal;
//       } else if (du.alokasi === 'darurat-ke-dana') {
//         saldo.darurat -= nominal;
//         saldo.dana += nominal;
//       }
//       break;
//     default:
//       break;
//   }
// });


dataUang.map(du => {
  const jenisMasuk = du.jenis === 'masuk';
  const nominal = parseInt(du.nominal);

  switch (du.alokasi) {
    case 'dompet':
      saldo.dompet += jenisMasuk ? nominal : -nominal;
      break;
    case 'darurat':
      saldo.darurat += jenisMasuk ? nominal : -nominal;
      break;
    case 'dana':
      saldo.dana += jenisMasuk ? nominal : -nominal;
      break;
    default:
      break;
  }
  // menghitung transaksi
  if(du.jenis === 'transfer') {
    if(du.alokasi === 'cash-ke-dana') {
      saldo.dompet -= parseInt(du.nominal)
      saldo.dana += parseInt(du.nominal)
    } else if(du.alokasi === 'cash-ke-darurat') {
      saldo.dompet -= parseInt(du.nominal)
      saldo.darurat += parseInt(du.nominal)
    } 
    
    else if(du.alokasi === 'dana-ke-cash') {
      saldo.dana -= parseInt(du.nominal)
      saldo.dompet+= parseInt(du.nominal)
    } else if(du.alokasi === 'dana-ke-darurat') {
      saldo.dana -= parseInt(du.nominal)
      saldo.darurat+= parseInt(du.nominal)
    } 

    else if(du.alokasi === 'darurat-ke-cash') {
      saldo.darurat -= parseInt(du.nominal)
      saldo.dompet += parseInt(du.nominal)
    } 
    else if(du.alokasi === 'darurat-ke-cash') {
      saldo.darurat -= du.nominal
      saldo.dana += du.nominal
    } 
  }
})

// localStorage.clear()





// menampilkan uang di figure laianya
$('.saldo').innerHTML = rupiah(saldo.dompet);
$('.uang-di-dompet').textContent =  rupiah(saldo.dompet)
$('.uang-di-dana').textContent = rupiah(saldo.dana)
$('.uang-darurat').textContent = rupiah(saldo.darurat)
$('.total-semua-uang').textContent = rupiah(saldo.dompet + saldo.dana + saldo.darurat)

// menjalankan interaksi transaksi
$('#btn-cash-ke-dana').addEventListener('click', () => {
  pindahUang($('input#cash-ke-dana'), 'cash-ke-dana', 'tf cash ke dana', parseInt($('#admin-cash-ke-dana').value))
})
$('#btn-cash-ke-darurat').addEventListener('click', () => {
  pindahUang($('input#cash-ke-darurat'), 'cash-ke-darurat', 'tf cash ke darurat')
})
//----------------------------------------------------------
$('#btn-dana-ke-cash').addEventListener('click', () => {
  pindahUang($('input#dana-ke-cash'), 'dana-ke-cash', 'dana ke cash', parseInt($('#admin-dana-ke-cash').value))
})
$('#btn-dana-ke-darurat').addEventListener('click', () => {
  pindahUang($('input#dana-ke-darurat'), 'dana-ke-darurat', 'tf dana ke darurat', parseInt($('#admin-dana-ke-darurat').value))
})
//----------------------------------------------------------
$('#btn-darurat-ke-cash').addEventListener('click', () => {
  pindahUang($('input#darurat-ke-cash'), 'daruat-ke-cash', 'daruat ke cash')
})
$('#btn-darurat-ke-dana').addEventListener('click', () => {
  pindahUang($('input#darurat-ke-dana'), 'darurat-ke-dana', 'tf darurat ke dana', parseInt($('#admin-darurat-ke-dana')))
})



