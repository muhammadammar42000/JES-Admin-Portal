import React, { useState } from "react";

import leafTop from "../../../assets/Web-Assets-05.png";
import leafBottom from "../../../assets/Web-Assets-04.png";
import cross from "../../../assets/Web-Assets-39.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import GlobalButton from "../../globalButton/GlobalButton";
import { toast } from "react-toastify";
import JESinstance from "../../../api";
import uploadImage from "../../../components/upload-image";

export default function EditBannerModal({
  getAllBannerImages,
  setEditBannerModal,
  bannerData,
}) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpdate = async () => {
    if (imageUrl === null) {
      toast.error("Please add the Image first", {
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
        id: bannerData.id,
        image: imageUrl,
      };
      await JESinstance.post("updateBanner", body);
      toast.success("Banner Image Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEditBannerModal(false);
      getAllBannerImages();
    }
  };

  return (
    <div className="bannerModal">
      <div className="bannerModal_inner">
        <div className="bannerModal_leafTop">
          <img src={leafTop} />
        </div>

        <div className="flex justify-end">
          <img
            onClick={() => setEditBannerModal(false)}
            className="w-[20px] mx-[20px] mt-[15px] cursor-pointer z-10"
            src={cross}
          />
        </div>

        <div className="px-[30px]">
          <p className="text-[#1AB650] font-semibold text-[24px]">
            Edit Banner
          </p>
        </div>

        <div
          style={{
            backgroundImage: `url(${imageUrl ? imageUrl : bannerData?.image})`,
          }}
          className="bannerImgUploadBackground"
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

        <div
          onClick={handleUpdate}
          className="flex justify-center items-center"
        >
          <GlobalButton btnTitle="Save / Update" />
        </div>

        <div className="bannerModal_leafBottom">
          <img src={leafBottom} />
        </div>
      </div>
    </div>
  );
}
