/*
VARIÁVEIS DE URL

?bg=552200 > Muda a cor do fundo
?artista=registro ou termo > filtra as obras
?coltit=texto > título da coleção
?coltex=texto > texto da coleção
?singlo=true > página de obra única
?evento=registro > exibe um evento específico na página de eventos
?filtra=Villares > filtra artistas na página de artistas

*/

/*

Função que captura parâmetros de url

*/
$_GET = [];
(function () {
  corte = window.location.href.toString().indexOf("?");
  if (corte > 0) {
    argumento = window.location.href.toString().substring(corte + 1);
    argumentos = argumento.split("&");
    for (arg in argumentos) {
      let argCorte = argumentos[arg].indexOf("=");
      $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(
        argCorte + 1
      );
    }
  }
})();

let capturateclas = true;
let turnoffteclas = function () {
  capturateclas = false;
  document.getElementsByClassName("lupa")[0].style.display = "none";
};

/*

Lida com mensagens entre iframes

*/

window.onmessage = function (e) {
  console.log("mensagem recebida: " + e.data);
  window.location.href = e.data;

  /*
  if (e.data == "g") {
    goprev();
  } else if (e.data == "n") {
    gonext();
  } else {
    nowgo(parseInt(e.data));
  }
  */
};

/*

Função que abre uma obra única 

*/

let vaiprasingle = function (u) {
  window.location.href = u;
};

/*

Função que desativa fundo extra 

*/

let turnoffundo = function () {
  fundoativado = false;
};

/*

Função que controla scroll e paralax

*/
let taruntoppos = -Infinity;
let fundoativado = true;
document.addEventListener("scroll", function () {
  if (tarun) {
    closerun();
  }

  document.getElementById("fundo").style.top =
    (document.getElementById("wrap").getBoundingClientRect().top -
      window.innerHeight -
      103) /
      2 +
    "px";

  if (
    fundoativado &&
    document.getElementById("wrap").getBoundingClientRect().top < 229
  ) {
    document.getElementById("espacamento").classList.add("criaespaco");
  }

  if (
    document.getElementById("wrap").getBoundingClientRect().top >
    window.innerHeight - 100
  ) {
    document.getElementById("coverplate").classList.add("apagacover");
    document.getElementById("fundo").classList.add("desaturafundo");
    document.getElementById("header").classList.add("headercolor");
  } else {
    document.getElementById("coverplate").classList.remove("apagacover");
    document.getElementById("fundo").classList.remove("desaturafundo");
    document.getElementById("header").classList.remove("headercolor");
  }

  document.getElementById("stage").style.top =
    document.getElementsByClassName("wrapexpoinfo")[0].getBoundingClientRect()
      .top +
    60 +
    "px";

  let compexpo = document.getElementsByClassName("wrapexpoinfo");

  for (let i = 0; i < compexpo.length; i++) {
    if (
      compexpo[i].getBoundingClientRect().top <
      document.getElementById("header").getBoundingClientRect().top +
        document.getElementById("header").getBoundingClientRect().height +
        10
    ) {
      document
        .getElementsByClassName("submenucover")
        [i].classList.add("fazvidro");
    } else {
      document
        .getElementsByClassName("submenucover")
        [i].classList.remove("fazvidro");
    }
  }
});

/*
Função que controla apresentação da pesquisa

*/
document.addEventListener("keydown", function (e) {
  if (capturateclas) {
    if (menunormal) {
      togglenav();
      document.getElementsByTagName("input")[0].value = e.key;
      document
        .getElementsByTagName("input")[0]
        .dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      document
        .getElementsByTagName("input")[0]
        .dispatchEvent(new Event("input", { bubbles: true }));
      if (document.getElementsByTagName("input")[0].value != "") {
        document
          .getElementsByTagName("input")[0]
          .dispatchEvent(new Event("input", { bubbles: true }));
        document.getElementById("pesquisa").classList.add("mostra");
      } else {
        document.getElementById("pesquisa").classList.remove("mostra");
      }
    }
  }
});

