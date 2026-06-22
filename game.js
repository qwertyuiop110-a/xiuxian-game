const realms=['炼气一层','炼气二层','炼气三层','筑基初期','筑基中期','金丹初期','元婴初期','化神期','炼虚期','合体期','大乘期','渡劫期','真仙','仙王','仙帝','天尊','道祖'];
const bosses=[
{name:'妖狼王',emoji:'🐺',hp:300000,need:100000,reward:50000},
{name:'黑龙王',emoji:'🐉',hp:1200000,need:500000,reward:180000},
{name:'魔尊',emoji:'👹',hp:5000000,need:1500000,reward:600000},
{name:'上古真龙',emoji:'🐲',hp:20000000,need:5000000,reward:2000000},
{name:'天道化身',emoji:'⚡',hp:80000000,need:18000000,reward:8000000}
];
const shopItems=[
['pill','聚气丹','修为+5000',888],['chest','神器宝箱','随机装备/战力',6888],['egg','灵兽蛋','灵兽升级',9999],['jade','仙玉礼包','仙玉+99999',1],['breakStone','突破石','突破成功率提升',1888],['ticket','扫荡令','秘境扫荡',2888],['mat','材料包','药材矿石魂晶',5000],['vip','VIP经验','VIP等级+1',99999]
];
const pets=[['白狐',3000],['青鸾',8000],['麒麟',16000],['应龙',32000],['鲲鹏',64000]];
const partners=['洛清璃','红颜知己','月神仙子','九天玄女'];
let d=JSON.parse(localStorage.getItem('xiuxian_v9_final'))||{
stone:999999,jade:999999,xp:0,realm:0,power:1589642,vip:15,petIndex:0,petLevel:1,sect:'散修',sectLv:0,contrib:0,dunLv:1,ticket:10,daily:'',
weapon:'新手神剑',armor:'青云法袍',ring:'玄天戒',treasure:'无',breakStone:0,herb:100,ore:100,soul:50,partner:'暂无',love:0,title:'初入仙途',
bag:['聚气丹 x99','神器宝箱 x1','灵兽蛋 x1'],ach:['开局豪礼'],bossIndex:1,bossHp:1200000,autoBoss:false,autoCultivate:true,last:Date.now()
};
function need(){return Math.floor(1000*Math.pow(1.52,d.realm))}
function petBonus(){return pets[d.petIndex][1]*d.petLevel}
function log(t){let e=document.getElementById('log');e.innerHTML='【'+new Date().toLocaleTimeString()+'】'+t+'<br>'+e.innerHTML}
function addAch(a){if(!d.ach.includes(a)){d.ach.push(a);log('获得成就：'+a)}}
function save(){d.last=Date.now();localStorage.setItem('xiuxian_v9_final',JSON.stringify(d))}
function renderShop(){shopList.innerHTML=shopItems.map(i=>`<div><h4>${i[1]}</h4><p>${i[2]}</p><button onclick="buy('${i[0]}')">买 ${i[3]}</button></div>`).join('')}
function renderPets(){petList.innerHTML=pets.map((p,i)=>`<div><h4>${i===d.petIndex?'✅ ':''}${p[0]}</h4><p>基础加成 ${p[1]}/秒</p><button onclick="choosePet(${i})">出战</button><button onclick="upgradePet(${i})">升级</button></div>`).join('')}
function renderPartners(){partnerList.innerHTML=partners.map(p=>`<div><h4>${p}</h4><p>双修加成</p><button onclick="meetPartner('${p}')">结识</button><button onclick="giftPartner()">送礼</button><button onclick="dualCultivate()">双修</button></div>`).join('')}
function update(){
stone.textContent=d.stone;jade.textContent=d.jade;power.textContent=d.power;vip.textContent=d.vip;realm.textContent=realms[d.realm]||'道祖';xp.textContent=Math.floor(d.xp);document.getElementById('need').textContent=need();xpbar.style.width=Math.min(100,d.xp/need()*100)+'%';
titleName.textContent=d.title;sectName.textContent=d.sect;sectNow.textContent=d.sect;sectLv.textContent=d.sectLv;contrib.textContent=d.contrib;
weapon.textContent=d.weapon;armor.textContent=d.armor;ring.textContent=d.ring;treasure.textContent=d.treasure;bagList.innerHTML=d.bag.map(x=>'<div>'+x+'</div>').join('');
herb.textContent=d.herb;ore.textContent=d.ore;soul.textContent=d.soul;partner.textContent=d.partner;love.textContent=d.love;dunLv.textContent=d.dunLv;ticket.textContent=d.ticket;
autoBossText.textContent=d.autoBoss?'开':'关';autoBossText2.textContent=d.autoBoss?'开':'关';autoCultivateText.textContent=d.autoCultivate?'开':'关';
let b=bosses[d.bossIndex];bossName.textContent=b.name;bossEmoji.textContent=b.emoji;bossNeed.textContent=b.need;bossMax.textContent=b.hp;bossHp.textContent=Math.max(0,Math.floor(d.bossHp));bossbar.style.width=Math.max(0,d.bossHp/b.hp*100)+'%';
achList.innerHTML=d.ach.map(x=>'<div>🏆 '+x+'</div>').join('');
rankList.innerHTML=['道友·逍遥子 99999999','道友·青云子 88888888','你 '+d.power,'道友·玄天 66666666','道友·白帝 55555555'].map((x,i)=>`<div>第${i+1}名 ${x}</div>`).join('');
renderPets();renderShop();renderPartners();save()
}
function gainXpBase(){return 1500+petBonus()+d.realm*900+d.sectLv*700+(d.partner!=='暂无'?2000:0)+d.vip*100}
function cultivate(){let g=gainXpBase();d.xp+=g;d.power+=1200+d.realm*260;log('修炼获得 '+g+' 修为');update()}
function breakthrough(){if(d.realm>=realms.length-1){d.title='道祖';addAch('证道道祖');log('已是最高境界');return}if(d.xp<need()){log('修为不足');return}let rate=Math.min(.98,.68+d.breakStone*.08+d.sectLv*.01+d.vip*.003);if(Math.random()<rate){d.xp-=need();d.realm++;d.power+=100000+d.realm*20000;d.breakStone=Math.max(0,d.breakStone-1);log('突破成功：'+realms[d.realm]);if(d.realm>=3)addAch('筑基有成');if(d.realm>=6)addAch('元婴老怪');if(d.realm>=12)addAch('飞升真仙')}else{d.xp=Math.floor(d.xp*.82);log('突破失败，损失部分修为')}update()}
function tribulation(){if(d.realm<11){log('渡劫期后才能渡劫');return}if(Math.random()<.75){d.power+=300000;d.jade+=80000;d.title='雷劫真人';addAch('渡劫成功');log('渡劫成功')}else{d.xp=Math.floor(d.xp*.7);log('渡劫失败')}update()}
function buy(t){let item=shopItems.find(x=>x[0]===t);if(item&&d.stone<item[3]){log('灵石不足');return}if(item)d.stone-=item[3];if(t==='pill'){d.xp+=5000;d.bag.push('聚气丹')}if(t==='chest'){d.power+=80000;d.weapon=randomEquip();d.bag.push('神器宝箱')}if(t==='egg'){d.petLevel++;d.bag.push('灵兽蛋')}if(t==='jade'){d.jade+=99999}if(t==='breakStone'){d.breakStone++;d.bag.push('突破石')}if(t==='ticket'){d.ticket++;d.bag.push('扫荡令')}if(t==='mat'){d.herb+=50;d.ore+=50;d.soul+=20}if(t==='vip'){d.vip++}log('购买成功：'+(item?item[1]:t));update()}
function randomEquip(){return ['玄天神剑','太虚仙剑','黑龙斩天剑','混沌帝剑','诛仙剑'][Math.floor(Math.random()*5)]}
function claimGift(){d.stone+=999999;d.jade+=999999;d.bag.push('至尊豪礼');addAch('领取豪礼');log('领取豪礼成功');update()}
function claimDaily(){let today=new Date().toDateString();if(d.daily===today){log('今日已签到');return}d.daily=today;d.stone+=80000;d.ticket+=5;d.herb+=30;d.ore+=30;d.bag.push('每日礼包');log('签到成功');update()}
function drawCard(n=10){d.jade-=1888;let pool=['神话装备','仙品丹药','应龙残魂','极品矿石','远古功法','仙侣信物'];let got=[];for(let i=0;i<n;i++)got.push(pool[Math.floor(Math.random()*pool.length)]);d.bag.push(...got);d.power+=100000;log('抽卡获得：'+got.join('、'));update()}
function choosePet(i){d.petIndex=i;log('出战灵兽：'+pets[i][0]);update()}
function upgradePet(i=d.petIndex){let cost=50000*d.petLevel;if(d.stone<cost){log('灵石不足');return}d.stone-=cost;d.petIndex=i;d.petLevel++;d.power+=80000;log('灵兽升级');update()}
function joinSect(name){if(d.sect!=='散修'){log('已加入宗门：'+d.sect);return}d.sect=name;d.sectLv=1;log('加入'+name);update()}
function sectTask(){if(d.sect==='散修'){log('先加入宗门');return}d.contrib+=120;d.xp+=15000;d.stone+=30000;if(d.contrib>=d.sectLv*500){d.contrib=0;d.sectLv++;log('宗门升级')}else log('完成宗门任务');update()}
function sectSalary(){let s=40000*(d.sectLv||1);d.stone+=s;log('领取俸禄 '+s);update()}
function sectSkill(){let c=100*d.sectLv;if(d.contrib<c){log('贡献不足');return}d.contrib-=c;d.power+=120000;d.treasure='宗门功法 Lv.'+d.sectLv;log('学习功法成功');update()}
function sectBoss(){d.power+=50000;d.stone+=100000;d.bag.push('宗门BOSS宝箱');log('击败宗门BOSS');update()}
function makePill(type){if(type==='聚气丹'){if(d.herb<10)return log('药材不足');d.herb-=10;d.xp+=15000}if(type==='破境丹'){if(d.herb<30)return log('药材不足');d.herb-=30;d.breakStone++}if(type==='九转金丹'){if(d.herb<100)return log('药材不足');d.herb-=100;d.xp+=200000}d.bag.push(type);log('炼制成功：'+type);update()}
function forgeEquip(){if(d.ore<20)return log('矿石不足');d.ore-=20;d.power+=120000;d.armor='强化仙甲+'+Math.floor(d.power/100000);log('炼器成功');update()}
function refineTreasure(){if(d.soul<10)return log('魂晶不足');d.soul-=10;d.power+=160000;d.treasure='太古法宝+'+Math.floor(d.power/200000);log('法宝淬炼成功');update()}
function buyMaterials(){d.stone-=50000;d.herb+=60;d.ore+=60;d.soul+=25;log('材料兑换成功');update()}
function meetPartner(p){if(d.partner!=='暂无'){log('已有道侣');return}d.partner=p;d.love=20;log('结识道侣：'+p);update()}
function giftPartner(){if(d.partner==='暂无')return log('先结识道侣');d.stone-=10000;d.love+=10;log('好感度+10');update()}
function dualCultivate(){if(d.partner==='暂无')return log('先结识道侣');let g=30000+d.love*800;d.xp+=g;d.power+=d.love*1500;log('双修获得修为 '+g);update()}
function dungeonFight(){let req=d.dunLv*120000;if(d.power<req)return log('战力不足，需要 '+req);d.dunLv++;d.xp+=d.dunLv*12000;d.stone+=d.dunLv*30000;d.herb+=8;d.ore+=8;if(Math.random()<.25)d.bag.push('秘境材料');if(d.dunLv>=100)addAch('秘境百层');log('通过秘境第 '+(d.dunLv-1)+' 层');update()}
function sweepDungeon(){if(d.ticket<10)return log('扫荡令不足');d.ticket-=10;d.xp+=d.dunLv*120000;d.stone+=d.dunLv*280000;d.herb+=40;d.ore+=40;log('扫荡10次完成');update()}
function materialDungeon(){d.herb+=80;d.ore+=80;d.soul+=30;log('材料秘境收益已领取');update()}
function petDungeon(){d.petLevel++;d.power+=50000;log('神兽秘境：灵兽升级');update()}
function attackBoss(){let b=bosses[d.bossIndex];if(d.power<b.need)return log('战力不足，需要 '+b.need);let dmg=Math.floor(d.power*(.08+Math.random()*.14));d.bossHp-=dmg;log('攻击 '+b.name+' 造成 '+dmg+' 伤害');if(d.bossHp<=0){d.stone+=b.reward;d.power+=Math.floor(b.reward/2);d.herb+=20;d.ore+=20;d.bag.push(b.name+' 掉落宝箱');addAch('击败'+b.name);log('击败 '+b.name+'，灵石+'+b.reward);d.bossHp=b.hp}update()}
function nextBoss(){d.bossIndex=(d.bossIndex+1)%bosses.length;d.bossHp=bosses[d.bossIndex].hp;log('切换BOSS：'+bosses[d.bossIndex].name);update()}
function toggleAutoBoss(){d.autoBoss=!d.autoBoss;log('自动BOSS已'+(d.autoBoss?'开启':'关闭'));update()}
function toggleAutoCultivate(){d.autoCultivate=!d.autoCultivate;log('自动修炼已'+(d.autoCultivate?'开启':'关闭'));update()}
function buyAuction(i){let goods=[['神话仙剑',500000],['天狐残魂',300000],['九转金丹',200000],['太古法宝',800000]];let g=goods[i];if(d.stone<g[1])return log('灵石不足');d.stone-=g[1];d.bag.push(g[0]);d.power+=150000;log('拍下 '+g[0]);update()}
function renderAuction(){auctionList.innerHTML=['神话仙剑','天狐残魂','九转金丹','太古法宝'].map((x,i)=>`<div><h4>${x}</h4><p>稀有拍卖品</p><button onclick="buyAuction(${i})">竞拍</button></div>`).join('')}
function tab(id){['home','shop','bag','pet','sect','alchemy','dao','dungeon','boss','auction','rank','ach'].forEach(x=>document.getElementById(x).classList.add('hide'));document.getElementById(id).classList.remove('hide');renderAuction()}
function saveGame(){save();log('已保存')}
function exportSave(){prompt('复制存档：',btoa(unescape(encodeURIComponent(JSON.stringify(d)))))}
function importSave(){let s=prompt('粘贴存档');if(!s)return;try{d=JSON.parse(decodeURIComponent(escape(atob(s))));log('导入成功');update()}catch(e){alert('存档错误')}}
function resetGame(){if(confirm('确定重开？')){localStorage.removeItem('xiuxian_v9_final');location.reload()}}
let off=Math.min(7200,Math.floor((Date.now()-(d.last||Date.now()))/1000));if(off>10){d.xp+=off*gainXpBase();d.stone+=off*(1000+d.realm*200);log('离线挂机 '+off+' 秒')}
setInterval(()=>{if(d.autoCultivate){d.xp+=gainXpBase();d.stone+=1000+d.realm*200}if(d.autoBoss)attackBoss();else update()},1000);
update();renderShop();renderPets();renderPartners();renderAuction();log('V9最终完整版已启动');
