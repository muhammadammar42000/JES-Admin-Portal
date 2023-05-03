import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import JESinstance from "../../api";
import GlobalButton from "../../components/globalButton/GlobalButton";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateLocationCategories from "../../components/Popups/CreateLocationCategories/CreateLocationCategories";
import editPenIcon from "../../assets/JES-Admin-Portal-Assets-69.png";
import EditMainLocation from "../../components/Popups/EditMainLocation/EditMainLocation";
import deleteIcon from "../../assets/vv4f58v48f54v-02.png";

const MainLocation = () => {
  const [tab, setTab] = useState("all");
  const [allLocationData, setAllLocationData] = useState([]);
  const [editMainLocationPopup, setEditMainLocationPopup] = useState(false);
  const [singleCardData, setSingleCardData] = useState([]);
  const [createLocationCategories, setCreateLocationCategories] =
    useState(false);

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocationData(res?.data?.data);
  };
  const allActiveLocations = allLocationData.filter((data) => data.isActive);
  console.log(allActiveLocations);

  const handleCheckboxChange = async (data) => {
    try {
      const body = {
        status: data.isActive === true ? false : true,
        id: data.id,
      };

      await JESinstance.post("updateLocationStatus", body);
      const msg =
        body.status === true
          ? "Location Activated Successfully"
          : "Location Blocked Successfully";
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllLocation();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelteMainLocation = async (data) => {
    console.log(data);
    try {
      const body = {
        id: data?.id,
        status: true,
      };
      await JESinstance.post("deleteLocation", body);
      toast.success("Location Deleted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllLocation();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  return (
    <div>
      <Sidebar index={10} />
      {editMainLocationPopup && (
        <EditMainLocation
          singleCardData={singleCardData}
          setEditMainLocationPopup={setEditMainLocationPopup}
          getAllLocation={getAllLocation}
        />
      )}
      {createLocationCategories && (
        <CreateLocationCategories
          setCreateLocationCategories={setCreateLocationCategories}
          getAllLocation={getAllLocation}
          allLocationData={allLocationData}
        />
      )}
      <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px]">
        <div className="flex">
          <p className="text-[#1AB650] text-[25px] font-semibold flex">
            Main Location
          </p>
          <div
            className="ml-[20px]"
            onClick={() => {
              setCreateLocationCategories(true);
            }}
          >
            <GlobalButton btnTitle={"Create Main Location"} />
          </div>
        </div>

        {/* slide Options */}

        <div className="categoryMenu_tab gap-[70px]">
          <p
            className={tab === "all" && "activate"}
            onClick={() => setTab("all")}
          >
            All
            <span className="ml-[3px]">{allLocationData.length}</span>
          </p>
          <p
            className={tab === "request" && "activate"}
            onClick={() => setTab("request")}
          >
            Active
            <span className="ml-[3px]">
              {allLocationData.filter((data) => data.isActive).length}
            </span>
          </p>
          <p
            className={tab === "rejected" && "activate"}
            onClick={() => setTab("rejected")}
          >
            Blocked
            <span className="ml-[3px]">
              {allLocationData?.filter((data) => !data.isActive)?.length}
            </span>
          </p>
        </div>
      </div>

      <div className="mainLocationSection">
        {tab == "all" && (
          <>
            {allLocationData.map((data) => (
              <div className="w-[200px] dropShadow flex p-[10px] rounded-[10px] gap-[5px] flex-col">
                <div className="flex justify-between items-end">
                  <img
                    className="w-[25px] cursor-pointer"
                    onClick={() => handleDelteMainLocation(data)}
                    src={deleteIcon}
                  />
                  <img
                    className="w-[20px] h-[20px] cursor-pointer"
                    src={editPenIcon}
                    onClick={() => {
                      setEditMainLocationPopup(true);
                      setSingleCardData(data);
                    }}
                  />
                </div>
                <div className="mainLocationIcon flex relative justify-center items-center">
                  <img
                    className="w-[70px] h-[70px] rounded-[50%] dropShadow"
                    src="data:image/png;base64,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"
                  />
                </div>
                <p className="font-semibold flex justify-center items-center">
                  {data?.name}
                </p>
                <div className="flex mt-[5px] justify-end">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={data.isActive === true ? true : false}
                      onChange={() => handleCheckboxChange(data)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              // <div>
              //   <div className="userDetailCard dropShadow flex p-[10px] rounded-[20px] gap-[20px]">
              //     <div className="w-[20%]">
              //       <div className="w-[70px] h-[70px] rounded-[50%] flex justify-center items-center mb-[20px]">
              //         <img
              //           className="w-[100%] h-[100%] rounded-[50%] object-cover"
              //           src={
              //             allUser?.image === null
              //               ? userProfileImage
              //               : allUser?.image
              //           }
              //         />
              //       </div>
              //     </div>
              //     <div className="userDetailContent w-[80%]">
              //       <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
              //         <p>{allUser.name}</p>
              //         <img
              //           onClick={() => {
              //             setUserData(allUser);
              //             setRegisteredUserModal(true);
              //           }}
              //           className="h-[10px] mr-[10px] cursor-pointer"
              //           src={leftIcon}
              //         />
              //       </div>
              //       <div className="userId text-[#777] text-[12px]">
              //         <p>{allUser.phone}</p>
              //       </div>
              //       <div className="userEmail text-[#777] text-[12px]">
              //         <p>{allUser.email}</p>
              //       </div>
              //       <div className="flex mt-[10px] justify-end">
              //         <label className="switch">
              //           <input
              //             type="checkbox"
              //             checked={allUser.isActive === true ? true : false}
              //             onChange={() => handleCheckboxChange(allUser)}
              //           />
              //           <span className="slider round"></span>
              //         </label>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </>
        )}

        {tab == "request" && (
          <>
            {allLocationData
              ?.filter((data) => data.isActive)
              ?.map((data) => (
                <div className="w-[200px] dropShadow flex p-[10px] rounded-[10px] gap-[5px] flex-col">
                  <div className="mainLocationIcon flex relative justify-center items-center">
                    <img
                      className="w-[70px] h-[70px] rounded-[50%] dropShadow"
                      src="data:image/png;base64,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"
                    />
                  </div>
                  <p className="font-semibold flex justify-center items-center">
                    {data?.name}
                  </p>
                  <div className="flex mt-[10px] justify-end">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={data.isActive === true ? true : false}
                        onChange={() => handleCheckboxChange(data)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              ))}
          </>
        )}

        {tab == "rejected" && (
          <>
            {allLocationData
              ?.filter((data) => !data.isActive)
              ?.map((data) => (
                <div className="w-[200px] dropShadow flex p-[10px] rounded-[10px] gap-[5px] flex-col">
                  <div className="mainLocationIcon flex relative justify-center items-center">
                    <img
                      className="w-[70px] h-[70px] rounded-[50%] dropShadow"
                      src="data:image/png;base64,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"
                    />
                  </div>
                  <p className="font-semibold flex justify-center items-center">
                    {data?.name}
                  </p>
                  <div className="flex mt-[10px] justify-end">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={data.isActive === true ? true : false}
                        onChange={() => handleCheckboxChange(data)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MainLocation;
