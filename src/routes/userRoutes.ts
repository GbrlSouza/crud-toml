import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

// Cria arquivo se não existir
function ensureUsersFile() {
  if (!fs.existsSync(usersFile)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(usersFile, '[]', 'utf-8');
  }
}

// Lê usuários
function readUsers() {
  ensureUsersFile();
  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
}

// Escreve usuários
function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

// GET - Lista
router.get('/', (_, res) => {
  res.json(readUsers());
});

// POST - Adiciona
router.post('/', (req, res) => {
  const users = readUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  writeUsers(users);
  res.json(newUser);
});

// DELETE - Remove
router.delete('/:id', (req, res) => {
  let users = readUsers();
  users = users.filter((u: any) => u.id != req.params.id);
  writeUsers(users);
  res.json({ ok: true });
});

export default router;
