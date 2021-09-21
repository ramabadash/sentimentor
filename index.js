"use strict"
document.querySelector("button").addEventListener("click", sentimentor);

async function sentimentor (event){
    try {
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
                document.getElementById("type").style.color = "green";
                document.getElementById("polarity").style.color = "green"; 
            } else if (data.result.type === "negative"){
                document.getElementById("type").style.color = "red";
                document.getElementById("polarity").style.color = "red"; 
            } else {
                document.getElementById("type").style.color = "grey";
                document.getElementById("polarity").style.color = "grey";
            }
            document.getElementById("type").textContent = `Type: ${data.result.type}`;
            document.getElementById("polarity").textContent = `Polarity: ${data.result.polarity}`;
        }
    } catch (error) {
        document.getElementById("error").textContent = `Sorry we could not find an answer for you! try again`;
    }
}