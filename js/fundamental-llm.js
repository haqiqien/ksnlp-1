const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// tema & progres
addEventListener('scroll',()=>{const h=document.documentElement;$('#bar').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
 let cur='';$$('main section').forEach(s=>{if(s.getBoundingClientRect().top<150)cur=s.id});$$('nav a:not(.home-link)').forEach(a=>a.classList.toggle('on',a.hash==='#'+cur))});
// 1. next-word
const W=[['on',.45],['off',.44],['in',.01],['at',.01],['too',.01],['...',.08]];
function nw(){const k=+$('#k').value;$('#kv').textContent=k;
 $('#nwb').innerHTML=W.map((w,i)=>`<div class="bar ${i<k?'':'off'}"><span>${w[0]}</span><i style="width:${w[1]*300}px"></i><span>${w[1]}</span></div>`).join('')}
$('#k').oninput=nw;nw();
$('#samp').onclick=()=>{const k=+$('#k').value,p=W.slice(0,Math.min(k,5)),t=p.reduce((a,b)=>a+b[1],0);let r=Math.random()*t,c;for(c of p){r-=c[1];if(r<=0)break}
 $('#out').textContent='The light was '+c[0]+' …  (dipilih dari top-'+k+' setelah probabilitasnya dinormalisasi ulang)'};
// 2. CBOW vs skipgram
const SG={cbow:['<span class="box">Apples</span><span class="box">are</span><span class="box t">___</span><span class="box">and</span><span class="box">juicy</span> ⟶ prediksi: <span class="box t">sweet</span>','CBOW: konteks (kata sekitar) dijumlahkan, lalu menebak kata TENGAH. Cepat, bagus untuk kata umum.'],
 skip:['<span class="box t">sweet</span> ⟶ prediksi: <span class="box">Apples</span><span class="box">are</span><span class="box">and</span><span class="box">juicy</span>','Skip-gram: dari satu kata TENGAH, menebak banyak kata konteks. Lebih lambat, tetapi lebih baik untuk kata langka.']};
