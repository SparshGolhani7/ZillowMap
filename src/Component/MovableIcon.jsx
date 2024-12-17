
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import jsonData from "../properties.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

function MovableIcon() {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [currentPosition, setCurrentPosition] = useState(jsonData[0].geocode); 

 // Icon for the bike
  const bikeIcon = new Icon({
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzqd8DXW_S1NNIuVNNR4GAFKLhlWBsgt59g&s", // Bike icon URL
    iconSize: [32, 32],
  });

  
  const customIcon = new Icon({
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGUAPquD0WbGnwTJaH6n6dlxCAmEyi8Z9edQ&s",
    iconSize: [24, 24],
  });


  const interpolatePosition = (start, end, t) => {
    const lat = start[0] + t * (end[0] - start[0]);
    const lng = start[1] + t * (end[1] - start[1]);
    return [lat, lng];
  };

  useEffect(() => {
    let interval;
    const duration = 15000; 
    const steps = 100; 
    const stepDuration = duration / steps; 

    const start = jsonData[currentIndex].geocode; 
    const end = jsonData[(currentIndex + 1) % jsonData.length].geocode; 

    let currentStep = 0;

  
    interval = setInterval(() => {
      if (currentStep <= steps) {
        const t = currentStep / steps; 
        const newPosition = interpolatePosition(start, end, t);
        setCurrentPosition(newPosition); 
        currentStep++;
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % jsonData.length); 
        clearInterval(interval); 
      }
    }, stepDuration);
    return () => clearInterval(interval); 
  }, [currentIndex]);

  return (
    <Container>
      <Row>
        <Col>
          {/* Map Section */}
          <MapContainer center={[17.385044, 78.486671]} zoom={13} style={{ height: "600px" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

        
            <Polyline
              positions={[
                jsonData[currentIndex].geocode,
                jsonData[(currentIndex + 1) % jsonData.length].geocode,
              ]}
              color="blue"
            />

            {/* Moving bike marker */}
            <Marker position={currentPosition} icon={bikeIcon} draggable={true}>
              <Popup>
                <div>
                  <h4>Moving Bike</h4>
                  <p>
                    From: {jsonData[currentIndex].popUp.name} <br />
                    To: {jsonData[(currentIndex + 1) % jsonData.length].popUp.name}
                  </p>
                </div>
              </Popup>
            </Marker>

            {jsonData.map((marker) => (
              <Marker position={marker.geocode} key={marker.popUp.id} icon={customIcon}>
                <Popup>
                  <div>
                    <h4>{marker.popUp.name}</h4>
                    <p>{marker.popUp.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Col>

        {/* <Col xs={5}>
          <div
            style={{
              maxHeight: "600px", 
              overflowY: "scroll",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <Row>
              {jsonData.map((flat) => (
                <Col xs={6} key={flat.popUp.id}>
                  <div>
                    <img
                      style={{ height: "289px", width: "225px" }}
                      src={flat.popUp.image}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://photos.zillowstatic.com/fp/4f2aa9d82e6d14a30fd914b17e9f580b-cc_ft_768.webp";
                      }}
                      alt={flat.popUp.name}
                    />
                    <br />
                    <h4>
                      {flat.popUp.name}, {flat.popUp.price}
                    </h4>
                    <br />
                    <strong>
                      <u>{flat.popUp.description}</u>
                    </strong>
                    <hr />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col> */}
      </Row>
    </Container>
  );
}

export default MovableIcon;