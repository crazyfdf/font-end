let oBtn = document.getElementById("btn");
oBtn.addEventListener("click", function () {
  import("./login.js").then(login => {
    console.log(login);
  });
});
console.log("index.js内容");
