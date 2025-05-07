import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useUser } from "../../../provider/User";
import { FaRegEdit } from "react-icons/fa";

const UserProfile = () => {
  const [form] = Form.useForm();
  const { user } = useUser();
  const [image, setImage] = useState(
    "https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg"
  );
  const [imgURL, setImgURL] = useState(image);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSubmit = (values) => {
    console.log(values);
    // Swal.fire({
    //   position: "center",
    //   icon: "success",
    //   title: "Updated Successfully",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  };
  const onChange = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgURL(imgUrl);
    setImage(file);
  };

  return (
    <div className=" lg:grid lg:grid-rows-2">
      {/* image   */}
      <div className="col-row-1 pt-20">
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

      {/* forms  */}
      <div className="lg:col-rows-1  flex justify-center items-center  ">
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          style={{ width: "80%" }}
          onFinish={handleSubmit}
          form={form}
        >
          <div className=" grid lg:grid-cols-2 grid-cols-1 lg:gap-x-16 w-full gap-y-7 ">
            <div>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="firstName"
                label={<p style={{ display: "block" }}>Full Name</p>}
              >
                <Input
                  placeholder="Enter Your Full Name"
                  type="text"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="email"
                style={{ marginBottom: 0 }}
                label={
                  <p style={{ display: "block" }} htmlFor="">
                    Email
                  </p>
                }
              >
                <Input
                  type="text"
                  placeholder="Enter Email"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                style={{ marginBottom: 0 }}
                name="mobileNumber"
                label={
                  <p style={{}} htmlFor="email">
                    Phone Number
                  </p>
                }
              >
                <Input
                  type="text"
                  placeholder="Enter Phone Number"
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="location"
                style={{ marginBottom: 0 }}
                label={
                  <p style={{ display: "block" }} htmlFor="">
                    Location
                  </p>
                }
              >
                <Input
                  style={{
                    border: "1px solid #E0E4EC",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="text-end mt-12">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  border: "none",
                  height: "64px",
                  background: "#3536FF",
                  color: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
              >
                Save & Change
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default UserProfile;
