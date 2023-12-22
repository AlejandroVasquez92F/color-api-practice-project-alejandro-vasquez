import React from "react";
import { useState } from "react";

const ColorURL = "https://www.thecolorapi.com";

//creates a random hex to use when pulling a scheme from the color api
//this isn't the best algorithm, but works for the purpose of the api call.
const getRandomHex = () => {
  const randomHex = Math.floor(Math.random()*16777215).toString(16);
  return randomHex.padStart(6,"0");
}

//retrieves the color scheme from the color api
const getColors = async (hex, setColorData) => {
  try {
      const response = await fetch(`${ColorURL}/scheme?hex=${hex}`, {
          method: "GET",
          headers: {}
      });

      //console.log("response", response);

      //stores the received color data
      const data = await response.json();
      setColorData(data);

      //console.log("response", data);

      console.log(`${ColorURL}/scheme?hex=${hex}`);
  }
  catch(error) {
      console.error("Error in getColor", error);
  }
}

export default function Colors() {
  //using state to manage color data
  const [colorData, setColorData] = useState(null);

  //handles the work of what needs to happen during the button click.
  const getColorsButtonClick = () => {
    const randomHex = getRandomHex();
    console.log(randomHex);  
    getColors(randomHex, setColorData);
  };
  
  return (
    <div>
      <h1>Colors API</h1>
      {/*using onclick event listener*/}
      <button onClick={getColorsButtonClick}>Get colors from: {ColorURL}</button>

      {colorData && colorData.colors && (
        <div>
          <h2>Color Scheme Received: </h2>
          {colorData.colors.map((color, index) => (
            <div key={index}>
              <p style={{ backgroundColor: color.hex.value, padding: "5px", borderRadius: "5px", color: "#ffffff" }}>
                Name: {color.name.value} - Hex Code: {color.hex.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
