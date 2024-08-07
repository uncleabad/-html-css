document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const product = this.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h2').innerText;
            const productPrice = product.querySelector('.price').innerText;

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            const itemIndex = cart.findIndex(item => item.id === productId);
            if (itemIndex === -1) {
                cart.push(cartItem);
            } else {
                cart[itemIndex].quantity += 1;
            }

            updateCartCount();
            saveCart();
        });
    });

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    // Save cart to local storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Load cart from local storage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }

    loadCart();
});
