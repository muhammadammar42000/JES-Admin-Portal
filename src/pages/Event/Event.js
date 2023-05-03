import React, { useEffect, useState } from "react";
import Events from "../../components/events/Events";
import Sidebar from "../../components/Sidebar/Sidebar";
import GlobalButton from "../../components/globalButton/GlobalButton";
import AddEvent from "../../components/Popups/AddEvent/AddEvent";
import JESinstance from "../../api";
import { setEventLocationId } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";

export default function Event() {
  const [addEventModal, setAddEventModal] = useState(false);
  const [allLocation, setAllLocation] = useState([]);
  const [eventArray, setEventArray] = useState([]);
  const [eventSearch, setEventSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const dispatch = useDispatch();
  const { eventLocationId } = useSelector((state) => state.saveAllId);

  const getAllEvent = async () => {
    const body = {
      locationId: eventLocationId ? eventLocationId : allLocation[0]?.id,
    };
    const res = await JESinstance.post("getEventByLocation", body);
    setEventArray(res.data.data);
  };

  const handleSetLocationId = (e) => {
    dispatch(setEventLocationId(e.target.value));
  };

  console.log(eventArray);
  // console.log(moment().format(eventArray[0].dateTo));

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res.data.data);
  };

  console.log("all Location ==> ", allLocation[1]?.id);

  useEffect(() => {
    getAllLocation();
  }, []);

  useEffect(() => {
    getAllEvent();
  }, [eventLocationId, allLocation]);

  useEffect(() => {
    const searchTableData = eventSearch
      ? eventArray?.filter((item) =>
          item?.title?.toLowerCase().includes(eventSearch.toLowerCase())
        )
      : eventArray;
    setFilterData(searchTableData);
  }, [eventSearch, getAllEvent]);

  return (
    <div>
      <Sidebar index={2} />
      {addEventModal && (
        <AddEvent
          getAllEvent={getAllEvent}
          setAddEventModal={setAddEventModal}
        />
      )}

      <div className="event">
        <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px] mb-[30px]">
          <div className="text-[#1AB650] text-[25px] flex font-semibold">
            <p>Event</p>
            <div className="text-[15px] text-normal ">
              <input
                className="h-[40px] p-[10px] border-[1px] border-solid focus:outline-none border-[#1cb750] rounded-[10px] ml-[20px] dropShadow"
                placeholder="Search Event By Title"
                type="search"
                onChange={(e) => setEventSearch(e.target.value)}
              />
            </div>
          </div>
          <div onClick={() => setAddEventModal(true)} className="text-[15px]">
            <GlobalButton btnTitle={"Add Event"} />
          </div>
        </div>

        <div className="flex justify-end mr-[60px] mb-[30px]">
          <select
            className="rounded-[10px] px-[30px] py-[15px] bg-white focus:outline-none dropShadow text-[15px] tracking-wide w-[200px]"
            name="locationId"
            value={eventLocationId}
            onChange={handleSetLocationId}
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

        <div className="eventContent ml-[100px] mr-[60px] mt-[10px] rounded-[20px] p-[30px] mb-[30px] h-[500px] overflow-y-scroll scroll-smooth locationScroll flex justify-center items-center">
          <Events filterData={filterData} getAllEvent={getAllEvent} />
        </div>
      </div>
    </div>
  );
}
