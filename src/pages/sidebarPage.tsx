import { useState } from "react";
import Logo from "../assests/images/Image.png";
import LeftArrow from "../assests/images/left arrow.png";
import RightArrow from "../assests/images/right arrow.png";
import ProfileImage from "../assests/images/person.png";
import ArrowDownImage from "../assests/images/arrow down.png";
import SideBarCommonICon from "../assests/images/homeIcon.png";

const SidebarPage = () => {
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [selectState, setSelectState] = useState("");
  const [subSelectState, setSubSelectState] = useState("");
  const [theme, setTheme] = useState("light");

  const bgLight = "bg-[#FFFF]";
  const bgDark = "bg-[#404040]";

  return (
    <>
      <div
        className={`${theme === "light" ? bgLight : bgDark} border rounded ${
          isSideOpen ? "w-[300px]" : "w-[100px]"
        } `}
      >
        <div className={`${isSideOpen ? "flex justify-around" : ""}   py-5`}>
          <div className={`flex items-center justify-center gap-3`}>
            <img src={Logo} alt="Logo" />
            {isSideOpen && <span>Fashionhub</span>}
          </div>
          <div className={`flex justify-center ${!isSideOpen && "pt-5"} `}>
            <button type="button" onClick={() => setIsSideOpen(!isSideOpen)}>
              <img
                src={isSideOpen ? LeftArrow : RightArrow}
                alt="right arrow"
              />
            </button>
          </div>
        </div>
        <div className="border-[7px] border-[#F2F3F5]"></div>
        <div className={`my-5`}>
          <div className="flex justify-around items-center border-2 rounded-[7px] border-[#F1F1F3] mx-5 p-3">
            <div>
              <img src={ProfileImage} alt="profile image" />
            </div>
            {isSideOpen && (
              <>
                <div>
                  <div>
                    <span>Taras Migulko</span>
                  </div>
                  <span>Super Admin</span>
                </div>
                <button type="button">
                  <img src={ArrowDownImage} alt="arrow down" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mx-5">
          {isSideOpen && (
            <span className="text-[#B3B4B8]">{AnalyticsData?.title}</span>
          )}
          <div>
            {AnalyticsData?.data?.map((item, index) => (
              <>
                <div
                  className={`flex items-center justify-between gap-3 p-3 my-2 rounded-[6px] ${
                    item?.label === selectState ? "bg-[#EDECF9]" : ""
                  }`}
                  onClick={() => setSelectState(item?.label)}
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <img src={item?.icon} alt={`${item?.label}-icon`} />
                    {isSideOpen && (
                      <span
                        className={`${
                          item?.label === selectState
                            ? "text-[#8172E8]"
                            : "text-[#9A9BA1]"
                        }`}
                      >
                        {item?.label}
                      </span>
                    )}
                  </div>

                  {isSideOpen && item?.data && (
                    <div>
                      <button type="button">
                        <img src={ArrowDownImage} alt="arrow down" />
                      </button>
                    </div>
                  )}
                </div>

                {item?.label === selectState && item?.data && (
                  <div>
                    {item?.data?.map((sub, ind) => (
                      <div
                        className="p-2 cursor-pointer"
                        key={ind}
                        onClick={() => setSubSelectState(sub?.label)}
                      >
                        <span
                          className={`${
                            sub?.label === subSelectState
                              ? "text-[#8172E8]"
                              : "text-[#9A9BA1]"
                          }`}
                        >
                          {sub?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
            <div className="">
              {isSideOpen && (
                <span className="text-[#B3B4B8]">{ApplicationData?.title}</span>
              )}
              {ApplicationData?.data?.map((item, index) => (
                <>
                  <div
                    className={`flex items-center justify-between gap-3 p-3 my-2 rounded-[6px] ${
                      item?.label === selectState ? "bg-[#EDECF9]" : ""
                    }`}
                    onClick={() => setSelectState(item?.label)}
                    key={index}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item?.icon} alt={`${item?.label}-icon`} />
                      {isSideOpen && (
                        <span
                          className={`${
                            item?.label === selectState
                              ? "text-[#8172E8]"
                              : "text-[#9A9BA1]"
                          }`}
                        >
                          {item?.label}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="">
              {isSideOpen && (
                <span className="text-[#B3B4B8]">{OthersData?.title}</span>
              )}
              {OthersData?.data?.map((item, index) => (
                <>
                  <div
                    className={`flex items-center justify-between gap-3 p-3 my-2 rounded-[6px] ${
                      item?.label === selectState ? "bg-[#EDECF9]" : ""
                    }`}
                    onClick={() => setSelectState(item?.label)}
                    key={index}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item?.icon} alt={`${item?.label}-icon`} />
                      {isSideOpen && (
                        <span
                          className={`${
                            item?.label === selectState
                              ? "text-[#8172E8]"
                              : "text-[#9A9BA1]"
                          }`}
                        >
                          {item?.label}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mx-5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="radio"
              name="theme"
              id="light"
              onChange={() => setTheme("light")}
            />
            <label htmlFor="light">Light</label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="radio"
              name="theme"
              id="dark"
              onChange={() => setTheme("dark")}
            />
            <label htmlFor="dark">Dark</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarPage;

const AnalyticsData = {
  title: "Analytics",
  data: [
    {
      label: "Dasboard",
      icon: SideBarCommonICon,
    },
    {
      label: "BP report",
      icon: SideBarCommonICon,
      data: [
        {
          label: "Report 1",
        },
        {
          label: "Report 2",
        },
        {
          label: "Report 3",
        },
      ],
    },
  ],
};

const ApplicationData = {
  title: "Application",
  data: [
    {
      label: "Business",
      icon: SideBarCommonICon,
    },
    {
      label: "Members",
      icon: SideBarCommonICon,
    },
    {
      label: "Others",
      icon: SideBarCommonICon,
    },
  ],
};

const OthersData = {
  title: "Others",
  data: [
    {
      label: "Notification",
      icon: SideBarCommonICon,
    },
    {
      label: "Memberships",
      icon: SideBarCommonICon,
    },
    {
      label: "Suspensions",
      icon: SideBarCommonICon,
    },
    {
      label: "No Shows",
      icon: SideBarCommonICon,
    },
    {
      label: "Penalties",
      icon: SideBarCommonICon,
    },
  ],
};
