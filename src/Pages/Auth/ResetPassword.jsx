import { Form, Input } from "antd";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const email = new URLSearchParams(location.search).get("email");
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate(`/auth/login`);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[#333333] text-[28px] font-semibold leading-[110%] mb-6">
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
            name="password"
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
                height: "72px",
                padding: "23px 16px",
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
            htmlFor="password"
            className="text-2xl font-medium leading-6 text-[#333333]"
          >
            Confirm New Password
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="confirm-password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
                height: "72px",
                padding: "23px 16px",
                background: "#E6E6FF80",
                borderRadius: "16px",
                outline: "none",
              }}
            />
          </Form.Item>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 72,
              color: "#FEFEFE",
              fontWeight: "600",
              fontSize: "28px",

              marginTop: 36,
            }}
            className="flex items-center justify-center bg-primary rounded-2xl"
          >
            {/* {isLoading? < Spinner/> : "Sign in"} */} confirm
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
