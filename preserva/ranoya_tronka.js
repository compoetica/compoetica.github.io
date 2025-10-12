export default ({
  p5,
  el = "iddoelemento",
  fcolor = "#000000",
  bgcolor = "#FFFFFF",
}) => {
  let sketch = function (p) {
    p.r = 1;
    p.fator = 0.8;
    p.linesize = 10;
    p.mapa = [];
    p.c = 0;
    p.ci = 0;
    p.cnv = "";

    p.pausa = function () {
      if (p.ci < p.mapa.length) {
        p.noLoop();
      }
    };

    p.roda = function () {
      if (p.ci < p.mapa.length) {
        p.loop();
      }
    };

    p.setup = function () {
      p.cnv = p.createCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );
      p.cnv.mouseOut(p.pausa);
      p.cnv.mouseOver(p.roda);

      p.background(bgcolor);

      p.stroke(fcolor);
      p.strokeWeight(1);

      for (let a = 0; a < 1000 * Math.PI; a = a + 0.005) {
        if (a > 200) {
          p.fator = 0.8 * (p.r / 500);
        }
        if (Math.random() > p.fator) {
          p.mapa[p.c] = {};
          p.mapa[p.c].x1 = Math.cos(a) * p.r;
          p.mapa[p.c].y1 = Math.sin(a) * p.r;
          p.mapa[p.c].x2 = Math.cos(a) * (p.r - p.linesize);
          p.mapa[p.c].y2 = Math.sin(a) * (p.r - p.linesize);
          p.c++;
        }

        p.r = p.r + 0.01;
      }
    };

    p.draw = function () {
      p.push();
      p.translate(
        document.getElementById(el).clientWidth / 2,
        document.getElementById(el).clientHeight / 2
      );

      p.line(
        p.mapa[p.ci].x1,
        p.mapa[p.ci].y1,
        p.mapa[p.ci].x2,
        p.mapa[p.ci].y2
      );

      p.line(
        p.mapa[p.ci].x1,
        p.mapa[p.ci].y1,
        p.mapa[p.ci].x2,
        p.mapa[p.ci].y2
      );

      p.line(
        p.mapa[p.ci].x1,
        p.mapa[p.ci].y1,
        p.mapa[p.ci].x2,
        p.mapa[p.ci].y2
      );
      p.ci++;

      if (p.ci >= p.mapa.length) {
        p.noLoop();
      }

      p.pop();
    };

    p.windowResized = function () {
      p.cnv = p.resizeCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );

      p.r = 1;
      p.fator = 0.8;
      p.mapa = [];
      p.c = 0;
      p.ci = 0;

      p.loop();
      p.setup();
    };
  };

  return new p5(sketch, el);
};
