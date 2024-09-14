function generateDiamond(n) {
    for (let i = 1; i <= n; i += 2) {
        const spaces = " ".repeat((n - i) / 2);
        const stars = "*".repeat(i);
        console.log(spaces + stars + spaces);
    }

    for (let i = n - 2; i >= 1; i -= 2) {
        const spaces = " ".repeat((n - i) / 2);
        const stars = "*".repeat(i);
        console.log(spaces + stars + spaces);
    }
}

const userInput = prompt("Enter a number to generate a diamond pattern:");
const n = parseInt(userInput);

if (!isNaN(n) && n > 0) {
    generateDiamond(n);
} else {
    console.log("Invalid input. Please enter a positive number.");
}
