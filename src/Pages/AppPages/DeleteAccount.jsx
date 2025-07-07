import { Form, Input, Button } from "antd";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../redux/features/usersApi";

const DeleteAccount = () => {
  const [deleteUser] = useDeleteUserMutation();

  const onFinish = async (values) => {
    const data = {
        email: values.email,
        password: values.password,
      }
    try { 
      const res = await deleteUser(data).unwrap();
      if (res?.success) {
        toast.success("User deletion successful!");
      } else {
        toast.error(
          "User deletion failed.",
          res?.message || "Please try again."
        );
      }
    } catch (error) {
      console.error("User deletion failed:", error);
      toast.error("User deletion failed. Check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] px-4">
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-semibold mb-3 leading-[110%] text-[#333333]">
            Delete your Account!
          </h1>
          <p className="text-[#757575] leading-[110%]">
            Please enter your email and password to continue.
          </p>
        </div>

        <Form onFinish={onFinish} layout="vertical">
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="email"
              className="text-xl font-medium leading-6 text-[#636363]"
              style={{ display: "block", marginBottom: "12px" }}
            >
              Email
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="email"
              id="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                className="custom-input"
                placeholder="Enter your email address"
                type="email"
                style={{
                  border: "1px solid #757575",
                  height: "52px",
                  padding: "23px 16px",
                  background: "#E6E6FF80",
                  borderRadius: "16px",
                  outline: "none",
                }}
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label
              style={{ display: "block", marginBottom: "12px" }}
              htmlFor="password"
              className="text-xl font-medium leading-6 text-[#636363]"
            >
              Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                className="custom-input"
                type="password"
                placeholder="********"
                iconRender={(visible) =>
                  visible ? (
                    <RxEyeOpen style={{ fontSize: "24px" }} />
                  ) : (
                    <RxEyeClosed style={{ fontSize: "24px" }} />
                  )
                }
                style={{
                  border: "1px solid #757575",
                  height: "52px",
                  background: "#E6E6FF80",
                  borderRadius: "16px",
                  outline: "none",
                }}
              />
            </Form.Item>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              type="primary"
              block
              style={{
                width: "100%",
                height: 52,
                color: "#FEFEFE",
                fontWeight: "600",
                fontSize: "20px",
                marginTop: 36,
                background: "#3536FF",
                border: "none",
                borderRadius: "16px",
              }}
              className="flex items-center justify-center bg-primary rounded-2xl"
            >
              Delete
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DeleteAccount;
