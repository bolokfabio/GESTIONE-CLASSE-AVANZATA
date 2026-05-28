from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# lista studenti
studenti = []


@app.get("/")
def home():
    return FileResponse("static/index.html")


# =========================
# 🔵 AGGIUNGI STUDENTE
# =========================

@app.get("/add")
def add_get(nome: str, voto: float):

    global studenti

    # aggiunge studente
    studenti.append({
        "nome": nome,
        "voto": voto
    })

    return {"messaggio": "aggiunto GET"}


@app.post("/add")
def add_post(nome: str = Form(...), voto: float = Form(...)):

    global studenti

    # aggiunge studente
    studenti.append({
        "nome": nome,
        "voto": voto
    })

    return {"messaggio": "aggiunto POST"}


# =========================
# 🔵 LISTA STUDENTI
# =========================

@app.get("/lista")
def lista_get():

    return studenti


@app.post("/lista")
def lista_post():

    return studenti


# =========================
# 🔵 MEDIA CLASSE
# =========================

@app.get("/media")
def media_get():

    # controlla lista vuota
    if len(studenti) == 0:
        return {"media": 0}

    somma = 0

    # somma voti
    for s in studenti:
        somma += s["voto"]

    media = somma / len(studenti)

    return {"media": round(media, 2)}


@app.post("/media")
def media_post():

    if len(studenti) == 0:
        return {"media": 0}

    somma = 0

    for s in studenti:
        somma += s["voto"]

    media = somma / len(studenti)

    return {"media": round(media, 2)}


# =========================
# 🔵 PROMOSSI
# =========================

@app.get("/promossi")
def promossi_get():

    promossi = []

    # prende solo voti >= 6
    for s in studenti:

        if s["voto"] >= 6:
            promossi.append(s)

    return promossi


@app.post("/promossi")
def promossi_post():

    promossi = []

    for s in studenti:

        if s["voto"] >= 6:
            promossi.append(s)

    return promossi