/*

Função que controla transição de elementos na lateral

*/
let move = function (variavel, valor) {
  document.documentElement.style.setProperty(variavel, valor);
};

let menunormal = true;
let togglenav = function () {
  if (menunormal) {
    move("--dim-nav", "calc(-100vw + 150px)");
    menunormal = false;

    document.getElementById("entradanav").value = "";
    document
      .getElementById("entradanav")
      .dispatchEvent(new Event("input", { bubbles: true }));

    setTimeout(function () {
      document.getElementById("entradanav").focus();
    }, 500);
  } else {
    move("--dim-nav", 0);

    document.getElementById("pesquisa").classList.remove("mostra");

    document.getElementById("entradanav").value = "";
    document
      .getElementById("entradanav")
      .dispatchEvent(new Event("input", { bubbles: true }));

    menunormal = true;
  }
};

let sub = function (p) {
  let todos = document.getElementsByClassName("sm");
  for (let i = 0; i < todos.length; i++) {
    todos[i].classList.remove("submenuativo");
  }
  document.getElementById("sm" + p).classList.add("submenuativo");
  let ponto = p * -50;
  move("--sub-menu", ponto + "%");
};

/*

Função que mostra background no topo da página

*/

let showback = function () {
  if (!window.location.pathname.toString().match(/expo/i)) {
    document.getElementById("topword").classList.add("topwordshow");
  }
};

let removeback = function () {
  if (!window.location.pathname.toString().match(/expo/i)) {
    document.getElementById("topword").classList.remove("topwordshow");
  }
};

let gomain = function () {
  window.location.assign("../expo");
};

