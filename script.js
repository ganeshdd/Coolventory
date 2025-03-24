document.addEventListener("DOMContentLoaded", function () {
    applyDarkMode();
    loadProducts();
    updateStats();
    updateDashboard();

    document.querySelector(".dark-mode-toggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    document.querySelector(".login-button").addEventListener("click", function () {
        alert("Login functionality to be implemented!");
    });
});

function addProduct() {
    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let quantity = document.getElementById("quantity").value;
    let expiry = document.getElementById("expiry").value;

    if (!name || !category || !quantity || !expiry) {
        alert("Please fill in all fields.");
        return;
    }

    let table = document.getElementById("product-table").querySelector("tbody");
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>${quantity}</td>
        <td>${expiry}</td>
        <td>
            <button onclick="editRow(this)">✏️ Edit</button>
            <button onclick="deleteRow(this)">❌ Delete</button>
            <button onclick="checkExpiry(this)">📅 Check Expiry</button>
        </td>
    `;

    saveProducts();
    updateStats();
    clearForm();
    updateDashboard();
}

function deleteRow(button) {
    button.closest("tr").remove();
    saveProducts();
    updateStats();
    updateDashboard();
}

function editRow(button) {
    let row = button.closest("tr");
    let cells = row.cells;

    document.getElementById("name").value = cells[0].textContent;
    document.getElementById("category").value = cells[1].textContent;
    document.getElementById("quantity").value = cells[2].textContent;
    document.getElementById("expiry").value = cells[3].textContent;

    row.remove();
    saveProducts();
    updateStats();
    updateDashboard();
}

function checkExpiry(button) {
    let expiryDate = new Date(button.closest("tr").cells[3].textContent);
    let today = new Date();

    alert(expiryDate < today ? "⚠️ This product has expired!" : "✅ This product is still fresh.");
}

function updateStats() {
    let rows = document.querySelectorAll("#product-table tbody tr");
    document.getElementById("total-products").textContent = rows.length;

    let lowStock = 0, expired = 0;
    let categoryCounts = {
        Dairy: 0,
        Frozen: 0,
        Beverages: 0,
        Vegetables: 0,
        Fruits: 0,
        Meat: 0
    };
    let today = new Date();

    rows.forEach(row => {
        let qty = parseInt(row.cells[2].textContent);
        let expiryDate = new Date(row.cells[3].textContent);
        let category = row.cells[1].textContent;

        if (qty < 5) lowStock++;
        if (expiryDate < today) {
            expired++;
            row.classList.add("expired");

        } else {
            row.classList.remove("expired");
        }

        if (categoryCounts[category] !== undefined) {
            categoryCounts[category]++;
        }
    });

    document.getElementById("low-stock").textContent = lowStock;
    document.getElementById("expired-count").textContent = expired;

    document.getElementById("dairy-count").textContent = categoryCounts.Dairy;
    document.getElementById("frozen-count").textContent = categoryCounts.Frozen;
    document.getElementById("beverages-count").textContent = categoryCounts.Beverages;
    document.getElementById("vegetables-count").textContent = categoryCounts.Vegetables;
    document.getElementById("fruits-count").textContent = categoryCounts.Fruits;
    document.getElementById("meat-count").textContent = categoryCounts.Meat;
}

function saveProducts() {
    localStorage.setItem("products", document.querySelector("#product-table tbody").innerHTML);
}

function loadProducts() {
    document.querySelector("#product-table tbody").innerHTML = localStorage.getItem("products") || "";
    updateStats();
    updateDashboard();
}

function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("expiry").value = "";
}

function updateDashboard() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const categoryCounts = {
        Dairy: 0,
        Frozen: 0,
        Beverages: 0,
        Vegetables: 0,
        Fruits: 0,
        Meat: 0
    };

    products.forEach(product => {
        if (categoryCounts[product.category] !== undefined) {
            categoryCounts[product.category]++;
        }
    });

    document.getElementById("total-products").textContent = products.length;
    document.getElementById("dairy-count").textContent = categoryCounts.Dairy;
    document.getElementById("frozen-count").textContent = categoryCounts.Frozen;
    document.getElementById("beverages-count").textContent = categoryCounts.Beverages;
    document.getElementById("vegetables-count").textContent = categoryCounts.Vegetables;
    document.getElementById("fruits-count").textContent = categoryCounts.Fruits;
    document.getElementById("meat-count").textContent = categoryCounts.Meat;
}