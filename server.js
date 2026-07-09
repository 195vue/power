const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('Request:', req.method, req.url);
    
    let filePath = '.' + decodeURIComponent(req.url);
    if (filePath === './') filePath = './index.html';
    
    const extname = path.extname(filePath);
    const contentTypeMap = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    };
    
    const contentType = contentTypeMap[extname] || 'application/octet-stream';
    const charset = contentType.startsWith('text/') ? '; charset=utf-8' : '';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log('404 Not Found:', filePath);
                res.writeHead(404);
                res.end('File not found');
            } else {
                console.log('500 Error:', error.code, filePath);
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType + charset });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(8090, () => {
    console.log('Server running on http://localhost:8090');
});