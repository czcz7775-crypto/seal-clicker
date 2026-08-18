const sonidoFoca = new Audio();
sonidoFoca.src = "./foca.mp3";
sonidoFoca.preload = "auto";
/* =========================
   SEAL CLICKER
   ========================= */


/* VARIABLES */

let peces = 0;

let pecesTotales = 0;

let clicsTotales = 0;

let poderClic = 1;

let autoNivel = 0;

let multiplicador = 1;

let mejorCombo = 0;

let combo = 0;


/* PRECIOS */

let precioClic = 25;

let precioAuto = 100;

let precioMulti = 500;


/* ELEMENTOS */

const pecesTexto =
    document.getElementById("peces");

const pecesTotalesTexto =
    document.getElementById("pecesTotales");

const clicsTexto =
    document.getElementById("clicsTotales");

const poderClicTexto =
    document.getElementById("poderClic");

const autoNivelTexto =
    document.getElementById("autoNivel");

const multiplicadorTexto =
    document.getElementById("multiplicador");

const precioClicTexto =
    document.getElementById("precioClic");

const precioAutoTexto =
    document.getElementById("precioAuto");

const precioMultiTexto =
    document.getElementById("precioMulti");

const porSegundoTexto =
    document.getElementById("porSegundo");

const mejorComboTexto =
    document.getElementById("mejorCombo");

const foca =
    document.getElementById("foca");

const zonaClick =
    document.getElementById("zonaClick");

const mensaje =
    document.getElementById("mensaje");

const comprarClic =
    document.getElementById("comprarClic");

const comprarAuto =
    document.getElementById("comprarAuto");

const comprarMulti =
    document.getElementById("comprarMulti");

const reset =
    document.getElementById("reset");


/* =========================
   GUARDAR PARTIDA
   ========================= */

function guardar() {

    const partida = {

        peces,

        pecesTotales,

        clicsTotales,

        poderClic,

        autoNivel,

        multiplicador,

        mejorCombo,

        precioClic,

        precioAuto,

        precioMulti

    };


    localStorage.setItem(
        "sealClicker",
        JSON.stringify(partida)
    );
}


/* =========================
   CARGAR PARTIDA
   ========================= */

function cargar() {

    const guardado =
        localStorage.getItem("sealClicker");


    if (!guardado) {

        actualizarPantalla();

        return;
    }


    const partida =
        JSON.parse(guardado);


    peces =
        partida.peces ?? 0;

    pecesTotales =
        partida.pecesTotales ?? 0;

    clicsTotales =
        partida.clicsTotales ?? 0;

    poderClic =
        partida.poderClic ?? 1;

    autoNivel =
        partida.autoNivel ?? 0;

    multiplicador =
        partida.multiplicador ?? 1;

    mejorCombo =
        partida.mejorCombo ?? 0;

    precioClic =
        partida.precioClic ?? 25;

    precioAuto =
        partida.precioAuto ?? 100;

    precioMulti =
        partida.precioMulti ?? 500;


    actualizarPantalla();
}


/* =========================
   ACTUALIZAR PANTALLA
   ========================= */

function actualizarPantalla() {

    pecesTexto.textContent =
        Math.floor(peces);


    pecesTotalesTexto.textContent =
        Math.floor(pecesTotales);


    clicsTexto.textContent =
        clicsTotales;


    poderClicTexto.textContent =
        poderClic;


    autoNivelTexto.textContent =
        autoNivel;


    multiplicadorTexto.textContent =
        multiplicador;


    precioClicTexto.textContent =
        precioClic;


    precioAutoTexto.textContent =
        precioAuto;


    precioMultiTexto.textContent =
        precioMulti;


    porSegundoTexto.textContent =
        autoNivel;


    mejorComboTexto.textContent =
        mejorCombo;


    comprarClic.disabled =
        peces < precioClic;


    comprarAuto.disabled =
        peces < precioAuto;


    comprarMulti.disabled =
        peces < precioMulti;
}


