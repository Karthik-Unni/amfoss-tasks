const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    fs.writeFile('output.txt', data, () => {
        console.log('Copied to file');
    });
});
