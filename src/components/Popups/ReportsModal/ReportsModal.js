import React from "react";

import leave from "../../../assets/Web-Assets-05.png";
import cross from "../../../assets/Web-Assets-39.png";
import location from "../../../assets/Web-Assets-44.png";
import dummyImg from "../../../assets/JES-Admin-Portal-Assets-92.png";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment/moment";

//image
import greenLocationIcon from "../../../assets/Web-Assets-44.png";
import userAvatar from "../../../assets/userAvatar.png";

const ReportsModal = ({ reportCardData, setReportModal }) => {
  const dateTime = "2023-02-28T12:37:05.000Z";
  console.log(moment().format("MMM Do YYYY, h:mm a"));
  console.log("reportCardData", reportCardData);
  return (
    <div className="reportview">
      <div className="reportview_inner">
        <div className="leafBackground">
          <img className="w-[150px]" src={leave} alt="" />
        </div>

        <div className="mx-[15px] mt-[15px] flex justify-end">
          <img
            className="w-[20px] z-50 cursor-pointer"
            src={cross}
            alt="close"
            onClick={() => {
              setReportModal(false);
            }}
          />
        </div>

        <div className="mx-[15px]">
          <div className="flex justify-start items-center gap-[25px]">
            <div className="userProfileImg">
              <img
                className="w-[70px] h-[70px] rounded-[50%]"
                src={
                  reportCardData?.userAuth?.image
                    ? reportCardData?.userAuth?.image
                    : userAvatar
                }
              />
            </div>
            <div>
              <p className="text-[#1AB650] font-semibold">
                {reportCardData?.userAuth?.name}
              </p>
              <p className="text-[#999] text-[13px]">
                {reportCardData?.userAuth?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-[15px] mt-[20px]">
          <div className="flex justify-center items-center flex-col">
            <p className="text-[#0b5c5e] text-[10px]">
              {moment(reportCardData?.createdAt).format("MMM Do YYYY, h:mm a")}
            </p>
            <p className="text-[#0b5c5e] text-[20px] leading-8 tracking-wide font-bold text-center">
              {reportCardData?.childLocation?.title}
            </p>
            <div className="flex justify-center items-center leading-8 text-center">
              <img className="h-[15px]" src={greenLocationIcon} />
              <p className="text-[#1AB650] text-[12px] ml-[5px] w-[80%] overflow-hidden whitespace-nowrap text-ellipsis">
                {reportCardData?.childLocation?.address}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="mx-[15px] flex gap-[20px]">
          <div className="w-[70px] h-70px rounded-[50%]">
            <img src={userProfileImage} />
          </div>
          <div>Ammar</div>
        </div> */}

        <div className="reportview_main">
          <div className="reportview_textarea">
            <p className="title text-[#1AB650]">
              {reportCardData?.reportTitle}
            </p>
            <p className="content">{reportCardData?.description}</p>
          </div>
          <img
            className="reportview_image h-[300px] object-cover"
            src={`${reportCardData?.image}`}
            alt=""
          />
        </div>
        {/* <Swiper
          speed={800}
          loop={false}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
          }}
        >
          <SwiperSlide>
            <img className="reportview_swiperimg" src={dummyImg} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="reportview_swiperimg" src={dummyImg} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="reportview_swiperimg" src={dummyImg} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="reportview_swiperimg" src={dummyImg} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="reportview_swiperimg" src={dummyImg} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="reportview_swiperimg" src={dummyImg} />
          </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  );
};

export default ReportsModal;
