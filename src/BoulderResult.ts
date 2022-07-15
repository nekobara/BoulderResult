// 選手インターフェイス
interface PlayerIf {
  playerId: string;
  fullName: string;
  furigana?: string;
}

// 選手クラス
export class Player {
  public playerId: string;
  public fullName: string;
  public furigana?: string;    

  constructor( player: PlayerIf  ) {
    this.playerId = player.playerId;  
    this.fullName = player.fullName;
    this.furigana = player.furigana || '';
  }

  getFullName(){
    return this.fullName;
  }

  getPlayerId(){
    return this.playerId;
  }

  getFurigana(){
    return this.furigana;
  }  
}

// 成績
export class BlResult {
  public player: Player;
  public num_of_top_complete: number;
  public num_of_top_attenpts: number;
  public num_of_zone1_complete?: number;
  public num_of_zone1_attenpts?: number;
  public num_of_zone2_complete?: number;
  public num_of_zone2_attenpts?: number;
  public num_of_zone3_complete?: number;
  public num_of_zone3_attenpts?: number;
  public same_ranking_flag: boolean;
  public num_of_same_ranking: number;
  public ranking: number;
  public point: number;  

  constructor(object: any){
    if (object.player.constructor.name === 'Player'){
      this.player = object.player;
    }else{
      this.player = new Player(object.player);
    }
    this.num_of_top_complete   = object.num_of_top_complete || 0;
    this.num_of_top_attenpts   = object.num_of_top_attenpts || 0;
    this.num_of_zone1_complete = object.num_of_zone1_complete || 0;
    this.num_of_zone1_attenpts = object.num_of_zone1_attenpts || 0;
    this.num_of_zone2_complete = object.num_of_zone2_complete || 0;
    this.num_of_zone2_attenpts = object.num_of_zone2_attenpts || 0;
    this.num_of_zone3_complete = object.num_of_zone3_complete || 0;
    this.num_of_zone3_attenpts = object.num_of_zone3_attenpts || 0;
    this.same_ranking_flag = false;
    this.num_of_same_ranking = 0;
    this.ranking = 0;
    this.point = 0;  
  }

  getPlayer(){
    return this.player;
  }

  getNumOfComplete(complete_name: string){
    if ('TOP' === complete_name.toUpperCase()){
      return this.getNumOfTopComplete();
    }
    if ('ZONE1' === complete_name.toUpperCase()){
      return this.getNumOfZone1Complete();
    }
    if ('ZONE2' === complete_name.toUpperCase()){
      return this.getNumOfZone2Complete();
    }
    if ('ZONE3' === complete_name.toUpperCase()){
      return this.getNumOfZone3Complete();
    }
    return 0;
  }

  getNumOfAttenpts(attenpt_name: string){
    if ('TOP' === attenpt_name.toUpperCase()){
      return this.getNumOfTopAttenpts();
    }
    if ('ZONE1' === attenpt_name.toUpperCase()){
      return this.getNumOfZone1Attenpts();
    }
    if ('ZONE2' === attenpt_name.toUpperCase()){
      return this.getNumOfZone2Attenpts();
    }
    if ('ZONE3' === attenpt_name.toUpperCase()){
      return this.getNumOfZone3Attenpts();
    }
    return 0;
  }

  getNumOfTopComplete(){
    return this.num_of_top_complete;
  }

  getNumOfTopAttenpts(){
    return this.num_of_top_attenpts;
  }

  getNumOfZone1Complete(){
    return this.num_of_zone1_complete;
  }

  getNumOfZone1Attenpts(){
    return this.num_of_zone1_attenpts;
  }

  getNumOfZone2Complete(){
    return this.num_of_zone2_complete;
  }

  getNumOfZone2Attenpts(){
    return this.num_of_zone2_attenpts;
  }

  getNumOfZone3Complete(){
    return this.num_of_zone3_complete;
  }

  getNumOfZone3Attenpts(){
    return this.num_of_zone3_attenpts;
  }

  setRanking(ranking: number){
    this.ranking = ranking;
  }

  getRanking(){
    return this.ranking;
  }

  setPoint(point: number){
    this.point = point;
  }

  getPoint(){
    return this.point;
  }

  isSameRanking(){
    return this.same_ranking_flag;
  }
 
  getNumOfSameRanking(){
    return this.num_of_same_ranking;
  }

  inncrimentSameRanking(){
    if (!this.isSameRanking()){
      this.same_ranking_flag = true;
      this.num_of_same_ranking = 1;
    }
    this.num_of_same_ranking++;
  }
}

// 順位
export class BlRanking {
  public results: BlResult[] = [];

  constructor(results: any[]) {
    if (Array.isArray(results)){
      if (results[0].constructor.name === 'Result') {
        this.results = results;         
      }else{
        var result_objs: BlResult[] = [];
        for (var i = 0; i < results.length; i++){
          result_objs.push(new BlResult(results[i]));
        } 
        this.results = result_objs;
      }
    }
  }

