const fs = require('fs');

function d(n) {
    let pattern = '';

    for (let i = 1; i <= n; i += 2) {
        const spaces = ' '.repeat((n - i) / 2);
        const stars = '*'.repeat(i);
        pattern += spaces + stars + spaces + '\n';
    }

    for (let i = n - 2; i >= 1; i -= 2) {
        const spaces = ' '.repeat((n - i) / 2);
        const stars = '*'.repeat(i);
        pattern += spaces + stars + spaces + '\n';
    }

    return pattern;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    const n = parseInt(data.trim());
    const diamond = d(n);

    fs.writeFile('output.txt', diamond, () => {});
});
