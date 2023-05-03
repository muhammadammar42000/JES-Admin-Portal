import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import star from "../../../assets/JES-Admin-Portal-Assets-98.png";
import location from "../../../assets/location1.png";
import locationWhiteIcon from "../../../assets/locationWhite.png";
import back from "../../../assets/JES-Admin-Portal-Assets-71.png";
import time from "../../../assets/JES-Admin-Portal-Assets-41.png";
import web from "../../../assets/JES-Admin-Portal-Assets-42.png";
import call from "../../../assets/JES-Admin-Portal-Assets-43.png";
import uploadImgIconSlide from "../../../assets/JES-Admin-Portal-Assets-54.png";
import background from "../../../assets/Web-Assets-59.png";
import GlobalButton from "../../../components/globalButton/GlobalButton";
import StarRating from "../../../components/StarRating/StarRating";
import userAvatar from "../../../assets/userAvatar.png";
import mainLocation from "../../../assets/MainLocation.png";
import leftIcon from "../../../assets/leftIcon.png";
import ManageLocation from "../../../components/Popups/ManageLocation/ManageLocation";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import cross from "../../../assets/Web-Assets-39.png";
import ReportsModal from "../../../components/Popups/ReportsModal/ReportsModal";
import JESinstance from "../../../api";
import moment from "moment";
import uploadImage from "../../../components/upload-image";
import { toast } from "react-toastify";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import Geocode from "react-geocode";

