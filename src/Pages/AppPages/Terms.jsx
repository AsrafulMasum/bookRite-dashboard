import React from "react";
import { useGetTermsConditionQuery } from "../../redux/features/rulesApi";

const Terms = () => {
  const { data } = useGetTermsConditionQuery();
  return (
    <div className="px-4 py-10">
      <h2 className="text-xl mb-4 font-medium">Terms and condition</h2>
      <div dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
};

export default Terms;
