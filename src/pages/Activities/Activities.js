import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import GlobalButton from "../../components/globalButton/GlobalButton";
import { Swiper, SwiperSlide } from "swiper/react";
import editPenIcon from "../../assets/JES-Admin-Portal-Assets-69.png";
import locationCircleIcon from "../../assets/location1.png";
import locationWhite from "../../assets/locationWhite.png";
import { useNavigate } from "react-router-dom";
import CreateActivity from "../../components/Popups/AddActivity/AddActivity";
import CreateActivityCategories from "../../components/Popups/CreateActivityCategories/CreateActivityCategories";
import EditActivityCategory from "../../components/Popups/EditActivityCategory/EditActivityCategory";
import JESinstance from "../../api";
import { toast } from "react-toastify";
import {
  setReduxActivityCategoryId,
  setReduxActivityLocationId,
} from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import Geocode from "react-geocode";

export default function Activities() {
  const navigate = useNavigate();
  const [createActivityModal, setCreateActivityModal] = useState(false);
  const [createActivityCategories, setCreateActivityCategories] =
    useState(false);
  const [editActivityCategory, setEditActivityCategories] = useState(false);
  const [allActivityCategories, setAllActivityCategories] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [allLocation, setAllLocation] = useState([]);
  const [childActivityData, setChildActivityData] = useState([]);
  const [updateCategoryData, setUpdateCategoryData] = useState([]);
  const dispatch = useDispatch();
  Geocode.setApiKey("AIzaSyCEGEzsuyzx2xsKHdLo970rthA3b1Nkk0Q");
  Geocode.enableDebug();

  const { activityLocationId, activityCategoryIdValue } = useSelector(
    (state) => state.saveAllId
  );

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const getAllActivityCategories = async () => {
    const res = await JESinstance.post("getAllCategoryOfActivities");
    setAllActivityCategories(res.data.data);
  };

  const handleAddLocationIdInRedux = (e) => {
    dispatch(setReduxActivityLocationId(e.target.value));
  };
  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res.data.data);
  };

  const handleActivityCategory = (category) => {
    handleItemClick(category?.id);
    dispatch(setReduxActivityCategoryId(category?.id));
  };

  const getAllChildActivity = async () => {
    try {
      // if (locationId === "") {
      //   toast.error("Please Select the location first", {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      // }
      // else {
      const body = {
        locationId: activityLocationId
          ? activityLocationId
          : allLocation[0]?.id,
        categoryId: activityCategoryIdValue
          ? activityCategoryIdValue
          : allActivityCategories[0]?.id,
      };
      const res = await JESinstance.post("getActivities", body);

      setChildActivityData(res?.data?.data);

      // }
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log("child activity data ==> ", childActivityData);

  const handleCheckboxChange = async (data) => {
    const body = {
      status: data.isActive === true ? false : true,
      id: data.id,
    };
    await JESinstance.post("updateActCategStatus", body);
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
    getAllActivityCategories();
  };

  const navigateToGoogleMap = (activity) => {
    console.log(activity);
    Geocode.fromAddress(activity?.address).then((response) => {
      let urls = `https://maps.google.com/?q=${response.results[0].geometry.location.lat},${response.results[0].geometry.location.lng}`;
      window.open(urls, "_blank");
    });
  };


  useEffect(() => {
    setActiveItem(
      activityCategoryIdValue
        ? activityCategoryIdValue
        : allActivityCategories[0]?.id
    );
  }, [activityCategoryIdValue, allActivityCategories]);

  useEffect(() => {
    getAllChildActivity();
  }, [
    activityLocationId,
    activityCategoryIdValue,
    allLocation,
    allActivityCategories,
  ]);

  useEffect(() => {
    getAllActivityCategories();
    getAllLocation();
  }, []);

  return (
    <div>
      <Sidebar index={4} />

      {createActivityModal && (
        <CreateActivity
          allActivityCategories={allActivityCategories}
          setCreateActivityModal={setCreateActivityModal}
        />
      )}

      {createActivityCategories && (
        <CreateActivityCategories
          setCreateActivityCategories={setCreateActivityCategories}
          getAllActivityCategories={getAllActivityCategories}
        />
      )}

      {editActivityCategory && (
        <EditActivityCategory
          setEditActivityCategories={setEditActivityCategories}
          updateCategoryData={updateCategoryData}
          getAllActivityCategories={getAllActivityCategories}
        />
      )}
      <div>
        <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px]">
          <div className="text-[#1AB650] text-[25px] font-semibold">
            <p>Activities</p>
          </div>
          <div className="text-[15px] flex">
            <div onClick={() => setCreateActivityCategories(true)}>
              <GlobalButton btnTitle={"Create Category"} />
            </div>
            <button
              onClick={() => setCreateActivityModal(true)}
              className="border-[1px] border-solid border-[#1cb750] px-[45px] py-[10px] text-[#1cb750] rounded-[7px] ml-[15px] hover:bg-[#1AB650] hover:text-[#fff]
              "
            >
              Create Activities
            </button>
          </div>
        </div>
        {/* <SummaryBox /> */}
        <div className="ml-[100px] mr-[60px] mt-[50px]">
          <div className="locationContent mt-[20px] rounded-[20px] p-[15px] mb-[20px]">
            <div className="flex justify-end">
              <select
                className="rounded-[10px] px-[30px] py-[15px] bg-white focus:outline-none dropShadow text-[15px] tracking-wide w-[200px] mb-[20px]"
                name="locationId"
                value={activityLocationId}
                onChange={handleAddLocationIdInRedux}
              >
                <option value="DEFAULT" disabled>
                  Select Location
                </option>
                {allLocation.map((location, index) => (
                  <option value={location.id} key={index}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Swiper
                speed={800}
                loop={false}
                autoplay={{
                  delay: 2500,
                }}
                breakpoints={{
                  1: {
                    slidesPerView: 6,
                  },
                  400: {
                    slidesPerView: 6,
                  },
                  450: {
                    slidesPerView: 6,
                  },
                  475: {
                    slidesPerView: 6,
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
                    slidesPerView: 5,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                  1500: {
                    slidesPerView: 5,
                  },
                  1600: {
                    slidesPerView: 5,
                  },
                }}
              >
                {allActivityCategories.map((category, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => handleActivityCategory(category)}
                      className="flex flex-col justify-center items-center "
                    >
                      <div className="w-[70px] h-[70px] mt-[10px] rounded-[20px] flex justify-center items-center dropShadow relative">
                        <img
                          className="w-[100%] h-[100%] bg-center rounded-[20px] dropShadow"
                          src={category.image}
                        />
                        <img
                          className="absolute w-[20px] right-[2px] top-[-3px] cursor-pointer"
                          src={editPenIcon}
                          onClick={() => {
                            setEditActivityCategories(true);
                            setUpdateCategoryData(category);
                          }}
                        />
                      </div>
                      <p
                        className={
                          activeItem === category.id
                            ? "borderBottom locationSwiper_loc mt-[10px] cursor-pointer"
                            : "locationSwiper_loc mt-[10px] cursor-pointer"
                        }
                      >
                        {category.name}
                      </p>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-[10px]"
                      >
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={category.isActive === true ? true : false}
                            onChange={() => handleCheckboxChange(category)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mt-[10px] h-[365px] overflow-y-scroll scroll-smooth locationScroll">
              <div className="ActivitiesContent w-[100%] h-[100%]">
                {/* Event Card */}
                {childActivityData?.length === 0 ? (
                  <div className="noActivityFound flex justify-center items-center">
                    <h1 className="text-[30px] text-[#999]">
                      No Activity Found{" "}
                      <i class="fa-solid fa-magnifying-glass-location"></i>
                    </h1>
                  </div>
                ) : (
                  childActivityData?.map((activity) => (
                    <div
                      className="events_card cursor-pointer"
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${activity.image})`,
                      }}
                      onClick={() =>
                        navigate(`/activitiesdetail/?activityId=${activity.id}`)
                      }
                    >
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToGoogleMap(activity);
                          // setSingleChildActivityData(activity);
                        }}
                        className="events_location"
                        alt="location"
                        src={locationCircleIcon}
                      />
                      <div className="events_bottom">
                        <div>
                          <p className="font-semibold w-[100%] whitespace-nowrap overflow-hidden text-ellipsis">
                            {activity.title}
                          </p>
                          <p className="flex text-[13px] mt-[8px] w-[100%] whitespace-nowrap overflow-hidden text-ellipsis">
                            <img
                              className="w-[15px] h-[20px] mr-[10px]"
                              src={locationWhite}
                            />{" "}
                            {activity.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {/* Event Card */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
