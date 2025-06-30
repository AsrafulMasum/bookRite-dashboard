import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import toast from "react-hot-toast";
import {
  useCreateTermsConditionMutation,
  useGetTermsConditionQuery,
  useUpdateTermsConditionMutation,
} from "../../../redux/features/rulesApi";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: termsCondition, refetch } = useGetTermsConditionQuery({});
  const [updateTermsCondition, { isLoading }] =
    useUpdateTermsConditionMutation();
  const [createTermsCondition, { isLoading: isCreationLoading }] =
    useCreateTermsConditionMutation();

  const termsConditionDataSave = async () => {
    try {
      if (termsCondition) {
        const response = await updateTermsCondition({ content }).unwrap();
        const { success, message } = response;

        if (success) {
          toast.success(message);
          refetch();
        }
      }

      if (!termsCondition) {
        const response = await createTermsCondition({ content }).unwrap();
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
    setContent(termsCondition?.content);
  }, [termsCondition]);

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
        onClick={termsConditionDataSave}
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

export default TermsAndCondition;
