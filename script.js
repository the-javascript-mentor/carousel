const productWidth = 240;
const productListNode = document.getElementById("product-list");

let isCarouselMoving = false;

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

const shuffleArray = (array) => {
  // Fisher-Yates shuffle
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  const arrayCopy = [...array];
  let currentIndex = arrayCopy.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }

  return arrayCopy;
};

const moveLastItemToFirstPositionAnArray = (array) => {
  return [array[array.length - 1], ...array.slice(0, array.length - 1)];
};

productListNode.innerHTML = moveLastItemToFirstPositionAnArray(
  shuffleArray(products)
)
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

productListNode.addEventListener("scroll", () => {
  if (productListNode.scrollLeft % productWidth === 0) {
    isCarouselMoving = false;
    document.getElementById("right").disabled = false;
    document.getElementById("left").disabled = false;
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
  if (!isCarouselMoving) {
    isCarouselMoving = true;
    document.getElementById("right").disabled = true;
    document.getElementById("left").disabled = true;
    document.getElementById("product-list").scrollBy({
      left: productWidth,
      behavior: "smooth",
    });
  }
});

document.getElementById("left").addEventListener("click", () => {
  if (!isCarouselMoving) {
    isCarouselMoving = true;
    document.getElementById("right").disabled = true;
    document.getElementById("left").disabled = true;
    document.getElementById("product-list").scrollBy({
      left: -productWidth,
      behavior: "smooth",
    });
  }
});
