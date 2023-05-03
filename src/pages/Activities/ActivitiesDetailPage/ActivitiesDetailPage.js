import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import star from "../../../assets/JES-Admin-Portal-Assets-71.png";
import like from "../../../assets/Hand-01.png";
import location from "../../../assets/location1.png";
import locationWhiteIcon from "../../../assets/locationWhite.png";
import uploadImgIcon from "../.././../assets/JES-Admin-Portal-Assets-104.png";
import heart from "../../../assets/JES-Admin-Portal-Assets-17.png";
import back from "../../../assets/JES-Admin-Portal-Assets-71.png";
import loc from "../../../assets/JES-Admin-Portal-Assets-71.png";
import time from "../../../assets/JES-Admin-Portal-Assets-41.png";
import web from "../../../assets/JES-Admin-Portal-Assets-42.png";
import call from "../../../assets/JES-Admin-Portal-Assets-43.png";
import greenHand from "../../../assets/JES-Admin-Portal-Assets-16.png";
import slidingImg1 from "../../../assets/JES-Admin-Portal-Assets-88.png";
import uploadImgIconSlide from "../../../assets/JES-Admin-Portal-Assets-54.png";
import ImageGallery from "react-image-gallery";
import mainLocation from "../../../assets/MainLocation.png";

//

import greenloc from "../../../assets/location.png";
import SwitchButton from "../../../components/SwitchButton/SwitchButton";
import GlobalButton from "../../../components/globalButton/GlobalButton";
import UserCard from "../../../components/UserCard/UserCard";
import cross from "../../../assets/Web-Assets-39.png";

//Images
import userProfileImage from "../../../assets/userAvatar.png";
import leftIcon from "../../../assets/leftIcon.png";
import ManageActivity from "../../../components/Popups/ManageActivity/ManageActivity";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { toast } from "react-toastify";
import JESinstance from "../../../api";
import { useEffect } from "react";
import moment from "moment";
import Geocode from "react-geocode";
import uploadImage from "../../../components/upload-image";
import { useRef } from "react";

