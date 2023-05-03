import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import like from "../../../assets/Hand-01.png";
import mainLocation from "../../../assets/MainLocation.png";
import uploadImgIcon from "../.././../assets/JES-Admin-Portal-Assets-104.png";
import heart from "../../../assets/JES-Admin-Portal-Assets-17.png";
import back from "../../../assets/JES-Admin-Portal-Assets-71.png";
import time from "../../../assets/JES-Admin-Portal-Assets-41.png";
import web from "../../../assets/JES-Admin-Portal-Assets-42.png";
import call from "../../../assets/JES-Admin-Portal-Assets-43.png";
import greenHand from "../../../assets/JES-Admin-Portal-Assets-16.png";
import uploadImgIconSlide from "../../../assets/JES-Admin-Portal-Assets-54.png";
import location from "../../../assets/location1.png";
import slidingImg1 from "../../../assets/JES-Admin-Portal-Assets-88.png";
import cross from "../../../assets/Web-Assets-39.png";
import greenloc from "../../../assets/location.png";
import SwitchButton from "../../../components/SwitchButton/SwitchButton";
import GlobalButton from "../../../components/globalButton/GlobalButton";
import userProfileImage from "../../../assets/JES-Admin-Portal-Assets-12.png";
import leftIcon from "../../../assets/leftIcon.png";
import ManageEvent from "../../../components/Popups/ManageEvent/ManageEvent";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ReportsModal from "../../../components/Popups/ReportsModal/ReportsModal";
import JESinstance from "../../../api";
import { toast } from "react-toastify";
import moment from "moment";
import uploadImage from "../../../components/upload-image";
import ImageGallery from "react-image-gallery";
import Geocode from "react-geocode";
// import Clickoutside from "../Clickoutside";

