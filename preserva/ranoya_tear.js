export default ({
  p5,
  el = "iddoelemento",
  fcolor = "#000000",
  bgcolor = "#FFFFFF",
  rastro = 1,
}) => {
  let sketch = function (p) {
    p.c = 0;
    p.a = 0;
    p.r = Math.random();
    p.s = 0.008;
    if (p.r >= 0.55) {
      p.s = -0.008;
    }

    p.vector = {
      dir: 0,
      lim_x: 1,
      lim_y: 1,
      act_x: 0,
      act_y: 0,
      act_vx: 0,
      act_vy: 0,
      sx: 0.1,
      sy: 0.1,
      c: 1,
      resolve: function () {
        if (this.c > 30) {
          if (this.dir == 0) {
            this.lim_x = p.random(6) - 2;
            this.lim_y = p.random(1);
          }

          if (this.dir == 1) {
            this.lim_x = p.random(3) - 2;
            this.lim_y = p.random(3);
          }

          if (this.dir == 2) {
            this.lim_x = p.random(1) - 3;
            this.lim_y = p.random(3);
          }

          if (this.dir == 3) {
            this.lim_x = -1 * p.random(1);
            this.lim_y = p.random(3) - 2;
          }

          if (this.dir == 4) {
            this.lim_x = p.random(1) - 3;
            this.lim_y = p.random(3) - 4;
          }

          if (this.dir == 5) {
            this.lim_x = p.random(3) - 2;
            this.lim_y = -1 * p.random(3);
          }

          if (this.dir == 6) {
            this.lim_x = p.random(6) - 2;
            this.lim_y = -1 * p.random(1);
          }

          if (this.dir == 7) {
            this.lim_x = p.random(6);
            this.lim_y = p.random(3) - 4;
          }

          if (this.dir == 8) {
            this.lim_x = p.random(6);
            this.lim_y = p.random(1);
          }

          this.c = 1;
        }

        this.act_vx += this.lim_x / 30;
        this.act_vy += this.lim_y / 30;

        this.act_x += this.act_vx;
        this.act_y += this.act_vy;
        this.c += 0.7;
      },
    };

    p.v1 = { ...p.vector };
    p.v1.dir = 0;

    p.v2 = { ...p.vector };
    p.v2.dir = 1;

    p.v3 = { ...p.vector };
    p.v3.dir = 2;
    p.v3._lim_x = -1;

    p.v4 = { ...p.vector };
    p.v4.dir = 3;
    p.v4.lim_x = -1;
    p.v4_lim_y = -1;

    p.v5 = { ...p.vector };
    p.v5.dir = 4;
    p.v5.lim_x = -1;
    p.v5_lim_y = -1;

    p.v6 = { ...p.vector };
    p.v6.dir = 5;
    p.v6.lim_x = 1;
    p.v6_lim_y = -1;

    p.v7 = { ...p.vector };
    p.v7.dir = 5;
    p.v7.lim_x = 1;
    p.v7_lim_y = -1;

    p.v8 = { ...p.vector };
    p.v8.dir = 6;
    p.v8.lim_x = 1;
    p.v8_lim_y = -1;

    p.v9 = { ...p.vector };
    p.v9.dir = 7;
    p.v9.lim_x = 1;
    p.v9_lim_y = 1;

    p.mouseClicked = function () {
      p.loop();
      p.background(bgcolor);
      p.c = 0;
      p.a = 0;
      p.r = Math.random();
      p.s = 0.008;
      if (p.r >= 0.55) {
        p.s = -0.008;
      }
      p.v1 = { ...p.vector };
      p.v1.dir = 0;
      p.v1.lim_x = 1;
      p.v1.lim_y = 1;

      p.v2 = { ...p.vector };
      p.v2.dir = 1;
      p.v2.lim_x = 1;
      p.v2.lim_y = 1;

      p.v3 = { ...p.vector };
      p.v3.dir = 2;
      p.v3._lim_x = -1;
      p.v3._lim_y = 1;

      p.v4 = { ...p.vector };
      p.v4.dir = 3;
      p.v4.lim_x = -1;
      p.v4_lim_y = -1;

      p.v5 = { ...p.vector };
      p.v5.dir = 4;
      p.v5.lim_x = -1;
      p.v5_lim_y = -1;

      p.v6 = { ...p.vector };
      p.v6.dir = 5;
      p.v6.lim_x = 1;
      p.v6_lim_y = -1;

      p.v7 = { ...p.vector };
      p.v7.dir = 5;
      p.v7.lim_x = 1;
      p.v7_lim_y = -1;

      p.v8 = { ...p.vector };
      p.v8.dir = 6;
      p.v8.lim_x = 1;
      p.v8_lim_y = -1;
    };

    p.pausa = function () {
      p.noLoop();
    };

    p.roda = function () {
      p.loop();
    };

    p.cnv = "";

    p.setup = function () {
      p.cnv = p.createCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );
      p.cnv.mouseOut(p.pausa);
      p.cnv.mouseOver(p.roda);

      p.stroke(fcolor);
      p.strokeWeight(1);
      p.background(bgcolor);
    };

    p.draw = function () {
      p.push();

      p.translate(p.windowWidth / 2, p.windowHeight / 2);
      p.rotate(p.a);
      p.a += p.s;

      p.line(p.v1.act_x, p.v1.act_y, p.v3.act_x, p.v3.act_y);
      p.line(p.v3.act_x, p.v3.act_y, p.v2.act_x, p.v2.act_y);
      p.line(p.v2.act_x, p.v2.act_y, p.v5.act_x, p.v5.act_y);
      p.line(p.v5.act_x, p.v5.act_y, p.v4.act_x, p.v4.act_y);
      p.line(p.v4.act_x, p.v4.act_y, p.v7.act_x, p.v7.act_y);
      p.line(p.v7.act_x, p.v7.act_y, p.v6.act_x, p.v6.act_y);
      p.line(p.v6.act_x, p.v6.act_y, p.v8.act_x, p.v8.act_y);
      p.line(p.v8.act_x, p.v8.act_y, p.v1.act_x, p.v1.act_y);

      p.v1.resolve();
      p.v2.resolve();
      p.v3.resolve();
      p.v4.resolve();
      p.v5.resolve();
      p.v6.resolve();
      p.v7.resolve();
      p.v8.resolve();

      if (p.v8.act_x > 3 * p.windowWidth) {
        p.noLoop();
      }

      p.pop();
    };

    p.windowResized = function () {
      p.cnv = p.resizeCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );

      p.loop();
      p.background(bgcolor);
      p.c = 0;
      p.a = 0;
      p.r = Math.random();
      p.s = 0.008;
      if (p.r >= 0.55) {
        p.s = -0.008;
      }
      p.v1 = { ...p.vector };
      p.v1.dir = 0;
      p.v1.lim_x = 1;
      p.v1.lim_y = 1;

      p.v2 = { ...p.vector };
      p.v2.dir = 1;
      p.v2.lim_x = 1;
      p.v2.lim_y = 1;

      p.v3 = { ...p.vector };
      p.v3.dir = 2;
      p.v3._lim_x = -1;
      p.v3._lim_y = 1;

      p.v4 = { ...p.vector };
      p.v4.dir = 3;
      p.v4.lim_x = -1;
      p.v4_lim_y = -1;

      p.v5 = { ...p.vector };
      p.v5.dir = 4;
      p.v5.lim_x = -1;
      p.v5_lim_y = -1;

      p.v6 = { ...p.vector };
      p.v6.dir = 5;
      p.v6.lim_x = 1;
      p.v6_lim_y = -1;

      p.v7 = { ...p.vector };
      p.v7.dir = 5;
      p.v7.lim_x = 1;
      p.v7_lim_y = -1;

      p.v8 = { ...p.vector };
      p.v8.dir = 6;
      p.v8.lim_x = 1;
      p.v8_lim_y = -1;
    };
  };

  return new p5(sketch, el);
};
