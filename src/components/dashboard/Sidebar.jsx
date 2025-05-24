import { useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLock, CiLogout, CiUser } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { PiInfoThin } from "react-icons/pi";
import logo from "../../assets/logo.svg";
import booking from "../../assets/booking.svg";
import faq from "../../assets/faq.svg";
import setting from "../../assets/setting.svg";
import services from "../../assets/services.svg";
import users from "../../assets/users.svg";
import dashboard from "../../assets/dashboard.svg";
import privacy from "../../assets/privacy.svg";
import terms from "../../assets/terms.svg";
import subscription from "../../assets/subscription.svg";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  }, [navigate]);

  const menuItems = useMemo(() => [
    {
      key: "/",
      label: "Dashboard",
      icon: <img src={dashboard} className="h-5" alt="dashboard icon" />,
    },
    {
      key: "/users",
      label: "Users",
      icon: <img src={users} className="h-6" alt="users icon" />,
    },
    {
      key: "/services",
      label: "Category",
      icon: <img src={services} className="h-6" alt="services icon" />,
    },
    {
      key: "/bookings",
      label: "Booking List",
      icon: <img src={booking} className="h-6" alt="booking icon" />,
    },
    {
      key: "/subscriptions",
      label: "Subscriptions",
      icon: <img src={subscription} className="h-6" alt="subscription icon" />,
    },
    {
      key: "/faq",
      label: "FAQ",
      icon: <img src={faq} className="h-6" alt="faq icon" />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <img src={setting} className="h-6" alt="settings icon" />,
      submenu: [
        {
          key: "/settings/change-password",
          label: "Change Password",
          icon: <CiLock className="text-2xl" />,
        },
        {
          key: "/settings/profile",
          label: "Profile",
          icon: <CiUser className="text-2xl" />,
        },
        {
          key: "/settings/about-us",
          label: "About Us",
          icon: <PiInfoThin className="text-2xl" />,
        },
        {
          key: "/settings/privacy-policy",
          label: "Privacy Policy",
          icon: <img src={privacy} className="h-[22px] pl-1" alt="icon" />,
        },
        {
          key: "/settings/terms-and-conditions",
          label: "Terms of Services",
          icon: <img src={terms} className="h-6" alt="icon" />,
        },
      ],
    },
  ], []);

  const isMenuActive = useCallback(
    (item) =>
      path === item.key ||
      (item.submenu && item.submenu.some((sub) => path === sub.key)),
    [path]
  );

  const isSubActive = useCallback(
    (sub) => path === sub.key,
    [path]
  );

  const toggleMenu = useCallback(
    (key) => setOpenMenu(openMenu === key ? null : key),
    [openMenu]
  );

  return (
    <div className="min-h-screen w-dvw">
      <aside className="fixed top-[30px] bottom-[30px] bg-[#E6E6FF66] rounded-tr-[16px] rounded-br-[16px] py-6 overflow-y-auto max-h-screen pr-28 min-[1700px]:pr-40">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="relative h-[75vh]">
          <div className="flex flex-col gap-5">
            {menuItems.map((item) => {
              const active = isMenuActive(item);
              const isSubmenuOpen = openMenu === item.key;
              return (
                <div key={item.key}>
                  {item.submenu ? (
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className={`w-full flex items-center gap-4 px-[22px] py-2.5 transition-all text-[#757575] relative`}
                    >
                      {active && (
                        <span className="absolute left-0 top-0 h-full w-[8px] bg-primary rounded-r-md"></span>
                      )}
                      <span className="text-[20px]">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                      <span className="text-[20px] ml-auto">
                        <IoIosArrowDown
                          className={`transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.key}
                      className={`flex items-center gap-4 px-[22px] py-2.5 transition-all text-[#757575] relative`}
                    >
                      {active && (
                        <span className="absolute left-0 top-0 h-full w-[8px] bg-primary rounded-r-md"></span>
                      )}
                      <span className="text-[20px]">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.submenu && isSubmenuOpen && (
                    <div className="flex flex-col gap-2 pt-2 pl-5">
                      {item.submenu.map((sub) => (
                        <Link
                          to={sub.key}
                          key={sub.key}
                          className={`flex items-center gap-4 py-1 rounded transition-all ${
                            isSubActive(sub) ? "text-primary" : "text-[#757575]"
                          }`}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="absolute bottom-0 flex items-center gap-4 px-5 py-3 rounded-xl text-red-500 mt-4"
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