const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
        <p>Country information doesn't fetched</p>
        <img src="./img/404.png" />
    `;
};

const renderCountries = (data) => {
  const countryDiv = document.querySelector(".countries");
  const {
    flags: { svg },
    name: { common },
    region,
    capital,
    languages,
    currencies,
    maps: { googleMaps },
  } = data[0];

  countryDiv.innerHTML = `
    <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
    <img src="${svg}" class="card-img-top" alt="${common}">
    <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p class="card-text">${region}</p>
      </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <i class="fas fa-lg fa-landmark"></i>
            ${capital}
          </li>
          <li class="list-group-item">
            <i class="fa-solid fa-comments"></i>
            ${Object.values(languages)}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-money-bill-wave"></i>
            ${Object.values(currencies).map(
              (item) => Object.values(item) + " "
            )}
          </li>
        </ul>
      <div class="card-body">
      <button class="btn btn-primary"><a href="${googleMaps}" target="_blank" class="card-link text-light">Google Maps</a></button>
    </div>
    </div>
    `;
};

const selectedCountry = (country) => {
  countryList = [];
  urlf = `https://restcountries.com/v3.1/all`;
  fetch(urlf)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => {
      const countryName = document.getElementById("country-name");
      // countryDiv.innerHTML = `<select name="country" class="country"></select>`
      data.forEach((element) => {
        countryList.push(element.name.common);
      });
      countryList.sort().forEach((element) => {
        countryName.innerHTML += `
                <option id='countries' value="${element}">${element}</option>
                `;
      });
      document
        .getElementById("country-name")
        .addEventListener("change", (e) => {
          country = countryName.value;
          fetchCountryByName(country);
        });
    })
    .catch((err) => console.log(err));
};
selectedCountry("turkey");
