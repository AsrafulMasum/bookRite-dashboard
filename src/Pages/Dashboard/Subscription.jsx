import { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { IoCheckmarkCircle } from "react-icons/io5";
import AddInputFrom from "../../components/dashboard/AddInputForm";
import EditInputFrom from "../../components/dashboard/EditInputForm";
import {
  useDeleteSubscriptionMutation,
  useGetSubscriptionsQuery,
} from "../../redux/features/subscriptionApi";
import deleteIcon from "../../assets/delete.svg";
import toast from "react-hot-toast";

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
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [packages, setPackages] = useState([]);
  const [editPackage, setEditPackage] = useState(null);
  const { data: singleData, refetch } = useGetSubscriptionsQuery();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

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

  const handleDelete = async () => {
    try {
      const res = await deleteSubscription(deleteId);
      if (res?.data) {
        toast.success("Subscription deleted successfully");
        setShowDelete(false);
        setDeleteId("");
        refetch();
      } else {
        console.error("Failed to delete subscription:", res.error);
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      setShowDelete(false);
    }
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

      <div
        className="max-w-[320px] mx-auto mt-10 bg-[#F4F4F4] py-4 px-6 border border-[#B1B1FF] rounded-lg"
      >
        {/* <div className="flex justify-end items-center py-2">
          <div
            onClick={() => {
              setDeleteId(singleData?._id);
              setShowDelete(true);
            }}
            className="cursor-pointer bg-[#0304FF1A] rounded-full p-2"
          >
            <img className="w-5 h-5" src={deleteIcon} alt="Delete Icon" />
          </div>
        </div> */}
        <h4 className="text-text text-xl font-medium text-center pb-2.5">
          Get {singleData?.title} Package
        </h4>
        <p className="text-sub_title text-sm leading-[148%] text-center pb-4">
          {singleData?.credit} % Service Fee Per Booking
        </p>
        <h4 className="text-text text-center pb-3">
          <span className="text-4xl font-semibold">$ {singleData?.price}</span>{" "}
          / per {singleData?.duration?.split(" ")[1]}
        </h4>
        <div className="space-y-4">
          {singleData?.description?.map((details, idx) => (
            <div className="flex gap-2" key={idx}>
              <IoCheckmarkCircle className="min-w-[24px] text-[#00BA00]" />
              <p className="text-xs text-sub_title leading-[148%]">{details}</p>
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

      {/* edit modal */}
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
          <EditInputFrom
            packageData={editPackage}
            refetch={refetch}
            setOpenEditModal={setOpenEditModal}
          />
        </div>
      </Modal>

      {/* add modal */}
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
          <AddInputFrom refetch={refetch} setOpenAddModel={setOpenAddModel} />
        </div>
      </Modal>

      {/* delete modal */}
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#3536FF] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
