import http from 'node:http';

const PORT = Number.parseInt(process.env.PORT || '3272', 10);
const HOST = process.env.HOST || '0.0.0.0';

const server = http.createServer((req, res) => {
  if (req.url === '/api/health' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, service: 'gb-172-backend' }));
    return;
  }

  if (req.url?.startsWith('/api/')) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ name: 'Password Toolbox API' }));
});

server.listen(PORT, HOST, () => {
  console.log(`gb-172 backend listening on ${HOST}:${PORT}`);
});
