let cardsContainer = document.querySelector(".cards-container");

let originalCards = async () => {
    let fetchPhones = await fetch(
        "https://openapi.programming-hero.com/api/phones?search=iphone"
    );
    let responsePhones = await fetchPhones.json();

    for (let i = 0; i < 6; i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <img src="${responsePhones.data[`${i}`].image}" alt="${responsePhones.data[`${i}`]["slug"]
            }">
        <div class="card-details">
            <h2 class="product-name">${responsePhones.data[`${i}`]["phone_name"]
            }</h2>
            <p class="product-description">There are many variations of passages of available, but the majority have suffered</p>
            <button class="show-details-btn">Show Details</button>
        </div>
    `;
        cardsContainer.appendChild(cardDiv);
    }
};

let submit = document.querySelector("form");
submit.addEventListener("submit", async (e) => {
    e.preventDefault();
    let inputField = document.querySelector("#searchInput").value;
    let fetchResults = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${inputField}`
    );
    let resultData = await fetchResults.json();

    if(resultData.data.length >= 1){
        let show = document.querySelector(".show-all");
        show.style.display = "block";
        cardsContainer.style.height = "80rem";
        cardsContainer.style.overflow = "hidden";

        show.addEventListener("click", () => {
            cardsContainer.style.height = "auto";
            cardsContainer.style.overflow = "scroll";
            show.style.display = "none";
            cardsContainer.style.paddingbottom = "2rem";
        })
    }

    cardsContainer.innerHTML = "";
    //   console.log(resultData);

    resultData["data"].forEach((element) => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <img src="${element.image}" alt="${element["slug"]}">
        <div class="card-details">
            <h2 class="product-name">${element["phone_name"]}</h2>
            <p class="product-description">There are many variations of passages of available, but the majority have suffered</p>
            <button class="show-details-btn">Show Details</button>
        </div>
    `;
        cardsContainer.appendChild(cardDiv);
    });
});

cardsContainer.addEventListener("click", async (e) => {
    if (e.target.classList.contains("show-details-btn")) {
        let details = document.querySelector(".details-shown");
        setTimeout(() => {
            details.style.display = "flex";
        }, 500);
        let slug = e.target.parentElement.parentElement.firstElementChild.alt;

        let fetchDetails = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
        let allDetails = await fetchDetails.json();

        let detailsImage = document.querySelector(".details-shown img");
        let productName = document.querySelector(".name");
        let brandName = document.querySelector(".brand-name");
        let storage = document.querySelector(".storage");
        let displaySize = document.querySelector(".displaySize");
        let chipSet = document.querySelector(".chipSet");
        let memory = document.querySelector(".memory");
        let sensors = document.querySelector(".sensors");
        let releaseDate = document.querySelector(".releaseDate");

        detailsImage.src = allDetails.data.image;
        detailsImage.alt = allDetails.slug;
        productName.textContent = allDetails.data.name;
        brandName.textContent = "Brand: " + allDetails.data.brand;
        storage.textContent = "Storage: " + allDetails.data.mainFeatures.storage;
        displaySize.textContent = "Display Size: " + allDetails.data.mainFeatures.displaySize;
        chipSet.textContent = "Chipset: " + allDetails.data.mainFeatures.chipSet;
        memory.textContent = "Memory: " + allDetails.data.mainFeatures.memory;
        sensors.textContent = "Sensors: " + allDetails.data.mainFeatures.sensors.join(", ");
        releaseDate.textContent = allDetails.data.releaseDate;
    }
});


let closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
    let details = document.querySelector(".details-shown");
    details.style.display = "none";
});

window.onload = () => {
    originalCards();
};
