import { Form, Typography, Button, Input, ConfigProvider } from "antd";
import { useState, useCallback } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useOtpVerifyMutation } from "../../redux/features/authApi";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify] = useOtpVerifyMutation();

  const onFinish = async (values) => {
    const data = {
      oneTimeCode: Number(values.otp),
      email: email,
    }

    await otpVerify(data)
  };

  const handleResendEmail = useCallback(() => {
    // TODO: Add resend OTP API call here
  }, []);

  return (
    <div className="w-full px-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-3 leading-[110%] text-[#333333]">
          Verify OTP
        </h1>
        <p className="text-[#757575] leading-[110%] flex text-nowrap">
          Please check your email. We have sent a code to <span>{email || "your email"}</span>
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex justify-center">
          <ConfigProvider
            theme={{
              token: {
                controlHeight: 30,
                colorBgContainer: "transparent",
              },
              components: {
                Input: {
                  fontSize: "24px",
                  colorText: "#757575",
                },
              },
            }}
          >
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Please input your OTP!" }]}
            >
              <Input.OTP
                size="large"
                length={6}
                style={{
                  gap: 28,
                  fontWeight: "500",
                  // width:"160px"
                 
                }}
              />
            </Form.Item>
          </ConfigProvider>
        </div>

        <div className="flex items-center justify-between mb-[60px]">
          <Text
            style={{
              color: "#757575",
              lineHeight: "150%",
              fontSize: "16px",
            }}
          >
            Didn't receive code?
          </Text>

          <p
            onClick={handleResendEmail}
            style={{
              color: "#F78F08",
              cursor: "pointer",
              fontWeight: "700",
              lineHeight: "150%",
              textDecoration: "underline",
            }}
          >
            Resend
          </p>
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
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
