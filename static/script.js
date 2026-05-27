
// =========================
// 🔵 AGGIUNGI (GET + POST)
// =========================
async function aggiungi() {

    const nome = document.getElementById("nome").value;
    const voto = document.getElementById("voto").value;

    // POST
    await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nome=${nome}&voto=${voto}`
    });

    // GET (aggiorna lista o conferma)
    const res = await fetch("/lista");
    const data = await res.json();

    document.getElementById("out").innerText =
        "Studenti: " + data.length;
}


// =========================
// 🔵 LISTA (GET + POST)
// =========================
async function lista() {

    await fetch("/lista", { method: "POST" });

    const res = await fetch("/lista");
    const data = await res.json();

    let text = "";

    data.forEach(s => {
        text += s.nome + " - " + s.voto + "\n";
    });

    document.getElementById("out").innerText = text;
}


// =========================
// 🔵 MEDIA (GET + POST)
// =========================
async function media() {

    await fetch("/media", { method: "POST" });

    const res = await fetch("/media");
    const data = await res.json();

    document.getElementById("out").innerText =
        "Media: " + data.media;
}


// =========================
// 🔵 PROMOSSI (GET + POST)
// =========================
async function promossi() {

    await fetch("/promossi", { method: "POST" });

    const res = await fetch("/promossi");
    const data = await res.json();

    let text = "";

    data.forEach(s => {
        text += s.nome + " - " + s.voto + "\n";
    });

    document.getElementById("out").innerText = text;
}