import React, { useState } from "react";
import icon from "../../../assets/JES-Admin-Portal-Assets-41.png";
import cross from "../../../assets/Web-Assets-39.png";
import leafIcon from "../../../assets/JES-Admin-Portal-Assets-68.png";
import GlobalButton from "../../globalButton/GlobalButton";
import galleryImg from "../../../assets/JES-Admin-Portal-Assets-104.png";
import galleryImg2 from "../../../assets/JES-Admin-Portal-Assets-09.png";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";

export default function CreateActivityCategories({
  setCreateActivityCategories,
  getAllActivityCategories,
}) {
  const [activityCategoryName, setActivityCategoryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isValid, setIsValid] = useState(true);

  const createActivityCategory = async () => {
    if (activityCategoryName === "" || imageUrl === "") {
      toast.error("Please fill the field and Select Icon", {
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
          name: activityCategoryName,
          image: imageUrl,
        };
        await JESinstance.post("createActivitiesCategory", body);
        setCreateActivityCategories(false);
        toast.success("Category Added Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getAllActivityCategories();
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

  return (
    <div>
      <div className="createActivityPopup">
        <div className="createActivityPopup_inner">
          <div className="createActivityPopup_top">
            <p className="mb-[10px]">Add New Category</p>
            <div className="createActivityPopup_LogoUploader">
              <input
                type="file"
                name="file22"
                id="file22"
                className="uploadFile"
                onChange={(e) => uploadImage(e, setImageUrl)}
              />
              <label for="file22">
                <div className="updloadImgIcon">
                  <img
                    src={imageUrl ? imageUrl : galleryImg2}
                    className="roundedSquare dropShadow"
                    alt="No"
                  />
                  <img src={galleryImg} className="pen" alt="..." />
                </div>
              </label>
            </div>
            <img
              onClick={() => setCreateActivityCategories(false)}
              className="cross"
              src={cross}
              alt=""
            />
          </div>
          <div className="createActivityPopup_MainWrapper">
            {/* <div className="manageCategorySelect flex flex-col">
            <label>Edit Existing Category</label>
            <select defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Select Category
              </option>
            </select>
          </div> */}

            <div className="manageCategoryInput">
              <label>Create Category</label>
              <input
                onChange={(e) => {
                  setActivityCategoryName(e.target.value.trim());
                  handleInputChange(e);
                }}
                type="text"
                placeholder="Enter Category Name"
                value={inputValue}
              />
              {!isValid && (
                <p style={{ color: "red" }}>
                  Input contain only alphabets of length 20.
                </p>
              )}
            </div>

            {/* <div className="createActivityPopup_inputWrapper">
            <img className="account" src={icon} alt="..." />
            <input type="text" placeholder="Account" />
          </div>
          <div className="createActivityPopup_inputWrapper">
            <img className="phone" src={icon} alt="..." />
            <input type="number" placeholder="Phone" />
          </div> */}
            {/* <div className="createActivityPopup_inputWrapper">
            <img className="email" src={icon} alt="..." />
            <input type="text" placeholder="Email" />
          </div> */}
          </div>
          <div
            onClick={createActivityCategory}
            className="createActivityPopup_bottom"
          >
            <GlobalButton btnTitle={"Create"} />
          </div>
        </div>
      </div>
    </div>
  );
}
