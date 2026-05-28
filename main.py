from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

studenti = []


@app.get("/")
def home():
    return FileResponse("static/index.html")


# =========================
# 🔵 AGGIUNGI STUDENTE
# =========================

@app.get("/add")
def add_get(nome: str, voto: float):
    return {"messaggio": "GET ricevuto"}


@app.post("/add")
def add_post(nome: str = Form(...), voto: float = Form(...)):

    studenti.append({
        "nome": nome,
        "voto": voto
    })

    return {"messaggio": "studente aggiunto"}


# =========================
# 🔵 LISTA
# =========================

@app.get("/lista")
def lista_get():
    return studenti


@app.post("/lista")
def lista_post():
    return studenti


# =========================
# 🔵 MEDIA
# =========================

@app.get("/media")
def media_get():

    if len(studenti) == 0:
        return {"media": 0}

    somma = sum(s["voto"] for s in studenti)

    return {"media": round(somma / len(studenti), 2)}


@app.post("/media")
def media_post():

    if len(studenti) == 0:
        return {"media": 0}

    somma = sum(s["voto"] for s in studenti)

    return {"media": round(somma / len(studenti), 2)}


# =========================
# 🔵 PROMOSSI
# =========================

@app.get("/promossi")
def promossi_get():
    return [s for s in studenti if s["voto"] >= 6]


@app.post("/promossi")
def promossi_post():
    return [s for s in studenti if s["voto"] >= 6]