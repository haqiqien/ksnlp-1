function bpe(){var ws=document.getElementById('bin').value.trim().split(/\s+/).filter(Boolean),n=+document.getElementById('bn').value,f={};
ws.forEach(function(w){f[w]=(f[w]||0)+1});var seqs=Object.keys(f).map(function(w){return{s:w.split('').concat(['_']),c:f[w]}}),h='<b>Awal:</b> '+seqs.map(function(q){return q.s.join(' ')+' (x'+q.c+')'}).join(' | ')+'<br>';
for(var i=1;i<=n;i++){var p={};seqs.forEach(function(q){for(var j=0;j<q.s.length-1;j++){var k=q.s[j]+'\u0001'+q.s[j+1];p[k]=(p[k]||0)+q.c}});
var b=null;for(var k in p)if(!b||p[k]>p[b])b=k;if(!b)break;var a=b.split('\u0001');
seqs.forEach(function(q){var o=[],j=0;while(j<q.s.length){if(j<q.s.length-1&&q.s[j]===a[0]&&q.s[j+1]===a[1]){o.push(a[0]+a[1]);j+=2}else{o.push(q.s[j]);j++}}q.s=o});
h+='<br><b>Merge '+i+':</b> ('+a[0]+', '+a[1]+') muncul '+p[b]+'x → <span class="tok">'+a[0]+a[1]+'</span>'}
h+='<br><br><b>Hasil akhir:</b><br>'+seqs.map(function(q){return q.s.map(function(t){return'<span class="tok">'+t+'</span>'}).join('')}).join('<br>');
document.getElementById('bout').innerHTML=h}
function mk(){var w=document.getElementById('min').value.trim().split(/\s+/),pool=w.slice(),out='';
var pick=Math.max(1,Math.round(w.length*0.15)),idx=[];while(idx.length<pick&&idx.length<w.length){var r=Math.floor(Math.random()*w.length);if(idx.indexOf(r)<0)idx.push(r)}
var lab='';w.forEach(function(x,i){if(idx.indexOf(i)<0){out+='<span class="tok">'+x+'</span>';return}
var r=Math.random();if(r<.8){out+='<span class="tok m">[MASK]</span>';lab+='80%: diganti [MASK], target "'+x+'"<br>'}
else if(r<.9){var y=pool[Math.floor(Math.random()*pool.length)];out+='<span class="tok m">'+y+'</span>';lab+='10%: diganti kata acak "'+y+'", target "'+x+'"<br>'}
else{out+='<span class="tok m">'+x+'</span>';lab+='10%: dibiarkan "'+x+'", tetap harus ditebak<br>'}});
document.getElementById('mout').innerHTML=out+'<br><small>'+lab+'</small>'}
var Q=[["Mengapa pretraining tidak memakai data berlabel?","Label mahal sehingga sulit di-scale",["Label mahal sehingga sulit di-scale","Label membuat model lambat","Model tidak bisa membaca label"],"Teks mentah tersedia hampir tanpa batas; label manusia membatasi skala."],
["Apa fungsi BPE?","Memecah kata langka menjadi subword agar tidak ada UNK",["Menerjemahkan kata","Memecah kata langka menjadi subword agar tidak ada UNK","Menghapus kata langka"],"Dalam kasus terburuk kata dipecah menjadi huruf."],
["Mengapa BERT tidak bisa memakai language modeling biasa?","Karena melihat konteks dua arah, sehingga mencontek",["Karena terlalu kecil","Karena melihat konteks dua arah, sehingga mencontek","Karena tidak punya embedding"],"Solusinya Masked LM."],
["Mengapa 10% token terpilih dibiarkan asli tetapi tetap ditebak?","Agar semua token punya representasi bagus dan mengurangi beda pretrain vs finetune",["Agar komputasi lebih cepat","Agar semua token punya representasi bagus dan mengurangi beda pretrain vs finetune","Agar model menghafal kalimat"],"Saat finetuning tidak ada [MASK]."],
["Objektif pretraining terbaik T5 menurut Raffel dkk.?","Span corruption",["Next sentence prediction","Span corruption","Prediksi kata berikutnya saja"],"Denoising mengalahkan LM biasa pada eksperimen mereka."],
["Arsitektur yang cocok untuk menghasilkan teks?","Decoder",["Encoder","Decoder","Embedding statis"],"Decoder membangun kata satu per satu dari kiri ke kanan."],
["Pelajaran utama dari Chinchilla?","Keseimbangan parameter dan token; model 70B bisa mengalahkan model lebih besar",["Model makin besar selalu menang","Keseimbangan parameter dan token; model 70B bisa mengalahkan model lebih besar","Data tidak penting"],"Chinchilla: 70B parameter, 1,4T token."],
["Apa itu in-context learning?","Model mengikuti contoh di prompt tanpa mengubah parameter",["Model mengubah bobot saat dipakai","Model mengikuti contoh di prompt tanpa mengubah parameter","Model dilatih ulang dari awal"],"Tidak ada gradient step."]];
var done={},sc=0;
Q.forEach(function(q,i){var d=document.createElement('div');d.className='q';d.innerHTML='<b>'+(i+1)+'. '+q[0]+'</b>';
q[2].slice().sort(function(){return Math.random()-.5}).forEach(function(o){var b=document.createElement('button');b.textContent=o;b.onclick=function(){if(done[i])return;done[i]=1;
var ok=o===q[1];if(ok)sc++;b.className=ok?'good':'bad';if(!ok)[].forEach.call(d.querySelectorAll('button'),function(x){if(x.textContent===q[1])x.className='good'});
var f=document.createElement('div');f.className='fb';f.textContent=(ok?'Benar. ':'Belum tepat. ')+q[3];d.appendChild(f);
document.getElementById('score').textContent='Skor: '+sc+' / '+Object.keys(done).length+' dijawab (total '+Q.length+')'};d.appendChild(b)});
document.getElementById('quiz').appendChild(d)});
var L=[].slice.call(document.querySelectorAll('nav a:not(.home-link)'));
addEventListener('scroll',function(){var c=L[0];L.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s&&s.getBoundingClientRect().top<140)c=a});L.forEach(function(a){a.classList.toggle('on',a===c)})});
document.getElementById('run-bpe').addEventListener('click',bpe);
document.getElementById('run-mask').addEventListener('click',mk);
