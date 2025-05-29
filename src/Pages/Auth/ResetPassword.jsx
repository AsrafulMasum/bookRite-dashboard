import { Form, Input, Button } from "antd";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useResetPasswordMutation } from "../../redux/features/authApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {
    if (values) {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        console.error("Reset token is missing!");
        return;
      }

      try {
        const res = await resetPassword({
          payload: {
            newPassword: values?.newPassword,
            confirmPassword: values?.confirmPassword,
          },
          token,
        }).unwrap();

        if (res?.success) {
          navigate("/auth/login");
          toast.success(res?.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message)
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[#333333] text-2xl font-semibold leading-[110%] mb-6">
          Set new password
        </h1>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div style={{ marginBottom: "12px" }}>
          <label
            style={{ display: "block", marginBottom: "12px" }}
            htmlFor="password"
            className="text-2xl font-medium leading-6 text-[#333333]"
          >
            New Password
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
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

        <div style={{ marginBottom: "60px" }}>
          <label
            style={{ display: "block", marginBottom: "12px" }}
            htmlFor="confirmPassword"
            className="text-2xl font-medium leading-6 text-[#333333]"
          >
            Confirm New Password
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
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
              fontSize: "24px",
              marginTop: 36,
              background: "#3536FF",
              border: "none",
              borderRadius: "16px",
            }}
            className="flex items-center justify-center bg-primary rounded-2xl"
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
