// =========================
// 🔵 AGGIUNGI STUDENTE
// =========================

async function aggiungi() {

    // prende valori input
    const nome = document.getElementById("nome").value;

    const voto = document.getElementById("voto").value;

    // controllo input
    if (!nome || !voto) {

        alert("Inserisci nome e voto");

        return;
    }

    // =========================
    // POST
    // =========================
    await fetch("/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body: `nome=${nome}&voto=${voto}`
    });

    // =========================
    // GET
    // =========================
    const res = await fetch(`/add?nome=${nome}&voto=${voto}`);

    const data = await res.json();

    // stampa risultato
    document.getElementById("out").innerText =
        data.messaggio;
}


// =========================
// 🔵 MOSTRA LISTA
// =========================

async function lista() {

    // POST
    await fetch("/lista", {
        method: "POST"
    });

    // GET
    const res = await fetch("/lista");

    const data = await res.json();

    let testo = "";

    // ciclo studenti
    data.forEach(s => {

        testo += s.nome + " - voto: " + s.voto + "\n";

    });

    // stampa lista
    document.getElementById("out").innerText =
        testo;
}


// =========================
// 🔵 MEDIA CLASSE
// =========================

async function media() {

    // POST
    await fetch("/media", {
        method: "POST"
    });

    // GET
    const res = await fetch("/media");

    const data = await res.json();

    // stampa media
    document.getElementById("out").innerText =
        "Media classe: " + data.media;
}


// =========================
// 🔵 PROMOSSI
// =========================

async function promossi() {

    // POST
    await fetch("/promossi", {
        method: "POST"
    });

    // GET
    const res = await fetch("/promossi");

    const data = await res.json();

    let testo = "";

    // ciclo promossi
    data.forEach(s => {

        testo += s.nome + " - voto: " + s.voto + "\n";

    });

    // stampa promossi
    document.getElementById("out").innerText =
        testo;
}


// =========================
// 🔵 EVENTI BOTTONI
// =========================

document.getElementById("btn_aggiungi")
.addEventListener("click", aggiungi);

document.getElementById("btn_lista")
.addEventListener("click", lista);

document.getElementById("btn_media")
.addEventListener("click", media);

document.getElementById("btn_promossi")
.addEventListener("click", promossi);