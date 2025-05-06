import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    navigate(`/auth/verify-otp?email=${values?.email}`);
  };

  return (
    <div className="w-full">
      <div className=" mb-7">
        <h1 className="text-[28px] font-semibold mb-3 leading-[110%] text-[#333333]">
          Forget password
        </h1>
        <p className="text-[#757575] leading-[110%]">
          Enter your email address to ger a verification code for resetting your
          password.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="mb-2">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="email"
            id="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="custom-input"
              placeholder="Enter your email address"
              type="email"
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
        <p className="text-[#F78F08] font-semibold leading-[110%]">
          Email is Required
        </p>

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
            {/* {isLoading? < Spinner/> : "Sign in"} */} Get OTP
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
