import { useEffect, useState } from "react";
import axios from "axios";

const useReverseGeocode = (coordinates) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      if (!coordinates || coordinates.length !== 2) return;

      try {
        const { data } = await axios.get("https://nominatim.openstreetmap.org/reverse", {
          params: {
            lat: coordinates[1], // latitude
            lon: coordinates[0], // longitude
            format: "json",
          },
        });

        setAddress(data?.display_name || "Unknown location");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Failed to load location");
      }
    };

    fetchAddress();
  }, [coordinates]);

  return address;
};

export default useReverseGeocode;
