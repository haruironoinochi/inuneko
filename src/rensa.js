class Rensa {
 // static fontTemplateList = [];
 // static fontLength;
 // static rensa = 0;
 static initialize() {
 this.fontTemplateList = [];
 let fontWidth = 0;
 for(let i = 0; i < 10; i++) {
 const fontImage = document.getElementById(`font${i}`);
 if(fontWidth === 0) {
 fontWidth = fontImage.width / fontImage.height * Config.fontHeight;
 }
 fontImage.height = Config.fontHeight;
 fontImage.width = fontWidth;
 this.fontTemplateList.push(fontImage);
 }
 this.fontLength = Math.floor(Config.stageCols * Config.puyoImgWidth / this.fontTemplateList[0].width);
 this.rensa = 0;
 this.showRensa();
 }
 static showRensa () {
 let rensa = this.rensa;
 const rensaElement = Stage.rensaElement;
 // まず最初に、rensaElement の中身を空っぽにする
 while(rensaElement.firstChild) {
 rensaElement.removeChild(rensaElement.firstChild);
 }
 // スコアを下の桁から埋めていく
 for(let i = 0; i < this.fontLength; i++) {
 // 10で割ったあまりを求めて、一番下の桁を取り出す
 const number = rensa % 10;
 // 一番うしろに追加するのではなく、一番前に追加することで、スコアの並びを数字と同じようにする
 rensaElement.insertBefore(this.fontTemplateList[number].cloneNode(true), rensaElement.firstChild);
  10 で割って次の桁の準備をしておく
 rensa = Math.floor(score / 10);
 }
 }
 static calculateScore (rensa, piece, color) {
 rensa = Math.min(rensa, Rensa.rensaBonus.length - 1);
 piece = Math.min(piece, Rensa.pieceBonus.length - 1);
 color = Math.min(color, Rensa.colorBonus.length - 1);
 let scale = Rensa.rensaBonus[rensa] + Rensa.pieceBonus[piece] + Rensa.colorBonus[color];
 if(scale === 0) {
 scale = 1;
 }
 this.addRensa(scale * piece * 10);
 }
 static addRensa (score) {
 this.rensa += 1;
  this.showRensa();
  }
 };
 Rensa.rensaBonus = [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672];
 Rensa.pieceBonus = [0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10, 10];
 Rensa.colorBonus = [0, 0, 3, 6, 12, 24];
