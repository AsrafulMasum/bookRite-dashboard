import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import {
  useAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../../redux/apiSlices/aboutSlice";
import toast from "react-hot-toast";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: aboutUs, refetch } = useAboutUsQuery({});
  const [updateAboutUs, { isLoading }] = useUpdateAboutUsMutation();

  const aboutDataSave = async () => {
    try {
      await updateAboutUs({ id: aboutUs?._id, description: content })
        .unwrap()
        .then(({ status, message }) => {
          if (status) {
            toast.success(message);
            refetch();
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Something Wrong");
    }
  };

  useEffect(() => {
    setContent(aboutUs?.description);
  }, [aboutUs]);

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
        onClick={aboutDataSave}
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
        {" "}
        {isLoading ? "Updating..." : "Save"}
      </Button>
    </div>
  );
};

export default AboutUs;
