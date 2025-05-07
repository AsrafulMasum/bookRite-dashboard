import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbDatabaseDollar } from "react-icons/tb";
import { HiUsers, HiUserGroup } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import booking from "../../assets/booking.svg";
import dashboard from "../../assets/dashboard.svg";
import faq from "../../assets/faq.svg";
import services from "../../assets/services.svg";
import setting from "../../assets/setting.svg";
import users from "../../assets/users.svg";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      label: "Dashboard",
      icon: <img src={dashboard} alt="Dashboard icon" />,
    },
    {
      key: "/users",
      label: "Users",
      icon: <img src={users} alt="users icon" />,
    },
    {
      key: "/artists",
      label: "Services",
      icon: <img src={services} alt="services icon" />,
    },
    {
      key: "/users",
      label: "Booking List",
      icon: <img src={booking} alt="booking icon" />,
    },
    {
      key: "/category",
      label: "FAQ",
      icon: <img src={faq} alt="faq icon" />,
    },
    {
      key: "/settings",
      label: "Settings",
      icon: <img src={setting} alt="setting icon" />,
      submenu: [
        { key: "/banner", label: "Banner" },
        { key: "/about-us", label: "About Us" },
        { key: "/terms-and-conditions", label: "Terms And Condition" },
        { key: "/privacy-policy", label: "Privacy Policy" },
        { key: "/change-password", label: "Change Password" },
      ],
    },
  ];

  const isActive = (route) => path === route;

  return (
    <div className="min-h-screen">
      <aside className="w-[344px] fixed top-[30px] bottom-[30px] bg-[#E6E6FF66] rounded-tr-[16px] rounded-br-[16px] py-6 overflow-y-auto max-h-screen">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="relative h-[75vh]">
          <div className="flex flex-col gap-5">
            {menuItems.map((item) => {
              const active = isActive(item.key);
              return (
                <Link
                  to={item.key}
                  key={item.key}
                  className={`flex items-center gap-4 px-[22px] py-2.5 transition-all text-[#757575]
                  ${active && "relative"}
                `}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-[52px] w-[8px] bg-primary rounded-r-md"></span>
                  )}
                  <span className="text-[20px]">{item.icon}</span>
                  <span className="text-xl">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="absolute bottom-[0px] flex items-center gap-4 px-5 py-3 rounded-xl text-red-500 hover:bg-red-100 transition-all mt-4"
          >
            <IoIosLogOut size={20} />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
