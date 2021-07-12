const dashBtns = document.querySelectorAll(".dash-btn");
const dashboardContainers = document.querySelectorAll(".dashboard-container");
const mainUrl =
  "https://bagcampus-skillfest-task-1-default-rtdb.asia-southeast1.firebasedatabase.app";

const addItemForm = document.querySelector(".add-item-form");

const deleteItemHanlder = async (e) => {
  e.preventDefault();
  const enteredToken = prompt("Enter auth Key To delete");
  const authResponse = await fetch(
    "https://bagcampus-skillfest-task-1-default-rtdb.asia-southeast1.firebasedatabase.app/authToken.json"
  );
  const authData = await authResponse.json();
  const authKey = Object.values(authData)[0].authKey;
  if (authKey === enteredToken) {
    if (confirm("You Sure... You wanna Delete")) {
      const itemId = document.getElementById("item-id").value;
      let response = await fetch(`${mainUrl}/productData.json`);
      let productData = Object.values(await response.json());
      console.log(productData);
      let products;
      if (Array.isArray(productData)) {
        products = productData;
      } else {
        products = productData[0];
      }
      products;
      const newCart = products.filter((pd) => pd.id !== itemId);
      if (products.findIndex((pd) => pd.id === itemId) > -1) {
        await fetch(`${mainUrl}/productData.json`, {
          method: "PUT",
          body: JSON.stringify(newCart),
        });
        alert("Item Delete Successfully...!!!");
      } else {
        alert("No itme Found with inserted Id");
      }
    }
  } else {
    alert("Wrong Auth Key Entered, Please Try Again!!!");
  }
};

const addItemHanlder = async (e) => {
  e.preventDefault();
  const formData = new FormData(addItemForm);
  const formDataObject = Object.fromEntries(formData.entries());
  console.log(formDataObject);
  let response = await fetch(`${mainUrl}/productData.json`);
  let productData = Object.values(await response.json());
  console.log(productData);
  let products;
  if (Array.isArray(productData)) {
    products = productData;
  } else {
    products = productData[0];
  }
  products;
  let subImg = [
    `${formDataObject.subImg1 && formDataObject.subImg1}`,
    `${formDataObject.subImg2 && formDataObject.subImg2}`,
    `${formDataObject.subIimg3 && formDataObject.subIimg3}`,
  ];
  const itemName = formDataObject.itemName;
  const newCart = [
    ...products,
    {
      id: `${itemName.split(" ").slice(0, 3).join("-")}`,
      name: itemName,
      desc: formDataObject.itemDescription,
      price: formDataObject.itemPrice,
      images: { mainImg: formDataObject.mainImgUrl, subImg },
    },
  ];
  await fetch(`${mainUrl}/productData.json`, {
    method: "PUT",
    body: JSON.stringify(newCart),
  });
  alert("Item Added Successfully...!!!");
  loginForm.reset();
};
dashBtns.forEach((btn) => {
  let response, data, productData, htmlEl;
  btn.addEventListener("click", async (e) => {
    dashboardContainers.forEach((dc) => {
      dc.classList.add("hide");
    });
    const btnType = e.target.dataset.btnType;
    document.querySelector(`.${btnType}`).classList.remove("hide");
    switch (btnType) {
      case "add_item_form_container":
        break;
      case "view_item_table_container":
        response = await fetch(`${mainUrl}/productData.json`);
        data = await response.json();
        productData = Object.values(data);
        htmlEl = "";
        console.log(productData);
        let products;
        if (Array.isArray(productData)) {
          products = productData;
        } else {
          products = productData[0];
        }
        products.forEach((product, i) => {
          htmlEl += `
            <tr>
                <th scope="row" class="text-center">${i + 1}</th>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
            </tr>
          `;
        });
        const viewItembody = document.querySelector(".view-item-tbody");
        viewItembody.innerHTML = "";
        viewItembody.innerHTML = htmlEl;
        break;
      case "view_user_table_container":
        response = await fetch(`${mainUrl}/userData.json`);
        data = await response.json();
        userData = Object.values(data);
        htmlEl = "";
        userData.forEach((user, i) => {
          htmlEl += `<tr>
            <th scope="row" class="text-center">${i + 1}</th>
            <td>${user.name}</td>
            <td>${user.email}</td>
          </tr>`;
        });
        const viewUserTbody = document.querySelector(".view-user-tbody");
        viewUserTbody.innerHTML = "";
        viewUserTbody.innerHTML = htmlEl;
        break;
      case "delete_item_form_container":
        break;

      default:
        break;
    }
  });
});
document
  .querySelector(".delete-item-form")
  .addEventListener("submit", deleteItemHanlder);
addItemForm.addEventListener("submit", addItemHanlder);
