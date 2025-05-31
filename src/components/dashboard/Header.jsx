import React, { useMemo } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import { useProfileQuery } from "../../redux/features/authApi";
import { useGetNotificationsQuery } from "../../redux/features/notificationApi";

const Header = () => {
  const { data: user } = useProfileQuery();
  const { profile, name, role } = user || {};
  const { data: notifications } = useGetNotificationsQuery();

  const unReadNotifications = useMemo(() => {
    if (!notifications) return 0;
    return notifications.filter((notification) => !notification.read).length;
  }, [notifications]);

  const src = useMemo(() => {
    if (!profile) return "/logo.svg"; // fallback image
    return profile.startsWith("https") ? profile : `${imageUrl}${profile}`;
  }, [profile]);

  return (
    <div className="flex items-center gap-8 justify-end bg-secondary h-20 mt-8 ml-14 mr-6 rounded-lg p-5">
      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge count={unReadNotifications? unReadNotifications : 0}>
          <FaRegBell color="#757575" size={24} />
        </Badge>
      </Link>

      <Link to="/profile" className="flex items-center gap-3">
        <img
          style={{
            clipPath: "circle()",
            width: 45,
            height: 45,
            objectFit: "cover",
          }}
          src={src}
          alt="User avatar"
        />
        <p>
          {name || "User"}
        </p>
      </Link>
    </div>
  );
};

export default Header;
