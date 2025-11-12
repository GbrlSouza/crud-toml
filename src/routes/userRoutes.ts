import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const usersFile = path.join(__dirname, '../data/users.json');

function ensureUsersFile() {
  if (!fs.existsSync(usersFile)) {
    fs.mkdirSync(path.dirname(usersFile), { recursive: true });
    fs.writeFileSync(usersFile, '[]', 'utf-8');
  }
}

function readUsers() {
  ensureUsersFile();
  try {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    fs.writeFileSync(usersFile, '[]', 'utf-8');
    return [];
  }
}

function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

router.get('/', (req, res) => {
  res.json(readUsers());
});

router.post('/', (req, res) => {
  const users = readUsers();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  writeUsers(users);
  res.json(newUser);
});

router.delete('/:id', (req, res) => {
  let users = readUsers();
  users = users.filter((u: any) => u.id != req.params.id);
  writeUsers(users);
  res.json({ ok: true });
});

export default router;
