const productInput = document.getElementById("productInput");
const addButton = document.getElementById("addButton");
const productList = document.getElementById("productList");
const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");

const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
let products = savedProducts;

function saveToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function updateStats() {
  totalEl.textContent = products.length;
  const boughtCount = products.filter((item) => item.completed).length;
  completedEl.textContent = boughtCount;
}

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.className = "product-item";

    const label = document.createElement("label");
    label.className = "product-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = product.completed;
    checkbox.addEventListener("change", () => {
      toggleProduct(product.id);
    });

    const title = document.createElement("span");
    title.textContent = product.name;
    if (product.completed) {
      title.classList.add("completed");
    }

    label.appendChild(checkbox);
    label.appendChild(title);

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.textContent = "Видалити";
    removeBtn.addEventListener("click", () => {
      deleteProduct(product.id);
    });

    li.appendChild(label);
    li.appendChild(removeBtn);
    productList.appendChild(li);
  });

  updateStats();
}

function addProduct() {
  const name = productInput.value.trim();
  if (!name) {
    return;
  }

  const newProduct = {
    id: Date.now(),
    name: name,
    completed: false
  };

  products.push(newProduct);
  saveToStorage();
  renderProducts();
  productInput.value = "";
}

function toggleProduct(id) {
  products = products.map((item) => {
    if (item.id === id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });

  saveToStorage();
  renderProducts();
}

function deleteProduct(id) {
  products = products.filter((item) => item.id !== id);
  saveToStorage();
  renderProducts();
}

addButton.addEventListener("click", addProduct);

productInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addProduct();
  }
});

renderProducts();
