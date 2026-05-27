from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

df = pd.DataFrame(columns=["nome", "voto"])


@app.get("/")
def home():
    return FileResponse("static/index.html")


# =========================
# 🔵 AGGIUNGI STUDENTE
# =========================

@app.get("/add")
def add_get(nome: str, voto: float):

    global df

    df = pd.concat([df, pd.DataFrame([[nome, voto]], columns=["nome", "voto"])],
                   ignore_index=True)

    return {"messaggio": "aggiunto GET"}


@app.post("/add")
def add_post(nome: str = Form(...), voto: float = Form(...)):

    global df

    df = pd.concat([df, pd.DataFrame([[nome, voto]], columns=["nome", "voto"])],
                   ignore_index=True)

    return {"messaggio": "aggiunto POST"}


# =========================
# 🔵 LISTA STUDENTI
# =========================

@app.get("/lista")
def lista_get():
    return df.to_dict(orient="records")


@app.post("/lista")
def lista_post():
    return df.to_dict(orient="records")


# =========================
# 🔵 MEDIA CLASSE
# =========================

@app.get("/media")
def media_get():

    if len(df) == 0:
        return {"media": 0}

    return {"media": round(df["voto"].mean(), 2)}


@app.post("/media")
def media_post():

    if len(df) == 0:
        return {"media": 0}

    return {"media": round(df["voto"].mean(), 2)}


# =========================
# 🔵 PROMOSSI
# =========================

@app.get("/promossi")
def promossi_get():

    return df[df["voto"] >= 6].to_dict(orient="records")


@app.post("/promossi")
def promossi_post():

    return df[df["voto"] >= 6].to_dict(orient="records")