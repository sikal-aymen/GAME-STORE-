//-------------------------------------
// 🟣 قاعدة بيانات صغيرة للمنتجات
//-------------------------------------
const products = [
  { id: "1", name: "Lexma G88", price: 22, img: "../IMAGE/image 3.png" },
  { id: "2", name: "Lexma G89", price: 30, img: "../IMAGE/image 1.png" },
  { id: "3", name: "nothing lite", price: 19, img: "../IMAGE/image 4.png" },
  { id: "4", name: "votrex vr", price: 999, img: "../IMAGE/image 5.png" },
  { id: "5", name: "nothing book", price: 7000, img: "../IMAGE/nice computer.png" },
  { id: "6", name: "nothing pad", price: 100, img: "../IMAGE/joy stick.png" },
  { id: "7", name: "psp lite", price: 1000, img: "../IMAGE/psp.png" },
  { id: "8", name: "bleu night ps5", price: 5000, img: "../IMAGE/not really ps5.png" }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelectorAll(".card img, .card h4").forEach(el => {
  el.addEventListener("click", function(e){
    const card = e.target.closest(".card");
    const id = card.getAttribute("data-id");
    window.location.href = `product.html?id=${id}`;
  });
});
document.querySelectorAll(".add").forEach(btn => {
  btn.addEventListener("click", function(e){
    const card = e.target.closest(".card");
    const id = card.getAttribute("data-id");
    let item = cart.find(p => p.id === id);
    if(item){
      item.qty++;
    } else {
      cart.push({ id, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("the product in the car now");
  });
});
function updateCartCount(){
  const cartCount = cart.reduce((t, item) => t + item.qty, 0);
  const icon = document.querySelector(".icon-cart");
  if(icon){
    icon.setAttribute("data-count", cartCount);
  }
}
updateCartCount();
if(window.location.pathname.includes("cart.html")){
  const list = document.querySelector(".cart-items");
  const totalEl = document.querySelector(".cart-total-price");
  function renderCart(){
    list.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      const subtotal = product.price * item.qty;
      total += subtotal;
      list.innerHTML += `
        <div class="cart-item">
          <img src="${product.img}">
          <div class="info">
            <h4>${product.name}</h4>
            <p>${product.price}$</p>
          </div>
          <div class="qty">
            <button class="minus" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button class="plus" data-id="${item.id}">+</button>
          </div>
          <div class="subtotal">${subtotal}$</div>
          <button class="remove" data-id="${item.id}">X</button>
        </div>
      `;
    });
    totalEl.textContent = total + "$";
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  renderCart();
  document.addEventListener("click", e => {
    if(e.target.classList.contains("plus")){
      const id = e.target.dataset.id;
      cart.find(i => i.id === id).qty++;
      renderCart();
      updateCartCount();
    }
    if(e.target.classList.contains("minus")){
      const id = e.target.dataset.id;
      let item = cart.find(i => i.id === id);
      if(item.qty > 1) item.qty--;
      renderCart();
      updateCartCount();
    }
    if(e.target.classList.contains("remove")){
      const id = e.target.dataset.id;
      cart = cart.filter(i => i.id !== id);
      renderCart();
      updateCartCount();
    }
  });
}