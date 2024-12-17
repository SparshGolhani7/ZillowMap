import React, { useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import jsonData from "../properties.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";



function Dashboard() {

  const[data,setData] = useState(jsonData.slice(0,10));
  const containerRef = useRef(null);
  const[wishlistItems,setWishlistItems] = useState([]);
  

  const customIcon = new Icon({
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGUAPquD0WbGnwTJaH6n6dlxCAmEyi8Z9edQ&s",
    iconSize: [14, 14],
  });

  const loadMoreData = () => {
    const currentLength = data.length;
    const moreData = jsonData.slice(currentLength, currentLength + 10);
    if (moreData.length > 0) {
      setData((prevData) => [...prevData, ...moreData]);
    }
  };

    const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      loadMoreData();
    }
  };
  

    //adding for wishlist 16 dec
    // const addToWishlist = (a)=>{
      function addToWishlist(a){

        // console.log(a,"gsgs");
         let wishlistItems = JSON.parse(localStorage.getItem("Fav-items") || '[]');
        console.log(wishlistItems);
       
    if(wishlistItems.indexOf(a)<0){
      wishlistItems.push(a);
      
      localStorage.setItem("Fav-items",JSON.stringify(wishlistItems))
   
      

    } else{
      let num = wishlistItems.indexOf(a)
      wishlistItems.splice(num,1) 
       localStorage.setItem("Fav-items",JSON.stringify(wishlistItems))
      

    }
    console.log(wishlistItems,"sparsh45")
      localStorage.setItem("Fav-items",JSON.stringify(wishlistItems))
           
    }

    

    
    

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [data]);


  return (
    <Container>
      <Row>
        <Col>
          <MapContainer center={[17.385044, 78.486671]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {jsonData.map((marker) => {
              return (
                <Marker position={marker.geocode} icon={customIcon} >
                  <Popup>
                    <div key={marker.popUp.id}>
                      <img
                        style={{ height: "289px", width: "225px" }}
                        src={marker.popUp.image}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://photos.zillowstatic.com/fp/4f2aa9d82e6d14a30fd914b17e9f580b-cc_ft_768.webp";
                        }}
                      ></img>
                      <br />
                     
                      <h4>
                        {marker.popUp.name},{marker.popUp.price},
                        
                      </h4>
                      <br />
                      <strong>
                        <u>{marker.popUp.description}</u>
                      </strong>
                      
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <h3>Price Range Filter</h3>
          <></>
        </Col>



        <Col xs={5}>
          
          <div
            ref={containerRef}
            style={{
              maxHeight: "600px", 
              overflowY: "scroll",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <Row>
              {data.map((flat) => (
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
                    <img style={{height:"30px", width:"25px"}} src={"https://www.svgrepo.com/show/447850/wishlist.svg"} 
                    onClick={()=>addToWishlist(flat.popUp.id)} ></img>
                      <br/>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

//17.385044, 78.486671
//,<Popup>{marker.popUp}</Popup>


































































