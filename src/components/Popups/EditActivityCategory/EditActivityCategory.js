import React, { useEffect, useState } from "react";
import icon from "../../../assets/JES-Admin-Portal-Assets-41.png";
import cross from "../../../assets/Web-Assets-39.png";
import leafIcon from "../../../assets/JES-Admin-Portal-Assets-68.png";
import GlobalButton from "../../globalButton/GlobalButton";
import galleryImg from "../../../assets/JES-Admin-Portal-Assets-104.png";
import galleryImg2 from "../../../assets/JES-Admin-Portal-Assets-09.png";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";

export default function EditActivityCategory({
  updateCategoryData,
  setEditActivityCategories,
  getAllActivityCategories,
}) {
  console.log(updateCategoryData);
  const [editCategoryName, setEditCategoryName] = useState(
    updateCategoryData?.name
  );
  const [imageUrl, setImageUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleUpdateCategory = async () => {
    if (editCategoryName === "") {
      toast.error("Please fill the fields", {
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
          id: updateCategoryData.id,
          name: editCategoryName,
          image: imageUrl ? imageUrl : updateCategoryData?.image,
        };
        await JESinstance.post("updateActivitiesCategory", body);
        setEditActivityCategories(false);
        getAllActivityCategories();
        toast.success("Category Updated Successfully", {
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
    if (updateCategoryData) {
      setInputValue(updateCategoryData?.name);
    }
  }, []);

  return (
    <div>
      <div className="editActivityPopup">
        <div className="editActivityPopup_inner">
          <div className="editActivityPopup_top">
            <p className="mb-[10px]">Edit Category</p>
            <div className="editActivityPopup_LogoUploader">
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
                    src={imageUrl ? imageUrl : updateCategoryData?.image}
                    className="roundedSquare dropShadow"
                    alt="No"
                  />
                  <img src={galleryImg} className="pen" alt="..." />
                </div>
              </label>
            </div>
            <img
              onClick={() => setEditActivityCategories(false)}
              className="cross"
              src={cross}
              alt=""
            />
          </div>
          <div className="editActivityPopup_MainWrapper">
            {/* <div className="manageCategorySelect flex flex-col">
            <label>Edit Existing Category</label>
            <select defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Select Category
              </option>
            </select>
          </div> */}

            <div className="manageCategoryInput">
              <label>Edit Category</label>
              <input
                type="text"
                placeholder="Edit Category Name"
                onChange={(e) => {
                  setEditCategoryName(e.target.value.trim());
                  handleInputChange(e);
                }}
                defaultValue={updateCategoryData?.name}
                value={inputValue}
              />
              {!isValid && (
                <p style={{ color: "red" }}>
                  Input contain only alphabets of length 20.
                </p>
              )}
            </div>

            {/* <div className="editActivityPopup_inputWrapper">
            <img className="account" src={icon} alt="..." />
            <input type="text" placeholder="Account" />
          </div>
          <div className="editActivityPopup_inputWrapper">
            <img className="phone" src={icon} alt="..." />
            <input type="number" placeholder="Phone" />
          </div> */}
            {/* <div className="editActivityPopup_inputWrapper">
            <img className="email" src={icon} alt="..." />
            <input type="text" placeholder="Email" />
          </div> */}
          </div>
          <div
            onClick={handleUpdateCategory}
            className="editActivityPopup_bottom"
          >
            <GlobalButton btnTitle={"Update"} />
          </div>
        </div>
      </div>
    </div>
  );
}