/* =========================
   CLICK EN LA FOCA
   ========================= */

zonaClick.addEventListener(
    "click",
    function(event) {
        sonidoFoca.pause();
sonidoFoca.currentTime = 0;

sonidoFoca.play().catch(error => {
    console.log("No se pudo reproducir el sonido:", error);
});

        const ganancia =
            poderClic * multiplicador;


        peces += ganancia;

        pecesTotales += ganancia;

        clicsTotales++;

        combo++;


        if (combo > mejorCombo) {

            mejorCombo = combo;

        }


        /* ABRIR BOCA */

        foca.src =
            "foca-abierta.png";


        /* MENSAJE */

        mensaje.textContent =
            "+" + ganancia + " 🐟";


        /* NÚMERO FLOTANTE */

        crearNumero(
            event.clientX,
            event.clientY,
            ganancia
        );


        /* CERRAR BOCA */

        setTimeout(
            function() {

                foca.src =
                    "foca-cerrada.png";

                mensaje.textContent =
                    "¡HAZ CLIC EN LA FOCA!";

            },
            120
        );


        actualizarPantalla();

        guardar();
    }
);


/* =========================
   COMBO
   ========================= */

setInterval(
    function() {

        combo = 0;

    },
    1000
);


/* =========================
   CREAR NÚMERO FLOTANTE
   ========================= */

function crearNumero(
    x,
    y,
    cantidad
) {

    const numero =
        document.createElement("div");


    numero.className =
        "floating";


    numero.textContent =
        "+" + cantidad + " 🐟";


    numero.style.left =
        x + "px";


    numero.style.top =
        y + "px";


    document.body.appendChild(numero);


    setTimeout(
        function() {

            numero.remove();

        },
        800
    );
}


/* =========================
   COMPRAR MEJORA DE CLIC
   ========================= */

comprarClic.addEventListener(
    "click",
    function() {

        if (peces < precioClic) {

            return;

        }


        peces -= precioClic;


        poderClic++;


        precioClic =
            Math.floor(
                precioClic * 1.7
            );


        actualizarPantalla();

        guardar();
    }
);


/* =========================
   COMPRAR AUTO CLICK
   ========================= */

comprarAuto.addEventListener(
    "click",
    function() {

        if (peces < precioAuto) {

            return;

        }


        peces -= precioAuto;


        autoNivel++;


        precioAuto =
            Math.floor(
                precioAuto * 1.8
            );


        actualizarPantalla();

        guardar();
    }
);


/* =========================
   COMPRAR MULTIPLICADOR
   ========================= */

comprarMulti.addEventListener(
    "click",
    function() {

        if (peces < precioMulti) {

            return;

        }


        peces -= precioMulti;


        multiplicador++;


        precioMulti =
            Math.floor(
                precioMulti * 3
            );


        actualizarPantalla();

        guardar();
    }
);


/* =========================
   AUTO CLICK
   ========================= */

setInterval(
    function() {

        if (autoNivel <= 0) {

            return;

        }


        peces += autoNivel;

        pecesTotales += autoNivel;


        actualizarPantalla();

        guardar();

    },
    1000
);


/* =========================
   REINICIAR
   ========================= */

reset.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "¿Seguro que quieres borrar toda tu partida?"
            );


        if (!confirmar) {

            return;

        }


        localStorage.removeItem(
            "sealClicker"
        );


        peces = 0;

        pecesTotales = 0;

        clicsTotales = 0;

        poderClic = 1;

        autoNivel = 0;

        multiplicador = 1;

        mejorCombo = 0;

        precioClic = 25;

        precioAuto = 100;

        precioMulti = 500;


        actualizarPantalla();
    }
);


/* =========================
   INICIAR
   ========================= */

cargar();
sonidoFoca.currentTime = 0;
sonidoFoca.play();
