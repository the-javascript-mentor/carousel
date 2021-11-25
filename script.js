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

const moveLastItemToFirstPositionAnArray = (array) => {
  return [array[array.length - 1], ...array.slice(0, array.length - 1)];
};

productListNode.innerHTML = moveLastItemToFirstPositionAnArray(products)
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
document.getElementById("product-list").scrollTo({
  left: productWidth,
});

productListNode.addEventListener("scroll", (event) => {
  if (productListNode.scrollLeft % productWidth === 0) {
    if (productListNode.scrollLeft === 0) {
      const children = productListNode.children;
      const firstChild = children[0];
      const lastChild = children[children.length - 1];
      // Move the last element to the first position
      productListNode.insertBefore(lastChild, firstChild);
      // Scroll to the second last element
      document.getElementById("product-list").scrollTo({
        left: productWidth,
      });
    }
    if (
      productListNode.scrollLeft ===
      productWidth * (products.length - getNumberOfVisibleCarouselItems())
    ) {
      const children = productListNode.children;
      const firstChild = children[0];
      // Move the first element to the last position
      productListNode.appendChild(firstChild);
      // Scroll to the second last element
      document.getElementById("product-list").scrollTo({
        left:
          productWidth *
          (products.length - getNumberOfVisibleCarouselItems() - 1),
      });
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
