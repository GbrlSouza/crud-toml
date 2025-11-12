import express from 'express';
import bodyParser from 'body-parser';
import toml from '@iarna/toml';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const configPath = path.join(__dirname, '..', 'config.toml');
const configData = toml.parse(fs.readFileSync(configPath, 'utf-8'));
const PORT = configData.server.port || 3000;

app.use('/api/users', userRoutes);
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
