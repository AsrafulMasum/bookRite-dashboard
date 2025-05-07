import React, { useState } from "react";
import { ConfigProvider, Pagination } from "antd";
import {
  useNotificationQuery,
  useReadMutation,
} from "../../redux/apiSlices/notificationSlice";
import toast from "react-hot-toast";
import bell from "../../assets/bell.svg";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const { data: notifications } = useNotificationQuery();
  const [read] = useReadMutation();

  const handleRead = async () => {
    try {
      await read()
        .unwrap()
        .then(({ status, message }) => {
          if (status) {
            toast.success(message);
          }
        });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px]">All Notifications</h2>
        <button className="bg-primary text-white h-10 px-4 rounded-md">
          Read All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {[...Array(8).keys()].map((notification, index) => {
          return (
            <div
              key={index}
              className="border-b-[1px] pb-2 border-[#d9d9d9] flex items-center gap-3"
            >
              <img
                className="object-cover"
                style={{
                  backgroundColor: "#E7F0EF",
                  padding: "8px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                src={bell}
              />
              <div>
                <p>
                  <span>Sanchez haro manuel</span> start a new trip at 5pm. Trip
                  No.56. Trip started from Mexico city
                </p>
                <p style={{ color: "gray", marginTop: "4px" }}>1hr ago</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-6">
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#3536FF",
                borderRadius: "100%",
              },
            },
            token: {
              colorPrimary: "white",
            },
          }}
        >
          <Pagination
            current={parseInt(page)}
            total={50}
            onChange={(page) => setPage(page)}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Notifications;
