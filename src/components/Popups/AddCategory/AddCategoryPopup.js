import React, { useState } from "react";
import icon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import cross from "../../../assets/Web-Assets-39.png";
import leafIcon from "../../../assets/JES-Admin-Portal-Assets-68.png";
import GlobalButton from "../../globalButton/GlobalButton";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";

export default function AddCategoryPopup({
  setAddCategoriesModal,
  getAllCategory,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddCategory = async () => {
    if (!categoryName) {
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
          name: categoryName,
          image: imageUrl
            ? imageUrl
            : "https://jes-bucket.s3.ap-south-1.amazonaws.com/3/7/2023190126/JES-Admin-Portal-Assets-68.png",
        };
        const res = await JESinstance.post("createCategory", body);
        setAddCategoriesModal(false);
        getAllCategory();
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
      } catch (error) {
        console.log(error);
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
      <div className="AddCategory">
        <div className="AddCategory_inner">
          <div className="AddCategory_top">
            <p>Add Category</p>
            <div className="AddCategory_LogoUploader">
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
                    src={imageUrl ? imageUrl : leafIcon}
                    className="logo"
                    alt="No"
                  />
                  <img src={icon} className="pen" alt="..." />
                </div>
              </label>
            </div>
            <img
              onClick={() => setAddCategoriesModal(false)}
              className="cross"
              src={cross}
              alt=""
            />
          </div>
          <div className="AddCategory_MainWrapper">
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
                  setCategoryName(e.target.value.trim());
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

            {/* <div className="AddCategory_inputWrapper">
              <img className="account" src={icon} alt="..." />
              <input type="text" placeholder="Account" />
            </div>
            <div className="AddCategory_inputWrapper">
              <img className="phone" src={icon} alt="..." />
              <input type="number" placeholder="Phone" />
            </div> */}
            {/* <div className="AddCategory_inputWrapper">
              <img className="email" src={icon} alt="..." />
              <input type="text" placeholder="Email" />
            </div> */}
          </div>
          <div onClick={handleAddCategory} className="AddCategory_bottom">
            <GlobalButton btnTitle={"Create"} />
          </div>
        </div>
      </div>
    </div>
  );
}
