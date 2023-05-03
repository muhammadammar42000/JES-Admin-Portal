import React, { useEffect, useState } from "react";
import icon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import cross from "../../../assets/Web-Assets-39.png";
import leafIcon from "../../../assets/JES-Admin-Portal-Assets-68.png";
import GlobalButton from "../../globalButton/GlobalButton";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import uploadImage from "../../../components/upload-image";

export default function ManageCategories({
  setManageCategoriesModal,
  categoryData,
  getAllCategory,
}) {
  const [editCategory, setEditCategory] = useState(categoryData?.name);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const handleEditCategory = async () => {
    if (editCategory === "") {
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
          id: categoryData.id,
          name: editCategory,
          image: imageUrl ? imageUrl : categoryData.image,
        };
        await JESinstance.post("updateCategory", body);
        getAllCategory();
        setManageCategoriesModal(false);
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
    if (categoryData) {
      setInputValue(categoryData?.name);
    }
  }, []);

  return (
    <div>
      <div className="createCategory">
        <div className="createCategory_inner">
          <div className="createCategory_top">
            <p>Edit Category</p>
            <div className="createCategory_LogoUploader">
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
                    src={imageUrl ? imageUrl : categoryData?.image}
                    className="logo dropShadow"
                    alt="No"
                  />
                  <img src={icon} className="pen" alt="..." />
                </div>
              </label>
            </div>
            <img
              onClick={() => setManageCategoriesModal(false)}
              className="cross"
              src={cross}
              alt=""
            />
          </div>
          <div className="createCategory_MainWrapper">
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
                onChange={(e) => {
                  setEditCategory(e.target.value.trim());
                  handleInputChange(e);
                }}
                type="text"
                placeholder="Edit Category Name"
                defaultValue={categoryData?.name}
                value={inputValue}
              />
              {!isValid && (
                <p style={{ color: "red" }}>
                  Input contain only alphabets of length 20.
                </p>
              )}
            </div>

            {/* <div className="createCategory_inputWrapper">
              <img className="account" src={icon} alt="..." />
              <input type="text" placeholder="Account" />
            </div>
            <div className="createCategory_inputWrapper">
              <img className="phone" src={icon} alt="..." />
              <input type="number" placeholder="Phone" />
            </div> */}
            {/* <div className="createCategory_inputWrapper">
              <img className="email" src={icon} alt="..." />
              <input type="text" placeholder="Email" />
            </div> */}
          </div>
          <div onClick={handleEditCategory} className="createCategory_bottom">
            <GlobalButton btnTitle={"Update"} />
          </div>
        </div>
      </div>
    </div>
  );
}
