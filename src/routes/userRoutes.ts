import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

// Garante que o arquivo existe
function ensureUsersFile() {
  if (!fs.existsSync(usersFile)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(usersFile, '[]', 'utf-8');
  }
}

function readUsers() {
  ensureUsersFile();

  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

// GET - lista todos
router.get('/', (req: Request, res: Response) => {
  const users = readUsers();
  
  res.json(users);
});

// POST - adiciona
router.post('/', (req: Request, res: Response) => {
  const users = readUsers();
  const newUser = { id: Date.now(), ...req.body };

  users.push(newUser);
  writeUsers(users);
  res.json(newUser);
});

// DELETE - remove
router.delete('/:id', (req: Request, res: Response) => {
  let users = readUsers();

  users = users.filter((u: any) => u.id != req.params.id);
  writeUsers(users);
  res.json({ ok: true });
});

export default router;