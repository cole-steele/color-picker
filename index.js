colorPicker = document.getElementById("pick-color");
dropdownMenu = document.getElementById("scheme-type");
submitButton = document.getElementById("scheme-btn")

submitButton.addEventListener("click", submitTheme)

const apiURL = "https://thecolorapi.com/id?rgb=0,71,171";
const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(apiURL)}`;

fetch(`https://corsproxy.io/?${encodeURIComponent(apiURL)}`)
  .then(res => res.json())
  .then(data => console.log("✅ ColorAPI:", data))
  .catch(err => console.error("Error:", err));

function submitTheme() {
    currentColor = colorPicker.value.slice(1);
    currentTheme = dropdownMenu.value;
    console.log(currentColor, currentTheme)

    fetch(`https://thecolorapi.com/scheme?hex=${currentColor}&mode=${currentTheme}&count=5`, {
        method:"GET",
    })
        .then(rsp => rsp.json())
        .then(msg => console.log(msg));
}