export default function EventDetail() {
  const [select, setSelect] = useState(1);
  const [manageEventModal, setManageEventModal] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const getLocation = useLocation();
  const state = getLocation.state;
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("eventId");
  const [eventData, setEventData] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [eventLikesData, setEventLikesData] = useState([]);
  const [eventAttendeesData, setEventAttendeesData] = useState([]);
  const [imageLink, setImageLink] = useState();
  const [galleryImage, setGalleryImage] = useState();
  const [viewGallery, setViewGallery] = useState(false);
  const [url, setUrl] = useState("");
  Geocode.setApiKey("AIzaSyCEGEzsuyzx2xsKHdLo970rthA3b1Nkk0Q");
  Geocode.enableDebug();

  const getEventDatabyId = async () => {
    const body = {
      eventId: value,
    };
    const res = await JESinstance.post("getEventById", body);
    setEventData(res.data.data);
  };

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res.data.data);
  };

  const getAllLikesEvent = async () => {
    const body = {
      event: "like",
      eventId: eventData.id,
    };
    const res = await JESinstance.post("getEventSocial", body);
    setEventLikesData(res.data.data);
  };

  const getAllAttendees = async () => {
    const body = {
      event: "attendees",
      eventId: eventData.id,
    };
    const res = await JESinstance.post("getEventSocial", body);
    setEventAttendeesData(res.data.data);
  };

  const handleCheckboxChange = async (data) => {
    const body = {
      status: data.isActive === true ? false : true,
      id: data.id,
    };
    await JESinstance.post("updateEventStatus", body);
    const msg =
      body.status === false
        ? "This category is successfully hidden"
        : "This category is active now";
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    getEventDatabyId();
  };

  const updateEventBanner = async () => {
    try {
      const body = {
        image: imageLink,
        id: value,
      };
      await JESinstance.post("updateEventBanner", body);
      getEventDatabyId();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateGalleryImage = async () => {
    try {
      const body = {
        eventId: value,
        image: galleryImage,
      };
      await JESinstance.post("addImageForEvent", body);
      getEventDatabyId();
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(eventData);

  const navigateToGoogleMap = () => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    getEventDatabyId();
    getAllLocation();
  }, []);

  useEffect(() => {
    if (galleryImage) {
      updateGalleryImage();
    }
  }, [galleryImage]);

  useEffect(() => {
    if (imageLink) {
      updateEventBanner();
    }
  }, [imageLink]);

  useEffect(() => {
    Geocode.fromAddress(eventData?.address).then((response) => {
      setUrl(
        `https://maps.google.com/?q=${response.results[0].geometry.location.lat},${response.results[0].geometry.location.lng}`
      );
    });
  }, [eventData]);

  // Image Gallery Work
  const [images, setImages] = useState([]);
  const componentRef = useRef();
  const componentRef2 = useRef();
  useEffect(() => {
    setTimeout(() => {
      const array = [];
      eventData?.eventGalleries.forEach((item) => {
        array.push({ ...item, thumbnail: item?.image, original: item?.image });
      });
      setImages(array);
    }, 500);
  }, [eventData]);

  const handleDeleteSliderImage = async (imageData) => {
    try {
      const body = {
        gallery: "event",
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
      getEventDatabyId();
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   function handleEscapeKey(event) {
  //     if (event.keyCode === 27 || event.which === 27) {
  //       // escape key was pressed
  //       // setViewGallery(false);
  //     }
  //   }
  //   document.addEventListener("keydown", handleEscapeKey);
  //   // cleanup function to remove the event listener when component unmounts
  //   return () => {
  //     document.removeEventListener("keydown", handleEscapeKey);
  //   };
  // }, []);
  // useEffect(() => {
  //   Clickoutside(componentRef, componentRef2, setViewGallery);
  //   // eslint-disable-next-line
  // }, []);
  //Image Gallery Work End

  return (
    <div className="locationView">
      <Sidebar index={2} />

      {manageEventModal && (
        <ManageEvent
          eventData={eventData}
          setManageEventModal={setManageEventModal}
          allLocation={allLocation}
          getEventDatabyId={getEventDatabyId}
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

      {modal && <ReportsModal setModal={setModal} />}

      <div className="mycontainer ml-[100px] mr-[60px]">
        <div className="flex justify-end relative top-10">
          <div onClick={() => setManageEventModal(true)}>
            <GlobalButton btnTitle={"Manage Event"} />
          </div>
        </div>

        <div className="locationView_main">
          <div className="locationView_left1">
            <div
              className="locationView_card"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${eventData?.image})`,
              }}
            >
              <div className="locationView_date">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={back}
                  alt=""
                />

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

              <div className="events_date_rightAlign">
                <p>{moment(eventData?.dateFrom).format("MMM D")}</p>
                <div>{moment(eventData?.dateTo).format("MMM D")}</div>
              </div>

              <img
                className="locationView_location rounded-[50%] cursor-pointer"
                alt="location"
                src={location}
                onClick={navigateToGoogleMap}
              />

              <div className="locationView_heart">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={eventData?.isActive === true ? true : false}
                    onChange={() => handleCheckboxChange(eventData)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {/* <img className="locationView_heart" alt="heart" src={heart} /> */}
              <div className="locationView_bottom">
                <div className="locationView_star">
                  <img src={like} alt="" />
                  <p>{eventData?.attendCount}</p>
                </div>
              </div>
            </div>
            <p className="locationView_heading">Gallery</p>
            {/* <Gallery n={4} /> */}
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
                      slidesPerView: 4,
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
                    <div className="locationView_SlideAdd">
                      <input
                        multiple
                        accept="image/png , image/jpeg , image/webp"
                        type="file"
                        name="file3"
                        id="file3"
                        class="locationView_uploadFile"
                        style={{ display: "none" }}
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
                  {eventData?.eventGalleries?.map((data) => (
                    <SwiperSlide>
                      <div className="locationView_sliderChild">
                        {" "}
                        <img
                          className="sliderImg cursor-pointer"
                          src={data?.image}
                          alt="Noo"
                          onClick={() => setViewGallery(true)}
                        />{" "}
                        <div
                          onClick={() => handleDeleteSliderImage(data)}
                          className="absolute text-[#FF0000] right-[60px] top-[-5px] cursor-pointer"
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
              <div className="eventdetail_top">
                <p className="eventdetail_title">{eventData?.title}</p>
                <p
                  onClick={navigateToGoogleMap}
                  className="eventdetail_loc flex items-center cursor-pointer"
                >
                  <img src={greenloc} alt="" />
                  {eventData?.address}
                </p>
              </div>

              {/* Option Selector Start Here */}

              <div className="locationView_selector">
                <div className="locationView_wrapper gap-[15px]">
                  <p
                    onClick={() => setSelect(1)}
                    className={select === 1 && "locationView_active"}
                  >
                    Details
                  </p>
                  <p
                    onClick={() => {
                      setSelect(2);
                      getAllLikesEvent();
                    }}
                    className={select === 2 && "locationView_active"}
                  >
                    Likes
                  </p>
                  <p
                    onClick={() => {
                      setSelect(3);
                      getAllAttendees();
                    }}
                    className={select === 3 && "locationView_active"}
                  >
                    Attending
                  </p>
                </div>
              </div>

              {/* Option Selector End Here */}

              <div className="eventdetail_mainstab">
                {select === 1 && (
                  <>
                    <p className="eventdetail_heading">About</p>
                    <p className="eventdetail_text">{eventData?.description}</p>
                    <div>
                      <div className="eventdetail_time">
                        <img src={mainLocation} alt="" />
                        <div>
                          <p className="eventdetail_name">Main Location</p>
                          <p className="eventdetail_value">
                            {eventData?.location?.name}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={time} alt="time" />
                        <div className="opening">
                          <p className="eventdetail_name">Start Time</p>
                          <p className="eventdetail_value">
                            {moment(
                              `${eventData?.openingHour}:00`,
                              "HH:mm:ss"
                            ).format("h:mm A")}
                          </p>
                        </div>
                        <div>
                          <p className="eventdetail_name">End Time</p>
                          <p className="eventdetail_value">
                            {moment(
                              `${eventData?.closingHour}:00`,
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
                            {eventData?.websiteUrl}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={call} alt="" />
                        <div>
                          <p className="eventdetail_name">Contact</p>
                          <p className="eventdetail_value">
                            {eventData?.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {select === 2 && (
                  <>
                    {eventLikesData?.length === 0 ? (
                      <div className="flex justify-center items-center text-[25px] text-[#999]">
                        <h1>
                          No one likes this event
                          <i class="fa-solid fa-face-sad-tear ml-[15px]"></i>
                        </h1>
                      </div>
                    ) : (
                      eventLikesData?.map((likeData) => (
                        <div>
                          <div className="userDetailCard_full dropShadow flex p-[10px] rounded-[10px] mb-[10px]">
                            <div className="flex justify-center items-center mr-[20px]">
                              <div className="userDetailCard_logo  w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                                <img src={userProfileImage} />
                                <img src={heart} className="heart" />
                              </div>
                              {/* <div className="w-[20px] h-[20px] absolute rounded-[50%] ">
                           <img className="h-[20px] absolute top-[20px] left-[30px]" src={heart} />
                         </div> */}
                            </div>
                            <div className="userDetailContent ">
                              <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                                <p>{likeData?.userAuth?.name}</p>
                                {/* <img
                                onClick={() => setModal(true)}
                                className="userDetailCard_navIcon h-[10px] mr-[10px]"
                                src={leftIcon}
                              /> */}
                              </div>
                              <div className="userId text-[#777] text-[12px]">
                                <p>{likeData?.userAuth?.phone}</p>
                              </div>
                              <div className="userEmail text-[#777] text-[12px]">
                                <p>{likeData?.userAuth?.email}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {select === 3 && (
                  <div>
                    {eventAttendeesData?.length === 0 ? (
                      <div className="flex justify-center items-center text-[25px] text-[#999]">
                        <h1>
                          No one attending this event
                          <i class="fa-solid fa-face-sad-tear ml-[15px]"></i>
                        </h1>
                      </div>
                    ) : (
                      eventAttendeesData?.map((attendee) => (
                        <div className="userDetailCard_full dropShadow flex p-[10px] rounded-[10px] mb-[10px]">
                          <div className="flex justify-center items-center mr-[20px]">
                            <div className="userDetailCard_logo  w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                              <img src={userProfileImage} />
                              <img
                                src={select === 3 ? greenHand : heart}
                                className="heart"
                              />
                            </div>
                          </div>
                          <div className="userDetailContent ">
                            <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                              <p>{attendee?.userAuth?.name}</p>
                              {/* <img
                                   onClick={() => setModal(true)}
                                   className="userDetailCard_navIcon h-[10px] mr-[10px]"
                                   src={leftIcon}
                                 /> */}
                            </div>
                            <div className="userId text-[#777] text-[12px]">
                              <p>{attendee?.userAuth?.phone}</p>
                            </div>
                            <div className="userEmail text-[#777] text-[12px]">
                              <p>{attendee?.userAuth?.email}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
