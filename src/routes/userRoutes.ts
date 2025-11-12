import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const usersFile = path.join(__dirname, '../data/users.json');

if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]');

router.get('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  
  res.json(users);
});

router.post('/', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  const newUser = { id: Date.now(), ...req.body };
  
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json(newUser);
});

router.delete('/:id', (req, res) => {
  let users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  
  users = users.filter((u: any) => u.id != req.params.id);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ ok: true });
});

export default router;
