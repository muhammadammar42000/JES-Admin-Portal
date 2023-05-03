import React, { useEffect, useRef, useState } from "react";
import LogoImg from "../../assets/MJC-01.png";
import HomeIcon from "../../assets/home.png";
import LocationIcon from "../../assets/location.png";
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/star.png";
import ActivitiesIcon from "../../assets/activities.png";
import ReportIcon from "../../assets/report.png";
import RegisteredIcon from "../../assets/rigerteredUser.png";
import BannerIcon from "../../assets/banner.png";
import AboutIcon from "../../assets/aboutUs.png";
import PrivacyIcon from "../../assets/privacy.png";
import LogoutIcon from "../../assets/logout.png";
import cross from "../../assets/Web-Assets-39.png";
import sideBarBtn from "../../assets/JES-Admin-Portal-Assets-71.png";

export default function Sidebar({ index }) {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const componentRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  function handleClick(e) {
    if (componentRef) {
      const ref = componentRef.current;
      if (ref?.contains(e.target) === false) {
        setMenu(false);
      }
    }
  }

  const style1 =
    "mt-[10px] p-[10px] hover:text-white cursor-pointer hover:bg-gradient-to-r from-[#b7ce31] to-[#1cb750] rounded-lg";

  let sidebarArray = [
    {
      icon: HomeIcon,
      text: "Dashboard",
      route: "/",
      index: 1,
    },
    {
      icon: StarIcon,
      text: "Main Locations",
      route: "/mainlocation",
      index: 10,
    },
    {
      icon: LocationIcon,
      text: "Locations",
      route: "/location",
      index: 3,
    },
    {
      icon: StarIcon,
      text: "Events",
      route: "/event",
      index: 2,
    },

    {
      icon: ActivitiesIcon,
      text: "Activities",
      route: "/activities",
      index: 4,
    },
    {
      icon: ReportIcon,
      text: "Reports / Suggestions",
      route: "/reports",
      index: 5,
    },
    {
      icon: RegisteredIcon,
      text: "Registered  Users",
      route: "/regestered-users",
      index: 6,
    },
    {
      icon: BannerIcon,
      text: "Banners",
      route: "/banner",
      index: 7,
    },
    {
      icon: AboutIcon,
      text: "About Us",
      route: "/aboutus",
      index: 8,
    },
    {
      icon: PrivacyIcon,
      text: "Privacy Policy",
      route: "/privacypolicy",
      index: 9,
    },
    {
      icon: LogoutIcon,
      text: "Logout",
      route: "/login",
    },
  ];
  const mystyle =
    "h-[100vh] w-[300px] pt-[40px] z-20 flex items-center flex-col bg-gradient-to-r from-[#CDE7AE] to-[#9ED9A0] overflow-y-scroll";

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    // navigate('/login');
  };
  return (
    <div>
      <div
        ref={componentRef}
        className={
          menu
            ? `hidescroll sideBar  ${mystyle}`
            : `hidescroll sidebarSmall ${mystyle}`
        }
      >
        <div className="absolute top-[8px] right-[10px]">
          {menu ? (
            <img
              className="w-[15px] cursor-pointer"
              src={cross}
              onClick={() => setMenu((prev) => !prev)}
            />
          ) : (
            <img
              className="w-[30px] cursor-pointer"
              src={sideBarBtn}
              onClick={() => setMenu((prev) => !prev)}
            />
          )}
        </div>
        {menu && (
          <>
            <div
              onClick={() => navigate("/")}
              className="logo w-[150px] cursor-pointer"
            >
              <img src={LogoImg} />
            </div>
            <div
              className={
                menu ? "flex flex-col mt-[70px]" : "flex flex-col mt-[70px]"
              }
            >
              {sidebarArray.map((item) => (
                <div
                  // style={{ backgroundImage : index === item?.index && '' }}
                  className={
                    index === item.index
                      ? `${style1} activeSidebarItem`
                      : style1
                  }
                  onClick={() => {
                    item.text === "Logout"
                      ? handleLogout()
                      : navigate(item.route);
                  }}
                >
                  <div className="flex justify-start items-start">
                    <img className="w-[20px] mr-[20px]" src={item.icon} />
                    <div>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
