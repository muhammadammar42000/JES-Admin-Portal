import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function MapContainer(props) {
  const [address, setAddress] = useState("");
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [mapCenter, setMapCenter] = useState({
    lat: 49.2827291,
    lng: -123.1207375,
  });

  useEffect(() => {
    props.setIsClicked(false);
  }, [address]);

  const handleChange = (address) => {
    setAddress(address);
    props.setIsClicked(false);
  };

  const handleSelect = (address) => {
    setAddress(address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        // update center state
        setMapCenter(latLng);
        props.setGoogleLatLong(latLng);
        const a = address;
        props.setaddress(a);
      })
      .catch((error) => console.error("Error", error));
  };

  console.log("address +==> ", props.defaultAddress);

  useEffect(() => {
    setAddress(props.defaultAddress);
  }, []);

  return (
    <div id="googleMaps">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter Address ...",
                className: "input-google",
              })}
              style={{ color: "black" }}
            />
            <div
              className="autocomplete-dropdown-container"
              onClick={() => props.setIsClicked(true)}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { cursor: "pointer" }
                  : { cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    style={{ background: "white", padding: "5px 10px" }}
                  >
                    <span style={{ color: "#283562", cursor: "pointer" }}>
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* <Map 
          // style={{width: '20%', height: '30%'}}
        google={props.google}
        initialCenter={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }}
        center={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }}
      >
        <Marker 
          position={{
            lat: mapCenter.lat,
            lng: mapCenter.lng
          }} />
      </Map> */}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCEGEzsuyzx2xsKHdLo970rthA3b1Nkk0Q",
})(MapContainer);
