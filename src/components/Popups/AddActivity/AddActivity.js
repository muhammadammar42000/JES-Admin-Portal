import React, { useEffect, useState } from "react";
import Cross from "../../../assets/Web-Assets-39.png";

import GlobalButton from "../../globalButton/GlobalButton";
import uploadBackgroundImg from "../../../assets/JES-Admin-Portal-Assets-88.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";
import GoogleMap from "../../googleMap";

export default function AddActivity({
  setCreateActivityModal,
  allActivityCategories,
}) {
  const [allLocation, setAllLocation] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [address, setaddress] = useState("");
  const [googleLatLong, setGoogleLatLong] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isValidWebsite, setIsValidWebsite] = useState(true);
  const [createActivityData, setCreateActivityData] = useState({
    locationId: "",
    activityId: "",
    activityTitle: "",
    description: "",
    openingHours: "",
    closingHours: "",
    website: "",
    startDate: "",
    endDate: "",
    phone: "",
    address: "",
  });

  const handleValues = (e) => {
    setCreateActivityData({
      ...createActivityData,
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

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res.data.data);
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

  const createActivity = async (e) => {
    e.preventDefault();

    let hasError = false;
    for (const key in createActivityData) {
      if (!createActivityData[key]) {
        hasError = true;
        break;
      }
    }
    if (!createActivityData.locationId) {
      ErrorToaster("Please select location");
    } else if (!imageUrl) {
      ErrorToaster("Please add image");
    } else if (!createActivityData.activityId) {
      ErrorToaster("Please select activity type");
    } else if (!createActivityData.activityTitle) {
      ErrorToaster("Please add activity title");
    } else if (!createActivityData.openingHours) {
      ErrorToaster("Please add opening hours");
    } else if (!createActivityData.closingHours) {
      ErrorToaster("Please add closing hours");
    } else if (!createActivityData.address) {
      ErrorToaster("Please add address");
    }
    // else if(!createActivityData.website){
    //   ErrorToaster("Please add website")
    // } else if(!createActivityData.phone){
    //   ErrorToaster("Please add contact")
    // }
    else if (!createActivityData.startDate) {
      ErrorToaster("Please add start date");
    } else if (!createActivityData.endDate) {
      ErrorToaster("Please add end date");
    } else if (!createActivityData.description) {
      ErrorToaster("Please add description");
    }

    // if (hasError) {

    // }
    else {
      const body = {
        locationId: createActivityData.locationId,
        activitiesCategoryId: createActivityData.activityId,
        image: imageUrl,
        title: createActivityData.activityTitle,
        description: createActivityData.description,
        openingHour: createActivityData.openingHours,
        closingHour: createActivityData.closingHours,
        address: createActivityData.address,
        websiteUrl: createActivityData.website,
        dateFrom: createActivityData.startDate,
        dateTo: createActivityData.endDate,
        phone: createActivityData.phone,
      };
      await JESinstance.post("createActivitiesLocation", body);
      setCreateActivityModal(false);
      toast.success("Activity Added Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  return (
    <div>
      <div className={"signup signup_active"}>
        <div className="signup_inner">
          <p className="signup_title">Add Activity</p>

          <div
            className="signup_uploadImage bg-[#9999]"
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
          <label>Activity Title</label>
          <input
            name="activityTitle"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Activity Title"
          />
          <div className="signup_select">
            <label>Location</label>
            <select
              name="locationId"
              onChange={(e) => handleValues(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Select Location
              </option>
              {allLocation.map((location, index) => (
                <option value={location.id} key={index}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="signup_select">
            <label>Select Activity Type</label>
            <select
              name="activityId"
              onChange={(e) => handleValues(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Select Activity Type
              </option>
              {allActivityCategories.map((activityCaterory, index) => (
                <option value={activityCaterory.id} key={index}>
                  {activityCaterory.name}
                </option>
              ))}
            </select>
          </div>
          <label>About</label>
          <input
            name="description"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="About"
          />

          <div className="signup_time">
            <div className="openingHours">
              <label>Start Time</label>
              <input
                name="openingHours"
                onChange={(e) => handleValues(e)}
                type="time"
              />
            </div>
            <div className="closingHours">
              <label>End Time</label>
              <input
                name="closingHours"
                onChange={(e) => handleValues(e)}
                type="time"
              />
            </div>
          </div>

          <div className="addActivityDate">
            <div className="startDate">
              <label>Start Date</label>
              <input
                name="startDate"
                onChange={(e) => handleValues(e)}
                type="date"
              />
            </div>
            <div className="endDate">
              <label>End Date</label>
              <input
                name="endDate"
                onChange={(e) => handleValues(e)}
                type="date"
              />
            </div>
          </div>

          <label>Website</label>
          <input
            name="website"
            onChange={(e) => {
              handleValues(e);
              handleInputChange(e);
            }}
            type="text"
            placeholder="Website"
            value={inputValue}
          />
          {!isValidWebsite && (
            <p style={{ color: "red" }}>Please enter a valid website.</p>
          )}

          <label>Contact</label>
          <input
            name="phone"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Contact"
          />

          <label>Address</label>
          <input
            name="address"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Address"
          />
          {/* <GoogleMap
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            setaddress={setaddress}
            setGoogleLatLong={setGoogleLatLong}
          /> */}

          <div
            onClick={createActivity}
            className="flex justify-center items-center mt-[20px]"
          >
            <GlobalButton btnTitle={"Add Activity"} />
          </div>

          {/* <button className="signup_submit signup_btn">Next</button> */}
          <img
            src={Cross}
            alt=""
            className="signup_close"
            onClick={() => setCreateActivityModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
