import React, { useState, useEffect } from "react";
import JESinstance from "../../api";
import GlobalButton from "../../components/globalButton/GlobalButton";
import HomeLocation from "../../components/homeLocation/HomeLocation";
import AddCategoryPopup from "../../components/Popups/AddCategory/AddCategoryPopup";
import CreateLocation from "../../components/Popups/CreateLocation/CreateLocation";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import SummaryBox from "../../components/summaryBox/SummaryBox";
import { setReduxLocationId } from "../../store/slice";
export default function Location() {
  const [createLocationModal, setCreateLocationModal] = useState(false);
  const [addCategoriesModal, setAddCategoriesModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  // const [locationName, setLocationName] = useState("all");
  const dispatch = useDispatch();
  const { LocationId } = useSelector((state) => state.saveAllId);

  const getAllCategory = async () => {
    const res = await JESinstance.post("getAllCategory");
    setAllCategories(res.data.data);
  };

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res.data.data);
  };

  const handleAddLocationIdInRedux = (e) => {
    // setLocationName(e.target.value);
    dispatch(setReduxLocationId(e.target.value));
  };

  useEffect(() => {
    getAllCategory();
    getAllLocation();
  }, []);

  return (
    <div>
      <Sidebar index={3} />

      {createLocationModal && (
        <CreateLocation
          allCategories={allCategories}
          allLocation={allLocation}
          setCreateLocationModal={setCreateLocationModal}
        />
      )}

      {addCategoriesModal && (
        <AddCategoryPopup
          getAllCategory={getAllCategory}
          setAddCategoriesModal={setAddCategoriesModal}
        />
      )}

      <div>
        <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px]">
          <div className="text-[#1AB650] text-[25px] font-semibold">
            <p>Location</p>
          </div>
          <div className="text-[15px] flex">
            <div onClick={() => setAddCategoriesModal(true)}>
              <GlobalButton btnTitle={"Create Categories"} />
            </div>
            <div>
              <button
                className="border-[1px] border-solid border-[#1cb750] px-[45px] py-[10px] text-[#1cb750] rounded-[7px] ml-[15px] hover:bg-[#1AB650] hover:text-[#fff]"
                onClick={() => setCreateLocationModal(true)}
              >
                Create Location
              </button>
            </div>
            <div className="selectLocation">
              <select
                onChange={handleAddLocationIdInRedux}
                value={LocationId}
                className="w-[200px]"
              >
                <option value="DEFAULT" disabled>
                  Select Location
                </option>

                <option value="all">All Location</option>

                {allLocation?.map((location) => (
                  <option value={location?.id}>{location?.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* <SummaryBox /> */}
        <div className="mr-[60px] ml-[100px] mt-[50px]">
          <HomeLocation
            getAllCategory={getAllCategory}
            allCategories={allCategories}
            allLocation={allLocation}
            getAllLocation={getAllLocation}
            // locationName={locationName}
          />
        </div>
      </div>
    </div>
  );
}
