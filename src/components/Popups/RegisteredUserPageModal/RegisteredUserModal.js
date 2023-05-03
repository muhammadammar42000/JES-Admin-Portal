import React, { useState } from "react";
import cross from "../../../assets/Web-Assets-39.png";
import heart from "../../../assets/JES-Admin-Portal-Assets-17.png";

import userProfileImg from "../../../assets/userAvatar.png";
import SwitchButton from "../../SwitchButton/SwitchButton";

import LocationG from "../../../assets/Web-Assets-44.png";
import leftIcon from "../../../assets/leftIcon.png";
import ReportsModal from "../ReportsModal/ReportsModal";
import { toast } from "react-toastify";
import JESinstance from "../../../api";
import { useEffect } from "react";
import moment from "moment";

export default function RegisteredUserModal({
  userData,
  setRegisteredUserModal,
  getAllUsers,
}) {
  const [select, setSelect] = useState(1);
  const [modal, setModal] = useState(false);
  const [allLocationLikes, setAllLocationLikes] = useState([]);
  const [allEventAttending, setAllEventAttending] = useState([]);
  const [allReports, setAllReports] = useState([]);

  const totalReportsLength = allReports?.reduce(
    (acc, curr) => acc + curr?.reports?.length,
    0
  );

  const handleCheckboxChange = async (data) => {
    console.log(data);
    const body = {
      status: data?.isActive === true ? false : true,
      id: data.id,
    };
    await JESinstance.post("updateUserStatus", body);
    const msg =
      body.status === true
        ? "User Activated Successfully"
        : "User Blocked Successfully";
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
    getAllUsers();
  };

  const getUserRecordLikes = async () => {
    const body = {
      userId: userData.id,
      status: "likes",
    };
    const res = await JESinstance.post("getUserRecord", body);
    setAllLocationLikes(res?.data?.data?.locationLikes);
  };

  const getUserRecordEvents = async () => {
    const body = {
      userId: userData.id,
      status: "events",
    };
    const res = await JESinstance.post("getUserRecord", body);
    setAllEventAttending(res?.data?.data?.Events);
  };

  const getUserRecordReports = async () => {
    const body = {
      userId: userData.id,
      status: "reports",
    };
    const res = await JESinstance.post("getUserRecord", body);
    setAllReports(res?.data?.data?.Reports);
  };

  console.log("like =>", allLocationLikes);
  console.log("attending ==>", allEventAttending);
  console.log("reports ==> ", allReports);

  useEffect(() => {
    getUserRecordLikes();
    getUserRecordEvents();
    getUserRecordReports();
  }, []);

  return (
    <div className="registeredUserModal">
      {modal && <ReportsModal setModal={setModal} />}
      <div className="registereUserModal_inner">
        <div className="flex justify-end">
          <img
            className="w-[20px] m-[20px] cursor-pointer"
            onClick={() => setRegisteredUserModal(false)}
            src={cross}
          />
        </div>
        <div className="registeredUserModal_body">
          <div className="flex gap-[15px]">
            <div>
              <img
                className="w-[70px] h-[70px] rounded-[50%]"
                src={userData?.image ? userData?.image : userProfileImg}
              />
            </div>
            <div>
              <p className="text-[#1AB650] font-semibold">{userData?.name}</p>
              <p className="text-[#999] leading-4 text-[13px]">
                {userData?.phone}
              </p>
              <p className="text-[#999] leading-4 text-[13px]">
                {userData?.email}
              </p>
            </div>
          </div>
          <div className="mt-[10px] pl-[20px]">
            <label className="switch">
              <input
                type="checkbox"
                checked={userData.isActive === true ? true : false}
                onChange={() => handleCheckboxChange(userData)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="selectsection flex justify-between">
            <p
              onClick={() => {
                setSelect(1);
              }}
              className={select === 1 && "whenActive"}
            >
              Location Like {allLocationLikes?.length}
            </p>
            <p
              onClick={() => setSelect(2)}
              className={select === 2 && "whenActive"}
            >
              {allEventAttending?.length} Event
            </p>
            <p
              onClick={() => setSelect(3)}
              className={select === 3 && "whenActive"}
            >
              {totalReportsLength} Report
            </p>
          </div>

          <div>
            {select === 1 && (
              <div className="newbody gap-[10px] body2">
                {allLocationLikes?.map((data) => (
                  <div>
                    <div
                      className="locationSwiper1_card"
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${data.image})`,
                      }}
                    >
                      <div className="locationSwiper1_heart">
                        <img src={heart} alt="" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="locationSwiper1_name max-w-[120px] truncate">
                        {data?.title}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <img className="w-[12px] mr-[3px]" src={LocationG} />
                      <p className="text-[#1AB650] text-[12px] max-w-[120px] truncate">
                        {data.address + "hsavdjhvasdvvsaghvdsaghsadhsabhdsahjb"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {select === 2 && (
              <div className="body2">
                {allEventAttending.map((data) => (
                  <div className="profile_eCard">
                    <div>
                      <p className="name w-[200px] truncate">{data?.title}</p>
                      <p className="loc w-[200px] truncate">
                        <img src={LocationG} alt="" /> {data?.address}
                      </p>
                    </div>
                    <div className="profile_date">
                      <p>{moment(data?.dateFrom).format("Do")}</p>
                      <div>{moment(data?.dateFrom).format("MMM")}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {select === 3 && (
              <div className="body2">
                {allReports?.map((data) => {
                  console.log("data>>>>", data?.reports);
                  return (
                    <div>
                      {data?.reports.map((arr) => {
                        return (
                          <div>
                            <div className="reportpage_card">
                              <div className="reportpage_cardleft">
                                <img src={arr.image} alt="location" />
                              </div>
                              <div className="reportpage_cardright">
                                <div className="reportpage_rightContent">
                                  <p className="date">
                                    {moment(arr?.createdAt).format(
                                      "MMM Do YYYY, h:mm a"
                                    )}
                                  </p>
                                  <p className="loc w-[110px] truncate">
                                    <img src={LocationG} alt="" />{" "}
                                    {data?.address}
                                  </p>
                                </div>
                                <p className="reportpage_name">{data.title}</p>
                                <div className="reportpage_rightContent">
                                  <p className="reportpage_location">
                                    {arr.reportTitle}
                                  </p>
                                  {/* <img src={leftIcon} /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
