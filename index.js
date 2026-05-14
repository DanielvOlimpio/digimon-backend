const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let nextId = 4;
let digimon = [
  { id: 1, name: "Agumon", level: "Rookie", type: "Reptile" },
  { id: 2, name: "Gabumon", level: "Rookie", type: "Reptile" },
  { id: 3, name: "Patamon", level: "Rookie", type: "Mammal" }
];

app.get("/", (req, res) => {
  res.json({
    name: "digimon-backend",
    message: "API simples de Digimon. Veja /digimon e /health."
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", now: new Date().toISOString() });
});

app.get("/digimon", (req, res) => {
  const nameQueryRaw = req.query?.name;
  const nameQuery = typeof nameQueryRaw === "string" ? nameQueryRaw.trim() : "";

  if (!nameQuery) return res.json(digimon);

  const q = nameQuery.toLowerCase();
  const filtered = digimon.filter((d) => d.name.toLowerCase().includes(q));
  res.json(filtered);
});

app.get("/digimon/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = digimon.find((d) => d.id === id);
  if (!found) return res.status(404).json({ error: "Digimon não encontrado" });
  res.json(found);
});

app.post("/digimon", (req, res) => {
  const { name, level, type } = req.body ?? {};

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Campo 'name' é obrigatório (string)" });
  }

  const newDigimon = {
    id: nextId++,
    name: name.trim(),
    level: typeof level === "string" ? level.trim() : null,
    type: typeof type === "string" ? type.trim() : null
  };

  digimon.push(newDigimon);
  res.status(201).json(newDigimon);
});

app.put("/digimon/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = digimon.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ error: "Digimon não encontrado" });

  const { name, level, type } = req.body ?? {};

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({ error: "Campo 'name' deve ser string não vazia" });
  }

  const current = digimon[index];
  const updated = {
    ...current,
    ...(name !== undefined ? { name: name.trim() } : null),
    ...(level !== undefined ? { level: typeof level === "string" ? level.trim() : null } : null),
    ...(type !== undefined ? { type: typeof type === "string" ? type.trim() : null } : null)
  };

  digimon[index] = updated;
  res.json(updated);
});

app.delete("/digimon/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = digimon.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ error: "Digimon não encontrado" });

  const removed = digimon.splice(index, 1)[0];
  res.json(removed);
});

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
