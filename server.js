const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Serve static files with proper headers
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.br')) {
            res.setHeader('Content-Encoding', 'br');
            // Remove .br extension for content type
            const contentType = filePath.replace(/\.br$/, '');
            if (contentType.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            } else if (contentType.endsWith('.wasm')) {
                res.setHeader('Content-Type', 'application/wasm');
            } else if (contentType.endsWith('.data')) {
                res.setHeader('Content-Type', 'application/octet-stream');
            }
        }
    }
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 