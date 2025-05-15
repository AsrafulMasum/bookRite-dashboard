import { Form, Typography, Button } from "antd";
import { useState, useCallback } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");

  const onFinish = useCallback(() => {
    // TODO: Add OTP verification API call here
    navigate(`/auth/reset-password?email=${email}`);
  }, [navigate, email]);

  const handleResendEmail = useCallback(() => {
    // TODO: Add resend OTP API call here
  }, []);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-[28px] font-semibold mb-3 leading-[110%] text-[#333333]">
          Verify OTP
        </h1>
        <p className="text-[#757575] leading-[110%]">
          Please check your email. We have sent a code to {email || "your email"}
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              backgroundColor: "transparent",
              height: 72,
              width: 76,
              borderRadius: "16px",
              margin: "28px",
              fontSize: "40px",
              border: "1px solid #757575",
              color: "#757575",
              outline: "none",
              marginBottom: 12,
            }}
            renderInput={(props) => <input {...props} />}
          />
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
              height: 72,
              color: "#FEFEFE",
              fontWeight: "600",
              fontSize: "28px",
              marginTop: 36,
              background: "#3536FF",
              border: "none",
              borderRadius: "16px",
            }}
            className="flex items-center justify-center bg-primary rounded-2xl"
            disabled={otp.length !== 4}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
