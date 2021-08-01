const mainImgContianer = document.querySelector(".main_img_container");
const moreImageContainer = document.querySelector(".more_img_container");
const itemName = document.querySelector(".item_name");
const discription = document.querySelector(".desc");
const priceContainer = document.querySelector(".price-container");
const cartBtn = document.querySelector(".cart_btn");
const BuyBtn = document.querySelector(".buy_btn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector(".cart-count").innerText = cart.length;
let subImages;
const url =
  "https://bagcampus-skillfest-task-1-default-rtdb.asia-southeast1.firebasedatabase.app/productData.json";
const fetchData = async () => {
  const resopnse = await fetch(url);
  const data = await resopnse.json();
  const productData = Object.values(data);
  let products;
  if (Array.isArray(productData)) {
    products = productData;
  } else {
    products = productData[0];
  }
  const userProductId = sessionStorage.getItem("product-id");
  const product = products.filter((product) => product.id === userProductId);
  mainImgContianer.insertAdjacentHTML(
    "beforeend",
    `<div class="main_img"><img
  src=${product[0].images.mainImg}
  alt="${product[0].name}"></div>`
  );
  itemName.innerText = product[0].name;
  discription.innerText = product[0].desc;
  priceContainer.innerText = `${product[0].price}/-`;

  moreImageContainer.innerHTML = "";
  let htmlEl = `<div class="more_img" data-img-url="${product[0].images.mainImg}"><img src="${product[0].images.mainImg}" alt=""/></div>`;
  product[0].images.subImg.forEach((img) => {
    htmlEl += `<div class="more_img" data-img-url="${img}"><img src="${img}" alt=""/></div>`;
  });
  moreImageContainer.insertAdjacentHTML("beforeend", htmlEl);
  subImages = document.querySelectorAll(".more_img");

  subImages.forEach((img) => {
    img.addEventListener("mouseover", (e) => {
      mainImgContianer.innerHTML = "";
      mainImgContianer.insertAdjacentHTML(
        "beforeend",
        `<div class="main_img"><img
    src=${img.dataset.imgUrl}
    alt="${product[0].name}"></div>`
      );
    });
  });
  cartBtn.addEventListener("click", (e) => {
    const existItemIndex = cart.findIndex((item) => item.id === product[0].id);
    if (existItemIndex > -1) {
      cart[existItemIndex] = {
        ...product[0],
        quantity: parseInt(cart[existItemIndex].quantity) + 1,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart.push({ ...product[0], quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    document.querySelector(".cart-count").innerText = cart.length;
  });
};

window.onload = async () => {
  await fetchData();
};

BuyBtn.addEventListener("click", (e) => alert("Order Placed Successfully"));
