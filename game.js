
let d=JSON.parse(localStorage.getItem('xiantu'))||{
stone:999999,xp:0,realm:0,pet:false,sword:false
};
const realms=['炼气','筑基','金丹','元婴','化神','炼虚','合体','大乘','渡劫','真仙','仙王','仙帝'];

function log(t){document.getElementById('log').innerHTML=t+'<br>'+document.getElementById('log').innerHTML;}
function save(){localStorage.setItem('xiantu',JSON.stringify(d));}
function update(){
realm.innerText='境界：'+realms[d.realm];
xp.innerText='修为：'+d.xp;
stone.innerText='灵石：'+d.stone;
bag.innerHTML=(d.sword?'🗡️ 神器<br>':'')+(d.pet?'🐉 灵兽白狐':'');
save();
}
function cultivate(){
d.xp+=1000+(d.pet?2000:0)+(d.sword?3000:0);
log('修炼获得修为');
update();
}
function breakthrough(){
let need=(d.realm+1)*10000;
if(d.xp>=need && d.realm<realms.length-1){
d.realm++;
log('突破到 '+realms[d.realm]);
}else log('修为不足');
update();
}
function buySword(){
if(d.sword)return log('已拥有神器');
d.stone-=50000; d.sword=true; log('获得神器'); update();
}
function buyFox(){
if(d.pet)return log('已拥有灵兽');
d.stone-=100000; d.pet=true; log('获得灵兽白狐'); update();
}
setInterval(()=>{
d.xp+=500;
d.stone+=1000;
update();
},1000);
update();
