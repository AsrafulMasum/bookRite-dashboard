import { Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
// import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values)
    navigate("/");
    // Cookies.set('token', token, { expires: 7 })
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-semibold mb-3 leading-[110%] text-[#333333]">
          Login to Account!
        </h1>
        <p className="text-[#757575] leading-[110%]">
          Please enter your email and password to continue.
        </p>
      </div>

      <Form onFinish={onFinish} layout="vertical">
        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="email"
            className="text-2xl font-medium leading-6 text-[#636363]"
            style={{ display: "block", marginBottom: "12px" }}
          >
            {" "}
            Email{" "}
          </label>
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

        <div style={{ marginBottom: "8px" }}>
          <label
            style={{ display: "block", marginBottom: "12px" }}
            htmlFor="password"
            className="text-2xl font-medium leading-6 text-[#636363]"
          >
            Password
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

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="text-lg text-[#757575]">
              Remember password
            </Checkbox>
          </Form.Item>

          <Link
            className="text-[#F78F08] text-lg font-semibold underline leading-[150%]"
            to="/auth/forgot-password"
          >
            Forgot password?
          </Link>
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
              fontSize: "24px",

              marginTop: 36,
            }}
            className="flex items-center justify-center bg-primary rounded-2xl"
          >
            {/* {isLoading? < Spinner/> : "Sign in"} */} Sign in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
