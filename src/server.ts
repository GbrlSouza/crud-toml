import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
app.get('/', (req, res) => { res.sendFile(path.join(publicPath, 'index.html')); });
app.get('/ping', (req, res) => { res.json({ pong: true }); });
app.listen(PORT, () => { console.log(`🚀 Servidor rodando em http://localhost:${PORT}`); });

console.log('🔥 Chegou no final do server.ts antes de listen');
