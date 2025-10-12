// FUNÇÃO URL GET
// urlGet('xpto'); www.site.com/?xpto=teste
// let data = $_GET['xpto']; www.site.com/?xpto=teste

urlGet = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

$_GET = [];
(function () {
    corte = window.location.href.toString().indexOf('?');
    if (corte > 0) {
        argumento = window.location.href.toString().substring(corte + 1);
        argumentos = argumento.split('&');
        for (arg in argumentos) {
            let argCorte = argumentos[arg].indexOf('=');
            $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(argCorte + 1);
        }
    }
})();

if ($_GET['bgcolor']) {

    document.documentElement.style.setProperty('--cor-invert', "#" + $_GET['bgcolor']);
}

if ($_GET['fcolor']) {

    document.documentElement.style.setProperty('--cor-base', "#" + $_GET['fcolor']);
}

if ($_GET['highlight']) {

    document.documentElement.style.setProperty('--cor-highlight', "#" + $_GET['highlight']);
    document.documentElement.style.setProperty('--hamburger-on', "#" + $_GET['highlight']);
}

if ($_GET['midcolor']) {

    document.documentElement.style.setProperty('--cor-mid', "#" + $_GET['midcolor']);
    document.documentElement.style.setProperty('--cor-lighter', "#" + $_GET['midcolor'] + "99");
    document.documentElement.style.setProperty('--hamburger-off', "#" + $_GET['midcolor']);
}