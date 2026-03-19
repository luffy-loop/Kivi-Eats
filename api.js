const container = document.getElementById("menuContainer");
const searchInput = document.getElementById("search");

const menuItems = [
    { name: "Dosa", price: 40, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0" },
    { name: "Idli", price: 30, img: "https://images.unsplash.com/photo-1626074353765-517a681e40be" },
    { name: "Meals", price: 120, img: "https://images.unsplash.com/photo-1600628422019-7c9c90c1c92f" },
    { name: "Poori", price: 50, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5979" },
    { name: "Upma", price: 35, img: "https://images.unsplash.com/photo-1662036108557-3fbbdc3e89c7" },
    { name: "Vada", price: 25, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950" }
];

function displayItems(items) {
    container.innerHTML = "";

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-card");

        div.innerHTML = `
            <img src="${item.img}?auto=format&fit=crop&w=400&q=80">
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <button class="order-btn">Add to Cart</button>
            </div>
        `;

        // ADD TO CART
        div.querySelector(".order-btn").addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(item.name + " added to cart");
        });

        // CLICK CARD → ORDER PAGE
        div.addEventListener("dblclick", () => {
            localStorage.setItem("selectedItem", JSON.stringify(item));
            window.location.href = "order.html";
        });

        container.appendChild(div);
    });
}

// SEARCH FILTER
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = menuItems.filter(item =>
        item.name.toLowerCase().includes(value)
    );
    displayItems(filtered);
});

displayItems(menuItems);