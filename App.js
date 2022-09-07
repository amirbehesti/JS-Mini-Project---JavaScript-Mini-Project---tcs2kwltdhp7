let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result1 = document.getElementById("result1");
let result2 = document.getElementById("result2");
let countryData = [];

//============================SEARCH================================//
searchBtn.onclick = ()=>{
    let countryName = countryInp.value;
    if(countryName != ""){
        result1.innerHTML = "";
        search(countryName);
    }else{
        result1.innerHTML = "";
    }
}

const search = async (countryName) => {
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    await fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            result1.innerHTML += `<div class="eachItem">
            <img src="${data[0].flags.svg}" class="flag-img">
            <h2>${data[0].name.common}</h2>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${data[0].capital[0]}</span>
                </div>
            </div>
        
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Official Name:</h4>
                    <span>${data[0].name.official}</span>
                </div>
            </div>
        
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Region:</h4>
                    <span>${data[0].continents[0]}</span>
                </div>
            </div>
        
            <div class="wrapper">
            <div class="data-wrapper">
                <h4>Sub-region:</h4>
                <span>${data[0].subregion}</span>
            </div>
            </div>
        
             <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Population:</h4>
                    <span>${data[0].population}</span>
                </div>
            </div>
        
            <div class="wrapper">
            <div class="data-wrapper">
                <h4>Area:</h4>
                <span>${data[0].area}<span>sq.km<span></span>
            </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Currency:</h4>
                    <span>${data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
                </div>
            </div>
             <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Common Languages:</h4>
                    <span>${Object.values(data[0].languages)
                    .toString()
                    .split(",")
                    .join(", ")}</span>
                </div>
            </div>
            <div class="wrapper">
               <div class="data-wrapper">
                <h4>Borders:</h4>
                <span>${data[0].borders
                    .toString()
                    .split(",")
                    .join(", ")}</span>
               </div>
           </div>
           <div class="wrapper">
           <div class="data-wrapper">
               <h4>Map:</h4>
               <a target="_blank" class="map-link" href="${Object.values(data[0].maps).toString().split(",", 1)}">Google Maps</a>
           </div>
        </div>
            </div>
          `;
        })
        .catch(() => {
            if (countryName.length == 0) {
                result1.innerHTML = `<h3>The input field cannot be empty</h3>`;
            } else {
                result1.innerHTML = `<h3>Please enter a valid country name.</h3>`;
            }
        });
};


// =================================ONLOAD==========================================//
const fetchCountry = async (event) => {
    const apiEndpoint = `https://restcountries.com/v3.1/all`
    const countries = document.querySelector("#result2");

    await fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            countryData = [...data];
            countryData.map(element => {
                const { flags, name, capital, region, population } = element;

                let country = document.createElement("div");
                country.classList.add("eachItem");
                countries.appendChild(country);

                country.innerHTML = `
				<img src="${flags.png}" class="flag-img">
                <h2>${name.common}</h2>

               <div class="data-wrapper">
                 <div class="wrapper">
                  <h4>Capital:</h4>
                  <span>${capital}</span>
                 </div>
               </div>

               <div class="data-wrapper">
                 <div class="country-region">
                 <h4>Region:</h4>
                  <span>${region}</span>
                 </div>
               </div>

               <div class="data-wrapper">
                 <div class="wrapper">
                 <h4>Population:</h4>
                 <span>${population.toLocaleString()}</span>
                 </div>
               </div>`;

            });

        })
        .catch(error => console.log("Error :", error));
};

window.onload = (event) => {
    fetchCountry();
  };




//============================FILTER=====================================//
const continentSelect = document.querySelector("#continent");

continentSelect.onchange = ()=>{
        let tempData = [];
        if(continentSelect.value === "All"){
            tempData = [...countryData]; 
            result1.innerHTML = "";
        }else{
            tempData = countryData.filter((item)=>{
                return item.region === continentSelect.value;
            })
            result1.innerHTML = "";
        }
        result2.innerHTML = "";
        tempData.map(element => {
            const { flags, name, capital, region, population } = element;

            let country = document.createElement("div");
            country.classList.add("eachItem");
            result2.appendChild(country);

            country.innerHTML = `
            <img src="${flags.png}" class="flag-img">
            <h2>${name.common}</h2>

           <div class="data-wrapper">
             <div class="wrapper">
              <h4>Capital:</h4>
              <span>${capital}</span>
             </div>
           </div>

           <div class="data-wrapper">
             <div class="country-region">
             <h4>Region:</h4>
              <span>${region}</span>
             </div>
           </div>

           <div class="data-wrapper">
             <div class="wrapper">
             <h4>Population:</h4>
             <span>${population.toLocaleString()}</span>
             </div>
           </div>`;
        });
}