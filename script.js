
let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});
function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

const menuContainer = document.getElementById("menuContainer");
const categoryList = document.getElementById("categoryList");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

if (typeof menuItems !== "undefined") {

    // GET UNIQUE CATEGORIES
    const categories = [...new Set(menuItems.map(i => i.category))];

    // SIDEBAR CATEGORIES
    if (categoryList) {
        categories.forEach(cat => {
            const div = document.createElement("div");
            div.innerText = cat;

            div.onclick = () => {
                displayMenu(menuItems.filter(i => i.category === cat));
            };

            categoryList.appendChild(div);
        });
    }

    // INITIAL LOAD
    if (menuContainer) {
        displayMenu(menuItems);
    }

    // SEARCH
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            const val = e.target.value.toLowerCase();
            const filtered = menuItems.filter(i =>
                i.name.toLowerCase().includes(val)
            );
            displayMenu(filtered);
        });
    }
}

function displayMenu(items) {
    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    items.forEach(item => {
        const row = document.createElement("div");
        row.className = "menu-row";

        const cartItem = cart.find(i => i.name === item.name);
        const qty = cartItem ? cartItem.qty : 0;

        row.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <div>
                <button class="qty-btn" onclick='decrease("${item.name}")'>-</button>
                ${qty}
                <button class="qty-btn" onclick='increase(${JSON.stringify(item)})'>+</button>
            </div>
        `;

        menuContainer.appendChild(row);
    });
}

function increase(item) {
    const existing = cart.find(i => i.name === item.name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    updateCart();
    showToast(item.name + " added");
}

function decrease(name) {
    const item = cart.find(i => i.name === name);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== name);
    }

    updateCart();
}
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();

    if (typeof menuItems !== "undefined") {
        displayMenu(menuItems);
    }
}
function renderCart() {
    if (!cartItems || !totalPrice) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.name} x ${item.qty}</span>
            <span>₹${item.price * item.qty}</span>
        `;

        cartItems.appendChild(div);
    });

    totalPrice.innerText = "Total: ₹" + total;
}
const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
    checkoutBtn.onclick = () => {
        if (cart.length === 0) {
            showToast("Cart is empty");
            return;
        }

        showToast("Order placed successfully!");

        cart = [];
        localStorage.removeItem("cart");

        renderCart();
        if (typeof menuItems !== "undefined") {
            displayMenu(menuItems);
        }
    };
}
renderCart();
