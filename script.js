document.getElementById("product-list").innerHTML = products
  .map(
    (product) => `
      <li class="product">
        <a href="">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
        </a>
      </li>
    `
  )
  .join("");

document.getElementById("right").addEventListener("click", () => {
  document.getElementById("product-list").scrollBy({
    left: 240,
    behavior: "smooth",
  });
});

document.getElementById("left").addEventListener("click", () => {
  document.getElementById("product-list").scrollBy({
    left: -240,
    behavior: "smooth",
  });
});
