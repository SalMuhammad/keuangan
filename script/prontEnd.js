//import * as say from './function.js';
import {$, munculForm, closes, tambahData } from './function.js';



$('#muncul').addEventListener('click', munculForm)
  $('#tanggal').setAttribute('value',new Date())
$('.close').addEventListener('click', ()=>{
  closes()
  $("form").reset()
})
	

//ketikaBtnDiKlik()
$(".btn").addEventListener('click', e =>{
    tambahData()
    e.preventDefault()
   // closes()
 })

//  ketika toggle di klik
$('.toggle').addEventListener('click',()=>{
  $('.side-bar').classList.toggle('hidden')
  $('.toggle').classList.toggle('bi-x')
  $('.toggle').classList.toggle('bi-three-dots-vertical')
  $('.toggle').classList.toggle('text-oren')
})





$('.nav-lainnya').onclick = function(e){
  $('.figure-darurat').classList.toggle('hidden')
}

$('.cls').onclick = function(e){
  $('.figure-darurat').classList.toggle('hidden')
  // alert('ik')
}

// $('.nav-lainnya').onclick = function(e){
//   if(e.target.classList.constains === 'ada'){
//     $('.figure-darurat').classList.remove('hidden')
//   }else if(e.target.classList.constains === 'cls'){
//     $('.figure-darurat').classList.add('hidden')

//   }
// }

// toggle