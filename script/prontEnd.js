//import * as say from './function.js';
import {
  $,
  munculForm,
  closes,
  tambahData, 
  clossSidebar 
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
  clossSidebar()
})

// perilaku side bar
// ketika linnya di klik
$('.side-bar li:nth-child(2)').onclick = function(){
  window.location = 'grafik.html'
}
$('.nav-lainnya').onclick = function(){
  $('.figure-darurat').classList.toggle('hidden')
}
// $('.side-bar').addEventListener('click', function(e) {
//   console.log(e.target)
//   if(e.target.classList.className ==='nav-lainnya') {
//   }
// })

$('.cls').onclick = function(e){
  $('.figure-darurat').classList.toggle('hidden')
  clossSidebar()
}

// $('.nav-lainnya').onclick = function(e){
//   if(e.target.classList.constains === 'ada'){
//     $('.figure-darurat').classList.remove('hidden')
//   }else if(e.target.classList.constains === 'cls'){
//     $('.figure-darurat').classList.add('hidden')

//   }
// }

// .saldo