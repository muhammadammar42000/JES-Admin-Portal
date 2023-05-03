import React, { useState } from "react";
import Cross from "../../../assets/Web-Assets-39.png";

import leafTop from "../../../assets/Web-Assets-05.png";
import GlobalButton from "../../globalButton/GlobalButton";
import uploadBackgroundImg from "../../../assets/JES-Admin-Portal-Assets-88.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";
import GoogleMap from "../../googleMap";

export default function ManageEvent({
  allLocation,
  eventData,
  setManageEventModal,
  getEventDatabyId,
}) {
  console.log(eventData);

  //Start Date
  const isoDateString = eventData.dateFrom;
  const date = new Date(isoDateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const formattedStartDate = `${yyyy}-${mm}-${dd}`;

  //End Date
  const isoDateString2 = eventData.dateTo;
  const date2 = new Date(isoDateString2);
  const month2 = String(date2.getMonth() + 1).padStart(2, "0");
  const day2 = String(date2.getDate()).padStart(2, "0");
  const year2 = date2.getFullYear();
  const formattedEndDate = `${year2}-${month2}-${day2}`;

  const [manageEventData, setManageEventData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  // const [isClicked, setIsClicked] = useState(false);
  // const [address, setaddress] = useState("");
  // const [googleLatLong, setGoogleLatLong] = useState({});

  const handleValues = (e) => {
    setManageEventData({
      ...manageEventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    let hasError = false;
    for (const key in manageEventData) {
      if (!manageEventData[key]) {
        hasError = true;
        if (!manageEventData["website"] || !manageEventData["phone"]) {
          hasError = false;
        }
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
          id: eventData.id,
          locationId: manageEventData.locationId,
          image: imageUrl ? imageUrl : eventData.image,
          title: manageEventData.eventName,
          description: manageEventData.aboutEvent,
          openingHour: manageEventData.openingHours,
          closingHour: manageEventData.closingHours,
          address: manageEventData.address,
          websiteUrl: manageEventData.website,
          phone: manageEventData.phone,
          dateFrom: manageEventData.startDate,
          dateTo: manageEventData.endDate,
        };
        await JESinstance.post("updateEvent", body);
        setManageEventModal(false);
        getEventDatabyId();
        toast.success("Event Updated successfully", {
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
      <div className={"manageEvnet manageEvnet_active"}>
        <div className="manageEvnet_inner">
          <div className="bannerModal_leafTop">
            <img src={leafTop} />
          </div>

          <p className="manageEvnet_title">Manage Event</p>

          <div
            className="manageEvnet_uploadImage bg-[#9999]"
            style={{
              backgroundImage: imageUrl
                ? `url(${imageUrl})`
                : `url(${eventData.image})`,
            }}
          >
            <div className="manageEvnet_SlideAdd">
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
          <label>Event Title</label>
          <input
            name="eventName"
            onChange={(e) => handleValues(e)}
            defaultValue={eventData?.title}
            type="text"
            placeholder="Event Title"
          />
          <div className="manageEvnet_select">
            <label>Location</label>
            <select
              name="locationId"
              onChange={(e) => handleValues(e)}
              defaultValue={eventData?.name}
            >
              <option value="DEFAULT" disabled>
                Select Location
              </option>
              {allLocation.map((location) => (
                <option value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <label>About</label>
          <input
            name="aboutEvent"
            onChange={(e) => handleValues(e)}
            defaultValue={eventData?.description}
            type="text"
            placeholder="About"
          />

          <div className="manageEventDate">
            <div className="startDate">
              <label>Start Date</label>
              <input
                name="startDate"
                defaultValue={formattedStartDate}
                onChange={(e) => {
                  handleValues(e);
                  console.log(e.target.value);
                }}
                type="date"
              />
            </div>
            <div className="endDate">
              <label>End Date</label>
              <input
                name="endDate"
                defaultValue={formattedEndDate}
                onChange={(e) => handleValues(e)}
                type="date"
              />
            </div>
          </div>

          <div className="manageEvnet_time">
            <div className="openingHours">
              <label>Start Time</label>
              <input
                name="openingHours"
                onChange={(e) => handleValues(e)}
                defaultValue={eventData?.openingHour}
                type="time"
              />
            </div>
            <div className="closingHours">
              <label>End Time</label>
              <input
                name="closingHours"
                onChange={(e) => handleValues(e)}
                defaultValue={eventData?.closingHour}
                type="time"
              />
            </div>
          </div>

          <label>Website</label>
          <input
            name="website"
            onChange={(e) => handleValues(e)}
            defaultValue={eventData?.websiteUrl}
            type="text"
            placeholder="Website"
          />

          <label>Contact</label>
          <input
            name="phone"
            onChange={(e) => handleValues(e)}
            defaultValue={eventData?.phone}
            type="number"
            placeholder="Contact"
          />

          <label>Address</label>
          <input
            name="address"
            onChange={(e) => handleValues(e)}
            defaultValue={eventData?.address}
            type="text"
            placeholder="Address"
          />
          {/* <GoogleMap
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            setaddress={setaddress}
            setGoogleLatLong={setGoogleLatLong}
            defaultAddress={eventData.address}
          /> */}

          <div
            onClick={handleUpdateEvent}
            className="flex justify-center items-center mt-[20px]"
          >
            <GlobalButton btnTitle={"Save / Update"} />
          </div>

          {/* <button className="manageEvnet_submit manageEvnet_btn">Next</button> */}
          <img
            src={Cross}
            alt=""
            className="manageEvnet_close"
            onClick={() => setManageEventModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
