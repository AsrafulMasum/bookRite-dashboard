import React, { useMemo } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import { useUser } from "../../provider/User";

const Header = () => {
  const { user } = useUser();
  const { image, name } = user || {};

  const src = useMemo(() => {
    if (!image) return "/logo.svg"; // fallback image
    return image.startsWith("https") ? image : `${imageUrl}/${image}`;
  }, [image]);

  return (
    <div className="flex items-center gap-8 justify-end bg-secondary h-20 mt-8 ml-14 mr-6 rounded-lg p-5">
      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge count={1}>
          <FaRegBell color="#757575" size={20} />
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
          {(name || "User")}
        </p>
      </Link>
    </div>
  );
};

export default Header;