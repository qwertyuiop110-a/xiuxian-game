const realms=['炼气一层','炼气二层','炼气三层','筑基初期','筑基中期','金丹初期','元婴初期','化神期','炼虚期','合体期','大乘期','渡劫期','真仙','仙王','仙帝'];
let d=JSON.parse(localStorage.getItem('xiuxian_v7'))||{
stone:999999,jade:999999,xp:0,realm:0,power:1589642,petLevel:1,sect:'散修',sectLv:0,contrib:0,dunLv:1,ticket:10,daily:'',
weapon:'新手神剑',armor:'青云法袍',ring:'玄天戒',treasure:'无',breakStone:0,herb:100,ore:100,partner:'暂无',love:0,title:'初入仙途',
bag:['聚气丹 x99','神器宝箱 x1','灵兽蛋 x1'],ach:['开局豪礼'],last:Date.now()
};
function need(){return Math.floor(1000*Math.pow(1.55,d.realm))}
function log(t){let e=document.getElementById('log');e.innerHTML='【'+new Date().toLocaleTimeString()+'】'+t+'<br>'+e.innerHTML}
function addAch(a){if(!d.ach.includes(a)){d.ach.push(a);log('获得成就：'+a)}}
function save(){d.last=Date.now();localStorage.setItem('xiuxian_v7',JSON.stringify(d))}
function update(){
stone.textContent=d.stone;jade.textContent=d.jade;power.textContent=d.power;realm.textContent=realms[d.realm];xp.textContent=Math.floor(d.xp);document.getElementById('need').textContent=need();xpbar.style.width=Math.min(100,d.xp/need()*100)+'%';
weapon.textContent=d.weapon;armor.textContent=d.armor;ring.textContent=d.ring;treasure.textContent=d.treasure;bagList.innerHTML=d.bag.map(x=>'<div>'+x+'</div>').join('');
petLv.textContent=d.petLevel;petBonus.textContent=3000*d.petLevel;
sectName.textContent=d.sect;sectNow.textContent=d.sect;sectLv.textContent=d.sectLv;contrib.textContent=d.contrib;dunLv.textContent=d.dunLv;ticket.textContent=d.ticket;
herb.textContent=d.herb;ore.textContent=d.ore;partner.textContent=d.partner;love.textContent=d.love;titleName.textContent=d.title;
achList.innerHTML=d.ach.map(x=>'<div>🏆 '+x+'</div>').join('');save()
}
function cultivate(){let g=1200+3000*d.petLevel+d.realm*800+d.sectLv*1000+(d.partner!=='暂无'?2000:0);d.xp+=g;d.power+=1000+d.realm*200;log('修炼获得 '+g+' 修为');update()}
function breakthrough(){if(d.realm>=realms.length-1){log('已证道仙帝');addAch('证道仙帝');return}if(d.xp<need()){log('修为不足');return}let rate=Math.min(.95,.65+d.breakStone*.1+d.sectLv*.01);if(Math.random()<rate){d.xp-=need();d.realm++;d.power+=88888;d.breakStone=Math.max(0,d.breakStone-1);log('突破成功：'+realms[d.realm]);if(d.realm>=3)addAch('筑基有成');if(d.realm>=5)addAch('金丹大道');if(d.realm>=12)addAch('飞升真仙')}else{d.xp=Math.floor(d.xp*.8);log('突破失败，损失部分修为')}update()}
function tribulation(){if(d.realm<11){log('渡劫期后才能渡劫');return}let ok=Math.random()<.7;if(ok){d.power+=200000;d.jade+=50000;d.title='雷劫真人';addAch('渡劫成功');log('渡劫成功，战力大涨')}else{d.xp=Math.floor(d.xp*.7);log('渡劫失败，被雷劈了')}update()}
function buy(t){if(t==='pill'){d.stone-=888;d.xp+=5000;d.bag.push('聚气丹')}if(t==='chest'){d.stone-=6888;d.power+=30000;d.bag.push('神器宝箱');d.weapon=randomEquip()}if(t==='egg'){d.stone-=9999;d.petLevel++;d.bag.push('灵兽蛋')}if(t==='jade'){d.stone-=1;d.jade+=99999}if(t==='breakStone'){d.stone-=1888;d.breakStone++;d.bag.push('突破石')}if(t==='ticket'){d.stone-=2888;d.ticket++;d.bag.push('扫荡令')}log('购买成功');update()}
function randomEquip(){let arr=['玄天神剑','太虚仙剑','黑龙斩天剑','混沌帝剑'];return arr[Math.floor(Math.random()*arr.length)]}
function claimGift(){d.stone+=999999;d.jade+=999999;d.bag.push('首充豪礼');log('领取豪礼成功');update()}
function claimDaily(){let today=new Date().toDateString();if(d.daily===today){log('今日已签到');return}d.daily=today;d.stone+=50000;d.ticket+=3;d.herb+=20;d.ore+=20;d.bag.push('每日礼包');log('签到成功：灵石+50000，扫荡令+3');update()}
function drawCard(){d.jade-=1888;let pool=['神话装备','仙品丹药','应龙残魂','极品矿石','远古功法'];let got=[];for(let i=0;i<10;i++)got.push(pool[Math.floor(Math.random()*pool.length)]);d.bag.push(...got);d.power+=50000;log('十连抽获得：'+got.join('、'));update()}
function upgradePet(){let c=50000*d.petLevel;if(d.stone<c){log('灵石不足');return}d.stone-=c;d.petLevel++;d.power+=50000;log('灵兽升级到 Lv.'+d.petLevel);update()}
function joinSect(){if(d.sect!=='散修'){log('已加入宗门');return}d.sect='青云宗';d.sectLv=1;log('加入青云宗');update()}
function sectTask(){if(d.sect==='散修'){log('先加入宗门');return}d.contrib+=100;d.xp+=10000;d.stone+=20000;if(d.contrib>=d.sectLv*500){d.contrib=0;d.sectLv++;log('宗门升级到 Lv.'+d.sectLv)}else log('完成宗门任务');update()}
function sectSalary(){if(d.sect==='散修'){log('先加入宗门');return}let s=30000*d.sectLv;d.stone+=s;log('领取宗门俸禄 '+s);update()}
function sectSkill(){if(d.sect==='散修'){log('先加入宗门');return}let c=100*d.sectLv;if(d.contrib<c){log('贡献不足');return}d.contrib-=c;d.power+=80000;d.treasure='青云诀 Lv.'+d.sectLv;log('学习宗门功法，战力提升');update()}
function makePill(){if(d.herb<10){log('药材不足');return}d.herb-=10;if(Math.random()<.8){d.bag.push('聚气丹');d.xp+=15000;log('炼丹成功，修为+15000')}else log('炸炉了');update()}
function forgeEquip(){if(d.ore<20){log('矿石不足');return}d.ore-=20;d.power+=100000;d.armor='强化仙甲+'+Math.floor(d.power/100000);log('炼器成功，战力+100000');update()}
function meetPartner(){if(d.partner!=='暂无'){log('已有道侣');return}d.partner='洛清璃';d.love=10;log('结识道侣：洛清璃');update()}
function giftPartner(){if(d.partner==='暂无'){log('先结识道侣');return}d.stone-=10000;d.love+=10;log('赠送礼物，好感度+10');update()}
function dualCultivate(){if(d.partner==='暂无'){log('先结识道侣');return}let g=20000+d.love*500;d.xp+=g;d.power+=d.love*1000;log('双修获得修为 '+g);update()}
function dungeonFight(){let needPower=d.dunLv*120000;if(d.power<needPower){log('战力不足，需要 '+needPower);return}d.dunLv++;d.xp+=d.dunLv*8000;d.stone+=d.dunLv*20000;d.herb+=5;d.ore+=5;if(Math.random()<.25)d.bag.push('秘境材料');log('通过秘境第 '+(d.dunLv-1)+' 层');if(d.dunLv>=50)addAch('秘境五十层');update()}
function sweepDungeon(){if(d.ticket<10){log('扫荡令不足');return}d.ticket-=10;d.xp+=d.dunLv*80000;d.stone+=d.dunLv*200000;d.herb+=30;d.ore+=30;log('扫荡10次，收益已到账');update()}
function fightBoss(){if(d.power<500000){log('战力不足');return}let r=Math.floor(50000+Math.random()*150000);d.stone+=r;d.power+=25000;if(Math.random()<.35){d.bag.push('黑龙神器');d.weapon='黑龙斩天剑'}log('击败上古黑龙，灵石+'+r);addAch('斩杀黑龙');update()}
function tab(id){['home','shop','bag','petPage','sect','alchemy','dao','dungeon','boss','ach'].forEach(x=>document.getElementById(x).classList.add('hide'));document.getElementById(id).classList.remove('hide')}
function saveGame(){save();log('已保存')}
function exportSave(){prompt('复制这段存档：',btoa(unescape(encodeURIComponent(JSON.stringify(d)))))}
function importSave(){let s=prompt('粘贴存档');if(!s)return;try{d=JSON.parse(decodeURIComponent(escape(atob(s))));log('导入成功');update()}catch(e){alert('存档错误')}}
function resetGame(){if(confirm('确定重开？')){localStorage.removeItem('xiuxian_v7');location.reload()}}
let off=Math.min(7200,Math.floor((Date.now()-(d.last||Date.now()))/1000));if(off>10){d.xp+=off*(1200+3000*d.petLevel+d.realm*500);d.stone+=off*(1000+d.realm*200);log('离线挂机 '+off+' 秒，收益已领取')}
setInterval(()=>{d.xp+=1200+3000*d.petLevel+d.realm*500+d.sectLv*500+(d.partner!=='暂无'?1000:0);d.stone+=1000+d.realm*200;update()},1000);
update();log('V7豪华图片版已启动');
