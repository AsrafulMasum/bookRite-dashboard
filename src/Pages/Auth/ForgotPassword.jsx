import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useForgotPasswordMutation } from "../../redux/features/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = useCallback(
    async (values) => {
      try {
        const res = await forgotPassword({
          email: values?.email,
        }).unwrap();
        if (res?.success) {
          navigate(`/auth/verify-otp?email=${values?.email}`);
        } else {
          console.error("Failed to send OTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [navigate]
  );

  return (
    <div className="w-full">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold mb-3 leading-[110%] text-[#333333]">
          Forget password
        </h1>
        <p className="text-[#757575] leading-[110%]">
          Enter your email address to get a verification code for resetting your
          password.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="mb-2">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
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
            Get OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
