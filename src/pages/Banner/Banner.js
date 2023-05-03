import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import GlobalButton from "../../components/globalButton/GlobalButton";
import tableBannerImage from "../../assets/JES-Admin-Portal-Assets-88.png";
import editPenIcon from "../../assets/vv4f58v48f54v-01.png";
import deleteButtonIcon from "../../assets/vv4f58v48f54v-02.png";
import BannerModal from "../../components/Popups/BannerModal/BannerModal";
import EditBannerModal from "../../components/Popups/EditBannerModal/EditBannerModal";
import DeleteBannerModal from "../../components/Popups/DeleteBannerModal/DeleteBannerModal";
import JESinstance from "../../api";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Banner() {
  const [bannerArray, setBannerArray] = useState([]);
  const [bannerModal, setBannerModal] = useState(false);
  const [editBannerModal, setEditBannerModal] = useState(false);
  const [deleteBannerModal, setDeleteBannerModal] = useState(false);
  const [bannerData, setBannerData] = useState([]);

  const getAllBannerImages = async () => {
    const res = await JESinstance.post("getAllBanner");
    setBannerArray(res.data.data);
  };

  const handleCheckboxChange = async (data) => {
    if (data.isActive === true) {
      const body = {
        status: (data.isActive = false),
        id: data.id,
        banner: "edit",
      };
      await JESinstance.post("updateBannerStatus", body);
      getAllBannerImages();

      toast.success("Banner Hidden Successfully", {
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
        status: (data.isActive = true),
        id: data.id,
        banner: "edit",
      };
      await JESinstance.post("updateBannerStatus", body);
      getAllBannerImages();
      toast.success("Banner Shown Successfully", {
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

  useEffect(() => {
    getAllBannerImages();
  }, []);

  return (
    <div>
      <div>
        <Sidebar index={7} />

        {deleteBannerModal && (
          <DeleteBannerModal
            setDeleteBannerModal={setDeleteBannerModal}
            bannerData={bannerData}
            getAllBannerImages={getAllBannerImages}
          />
        )}

        {bannerModal && (
          <BannerModal
            bannerArray={bannerArray}
            setBannerArray={setBannerArray}
            setBannerModal={setBannerModal}
            setBannerData={setBannerData}
            getAllBannerImages={getAllBannerImages}
          />
        )}
        {editBannerModal && (
          <EditBannerModal
            bannerData={bannerData}
            setEditBannerModal={setEditBannerModal}
            getAllBannerImages={getAllBannerImages}
          />
        )}

        <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px]">
          <div className="text-[#1AB650] text-[25px] font-semibold">
            <p>Banner</p>
          </div>
          <div
            onClick={() => setBannerModal(true)}
            className="text-[15px] flex"
          >
            <GlobalButton btnTitle={"Add Banner"} />
          </div>
        </div>

        <div className="bannerContentSection w-[80%] mt-[60px] m-auto">
          <table id="customers">
            <tr>
              <th>ID</th>
              <th>Banner Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            {bannerArray?.map((item, i) => (
              <tr>
                <td>
                  <p className="">0{i + 1}</p>
                </td>
                <td>
                  <img
                    className="w-[300px] object-cover h-[100px] rounded-[10px]"
                    src={item.image}
                  />
                </td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.isActive === true ? true : false}
                      onClick={() => handleCheckboxChange(item)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <div className="flex gap-[10px]">
                    <img
                      onClick={() => {
                        setEditBannerModal(true);
                        setBannerData(item);
                      }}
                      className="w-[40px] cursor-pointer hover:scale-105"
                      src={editPenIcon}
                    />
                    <img
                      onClick={() => {
                        setDeleteBannerModal(true);
                        setBannerData(item);
                      }}
                      className="w-[40px] cursor-pointer hover:scale-105"
                      src={deleteButtonIcon}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
