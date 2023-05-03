import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import JESinstance from "../../api";
import editPenIcon from "../../assets/JES-Admin-Portal-Assets-69.png";
import ratingStar from "../../assets/JES-Admin-Portal-Assets-98.png";
import {
  setReduxLocationCategoryId,
  setReduxLocationId,
} from "../../store/slice";
import GlobalButton from "../globalButton/GlobalButton";
import CreateLocationCategories from "../Popups/CreateLocationCategories/CreateLocationCategories";
import ManageCategories from "../Popups/ManageCategories/ManageCategories";
// import TestSwiper from "../testSwiper/TestSwiper";

export default function HomeLocation({
  allCategories,
  getAllCategory,
  allLocation,
  getAllLocation,
  // locationName,
}) {
  const [createLocationCategories, setCreateLocationCategories] =
    useState(false);
  const [manageCategoriesModal, setManageCategoriesModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [activeItem, setActiveItem] = useState();
  const [allChildLocation, setAllChildLocation] = useState([]);
  const [force, setForce] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const categoryIdValue = useSelector((state) => state.locationCategoryId.value);

  const { LocationId, locationCategoryId } = useSelector(
    (state) => state.saveAllId
  );
  console.log(allCategories);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const handleAddLocationIdInRedux = (e) => {
    // setLocationId(e.target.value);
    dispatch(setReduxLocationId(e.target.value));
  };

  const handleAddLocationCategoryIdInRedux = (category) => {
    handleItemClick(category?.id);
    // getChildLocation();
    dispatch(setReduxLocationCategoryId(category?.id));
  };

  const getChildLocation = async () => {
    // if (true) {
    const body = {
      locationId: LocationId,
      // ? LocationId : allLocation[0]?.id,
      categoryId: locationCategoryId,
      // ? locationCategoryId : allCategories[0]?.id,
    };
    const res = await JESinstance.post("getAllChildLoc", body);
    setForce(force);

    const data = res;
    setAllChildLocation(data?.data?.data);

    // } else if (!locationId) {
    //   toast.error("Please Select the location", {
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
  };

  const handleAllChildLocation = async () => {
    const res = await JESinstance.post("getLocations");
    setAllChildLocation(res?.data?.data);
  };

  const handleCheckboxChange = async (data) => {
    const body = {
      status: data.isActive === true ? false : true,
      id: data.id,
    };
    await JESinstance.post("updateCategoryStatus", body);
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
    getAllCategory();
  };

  // console.log(allChildLocation);

  useEffect(() => {
    if (!LocationId && !locationCategoryId) {
      handleAllChildLocation();
    }
  }, []);

  useEffect(() => {
    setActiveItem(
      locationCategoryId
      // ? locationCategoryId : allCategories[0]?.id
    );
  }, [locationCategoryId, allCategories]);

  useEffect(() => {
    getChildLocation();
  }, [LocationId, locationCategoryId, allLocation, allCategories]);

  return (
    <div className="locationContent mt-[20px] rounded-[20px] p-[15px]">
      {createLocationCategories && (
        <CreateLocationCategories
          setCreateLocationCategories={setCreateLocationCategories}
          getAllLocation={getAllLocation}
          allLocation={allLocation}
        />
      )}

      {manageCategoriesModal && (
        <ManageCategories
          categoryData={categoryData}
          setManageCategoriesModal={setManageCategoriesModal}
          getAllCategory={getAllCategory}
        />
      )}
      <div>
        <div className="flex justify-end mx-[10px] my-[20px]">
          {/* <div
            onClick={() => {
              setCreateLocationCategories(true);
            }}
          >
            <GlobalButton btnTitle={"Create Location Categories"} />
          </div> */}

          {location.pathname === "/" && (
            <div className="selectLocation">
              <select
                onChange={handleAddLocationIdInRedux}
                value={LocationId}
                className="w-[200px]"
              >
                <option value="DEFAULT" disabled>
                  Select Location
                </option>
                {allLocation?.map((location) => (
                  <option value={location?.id}>{location?.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <Swiper
          speed={800}
          loop={false}
          autoplay={{
            delay: 2500,
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
              slidesPerView: 7,
            },
            1500: {
              slidesPerView: 7,
            },
            1600: {
              slidesPerView: 7,
            },
          }}
        >
          {allCategories?.map((category) => (
            <SwiperSlide>
              <div
                onClick={() => handleAddLocationCategoryIdInRedux(category)}
                className="flex flex-col justify-center items-center "
              >
                <div className="w-[70px] h-[70px] rounded-[50%] flex justify-center items-center dropShadow relative ">
                  <img
                    className="w-[35px] h-[35px] object-contain"
                    src={category?.image}
                  />
                  <img
                    className="absolute w-[20px] right-[2px] top-[10px] cursor-pointer"
                    src={editPenIcon}
                    onClick={() => {
                      setManageCategoriesModal(true);
                      setCategoryData(category);
                    }}
                  />
                </div>
                <p
                  className={
                    activeItem === category?.id
                      ? "borderBottom locationSwiper_loc mt-[10px] cursor-pointer"
                      : "locationSwiper_loc mt-[10px] cursor-pointer"
                  }
                >
                  {category?.name}
                </p>
                <div onClick={(e) => e.stopPropagation()} className="mt-[15px]">
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

      {allChildLocation.length === 0 ? (
        <div className="noItemFound text-[30px] text-[#555] h-[300px] flex justify-center items-center">
          <h1>
            No Location Found{" "}
            <i class="fa-solid fa-magnifying-glass-location ml-[10px] text-[#888]"></i>
          </h1>
        </div>
      ) : (
        <div className="mt-[10px] h-[365px] overflow-y-scroll scroll-smooth locationScroll">
          <div className="locDetails pt-[10px]">
            {allChildLocation?.map((childLocation) => (
              <div
                className="check"
                onClick={() =>
                  navigate(`/locationdetail/?serviceId=${childLocation?.id}`)
                }
              >
                <div
                  className="locationSwiper_card"
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${childLocation?.image})`,
                  }}
                >
                  <div className="locationSwiper_star">
                    <img src={ratingStar} />
                    <p className="font-semibold">
                      {childLocation?.averageRating}
                    </p>
                  </div>
                  {/* <div className="absolute right-0 bottom-[10px] pr-[10px]">
                    {" "}
                    <label className="switch">
                      <input
                        type="checkbox"
                        // checked={data.isActive === true ? true : false}
                        // onChange={() => handleCheckboxChange(data)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div> */}
                </div>
                <p className="locationSwiper_name w-[100%] whitespace-nowrap overflow-hidden text-ellipsis">
                  {childLocation?.title}
                </p>
                <div className="flex">
                  {/* <img className="w-[10px] h-[15px]" src={locationGreenIcon} />
                  <p className="ml-[5px] text-[#1AB650] text-[12px] text-center">
                    {childLocation?.address}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
