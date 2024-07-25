function searchModuleCreation() {
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
searchModuleCreation();

function answerModuleCreation() {
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
