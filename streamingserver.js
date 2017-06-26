var http = require('http');
    path = require('path');
    fs = require('fs');
    host = '127.0.0.1';
    port = '9001';

var mime = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.gif' : 'image/gif',
    '.jpg' : 'image/jpg',
    '.png' : 'image/png'
}

var server = http.createServer(function(req,res){
    var filepath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    var contentType = mime[path.extname(filepath)];
    fs.exists(filepath, function(file_exists){
        if (file_exists){
            // fs.readFile(filepath, function(err, content){
            //     if (err){
            //         res.writeHead('500');
            //         res.end('File/server not live')
            //     } else {
            //         res.writeHead('200', {'Content-Type' : contentType});
            //         res.end(content, 'utf-8');
            //     }
            res.writeHead('200', {'Content-Type' : contentType});
            var streamFile = fs.createReadStream(filepath).pipe(res);
            streamFile.on('error', function(){
                res.writeHead('500');
                res.end();
            })
        } else {
            res.writeHead('404');
            res.end('Sorry we could not find the file')
        }
    })
        
    }).listen(port, host, function(){
    console.log('Server running on http://' + host + ':'+ port);
})
