import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import toast from "react-hot-toast";
import {
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../../redux/features/rulesApi";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: privacyPolicy, refetch } = useGetPrivacyPolicyQuery();
  const [updatePrivacyPolicy, { isLoading }] = useUpdatePrivacyPolicyMutation();
  const [createPrivacyPolicy, { isLoading: isCreationLoading }] =
    useCreatePrivacyPolicyMutation();

  const privacyDataSave = async () => {
    try {
      if (privacyPolicy) {
        const response = await updatePrivacyPolicy({ content }).unwrap();
        const { success, message } = response;

        if (success) {
          toast.success(message);
          refetch();
        }
      }
      if (!privacyPolicy) {
        const response = await createPrivacyPolicy({ content }).unwrap();
        const { success, message } = response;

        if (success) {
          toast.success(message);
          refetch();
        }
      }
    } catch (error) {
      console.error("Mutation error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    setContent(privacyPolicy?.content);
  }, [privacyPolicy]);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <Button
        onClick={privacyDataSave}
        block
        style={{
          marginTop: "60px",
          backgroundColor: "#3536FF",
          border: "none",
          color: "#fff",
          height: "60px",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        {isLoading || isCreationLoading ? "Updating..." : "Save"}
      </Button>
    </div>
  );
};

export default PrivacyPolicy;
