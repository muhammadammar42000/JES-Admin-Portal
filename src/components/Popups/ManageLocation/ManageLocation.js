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

export default function ManageLocation({
  locationData,
  setManageLocationModal,
  allLocation,
  allCategories,
  getChildLocationData,
}) {
  const [manageLocationData, setManageLocationData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  // const [address, setaddress] = useState("");
  // const [googleLatLong, setGoogleLatLong] = useState({});

  const handleValues = (e) => {
    setManageLocationData({
      ...manageLocationData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const updateChildLocation = async (e) => {
    e.preventDefault();

    let hasError = false;
    for (const key in manageLocationData) {
      if (!manageLocationData[key]) {
        hasError = true;
        break;
      }
    }
    if (hasError) {
      toast.error("Please Fill all the Fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        const body = {
          id: locationData.id,
          locationId: manageLocationData.locationId,
          categoryId: manageLocationData.categoryId,
          image: imageUrl ? imageUrl : locationData?.image,
          title: manageLocationData.locationTitle,
          description: manageLocationData.description,
          openingHour: manageLocationData.openingHour,
          closingHour: manageLocationData.closingHour,
          address: manageLocationData.address,
          websiteUrl: manageLocationData.website,
          phone: manageLocationData.phone,
        };
        await JESinstance.post("updateChildLocation", body);
        setManageLocationModal(false);
        getChildLocationData();
        toast.success("Location Updated successfully", {
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
        console.log(error.message);
      }
    }
  };

  console.log("==>", imageUrl);
  return (
    <div>
      <div className={"signup signup_active"}>
        <div className="signup_inner">
          <div className="bannerModal_leafTop">
            <img src={leafTop} />
          </div>

          <p className="signup_title">Manage Location</p>
          <div
            className="signup_uploadImage bg-[#999]"
            style={{
              backgroundImage: `url(${
                imageUrl ? imageUrl : locationData.image
              })`,
            }}
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
            type="text"
            placeholder="Location Title"
            defaultValue={locationData?.title}
            onChange={(e) => handleValues(e)}
          />
          <div className="signup_select">
            <label>Location</label>
            <select
              // defaultValue={"DEFAULT"}
              name="locationId"
              onChange={(e) => handleValues(e)}
              defaultValue={locationData?.locationId}
            >
              <option value="DEFAULT" disabled>
                Select Location
              </option>
              {allLocation.map((location) => (
                <option value={location?.id}>{location?.name}</option>
              ))}
            </select>
          </div>

          <div className="signup_select">
            <label>Select Category</label>
            <select
              // defaultValue={"DEFAULT"}
              name="categoryId"
              onChange={(e) => handleValues(e)}
              defaultValue={locationData?.categoryId}
            >
              <option value="DEFAULT" disabled>
                Select Category
              </option>
              {allCategories?.map((category) => (
                <option value={category?.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <label>About</label>
          <input
            name="description"
            type="text"
            placeholder="About"
            defaultValue={locationData.description}
            onChange={(e) => handleValues(e)}
          />

          <div className="signup_time">
            <div className="openingHours">
              <label>Start Time</label>
              <input
                name="openingHour"
                type="time"
                defaultValue={locationData.openingHour}
                onChange={(e) => handleValues(e)}
              />
            </div>
            <div className="closingHours">
              <label>End Time</label>
              <input
                name="closingHour"
                type="time"
                defaultValue={locationData.closingHour}
                onChange={(e) => handleValues(e)}
              />
            </div>
          </div>

          <label>Website</label>
          <input
            name="website"
            type="text"
            placeholder="Website"
            defaultValue={locationData.websiteUrl}
            onChange={(e) => handleValues(e)}
          />

          <label>Contact</label>
          <input
            name="phone"
            type="text"
            placeholder="Contact"
            defaultValue={locationData.phone}
            onChange={(e) => handleValues(e)}
          />

          <label>Address</label>
          <input
            name="address"
            type="text"
            placeholder="Address"
            defaultValue={locationData.address}
            onChange={(e) => handleValues(e)}
          />
          {/* <GoogleMap
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            setaddress={setaddress}
            setGoogleLatLong={setGoogleLatLong}
            defaultAddress={locationData.address}
          /> */}

          <div
            onClick={updateChildLocation}
            className="flex justify-center items-center mt-[20px]"
          >
            <GlobalButton btnTitle={"Save / Update"} />
          </div>

          {/* <button className="signup_submit signup_btn">Next</button> */}
          <img
            src={Cross}
            alt=""
            className="signup_close"
            onClick={() => setManageLocationModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
