import React, { useEffect, useState } from "react";
import JESinstance from "../../api";
import RegisteredUserModal from "../../components/Popups/RegisteredUserPageModal/RegisteredUserModal";
import Sidebar from "../../components/Sidebar/Sidebar";
// import UserCard from "../../components/UserCard/UserCard";

//Images
import userProfileImage from "../../assets/userAvatar.png";
import leftIcon from "../../assets/leftIcon.png";
import { toast } from "react-toastify";

export default function RegisteredUsers() {
  const [registeredUserModal, setRegisteredUserModal] = useState(false);
  const [tab, setTab] = useState("all");
  const [userData, setUserData] = useState({});
  const [allUsersData, setAllUsersData] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [filterDataForAllUsers, setFilterDataForAllUsers] = useState([]);

  const getAllUsers = async () => {
    const res = await JESinstance.post("getAllUsers");
    setAllUsersData(res.data.data.allUsers);
    setActiveUsers(res.data.data.activeUers);
    setBlockedUsers(res.data.data.blockUser);
  };
  console.log(allUsersData);

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

  const handleDeleteUser = async (userData) => {
    console.log(userData);
    const body = {
      id: userData?.id,
      status: true,
    };
    await JESinstance.post("deleteUser", body);
    toast.success("User Deleted Successfully", {
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

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const searchTableData = userSearch
      ? allUsersData?.filter((item) =>
          item?.name?.toLowerCase().includes(userSearch.toLowerCase())
        )
      : allUsersData;
    setFilterDataForAllUsers(searchTableData);
  }, [userSearch, getAllUsers]);

  return (
    <div>
      <Sidebar index={6} />

      {registeredUserModal && (
        <RegisteredUserModal
          userData={userData}
          setRegisteredUserModal={setRegisteredUserModal}
          getAllUsers={getAllUsers}
        />
      )}
      <div>
        <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px]">
          <div className="text-[#1AB650] text-[25px] font-semibold flex">
            <p>Users</p>
            <div className="text-[15px] text-normal ">
              <input
                className="h-[40px] p-[10px] border-[1px] border-solid focus:outline-none border-[#1cb750] rounded-[10px] ml-[20px] dropShadow"
                placeholder="Search User by Name"
                type="search"
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
          </div>

          {/* slide Options */}

          <div className="categoryMenu_tab gap-[70px]">
            <p
              className={tab === "all" && "activate"}
              onClick={() => setTab("all")}
            >
              All
              <span className="ml-[3px]">{allUsersData.length}</span>
            </p>
            <p
              className={tab === "request" && "activate"}
              onClick={() => setTab("request")}
            >
              Active
              <span className="ml-[3px]">{activeUsers.length}</span>
            </p>
            <p
              className={tab === "rejected" && "activate"}
              onClick={() => setTab("rejected")}
            >
              Blocked
              <span className="ml-[3px]">{blockedUsers.length}</span>
            </p>
          </div>
        </div>

        <div className="userDetailCardSection ">
          {tab == "all" && (
            <>
              {filterDataForAllUsers.map((allUser) => (
                <div>
                  <div className="userDetailCard dropShadow flex p-[10px] rounded-[20px] gap-[20px]">
                    <div className="w-[20%]">
                      <div className="w-[70px] h-[70px] rounded-[50%] flex justify-center items-center mb-[20px]">
                        <img
                          className="w-[100%] h-[100%] rounded-[50%] object-cover"
                          src={
                            allUser?.image === null
                              ? userProfileImage
                              : allUser?.image
                          }
                        />
                      </div>
                    </div>
                    <div className="userDetailContent w-[80%]">
                      <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                        <p>{allUser.name}</p>
                        <img
                          onClick={() => {
                            setUserData(allUser);
                            setRegisteredUserModal(true);
                          }}
                          className="h-[10px] mr-[10px] cursor-pointer"
                          src={leftIcon}
                        />
                      </div>
                      <div className="userId text-[#777] text-[12px]">
                        <p>{allUser.phone}</p>
                      </div>
                      <div className="userEmail text-[#777] text-[12px]">
                        <p>{allUser.email}</p>
                      </div>
                      <div className="flex mt-[10px] justify-between">
                        <div
                          onClick={() => handleDeleteUser(allUser)}
                          className="deleteUser px-[10px] py-[2px] bg-[#D11A2A] text-white font-semibold rounded-[20px] cursor-pointer"
                        >
                          DELETE
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={allUser.isActive === true ? true : false}
                            onChange={() => handleCheckboxChange(allUser)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab == "request" && (
            <>
              {filterDataForAllUsers
                ?.filter((item) => item?.isActive === true)
                .map((activeUsers) => (
                  <div>
                    <div className="userDetailCard dropShadow flex p-[10px] rounded-[20px] gap-[20px]">
                      <div className="w-[20%]">
                        <div className="w-[70px] h-[70px] rounded-[50%] flex justify-center items-center mb-[20px]">
                          <img
                            className="w-[100%] h-[100%] rounded-[50%] object-cover"
                            src={
                              activeUsers?.image === null
                                ? userProfileImage
                                : activeUsers?.image
                            }
                          />
                        </div>
                      </div>
                      <div className="userDetailContent w-[80%]">
                        <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                          <p>{activeUsers.name}</p>
                          <img
                            onClick={() => {
                              setUserData(activeUsers);
                              setRegisteredUserModal(true);
                            }}
                            className="h-[10px] mr-[10px] cursor-pointer"
                            src={leftIcon}
                          />
                        </div>
                        <div className="userId text-[#777] text-[12px]">
                          <p>{activeUsers.phone}</p>
                        </div>
                        <div className="userEmail text-[#777] text-[12px]">
                          <p>{activeUsers.email}</p>
                        </div>
                        <div className="flex mt-[10px] justify-end">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={
                                activeUsers.isActive === true ? true : false
                              }
                              onChange={() => handleCheckboxChange(activeUsers)}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
          {tab == "rejected" && (
            <>
              {filterDataForAllUsers
                ?.filter((item) => item?.isActive === false)
                .map((blockedUsers) => (
                  <div>
                    <div className="userDetailCard dropShadow flex p-[10px] rounded-[20px] gap-[20px]">
                      <div className="w-[20%]">
                        <div className="w-[70px] h-[70px] rounded-[50%] flex justify-center items-center mb-[20px]">
                          <img
                            className="w-[100%] h-[100%] rounded-[50%] object-cover"
                            src={
                              blockedUsers?.image == null
                                ? userProfileImage
                                : blockedUsers?.image
                            }
                          />
                        </div>
                      </div>
                      <div className="userDetailContent w-[80%]">
                        <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                          <p>{blockedUsers.name}</p>
                          <img
                            onClick={() => {
                              setUserData(blockedUsers);
                              setRegisteredUserModal(true);
                            }}
                            className="h-[10px] mr-[10px] cursor-pointer"
                            src={leftIcon}
                          />
                        </div>
                        <div className="userId text-[#777] text-[12px]">
                          <p>{blockedUsers.phone}</p>
                        </div>
                        <div className="userEmail text-[#777] text-[12px]">
                          <p>{blockedUsers.email}</p>
                        </div>
                        <div className="flex mt-[10px] justify-end">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={
                                blockedUsers.isActive === true ? true : false
                              }
                              onChange={() =>
                                handleCheckboxChange(blockedUsers)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
