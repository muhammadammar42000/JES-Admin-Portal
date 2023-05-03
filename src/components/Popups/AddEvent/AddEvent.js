import React from "react";
import Cross from "../../../assets/Web-Assets-39.png";
import leafTop from "../../../assets/Web-Assets-05.png";
import leafBottom from "../../../assets/Web-Assets-04.png";
import GlobalButton from "../../globalButton/GlobalButton";
import uploadBackgroundImg from "../../../assets/JES-Admin-Portal-Assets-88.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import JESinstance from "../../../api";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";
import GoogleMap from "../../googleMap";

export default function AddEvent({ setAddEventModal, getAllEvent }) {
  const [createEventData, setCreateEventData] = useState({
    aboutEvent: "",
    closingHour: "",
    endDate: "",
    eventName: "",
    locationId: "",
    openingHour: "",
    phone: "",
    startDate: "",
    website: "",
    address: "",
  });
  const [allLocation, setAllLocation] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [address, setaddress] = useState("");
  const [googleLatLong, setGoogleLatLong] = useState({});

  const handleValues = (e) => {
    setCreateEventData({
      ...createEventData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   setImageUrl(imageUrl);
  // };

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

  const createEvent = async (e) => {
    e.preventDefault();

    let hasError = false;
    for (const key in createEventData) {
      if (!createEventData[key]) {
        hasError = true;
        break;
      }
    }

    if (!createEventData.locationId) {
      ErrorToaster("Please select location");
    } else if (!imageUrl) {
      ErrorToaster("Please add image");
    } else if (!createEventData.eventName) {
      ErrorToaster("Please add event title");
    } else if (!createEventData.aboutEvent) {
      ErrorToaster("Please add about");
    } else if (!createEventData.openingHour) {
      ErrorToaster("Please add opening hours");
    } else if (!createEventData.closingHour) {
      ErrorToaster("Please add closing hours");
    } else if (!createEventData.address) {
      ErrorToaster("Please add address");
    }
    // else if(!createEventData.website){
    //   ErrorToaster("Please add website")
    // } else if(!createEventData.phone){
    //   ErrorToaster("Please add contact")
    // }
    else if (!createEventData.startDate) {
      ErrorToaster("Please add start date");
    } else if (!createEventData.endDate) {
      ErrorToaster("Please add end date");
    }

    // if (hasError) {
    // ErrorToaster("Please Fill all the Fields")
    // }
    else {
      try {
        const body = {
          locationId: createEventData.locationId,
          image: imageUrl,
          title: createEventData.eventName,
          description: createEventData.aboutEvent,
          openingHour: createEventData.openingHour,
          closingHour: createEventData.closingHour,
          address: createEventData.address,
          websiteUrl: createEventData.website,
          phone: createEventData.phone,
          dateFrom: createEventData.startDate,
          dateTo: createEventData.endDate,
        };
        await JESinstance.post("createEvent", body);
        setAddEventModal(false);
        getAllEvent();
        toast.success("Event Added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("Form submitted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [isValidWebsite, setIsValidWebsite] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // check if the input matches a website pattern
    const websitePattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    setIsValidWebsite(websitePattern.test(value));
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  return (
    <div>
      <div className={"signup signup_active"}>
        <div className="signup_inner">
          <div className="bannerModal_leafTop">
            <img src={leafTop} />
          </div>

          <p className="signup_title">Add Event</p>
          <div
            className="signup_uploadImage bg-[#999]"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="signup_SlideAdd">
              <input
                multiple
                accept="image/png , image/jpeg , image/webp"
                type="file"
                name="eventImage"
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
          <label>Event Title</label>
          <input
            name="eventName"
            onChange={(e) => {
              handleValues(e);
            }}
            type="text"
            placeholder="Event Title"
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
          <label>About</label>
          <input
            name="aboutEvent"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="About"
          />

          <div className="addEventDate">
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

          <div className="signup_time">
            <div className="openingHours">
              <label>Start Time</label>
              <input
                name="openingHour"
                onChange={(e) => handleValues(e)}
                type="time"
              />
            </div>
            <div className="closingHours">
              <label>End Time</label>
              <input
                name="closingHour"
                onChange={(e) => handleValues(e)}
                type="time"
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
            onClick={createEvent}
            className="flex justify-center items-center mt-[20px]"
          >
            <GlobalButton btnTitle={"Add Event"} />
          </div>

          {/* <button className="signup_submit signup_btn">Next</button> */}
          <img
            src={Cross}
            alt=""
            className="signup_close"
            onClick={() => setAddEventModal(false)}
          />

          <div className="bannerModal_leafBottom">
            <img src={leafBottom} />
          </div>
        </div>
      </div>
    </div>
  );
}
