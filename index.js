"use strict"
document.querySelector("button").addEventListener("click", sentimentor);

async function sentimentor (event){
    const loaderElem = document.getElementById("loader");
    const typeElem = document.getElementById("type");
    const polarityElem = document.getElementById("polarity");
    const errorElem = document.getElementById("error");
    resetLayout (typeElem, polarityElem, errorElem);

    try {
        loaderElem.style.display = "block"; //diaplay loading

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
        catImg (response.status); //Show cat status

        const data = await response.json();

        //Got an answer
        if (response.ok) {
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
//display "cat status"
async function catImg (status) {
    const statusElem = document.getElementById("status");
    const catImgElem = document.getElementById("catImg");

    statusElem.textContent = `Status: ${status}`;
    catImgElem.style.display = "block";
    catImgElem.src = `https://http.cat/${status}`;
}

function resetLayout (typeElem, polarityElem, errorElem) {
    typeElem.textContent = "";
    polarityElem.textContent = "";
    errorElem.textContent = "";
    document.getElementById("status").textContent = "";
    document.getElementById("catImg").style.display = "none";
}