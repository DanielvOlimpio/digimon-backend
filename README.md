# digimon-backend

Backend **bem simples** em Node.js + Express com uma API CRUD em memória (sem banco) para um exemplo de “Digimon”.

## Requisitos
- Node.js 18+ (ou 20+)

## Como rodar

```bash
npm install
npm run dev
```

Servidor padrão: `http://localhost:3000`

## Rotas

- `GET /` → info da API
- `GET /health` → health check
- `GET /digimon` → lista todos
  - opcional: `GET /digimon?name=agu` → filtra por nome (contém, case-insensitive)
- `GET /digimon/:id` → busca por id
- `POST /digimon` → cria
  - body JSON: `{ "name": "...", "level": "...", "type": "..." }`
- `PUT /digimon/:id` → atualiza
  - body JSON parcial: `name`, `level`, `type`
- `DELETE /digimon/:id` → remove

## Observações
- Os dados ficam **somente em memória**: ao reiniciar o servidor, volta ao estado inicial.
