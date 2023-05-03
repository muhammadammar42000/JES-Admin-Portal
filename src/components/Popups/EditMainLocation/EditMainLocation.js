import React, { useState } from "react";
import { toast } from "react-toastify";
import JESinstance from "../../../api";
import leafIcon from "../../../assets/JES-Admin-Portal-Assets-68.png";
import cross from "../../../assets/Web-Assets-39.png";
import GlobalButton from "../../globalButton/GlobalButton";

const EditMainLocation = ({
  getAllLocation,
  singleCardData,
  setEditMainLocationPopup,
}) => {
  console.log(singleCardData);

  const [editLocation, setEditLocation] = useState(singleCardData?.name);
  const handleEditMainLocation = async () => {
    if (editLocation === "") {
      toast.error("Please fill the field", {
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
          id: singleCardData?.id,
          name: editLocation ? editLocation : singleCardData.name,
        };
        await JESinstance.post("updateLocation", body);
        setEditMainLocationPopup(false);
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

  return (
    <div className="EditMainLocation">
      <div className="EditMainLocation_inner">
        <div className="EditMainLocation_top">
          <p>Edit Main Location</p>
          <div className="EditMainLocation_LogoUploader">
            {/* <input
              type="file"
              name="file22"
              id="file22"
              className="uploadFile"
              onChange={(e) => uploadImage(e, setImageUrl)}
            /> */}
            <label for="file22">
              <div className="updloadImgIcon">
                <img src={leafIcon} className="logo" alt="No" />
                {/* <img src={icon} className="pen" alt="..." /> */}
              </div>
            </label>
          </div>
          <img
            onClick={() => setEditMainLocationPopup(false)}
            className="cross"
            src={cross}
            alt=""
          />
          <div className="manageMainLocationInput">
            <label>Edit Location</label>
            <input
              onChange={(e) => {
                setEditLocation(e.target.value.trim());
                //   handleInputChange(e);
              }}
              type="text"
              placeholder="Enter Location Name"
              defaultValue={editLocation}
            />
            {/* {!isValid && (
            <p style={{ color: "red" }}>
              Input contain only alphabets of length 20.
            </p>
          )} */}
          </div>
        </div>
        <div onClick={handleEditMainLocation} className="AddCategory_bottom">
          <GlobalButton btnTitle={"Update"} />
        </div>
      </div>
    </div>
  );
};

export default EditMainLocation;
