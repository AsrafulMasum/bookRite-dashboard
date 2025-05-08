import { Button, ConfigProvider, Modal, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import deleteIcon from "../../assets/delete.svg";
import Swal from "sweetalert2";
import { PlusOutlined } from "@ant-design/icons";
import { FaRegEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const data = [
  {
    key: "1",
    category: "Maintenance",
    serviceType: "Plumbing Repair",
    price: 135,
    serviceImage:
      "https://i.ibb.co.com/TxDMxFpF/8a93140310fbd10e3adba404ff4c8d0fee3446ba.png",
    createdAt: "2024-07-22T00:00:00",
  },
  {
    key: "2",
    category: "Cleaning",
    serviceType: "Window Cleaning",
    price: 75,
    serviceImage:
      "https://i.ibb.co.com/TxDMxFpF/8a93140310fbd10e3adba404ff4c8d0fee3446ba.png",
    createdAt: "2024-07-15T00:00:00",
  },
  {
    key: "3",
    category: "Maintenance",
    serviceType: "Tile Fixing",
    price: 197,
    serviceImage: "https://via.placeholder.com/100x60?text=Tile+Fixing",
    createdAt: "2024-07-14T00:00:00",
  },
  {
    key: "4",
    category: "HVAC",
    serviceType: "Heater Repair",
    price: 162,
    serviceImage: "https://via.placeholder.com/100x60?text=Heater+Repair",
    createdAt: "2024-07-24T00:00:00",
  },
  {
    key: "5",
    category: "Cleaning",
    serviceType: "Window Cleaning",
    price: 172,
    serviceImage: "https://via.placeholder.com/100x60?text=Window+Cleaning",
    createdAt: "2024-07-13T00:00:00",
  },
  {
    key: "6",
    category: "Cleaning",
    serviceType: "Window Cleaning",
    price: 193,
    serviceImage: "https://via.placeholder.com/100x60?text=Window+Cleaning",
    createdAt: "2024-07-07T00:00:00",
  },
  {
    key: "7",
    category: "Maintenance",
    serviceType: "Faucet Installation",
    price: 170,
    serviceImage: "https://via.placeholder.com/100x60?text=Faucet+Installation",
    createdAt: "2024-07-31T00:00:00",
  },
  {
    key: "8",
    category: "Electrical",
    serviceType: "Ceiling Fan Installation",
    price: 117,
    serviceImage:
      "https://via.placeholder.com/100x60?text=Ceiling+Fan+Installation",
    createdAt: "2024-07-29T00:00:00",
  },
  {
    key: "9",
    category: "Gardening",
    serviceType: "Tree Trimming",
    price: 160,
    serviceImage: "https://via.placeholder.com/100x60?text=Tree+Trimming",
    createdAt: "2024-07-30T00:00:00",
  },
  {
    key: "10",
    category: "Cleaning",
    serviceType: "Window Cleaning",
    price: 95,
    serviceImage: "https://via.placeholder.com/100x60?text=Window+Cleaning",
    createdAt: "2024-07-08T00:00:00",
  },
  {
    key: "11",
    category: "Maintenance",
    serviceType: "Tile Fixing",
    price: 165,
    serviceImage: "https://via.placeholder.com/100x60?text=Tile+Fixing",
    createdAt: "2024-07-24T00:00:00",
  },
  {
    key: "12",
    category: "Electrical",
    serviceType: "Ceiling Fan Installation",
    price: 163,
    serviceImage:
      "https://via.placeholder.com/100x60?text=Ceiling+Fan+Installation",
    createdAt: "2024-07-05T00:00:00",
  },
  {
    key: "13",
    category: "Gardening",
    serviceType: "Tree Trimming",
    price: 97,
    serviceImage: "https://via.placeholder.com/100x60?text=Tree+Trimming",
    createdAt: "2024-07-13T00:00:00",
  },
  {
    key: "14",
    category: "HVAC",
    serviceType: "AC Servicing",
    price: 162,
    serviceImage: "https://via.placeholder.com/100x60?text=AC+Servicing",
    createdAt: "2024-07-10T00:00:00",
  },
  {
    key: "15",
    category: "Maintenance",
    serviceType: "Faucet Installation",
    price: 145,
    serviceImage: "https://via.placeholder.com/100x60?text=Faucet+Installation",
    createdAt: "2024-07-07T00:00:00",
  },
  {
    key: "16",
    category: "HVAC",
    serviceType: "Heater Repair",
    price: 110,
    serviceImage: "https://via.placeholder.com/100x60?text=Heater+Repair",
    createdAt: "2024-07-12T00:00:00",
  },
  {
    key: "17",
    category: "Maintenance",
    serviceType: "Faucet Installation",
    price: 193,
    serviceImage: "https://via.placeholder.com/100x60?text=Faucet+Installation",
    createdAt: "2024-07-10T00:00:00",
  },
  {
    key: "18",
    category: "Electrical",
    serviceType: "Wiring Inspection",
    price: 116,
    serviceImage: "https://via.placeholder.com/100x60?text=Wiring+Inspection",
    createdAt: "2024-07-08T00:00:00",
  },
  {
    key: "19",
    category: "Cleaning",
    serviceType: "Window Cleaning",
    price: 71,
    serviceImage: "https://via.placeholder.com/100x60?text=Window+Cleaning",
    createdAt: "2024-07-15T00:00:00",
  },
  {
    key: "20",
    category: "Gardening",
    serviceType: "Tree Trimming",
    price: 172,
    serviceImage: "https://via.placeholder.com/100x60?text=Tree+Trimming",
    createdAt: "2024-07-21T00:00:00",
  },
];

const Users = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  // const { data: users } = useUsersQuery({ page: page, search: search });
  const [value, setValue] = useState(null);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [image, setImage] = useState();
  const [imgURL, setImgURL] = useState();

  const onChange = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgURL(imgUrl);
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const ans = e.target.ans.value;
    if (!question || !ans) {
      return false;
    }
    console.log(question, ans);
  };

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
      title: "Service",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <p>${record?.price}</p>,
    },
    {
      title: "Service Image",
      dataIndex: "serviceImage",
      key: "serviceImage",
      render: (_, record) => (
        <div>
          <img
            className="h-6 w-6 object-cover"
            src={record?.serviceImage}
            alt=""
          />
        </div>
      ),
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
          <CiEdit
            className="cursor-pointer text-2xl text-[#F78F08]"
            onClick={() => setValue(record)}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            color: "#333333",
            fontSize: 24,
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          Services
        </h3>
        <div>
          <Button
            onClick={() => setOpenAddModel(true)}
            style={{
              width: "177px",
              height: "40px",
              boxShadow: "0px 2px 4px 0px #0000001A",
              backgroundColor: "#3536FF",
              border: "none",
              transition: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            <span style={{ margin: 0 }}>Add Service</span>
          </Button>
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
          dataSource={data}
          pagination={{
            current: parseInt(page),
            onChange: (page) => setPage(page),
          }}
          className="custom-table"
        />
      </ConfigProvider>

      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1
            className=" text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Add Service
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-10 mb-10">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  onChange={onChange}
                  type="file"
                  name=""
                  id="img"
                  style={{ display: "none" }}
                />
                <label
                  className="relative"
                  htmlFor="img"
                  style={{
                    width: "120px",
                    height: "120px",
                    cursor: "pointer",
                    borderRadius: "100%",
                    border: "2px solid #3F857B",
                    background: "white",
                    backgroundImage: `url(${imgURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="absolute right-0 bottom-0"
                    style={{
                      borderRadius: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaRegEdit size={22} color="#FED12F" />
                  </div>
                </label>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Service
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Enter Service Name"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="service"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Service Type
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Enter Service Type"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="serviceType"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Price
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Price"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="price"
              />
            </div>

            <input
              className="cursor-pointer"
              htmlType="submit"
              block
              style={{
                border: "none",
                height: "44px",
                background: "#3536FF",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value={`Save & change`}
              type="submit"
            />
          </form>
        </div>
      </Modal>

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