export default function ActivityDetail() {
  const [manageActivityModal, setManageActivityModal] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [allActivityCategories, setAllActivityCategories] = useState([]);
  const [imageLink, setImageLink] = useState();
  const [galleryImage, setGalleryImage] = useState();
  const [viewGallery, setViewGallery] = useState(false);
  const navigate = useNavigate();
  const getLocation = useLocation();
  const state = getLocation.state;
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("activityId");
  const [url, setUrl] = useState("");
  const [select, setSelect] = useState(1);
  const [activityLikesData, setActivityLikesData] = useState([]);
  const [activityAttendingData, setActivityAttendingData] = useState([]);

  Geocode.setApiKey("AIzaSyCEGEzsuyzx2xsKHdLo970rthA3b1Nkk0Q");
  Geocode.enableDebug();

  const getActivityById = async () => {
    const body = {
      activityLocationId: value,
    };
    const res = await JESinstance.post("getActivityById", body);
    setActivityData(res?.data?.data);
  };
  console.log(activityData);

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res?.data?.data);
  };

  const getAllActivityCategories = async () => {
    const res = await JESinstance.post("getAllCategoryOfActivities");
    setAllActivityCategories(res?.data?.data);
  };

  const updateActivityBanner = async () => {
    try {
      const body = {
        image: imageLink,
        id: value,
      };
      await JESinstance.post("updateActivityBanner", body);
      getActivityById();
      toast.success("Activity Banner Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (data) => {
    console.log(data);
    const body = {
      id: data.id,
      status: data.isActive === true ? false : true,
    };
    await JESinstance.post("updateActivityStatus", body);
    const msg =
      body.status === true
        ? "Activity is Live Now"
        : "Activity successfully hidden";
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
    getActivityById();
  };

  const updateGalleryImage = async () => {
    try {
      const body = {
        activitiesLocationId: value,
        image: galleryImage,
      };
      await JESinstance.post("addImageForActivity", body);
      getActivityById();
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigateToGoogleMap = () => {
    window.open(url, "_blank");
  };

  // Image Gallery Work
  const [images, setImages] = useState([]);
  const componentRef = useRef();
  const componentRef2 = useRef();

  useEffect(() => {
    Geocode.fromAddress(activityData?.address).then((response) => {
      setUrl(
        `https://maps.google.com/?q=${response.results[0].geometry.location.lat},${response.results[0].geometry.location.lng}`
      );
    });
  }, [activityData]);

  useEffect(() => {
    setTimeout(() => {
      const array = [];
      activityData?.activitiesGalleries.forEach((item) => {
        array.push({ ...item, thumbnail: item?.image, original: item?.image });
      });
      setImages(array);
    }, 500);
  }, [activityData]);

  const handleDeleteSliderImage = async (imageData) => {
    try {
      const body = {
        gallery: "activity",
        id: imageData.id,
      };
      await JESinstance.post("deleteGallery", body);
      toast.success("Image Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getActivityById();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllLikeActivityData = async () => {
    try {
      const body = {
        activity: "like",
        activitiesLocationId: value,
      };
      const res = await JESinstance.post("getActivitySocial", body);
      setActivityLikesData(res?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllAttendeesActivityData = async () => {
    try {
      const body = {
        activity: "join",
        activitiesLocationId: value,
      };
      const res = await JESinstance.post("getActivitySocial", body);
      setActivityAttendingData(res?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(activityAttendingData);

  useEffect(() => {
    getActivityById();
    getAllLocation();
    getAllActivityCategories();
  }, []);

  useEffect(() => {
    if (imageLink) {
      updateActivityBanner();
    }
  }, [imageLink]);

  useEffect(() => {
    if (galleryImage) {
      updateGalleryImage();
    }
  }, [galleryImage]);

  return (
    <div className="locationView">
      <Sidebar index={4} />
      {manageActivityModal && (
        <ManageActivity
          activityData={activityData}
          setManageActivityModal={setManageActivityModal}
          allLocation={allLocation}
          allActivityCategories={allActivityCategories}
          getActivityById={getActivityById}
        />
      )}

      {/* Image Gallery Popup */}
      {viewGallery && (
        <div className="imgGallery" ref={componentRef}>
          <div className="imgGallery_inner" ref={componentRef2}>
            <img
              className="imgGallery_cross w-[10px] h-[10px]"
              src={cross}
              onClick={() => setViewGallery(false)}
              alt=""
            />
            {images && (
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
              />
            )}
          </div>
        </div>
      )}
      <div className="mycontainer ml-[100px] mr-[60px]">
        <div className="locationView_main">
          <div className="locationView_left1">
            <div
              className="locationView_card"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${activityData?.image})`,
              }}
            >
              <div className="locationView_date">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={back}
                  alt=""
                />
                {/* <img className="mt-[10px]" src={uploadImgIcon} alt="" /> */}

                <input
                  accept="image/png , image/jpeg , image/webp"
                  type="file"
                  // name="file"
                  id="file"
                  class="locationView_uploadFile"
                  style={{ display: "none" }}
                  onChange={(e) => uploadImage(e, setImageLink)}
                />
                <label for="file">
                  <div className="updloadImgIcon">
                    <img
                      className="logo mt-[10px]"
                      src={uploadImgIcon}
                      alt="No"
                    />
                  </div>
                </label>
              </div>

              <img
                className="locationView_location3 rounded-[50%] cursor-pointer"
                alt="location"
                src={location}
                onClick={navigateToGoogleMap}
              />

              <div className="locationView_heart3">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={activityData?.isActive === true ? true : false}
                    onChange={() => handleCheckboxChange(activityData)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="absolute bottom-[15px] w-[100%] z-[10] pl-[30px]">
                <p className="text-[#fff] text-[18px] font-semibold tracking-wider">
                  {activityData?.title}
                </p>
                <div className=" flex">
                  <img className="h-[17px]" src={locationWhiteIcon} />
                  <p
                    onClick={navigateToGoogleMap}
                    className="text-[13px] text-[#fff] ml-[6px] cursor-pointer"
                  >
                    {activityData?.address}
                  </p>
                </div>
              </div>

              <div className="locationView_bottom"></div>
            </div>
            <p className="locationView_heading">Gallery</p>

            <div>
              <div className="locationView_sliderWrapper">
                <Swiper
                  slidesPerView={4}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    1: {
                      slidesPerView: 3,
                    },
                    400: {
                      slidesPerView: 3,
                    },
                    450: {
                      slidesPerView: 3,
                    },
                    475: {
                      slidesPerView: 3,
                    },
                    575: {
                      slidesPerView: 3,
                    },
                    775: {
                      slidesPerView: 4,
                    },
                    875: {
                      slidesPerView: 4,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                    1200: {
                      slidesPerView: 6,
                    },
                    1500: {
                      slidesPerView: 6,
                    },
                    1600: {
                      slidesPerView: 6,
                    },
                  }}
                  // modules={[Pagination]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    {" "}
                    <div className="locationView_SlideAdd w-[160px] flex justify-center items-center">
                      <input
                        multiple
                        accept="image/png , image/jpeg , image/webp"
                        type="file"
                        name="file3"
                        id="file3"
                        class="uploadFile"
                        onChange={(e) => uploadImage(e, setGalleryImage)}
                      />
                      <label for="file3">
                        <div className="updloadImgIcon">
                          <img
                            className="logo"
                            src={uploadImgIconSlide}
                            alt="No"
                          />
                        </div>
                      </label>
                    </div>
                  </SwiperSlide>
                  {activityData?.activitiesGalleries?.map((data) => (
                    <SwiperSlide>
                      <div className="locationView_sliderChild flex justify-center">
                        {" "}
                        <img
                          className="sliderImg cursor-pointer"
                          src={data?.image}
                          alt="Noo"
                          onClick={() => setViewGallery(true)}
                        />{" "}
                        <div
                          onClick={() => handleDeleteSliderImage(data)}
                          className="absolute text-[#FF0000] right-[30px] top-[-5px] cursor-pointer"
                        >
                          {/* <i class="fa-solid fa-trash"></i> */}
                          <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="locationView_right1">
            <div className="eventdetail dropShadow">
              <div
                onClick={() => setManageActivityModal(true)}
                className="flex justify-end p-[20px]"
              >
                <GlobalButton btnTitle={"Manage Activity"} />
              </div>

              <div className="selectTab w-[80%] rounded-[15px] flex justify-between items-center mx-auto bg-gradient-to-r from-[#7fb892] to-[#7fb892] text-white font-semibold px-[50px] mb-[10px] py-[15px]">
                <p
                  onClick={() => setSelect(1)}
                  className={select === 1 && "activityView_active"}
                >
                  Details
                </p>
                <p
                  onClick={() => {
                    setSelect(2);
                    getAllLikeActivityData();
                  }}
                  className={select === 2 && "activityView_active"}
                >
                  Likes
                </p>
                <p
                  onClick={() => {
                    setSelect(3);
                    getAllAttendeesActivityData();
                  }}
                  className={select === 3 && "activityView_active"}
                >
                  Attending
                </p>
              </div>

              <div className="eventdetail_mains">
                {select === 1 && (
                  <>
                    <p className="eventdetail_heading">About</p>
                    <p className="eventdetail_text">
                      {activityData?.description}
                    </p>
                    <div>
                      <div className="eventdetail_time">
                        <img src={mainLocation} alt="" />
                        <div>
                          <p className="eventdetail_name">Main Location</p>
                          <p className="eventdetail_value">
                            {activityData?.location?.name}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={time} alt="time" />
                        <div className="opening">
                          <p className="eventdetail_name">Start Time</p>
                          <p className="eventdetail_value">
                            {moment(
                              `${activityData?.openingHour}:00`,
                              "HH:mm:ss"
                            ).format("h:mm A")}
                          </p>
                        </div>
                        <div>
                          <p className="eventdetail_name">End Time</p>
                          <p className="eventdetail_value">
                            {moment(
                              `${activityData?.closingHour}:00`,
                              "HH:mm:ss"
                            ).format("h:mm A")}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={web} alt="" />
                        <div>
                          <p className="eventdetail_name">Website</p>
                          <p className="eventdetail_value">
                            {activityData?.websiteUrl}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={call} alt="" />
                        <div>
                          <p className="eventdetail_name">Contact</p>
                          <p className="eventdetail_value">
                            {activityData?.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {select === 2 && (
                  <>
                    {activityLikesData.length === 0 ? (
                      <div className="flex justify-center items-center text-[25px] text-[#999]">
                        <h1>
                          No one likes this event
                          <i class="fa-solid fa-face-sad-tear ml-[15px]"></i>
                        </h1>
                      </div>
                    ) : (
                      activityLikesData?.map((data) => (
                        <div>
                          <div className="userDetailCard_full dropShadow flex p-[10px] rounded-[10px] mt-[10px] mb-[10px]">
                            <div className="flex justify-center items-center mr-[20px]">
                              <div className="userDetailCard_logo  w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                                <img
                                  src={
                                    data?.userAuth?.image
                                      ? data?.userAuth?.image
                                      : userProfileImage
                                  }
                                  className="rounded-[50%]"
                                />
                                <img src={heart} className="heart" />
                              </div>
                              {/* <div className="w-[20px] h-[20px] absolute rounded-[50%] ">
                                   <img className="h-[20px] absolute top-[20px] left-[30px]" src={heart} />
                                 </div> */}
                            </div>
                            <div className="userDetailContent ">
                              <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                                <p>{data?.userAuth?.name}</p>
                                {/* <img
                                        onClick={() => setModal(true)}
                                        className="userDetailCard_navIcon h-[10px] mr-[10px]"
                                        src={leftIcon}
                                      /> */}
                              </div>
                              <div className="userId text-[#777] text-[12px]">
                                <p>{data?.userAuth?.phone}</p>
                              </div>
                              <div className="userEmail text-[#777] text-[12px]">
                                <p>{data?.userAuth?.email}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {select === 3 && (
                  <>
                    {activityAttendingData.length === 0 ? (
                      <div className="flex justify-center items-center text-[25px] text-[#999]">
                        <h1>
                          No one attending this event
                          <i class="fa-solid fa-face-sad-tear ml-[15px]"></i>
                        </h1>
                      </div>
                    ) : (
                      activityAttendingData?.map((data) => (
                        <div className="userDetailCard_full dropShadow flex p-[10px] rounded-[10px] mt-[10px] mb-[10px]">
                          <div className="flex justify-center items-center mr-[20px]">
                            <div className="userDetailCard_logo  w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                              <img
                                className="rounded-[50%]"
                                src={
                                  data?.userAuth?.image
                                    ? data?.userAuth?.image
                                    : userProfileImage
                                }
                              />
                              <img
                                src={select === 3 ? greenHand : heart}
                                className="heart"
                              />
                            </div>
                          </div>
                          <div className="userDetailContent ">
                            <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                              <p>{data?.userAuth?.name}</p>
                              {/* <img
                                   onClick={() => setModal(true)}
                                   className="userDetailCard_navIcon h-[10px] mr-[10px]"
                                   src={leftIcon}
                                 /> */}
                            </div>
                            <div className="userId text-[#777] text-[12px]">
                              <p>{data?.userAuth?.phone}</p>
                            </div>
                            <div className="userEmail text-[#777] text-[12px]">
                              <p>{data?.userAuth?.email}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
