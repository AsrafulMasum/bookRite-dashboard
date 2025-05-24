import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { IoCheckmarkCircle } from "react-icons/io5";
import AddInputFrom from "../../components/dashboard/AddInputForm";
import EditInputFrom from "../../components/dashboard/EditInputForm";
import { useGetSubscriptionsQuery } from "../../redux/features/subscriptionApi";

const initialPackages = [
  {
    id: "basic",
    packageName: "Basic",
    packageFees: 5,
    packagePrice: 30,
    packageDetails: [
      "10 days free trial",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
    ],
  },
  {
    id: "gold",
    packageName: "Gold",
    packageFees: 3,
    packagePrice: 110,
    packageDetails: [
      "10 days free trial",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
    ],
  },
  {
    id: "premium",
    packageName: "Premium",
    packageFees: 0,
    packagePrice: 180,
    packageDetails: [
      "10 days free trial",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
      "It is a long established fact that a reader will be distracted by the readable content",
    ],
  },
];

const Subscription = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [packages, setPackages] = useState(initialPackages);
  const [editPackage, setEditPackage] = useState(null);
  const { data } = useGetSubscriptionsQuery();
  console.log(data);

  // Open edit modal for a specific package
  const handleEditClick = (pkg) => {
    setEditPackage(pkg);
    setOpenEditModal(true);
  };

  // Close edit modal
  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditPackage(null);
  };

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Subscription</h2>
        <Button
          onClick={() => setOpenAddModel(true)}
          style={{
            width: "200px",
            height: "40px",
            boxShadow: "0px 2px 4px 0px #0000001A",
            backgroundColor: "#3536FF",
            border: "none",
            transition: "none",
            color: "#fff",
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <PlusOutlined />
          <span>Create Subscription</span>
        </Button>
      </div>

      <div className="flex justify-center items-center gap-10 mt-10">
        {packages.map((singleData) => (
          <div
            key={singleData.id}
            className="max-w-[320px] bg-[#F4F4F4] py-4 px-6 border border-[#B1B1FF] rounded-lg"
          >
            <h4 className="text-text text-xl font-medium text-center pb-2.5">
              Get {singleData.packageName} Package
            </h4>
            <p className="text-sub_title text-sm leading-[148%] text-center pb-4">
              {singleData.packageFees} % Service Fee Per Booking
            </p>
            <h4 className="text-text text-center pb-3">
              <span className="text-4xl font-semibold">
                $ {singleData.packagePrice}
              </span>{" "}
              / per year
            </h4>
            <div className="space-y-4">
              {singleData.packageDetails.map((details, idx) => (
                <div className="flex gap-2" key={idx}>
                  <IoCheckmarkCircle className="min-w-[24px] text-[#00BA00]" />
                  <p className="text-xs text-sub_title leading-[148%]">
                    {details}
                  </p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleEditClick(singleData)}
              style={{
                width: "100%",
                height: 40,
                marginTop: "24px",
                backgroundColor: "#3536FF",
                color: "white",
                fontSize: "16px",
                fontWeight: "500",
                borderRadius: "8px",
              }}
            >
              Edit Package
            </Button>
          </div>
        ))}
      </div>

      <Modal
        centered
        open={openEditModal}
        onCancel={handleEditModalClose}
        width={600}
        footer={false}
      >
        <div className="p-6">
          <h1
            className="text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Edit Package
          </h1>
          <EditInputFrom packageData={editPackage} />
        </div>
      </Modal>

      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={600}
        footer={false}
      >
        <div className="p-6">
          <h1
            className="text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Add Package
          </h1>
          <AddInputFrom />
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
