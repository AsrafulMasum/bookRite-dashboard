import { Button, Form, Input } from "antd";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../redux/features/authApi";

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [errors, setErrors] = useState({ newPass: "", confirmPass: "" });
  const [form] = Form.useForm();

  const validatePasswordChange = useCallback((values) => {
    let newErrors = { newPass: "", confirmPass: "" };

    if (values?.currentPass === values.newPass) {
      newErrors.newPass = "The New password is similar to the old Password";
    }
    if (values?.newPass !== values.confirmPass) {
      newErrors.confirmPass = "New Password and Confirm Password Don't Match";
    }
    setErrors(newErrors);
    return newErrors;
  }, []);

  const onFinish = useCallback(
    async (values) => {
      const validation = validatePasswordChange(values);
      if (!validation.newPass && !validation.confirmPass) {
        try {
          const { status, message } = await changePassword({ ...values }).unwrap();
          if (status) {
            toast.success(message);
            form.resetFields();
          }
        } catch (error) {
          toast.error(error?.data?.message || "Failed to change password");
        }
      }
    },
    [changePassword, form, validatePasswordChange]
  );

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="w-[70%] mx-auto mt-40"
      >
        <Form.Item
          name="currentPass"
          label={
            <p className="text-xl font-medium text-sub_title">
              Current Password
            </p>
          }
          rules={[
            {
              required: true,
              message: "Please Enter Current Password!",
            },
          ]}
        >
          <Input.Password
            style={{
              width: "100%",
              height: "56px",
              border: "none",
              backgroundColor: "#F5F5FF66",
              color: "#757575",
              paddingLeft: "20px",
            }}
            placeholder="Enter current password"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
          />
        </Form.Item>

        <Form.Item
          name="newPass"
          rules={[
            {
              required: true,
              message: "Please Enter New Password!",
            },
          ]}
          label={
            <p className="text-xl font-medium text-sub_title">New Password</p>
          }
          style={{ marginBottom: errors.newPass ? 0 : undefined }}
        >
          <Input.Password
            style={{
              width: "100%",
              height: "56px",
              border: "none",
              backgroundColor: "#F5F5FF66",
              color: "#757575",
              paddingLeft: "20px",
            }}
            placeholder="Enter new password"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
          />
        </Form.Item>
        {errors.newPass && (
          <label style={{ display: "block", color: "red" }}>
            {errors.newPass}
          </label>
        )}

        <Form.Item
          label={
            <p className="text-xl font-medium text-sub_title">
              Confirm Password
            </p>
          }
          name="confirmPass"
          rules={[
            {
              required: true,
              message: "Please Enter Confirm Password!",
            },
          ]}
          style={{ marginBottom: errors.confirmPass ? 0 : undefined }}
        >
          <Input.Password
            style={{
              width: "100%",
              height: "56px",
              border: "none",
              backgroundColor: "#F5F5FF66",
              color: "#757575",
              paddingLeft: "20px",
            }}
            placeholder="Confirm new password"
            className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
          />
        </Form.Item>
        {errors.confirmPass && (
          <label style={{ display: "block", color: "red" }}>
            {errors.confirmPass}
          </label>
        )}

        <Form.Item style={{ marginTop: 80 }}>
          <Button
            htmlType="submit"
            block
            style={{
              width: "100%",
              height: 56,
              background: "#3536FF",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "500",
            }}
            className="roboto-medium text-sm leading-4"
          >
            {isLoading ? "Changing" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;