import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import toml from '@iarna/toml';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const configPath = path.join(__dirname, '..', 'config.toml');
const configData = toml.parse(fs.readFileSync(configPath, 'utf-8'));
const PORT = configData.server.port || 3000;

const usersFile = path.join(__dirname, 'data', 'users.json');

if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]');

app.get('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  const newUser = { id: Date.now(), ...req.body };
  
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json(newUser);
});

app.delete('/api/users/:id', (req, res) => {
  let users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  
  users = users.filter((u: any) => u.id != req.params.id);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
