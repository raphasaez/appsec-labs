# IDOR Lab – Lab de Teste de Controle de Acesso Inadequado

## Objetivo

Este lab foi criado para praticar a identificação e exploração de **IDOR (Insecure Direct Object Reference)** em APIs REST. O objetivo é que o usuário consiga entender como a falta de checagem de autorização pode permitir acesso ou modificação indevida de recursos.

---

## Cenário

- A aplicação possui endpoints de **edição e exclusão** de recursos.
- Nem todos os métodos estão protegidos corretamente.
- Alguns endpoints **não são chamados pelo front-end**, exigindo análise ofensiva e investigação para serem descobertos.
- Este lab simula um caso **realista**, como APIs expostas em bug bounties.

---

## Estrutura do Lab


idor-lab/
├─ app/ # Código da aplicação
│ ├─ init.py
│ ├─ routes.py
│ ├─ static/
│ └─ templates/
├─ Dockerfile # Configuração para criar o container do lab
├─ requirements.txt # Dependências Python
└─ README.md # Este arquivo


---

## Como usar

1. Suba o lab usando Docker:

```bash
docker build -t idor-lab .
docker run -d -p 5000:5000 --name idor-lab-container idor-lab

A aplicação ficará disponível em http://localhost:5000.

Observações

Este lab não fornece exploits ou soluções. O objetivo é que o usuário investigue os endpoints, teste métodos HTTP e analise checagens de autorização por conta própria.

É recomendado ter alguma familiaridade com curl, Burp Suite, Postman ou qualquer ferramenta de teste de APIs.

Ideal para estudos de pentest em APIs e controle de acesso.
