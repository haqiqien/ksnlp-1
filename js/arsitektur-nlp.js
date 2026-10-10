const $=id=>document.getElementById(id);
addEventListener('scroll',()=>{const h=document.documentElement;$('bar').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
const fmt=n=>n.toLocaleString('id-ID');
function calcP(){const V=+$('pv').value,H=+$('ph').value,e=V*H,w=H*H,o=H*V,t=e+w+o;
$('pout').innerHTML=`E = ${fmt(e)} • Wʰ = ${fmt(w)} • Wᵒᵘᵗ = ${fmt(o)}<br><b>Total ≈ ${fmt(t)}</b> (E+Wᵒᵘᵗ = ${(100*(e+o)/t).toFixed(1)}% dari total). Jika LSTM: sekitar 4× pada bagian recurrent.`}
function calcG(){const f=+$('gf').value,n=+$('gn').value,v=Math.pow(f,n);
$('gout').innerHTML=`Gradien sisa setelah ${n} langkah ≈ <b>${v.toExponential(2)}</b> `+(v<1e-3?'<span class="bad">(praktis hilang → vanishing)</span>':v>1e3?'<span class="bad">(meledak → exploding)</span>':'<span class="good">(masih terjaga)</span>')}
function bars(arr,labels,el){el.innerHTML=arr.map((a,i)=>`<div class="brow"><span>${labels[i]}</span><div class="bar" style="width:${a*250}px"></div><span>${a.toFixed(3)}</span></div>`).join('')}
function sm(a){const m=Math.max(...a),e=a.map(x=>Math.exp(x-m)),s=e.reduce((x,y)=>x+y);return e.map(x=>x/s)}
function smDemo(){const s=['e1','e2','e3'].map(i=>+$(i).value);bars(sm(s),['α₁','α₂','α₃'],$('smout'))}
['e1','e2','e3'].forEach(i=>$(i).oninput=smDemo);smDemo();
function scaleDemo(){const d=+$('dk').value,b=[1,0.5,0],s=b.map(x=>x*Math.sqrt(d)*1.5);
$('scout').innerHTML='<b>Tanpa scaling</b>';const a=document.createElement('div'),c=document.createElement('div');
$('scout').append(a);const t=document.createElement('b');t.textContent='Dengan ÷√dₖ';$('scout').append(t,c);
bars(sm(s),['skor 1','skor 2','skor 3'],a);bars(sm(s.map(x=>x/Math.sqrt(d))),['skor 1','skor 2','skor 3'],c)}
scaleDemo();
const T=['Hewan','itu','tidak','menyeberang','jalan','karena','ia','lelah'];
function row(q){let w=T.map((_,j)=>Math.exp(-Math.abs(q-j)*0.9));
if(q==6)w=[5,.3,.3,.4,1,.3,1,2.2];if(q==3)w=[1.5,.3,.8,1.2,2.5,.2,.2,.2];
const s=w.reduce((a,b)=>a+b);return w.map(x=>x/s)}
function pick(q){document.querySelectorAll('.tok').forEach((e,i)=>e.classList.toggle('sel',i==q));bars(row(q),T,$('attout'))}
$('toks').innerHTML=T.map((t,i)=>`<span class="tok" onclick="pick(${i})">${t}</span>`).join('');pick(6);
function mk(on){const n=['Saya','suka','makan','nasi','goreng'];let h='<div></div>'+n.map(x=>`<div class="cell" style="background:none;color:inherit">${x}</div>`).join('');
n.forEach((a,i)=>{h+=`<div class="cell" style="background:none;color:inherit;text-align:left">${a}</div>`;n.forEach((b,j)=>h+=`<div class="cell ${on&&j>i?'x':''}">${on&&j>i?'−∞':'ok'}</div>`)});$('mask').innerHTML=h}
mk(true);
(function(){const c=$('pe'),x=c.getContext('2d'),W=c.width/128,H=c.height/50;
for(let p=0;p<50;p++)for(let d=0;d<128;d++){const i=Math.floor(d/2),a=p/Math.pow(10000,2*i/128),v=d%2?Math.cos(a):Math.sin(a);
const r=v>0?255-v*200:255+v*0,g=255-Math.abs(v)*120,b=v<0?255+v*200:255-v*80;x.fillStyle=`rgb(${r|0},${g|0},${b|0})`;x.fillRect(d*W,p*H,W+.5,H+.5)}})();
const Q=[["Mengapa Transformer membutuhkan positional encoding?",["Agar training lebih cepat","Karena self-attention tidak punya notasi urutan kata","Untuk mengurangi jumlah parameter"],1],
["Fungsi pembagian √dₖ pada scaled dot-product attention?",["Mencegah softmax jenuh dan gradien hilang","Mempercepat MatMul","Menambah jumlah head"],0],
["Pada encoder-decoder attention, Key dan Value berasal dari…",["Decoder","Output akhir encoder","Positional encoding"],1],
["Kelemahan utama Seq2Seq tanpa attention?",["Tidak bisa dilatih","Satu context vector berukuran tetap menjadi bottleneck","Tidak memakai softmax"],1],
["Model berikut yang encoder-only dan dua arah?",["GPT","BERT","GRU"],1],
["Mengapa LSTM lebih tahan vanishing gradient dibanding RNN?",["Cell state diperbarui lewat penjumlahan dengan kontrol gate","Memiliki lebih sedikit parameter","Tidak memakai fungsi aktivasi"],0]];
$('quiz').innerHTML=Q.map((q,i)=>`<div class="q"><b>${i+1}. ${q[0]}</b>`+q[1].map((o,j)=>`<label><input type="radio" name="q${i}" onchange="ans(${i},${j})"> ${o}</label>`).join('')+`<div id="r${i}"></div></div>`).join('');
function ans(i,j){$('r'+i).innerHTML=j==Q[i][2]?'<span class="good">Benar!</span>':'<span class="bad">Belum tepat. Jawaban: '+Q[i][1][Q[i][2]]+'</span>'}
document.getElementById('calc-params').addEventListener('click',calcP);
document.getElementById('calc-gradient').addEventListener('click',calcG);
document.getElementById('dk').addEventListener('change',scaleDemo);
document.getElementById('mask-on').addEventListener('click',()=>mk(true));
document.getElementById('mask-off').addEventListener('click',()=>mk(false));
