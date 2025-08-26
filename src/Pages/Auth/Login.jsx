import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useLoginMutation } from "../../redux/features/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const [login] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
        role: "SUPER_ADMIN",
      }).unwrap();

      if (res?.success) {
        localStorage.setItem("token", JSON.stringify(res?.data?.Token));
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        toast.error("Login failed.", res?.message || "Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Check your credentials.");
    }
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
            rules={[{ required: true, message: "Please input your Password!" }]}
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

        <div className="flex items-center justify-end">
          <Link
            className="text-[#F78F08] text-lg font-semibold underline leading-[150%]"
            to="/auth/forgot-password"
          >
            Forgot password?
          </Link>
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
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
