import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import bodyParser from 'body-parser';
import toml from '@iarna/toml';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), 'public')));

let PORT = 8080;

try {
  const configPath = path.join(process.cwd(), 'config.toml');

  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = toml.parse(raw) as any;

    PORT = config?.server?.port || 8080;

    console.log(`🧩 TOON carregado: Porta = ${PORT}`);
  } else { console.warn('⚠️ Arquivo config.toml não encontrado. Usando porta padrão 3000.'); }
} catch (err) { console.error('❌ Erro ao ler config.toml:', err); }

app.use('/api/users', userRoutes);
app.get('/ping', (req: Request, res: Response) => { res.json({ pong: true }); });
app.listen(PORT, () => { console.log('🚀 Servidor rodando em: http://localhost:' + PORT); });