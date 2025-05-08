import { ConfigProvider, Modal, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import eye from "../../assets/eye.svg";
import deleteIcon from "../../assets/delete.svg";
import Swal from "sweetalert2";

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Doe",
    category: "Home Service",
    email: "john.doe@example.com",
    mobileNumber: "+1234567890",
    createdAt: "2024-05-01T10:00:00Z",
  },
  {
    key: "2",
    firstName: "Jane",
    lastName: "Smith",
    category: "Home Service",
    email: "jane.smith@example.com",
    mobileNumber: "+1987654321",
    createdAt: "2024-06-15T08:30:00Z",
  },
  {
    key: "3",
    firstName: "Alice",
    lastName: "Johnson",
    category: "Home Service",
    email: "alice.johnson@example.com",
    mobileNumber: "+1112233445",
    createdAt: "2024-07-20T12:45:00Z",
  },
  {
    key: "4",
    firstName: "Bob",
    lastName: "Williams",
    category: "Home Service",
    email: "bob.williams@example.com",
    mobileNumber: "+1123456789",
    createdAt: "2024-03-18T14:00:00Z",
  },
  {
    key: "5",
    firstName: "Emma",
    lastName: "Brown",
    category: "Home Service",
    email: "emma.brown@example.com",
    mobileNumber: "+9988776655",
    createdAt: "2024-04-10T09:15:00Z",
  },
  {
    key: "6",
    firstName: "Liam",
    lastName: "Davis",
    category: "Home Service",
    email: "liam.davis@example.com",
    mobileNumber: "+5566778899",
    createdAt: "2024-01-25T17:30:00Z",
  },
  {
    key: "7",
    firstName: "Olivia",
    lastName: "Garcia",
    category: "Home Service",
    email: "olivia.garcia@example.com",
    mobileNumber: "+1234987654",
    createdAt: "2024-02-10T10:20:00Z",
  },
  {
    key: "8",
    firstName: "Noah",
    lastName: "Martinez",
    category: "Home Service",
    email: "noah.martinez@example.com",
    mobileNumber: "+7865432190",
    createdAt: "2024-08-08T11:00:00Z",
  },
  {
    key: "9",
    firstName: "Sophia",
    lastName: "Rodriguez",
    category: "Home Service",
    email: "sophia.rodriguez@example.com",
    mobileNumber: "+2223334444",
    createdAt: "2024-06-03T16:15:00Z",
  },
  {
    key: "10",
    firstName: "James",
    lastName: "Lee",
    category: "Home Service",
    email: "james.lee@example.com",
    mobileNumber: "+3216549870",
    createdAt: "2024-05-21T13:10:00Z",
  },
  {
    key: "11",
    firstName: "Isabella",
    lastName: "Walker",
    category: "Home Service",
    email: "isabella.walker@example.com",
    mobileNumber: "+6543219870",
    createdAt: "2024-01-05T15:00:00Z",
  },
  {
    key: "12",
    firstName: "Ethan",
    lastName: "Hall",
    category: "Home Service",
    email: "ethan.hall@example.com",
    mobileNumber: "+3456789012",
    createdAt: "2024-03-12T08:25:00Z",
  },
  {
    key: "13",
    firstName: "Mia",
    lastName: "Allen",
    category: "Home Service",
    email: "mia.allen@example.com",
    mobileNumber: "+4343434343",
    createdAt: "2024-09-01T09:45:00Z",
  },
  {
    key: "14",
    firstName: "Alexander",
    lastName: "Young",
    category: "Home Service",
    email: "alex.young@example.com",
    mobileNumber: "+6565656565",
    createdAt: "2024-02-22T07:30:00Z",
  },
  {
    key: "15",
    firstName: "Charlotte",
    lastName: "Hernandez",
    category: "Home Service",
    email: "charlotte.hernandez@example.com",
    mobileNumber: "+7778889990",
    createdAt: "2024-04-30T13:50:00Z",
  },
  {
    key: "16",
    firstName: "Benjamin",
    lastName: "King",
    category: "Home Service",
    email: "ben.king@example.com",
    mobileNumber: "+9090909090",
    createdAt: "2024-07-11T14:35:00Z",
  },
  {
    key: "17",
    firstName: "Amelia",
    lastName: "Wright",
    category: "Home Service",
    email: "amelia.wright@example.com",
    mobileNumber: "+8181818181",
    createdAt: "2024-10-09T10:05:00Z",
  },
  {
    key: "18",
    firstName: "Lucas",
    lastName: "Lopez",
    category: "Home Service",
    email: "lucas.lopez@example.com",
    mobileNumber: "+2323232323",
    createdAt: "2024-11-13T11:40:00Z",
  },
  {
    key: "19",
    firstName: "Harper",
    lastName: "Scott",
    category: "Home Service",
    email: "harper.scott@example.com",
    mobileNumber: "+5656565656",
    createdAt: "2024-12-01T09:30:00Z",
  },
  {
    key: "20",
    firstName: "Henry",
    lastName: "Green",
    category: "Home Service",
    email: "henry.green@example.com",
    mobileNumber: "+7878787878",
    createdAt: "2024-08-25T12:10:00Z",
  },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  // const { data: users } = useUsersQuery({ page: page, search: search });
  const [value, setValue] = useState(null);

  const handleDelete = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3536FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#3536FF",
        });
      }
    });
  };

  const columns = [
    {
      title: "Serial ID",
      dataIndex: "name",
      key: "name",
      render: (_, record, index) => (
        <p>{(page - 1) * itemsPerPage + index + 1}</p>
      ),
    },
    {
      title: "User Name",
      dataIndex: "artist",
      key: "artist",
      render: (_, record, index) => (
        <div className="flex items-center gap-2">
          <p>
            {record?.firstName} {record?.lastName}
          </p>
        </div>
      ),
    },
    {
      title: "Service Type",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Date",
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
          <img
            className="cursor-pointer"
            onClick={() => setValue(record)}
            src={eye}
            alt="View Icon"
          />
          <img
            className="cursor-pointer"
            onClick={() => handleDelete(record)}
            src={deleteIcon}
            alt="Delete Icon"
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>User List</h2>
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
          dataSource={data}
          pagination={{
            current: parseInt(page),
            onChange: (page) => setPage(page),
          }}
          className="custom-table"
        />
      </ConfigProvider>

      <Modal
        open={value}
        onCancel={() => setValue(null)}
        onClose={() => setValue(null)}
        footer={false}
      >
        <div>
          {/* <img
            width={120}
            style={{ borderRadius: "12px", margin: "0 auto" }}
            src={
              value?.image?.startsWith("https")
                ? value?.image
                : `${imageUrl}${value?.image}`
            }
            alt=""
          /> */}

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
                {value?.firstName} {value?.firstName}{" "}
              </p>
              <p className="pb-[5px] text-right">
                {value?.email ? value?.email : "Not Added yet"}
              </p>
              <p className="pb-[5px] text-right">
                {value?.mobileNumber ? value?.mobileNumber : "Not Added yet"}
              </p>
              <p className="pb-[5px] text-right">
                {value?.appId ? "Cloth wash" : "Home Service"}
              </p>
              <p className="text-right">05 jun,2025</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Users;
