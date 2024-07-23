document.addEventListener("DOMContentLoaded", function () {
  let subscribedStocks = [];
  let oldPrices = { GOOG: 0, TSLA: 0, AMZN: 0, META: 0, NVDA: 0 };

  // Handle login form submission
  let login = document.getElementById("loginForm");
  login.addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("email").value;
    login.classList.add("d-none");
    document.getElementById("stockSubscription").classList.remove("d-none");
    let name = "";
    for (let i = 0; i < username.length; i++) {
      if (username[i] == "@") {
        name = username.substring(0, i);
        break;
      }
    }
    document.getElementById("username").innerText = `Welcome , ${name}`;
  });

  // Handle stock subscription form submission
  let stockSubscription = document.getElementById("subscriptionForm");
  stockSubscription.addEventListener("submit", function (event) {
    event.preventDefault();
    const stockTicker = document
      .getElementById("stockTicker")
      .value.toUpperCase();
    console.log(stockTicker);
    if (!subscribedStocks.includes(stockTicker)) {
      subscribedStocks.push(stockTicker);
      oldPrices[stockTicker] = 0; // Initialize the old price for the stock
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = `
        ${stockTicker}
        <span class="stock-price" id="${stockTicker}-price">  </span>
        <span class="stock-price text-success" id="${stockTicker}-up-price">^  </span>
        <span class="stock-price text-danger" id="${stockTicker}-down-price">  </span>
      `;
      document.getElementById("stockList").appendChild(listItem);
      document.getElementById("stockTicker").value = "";
      updateStockPrices();
    }
  });

  // Function to update stock prices with random values
  function updateStockPrices() {
    subscribedStocks.forEach((stock) => {
      const randomPrice = (Math.random() * 1000).toFixed(2);

      const oldPrice = oldPrices[stock];
      const priceDifference = (randomPrice - oldPrice).toFixed(2);
      let positiveDifference = 0,
        negativeDifference = 0;

      if (priceDifference > 0) {
        positiveDifference = priceDifference;
      } else {
        negativeDifference = priceDifference;
      }

      document.getElementById(`${stock}-price`).textContent = `$${randomPrice}`;
      document.getElementById(`${stock}-up-price`).textContent =
        positiveDifference ? `+${positiveDifference}` : "0";
      document.getElementById(`${stock}-down-price`).textContent =
        negativeDifference ? `${negativeDifference}` : "0";

      // Update the old price for the next calculation
      if (oldPrices[stock] == 0) {
        oldPrices[stock] = randomPrice;
      }
    });
  }

  // Update stock prices every second
  setInterval(updateStockPrices, 1000);
  console.log(subscribedStocks);
  console.log(oldPrices);
});

let btns = document.querySelectorAll(".ticker");
for (let btn of btns) {
  btn.addEventListener("click", () => {
    let stockTicker = document.querySelector("#stockTicker");
    stockTicker.value = btn.innerText;
    console.dir(text);
  });
}
