const productWidth = 240;
const productListNode = document.getElementById("product-list");

const getNumberOfVisibleCarouselItems = () => {
  let items = 4;
  if (window.matchMedia("(max-width: 1280px)").matches) {
    items = 3;
  }
  if (window.matchMedia("(max-width: 920px)").matches) {
    items = 2;
  }
  return items;
};

window.addEventListener("resize", () => {
  console.log(getNumberOfVisibleCarouselItems());
});

productListNode.innerHTML = products
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

productListNode.addEventListener("scroll", (event) => {
  if (productListNode.scrollLeft % productWidth === 0) {
    if (productListNode.scrollLeft === 0) {
      console.log("Hit the left edge");
    }
    if (
      productListNode.scrollLeft ===
      productWidth * (products.length - getNumberOfVisibleCarouselItems())
    ) {
      console.log("Hit the right edge");
    }
  }
});

document.getElementById("right").addEventListener("click", () => {
  document.getElementById("product-list").scrollBy({
    left: productWidth,
    behavior: "smooth",
  });
});

document.getElementById("left").addEventListener("click", () => {
  document.getElementById("product-list").scrollBy({
    left: -productWidth,
    behavior: "smooth",
  });
});
