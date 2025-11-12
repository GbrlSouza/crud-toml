import express from 'express';
import bodyParser from 'body-parser';
import toml from '@iarna/toml';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// Lê config TOON (TOML)
const configPath = path.join(process.cwd(), 'config.toml');
const configData = toml.parse(fs.readFileSync(configPath, 'utf-8'));
const PORT = (configData as any).server.port || 3000;

// Rotas
app.use('/api/users', userRoutes);

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
