import { Button, Form, Input } from "antd";
import { useEffect, useState, useCallback } from "react";
import { LiaEditSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { imageUrl } from "../../redux/api/baseApi";
import { FaRegEdit } from "react-icons/fa";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/features/authApi";

const Profile = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  const [image, setImage] = useState();
  const [imgURL, setImgURL] = useState();
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: user, refetch } = useProfileQuery();
  console.log(user)

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImgURL(imgUrl);
      setImage(file);
    }
  }, []);

  const src =
    user?.profile && user?.profile.startsWith("https")
      ? user?.profile
      : user?.profile
      ? `${imageUrl}${user?.profile}`
      : "/default-avatar.png";

  const handleSubmit = useCallback(
    async (values) => {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      try {
        const { success, message } = await updateProfile(formData).unwrap();
        if (success) {
          toast.success(message);
          refetch();
          setProfileEdit(false);
        }
      } catch (err) {
        toast.error(err?.message || "Update failed");
      }
    },
    [image, updateProfile, refetch]
  );

  return (
    <div className="px-52 pt-20">
      {!profileEdit ? (
        <Form form={form} className="grid grid-cols-12 gap-6" layout="vertical">
          <div className="col-span-12 flex items-center justify-between pb-6 mb-10">
            <div className="flex gap-5 items-end">
              <img
                className="w-36 h-36 object-cover rounded-full"
                src={src}
                alt="Profile"
              />
              <div>
                <h2 className="text-2xl text-sub_title font-semibold ">
                  {user?.name}
                </h2>
              </div>
            </div>
            <Button
              onClick={() => setProfileEdit(true)}
              style={{
                background: "#E6E6FF",
                color: "#3536FF",
                display: "flex",
                alignItems: "center",
                border: "none",
                fontSize: "18px",
                fontWeight: "600",
                width: "200px",
                height: "52px",
              }}
            >
              <LiaEditSolid className="text-lg font-semibold" />
              Edit Profile
            </Button>
          </div>
          <Form.Item
            name={"name"}
            label={
              <p className="text-xl font-medium text-sub_title">Full Name</p>
            }
            className="col-span-12"
            style={{ marginBottom: 0 }}
          >
            <Input
              readOnly
              style={{
                width: "100%",
                height: "56px",
                border: "none",
                backgroundColor: "#F5F5FF66",
                color: "#757575",
                paddingLeft: "20px",
              }}
            />
          </Form.Item>

          <Form.Item
            name={"email"}
            label={<p className="text-xl font-medium text-sub_title">Email</p>}
            className="col-span-12"
            style={{ marginBottom: 0 }}
          >
            <Input
              readOnly
              style={{
                width: "100%",
                height: "56px",
                border: "none",
                backgroundColor: "#F5F5FF66",
                color: "#757575",
                paddingLeft: "20px",
              }}
            />
          </Form.Item>

          <Form.Item
            name={"contact"}
            label={
              <p className="text-xl font-medium text-sub_title">
                Contact Number
              </p>
            }
            className="col-span-12"
            style={{ marginBottom: 0 }}
          >
            <Input
              readOnly
              style={{
                width: "100%",
                height: "56px",
                border: "none",
                backgroundColor: "#F5F5FF66",
                color: "#757575",
                paddingLeft: "20px",
              }}
            />
          </Form.Item>
        </Form>
      ) : (
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          className="w-full grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 flex items-center gap-10 mb-10">
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
                  backgroundImage: `url(${imgURL || src})`,
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
          <Form.Item
            name={"name"}
            label={
              <p className="text-xl font-medium text-sub_title">Full Name</p>
            }
            className="col-span-12"
            style={{ marginBottom: 0 }}
          >
            <Input
              style={{
                width: "100%",
                height: "56px",
                border: "none",
                backgroundColor: "#F5F5FF66",
                color: "#757575",
                paddingLeft: "20px",
              }}
            />
          </Form.Item>

          <Form.Item
            name={"contact"}
            label={
              <p className="text-xl font-medium text-sub_title">
                Contact Number
              </p>
            }
            className="col-span-12"
            style={{ marginBottom: 0 }}
          >
            <Input
              style={{
                width: "100%",
                height: "56px",
                border: "none",
                backgroundColor: "#F5F5FF66",
                color: "#757575",
                paddingLeft: "20px",
              }}
            />
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0 }} className="col-span-12">
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 56,
                background: "#3536FF",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "500",
                marginTop: "20px",
                border: "none",
              }}
            >
              {isLoading ? "Loading..." : "Save & Change"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Profile;
