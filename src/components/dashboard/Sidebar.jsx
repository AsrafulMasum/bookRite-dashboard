import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import booking from "../../assets/booking.svg";
import faq from "../../assets/faq.svg";
import services from "../../assets/services.svg";
import users from "../../assets/users.svg";
import dashboard from "../../assets/dashboard.svg";
import { CiLogout } from "react-icons/ci";

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
      icon: <img src={dashboard} className="h-5" alt="booking icon" />,
    },
    {
      key: "/users",
      label: "Users",
      icon: <img src={users} className="h-6" alt="booking icon" />,
    },
    {
      key: "/artists",
      label: "Services",
      icon: <img src={services} className="h-6" alt="services icon" />,
    },
    {
      key: "/users",
      label: "Booking List",
      icon: <img src={booking} className="h-6" alt="booking icon" />,
    },
    {
      key: "/category",
      label: "FAQ",
      icon: <img src={faq} className="h-6" alt="faq icon" />,
    },
    {
      key: "/settings",
      label: "Settings",
      icon: <IoSettingsOutline className="text-2xl" />,
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
                  <span className="text-lg">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="absolute bottom-[0px] flex items-center gap-4 px-5 py-3 rounded-xl text-red-500 hover:bg-red-100 transition-all mt-4"
          >
            <CiLogout size={24} />
            <span className="text-lg">Log Out</span>
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
