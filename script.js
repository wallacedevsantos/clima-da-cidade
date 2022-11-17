// Variáveis e Seleção de elementos

const apiKey = "676fc6c948b7dc48d99da3ebe066f33e";
const apiPaisesURL = `https://flagcdn.com/`;
const apiUnsplash = "https://source.unsplash.com/random/1600x900/?";

const cidadeInput = document.querySelector("#cidade-input");
const searchBtn = document.querySelector("#search");
const contentResult = document.querySelector(".content");

const cidadeElemento = document.querySelector(".cidade");
const iconPaisElemento = document.querySelector(".icon-pais");
const dataElemento = document.querySelector(".data");
const temperaturaElemento = document.querySelector(".temperatura-cidade span");
const descricaoClimaElemento = document.querySelector(".descricao-clima");
const iconClimaElemento = document.querySelector(".icon-clima img");
const horasElemento = document.querySelector(".horas");
const umidadeElemento = document.querySelector(".porcentagem-umidade");
const ventoElemento = document.querySelector(".velocidade-vento");
const tempMaxima = document.querySelector(".temperatura-max span");
const tempMinima = document.querySelector(".temperatura-min span");
const backgrounElemento = document.querySelector("body");

const loader = document.querySelector("#loader");

//  Funções

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  contentResult.classList.add("hide");
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cidadeElemento.innerHTML = data.name;
  umidadeElemento.innerHTML = data.main.humidity;
  temperaturaElemento.innerHTML = parseInt(data.main.temp);
  descricaoClimaElemento.innerHTML = data.weather[0].description;
  iconClimaElemento.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  iconPaisElemento.setAttribute(
    "src",
    `https://flagcdn.com/${data.sys.country.toLowerCase()}.svg`
  );

  ventoElemento.innerHTML = data.wind.speed;
  horasElemento.innerHTML = new Date().toLocaleTimeString("pt-br", {
    hour: "2-digit",
    minute: "2-digit",
  });
  dataElemento.innerHTML = new Date().toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
  });

  tempMaxima.innerHTML = parseInt(data.main.temp_max);
  tempMinima.innerHTML = parseInt(data.main.temp_min);

  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  contentResult.classList.remove("hide");
  cidadeInput.value = "";
};

//  Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cidadeInput.value.trim();

  showWeatherData(city);
});