export default function LocationDetailPage() {
  const [select, setSelect] = useState(1);
  const [manageLocationModal, setManageLocationModal] = useState(false);
  const [reportData, setReportData] = useState({});
  const [reportModal, setReportModal] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [galleryImage, setGalleryImage] = useState();
  const [viewGallery, setViewGallery] = useState(false);
  const [url, setUrl] = useState("");

  Geocode.setApiKey("AIzaSyCEGEzsuyzx2xsKHdLo970rthA3b1Nkk0Q");
  Geocode.enableDebug();

  const navigate = useNavigate();
  const getLocation = useLocation();
  const state = getLocation.state;
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get("serviceId");

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res?.data?.data);
  };

  const getAllCategory = async () => {
    const res = await JESinstance.post("getAllCategory");
    setAllCategories(res?.data?.data);
  };

  const getChildLocationData = async () => {
    if (value) {
      const body = {
        childLocationId: value,
      };
      const res = await JESinstance.post("getLocationById", body);
      setLocationData(res?.data?.data);
    }
  };
  console.log(locationData);

  const getAllReviews = async () => {
    const body = {
      location: "review",
      locationId: value,
    };
    const res = await JESinstance.post("locationSocial", body);
    setAllReviews(res.data.data);
  };
  console.log(allReviews);

  const getAllReports = async () => {
    const body = {
      location: "report",
      locationId: value,
    };
    const res = await JESinstance.post("locationSocial", body);
    setAllReports(res?.data?.data);
  };
  // console.log(allReports);

  const updateGalleryImage = async () => {
    try {
      const body = {
        childLocationId: value,
        image: galleryImage,
      };
      await JESinstance.post("addImageForChildLoc", body);
      getChildLocationData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChange = async (data) => {
    try {
      const body = {
        status: data.isActive === true ? false : true,
        id: data.id,
      };
      await JESinstance.post("updateChildLocationStatus", body);
      const msg =
        body.status === false
          ? "This Location is successfully hidden"
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
      getChildLocationData();
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
    setTimeout(() => {
      const array = [];
      locationData?.locationGalleries.forEach((item) => {
        array.push({ ...item, thumbnail: item?.image, original: item?.image });
      });
      setImages(array);
    }, 500);
  }, [locationData]);

  useEffect(() => {
    Geocode.fromAddress(locationData?.address).then((response) => {
      setUrl(
        `https://maps.google.com/?q=${response.results[0].geometry.location.lat},${response.results[0].geometry.location.lng}`
      );
    });
  }, [locationData]);

  const handleDeleteSliderImage = async (imageData) => {
    try {
      const body = {
        gallery: "location",
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
      getChildLocationData();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getChildLocationData();
    getAllReviews();
    getAllReports();
    getAllLocation();
    getAllCategory();
  }, []);

  useEffect(() => {
    if (galleryImage) {
      updateGalleryImage();
    }
  }, [galleryImage]);

  return (
    <div className="locationView">
      <Sidebar index={3} />
      {manageLocationModal && (
        <ManageLocation
          locationData={locationData}
          setManageLocationModal={setManageLocationModal}
          allLocation={allLocation}
          allCategories={allCategories}
          getChildLocationData={getChildLocationData}
        />
      )}

      {reportModal && (
        <ReportsModal
          reportCardData={reportData}
          setReportModal={setReportModal}
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
        <div
          onClick={() => setManageLocationModal(true)}
          className="flex justify-end relative top-10"
        >
          <GlobalButton btnTitle={"Manage Location"} />
        </div>

        <div className="locationView_main">
          <div className="locationView_left1">
            <div
              className="locationView_card"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${locationData.image})`,
              }}
            >
              <div className="locationView_date">
                <img
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  src={back}
                  alt=""
                />
              </div>

              <div className="absolute flex flex-col bottom-[0px] p-[20px] z-10">
                <p className="text-[#fff] text-[18px] font-semibold tracking-wider">
                  {locationData.title}
                </p>
                <div
                  onClick={navigateToGoogleMap}
                  className="flex cursor-pointer"
                >
                  <img className="h-[17px]" src={locationWhiteIcon} />
                  <p className="text-[13px] text-[#fff] ml-[6px]">
                    {locationData.address}
                  </p>
                </div>
              </div>

              <img
                onClick={navigateToGoogleMap}
                className="locationView_location1 rounded-[50%] cursor-pointer"
                alt="location"
                src={location}
              />

              <div className="absolute top-[5%] right-0 pr-[20px]">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={locationData?.isActive === true ? true : false}
                    onChange={() => handleCheckboxChange(locationData)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="locationView_bottom">
                <div className="locationView_star">
                  <img src={star} alt="" />
                  <p>{locationData.averageRating}</p>
                </div>
              </div>
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
                  {locationData?.locationGalleries?.map((data) => (
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
                          className="absolute text-[#FF0000] right-8 top-[-5px] cursor-pointer"
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
            <div className="eventdetail dropShadow rounded-tl-[150px]">
              <div className="eventdetail_top1">
                <img src={background} />

                <div className="locationView_selector1">
                  <div className="locationView_wrapper">
                    <p
                      onClick={() => setSelect(1)}
                      className={select === 1 && "locationView_active"}
                    >
                      Details
                    </p>
                    <p
                      onClick={() => setSelect(2)}
                      className={select === 2 && "locationView_active"}
                    >
                      {allReviews.length} Reviews
                    </p>
                    <p
                      onClick={() => setSelect(3)}
                      className={select === 3 && "locationView_active"}
                    >
                      {allReports?.length} Report
                    </p>
                  </div>
                </div>
              </div>

              <div className="eventdetail_mains">
                {select === 1 && (
                  <>
                    <p className="eventdetail_heading">About</p>
                    <p className="eventdetail_text">
                      {locationData.description}
                    </p>
                    <div>
                      <div className="eventdetail_time">
                        <img src={mainLocation} alt="" />
                        <div>
                          <p className="eventdetail_name">Main Location</p>
                          <p className="eventdetail_value">
                            {locationData?.location?.name}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={time} alt="time" />
                        <div className="opening">
                          <p className="eventdetail_name">Start Time</p>
                          <p className="eventdetail_value">
                            {moment(
                              `${locationData?.openingHour}:00`,
                              "HH:mm:ss"
                            ).format("h:mm A")}
                          </p>
                        </div>
                        <div>
                          <p className="eventdetail_name">End Time</p>
                          <p className="eventdetail_value">
                            {moment(
                              `${locationData?.closingHour}:00`,
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
                            {locationData.websiteUrl}
                          </p>
                        </div>
                      </div>
                      <div className="eventdetail_time">
                        <img src={call} alt="" />
                        <div>
                          <p className="eventdetail_name">Contact</p>
                          <p className="eventdetail_value">
                            {locationData.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {select === 2 && (
                  <>
                    {/* <div className="userDetailCard_full flex p-[10px] mb-[10px] ">
                      <div className="flex justify-center items-center mr-[20px]">
                        <div className="userDetailCard_logo  w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                          <img src={userProfileImage} />
                          <img src={heart} className="heart" />
                        </div>
                      </div>
                      <div className="userDetailContent ">
                        <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                          <p>Aaron Dro</p>
                          <img
                            className="userDetailCard_navIcon h-[10px] mr-[10px]"
                            src={leftIcon}
                          />
                        </div>
                        <div className="userId text-[#777] text-[12px]">
                          <p>2658952251</p>
                        </div>
                        <div className="userEmail text-[#777] text-[12px]">
                          <p>aaron-dro@gmail.com</p>
                        </div>
                      </div>
                    </div> */}

                    {allReviews?.length === 0 ? (
                      <div className="flex justify-center items-center text-[25px] text-[#999]">
                        <h1>
                          No Review
                          <i class="fa-regular fa-face-smile ml-[15px]"></i>
                        </h1>
                      </div>
                    ) : (
                      allReviews?.map((review, index) => (
                        <div key={index} className="customerRatingCard">
                          <div className="flex items-center">
                            <div className="h-[40px] w-[40px] rounded-[50px]">
                              <img
                                className="h-[100%] w-[100%]"
                                src={userAvatar}
                              />
                            </div>
                            <p className="text-[#1AB650] font-semibold ml-[15px]">
                              {review.userAuth.name}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <p className="text-[#999] text-[11px]">
                              {moment(review?.createdAt).fromNow()}
                            </p>
                          </div>
                          <div>
                            <StarRating rating={Number(review.rating)} />
                          </div>
                          <div className="mt-[10px] mb-[10px]">
                            <p className="text-[#777] text-[13px]">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {select === 3 && (
                  <>
                    {allReports?.length === 0 ? (
                      <div className="flex justify-center items-center text-[25px] text-[#999]">
                        <h1>
                          No one Report this event
                          <i class="fa-regular fa-face-smile ml-[15px]"></i>
                        </h1>
                      </div>
                    ) : (
                      allReports?.map((reportData) => (
                        <div className="userDetailCard_full dropShadow flex p-[10px] rounded-[10px] mb-[10px]">
                          <div className="flex justify-center items-center mr-[20px]">
                            <div className="userDetailCard_logo  w-[70px] h-[70px] rounded-[50%] flex justify-center items-center">
                              <img
                                className="w-[100%] h-[100%] rounded-[50%]"
                                src={userAvatar}
                              />
                            </div>
                            {/* <div className="w-[20px] h-[20px] absolute rounded-[50%] ">
                           <img className="h-[20px] absolute top-[20px] left-[30px]" src={heart} />
                         </div> */}
                          </div>
                          <div className="userDetailContent ">
                            <div className="text-[#1AB651] font-semibold userName flex justify-between items-center mb-[10px]">
                              <p>{reportData?.userAuth?.name}</p>
                              <img
                                onClick={() => {
                                  setReportData(reportData);
                                  setReportModal(true);
                                }}
                                className="userDetailCard_navIcon h-[10px] mr-[10px]"
                                src={leftIcon}
                              />
                            </div>
                            <div className="userId text-[#777] text-[12px]">
                              <p>{reportData?.userAuth?.phone}</p>
                            </div>
                            <div className="userEmail text-[#777] text-[12px]">
                              <p>{reportData?.userAuth?.email}</p>
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
