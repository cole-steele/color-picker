colorPicker = document.getElementById("pick-color");
colorNumber = document.getElementById("color-number");
dropdownMenu = document.getElementById("scheme-type");
submitButton = document.getElementById("scheme-btn")


submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let value = parseInt(colorNumber.value, 10);
    if (value > 20) value = 20;
    if (value < 1) value = 1;
    colorNumber.value = value;

    submitTheme();
});

async function submitTheme() {
    const currentColor = colorPicker.value.slice(1);
    const currentTheme = dropdownMenu.value;
    const colorCount = colorNumber.value;

    console.log(currentColor, currentTheme, colorCount);

    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${currentColor}&mode=${currentTheme}&count=${colorCount}`, {
        method: "GET",
    });
    const data = await response.json();
    console.log(data);

    const colorArray = data.colors.map(c => c.hex.value);
    renderColors(colorArray);

}



const apiURL = "https://thecolorapi.com/id?rgb=0,71,171";

async function submitTheme() {
    currentColor = colorPicker.value.slice(1);
    currentTheme = dropdownMenu.value;
    colorCount = colorNumber.value;
    console.log(currentColor, currentTheme)

    response = await fetch(`https://www.thecolorapi.com/scheme?hex=${currentColor}&mode=${currentTheme}&count=${colorCount}`, {
        method: "GET",
    })
    data = await response.json();
    console.log(data);


    const colorArray = data.colors.map(c => c.hex.value);

    renderColors(colorArray);

}

function renderColors(colors) {
    const grid = document.getElementById("color-grid");
    grid.innerHTML = ""; 

    colors.forEach((hex, index) => {
        const pair = createColorPair(hex);
        grid.appendChild(pair);

        
        const colorDiv = pair.querySelector(".color-div");
        setTimeout(() => colorDiv.classList.add("show"), 50 + index * 50);
    });

    showCopyCsvButton(colors);
}

function createColorPair(hex) {
    const pair = document.createElement("div");
    pair.classList.add("pair");

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color-div");
    colorDiv.style.background = hex;

    const colorHex = document.createElement("div");
    colorHex.classList.add("color-hex");
    colorHex.innerHTML = `<span>${hex}</span>`;

    pair.appendChild(colorDiv);
    pair.appendChild(colorHex);

    addClickCopy(colorDiv, hex, colorHex);


    return pair;
}

function addClickCopy(colorDiv, hex, colorHex) {
    colorDiv.addEventListener("click", () => {
        navigator.clipboard.writeText(hex)
            .then(() => {
                const originalText = colorHex.textContent;
                colorHex.textContent = `${hex} (copied!)`;
                setTimeout(() => colorHex.textContent = originalText, 1500)
            })
            .catch(err => console.error("Failed to copy:", err));
    });
}


function showCopyCsvButton(colors) {
    const copyCsvBtn = document.getElementById("copy-csv-btn");
    copyCsvBtn.style.display = "block";

    copyCsvBtn.onclick = () => {
        const csv = colors.join(",");
        navigator.clipboard.writeText(csv)
            .then(() => {
                copyCsvBtn.textContent = "Copied! :^)";
                setTimeout(() => copyCsvBtn.textContent = "Copy All as CSV", 1500);
            })
            .catch(err => console.error("Failed to copy CSV:", err));
    };
}













