from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse, HTMLResponse
import sqlite3
import uuid

app = FastAPI()

DB_NAME = "users.db"


@app.post("/apply/")
async def register(
    username: str = Form(...),
    groupnum: int = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()

        user_hash = str(uuid.uuid4())

        cursor.execute("""
        INSERT INTO Name ("Name", "Group", "Mail", "Password", "Hash")
        VALUES (?, ?, ?, ?, ?)
        """, (username, groupnum, email, password, user_hash))

        conn.commit()
        conn.close()

        return RedirectResponse(url="/success", status_code=303)

    except sqlite3.IntegrityError:
        return HTMLResponse("Email уже существует", status_code=400)


@app.get("/success")
def success():
    return HTMLResponse("<h1>Регистрация успешна!</h1>")