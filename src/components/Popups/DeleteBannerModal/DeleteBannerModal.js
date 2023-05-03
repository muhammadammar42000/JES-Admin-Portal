import React from "react";
import { toast } from "react-toastify";
import JESinstance from "../../../api";
import deleteIcon from "../../../assets/delete-button.png";

export default function DeleteBannerModal({
  setDeleteBannerModal,
  bannerData,
  getAllBannerImages,
}) {
  console.log(bannerData);

  const handleSubmit = async () => {
    try {
      const body = {
        banner: "delete",
        id: bannerData?.id,
        status: true,
      };
      await JESinstance.post("updateBannerStatus", body);
      toast.success("Banner Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDeleteBannerModal(false);
      getAllBannerImages();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="deleteBanner">
      <div className="deleteBanner_inner">
        <div className="flex justify-center items-center flex-col">
          <div className="mt-[20px]">
            <img className="w-[60px]" src={deleteIcon} />
          </div>

          <div className="mt-[10px] font-semibold text-[#777]">
            <p>Are You Sure Want to Delete?</p>
          </div>

          <div className="mt-[10px]">
            <button onClick={() => setDeleteBannerModal(false)} className="no">
              No
            </button>
            <button onClick={handleSubmit} className="yes">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
