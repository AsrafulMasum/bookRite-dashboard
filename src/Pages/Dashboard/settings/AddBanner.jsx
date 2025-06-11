import { Button, ConfigProvider, Modal, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import deleteIcon from "../../../assets/delete.svg";
import { PlusOutlined } from "@ant-design/icons";
import { CiEdit, CiImageOn } from "react-icons/ci";
import { imageUrl } from "../../../redux/api/baseApi";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import {
  useCreateBannerMutation,
  useGetBannerQuery,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} from "../../../redux/features/bannerApi";

const AddBanner = () => {
  const { data: bannerData } = useGetBannerQuery();
  console.log(bannerData);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [data, setData] = useState(null);
  const [value, setValue] = useState(null);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [form, setForm] = useState({
    categoryName: "",
    image: "",
  });
  const [imgURL, setImgURL] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [imgEditURL, setImgEditURL] = useState("");
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  useEffect(() => {
    setData(bannerData?.data);
  }, [bannerData]);

  // Handle image upload
  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "categoryName") {
      setForm((prev) => ({ ...prev, categoryName: value }));
    } else if (name === "image" && files && files[0]) {
      const file = files[0];
      const imgUrl = URL.createObjectURL(file);
      setImgURL(imgUrl);
      setImageFile(file);
      setForm((prev) => ({ ...prev, serviceImage: imgUrl }));
    }
  };

  // Add new service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.categoryName);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await createBanner(formData).unwrap();
      setOpenAddModel(false);
      setForm({ categoryName: "", image: "" });
      setImgURL("");
      setImageFile(null);
      refetch();
      toast.success("Banner added successfully");
    } catch (err) {
      console.error("Add banner failed", err);
    }
  };

  // Edit service
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("CategoryName", form.categoryName);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      await updateBanner({
        id: value._id,
        body: formData,
      }).unwrap();
      setValue(null);
      setForm({ categoryName: "", image: "" });
      setImgEditURL("");
      setEditImageFile(null);
      refetch();
      toast.success("Service updated successfully");
    } catch (err) {
      console.error("Edit category failed", err);
    }
  };

  // Delete service
  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId).unwrap();
      setShowDelete(false);
      setDeleteId("");
      refetch();
      toast.success("Service deleted successfully");
    } catch (err) {
      console.error("Delete category failed", err);
    }
  };

  // Open edit modal and set form values
  const openEditModal = (record) => {
    setValue(record);
    setForm({
      categoryName: record.CategoryName || "",
      image: record.image || "",
    });
    setImgEditURL(
      record.image
        ? record.image.startsWith("http")
          ? record.image
          : `${imageUrl}${record.image}`
        : ""
    );
    setEditImageFile(null);
  };

  const onEditImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const imgUrl = URL.createObjectURL(file);
      setImgEditURL(imgUrl);
      setEditImageFile(file);
    }
  };

  const onEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      setForm((prev) => ({ ...prev, categoryName: value }));
    }
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
        title: "Banner Image",
        dataIndex: "image",
        key: "image",
        render: (_, record) => (
          <div>
            <img
              className="h-16 w-16 object-cover"
              src={
                record?.image && record?.image.startsWith("https")
                  ? record?.image
                  : record?.image
                  ? `${imageUrl}${record?.image}`
                  : "/default-avatar.png"
              }
              alt=""
            />
          </div>
        ),
      },
      {
        title: "Banner Name",
        dataIndex: "name",
        key: "name",
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
              onClick={() => openEditModal(record)}
            />
            <img
              className="cursor-pointer"
              onClick={() => {
                setDeleteId(record?._id);
                setShowDelete(true);
              }}
              src={deleteIcon}
              alt="Delete Icon"
            />
          </div>
        ),
      },
    ],
    [page, itemsPerPage, openEditModal]
  );

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
          Add Banner
        </h3>
        <div>
          <Button
            onClick={() => {
              setOpenAddModel(true);
              setForm({ category: "", serviceType: "", serviceImage: "" });
              setImgURL("");
            }}
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
            <span style={{ margin: 0 }}>Add Banner</span>
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
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: itemsPerPage,
            onChange: setPage,
          }}
          className="custom-table"
        />
      </ConfigProvider>

      {/* Add Modal */}
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Add Banner</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-10 mb-10">
              <div className="h-32 w-32 flex items-center justify-center bg-gray-300 rounded-full relative">
                {imgURL ? (
                  <img
                    className="w-full h-full z-10 rounded-full object-cover"
                    src={imgURL}
                    alt="preview img"
                  />
                ) : (
                  <CiImageOn className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                <input
                  onChange={onChange}
                  type="file"
                  id="img"
                  name="image"
                  className="display-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                />
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Banner Name
              </label>
              <input
                value={form.categoryName}
                onChange={onChange}
                type="text"
                placeholder="Enter Banner Name"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="categoryName"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                border: "none",
                width: "100%",
                height: "44px",
                marginTop: "10px",
                background: "#3536FF",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        centered
        open={!!value}
        onCancel={() => {
          setValue(null);
          setImgEditURL("");
          setEditImageFile(null);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Edit Banner</h1>
          <form onSubmit={handleEdit}>
            <div className="flex justify-center items-center gap-10 mb-10">
              <div className="h-32 w-32 flex items-center justify-center bg-gray-300 rounded-full relative border-2 border-[#3F857B]">
                {imgEditURL ? (
                  <img
                    className="w-full h-full z-10 rounded-full object-cover"
                    src={imgEditURL}
                    alt="preview img"
                  />
                ) : (
                  <CiImageOn className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                <input
                  onChange={onEditImageChange}
                  type="file"
                  id="img-edit"
                  name="image"
                  className="display-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                />
                <div className="absolute bottom-2 right-1 z-10">
                  <FaRegEdit size={22} color="#FED12F" />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Banner Name
              </label>
              <input
                value={form.categoryName}
                onChange={onEditInputChange}
                type="text"
                placeholder="Enter Banner Name"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="categoryName"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                border: "none",
                width: "100%",
                height: "44px",
                marginTop: "10px",
                background: "#3536FF",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Update"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}
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
    </>
  );
};

export default AddBanner;
