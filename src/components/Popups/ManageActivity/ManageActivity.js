import React from "react";
import Cross from "../../../assets/Web-Assets-39.png";

import GlobalButton from "../../globalButton/GlobalButton";
import uploadBackgroundImg from "../../../assets/JES-Admin-Portal-Assets-88.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import JESinstance from "../../../api";
import { useState } from "react";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";
import GoogleMap from "../../googleMap";

export default function ManageActivity({
  activityData,
  setManageActivityModal,
  allLocation,
  allActivityCategories,
  getActivityById,
}) {
  const [manageActivityData, setManageActivityData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [address, setaddress] = useState("");
  const [googleLatLong, setGoogleLatLong] = useState({});

  //Start Date
  const isoDateString = activityData.dateFrom;
  const date = new Date(isoDateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const formattedStartDate = `${yyyy}-${mm}-${dd}`;

  //End Date
  const isoDateString2 = activityData.dateTo;
  const date2 = new Date(isoDateString2);
  const month2 = String(date2.getMonth() + 1).padStart(2, "0");
  const day2 = String(date2.getDate()).padStart(2, "0");
  const year2 = date2.getFullYear();
  const formattedEndDate = `${year2}-${month2}-${day2}`;

  const handleValues = (e) => {
    setManageActivityData({
      ...manageActivityData,
      [e.target.name]: e.target.value,
    });
  };

  const manageActivityLocation = async (e) => {
    e.preventDefault();

    let hasError = false;
    for (const key in manageActivityData) {
      if (!manageActivityData[key]) {
        hasError = true;
        if (!manageActivityData["website"] || !manageActivityData["phone"]) {
          hasError = false;
        }
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
      const body = {
        id: activityData.id,
        locationId: manageActivityData.locationId,
        activitiesCategoryId: manageActivityData.activityId,
        image: imageUrl ? imageUrl : activityData?.image,
        title: manageActivityData.title,
        description: manageActivityData.description,
        openingHour: manageActivityData.openingHour,
        closingHour: manageActivityData.closingHour,
        address: manageActivityData.address,
        websiteUrl: manageActivityData.website,
        dateFrom: manageActivityData.startDate,
        dateTo: manageActivityData.endDate,
        phone: manageActivityData.phone,
      };
      await JESinstance.post("updateActivityLocation", body);
      getActivityById();
      setManageActivityModal(false);
      toast.success("Activity Updated Successfully", {
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

  return (
    <div>
      <div className={"signup signup_active"}>
        <div className="signup_inner">
          <p className="signup_title">Manage Activity</p>

          <div
            className="signup_uploadImage bg-[#9999]"
            style={{
              backgroundImage: imageUrl
                ? `url(${imageUrl})`
                : `url(${activityData?.image})`,
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
          <label>Activity Title</label>
          <input
            name="title"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Activity Title"
            defaultValue={activityData.title}
          />
          <div className="signup_select">
            <label>Location</label>
            <select
              name="locationId"
              onChange={(e) => handleValues(e)}
              defaultValue={activityData?.locationId}
            >
              <option selected hidden>
                {activityData.locationName}
              </option>
              {allLocation.map((location) => (
                <option value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>

          <div className="signup_select">
            <label>Select Activity Type</label>
            <select
              name="activityId"
              onChange={(e) => handleValues(e)}
              defaultValue={activityData.activitiesCategoryId}
            >
              <option selected hidden>
                {activityData.categoryName}
              </option>
              {allActivityCategories.map((activityCategory) => (
                <option value={activityCategory.id}>
                  {activityCategory.name}
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
            defaultValue={activityData.description}
          />

          <div className="signup_time">
            <div className="openingHours">
              <label>Start Time</label>
              <input
                name="openingHour"
                onChange={(e) => handleValues(e)}
                type="time"
                defaultValue={activityData?.openingHour}
              />
            </div>
            <div className="closingHours">
              <label>End Time</label>
              <input
                name="closingHour"
                type="time"
                onChange={(e) => handleValues(e)}
                defaultValue={activityData?.closingHour}
              />
            </div>
          </div>

          <div className="manageActivityDate">
            <div className="startDate">
              <label>Start Date</label>
              <input
                name="startDate"
                onChange={(e) => handleValues(e)}
                type="date"
                defaultValue={formattedStartDate}
              />
            </div>
            <div className="endDate">
              <label>End Date</label>
              <input
                name="endDate"
                onChange={(e) => handleValues(e)}
                type="date"
                defaultValue={formattedEndDate}
              />
            </div>
          </div>

          <label>Website</label>
          <input
            name="website"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Website"
            defaultValue={activityData.websiteUrl}
          />

          <label>Contact</label>
          <input
            name="phone"
            onChange={(e) => handleValues(e)}
            type="number"
            placeholder="Contact"
            defaultValue={activityData.phone}
          />

          <label>Address</label>
          <input
            name="address"
            onChange={(e) => handleValues(e)}
            type="text"
            placeholder="Address"
            defaultValue={activityData.address}
          />
          {/* <GoogleMap
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            setaddress={setaddress}
            setGoogleLatLong={setGoogleLatLong}
            defaultAddress={activityData.address}
          /> */}

          <div
            onClick={manageActivityLocation}
            className="flex justify-center items-center mt-[20px]"
          >
            <GlobalButton btnTitle={"Save / Update"} />
          </div>

          {/* <button className="signup_submit signup_btn">Next</button> */}
          <img
            src={Cross}
            alt=""
            className="signup_close"
            onClick={() => setManageActivityModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
