//Importing the required modules
import { countryList } from './codes.js';
import { NEW_API_KEY } from './api_key.js';

var countries = countryList;


// This function is used for populate country name in the dropdown and set value and data to options.
function populateDropDown(countries) {
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
  let dropDowns = document.querySelectorAll('.fromDrop-down, .toDrop-down');
  for (let dropDown of dropDowns) {
    for (let countryCurrency in countries) {
      let option = document.createElement('option');
      option.value = countries[countryCurrency];
      option.text = regionNamesInEnglish.of(countries[countryCurrency]);
      option.dataset.currencyName = countryCurrency;

      dropDown.appendChild(option);

      if (option.text === "United States" && dropDown === document.querySelector(".fromDrop-down")) {
        option.selected = "selected";

      }
      else if (option.text === "India" && dropDown === document.querySelector(".toDrop-down")) {
        option.selected = "selected";
      }

    };
  };
}






// This function is used for update flag on the basis of selected country.
async function updateFlag() {
  document.querySelector(".fromDrop-down").addEventListener('change', (event) => {
    document.querySelector(".fromFlag").src = `https://flagsapi.com/${event.target.value}/flat/64.png`;


  })


  document.querySelector(".toDrop-down").addEventListener('change', (event) => {
    document.querySelector(".toFlag").src = `https://flagsapi.com/${event.target.value}/flat/64.png`;

  })

}






// This functiok is used for getting the converted amount via API.
async function getConvertedAmount(amt, fromCurrency, toCurrency) {

  var myHeaders = new Headers();
  myHeaders.append("apikey", `${NEW_API_KEY}`);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  let response = await fetch(`https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amt}`, requestOptions)
  response = await response.json()
  let convertedAmount = Number(response["result"])
  return convertedAmount;

}



// This function is used for convert rhe currency and updating the answer container. It is using the getConvertedAmount function to get converted amount.
async function convertCurrency() {
  if (document.querySelector(".amtToBeConverted").value) {

    let amt = Number(document.querySelector(".amtToBeConverted").value);
    let fromCurrency = document.querySelector(".fromDrop-down").selectedOptions[0].dataset.currencyName;


    let toCurrency = document.querySelector(".toDrop-down").selectedOptions[0].dataset.currencyName;


    let convertedAmount = await getConvertedAmount(amt, fromCurrency, toCurrency);


    let text = `${amt} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    document.querySelector(".answerText").innerHTML = text;

  }
  else {
    alert("Please enter the amount to be converted");
  }
}


// This function is used for adding an event listener to the convert button So that when every time we hit button we can run convertCurrency function.
document.querySelector(".button").addEventListener("click", convertCurrency)



//In starting of we wanted to populate dropdowns, flags according to drop-down selection and answer of currency conversion. So that we called it in starting.
populateDropDown(countries);
updateFlag()
convertCurrency()