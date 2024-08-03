import { Button, Form, FormProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const ReviewForm = () => {
  const onFinish: FormProps["onFinish"] = (values) => {
    // createPostResult.mutate(values);
    console.log(values);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        initialValues={{
          description: "",
          rating: 0,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name={`description`}
          rules={[{ required: true, message: "Please input a description" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
