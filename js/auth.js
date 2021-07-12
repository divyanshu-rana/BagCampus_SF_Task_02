const loginBtnContainer = document.querySelector(".login_btn_container");
const userContainer = document.querySelector(".user_container");

const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
if (isLoggedIn) {
  const user = JSON.parse(localStorage.getItem("userData"));
  loginBtnContainer.classList.add("hide");
  userContainer.classList.remove("hide");
  const userName = document.querySelector(".user_name");
  userName.innerText = user.name;
  userName.addEventListener("click", (e) => {
    document.querySelector(".sign_out_btn_container").classList.toggle("hide");
  });
  document.querySelector(".signout").addEventListener("click", (e) => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    location.reload();
  });
}
