// DOM Nodes
let productContainer = document.querySelector("main");
let image1 = document.querySelector(".product:nth-child(1) img");
let image2 = document.querySelector(".product:nth-child(2) img");
let image3 = document.querySelector(".product:nth-child(3) img");

// Product constructor function
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

// Function to choose a random product
function getRandomIndex() {
  return Math.floor(Math.random() * products.length);
}

// Function to render 3 random products
function renderProducts() {
  let product1Index = getRandomIndex();
  let product2Index = getRandomIndex();
  let product3Index = getRandomIndex();

  // Ensure all three products are unique
  while (
    product1Index === product2Index ||
    product1Index === product3Index ||
    product2Index === product3Index
  ) {
    product2Index = getRandomIndex();
    product3Index = getRandomIndex();
  }

  // Update the images' src and alt attributes
  image1.src = products[product1Index].src;
  image2.src = products[product2Index].src;
  image3.src = products[product3Index].src;
  image1.alt = products[product1Index].name;
  image2.alt = products[product2Index].name;
  image3.alt = products[product3Index].name;

  // Increment the view count for each product
  products[product1Index].views++;
  products[product2Index].views++;
  products[product3Index].views++;
}

// Handle product click
function handleProductClick(event) {
  let clickedProduct = event.target.alt;

  if (event.target === productContainer) {
    alert("Please click a picture");
  } else {
    renderProducts();
  }

  for (let i = 0; i < products.length; i++) {
    if (clickedProduct === products[i].name) {
      products[i].clicks++;
      break;
    }
  }

  // If 25 votes have been completed, show results
  let totalClicks = products.reduce((acc, product) => acc + product.clicks, 0);
  if (totalClicks >= 25) {
    productContainer.removeEventListener("click", handleProductClick); // Oylama event listener'ını kaldır
    displayResults();
  }
}

// Product array
const products = [
  new Product("shark", "assets/shark.jpg"),
  new Product("sweep", "assets/sweep.png"),
  new Product("tauntaun", "assets/tauntaun.jpg"),
  new Product("bag", "assets/bag.jpg "),
  new Product("banana", "assets/banana.jpg"),
  new Product("bathroom", "assets/bathroom.jpg"),
  new Product("boots", "assets/boots.jpg"),
  new Product("breakfast", "assets/breakfast.jpg"),
  new Product("bubblegum", "assets/bubblegum.jpg"),
  new Product("chair", "assets/chair.jpg"),
  new Product("cthulhu", "assets/cthulhu.jpg"),
  new Product("dog-duck", "assets/dog-duck.jpg"),
  new Product("dragon", "assets/dragon.jpg"),
  new Product("pen", "assets/pen.jpg"),
  new Product("pet-sweep", "assets/pet-sweep.jpg"),
  new Product("scissors", "assets/scissors.jpg"),
];

// Results display function
function displayResults() {
  const resultsElement = document.querySelector(".result-content");
  resultsElement.innerHTML = ""; // Clear previous results

  products.forEach((product) => {
    const resultItem = document.createElement("p");
    resultItem.textContent = `${product.name} - ${product.clicks} vote, ${product.views} display`;
    resultsElement.appendChild(resultItem);
  });
}

// Let's add a button to show the results
let resultsButton = document.createElement("button");
resultsButton.textContent = "Show Results";
resultsButton.addEventListener("click", function () {
  displayResults();
  renderChart();
});

let navElement = document.querySelector("nav");
navElement.appendChild(resultsButton);

// Add event listener
productContainer.addEventListener("click", handleProductClick);

// Initial render
renderProducts();

// function to create a new chart
function renderChart() {
  const ctx = document.getElementById("productChart").getContext("2d");

  const labels = products.map((product) => product.name);
  const views = products.map((product) => product.views);
  const clicks = products.map((product) => product.clicks);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "# of clicks",
          data: clicks,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
  });
}
