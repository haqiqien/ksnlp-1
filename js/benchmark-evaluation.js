const soal=[
["Mengapa 'Heck no!' bisa dapat skor n-gram tinggi terhadap referensi 'Heck yes!'?","Metrik n-gram hanya menghitung kata yang sama, bukan makna",["Karena maknanya mirip","Metrik n-gram hanya menghitung kata yang sama, bukan makna","Karena model BERT dipakai"],"Overlap kata 'Heck' tinggi, padahal artinya berlawanan (false positive). Sebaliknya 'Yup.' bermakna sama tapi skor 0 (false negative)."],
["Hasil HANS menunjukkan model NLI akurat di kasus heuristik berhasil tapi sangat rendah di kasus heuristik gagal. Artinya?","Model belajar shortcut dataset, bukan task NLI",["Model benar-benar paham NLI","Model belajar shortcut dataset, bukan task NLI","HANS terlalu mudah"],"Akurasi tinggi di test in-domain bisa menipu. Model memakai heuristik sederhana seperti lexical overlap."],
["Di CNN/Daily Mail, ROUGE dan faithfulness...","Tidak berkorelasi",["Berkorelasi kuat","Tidak berkorelasi","Selalu sama"],"Metrik berbasis referensi hanya sebaik referensinya. Model yang dilatih pada referensi malah bisa kurang faithful."],
["Bias apa yang perlu diwaspadai pada LM-as-judge?","Preferensi jawaban panjang, bias posisi, self-bias",["Preferensi jawaban panjang, bias posisi, self-bias","Hanya bias bahasa","Tidak ada bias"],"Ini spurious correlation lagi: evaluator menyukai fitur dangkal, bukan kualitas."],
["Apa kelemahan utama deteksi contamination (Min-k-prob, exchangeability)?","Tidak andal bila teks hanya muncul sekali di data training",["Terlalu mahal","Tidak andal bila teks hanya muncul sekali di data training","Hanya untuk kode"],"Exchangeability bergantung pada duplikasi di data training. Min-k-prob bersifat heuristik (berapa batas 'terlalu tinggi'?)."],
["Pass@k pada HumanEval berarti...","Minimal satu dari k output lolos semua test case",["Rata-rata k output benar","Minimal satu dari k output lolos semua test case","k test case dijalankan"],"Kode unik karena bisa dievaluasi otomatis dengan test case."]
];
const box=document.getElementById('kuis');let skor=0,jawab=0;
soal.forEach((s,i)=>{const d=document.createElement('div');d.className='q';
d.innerHTML=`<b>${i+1}. ${s[0]}</b>`;
s[2].forEach(o=>{const b=document.createElement('button');b.textContent=o;
b.onclick=()=>{d.querySelectorAll('button').forEach(x=>{x.disabled=true;if(x.textContent===s[1])x.classList.add('ok')});
if(o===s[1])skor++;else b.classList.add('no');jawab++;e.style.display='block';
document.getElementById('skor').textContent=`Skor: ${skor}/${jawab} dijawab (dari ${soal.length})`};d.appendChild(b)});
const e=document.createElement('div');e.className='exp';e.textContent='Penjelasan: '+s[3];d.appendChild(e);box.appendChild(d)});
