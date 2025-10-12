export default ({
  p5,
  el = "iddoelemento",
  modulo = 50,
  diametro = 40,
  bgcolor = "#1a0633",
}) => {
  let sketch = function (p) {
    p.module = parseInt(modulo);
    p.diam = parseInt(diametro);
    p.bg = bgcolor;

    p.centipede = {
      direction: 0,
      module: p.module,
      diam: p.diam,
      size: parseInt(Math.random() * 12 + 3),
      ideltax: 0,
      ideltay: 0,
      x: 0,
      y: 0,
      rd: 0,
      color: "#1a0633",
      walk: function () {
        for (let s = 0; s < this.size; s++) {
          this.rd = Math.random();
          p.fill(this.color);

          if ((this.direction == 0 || this.direction == 3) && this.rd > 0.7) {
            this.direction = 1;
          } else if (
            (this.direction == 0 || this.direction == 3) &&
            this.rd <= 0.7 &&
            this.rd > 0.3
          ) {
            this.direction = 2;
          } else if (
            (this.direction == 1 || this.direction == 2) &&
            this.rd > 0.5
          ) {
            this.direction = 3;
          } else if (
            (this.direction == 1 || this.direction == 2) &&
            this.rd <= 0.5
          ) {
            this.direction = 0;
          }

          if (Math.random() > 0.2) {
            if (
              this.direction == 1 &&
              p.get(
                this.x + this.ideltax,
                this.y + this.ideltay + this.module
              )[0] == 10
            ) {
              for (let w = 0; w < this.module; w++) {
                p.ellipse(
                  this.x + this.ideltax,
                  this.y + this.ideltay + w,
                  this.diam,
                  this.diam
                );
              }
              this.y = this.y + this.module;
            } else if (
              this.direction == 2 &&
              p.get(
                this.x + this.ideltax,
                this.y + this.ideltay - this.module
              )[0] == 10
            ) {
              for (let w = 0; w < this.module; w++) {
                p.ellipse(
                  this.x + this.ideltax,
                  this.y + this.ideltay - w,
                  this.diam,
                  this.diam
                );
              }
              this.y = this.y - this.module;
            } else if (
              this.direction == 3 &&
              p.get(
                this.x + this.ideltax + this.module,
                this.y + this.ideltay
              )[0] == 10
            ) {
              for (let w = 0; w < this.module; w++) {
                p.ellipse(
                  this.x + this.ideltax + w,
                  this.y + this.ideltay,
                  this.diam,
                  this.diam
                );
              }
              this.x = this.x + this.module;
            } else if (
              this.direction == 0 &&
              p.get(
                this.x + this.ideltax - this.module,
                this.y + this.ideltay
              )[0] == 10
            ) {
              for (let w = 0; w < this.module; w++) {
                p.ellipse(
                  this.x + this.ideltax - w,
                  this.y + this.ideltay,
                  this.diam,
                  this.diam
                );
              }
              this.x = this.x - this.module;
            }
          } else {
            p.ellipse(
              this.x + this.ideltax,
              this.y + this.ideltay,
              this.diam,
              this.diam
            );
          }
        }
      },
    };

    p.ElemCenti = [];
    p.countEC = 0;
    p.cores = ["#581845", "#C70039", "#FFC30F"];
    p.rodacor = 0;

    p.setup = function () {
      p.background(p.bg);
      p.createCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );
      p.noStroke();
    };

    p.draw = function () {
      p.background(p.bg);

      for (
        let f = p.module / 2;
        f < document.getElementById(el).clientWidth - p.module / 2;
        f = f + p.module
      ) {
        for (
          let k = p.module / 2;
          k < document.getElementById(el).clientHeight - p.module / 2;
          k = k + p.module
        ) {
          p.fill("#0a0622");
          p.ellipse(f, k, p.diam, p.diam);
        }
      }

      for (
        let f = p.module / 2;
        f < document.getElementById(el).clientWidth - p.module / 2;
        f = f + p.module
      ) {
        for (
          let k = p.module / 2;
          k < document.getElementById(el).clientHeight - p.module / 2;
          k = k + p.module
        ) {
          if (Math.random() > 0.7 && p.get(f, k)[0] == 10) {
            p.ElemCenti[p.countEC] = { ...p.centipede };
            p.ElemCenti[p.countEC].ideltax = f;
            p.ElemCenti[p.countEC].ideltay = k;
            p.ElemCenti[p.countEC].color = p.cores[p.rodacor];
            p.rodacor++;
            if (p.rodacor >= p.cores.length) {
              p.rodacor = 0;
            }
            p.ElemCenti[p.countEC].walk();
            p.countEC++;
          }
        }
      }

      p.noLoop();
    };

    p.windowResized = function () {
      p.resizeCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );
      p.background(p.bg);
      p.draw();
    };
  };

  return new p5(sketch, el);
};
