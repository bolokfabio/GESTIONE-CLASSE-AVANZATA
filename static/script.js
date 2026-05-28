
// =========================
// 🔵 AGGIUNGI STUDENTE
// =========================

async function aggiungi() {

    const nome = document.getElementById("nome").value;
    const voto = document.getElementById("voto").value;

    if (!nome || !voto) {
        alert("Inserisci dati");
        return;
    }

    // POST (aggiunge UNA sola volta)
    const resPost = await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nome=${nome}&voto=${voto}`
    });

    const dataPost = await resPost.json();

    // GET (solo conferma logica)
    const resGet = await fetch(`/add?nome=${nome}&voto=${voto}`);
    const dataGet = await resGet.json();

    document.getElementById("out").innerText =
        dataPost.messaggio + " ✔ " + dataGet.messaggio;
}


// =========================
// 🔵 LISTA
// =========================

async function lista() {

    await fetch("/lista", { method: "POST" });

    const res = await fetch("/lista");
    const data = await res.json();

    let testo = "";

    data.forEach(s => {
        testo += s.nome + " - " + s.voto + "\n";
    });

    document.getElementById("out").innerText = testo;
}


// =========================
// 🔵 MEDIA
// =========================

async function media() {

    await fetch("/media", { method: "POST" });

    const res = await fetch("/media");
    const data = await res.json();

    document.getElementById("out").innerText =
        "Media classe: " + data.media;
}


// =========================
// 🔵 PROMOSSI
// =========================

async function promossi() {

    await fetch("/promossi", { method: "POST" });

    const res = await fetch("/promossi");
    const data = await res.json();

    let testo = "";

    data.forEach(s => {
        testo += s.nome + " - " + s.voto + "\n";
    });

    document.getElementById("out").innerText = testo;
}


// bottoni
document.getElementById("btn_aggiungi").addEventListener("click", aggiungi);
document.getElementById("btn_lista").addEventListener("click", lista);
document.getElementById("btn_media").addEventListener("click", media);
document.getElementById("btn_promossi").addEventListener("click", promossi);
