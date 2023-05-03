import React from "react";
import Cross from "../../../assets/Web-Assets-39.png";

import leafTop from "../../../assets/Web-Assets-05.png";

import GlobalButton from "../../globalButton/GlobalButton";
import uploadBackgroundImg from "../../../assets/JES-Admin-Portal-Assets-88.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import JESinstance from "../../../api";
import { useState } from "react";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";
import GoogleMap from "../../googleMap";

export default function CreateLocation({
  setCreateLocationModal,
  allLocation,
  allCategories,
}) {
  const [createLocationData, setCreateLocationData] = useState({
    locationId: "",
    categoryId: "",
    locationTitle: "",
    locationAbout: "",
    openingHours: "",
    closingHours: "",
    website: "",
    contact: "",
    address: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [address, setaddress] = useState("");
  const [googleLatLong, setGoogleLatLong] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isValidWebsite, setIsValidWebsite] = useState(true);

  const handleValues = (e) => {
    setCreateLocationData({
      ...createLocationData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // check if the input matches a website pattern
    const websitePattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    setIsValidWebsite(websitePattern.test(value));
  };

  const ErrorToaster = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleAddLocation = async (e) => {
    e.preventDefault();

    let hasError = false;
    for (const key in createLocationData) {
      if (!createLocationData[key]) {
        hasError = true;
        break;
      }
    }
    if (!createLocationData.locationId) {
      ErrorToaster("Please select location");
    } else if (!createLocationData.categoryId) {
      ErrorToaster("Please select category");
    } else if (!imageUrl) {
      ErrorToaster("Please add image");
    } else if (!createLocationData.locationTitle) {
      ErrorToaster("Please add location title");
    } else if (!createLocationData.locationAbout) {
      ErrorToaster("Please add about");
    } else if (!createLocationData.openingHours) {
      ErrorToaster("Please add opening hours");
    } else if (!createLocationData.closingHours) {
      ErrorToaster("Please add closing hours");
    } else if (!createLocationData.address) {
      ErrorToaster("Please add address");
    }
    // else if(!createLocationData.website){
    //   ErrorToaster("Please add website")
    // } else if(!createLocationData.contact){
    //   ErrorToaster("Please add contact")
    // }
    // if (hasError) {
    // ErrorToaster("Please Fill all the Fields")
    // }
    else {
      try {
        const body = {
          locationId: createLocationData.locationId,
          categoryId: createLocationData.categoryId,
          image: imageUrl,
          title: createLocationData.locationTitle,
          description: createLocationData.locationAbout,
          openingHour: createLocationData.openingHours,
          closingHour: createLocationData.closingHours,
          address: createLocationData.address,
          websiteUrl: createLocationData.website,
          phone: createLocationData.contact,
        };
        await JESinstance.post("createChildLocation", body);
        setCreateLocationModal(false);
        toast.success("Location Created successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className={"signup signup_active"}>
        <div className="signup_inner">
          <div className="bannerModal_leafTop">
            <img src={leafTop} />
          </div>

          <p className="signup_title">Add Location</p>

          <div
            className="signup_uploadImage bg-[#999]"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="signup_SlideAdd">
              <input
                multiple
                accept="image/png , image/jpeg , image/webp"
                type="file"
                name="file3"
                id="file3"
                class="uploadFile"
                onChange={(e) => uploadImage(e, setImageUrl)}
              />
              <label for="file3">
                <div className="updloadImgIcon">
                  <img className="logo" src={uploadIcon} alt="No" />
                </div>
              </label>
            </div>
          </div>
          <label>Location Title</label>
          <input
            name="locationTitle"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Location Title"
          />
          <div className="signup_select">
            <label>Location</label>
            <select
              defaultValue={"DEFAULT"}
              name="locationId"
              onChange={(e) => handleValues(e)}
            >
              <option value="DEFAULT" disabled>
                Select Location
              </option>
              {allLocation.map((location) => (
                <option value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>

          <div className="signup_select">
            <label>Select Category</label>
            <select
              defaultValue={"DEFAULT"}
              name="categoryId"
              onChange={(e) => handleValues(e)}
            >
              <option value="DEFAULT" disabled>
                Select Category
              </option>
              {allCategories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <label>About</label>
          <input
            name="locationAbout"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="About"
          />

          <div className="signup_time">
            <div className="openingHours">
              <label>Start Time</label>
              <input
                type="time"
                name="openingHours"
                onChange={(e) => handleValues(e)}
              />
            </div>
            <div className="closingHours">
              <label>End Time</label>
              <input
                type="time"
                name="closingHours"
                onChange={(e) => handleValues(e)}
              />
            </div>
          </div>

          <label>Website</label>
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={(e) => {
              handleValues(e);
              handleInputChange(e);
            }}
            value={inputValue}
          />
          {!isValidWebsite && (
            <p style={{ color: "red" }}>Please enter a valid website.</p>
          )}

          <label>Contact</label>
          <input
            type="text"
            placeholder="Contact"
            name="contact"
            onChange={(e) => handleValues(e)}
          />

          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={(e) => handleValues(e)}
          />
          {/* <GoogleMap
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            setaddress={setaddress}
            setGoogleLatLong={setGoogleLatLong}
          /> */}

          <div
            onClick={handleAddLocation}
            className="flex justify-center items-center mt-[20px]"
          >
            <GlobalButton btnTitle={"Add Location"} />
          </div>

          {/* <button className="signup_submit signup_btn">Next</button> */}
          <img
            src={Cross}
            alt=""
            className="signup_close"
            onClick={() => setCreateLocationModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
