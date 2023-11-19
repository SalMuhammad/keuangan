//import * as say from './function.js';
import {
  $,
  munculForm,
  closes,
  close,
  muncul,
  tambahData, 
  // clossSidebar 
} from './function.js';



$('#muncul').addEventListener('click', munculForm)

$('#tanggal').setAttribute('value',new Date())
$('.close').addEventListener('click', ()=>{
  closes()
  $("form").reset()
})
	

//ketikaBtnDiKlik()
$(".btn").addEventListener('click', e =>{
    tambahData()
    e.preventDefault();
 })

//  ketika toggle di klik menmabahkan atau menyimpan data
$('.toggle').addEventListener('click',()=>{
  // clossSidebar()
  $('.side-bar').classList.toggle('-translate-x-0')
  $('.layer').classList.toggle('hidden')
})

// perilaku side bar
// ketika linnya di klik
$('.side-bar li:nth-child(2)').onclick = function(){
  window.location = 'grafik.html'
}

// -------------------------------------------------------------------------
// bagian memunculkan dan mengclose elemen

// memunculkan seting
$('.ul-side-bar ul li:nth-child(4)').addEventListener('click', () => muncul($('.seting'))) 
// menghilangkan seting
$('.bi-arrow-left').addEventListener('click', () => close($('.seting'))) 
// memunculkan semua aset uang
document.addEventListener('click', e => {
  document.addEventListener('click', e => {
    // memunculkan elemen semua aset
    const liElement = e.target.closest('.tbl-semua-aset');
    const isClickedInsideLi = liElement !== null;
    if(isClickedInsideLi) {
      muncul($('.elm-semua-aset'))
      // close($('.seting'))
      // console.log($('.elm-semua-aset'))
    } 
  });
})

// $('').addEventListener('click', () =>) 
// menghilangkan semua aset
$('.elm-semua-aset .bi-arrow-left').addEventListener('click', () => close($('.elm-semua-aset'))) 


// $('.close').onclick = function(e){
//   $('.figure-darurat').classList.toggle('hidden')
//   // clossSidebar()
//   $('.side-bar').classList.toggle('hidden')
// }

// $('.nav-lainnya').onclick = function(e){
//   if(e.target.classList.constains === 'ada'){
//     $('.figure-darurat').classList.remove('hidden')
//   }else if(e.target.classList.constains === 'cls'){
//     $('.figure-darurat').classList.add('hidden')

//   }
// }

// .saldo bi bi-three-dots-vertical toggle cls
// $('.pengaturan details').classList.remove('list-none')
// nav-lainya toggle