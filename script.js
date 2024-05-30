const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("form button");
const msgbox = document.querySelector("#amount-val");

//populating the country dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    //creating a new option and setting its value and then appending to existing list of options in select
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);

    //to initially start with usd to inr conversion
    if (select.name === "From" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }

  //attaching event listeners to each dropdown select (both from and to)
  select.addEventListener("change", (event) => {
    updateFlag(event.target); //passing the option which was selected
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
  let oldSrc = element.parentElement.querySelector("img"); //as element passed is select we need to access its parent to change the img
  oldSrc.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const inputAmount = document.querySelector("form input");
  const inputAmountVal = inputAmount.value;
  if (inputAmountVal < 1) {
    alert("Hypothetical or Incorrect Amount Entry. Please correct!");
    inputAmount.value = "";
    msgbox.innerText = "";
  } else {
    const fromCurr = document
      .querySelector(".from-container select")
      .value.toLowerCase();
    const toCurr = document
      .querySelector(".to-container select")
      .value.toLowerCase();

    //fetching data from API
    const URL = `${BASE_URL}/${fromCurr}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr][toCurr];
    let convertedAmount = rate * inputAmountVal;
    let msg = `${inputAmountVal} ${fromCurr.toUpperCase()} = ${convertedAmount} ${toCurr.toUpperCase()}`;
    msgbox.innerText = msg;
  }
});
