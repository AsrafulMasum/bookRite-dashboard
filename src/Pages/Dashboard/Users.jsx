import { ConfigProvider, Input, Modal, Table } from "antd";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { useGetUsersQuery } from "../../redux/features/usersApi";
import { FiSearch } from "react-icons/fi";

const itemsPerPage = 10;

const Users = () => {
  const [srcText, setSrcText] = useState("");
  const { data: usersData } = useGetUsersQuery(srcText);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(null);
  const users = usersData?.data?.data;

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
            <p>{record?.name}</p>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Contact Number",
        dataIndex: "contact",
        key: "contact",
      },
      {
        title: "Start Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_, record) => <p>{moment(record?.createdAt).format("L")}</p>,
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        align: "right",
        render: (_, record) => (
          <div className="flex justify-end gap-8">
            <BsInfoCircle
              className="text-lg text-[#F78F08] cursor-pointer"
              onClick={() => setValue(record)}
            />
          </div>
        ),
      },
    ],
    [page]
  );

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSrcText(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>User List</h2>
        <div
          style={{
            width: "353px",
            height: "40px",
            borderRadius: "8px",
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#3536FF",
              },
            }}
          >
            <Input
              placeholder="Search..."
              onChange={handleSearchChange}
              prefix={<FiSearch size={14} color="#868FA0" />}
              style={{
                width: "100%",
                height: "100%",
                fontSize: "14px",
                backgroundColor: "#FAFAFA",
              }}
              size="middle"
            />
          </ConfigProvider>
        </div>
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
          dataSource={users}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: itemsPerPage,
            onChange: setPage,
          }}
          className="custom-table"
        />
      </ConfigProvider>

      <Modal
        centered
        open={!!value}
        onCancel={() => setValue(null)}
        footer={false}
      >
        <div>
          <div className="flex justify-center">
            <img
              className="h-36 w-36 rounded-full object-cover"
              src={
                value?.profile && value?.profile.startsWith("https")
                  ? value?.profile
                  : value?.profile
                  ? `${imageUrl}${value?.profile}`
                  : "/default-avatar.png"
              }
              alt=""
            />
          </div>
          <div className="flex items-center justify-between mt-[35px]">
            <div>
              <p className="pb-[5px]">User Name</p>
              <p className="pb-[5px]">Email</p>
              <p className="pb-[5px]">Contact Number</p>
              <p className="pb-[5px]">Service Type</p>
              <p>Start Date</p>
            </div>
            <div>
              <p className="pb-[5px] text-right">
                {value?.name || "No name available"}
              </p>
              <p className="pb-[5px] text-right">
                {value?.email || "Not Added yet"}
              </p>
              <p className="pb-[5px] text-right">
                {value?.contact || "Not Added yet"}
              </p>
              <p className="pb-[5px] text-right">
                {value?.category || "Not Added yet"}
              </p>
              <p className="text-right">
                {value?.createdAt ? moment(value.createdAt).format("L") : ""}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Users;
