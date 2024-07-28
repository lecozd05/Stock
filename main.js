import {
    searchModuleCreation,
    answerModuleCreation
} from './script/searchAndResult.js';

// Utilisation des fonctions importées
searchModuleCreation();
answerModuleCreation();

// Constantes globales pour les éléments du DOM
const brandText = document.querySelector("#ean13AnswerZone--BrandText");
const productNameList = document.querySelector("#ean13AnswerZone--ProductNameList");
const ean13SearchButton = document.querySelector("#ean13SearchButton");

ean13SearchButton.addEventListener("click", () => {
    const ean13 = document.querySelector("#ean13SearchInput").value;
    fetchProductData(ean13);
});

async function fetchProductData(ean13) {
    try {
        const response = await fetch('./data/productsCatalog.json');
        if (!response.ok) {
            throw new Error(`Erreur de lecture du fichier : ${response.status} ${response.statusText}`);
        }
        const products = await response.json();
        console.log(products);

        const product = products.find(p => p.gtin === ean13);
        if (!product) {
            throw new Error(`Produit non trouvé pour EAN13: ${ean13}`);
        }

        updateBrandText(product.productBrand);
        updateProductNameList([product.productName]);
    } catch (error) {
        console.error("Erreur:", error);
    }
}

function updateBrandText(brand) {
    brandText.innerHTML = ""; // Clear existing content
    if (Array.isArray(brand)) {
        const brandList = document.createElement("ul");
        brand.forEach((brandName) => {
            const listItem = document.createElement("li");
            listItem.innerText = brandName;
            brandList.appendChild(listItem);
        });
        brandText.appendChild(brandList);
    } else {
        brandText.innerText = brand || "N/A";
    }
}

function updateProductNameList(titles) {
    productNameList.innerHTML = ""; // Clear any existing list items
    titles.forEach((title) => {
        const listItem = document.createElement("li");
        listItem.innerText = title;
        productNameList.appendChild(listItem);
    });
}
