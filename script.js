document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const CartItems = document.querySelector('.cart-items');
    const TotalPrice = document.getElementById('total-price');
    const PlaceOrder = document.querySelector('.place-order');
    const OrderPopup = document.getElementById('order-popup');
    const ClosePopup = document.querySelector('.popup .close');

    // Add product to cart
    const products = {
        earphones: {
            name: 'Earphones',
            price: 29.99,
            quantity: 1
        },
        speakers: {
            name: 'Speakers',
            price: 49.99,
            quantity: 1
        },
        headphones: {
            name: 'Headphones',
            price: 50,
            quantity: 1
        } 
    };

    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productKey = button.getAttribute('data-product');
            const product = products[productKey];

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.name === product.name);
            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
        });
    });

    // Display cart items on cart page
    if (CartItems) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span class="item-total-price">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            CartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        TotalPrice.textContent = total.toFixed(2);

        // Place order
        PlaceOrder.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Simulate order placement
            localStorage.removeItem('cart');
            OrderPopup.style.display = 'flex';
        });

        // Close popup
        ClosePopup.addEventListener('click', () => {
            OrderPopup.style.display = 'none';
            window.location.href = 'index.html';
        });
    }
});