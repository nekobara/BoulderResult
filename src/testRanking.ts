import { BlResult } from './BoulderResult';
import { BlRanking } from './BoulderResult';

console.log("### BlResultクラス、BlRankingクラスのテスト ###\n");

testRanking();

function testRanking() {

  /* テストデータ */
  var testJson = '{"results":[\
    {"player":{"fullName":"蔵井 民具","playerId":1},\
	"num_of_top_complete":3,\
	"num_of_top_attenpts":7,\
	"num_of_zone1_complete":3,\
	"num_of_zone1_attenpts":3},\
    {"player":{"fullName":"岩場 太郎","playerId":2},\
	"num_of_top_complete":2,\
	"num_of_top_attenpts":4,\
	"num_of_zone1_complete":3,\
	"num_of_zone1_attenpts":6},\
    {"player":{"fullName":"寺務 好子","playerId":10},\
	"num_of_top_complete":2,\
	"num_of_top_attenpts":4,\
	"num_of_zone1_complete":3,\
	"num_of_zone1_attenpts":6},\
    {"player":{"fullName":"リード マイケル","playerId":11},\
	"num_of_top_complete":2,\
	"num_of_top_attenpts":4,\
	"num_of_zone1_complete":2,\
	"num_of_zone1_attenpts":3},\
    {"player":{"fullName":"暮瑠田 輪","playerId":12},\
	"num_of_top_complete":3,\
	"num_of_top_attenpts":3,\
	"num_of_zone1_complete":3,\
	"num_of_zone1_attenpts":3},\
    {"player":{"fullName":"岩壁 登","playerId":20},\
	"num_of_top_complete":1,\
	"num_of_top_attenpts":1,\
	"num_of_zone1_complete":3,\
	"num_of_zone1_attenpts":4}\
  ]}';
    
  let testObj = JSON.parse(testJson);
  // 成績表示
  console.log("##### 成績 #####");
  console.log("TO\tZONE1\tゼッケン 氏名");    
  let objs: any[] = testObj['results']; 
  for (var i = 0; i < objs.length; i++){
      let o: any = objs[i];
      let p: any = o['player'];
      console.log(
          o['num_of_top_complete']
          + " " + o['num_of_top_attenpts']                  
          + "\t" + o['num_of_zone1_complete']
          + " " + o['num_of_zone1_attenpts']
          + "\t" + p['playerId'] + "\t " + p['fullName']          
      );
  }

  // 成績のロード
  let ranking: BlRanking = new BlRanking(testObj.results);

  // 順位計算
  ranking.calcRanking();

  // 順位の表示
  console.log("\n##### 順位 #####");    
  console.log("順位 順位P\tゼッケン 氏名");
  let results: BlResult[] = ranking.getResults();
  for (var i = 0; i < results.length; i++){
      let r: BlResult = results[i];
      console.log(r.getRanking() + "    " + r.getPoint() + "     \t" + r.getPlayer().getPlayerId() + "\t " + r.getPlayer().getFullName());
  }

  /*
    ##### 成績 #####
    TO      ZONE1   ゼッケン 氏名
    3 7     3 3     1       蔵井 民具
    2 4     3 6     2       岩場 太郎
    2 4     3 6     10      寺務 好子
    2 4     2 3     11      リード マイケル
    3 3     3 3     12      暮瑠田 輪
    1 1     3 4     20      岩壁 登
  */
  /*
    ##### 順位 #####
    順位 順位P      ゼッケン 氏名
    1    1          12     暮瑠田 輪
    2    2          1      蔵井 民具
    3    3.5        2      岩場 太郎
    3    3.5        10     寺務 好子
    5    5          11     リード マイケル
    6    6          20     岩壁 登
  */

  // 確認
  // 1位 暮瑠田 輪
  let r: any = ranking.getResultByPlayerId("12");
  if (r == null) console.log(r.getPlayer().getFullName() + "の成績データが正しくありません");
  if (r.getRanking() != 1) console.log(r.getPlayer().getFullName() + "の順位計算が間違っています。");
  // 2位 蔵井 民具
  r = ranking.getResultByPlayerId("1");
  if (r == null) console.log(r.getPlayer().getFullName() + "の成績データが正しくありません");
  if (r.getRanking() != 2) console.log(r.getPlayer().getFullName() + "の順位計算が間違っています。");
  // 3位 岩場 太郎
  r = ranking.getResultByPlayerId("2");
  if (r == null) console.log(r.getPlayer().getFullName() + "の成績データが正しくありません");
  if (r.getRanking() != 3) console.log(r.getPlayer().getFullName() + "の順位計算が間違っています。");
  // 3位 寺務 好子
  r = ranking.getResultByPlayerId("10");
  if (r == null) console.log(r.getPlayer().getFullName() + "の成績データが正しくありません");
  if (r.getRanking() != 3) console.log(r.getPlayer().getFullName() + "の順位計算が間違っています。");
  // 5位 リード マイケル
  r = ranking.getResultByPlayerId("11");
  if (r == null) console.log(r.getPlayer().getFullName() + "の成績データが正しくありません");
  if (r.getRanking() != 5) console.log(r.getPlayer().getFullName() + "の順位計算が間違っています。");
  // 6位 岩壁 登
  r = ranking.getResultByPlayerId("20");
  if (r == null) console.log(r.getPlayer().getFullName() + "の成績データが正しくありません");
  if (r.getRanking() != 6) console.log(r.getPlayer().getFullName() + "の順位計算が間違っています。");
    
}
