// ==========================
// CATEGORY ACTIVE HIGHLIGHT
// ==========================
const categoryLinks = document.querySelectorAll(".category-bar a");

categoryLinks.forEach(link => {
    link.addEventListener("click", () => {
        categoryLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// ==========================
// SMOOTH SCROLL FIX
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ==========================
// ORDER SYSTEM
// ==========================
const prices = {
    "Dosa": 40,
    "Masala Dosa": 60,
    "Idli (2 pcs)": 30,
    "Medu Vada": 25,
    "Poori Bhaji": 50,
    "Upma": 35,
    "Pongal": 45,
    "Veg Meals": 120,
    "Paneer Butter Masala": 150,
    "Dal Tadka": 90,
    "Veg Biryani": 130,
    "Jeera Rice": 80,
    "Curd Rice": 60,
    "Chicken Biryani": 200,
    "Chicken Curry": 180,
    "Butter Chicken": 220,
    "Egg Curry": 120,
    "Chapati": 10,
    "Butter Roti": 20,
    "Aloo Paratha": 40,
    "Paneer Paratha": 60,
    "Lemon Rice": 50,
    "Curd Rice Bowl": 60,
    "Vegetable Khichdi": 80,
    "Tomato Rice": 55,
    "Masala Buttermilk": 20,
    "Cold Coffee": 90,
    "Lime Soda": 40,
    "Mojito": 70,
    "Gulab Jamun": 40,
    "Ice Cream": 60,
    "Chocolate Brownie": 80,
    "Rasgulla": 50,
    "Veg Sandwich": 50,
    "Grilled Cheese": 70,
    "Chicken Sandwich": 90
};

// ==========================
// AUTO-FILL FROM MENU
// ==========================
const itemSelect = document.getElementById("item");

if (itemSelect) {
    Object.keys(prices).forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
    });

    const selectedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (selectedItem) {
        itemSelect.value = selectedItem;
    }
}

// ==========================
// FORM SUBMIT (BILL + GST)
// ==========================
const form = document.getElementById("orderForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const item = document.getElementById("item").value;
        const qty = parseInt(document.getElementById("qty").value);

        if (!name || !item || qty <= 0) {
            alert("Please fill all details correctly.");
            return;
        }

        const price = prices[item];
        const subtotal = price * qty;
        const gst = subtotal * 0.05;
        const total = subtotal + gst;

        document.getElementById("bill").innerHTML = `
            <h3>Order Summary</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Item:</strong> ${item}</p>
            <p><strong>Quantity:</strong> ${qty}</p>
            <p><strong>Subtotal:</strong> ₹${subtotal}</p>
            <p><strong>GST (5%):</strong> ₹${gst.toFixed(2)}</p>
            <hr>
            <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
        `;

        // Save order
        const order = { name, item, qty, total };
        localStorage.setItem("lastOrder", JSON.stringify(order));
    });
}

// ==========================
// PAYMENT SYSTEM
// ==========================
const payBtn = document.getElementById("payBtn");

if (payBtn) {
    payBtn.addEventListener("click", () => {
        const method = document.getElementById("paymentMethod").value;

        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        alert("Payment successful. Thank you for visiting. Please come again.");

        // Clear cart/order
        localStorage.removeItem("lastOrder");
    });
}

// ==========================
// CLICK MENU ITEM → ORDER PAGE
// ==========================
document.querySelectorAll(".food-card").forEach(card => {
    card.addEventListener("click", () => {
        const itemName = card.querySelector("h3").innerText;

        localStorage.setItem("selectedItem", JSON.stringify(itemName));

        window.location.href = "order.html";
    });
});