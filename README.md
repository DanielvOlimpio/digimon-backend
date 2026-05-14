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

## Deploy no Render

Opção A (manual)

1. Suba este repositório no GitHub (com o `package-lock.json`, pois vamos usar `npm ci`).
2. No Render: **New** → **Web Service** → conecte seu repo.
3. Configure:
  - Environment: **Node**
  - Build Command: `npm ci`
  - Start Command: `npm start`
4. Deploy.
5. Teste: `https://SUA-URL.onrender.com/health`.

Notas:
- O Render define `PORT` automaticamente; o servidor já usa `process.env.PORT`.
- Se você preferir, dá pra trocar o Build Command para `npm install` (mas `npm ci` é mais previsível).

Opção B (opcional): Blueprint

- Se quiser deploy automático via Blueprint, commite o [render.yaml](render.yaml) e use **New** → **Blueprint**.

## Rotas

- `GET /` → info da API
- `GET /health` → health check
- `GET /digimon` → lista todos
  - opcional: `GET /digimon?name=agu` → filtra por nome (contém, case-insensitive)
  - opcional: `GET /digimon?level=Rookie` → filtra por level (igual, case-insensitive)
  - pode combinar: `GET /digimon?name=mon&level=Rookie`
- `GET /digimon/:id` → busca por id
- `POST /digimon` → cria
  - body JSON: `{ "name": "...", "level": "...", "type": "..." }`
- `PUT /digimon/:id` → atualiza
  - body JSON parcial: `name`, `level`, `type`
- `DELETE /digimon/:id` → remove

## Observações
- Os dados ficam **somente em memória**: ao reiniciar o servidor, volta ao estado inicial.
