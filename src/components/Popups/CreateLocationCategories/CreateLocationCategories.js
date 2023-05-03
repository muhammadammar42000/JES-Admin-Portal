import React, { useState } from "react";
import icon from "../../../assets/JES-Admin-Portal-Assets-41.png";
import cross from "../../../assets/Web-Assets-39.png";
import leafIcon from "../../../assets/JES-Admin-Portal-Assets-68.png";
import GlobalButton from "../../globalButton/GlobalButton";
import galleryImg from "../../../assets/JES-Admin-Portal-Assets-104.png";
import galleryImg2 from "../../../assets/JES-Admin-Portal-Assets-09.png";
import { useEffect } from "react";
import JESinstance from "../../../api";
import { toast } from "react-toastify";

export default function CreateLocationCategories({
  setCreateLocationCategories,
  getAllLocation,
  allLocationData,
}) {
  const [countryName, setCountryName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const createLocation = async () => {
    if (countryName === "") {
      toast.error("Please Fill the Field", {
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
          name: countryName,
          address: "R073 MMd",
          lat: "123-44",
          long: "123-20",
        };
        await JESinstance.post("addLocation", body);
        setCreateLocationCategories(false);
        getAllLocation();
        toast.success("Location Added Successfully", {
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

  const updateLocation = async () => {
    console.log(locationName);
    console.log(locationId);
    if (locationName === "") {
      toast.error("Please Fill the Field", {
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
          id: locationId,
          name: locationName,
        };
        await JESinstance.post("updateLocation", body);
        setCreateLocationCategories(false);
        getAllLocation();
        toast.success("Location Updated Successfully", {
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

  const handleInputChange = (event) => {
    const regex = /^[A-Za-z ]{0,20}$/;
    const inputValue = event.target.value;
    if (regex.test(inputValue)) {
      setInputValue(inputValue);
    }
    setIsValid(/^[A-Za-z ]{0,20}$/.test(inputValue));
  };

  useEffect(() => {
    if (locationName) {
      setInputValue(locationName);
    }
  }, [locationId]);
  console.log(locationName);

  return (
    <div>
      <div className="createLocationPopup">
        <div className="createLocationPopup_inner">
          <div className="createLocationPopup_top">
            <p>Create Location</p>
            <div className="createLocationPopup_LogoUploader">
              <input
                // type="file"
                name="file22"
                id="file22"
                className="uploadFile"
              />
              <label for="file22">
                <div className="updloadImgIcon">
                  {/* <img src={galleryImg2} className="logo" alt="No" />
                <img src={galleryImg} className="pen" alt="..." /> */}

                  <img src={leafIcon} class="logo" alt="No"></img>
                </div>
              </label>
            </div>
            <img
              onClick={() => setCreateLocationCategories(false)}
              className="cross"
              src={cross}
              alt=""
            />
          </div>
          <div className="createLocationPopup_MainWrapper">
            <div className="manageCategorySelect flex flex-col">
              <label>Edit Existing Category</label>
              <select
                onChange={(e) => {
                  setLocationId(e.target.value);
                  setLocationName(
                    e.target.selectedOptions[0].getAttribute("data-set")
                  );
                }}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select Category
                </option>
                {allLocationData.map((location) => (
                  <option data-set={location?.name} value={location?.id}>
                    {location?.name}
                  </option>
                ))}
              </select>
            </div>

            {locationId ? (
              <div className="manageCategoryInput">
                <label>Edit Category Name</label>
                <input
                  defaultValue={locationName}
                  onChange={(e) => {
                    setLocationName(e.target.value.trim());
                    handleInputChange(e);
                  }}
                  type="text"
                  placeholder="Update Name"
                  value={inputValue}
                />
                {!isValid && (
                  <p style={{ color: "red" }}>
                    Input contain only alphabets of length 20.
                  </p>
                )}
              </div>
            ) : (
              <div className="manageCategoryInput">
                <label>Create New Category</label>
                <input
                  onChange={(e) => {
                    setCountryName(e.target.value.trim());
                    handleInputChange(e);
                  }}
                  type="text"
                  placeholder="Enter Name"
                  value={inputValue}
                />
                {!isValid && (
                  <p style={{ color: "red" }}>
                    Input contain only alphabets of length 20.
                  </p>
                )}
              </div>
            )}

            {/* <div className="createLocationPopup_inputWrapper">
            <img className="account" src={icon} alt="..." />
            <input type="text" placeholder="Account" />
          </div>
          <div className="createLocationPopup_inputWrapper">
            <img className="phone" src={icon} alt="..." />
            <input type="number" placeholder="Phone" />
          </div> */}
            {/* <div className="createLocationPopup_inputWrapper">
            <img className="email" src={icon} alt="..." />
            <input type="text" placeholder="Email" />
          </div> */}
          </div>
          {locationId ? (
            <div
              onClick={updateLocation}
              className="createLocationPopup_bottom"
            >
              <GlobalButton btnTitle={"Edit/Update"} />
            </div>
          ) : (
            <div
              onClick={createLocation}
              className="createLocationPopup_bottom"
            >
              <GlobalButton btnTitle={"Create"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
