let cartData = JSON.parse(localStorage.getItem("cart"));
const cartContainer = document.querySelector(".products_to_buy_container");
const subtotalContainer = document.querySelector(".subtotal-container");
const totalPriceContainer = document.querySelector(".total-price-container");
const buyBtn = document.querySelector(".buy_container");

window.onload = () => {
  const cartHandler = () => {
    let subtotal = 0;
    let htmlEl = "";
    cartData.forEach((data) => {
      htmlEl += `
      <div class="product_summary">
      <div class="product_img_container">
      
      <img src=${data.images.mainImg} alt="${data.name}" />
      </div>
      <div class="_product_name_container">
      <div class="name_container">
      <h3 class="name">${data.name}</h3>
      </div>
      <div class="description_container">
      <p class="description">${data.desc.slice(0, 35)}...</p>
      </div>
      </div>
      <div class="unit_count_container">
      <div class="unit_container">
            <div class="units">
                <h5>units</h5>
            </div>
        </div>
      <div class="order_units">
      <p value="${data.quantity}" class="item-quantity">1</p>
      </div>
      </div>
      <div class="units_total_price_container">
      <div class="price_text">
            <h5>Price</h5>
        </div>
      <div class="price">${data.price}/-</div>
      </div>
      <div class="remove_item_container">
      <div class="remove_item_btn">
      <button type="button class="remove" data-item-id="${
        data.id
      }">Remove</button>
      </div>
      </div>
      </div>
      `;
      subtotal += data.quantity * data.price;
    });
    cartContainer.innerHTML = "";
    if (cartData.length > 0) {
      cartContainer.innerHTML = htmlEl;
      // document.querySelector(".bill_container").classList.add("remove");
    } else {
      cartContainer.innerHTML = `<img class="empty-cart-img" src="./img/empty-cart.svg" alt="empty cart"/>`;
      document.querySelector(".bill_container").classList.add("hide");
      document
        .querySelector(".products_to_buy_container")
        .classList.add("products_to_buy_container-change");
    }
    document.querySelector(".item-total").innerText = `${subtotal}/-`;
    subtotalContainer.innerText = `${subtotal + 40}/-`;
    totalPriceContainer.innerText = `${subtotal}/-`;
    const removeBtns = document.querySelectorAll("button");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const itemId = e.target.dataset.itemId;
        const newData = cartData.filter((data) => data.id != itemId);
        console.log(newData);
        cartData = newData;
        localStorage.setItem("cart", JSON.stringify(cartData));
        cartHandler();
      });
    });
  };
  cartHandler();
  buyBtn.addEventListener("click", (e) => alert("Order Placed Successfully"));
};