  getResults(){
    return this.results;
  }

  getResultByPlayerId(pid: string): BlResult | null{
    let results : BlResult[] = this.getResults();
    for ( var i = 0;  i < results.length; i++) {
      let r: BlResult = results[i];
      if (r.getPlayer().getPlayerId() == pid) {
        return r;
      }
    }
    return null;
  }
 
  calcRanking(){
    this.results.sort(BlRanking.cmpResult);
    for (var i = 0; i < this.results.length; i++) {
      if (this.results[i].isSameRanking() == true){
        var point = BlRanking.calcPoint(i + 1, this.results[i].getNumOfSameRanking());
        for (var j = i; j < i + this.results[i].getNumOfSameRanking(); j++){
          this.results[j].setRanking(i + 1);
          this.results[j].setPoint(point);
        }
        i = i + this.results[i].getNumOfSameRanking() - 1;
      }else{
        this.results[i].setRanking(i + 1);
        this.results[i].setPoint(this.results[i].getRanking());
      }
    }
    return this.results;   
  }

  // 順位計算をして結果を返却
  getRanking(){
    this.calcRanking();
    return this.getResults();
  }

  // 成績の比較
  static cmpResult(a:any, b:any){
    var ret = 0;

    // 完登数の比較
    ret = BlRanking.cmpTopComplete(a, b);
    if (ret != 0) return ret;

    // ゾーン獲得数の比較
    ret = BlRanking.cmpZone3Complete(a, b);
    if (ret != 0) return ret;

    ret = BlRanking.cmpZone2Complete(a, b);
    if (ret != 0) return ret;

    ret = BlRanking.cmpZone1Complete(a, b);
    if (ret != 0) return ret;

    // 完登アテンプト数の比較
    ret = BlRanking.cmpTopAttenpt(a, b);
    if (ret != 0) return ret;

    // ゾーンアテンプト数の比較
    ret = BlRanking.cmpZone3Attenpt(a, b);
    if (ret != 0) return ret;

    ret = BlRanking.cmpZone2Attenpt(a, b);
    if (ret != 0) return ret;

    ret = BlRanking.cmpZone1Attenpt(a, b);
    if (ret != 0) return ret;
    
    BlRanking.sameRanking(a, b);
    return 0;
  }

  // TOPの比較
  static cmpTopComplete(a:any, b:any){
    return BlRanking.cmpComplete(a, b, 'TOP');
  }

  // ZONE1の比較
  static cmpZone1Complete(a:any, b:any){
    return BlRanking.cmpComplete(a, b, 'ZONE1');
  }

  // ZONE2の比較
  static cmpZone2Complete(a:any, b:any){
    return BlRanking.cmpComplete(a, b, 'ZONE2');
  }

  // ZONE3の比較
  static cmpZone3Complete(a:any, b:any){
    return BlRanking.cmpComplete(a, b, 'ZONE3');
  }

  // TOPまたはZONE数の比較(多い方が-1)
  static cmpComplete(a:any, b:any, complete_name:string){
    if(Number(a.getNumOfComplete(complete_name)) == Number(b.getNumOfComplete(complete_name))){
      return 0;
    }else if(Number(a.getNumOfComplete(complete_name)) > Number(b.getNumOfComplete(complete_name))){
      return -1;
    }else{
      return 1;
    }
  }

  // 完投のアテンプト数の比較
  static cmpTopAttenpt(a:any, b:any){
    return BlRanking.cmpAtenpt(a, b, 'TOP');
  }

  // ZONE1のアテンプト数の比較
  static cmpZone1Attenpt(a:any, b:any){
    return BlRanking.cmpAtenpt(a, b, 'ZONE1');
  }

  // ZONE2のアテンプト数の比較
  static cmpZone2Attenpt(a:any, b:any){
    return BlRanking.cmpAtenpt(a, b, 'ZONE2');
  }

  // ZONE3のアテンプト数の比較
  static cmpZone3Attenpt(a:any, b:any){
    return BlRanking.cmpAtenpt(a, b, 'ZONE3');
  }

  // アテンプトの比較(少ない方が-1)
  static cmpAtenpt(a:any, b:any, attenpt_name:string){
    if(Number(a.getNumOfAttenpts(attenpt_name)) == Number(b.getNumOfAttenpts(attenpt_name))){
      return 0;
    }else if(Number(a.getNumOfAttenpts(attenpt_name)) > Number(b.getNumOfAttenpts(attenpt_name))){
      return 1;
    }else{
      return -1;
    }  
  }

  // 同着の処理
  static sameRanking(a:any, b:any){
      a.inncrimentSameRanking();
      b.inncrimentSameRanking();
  }

  // 階和
  static sumKaiwa(start:number, length:number){
    var ret = start;
    for (var i = 1; i < length; i++){
      ret += (start  + i);
    }
    return ret;
  }

  // ポイント計算
  static calcPoint(start:number, length:number){
    return BlRanking.sumKaiwa(start, length)/length;
  }
}
