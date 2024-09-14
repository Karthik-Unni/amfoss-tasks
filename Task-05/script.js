const terminalOutput = document.querySelector('.terminal-output');
const terminalInput = document.querySelector('input[type="text"]');
const productCatalog = document.querySelector('.product-catalog');

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); 
});

function handleInput(command) {
    terminalOutput.innerHTML += `<p><span class="prompt">$</span>${command}</p>`;
    const parts = command.split(' ');
    const action = parts[0];
    const arg = parts[1];

    switch (action) {
        case 'help':
            viewCommand();
            break;
        case 'list':
            listProducts();
            break;
        case 'details':
            viewProductDetails(arg);
            break;
        case 'add':
            addToCart(arg);
            break;
        case 'remove':
            removeFromCart(arg);
            break;
        case 'cart':
            viewCart();
            break;
        case 'buy':
            proceedToBuy();
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'search':
            searchProduct(parts.slice(1).join(' '));
            break;
        case 'sort':
            sortProducts(arg);
            break;
        default:
            terminalOutput.innerHTML += `<p>Invalid command: ${command}</p>`;
            break;
    }

    terminalInput.value = '';   
}

function loadProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            productCatalog.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <p>${product.title}</p>
                    <p>$${product.price}</p>
                `;
                productElement.dataset.price = product.price;
                productElement.dataset.title = product.title;
                productCatalog.appendChild(productElement);
            });
        });
}

function listProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            terminalOutput.innerHTML += `<p>Available Products:</p>`;
            products.forEach(product => {
                terminalOutput.innerHTML += `<p>${product.id}: ${product.title} - $${product.price}</p>`;
            });
        }); 
}

function viewProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            terminalOutput.innerHTML += `<p>Product Details:</p>`;
            terminalOutput.innerHTML += `<p>ID: ${product.id}</p>`;
            terminalOutput.innerHTML += `<p>Title: ${product.title}</p>`;
            terminalOutput.innerHTML += `<p>Description: ${product.description}</p>`;
            terminalOutput.innerHTML += `<p>Price: $${product.price}</p>`;
            terminalOutput.innerHTML += `<p>Category: ${product.category}</p>`;
        });
}

function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            cart.push(product);
            terminalOutput.innerHTML += `<p>Added to cart: ${product.title} - $${product.price}</p>`;
        });
}

function removeFromCart(productId) {
    const index = cart.findIndex(product => product.id == productId);
    if (index !== -1) {
        const removedProduct = cart.splice(index, 1)[0];
        terminalOutput.innerHTML += `<p>Removed from cart: ${removedProduct.title}</p>`;
    }
}

function clearTerminal() {
    terminalOutput.innerHTML = '';
}

function viewCart() {
    if (cart.length === 0) {
        terminalOutput.innerHTML += '<p>Your cart is empty.</p>';
        return;
    }

    terminalOutput.innerHTML += '<p>Your Cart:</p>';
    cart.forEach(product => {
        terminalOutput.innerHTML += `<p>${product.id}: ${product.title} - $${product.price}</p>`;
    });
}

function proceedToBuy() {

    document.querySelector('.container').style.display = 'none';
    document.getElementById('checkout-page').style.display = 'block';

    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = '<h3>Items in Cart:</h3>';
    
    let totalPrice = 0;
    cart.forEach(product => {
        checkoutItems.innerHTML += `<p>${product.title} - $${product.price.toFixed(2)}</p>`;
        totalPrice += product.price;
    });

    const totalAmount = document.getElementById('total-amount');
    totalAmount.innerHTML = `Total Amount: $${totalPrice.toFixed(2)}`;
}



function searchProduct(productName) {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(productName.toLowerCase())
            );

            if (results.length > 0) {
                terminalOutput.innerHTML += `<p>Search Results for "${productName}":</p>`;
                results.forEach(product => {
                    terminalOutput.innerHTML += `<p>${product.id}: ${product.title} - $${product.price}</p>`;
                });
            } else {
                terminalOutput.innerHTML += `<p>No products found for "${productName}".</p>`;
            }
        });
}

function sortProducts(criterion) {
    const sortedProducts = Array.from(document.querySelectorAll('.product')).sort((a, b) => {
        if (criterion === 'price') {
            return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        } else if (criterion === 'name') {
            return a.dataset.title.localeCompare(b.dataset.title);
        }
        return 0;
    });

    productCatalog.innerHTML = '';
    sortedProducts.forEach(product => productCatalog.appendChild(product));
}

terminalInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleInput(terminalInput.value);
    }
});
