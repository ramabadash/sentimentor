"use strict"
document.querySelector("button").addEventListener("click", sentimentor);

async function sentimentor (event){
    const loaderElem = document.getElementById("loader");
    const typeElem = document.getElementById("type");
    const polarityElem = document.getElementById("polarity");
    const errorElem = document.getElementById("error");
    try {
        loaderElem.style.display = "block"; //loading

        const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              text: document.getElementById("input").value,
            }),
          });
        const data = await response.json();

        //Got an answer
        if (response.ok){
            if (data.result.type === "positive") {
                typeElem.style.color = "green";
                polarityElem.style.color = "green"; 
            } else if (data.result.type === "negative"){
                typeElem.style.color = "red";
                polarityElem.style.color = "red"; 
            } else {
                typeElem.style.color = "grey";
                polarityElem.style.color = "grey";
            }
            
            loaderElem.style.display = "none"; //unloading
            //Show answer
            typeElem.textContent = `Type: ${data.result.type}`;
            polarityElem.textContent = `Polarity: ${data.result.polarity}`;
        }
    } catch (error) {
        loaderElem.style.display = "none"; //unloading
        errorElem.textContent = `Sorry we could not find an answer for you! try again`;
    }
}