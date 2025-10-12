export default ({
  p5,
  el = "iddoelemento",
  fcolor = "#000000",
  bgcolor = "#FFFFFF",
  precision = 50,
}) => {
  let sketch = function (p) {
    p.r = 0; // valores aleatórios para criar o grid
    p.pc = precision; // subdivisões
    p.matriz = []; // estrutura do grid
    p.saida = ""; // log dos dados
    p.modulor = 0; // tamanho do bloco base
    p.blocos = []; // objeto contendo a lista de blocos interativos
    p.cb = 0; // contador de blocos interativos
    p.initcolor = fcolor;
    p.cordefundo = bgcolor;

    // Objeto de mouse virtual
    p.virtualmouse = {
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
      run: function () {
        this.rx = Math.random();
        this.ry = Math.random();

        this.rx = this.rx - 0.5;
        this.ry = this.ry - 0.5;

        this.x += 100 * this.rx;
        this.y += 100 * this.ry;

        if (this.x > document.getElementById(el).clientWidth) {
          this.x = document.getElementById(el).clientWidth;
        }

        if (this.y > document.getElementById(el).clientHeight) {
          this.y = document.getElementById(el).clientHeight;
        }

        if (this.x < 0) {
          this.x = 0;
        }

        if (this.y < 0) {
          this.y = 0;
        }

        // para interação com mouse, apenas remova os comentários abaixo:
        // this.x = p.mouseX;
        // this.y = p.mouseY;
      },
    };

    // Objeto bloco
    p.bloco = {
      startx: 0,
      starty: 0,
      endx: 0,
      endy: 0,
      cor: 110,
      corH: 0,
      corS: 0,
      corL: 0,
      corLOriginal: 0,
      inativo: true,
      converteCor: function (c) {
        this.corH = p.floor(p.hue(c));
        this.cor = 110;
        this.corS = p.saturation(c);
        this.corLOriginal = parseInt(p.lightness(c));
      },
      play: function () {
        if (
          this.cor != 110 ||
          (this.inativo == true &&
            p.virtualmouse.x >= this.startx &&
            p.virtualmouse.x <= this.endx &&
            p.virtualmouse.y >= this.starty &&
            p.virtualmouse.y <= this.endy)
        ) {
          if (
            p.virtualmouse.x >= this.startx &&
            p.virtualmouse.x <= this.endx &&
            p.virtualmouse.y >= this.starty &&
            p.virtualmouse.y <= this.endy
          ) {
            this.inativo = false;
          } else {
            this.inativo = true;
          }

          this.cor++;

          // comportamento do bloco

          // desenha linhas diagonais
          for (let tx = this.startx; tx <= this.endx; tx = tx + 4) {
            if (this.cor == this.corLOriginal + 1) {
              p.blendMode(p.BLEND);
              p.colorMode(p.HSB);
              p.stroke(this.corH, this.corS, this.corLOriginal);
            } else if (this.cor >= 106) {
              p.colorMode(p.RGB);
              p.stroke(p.cordefundo);
              p.blendMode(p.BLEND);
            } else {
              p.blendMode(p.LIGHTEST);
              p.colorMode(p.RGB);
              p.stroke(p.cordefundo + "15");
            }

            p.strokeWeight(1);
            p.line(
              tx,
              this.starty,
              this.startx,
              this.starty + (tx - this.startx)
            );

            p.line(tx, this.endy, this.endx, this.starty + (tx - this.startx));
          }

          /*
			// pinta o retângulo todo
				fill(this.cor);
				rectMode(CORNERS);
				rect(this.startx,this.starty,this.endx, this.endy);
			*/

          if (this.cor > 110) {
            this.cor = this.corLOriginal;
          }
        }
      },
    };

    p.pausa = function () {
      p.noLoop();
    };

    p.roda = function () {
      p.loop();
    };

    p.cnv = "";

    p.setup = function () {
      p.background(p.cordefundo);
      p.cnv = p.createCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );

      p.cnv.mouseOut(p.pausa);
      p.cnv.mouseOver(p.roda);

      p.noStroke();
      p.modulor = document.getElementById(el).clientWidth / p.pc;

      // cria toda a matriz;
      for (let i = 0; i < p.pc * 2; i++) {
        p.matriz[i] = [];
        for (let k = 0; k < p.pc * 2; k++) {
          p.matriz[i][k] = 0;
        }
      }

      console.table(p.matriz);

      // divide o grid deformado
      for (let y = 0; y < p.pc; y++) {
        p.saida = "";
        for (let x = 0; x < p.pc; x++) {
          if (p.matriz[x][y] == 0) {
            p.r = Math.random();
            if (
              p.r >= 0.9 &&
              p.matriz[x + 1][y] == 0 &&
              p.matriz[x + 2][y] == 0 &&
              p.matriz[x + 3][y] == 0 &&
              p.matriz[x][y + 1] == 0 &&
              p.matriz[x + 1][y + 1] == 0 &&
              p.matriz[x + 2][y + 1] == 0 &&
              p.matriz[x + 3][y + 1] == 0 &&
              p.matriz[x][y + 2] == 0 &&
              p.matriz[x + 1][y + 2] == 0 &&
              p.matriz[x + 2][y + 2] == 0 &&
              p.matriz[x + 3][y + 2] == 0 &&
              p.matriz[x][y + 3] == 0 &&
              p.matriz[x + 1][y + 3] == 0 &&
              p.matriz[x + 2][y + 3] == 0 &&
              p.matriz[x + 3][y + 3] == 0
            ) {
              p.matriz[x][y] = 4;
              p.matriz[x + 1][y] = 5;
              p.matriz[x + 2][y] = 5;
              p.matriz[x + 3][y] = 5;
              p.matriz[x][y + 1] = 5;
              p.matriz[x + 1][y + 1] = 5;
              p.matriz[x + 2][y + 1] = 5;
              p.matriz[x + 3][y + 1] = 5;
              p.matriz[x][y + 2] = 5;
              p.matriz[x + 1][y + 2] = 5;
              p.matriz[x + 2][y + 2] = 5;
              p.matriz[x + 3][y + 2] = 5;
              p.matriz[x][y + 3] = 5;
              p.matriz[x + 1][y + 3] = 5;
              p.matriz[x + 2][y + 3] = 5;
              p.matriz[x + 3][y + 3] = 5;
            } else if (
              p.r >= 0.6 &&
              p.r < 0.9 &&
              p.matriz[x + 1][y] == 0 &&
              p.matriz[x][y + 1] == 0 &&
              p.matriz[x + 1][y + 1] == 0
            ) {
              p.matriz[x][y] = 2;
              p.matriz[x + 1][y] = 3;
              p.matriz[x][y + 1] = 3;
              p.matriz[x + 1][y + 1] = 3;
            } else {
              p.matriz[x][y] = 1;
            }
          }
          p.saida += p.matriz[x][y] + " ";
        }
        // print(saida);
      }

      console.table(p.matriz);

      // instancia blocos
      for (let px = 0; px < p.pc; px++) {
        for (let py = 0; py < p.pc; py++) {
          if (
            p.matriz[px][py] == 1 ||
            p.matriz[px][py] == 2 ||
            p.matriz[px][py] == 4
          ) {
            p.blocos[p.cb] = { ...p.bloco };
            p.blocos[p.cb].converteCor(p.initcolor);
            p.blocos[p.cb].startx = px * p.modulor;
            p.blocos[p.cb].starty = py * p.modulor;
            p.blocos[p.cb].endx = px * p.modulor + p.modulor * p.matriz[px][py];
            p.blocos[p.cb].endy = py * p.modulor + p.modulor * p.matriz[px][py];
            p.cb++;
          }
        }
      }
    };

    p.draw = function () {
      p.virtualmouse.run();

      for (let i = 0; i < p.blocos.length; i++) {
        p.blocos[i].play();
      }
    };

    p.windowResized = function () {
      p.cnv = p.resizeCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );
      p.modulor = document.getElementById(el).clientWidth / p.pc;
    };
  };

  return new p5(sketch, el);
};
