import express from 'express';
import vhost from 'vhost';
import path from 'path';
import dotenv from 'dotenv';

// dotenv 로드
dotenv.config();

const app = express();

// 여기서부터 s3에서 서비스할 하나의 정적호스팅 사이트야
// 만약 이런식으로 해서 여러 사이트에 대한 테스트를 port 번호별로 테스트할수있어? 
const PORT = 3000;
const subA = express();
const subB = express();

subA.use(express.static(path.join(__dirname, '../static/muan', 'aeon')));
subB.use(express.static(path.join(__dirname, '../static/muan', 'www')));

app.use(vhost(`aeon.localhost`, subA));
app.use(vhost(`www.localhost`, subB));


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`서버스타트 http://localhost:${PORT}`);
});
