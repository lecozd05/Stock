// Importation dans un autre fichier JavaScript
import {
    searchModuleCreation,
    answerModuleCreation
} from './script/searchAndResult.js';

// Utilisation des fonctions importées
searchModuleCreation();
answerModuleCreation();



async function fetchProductData(ean13) {
    const url = `https://big-product-data.p.rapidapi.com/gtin/${ean13}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "d8adeb575cmsh223da52d1ea47e2p18dc31jsned4356ee01f6",
            "x-rapidapi-host": "big-product-data.p.rapidapi.com"
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(
                `Erreur de requête: ${response.status} ${response.statusText}`
            );
        }
        const result = await response.json();
        console.log(result);

        const brandText = ean13AnswerZone.querySelector(
            "#ean13AnswerZone--BrandText"
        );
        brandText.innerHTML = ""; // Clear existing content
        if (Array.isArray(result.properties.brand)) {
            const brandList = document.createElement("ul");
            result.properties.brand.forEach((brand) => {
                const listItem = document.createElement("li");
                listItem.innerText = brand;
                brandList.appendChild(listItem);
            });
            brandText.appendChild(brandList);
        } else {
            brandText.innerText = result.properties.brand;
        }

        const productNameList = ean13AnswerZone.querySelector(
            "#ean13AnswerZone--ProductNameList"
        );
        productNameList.innerHTML = ""; // Clear any existing list items
        result.properties.title.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.innerText = item;
            productNameList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Erreur:", error);
    }
}

const ean13SearchButton = document.querySelector("#ean13SearchButton");

ean13SearchButton.addEventListener("click", () => {
    const ean13 = document.querySelector("#ean13SearchInput").value;
    fetchProductData(ean13);
});