import express from 'express';
import vhost from 'vhost';
import path from 'path';
import dotenv from 'dotenv';

// dotenv 로드
dotenv.config();

const app = express();
const PORT = 3000;

const subA = express();
const subB = express();

subA.use(express.static(path.join(__dirname, '../static', 'aeon')));
subB.use(express.static(path.join(__dirname, '../static', 'www')));

// NODE_ENV 값에 따라 도메인 분기 처리
const DOMAIN = process.env.NODE_ENV === 'production' ? 'muanelec.com' : 'localhost';

app.use(vhost(`aeon.${DOMAIN}`, subA));
app.use(vhost(`www.${DOMAIN}`, subB));

app.listen(PORT, () => {
	console.log(`서버스타트 http://${DOMAIN}:${PORT}`);
});
