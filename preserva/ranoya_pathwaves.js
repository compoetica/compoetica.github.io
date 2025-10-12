export default ({
  p5,
  el = "iddoelemento",
  fcolor = "#000000",
  bgcolor = "#FFFFFF",
}) => {
  let sketch = function (p) {
    p.count = 0;
    p.cor = fcolor;
    p.trilhas = {};

    p.drawitself = function (arr) {
      arr.p1x = arr.rx + Math.cos(arr.a) * arr.r;
      arr.p1y = arr.ry + Math.sin(arr.a) * arr.r;
      arr.p2x = arr.rx + Math.cos(arr.a) * (arr.r + arr.esp);
      arr.p2y = arr.ry + Math.sin(arr.a) * (arr.r + arr.esp);

      p.line(arr.p1x, arr.p1y, arr.p2x, arr.p2y);

      if (Math.random() * 100 > 98) {
        arr.newr = p.int(Math.random() * 150);

        arr.deltax =
          Math.cos(arr.a) * arr.r + Math.cos(arr.a) * (arr.newr + arr.esp);
        arr.deltay =
          Math.sin(arr.a) * arr.r + Math.sin(arr.a) * (arr.newr + arr.esp);

        arr.r = arr.newr;
        arr.rx = arr.rx + arr.deltax;
        arr.ry = arr.ry + arr.deltay;

        arr.a = arr.a - Math.PI;
        arr.dir = arr.dir * -1;
        arr.step = Math.random() * 0.06;
      }

      arr.a = arr.a + arr.dir * arr.step;
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

      p.strokeWeight(1);

      for (let k = 0; k < 16; k++) {
        p.trilhas[k] = {
          detax: 0,
          deltay: 0,
          newr: 0,
          a: Math.random() * (2 * Math.PI),
          r: 80 + Math.random() * 180,
          esp: Math.random() * 150,
          step: Math.random() * 0.1,
          rx: 100,
          ry: 100,
          dir: 1,
          p1x: 0,
          p1y: 0,
          p2x: 0,
          p2y: 0,
        };

        p.trilhas[k].rx = Math.random() * p.windowWidth;
        p.trilhas[k].ry = Math.random() * p.windowHeight;
      }
    };

    p.draw = function () {
      p.count++;
      if (p.count > 2000) {
        if (p.cor == fcolor) {
          p.cor = bgcolor;
        } else {
          p.cor = fcolor;
        }

        p.count = 0;
      }

      for (let z = 0; z < 16; z++) {
        p.stroke(p.cor);
        p.drawitself(p.trilhas[z]);
      }
    };

    p.windowResized = function () {
      p.cnv = p.resizeCanvas(
        document.getElementById(el).clientWidth,
        document.getElementById(el).clientHeight
      );
    };
  };

  return new p5(sketch, el);
};
