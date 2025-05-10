import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const AddInputFrom = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      form={form}
      name="no_labels_form"
      {...formItemLayoutWithOutLabel}
      initialValues={{ names: [""] }}
      onFinish={onFinish}
      style={{ maxWidth: 600, marginTop: 24, marginLeft: 50 }}
    >
      {/* Static Fields */}
      <Form.Item
        name="packageName"
        rules={[{ required: true, message: "Please input package name!" }]}
      >
        <Input
          placeholder="Package Name"
          style={{ height: 48, width: "90%" }}
        />
      </Form.Item>

      <Form.Item
        name="packageFees"
        rules={[{ required: true, message: "Please input package fees!" }]}
      >
        <Input
          placeholder="Package Fees"
          style={{ height: 48, width: "90%" }}
        />
      </Form.Item>

      <Form.Item
        name="packagePrice"
        rules={[{ required: true, message: "Please input package price!" }]}
      >
        <Input
          placeholder="Package Price"
          style={{ height: 48, width: "90%" }}
        />
      </Form.Item>

      {/* Dynamic Passenger Fields */}
      <Form.List
        name="packageDetails"
        rules={[
          {
            validator: async (_, packageDetails) => {
              if (!packageDetails || packageDetails.length < 1) {
                return Promise.reject(new Error("At least 1 fields"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field) => (
              <Form.Item
                required={false}
                key={field.key}
                {...formItemLayoutWithOutLabel}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input package details or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Package Details"
                    style={{ height: 48, width: "90%" }}
                  />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    style={{
                      marginLeft: 8,
                      fontSize: 18,
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </Form.Item>
            ))}

            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                style={{ width: "90%", height: 48 }}
              >
                Add field for package details
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Submit Button */}
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            height: 48,
            width: "90%",
            backgroundColor: "#3536FF",
            fontSize: "18px",
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddInputFrom;
