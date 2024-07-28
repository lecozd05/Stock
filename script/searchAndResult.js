export function searchModuleCreation() {
    const ean13SearchZone = document.createElement("section");
    ean13SearchZone.id = "ean13SearchZone";
    document.body.append(ean13SearchZone);

    const ean13SearchLabel = document.createElement("label");
    ean13SearchLabel.htmlFor = "ean13SearchInput";
    ean13SearchLabel.id = "ean13SearchLabel";
    ean13SearchLabel.innerText = "LABEL!";
    ean13SearchZone.appendChild(ean13SearchLabel);

    const ean13SearchInput = document.createElement("input");
    ean13SearchInput.type = "text";
    ean13SearchInput.id = "ean13SearchInput";
    ean13SearchInput.placeholder = "EAN13, GTIN, or Product";
    ean13SearchZone.appendChild(ean13SearchInput);

    const ean13SearchButton = document.createElement("button");
    ean13SearchButton.id = "ean13SearchButton";
    ean13SearchButton.innerText = "Search";
    ean13SearchZone.appendChild(ean13SearchButton);
}

export function answerModuleCreation() {
    const ean13AnswerZone = document.createElement("section");
    ean13AnswerZone.id = "ean13AnswerZone";
    document.body.appendChild(ean13AnswerZone);

    const brandLabel = document.createElement("label");
    brandLabel.id = "ean13AnswerZone--BrandLabel";
    brandLabel.innerText = "Brand";
    ean13AnswerZone.appendChild(brandLabel);

    const brandText = document.createElement("div");
    brandText.id = "ean13AnswerZone--BrandText";
    ean13AnswerZone.appendChild(brandText);

    const productNameLabel = document.createElement("label");
    productNameLabel.id = "ean13AnswerZone--ProductNameLabel";
    productNameLabel.innerText = "Product Name";
    ean13AnswerZone.appendChild(productNameLabel);

    const productNameList = document.createElement("ul");
    productNameList.id = "ean13AnswerZone--ProductNameList";
    ean13AnswerZone.appendChild(productNameList);
}
