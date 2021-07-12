const productContainer = document.querySelector(".product_products_container");
let items;
let subImgContainer;
const url =
  "https://bagcampus-skillfest-task-1-default-rtdb.asia-southeast1.firebasedatabase.app/productData.json";
const fetchData = async () => {
  const resopnse = await fetch(url);
  const data = await resopnse.json();
  const productData = Object.values(data);
  let htmlEl = "";
  let products;
  if (Array.isArray(productData)) {
    products = productData;
  } else {
    products = productData[0];
  }
  products.forEach((product) => {
    htmlEl += `<a class="item" href="./product_detail.html" data-product-id="${product.id}"><img src="${product.images.mainImg}" alt="${product.name}"/><span class="price-tag">${product.price}/-</span></a>`;
  });
  productContainer.innerHTML = "";
  productContainer.insertAdjacentHTML("beforeend", htmlEl);
};

window.onload = async () => {
  await fetchData();
  items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("product-id", item.dataset.productId);
      console.log(e.target.matches("item"));
      location.replace(`product_detail.html`);
    });
  });
};
