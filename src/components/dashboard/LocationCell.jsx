import React from "react";
import { Tooltip } from "antd";
import useReverseGeocode from "../../hooks/useReverseGeocode";


const truncate = (text, maxLength = 25) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const LocationCell = ({ location }) => {
  if (typeof location === "string") {
    return (
      <Tooltip title={location}>
        <p>{truncate(location)}</p>
      </Tooltip>
    );
  }

  const address = useReverseGeocode(location?.coordinates);

  return (
    <Tooltip title={address || "Loading location..."}>
      <p>{truncate(address)}</p>
    </Tooltip>
  );
};

export default LocationCell;
