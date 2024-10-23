from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import json

app = FastAPI()

# Adicionando middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adicione a origem do seu cliente Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para representar uma tarefa
class TodoItem(BaseModel):
    id: int
    title: str
    completed: bool

# Lista para armazenar as tarefas
todo_list: List[TodoItem] = []

# Rota GET para listar todas as tarefas
@app.get("/process/{id}")
def get_todos(id: str):
    url = "https://api-publica.datajud.cnj.jus.br/api_publica_tjdft/_search"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=="
    }
    body = json.dumps({
        "query": {
            "match": {
                "numeroProcesso": id
            }
        }
    })
    response = requests.post(url, headers=headers, data=body)
    if response.status_code == 200:
        print("Dados recebidos:", response.json())
    else:
        print("Erro:", response.status_code, response.text)

    return response.json()


# Rota GET para obter uma tarefa específica pelo ID
@app.get("/todos/{todo_id}", response_model=TodoItem)
def get_todo(todo_id: int):
    for todo in todo_list:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

# Rota POST para adicionar uma nova tarefa
@app.post("/todos/", response_model=TodoItem)
def create_todo(todo: TodoItem):
    # Verificar se a tarefa já existe
    for existing_todo in todo_list:
        if existing_todo.id == todo.id:
            raise HTTPException(status_code=400, detail="ID da tarefa já existe")
    
    todo_list.append(todo)
    return todo

# Rota POST para marcar uma tarefa como concluída
@app.post("/todos/{todo_id}/complete")
def complete_todo(todo_id: int):
    for todo in todo_list:
        if todo.id == todo_id:
            todo.completed = True
            return {"message": "Tarefa marcada como concluída"}
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

# Para rodar o servidor FastAPI
# uvicorn main:app --reload