$$('[data-sg]').forEach(b=>b.onclick=()=>{$$('[data-sg]').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#sgd').innerHTML=SG[b.dataset.sg][0]+'<p>'+SG[b.dataset.sg][1]+'</p>'});
$('[data-sg=cbow]').click();
// 3. bank
const BK=[['I deposited cash at the bank.','Lembaga keuangan'],['We sat on the river bank.','Tepi sungai'],['The plane made a sharp bank to the left.','Manuver pesawat (miring)']];
$('#bk').innerHTML=BK.map((b,i)=>`<button data-b="${i}">${b[0]}</button>`).join('');
$$('[data-b]').forEach(x=>x.onclick=()=>{const b=BK[x.dataset.b];$('#bko').innerHTML=`<b>GloVe/Word2Vec:</b> "bank" = <code>[0.21, -0.4, …]</code> (SELALU sama).<br><b>BERT:</b> "bank" di kalimat ini → <code>vektor khusus</code> yang dekat dengan makna "<b>${b[1]}</b>".`});
// 4. scaling law
const cv=$('#cv'),cx=cv.getContext('2d');
function sc(){const e=+$('#n').value,N=10**e;$('#nv').textContent='10^'+e.toFixed(1)+' ≈ '+(N>=1e9?(N/1e9).toFixed(1)+' B':(N/1e6).toFixed(0)+' M')+' parameter';
 const L=n=>Math.pow(n/8.8e13,-.076);$('#lv').textContent='Loss L(N) = (N / 8.8·10¹³)^−0.076 = '+L(N).toFixed(2);
 const w=cv.width=640,h=cv.height=300;cx.clearRect(0,0,w,h);const css=getComputedStyle(document.body);cx.fillStyle=css.color;cx.font='13px sans-serif';
 const X=v=>50+(v-5)/(12-5)*570,Y=l=>270-(l-1.6)/(5.8-1.6)*250;
 cx.strokeStyle='#8893a0';cx.beginPath();cx.moveTo(50,10);cx.lineTo(50,270);cx.lineTo(620,270);cx.stroke();
 cx.fillText('log10(parameter)',280,292);cx.fillText('loss',8,20);for(let v=5;v<=12;v++){cx.fillText(v,X(v)-4,285)}
 cx.strokeStyle='#2a7fd4';cx.lineWidth=2;cx.beginPath();for(let v=5;v<=12;v+=.1){const x=X(v),y=Y(L(10**v));v===5?cx.moveTo(x,y):cx.lineTo(x,y)}cx.stroke();
 cx.fillStyle='#f9c80e';cx.strokeStyle='#000';cx.beginPath();cx.arc(X(e),Y(L(N)),7,0,7);cx.fill();cx.stroke()}
$('#n').oninput=sc;sc();
// 5. ICL
const IC={zero:'Translate English to French:\ncheese =>',one:'Translate English to French:\nsea otter => loutre de mer\ncheese =>',few:'Translate English to French:\nsea otter => loutre de mer\npeppermint => menthe poivrée\nplush giraffe => girafe peluche\ncheese =>',ft:'(Fine-tuning) Ratusan/ribuan contoh dipakai untuk\nGRADIENT UPDATE → bobot model BERUBAH.\nBaru kemudian: cheese =>'};
$$('[data-ic]').forEach(b=>b.onclick=()=>{$$('[data-ic]').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#icp').textContent=IC[b.dataset.ic]});$('[data-ic=zero]').click();
// 6. RLHF
const RL=[['Langkah 1 – SFT','Manusia menulis jawaban ideal untuk banyak prompt (mis. "Jelaskan pendaratan di bulan ke anak 6 tahun"). Model dasar di-fine-tune dengan data ini → model yang mulai "menurut instruksi".'],
['Langkah 2 – Reward Model','Untuk satu prompt, model menghasilkan beberapa jawaban. Manusia MERANKING (D > C > A = B). Data ranking ini melatih reward model: sebuah "juri otomatis" yang memberi skor.'],
['Langkah 3 – Optimasi PPO','Policy (LLM) menghasilkan jawaban → reward model memberi skor → skor dipakai memperbarui policy dengan PPO. Diulang ribuan kali. Inilah "reinforcement learning".']];
$$('[data-rl]').forEach(b=>b.onclick=()=>{$$('[data-rl]').forEach(x=>x.classList.remove('on'));b.classList.add('on');const r=RL[b.dataset.rl];$('#rld').innerHTML='<b>'+r[0]+'</b><p>'+r[1]+'</p>'});$('[data-rl="0"]').click();
// 7. overlap
function ov(){const t=s=>s.toLowerCase().replace(/[^\w\s]/g,'').split(/\s+/).filter(Boolean),r=t($('#ref').value),g=t($('#gen').value);
 const rc={};r.forEach(w=>rc[w]=(rc[w]||0)+1);let m=0;g.forEach(w=>{if(rc[w]>0){m++;rc[w]--}});
 const p=g.length?m/g.length:0,c=r.length?m/r.length:0,f=p+c?2*p*c/(p+c):0;
 $('#ovo').innerHTML=`Kata cocok: <b>${m}</b> · Precision <b>${p.toFixed(2)}</b> · Recall <b>${c.toFixed(2)}</b> · F1 <b>${f.toFixed(2)}</b>`}
$('#ref').oninput=$('#gen').oninput=ov;ov();
// 8. kuis
const Q=[['Apa yang dihitung language model?',['Probabilitas kata berikutnya (atau urutan kata)','Jumlah kata dalam kalimat','Terjemahan kata'],0,'LM memberi probabilitas pada tiap kemungkinan token berikutnya.'],
['Kelemahan utama Word2Vec/GloVe?',['Terlalu lambat','Representasi statis: satu kata satu vektor','Tidak bisa dilatih tanpa label'],1,'"bank" selalu punya vektor yang sama, apapun konteksnya.'],
['Dua tugas pretraining BERT di slide?',['Masked LM dan Next Sentence Prediction','SFT dan RLHF','CBOW dan Skip-gram'],0,'Ingat juga: NSP kemudian dianggap kurang berguna (RoBERTa).'],
['Inti scaling laws (Kaplan 2020)?',['Loss turun mengikuti power law saat parameter, data, compute naik','Model kecil selalu lebih baik','Loss tidak berhubungan dengan ukuran'],0,'Penurunan loss dapat diprediksi, tetapi loss ≠ kemampuan tugas.'],
['Apa beda in-context learning dan fine-tuning?',['ICL memperbarui bobot, fine-tuning tidak','ICL belajar dari contoh di prompt tanpa update bobot','Keduanya sama'],1,'Pada ICL tidak ada gradient update.'],
['Urutan RLHF yang benar?',['PPO → Reward Model → SFT','SFT → Reward Model → PPO','Reward Model → SFT → PPO'],1,'Demonstrasi (SFT), lalu perbandingan (RM), lalu optimasi (PPO).'],
['Masalah umum LLM-as-judge?',['Bias panjang jawaban, posisi, dan self-bias','Selalu lebih mahal dari manusia','Tidak pernah cocok dengan manusia'],0,'Murah dan berkorelasi tinggi, tetapi punya bias spurious.'],
['Mengapa BLEU/ROUGE tidak cukup untuk teks open-ended?',['Hanya mengukur kemiripan kata, bukan makna','Terlalu lambat','Butuh GPU'],0,'Kalimat bermakna sama tapi beda kata akan dapat skor rendah.']];
let sc2=0,dn=0;$('#quiz').innerHTML=Q.map((q,i)=>`<div class="q card"><b>${i+1}. ${q[0]}</b>${q[1].map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join('')}<div class="ex"></div></div>`).join('');
$$('.q').forEach((el,i)=>el.querySelectorAll('input').forEach(inp=>inp.onchange=()=>{if(el.dataset.d)return;el.dataset.d=1;dn++;const v=+inp.value,q=Q[i];
 el.querySelectorAll('label').forEach((l,j)=>{if(j===q[2])l.classList.add('ok');else if(j===v)l.classList.add('no')});
 if(v===q[2])sc2++;el.querySelector('.ex').textContent=(v===q[2]?'Benar. ':'Kurang tepat. ')+q[3];$('#score').textContent=`Skor: ${sc2}/${dn} dijawab dari ${Q.length}`}));
