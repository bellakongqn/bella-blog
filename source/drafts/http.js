const http = require('http');
const fs = require('fs');
let etag = 0;
let tpl = fs.readFileSync('./index.html');
let img = fs.readFileSync('./test.png');
http.createServer((req, res) => {
    console.log('--->', req.url);
    switch (req.url) {
        case '/cache-control':
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Pragma':'no-cache',
                'Cache-Control': 'max-age=10'
            });
        res.end(img);
        break;
        case '/if-none-match':{
            const If_None_Match = req.headers['if-none-match'];
            console.log('If_None_Match,',If_None_Match);
            if(If_None_Match != '1') {
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Etag': '1'
                });
                res.end(img);
            }else {
                res.statusCode = 304;
                res.end();
            }
            break;
        }
        case '/img/talk_8':
            let stats = fs.statSync('./test.png');
            let mtimeMs = stats.mtimeMs;
            let If_Modified_Since = req.headers['if-modified-since'];
            let oldTime = 0;
            if(If_Modified_Since) {
                const If_Modified_Since_Date = new Date(If_Modified_Since);
                oldTime = If_Modified_Since_Date.getTime();
            }
            
            mtimeMs = Math.floor(mtimeMs / 1000) * 1000;    // 这种方式的精度是秒, 所以毫秒的部分忽略掉
            console.log('mtimeMs', mtimeMs);
            console.log('oldTime', oldTime);
            if(oldTime < mtimeMs) {
                res.writeHead(200, {
                    'Cache-Control': 'no-cache',   
                    // 测试发现, 必须要有max-age=0 或者no-cache,或者expires为当前, 才会协商, 否则没有协商的过程 
                    'Last-Modified': new Date(mtimeMs).toGMTString()
                });
                res.end(fs.readFileSync('./test.png'));
            }else {
                res.writeHead(304);
                res.end();
            }
            break;
        default:
            res.statusCode = 404;
            res.statusMessage = 'Not found',
            res.end();
    }

}).listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');