const ipInput = document.getElementById("ip-input");
const form = document.getElementById("form")
let locationArray = [];
let ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const mapContainer = document.getElementById("mapContain");
const errorMsg = document.getElementById("errormsg");
const submitBtn = document.getElementById('submitbtn');
const countryName = document.getElementById("name");
const countryFlag = document.getElementById("flag");
const ISP = document.getElementById("isp");
const state = document.getElementById("state");


// CALLING THE IP API
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    const {country_code3,isp,country_flag, latitude, longitude, state_prov} = data;
    parseFloat(latitude, longitude);
    console.log(data);
    countryName.innerText = country_code3;
    countryFlag.setAttribute('src', `${country_flag}`);
    const myArray = isp.split(" ");
    ISP.innerText = myArray[0];
    state.innerText = state_prov;

    // LEAFLET.JS CODE
    var map = L.map('map').setView([latitude, longitude], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker = new L.Marker([latitude, longitude]);
    marker.addTo(map)
    .bindPopup('YOU ARE HERE')
    .openPopup();
}


let interval = setInterval(() => {
    let ip = ipInput.value;
    if (ip.match(ipFormat)) {
        submitBtn.disabled = false;
        errorMsg.innerText = "";
        submitBtn.style.cursor = 'pointer';
    } else {
        if (!ip.match(ipFormat) && !(ip == "")) {
            errorMsg.innerText = "ENTER A VALIP IPV4 ADDRESS";
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'not-allowed';
        } else {
            errorMsg.innerText = "";
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'not-allowed';
         }
    }
   
}, 100)

form.addEventListener("submit", (e) => {
 
    e.preventDefault();
    mapContainer.innerHTML = `<div id="map"></div>`;
    let ip = ipInput.value;
    if (ip.match(ipFormat)) {
        errorMsg.innerText = "";
        const API_KEY = "a0e25881ac05466e9761ef5d64be4418";
    const apiURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=' + API_KEY + '&ip=' + ip;
        getapi(apiURL);
    } else {
        submitBtn.disabled = true;
    }
})
