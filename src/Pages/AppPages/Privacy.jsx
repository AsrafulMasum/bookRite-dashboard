import React from "react";
import { useGetPrivacyPolicyQuery } from "../../redux/features/rulesApi";

const Privacy = () => {
  const { data } = useGetPrivacyPolicyQuery();

  return (
    <div className="px-4 py-10">
      <h2 className="text-xl mb-4 font-medium">Privacy and policy</h2>
      <div dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
};

export default Privacy;
