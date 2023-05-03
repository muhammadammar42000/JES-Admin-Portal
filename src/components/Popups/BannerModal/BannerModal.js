import React, { useState } from "react";

import leafTop from "../../../assets/Web-Assets-05.png";
import leafBottom from "../../../assets/Web-Assets-04.png";
import cross from "../../../assets/Web-Assets-39.png";
import uploadIcon from "../../../assets/JES-Admin-Portal-Assets-104.png";
import GlobalButton from "../../globalButton/GlobalButton";
import { toast } from "react-toastify";
import JESinstance from "../../../api/index";
import uploadImage from "../../../components/upload-image";

export default function BannerModal({
  bannerArray,
  setBannerModal,
  setBannerData,
  getAllBannerImages,
}) {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (imageUrl === "") {
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
        // image: imageUrl,
        image: imageUrl,
      };
      const res = await JESinstance.post("addBanner", body);
      setBannerData(res);
      bannerArray.push(`${imageUrl}`);
      setBannerModal(false);
      getAllBannerImages();
      toast.success("Banner Added Successfully", {
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
    <div className="bannerModal">
      <div className="bannerModal_inner">
        <div className="bannerModal_leafTop">
          <img src={leafTop} />
        </div>

        <div className="flex justify-end">
          <img
            onClick={() => setBannerModal(false)}
            className="w-[20px] mx-[20px] mt-[15px] cursor-pointer z-10"
            src={cross}
          />
        </div>

        <div className="px-[30px]">
          <p className="text-[#1AB650] font-semibold text-[24px]">Add Banner</p>
        </div>

        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
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
          className="flex justify-center items-center"
          onClick={handleUpload}
        >
          <GlobalButton btnTitle="Upload" />
        </div>

        <div className="bannerModal_leafBottom">
          <img src={leafBottom} />
        </div>
      </div>
    </div>
  );
}
