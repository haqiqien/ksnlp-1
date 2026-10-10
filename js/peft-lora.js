const $=id=>document.getElementById(id),R=document.documentElement;
$('th').onclick=()=>R.dataset.t=R.dataset.t==='dark'?'':'dark';
function calc(){const d=+$('d').value,k=+$('k').value,r=+$('r').value,n=+$('n').value||1,f=d*k*n,l=(d*r+r*k)*n,f2=x=>x.toLocaleString('id-ID');
$('out').innerHTML=`Full fine-tuning: <b>${f2(f)}</b> parameter<br>LoRA: <b>${f2(l)}</b> parameter (A: ${f2(r*k*n)}, B: ${f2(d*r*n)})<br>Hanya <b>${(l/f*100).toFixed(2)}%</b> dari full fine-tuning, atau ${(f/l).toFixed(1)}× lebih hemat.`}
['d','k','r','n'].forEach(i=>$(i).oninput=calc);calc();
const Q=[["Parameter mana yang diupdate saat melatih LoRA?",["W₀ saja","A dan B saja","Semua parameter","Hanya embedding"],1,"W₀ dibekukan; hanya A dan B yang punya gradien."],
["Mengapa B diinisialisasi nol?",["Agar training lebih cepat","Agar ΔW = 0 di awal, model sama dengan pretrained","Agar rank turun","Agar tidak perlu α"],1,"BA = 0 saat awal, jadi perilaku awal model tidak berubah."],
["Mengapa LoRA tidak menambah latensi inferensi?",["Karena memakai 4-bit","Karena BA dapat digabung ke W₀","Karena tidak ada A","Karena hanya di input"],1,"Penjumlahan W₀ + αBA dihitung sekali di muka."],
["Prompt tuning paling baik pada kondisi...",["Model kecil","Model sangat besar","Tanpa input","Data tanpa label"],1,"Pada skala ~10 miliar parameter ia menyamai model tuning."],
["Yang termasuk perspektif 'Function' adalah...",["Pruning","LoRA","Adapter","Prefix-tuning"],2,"Adapter menyisipkan fungsi/modul baru antar-layer."],
["Apa tambahan utama QLoRA terhadap LoRA?",["Kuantisasi 4-bit dan paged optimizer","Rank lebih tinggi","Adapter baru","Dropout otomatis"],0,"NF4 + paged optimizer menghemat memori GPU."]];
let sc=0,ans=0;$('quiz').innerHTML=Q.map((q,i)=>`<div class="card q"><b>${i+1}. ${q[0]}</b>${q[1].map((o,j)=>`<button data-i="${i}" data-j="${j}">${o}</button>`).join('')}<small id="e${i}"></small></div>`).join('');
$('quiz').onclick=e=>{const b=e.target.closest('button');if(!b||b.parentNode.dataset.done)return;const i=+b.dataset.i,j=+b.dataset.j,q=Q[i];b.parentNode.dataset.done=1;ans++;
if(j===q[2]){sc++;b.classList.add('y')}else{b.classList.add('n');b.parentNode.children[q[2]+1].classList.add('y')}
$('e'+i).textContent=q[3];$('score').textContent=`Skor: ${sc}/${Q.length} (terjawab ${ans})`};
const L=[...document.querySelectorAll('nav a')],S=L.map(a=>$(a.hash.slice(1)));
addEventListener('scroll',()=>{const h=R.scrollHeight-innerHeight;$('bar').style.width=(scrollY/h*100)+'%';let c=0;S.forEach((s,i)=>{if(s.getBoundingClientRect().top<120)c=i});L.forEach((a,i)=>a.classList.toggle('on',i===c))});
