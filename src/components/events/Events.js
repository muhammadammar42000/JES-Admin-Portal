import React, { useState } from "react";

//Images
import threeDot from "../../assets/3dot-01.png";
import locationWhite from "../../assets/locationWhite.png";
import likes from "../../assets/likes.png";
import SwitchButton from "../../components/SwitchButton/SwitchButton";
import { useNavigate } from "react-router-dom";
import EventDetail from "../../pages/Event/EventDetailPage/EventDetail";
import { toast } from "react-toastify";
import JESinstance from "../../api";
import moment from "moment";

export default function Events({ getAllEvent, filterData }) {
  const navigate = useNavigate();

  console.log(filterData);

  const handleCheckboxChange = async (data, event) => {
    // event.stopPropagation();

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
    getAllEvent();
  };

  return (
    <>
      {filterData?.length === 0 ? (
        <div className="noEventFound text-[30px]">
          <h1 className="text-[#999]">
            No event found in this location{" "}
            <i class="fa-solid fa-magnifying-glass-location"></i>
          </h1>
        </div>
      ) : (
        filterData?.map((event) => (
          <div
            className="events_card cursor-pointer"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${event?.image})`,
            }}
            onClick={() => navigate(`/eventdetail/?eventId=${event?.id}`)}
          >
            <div className="events_date">
              <p>{moment(event?.dateFrom).format("Do")}</p>
              <div>{moment(event?.dateFrom).format("MMM")}</div>
            </div>
            {/* <img className="events_location" alt="location" src={threeDot} /> */}
            <div
              className="flex justify-end right-[10px] absolute top-[5%]"
              onClick={(e) => e.stopPropagation()}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={event?.isActive === true ? true : false}
                  onChange={() => {
                    handleCheckboxChange(event);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="events_bottom">
              <div>
                <p className="event-name font-semibold w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {event?.title}
                </p>
                <p className="flex text-[13px] mt-[8px] w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
                  <img
                    className="w-[15px] h-[20px] mr-[10px]"
                    src={locationWhite}
                    onClick={(e) => {
                      console.log("first");
                      e.stopPropagation();
                    }}
                  />{" "}
                  {event?.address}
                </p>
              </div>
              <div>
                <img className="events_like" alt="likes" src={likes} />
                <p className="events_likeNo">{event?.attendCount}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
