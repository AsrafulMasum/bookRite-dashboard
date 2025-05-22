import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import toast from "react-hot-toast";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const { data: termsAndCondition, refetch } = useTermsAndConditionQuery();
  // const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();

  // const aboutDataSave = async () => {
  //   try {
  //     await updateTermsAndConditions({
  //       id: termsAndCondition?._id,
  //       description: content,
  //     })
  //       .unwrap()
  //       .then(({ statusCode, status, message }) => {
  //         if (status) {
  //           toast.success(message);
  //           refetch();
  //         }
  //       });
  //   } catch ({ message }) {
  //     toast.error(message || "Something Wrong");
  //   }
  // };

  // useEffect(() => {
  //   setContent(termsAndCondition?.description);
  // }, [termsAndCondition]);

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
        // onClick={aboutDataSave}
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
        Save
      </Button>
    </div>
  );
};

export default TermsAndCondition;
