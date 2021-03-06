"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BoulderResult_1 = require("./BoulderResult");
console.log("### Playerクラスのテスト ###\n");
const player1 = { playerId: '1', fullName: '岩壁 太郎' };
const player2 = { playerId: '2', fullName: '岩壁 次郎' };
let p1 = new BoulderResult_1.Player(player1);
let p2 = new BoulderResult_1.Player(player2);
console.log(p1.getPlayerId() + ':' + p1.getFullName());
console.log(p2.getPlayerId() + ':' + p2.getFullName());
// 確認
if (p1.getFullName() != '岩壁 太郎')
    console.log(p1.getPlayerId() + ':' + p1.getFullName() + 'は正しくありません。');
if (p2.getFullName() != '岩壁 次郎')
    console.log(p2.getPlayerId() + ':' + p2.getFullName() + 'は正しくありません。');