/* 

Função para apresentar a data de hoje

*/
const hoje = new Date();
const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
const nomeDoDia = diasDaSemana[hoje.getDay()];
const dataExtenso = hoje.toLocaleDateString("pt-BR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

document.getElementById("datadehoje").innerHTML = dataExtenso;

document.getElementById("fundo").style.top =
  (document.getElementById("wrap").getBoundingClientRect().top -
    window.innerHeight -
    103) /
    2 +
  "px";

/*

função para mudar a cor da página

*/
if (typeof $_GET["bg"] != "undefined") {
  localStorage.setItem("bgcolor", "#" + $_GET["bg"] + "dd");
} else {
  if (
    localStorage.getItem("bgcolor") == "" ||
    typeof localStorage.getItem("bgcolor") == "undefined" ||
    localStorage.getItem("bgcolor") == null
  ) {
    localStorage.setItem("bgcolor", "#5d3b3bee");
  }
}

if (
  typeof $_GET["bg"] != "undefined" &&
  ($_GET["bg"] == "" || $_GET["bg"] == "default")
) {
  localStorage.setItem("bgcolor", "#5d3b3bee");
}

if (
  localStorage.getItem("bgcolor") != "" &&
  typeof localStorage.getItem("bgcolor") != "undefined"
) {
  document.documentElement.style.setProperty(
    "--cor-cover",
    localStorage.getItem("bgcolor")
  );
}

/*

Função que apresenta obras na lateral

*/
let tarun = false;
const togglerun = function (u) {
  if (tarun) {
    tarun = false;
    document.getElementById("stage").innerHTML = "";
    document.documentElement.style.setProperty("--dim-stage", "0px");
  } else {
    tarun = true;
    document.getElementById("stage").innerHTML = `
          <iframe allow="camera; microphone" style="width: 100%; height: calc(79dvh - 140px);" frameborder=0 src="${u}"></iframe>
          `;
    document.documentElement.style.setProperty(
      "--dim-stage",
      "calc(75vw - (var(--dim-margens, 40px) + 10px)"
    );
  }
};

const closerun = function () {
  taruntoppos = -Infinity;
  tarun = false;
  document.getElementById("stage").innerHTML = "";
  document.documentElement.style.setProperty("--dim-stage", "0px");
};

const linka = function (u) {
  window.location.href = u;
};

/*

  Apresentação das coleções

*/

const listacolecoes = function (dt) {
  let code = `<div class='small' style="margin-top: 60px;">${textopequeno}</div><div class='listagrid'><div class='line'></div>`;
  for (let i = 0; i < dt.length; i++) {
    code += `<a href="${decodeURIComponent(
      dt[i]["Link"]
    )}">${decodeURIComponent(dt[i]["Coleção"])}</a>`;
  }

  code += "</div>";
  document.getElementById("maislistas").innerHTML = code;
  document.getElementById("maislistas").style.display = "inline-block";
};

/*

  Captura todas as obras para iniciar a parte de autores

  */
let todasobras = [];
const iniciaautores = function (d) {
  let dt = cfilter(d, "Público", "_pub");
  todasobras = dt;

  gsdata(
    "https://docs.google.com/spreadsheets/d/19VHFeFgGRGFgxRutbD1Ysjn_5XTAXCHWmlnCq82dNMM/edit?gid=198478762#gid=198478762",
    showautores
  );
};

/*

  Apresenta os artistas da galeria

  */

const showautores = function (dtA) {
  let dtB = "";
  if (
    typeof $_GET["filtra"] != "undefined" &&
    $_GET["filtra"] != null &&
    $_GET["filtra"] != ""
  ) {
    dtB = $_GET["filtra"];
  }

  let obras = [];
  let quantas = 4;
  let thumbs = "<div class='thumbs'>";

  let dtC = selecte(dtA, dtB);

  let data = alphabetic(dtC, "Nick");

  let code = `<div id="variosartistas"><div style="margin-top: 60px; margin-bottom: 40px; height: 1px; width: 100%; background-color: var(--cor-fg, #ffffff)"></div>`;

  for (let i = 0; i < data.length; i++) {
    obras = selecte(todasobras, data[i]["AutorID"]);
    quantas = 4;
    if (obras.length < quantas) {
      quantas = obras.length;
    }

    thumbs = "";

    for (let j = 0; j < quantas; j++) {
      thumbs += `<div style='width: 100%; aspect-ratio: 1/1; background-size: cover; background-position: center center; background-image: url(${imagefromallsources(
        obras[j]["Imagem"]
      )})'></div>`;
    }

    thumbs += "";

    code += `<div class="gridartistas" onclick='linka("../obras/?artista=${
      data[i]["AutorID"]
    }")'>
             <div class="nick">
             <div style="margin-top: 8px; margin-bottom: 10px; width: 100%; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px 10px;">
             <div style="grid-row: 1/span 2; background-repeat: no-repeat; background-position: center center; background-size: cover; width: 100%; aspect-ratio: 1/1; background-image: url(${imagefromallsources(
               data[i].Foto
             )})";>
            </div>
              ${thumbs}
             </div>

             ${data[i].Nick}
             </div>
             <div class="descrit" style="grid-template-rows: auto;">${
               data[i].Perfil
             }</div>
             
             </div>
             <div style="margin-top: 60px; margin-bottom: 40px; height: 1px; width: 100%; background-color: var(--cor-fg, #ffffff)"></div>`;
  }

  code += `</div>`;

  document.getElementById("wrap").innerHTML = code;
};

/*

  Apresentação das obras de um autor ou de uma exposição

  */

let mostraoque = "_star";
if (
  typeof $_GET["artista"] != "undefined" &&
  $_GET["artista"] != null &&
  $_GET["artista"] != ""
) {
  mostraoque = decodeURIComponent($_GET["artista"]);
}

let forcaexpo = function () {
  if (
    typeof $_GET["mostraexpo"] != undefined &&
    $_GET["mostraexpo"] != null &&
    $_GET["mostraexpo"] != ""
  ) {
    let code = "";

    if (
      typeof $_GET["coltit"] != "undefined" &&
      $_GET["coltit"] != null &&
      $_GET["coltit"] != ""
    ) {
      tit = decodeURIComponent($_GET["coltit"]);
    }

    if (
      typeof $_GET["coltex"] != "undefined" &&
      $_GET["coltex"] != null &&
      $_GET["coltex"] != ""
    ) {
      texto = decodeURIComponent($_GET["coltex"]);
    }

    code += `
            <div class="titulo">${tit}</div>
            <div class="profile">
            <div style="color: #ffffff88;">${texto}</div>
            <div>`;

    document.getElementById("wrap").innerHTML = code;
  }
};

let quantautores = 0;

const showwrap = function (dt) {
  let data = selecte(dt, mostraoque);
  quantautores = data.length;
  console.log("autores: " + quantautores);
  console.table(data);

  if (data.length > 0) {
    let tit = data[0].Nick;
    let texto = data[0].Perfil;
    let code = "";

    if (
      typeof $_GET["coltit"] != "undefined" &&
      $_GET["coltit"] != null &&
      $_GET["coltit"] != ""
    ) {
      tit = decodeURIComponent($_GET["coltit"]);
    }

    if (
      typeof $_GET["coltex"] != "undefined" &&
      $_GET["coltex"] != null &&
      $_GET["coltex"] != ""
    ) {
      texto = decodeURIComponent($_GET["coltex"]);
    }

    if (
      (typeof $_GET["coltex"] == "undefined" ||
        $_GET["coltex"] == null ||
        $_GET["coltex"] == "") &&
      data.length > 1
    ) {
      texto = "Seleção de obras de autores variados";
    }

    if (
      data.length == 1 ||
      (data.length > 1 &&
        typeof $_GET["coltit"] != "undefined" &&
        $_GET["coltit"] != null &&
        $_GET["coltit"] != "")
    ) {
      code += `
            <div class="titulo">${tit}</div>`;
    }

    code += `
            <div class="profile">
            <div style="color: #ffffff88;">${texto}</div>
            <div>`;

    if (data.length == 1) {
      code += `<div style='background-repeat: no-repeat; background-position: center center; background-size: cover; width: 100%; aspect-ratio: 1/1; background-image: url(${imagefromallsources(
        data[0].Foto
      )})';></div>`;
    }

    code += `</div>`;

    document.getElementById("wrap").innerHTML = code;

    /*

    if (typeof mostraoque == "_star") {
      textopequeno = "Coleções";
      gsdata(
        "https://docs.google.com/spreadsheets/d/19VHFeFgGRGFgxRutbD1Ysjn_5XTAXCHWmlnCq82dNMM/edit?gid=112869440#gid=112869440",
        listacolecoes
      );
    }
    
    */
  } else {
    turnoffundo();
    document.getElementById("wrap").style.display = "none";
    document.getElementsByClassName("componenteobras")[0].style.marginTop =
      "0px";
    document.getElementById("foot").style.marginTop = "20px";
    document.getElementsByClassName("wrapexpoinfo")[0].style.marginBottom =
      "0px";
  }
};

const showobras = function (dt) {
  let fundo = "";
  let rof = shuffle(dt.length, dt.length);

  fundo += `<div class="linksingle" onclick="vaiprasingle('../obras/?artista=${
    dt[rof[0]]["ObraID"]
  }&singlo=true')">${dt[rof[0]]["Título"]}, ${dt[rof[0]]["Ano"]}</div>`;

  for (let i = 0; i < dt.length; i++) {
    fundo += `
        <div class="bgs" style="background-image: url(${imagefromallsources(
          dt[rof[i]].Imagem
        )});"></div>
        `;
  }

  document.getElementById("fundo").innerHTML = fundo;

  let data = selecte(dt, mostraoque);

  let code = "";

  for (let i = 0; i < data.length; i++) {
    code += `
                <div>
                    <div class="clicavel" onclick="togglerun('${
                      data[i].Embed
                    }', this)" style="
                        width: 100%;
                        height: calc(60dvh + 20px);
                        background-position: center center;
                        background-size: cover;
                        background-image: url(${imagefromallsources(
                          data[i].Imagem
                        )});
                    "
                    ></div>
                </div>

                <div class="clicavel textoexplica" onclick="togglerun('${
                  data[i].Embed
                }', this)">
                    <span class='nomedaobra'>${data[i]["Título"]}</span>`;

    let qpessoas = unique(data, "Autor").length;
    console.log("Coloca nome?? -> " + qpessoas + " e " + data.length);

    if (qpessoas != 1 || typeof $_GET["singlo"] != "undefined") {
      code += `<br><span class='nomedaobra'>${data[i]["Autor"]}, ${data[i]["Ano"]}</span>`;
    }

    code += `<br><br>
                    ${data[i]["Descrição"]}
                </div>
            
            `;
  }

  document.getElementsByClassName("componenteobras")[0].innerHTML = code;
  document.getElementsByClassName(
    "submenuexpo"
  )[0].innerHTML = `<div id="sm0" class="sm submenuativo" onclick="sub(0)">Obras</div>`;

  console.log(mostraoque);

  if (mostraoque == "_star") {
    textopequeno = "Coleções";
    gsdata(
      "https://docs.google.com/spreadsheets/d/19VHFeFgGRGFgxRutbD1Ysjn_5XTAXCHWmlnCq82dNMM/edit?gid=112869440#gid=112869440",
      listacolecoes
    );
  }
};

/*

  Constroi apenas o backgorund

  */
const showeventosfundo = function (dt) {
  let fundo = "";
  let rof = shuffle(dt.length, dt.length);

  fundo += `<div class="linksingle" onclick="vaiprasingle('../obras/?artista=${
    dt[rof[0]]["ObraID"]
  }&singlo=true')">${dt[rof[0]]["Título"]}, ${dt[rof[0]]["Ano"]}</div>`;

  for (let i = 0; i < dt.length; i++) {
    fundo += `
        <div class="bgs" style="background-image: url(${imagefromallsources(
          dt[rof[i]].Imagem
        )});"></div>
        `;
  }

  document.getElementById("fundo").innerHTML = fundo;
};

/*

  Constroi detalhes de um evento (programa, sobre, equipe, etc.)

  */
let linkdetalhesevento =
  "https://docs.google.com/spreadsheets/d/1lSbdU1r4SRSzdKoBXdOLW0Q2x-5oIproqzR2T-ughy8/edit?gid=415680199#gid=415680199";

const showdetalhesevento = function (dt) {
  let headercode = ``;
  let expocode = ``;
  let conta = 0;

  for (let c in dt[0]) {
    expocode += `<div>${dt[0][c]}</div>`;
    if (c != "Default") {
      if (c.charAt(0) == "-") {
        conta++;
      } else {
        headercode += `<div id="sm${conta}" class="sm submenuativo" onclick="sub(${conta})">${c}</div>`;
        conta++;
      }
    }
  }

  document.getElementsByClassName("submenuexpo")[0].innerHTML = headercode;
  document.getElementsByClassName("conteudoexpo")[0].innerHTML = expocode;
  sub(0);
};

/*

  Constroi página de eventos

  */
let textopequeno = "";
const showevento = function (dp) {
  let dt = cfilter(dp, "Tipo", "_evt");
  let tituloev = "";
  let subtituloev = "";
  if (textopequeno == "") {
    textopequeno = "Outros Eventos";
  }

  let outrosev = `<div class='small'>${textopequeno}</div><div class='listagrid'><div class='line'></div>`;

  if (
    typeof $_GET["evento"] != "undefined" &&
    $_GET["evento"] != null &&
    $_GET["evento"] != ""
  ) {
    for (let i = 0; i < dt.length; i++) {
      if (dt[i]["EventoID"] == $_GET["evento"]) {
        linkdetalhesevento = dt[i]["LinkDetalhes"];
        tituloev = dt[i]["Título"];
        subtituloev = dt[i]["Subtítulo"];
      } else {
        outrosev += `<a href="./?evento=${dt[i]["EventoID"]}">${dt[i]["Título"]}</a>`;
      }
    }
  } else {
    linkdetalhesevento = dt[0]["LinkDetalhes"];
    tituloev = dt[0]["Título"];
    subtituloev = dt[0]["Subtítulo"];

    for (let i = 1; i < dt.length; i++) {
      outrosev += `<a href="./?evento=${dt[i]["EventoID"]}">${dt[i]["Título"]}</a>`;
    }
  }

  outrosev += "</div>";

  document.getElementsByClassName("titulo")[0].innerHTML = tituloev;
  document.getElementsByClassName("subtitulo")[0].innerHTML = subtituloev;
  document.getElementById("maislistas").innerHTML = outrosev;
  document.getElementById("maislistas").style.display = "inline-block";

  gsdata(linkdetalhesevento, showdetalhesevento);
};

/*

  Constroi página de promoções de eventos ou chamadas

  */

const showpromo = function (dt) {
  let tituloev = "";
  let subtituloev = "";

  if (
    typeof $_GET["evento"] != "undefined" &&
    $_GET["evento"] != null &&
    $_GET["evento"] != ""
  ) {
    for (let i = 0; i < dt.length; i++) {
      if (dt[i]["EventoID"] == $_GET["evento"]) {
        linkdetalhesevento = dt[i]["LinkDetalhes"];
        tituloev = dt[i]["Título"];
        subtituloev = dt[i]["Subtítulo"];
      }
    }
  } else {
    linkdetalhesevento = dt[0]["LinkDetalhes"];
    tituloev = dt[0]["Título"];
    subtituloev = dt[0]["Subtítulo"];
  }

  document.getElementsByClassName("titulo")[0].innerHTML = tituloev;
  document.getElementsByClassName("subtitulo")[0].innerHTML = subtituloev;

  gsdata(linkdetalhesevento, showdetalhesevento);
};

/*

  Constroi página de exposições

  */

const showexposicao = function (dt) {
  let tituloev = "";
  let subtituloev = "";
  let linkobras = "";
  if (textopequeno == "") {
    textopequeno = "Outros Eventos";
  }

  let outrosev = `<div class='small'>${textopequeno}</div><div class='listagrid'><div class='line'></div>`;

  if (
    typeof $_GET["evento"] != "undefined" &&
    $_GET["evento"] != null &&
    $_GET["evento"] != ""
  ) {
    for (let i = 0; i < dt.length; i++) {
      if (dt[i]["EventoID"] == $_GET["evento"]) {
        linkobras = dt[i]["EventoID"];
        linkdetalhesevento = dt[i]["LinkDetalhes"];
        tituloev = dt[i]["Título"];
        subtituloev = dt[i]["Subtítulo"];
      } else {
        outrosev += `<a href="./?evento=${dt[i]["EventoID"]}">${dt[i]["Título"]}</a>`;
      }
    }
  } else {
    linkobras = dt[0]["EventoID"];
    console.log("linkobras: " + linkobras);
    linkdetalhesevento = dt[0]["LinkDetalhes"];
    tituloev = dt[0]["Título"];
    subtituloev = dt[0]["Subtítulo"];

    for (let i = 1; i < dt.length; i++) {
      outrosev += `<a href="./?evento=${dt[i]["EventoID"]}">${dt[i]["Título"]}</a>`;
    }
  }

  console.log("linkobras: " + linkobras);

  outrosev += "</div>";

  document.getElementById(
    "linkaobras"
  ).href = `../obras/?artista=${linkobras}&coltit=${tituloev}&coltex=${subtituloev}`;
  document.getElementsByClassName("titulo")[0].innerHTML = tituloev;
  document.getElementsByClassName("subtitulo")[0].innerHTML = subtituloev;
  document.getElementById("maislistas").innerHTML = outrosev;
  document.getElementById("maislistas").style.display = "inline-block";

  gsdata(linkdetalhesevento, showdetalhesevento);
};

/*

   Verifica se é uma página com uma única obra, e modifica o link para retorno

*/

if (
  typeof $_GET["singlo"] != "undefined" &&
  $_GET["singlo"] != "" &&
  $_GET["singlo"] != null
) {
  document.getElementById("retornagaleria").onclick = function () {
    history.back();
  };
  document.getElementById(
    "retornagaleria"
  ).innerHTML = `<div id="topword"><span id="iconback">&nbsp;‹&nbsp;&nbsp;</span>Retorna</div>`;
}
