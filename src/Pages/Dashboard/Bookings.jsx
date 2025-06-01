import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import moment from "moment";
import { use } from "react";
import { useCallback, useMemo, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { useGetBookingsQuery } from "../../redux/features/bookingsApi";
import { imageUrl } from "../../redux/api/baseApi";
import { FiSearch } from "react-icons/fi";

const itemsPerPage = 10;

const Users = () => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(null);
  const { data } = useGetBookingsQuery();
  const bookingsData = data?.data;

  const handleInfoClick = (record) => {
    setValue(record);
  };

  const handleModalClose = () => {
    setValue(null);
  };

  const columns = useMemo(
    () => [
      {
        title: "Serial ID",
        dataIndex: "name",
        key: "name",
        render: (_, __, index) => (
          <p>{(page - 1) * itemsPerPage + index + 1}</p>
        ),
      },
      {
        title: "User Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, record) => (
          <div className="flex items-center gap-2">
            <p>{record?.userId?.name}</p>
          </div>
        ),
      },
      {
        title: "Provider",
        dataIndex: "provider",
        key: "provider",
        render: (_, record) => (
          <div className="flex items-center gap-2">
            <p>{record?.serviceProviderId?.name}</p>
          </div>
        ),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (_, record) => (
          <div className="flex items-center gap-2">
            <p>{record?.serviceType}</p>
          </div>
        ),
      },
      {
        title: "Service Location",
        dataIndex: "serviceLocation",
        key: "serviceLocation",
        render: (_, record) => (
          <div className="flex items-center gap-2">
            <p>{record?.location}</p>
          </div>
        ),
      },
      {
        title: "Appt. Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_, record) => <p>{moment(record?.bookingDate).format("L")}</p>,
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        align: "right",
        render: (_, record) => (
          <div className="flex justify-end pr-4">
            <BsInfoCircle
              className="text-lg text-[#F78F08] cursor-pointer"
              onClick={() => handleInfoClick(record)}
            />
          </div>
        ),
      },
    ],
    [page, handleInfoClick]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>
          Bookings List
        </h2>
      </div>

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
        <Table
          columns={columns}
          dataSource={bookingsData}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: itemsPerPage,
            onChange: setPage,
          }}
          className="custom-table"
        />
      </ConfigProvider>

      <Modal open={!!value} onCancel={handleModalClose} footer={false}>
        <div className="p-4">
          <div>
            <h4 className="text-xl text-[#333] font-medium mt-[35px]">
              Client Information
            </h4>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="pb-[5px]">User Name</p>
                <p className="pb-[5px]">Email</p>
                <p className="pb-[5px]">Service</p>
                <p>Start Date</p>
              </div>
              <div>
                <p className="pb-[5px] text-right">
                  {value?.userId?.name || "No name available"}
                </p>
                <p className="pb-[5px] text-right">
                  {value?.userId?.email || "No email available"}
                </p>
                <p className="pb-[5px] text-right">
                  {value?.serviceType || "No service available"}
                </p>
                <p className="text-right">
                  {moment(value?.userId?.createdAt).format("L") ||
                    "No date available"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl text-[#333] font-medium mt-[35px]">
              Service Provider Information
            </h4>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="pb-[5px]">Provider Name</p>
                <p className="pb-[5px]">Email</p>
                <p className="pb-[5px]">Service</p>
                <p>Start Date</p>
              </div>
              <div>
                <p className="pb-[5px] text-right">
                  {value?.serviceProviderId?.name || "No name available"}
                </p>
                <p className="pb-[5px] text-right">
                  {value?.serviceProviderId?.email || "No email available"}
                </p>
                <p className="pb-[5px] text-right">
                  {value?.serviceType || "No service available"}
                </p>
                <p className="text-right">
                  {moment(value?.serviceProviderId?.createdAt).format("L") ||
                    "No date available"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl text-[#333] font-medium mt-[35px]">
              Service Information
            </h4>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="pb-[5px]">Category</p>
                <p className="pb-[5px]">Service Name</p>
                <p className="pb-[5px] h-10">Service Image</p>
                <p className="pb-[5px]">Price</p>
                <p className="pb-[5px]">Booking Date</p>
                <p>Status</p>
              </div>
              <div>
                <p className="pb-[5px] text-right">
                  {value?.serviceType || "No service available"}
                </p>
                <p className="pb-[5px] text-right">
                  {value?.serviceId?.serviceName || "No service name available"}
                </p>
                <div className="pb-[5px] flex justify-end h-10">
                  {value?.serviceId?.image ? (
                    <img
                      className="h-10 w-10 object-cover"
                      src={
                        value?.serviceId?.image &&
                        value?.serviceId?.image.startsWith("https")
                          ? value?.serviceId?.image
                          : value?.serviceId?.image
                          ? `${imageUrl}${value?.serviceId?.image}`
                          : "/default-avatar.png"
                      }
                      alt="Service"
                    />
                  ) : (
                    "No Image available"
                  )}
                </div>
                <p className="pb-[5px] text-right">
                  $ {value?.serviceId?.price}
                </p>
                <p className="pb-[5px] text-right">
                  {moment(value?.bookingDate).format("L") || ""}
                </p>
                <Select
                  disabled
                  value={value?.status}
                  style={{ width: 200 }}
                  options={[
                    { value: "ongoing", label: "Ongoing" },
                    { value: "cancel", label: "Cancel" },
                    { value: "completed", label: "Completed" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
