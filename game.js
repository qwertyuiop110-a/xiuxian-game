const realms=['炼气','筑基','金丹','元婴','化神','炼虚','合体','大乘','渡劫','真仙','仙王','仙帝','天尊','道祖'];
const pets=['白狐','青鸾','麒麟','应龙','鲲鹏'];
const qualities=['白','绿','蓝','紫','橙','红','神'];
const shop=[['丹药','修为+20000',888],['神器宝箱','随机装备',6888],['扫荡令','秘境扫荡',2888],['灵兽蛋','灵兽升级',9999],['材料包','强化材料',5000],['仙玉礼包','仙玉+99999',1]];
let d=JSON.parse(localStorage.getItem('xiuxian_v11_idle'))||{
stone:9999999,jade:9999999,power:1200000,vip:15,stage:1,enemyHp:0,xp:0,realm:0,hp:10000,maxHp:10000,atk:18000,def:3000,auto:true,
weapon:{name:'新手神剑',q:3,lv:1,atk:10000},armor:{name:'青云法袍',q:3,lv:1,hp:8000,def:2000},ring:{name:'玄天戒',q:3,lv:1,atk:5000},
pet:0,petLv:1,petStar:1,ticket:20,dungeonLv:1,sect:'散修',sectLv:0,contrib:0,partner:'暂无',love:0,bag:['聚气丹x99','神器宝箱x3'],ach:['开局至尊'],last:Date.now()
};
function need(){return Math.floor(1000*Math.pow(1.55,d.realm))}
function enemy(){let isBoss=d.stage%10===0;return {name:isBoss?'关卡BOSS·'+d.stage:'妖兽·'+d.stage,icon:isBoss?'👹':['🐺','🐍','🦇','🐯','🐲'][d.stage%5],hp:Math.floor(60000*Math.pow(1.08,d.stage)),atk:Math.floor(600*Math.pow(1.06,d.stage)),reward:Math.floor(2000*Math.pow(1.05,d.stage)),boss:isBoss}}
function log(t){let e=document.getElementById('log');e.innerHTML='【'+new Date().toLocaleTimeString()+'】'+t+'<br>'+e.innerHTML}
function addAch(a){if(!d.ach.includes(a)){d.ach.push(a);log('成就：'+a)}}
function save(){d.last=Date.now();localStorage.setItem('xiuxian_v11_idle',JSON.stringify(d))}
function calc(){d.atk=8000+d.weapon.atk+d.ring.atk+d.petLv*d.petStar*2500+d.realm*6000;d.maxHp=10000+d.armor.hp+d.realm*12000;d.def=2000+d.armor.def+d.realm*1500;d.power=d.atk*5+d.def*8+d.maxHp+ d.petLv*d.petStar*15000}
function spawn(){let e=enemy();if(!d.enemyHp||d.enemyHp<=0||d.enemyHp>e.hp)d.enemyHp=e.hp}
function update(){
calc();spawn();let e=enemy();
stone.textContent=d.stone;jade.textContent=d.jade;power.textContent=d.power;realm.textContent=realms[d.realm];stageNo.textContent=d.stage;xp.textContent=Math.floor(d.xp);document.getElementById('need').textContent=need();xpbar.style.width=Math.min(100,d.xp/need()*100)+'%';
hp.textContent=Math.floor(d.hp);maxHp.textContent=d.maxHp;atk.textContent=d.atk;def.textContent=d.def;enemyName.textContent=e.name;enemyIcon.textContent=e.icon;enemyHp.textContent=Math.max(0,Math.floor(d.enemyHp));enemyMaxHp.textContent=e.hp;enemyHpBar.style.width=Math.max(0,d.enemyHp/e.hp*100)+'%';autoText.textContent=d.auto?'开':'关';
weapon.textContent=`${qualities[d.weapon.q]}·${d.weapon.name}+${d.weapon.lv}`;armor.textContent=`${qualities[d.armor.q]}·${d.armor.name}+${d.armor.lv}`;ring.textContent=`${qualities[d.ring.q]}·${d.ring.name}+${d.ring.lv}`;
petName.textContent=pets[d.pet];petLv.textContent=d.petLv;petStar.textContent=d.petStar;ticket.textContent=d.ticket;dungeonLv.textContent=d.dungeonLv;sectName.textContent=d.sect;sectLv.textContent=d.sectLv;contrib.textContent=d.contrib;partner.textContent=d.partner;love.textContent=d.love;
bagList.innerHTML=d.bag.slice(-40).reverse().map(x=>'<div>'+x+'</div>').join('');achList.innerHTML=d.ach.map(x=>'<div>🏆 '+x+'</div>').join('');
shopList.innerHTML=shop.map((s,i)=>`<div><b>${s[0]}</b><p>${s[1]}</p><button onclick="buy(${i})">买 ${s[2]}</button></div>`).join('');
save()
}
function float(t){floatText.textContent=t;setTimeout(()=>floatText.textContent='',500)}
function attack(){let e=enemy();let dmg=Math.max(1,Math.floor(d.atk*(.8+Math.random()*.5)));d.enemyHp-=dmg;float('-'+dmg);let hurt=Math.max(1,e.atk-d.def);d.hp=Math.max(0,d.hp-hurt);if(d.hp<=0){d.hp=d.maxHp;d.stone=Math.max(0,d.stone-1000);log('战败复活，损失少量灵石')}if(d.enemyHp<=0){win(e)}update()}
function win(e){d.stage++;d.stone+=e.reward;d.xp+=e.reward*2;d.hp=Math.min(d.maxHp,d.hp+d.maxHp*.25);if(e.boss){dropEquip();addAch('击败第'+(d.stage-1)+'关BOSS')}if(d.stage===100)addAch('百关斩妖');if(d.stage===1000)addAch('通关千层');d.enemyHp=enemy().hp;log('击败 '+e.name+'，获得灵石 '+e.reward)}
function dropEquip(){let q=Math.min(6,Math.floor(Math.random()*4)+Math.floor(d.stage/120));let type=['weapon','armor','ring'][Math.floor(Math.random()*3)];let names={weapon:['仙剑','魔刀','雷霆剑'],armor:['仙甲','道袍','龙鳞甲'],ring:['灵戒','仙戒','帝戒']};let item={name:names[type][Math.floor(Math.random()*3)],q,lv:1,atk:type!=='armor'?Math.floor(6000*(q+1)*Math.pow(1.02,d.stage)):0,hp:type==='armor'?Math.floor(12000*(q+1)*Math.pow(1.02,d.stage)):0,def:type==='armor'?Math.floor(3000*(q+1)*Math.pow(1.02,d.stage)):0};d.bag.push(`${qualities[q]}·${item.name}`);if(score(item)>score(d[type])){d[type]=item;log('自动穿戴更强装备：'+qualities[q]+'·'+item.name)}}
function score(i){return (i.atk||0)*5+(i.hp||0)+(i.def||0)*8+i.q*10000+i.lv*2000}
function cultivate(){let g=3000+d.realm*1200+d.petLv*d.petStar*1000;d.xp+=g;log('修炼获得修为 '+g);update()}
function breakthrough(){if(d.xp<need())return log('修为不足');d.xp-=need();d.realm=Math.min(realms.length-1,d.realm+1);d.hp=d.maxHp;addAch('突破'+realms[d.realm]);log('突破到 '+realms[d.realm]);update()}
function heal(){d.hp=d.maxHp;log('已恢复血量');update()}
function toggleAuto(){d.auto=!d.auto;update()}
function claimGift(){d.stone+=9999999;d.jade+=9999999;d.bag.push('至尊豪礼');log('领取至尊豪礼');update()}
function rebirth(){if(d.stage<300)return log('300关后可飞升转生');d.stage=1;d.realm=0;d.atk+=100000;d.power+=1000000;addAch('飞升转生');log('飞升转生，获得永久加成');update()}
function forge(){let cost=5000*(d.weapon.lv+d.armor.lv+d.ring.lv);if(d.stone<cost)return log('灵石不足');d.stone-=cost;d.weapon.lv++;d.armor.lv++;d.ring.lv++;d.weapon.atk+=5000;d.armor.hp+=10000;d.armor.def+=2000;d.ring.atk+=3000;log('装备强化成功');update()}
function autoEquip(){log('已自动穿戴当前最高装备');update()}
function openChest(){d.stone-=6888;dropEquip();update()}
function washEquip(){d.stone-=50000;d.weapon.atk=Math.floor(d.weapon.atk*1.12);d.ring.atk=Math.floor(d.ring.atk*1.12);log('洗练成功，攻击提升');update()}
function petUp(){d.stone-=20000*d.petLv;d.petLv++;log('灵兽升级');update()}
function petStarUp(){if(d.petLv<10)return log('灵兽10级后可升星');d.petLv=1;d.petStar++;log('灵兽升星');update()}
function changePet(){d.pet=(d.pet+1)%pets.length;log('切换灵兽：'+pets[d.pet]);update()}
function petSkill(){d.enemyHp-=d.atk*3;log('灵兽技能造成大量伤害');update()}
function buy(i){let s=shop[i];if(d.stone<s[2])return log('灵石不足');d.stone-=s[2];if(i===0)d.xp+=20000;if(i===1)dropEquip();if(i===2)d.ticket++;if(i===3)d.petLv++;if(i===4)d.stone+=0,d.bag.push('材料包');if(i===5)d.jade+=99999;log('购买 '+s[0]);update()}
function dungeon(){let req=d.dungeonLv*80000;if(d.power<req)return log('秘境战力不足');d.dungeonLv++;d.stone+=d.dungeonLv*30000;d.xp+=d.dungeonLv*50000;dropEquip();log('通关秘境');update()}
function sweep(){if(d.ticket<10)return log('扫荡令不足');d.ticket-=10;d.stone+=d.dungeonLv*300000;d.xp+=d.dungeonLv*300000;log('扫荡完成');update()}
function worldBoss(){d.enemyHp=1;attack();d.stone+=500000;log('世界BOSS奖励到账');update()}
function randomEvent(){let r=Math.random();if(r<.33){d.jade+=100000;log('奇遇：获得仙玉')}else if(r<.66){dropEquip();log('奇遇：获得装备')}else{d.xp+=300000;log('奇遇：修为暴涨')}update()}
function joinSect(){if(d.sect!=='散修')return log('已加入宗门');d.sect='青云宗';d.sectLv=1;log('加入青云宗');update()}
function sectTask(){d.contrib+=100;d.xp+=50000;d.stone+=50000;if(d.contrib>=d.sectLv*500){d.contrib=0;d.sectLv++;log('宗门升级')}else log('完成宗门任务');update()}
function meetPartner(){if(d.partner!=='暂无')return log('已有道侣');d.partner='洛清璃';d.love=20;log('结识道侣洛清璃');update()}
function dualCultivate(){if(d.partner==='暂无')return log('先结识道侣');d.xp+=100000+d.love*1000;d.love+=5;log('双修完成');update()}
function tab(id){['main','equip','pet','shop','realmPage','sect','bag'].forEach(x=>document.getElementById(x).classList.add('hide'));document.getElementById(id).classList.remove('hide')}
function saveGame(){save();log('已保存')}
let off=Math.min(21600,Math.floor((Date.now()-(d.last||Date.now()))/1000));if(off>10){d.stone+=off*1200;d.xp+=off*2500;log('离线收益 '+off+' 秒')}
setInterval(()=>{if(d.auto)attack();else update();d.xp+=500+d.realm*100},900);
update();log('V11竖版放置挂机终极版启动');
