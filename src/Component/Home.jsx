import React, { useState,useEffect } from "react";
import "../App.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import jsonData1 from "../prope.json";

function Home() {
  const [value, setValue] = useState([0,150]); 
  const [filteredFlats,setFilteredFlats] = useState([]);

  useEffect(()=>{
    setFilteredFlats(jsonData1.filter((flat) => {
       return  flat.popUp.price >= value[0] && flat.popUp.price <= value[1]
    }))
  },[value])
  
  return (
    <div>
      
      <h2>Slide to get ur budget range flats</h2>
      <RangeSlider
        id="range-slider"
        min={50}
        max={1200} 
        step={1}
        value={value}
        onInput={setValue} 
      />
      <p>
        Selected Range:{value[0]} - {value[1]}
      </p>

     
      <h3>Flats in Range:</h3>
      {filteredFlats.length > 0 ? (
        <ul>
          {filteredFlats.map((flat) => {

           return (<>
            <li key={flat.popUp.id}>Price:{flat.popUp.price} Name={flat.popUp.name}</li>
            <li><img 
            src={flat.popUp.image} 
             onError={(e) => {
             e.currentTarget.src ="https://photos.zillowstatic.com/fp/4f2aa9d82e6d14a30fd914b17e9f580b-cc_ft_768.webp";
              }} 
             style={{height:"150px",width:"120px"}} 
             alt={flat.popUp.name}></img></li>
            </>)
})}
        </ul>
      ) : (
        <p>No flats available in the selected range.</p>
      )}
    </div>
  );
}

export default Home;









