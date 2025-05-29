import { useState, useCallback } from "react";
import { ConfigProvider, Pagination } from "antd";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "../../redux/features/notificationApi";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { data: notifications } = useGetNotificationsQuery();
  const [readNotification] = useReadNotificationMutation();
  console.log(notifications);
  const paginatedData = notifications?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleRead = async () => {
    try {
      const { success, message } = await readNotification().unwrap();
      if (success) toast.success(message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handlePageChange = (page) => setPage(page);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px]">All Notifications</h2>
        <button
          className="bg-primary text-white h-10 px-4 rounded-md"
          onClick={handleRead}
        >
          Read All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {paginatedData?.map((notification) => (
          <div
            key={notification?._id}
            className={`border-b-[1px] pb-2 border-[#d9d9d9] flex items-center gap-3 ${
              notification?.read === false && "bg-[#F5F5F5]"
            }`}
          >
            <div className="p-2 rounded-full bg-secondary">
              <IoIosNotificationsOutline className="text-2xl text-primary" />
            </div>
            <div>
              <p>{notification?.text}</p>
              <p style={{ color: "gray", marginTop: "4px" }}>
                {formatDistanceToNow(new Date(notification?.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))}
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
            current={page}
            total={notifications?.length}
            onChange={handlePageChange}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Notifications;
