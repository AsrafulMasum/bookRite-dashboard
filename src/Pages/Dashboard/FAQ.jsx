import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCreateFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "../../redux/features/faqApi";
import toast from "react-hot-toast";

const initialData = [
  {
    _id: "1",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "2",
    question: "What is an affiliate e-commerce website?2",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "3",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "4",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "5",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "6",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
];

const FAQ = () => {
  const { data, refetch } = useGetFAQQuery();
  const [createFAQ] = useCreateFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();

  const [faqData, setFaqData] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [form, setForm] = useState({ question: "", ans: "" });

  useEffect(() => {
    setFaqData(data);
  }, [data]);

  // Add FAQ
  const handleAdd = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.question || !form.ans) return;
      const payload = {
        questions: form.question,
        answers: form.ans,
      };
      try {
        await createFAQ(payload).unwrap();
        refetch();
        setForm({ question: "", ans: "" });
        setOpenAddModal(false);
        toast.success("FAQ Created Successfully.");
      } catch (error) {
        console.error("Create FAQ failed:", error);
      }
    },
    [form, createFAQ, refetch]
  );

  // Edit FAQ
  const handleEdit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.question || !form.ans) return;
      const payload = {
        questions: form.question,
        answers: form.ans,
      };
      try {
        await updateFAQ({ id: currentId, faq: payload }).unwrap();
        refetch();
        setForm({ question: "", ans: "" });
        setCurrentId("");
        setOpenEditModal(false);
        toast.success("FAQ updated successfully.");
      } catch (err) {
        console.error("Update FAQ failed:", err);
      }
    },
    [form, currentId, updateFAQ, refetch]
  );

  // Delete FAQ
  const handleDelete = useCallback(async () => {
    try {
      await deleteFAQ(currentId).unwrap();
      refetch();
      toast.success("FAQ deleted successfully.");
    } catch (err) {
      console.error("Delete FAQ failed:", err);
    }
    setShowDelete(false);
    setCurrentId("");
  }, [currentId, deleteFAQ, refetch]);

  // Open Edit Modal
  const openEdit = useCallback((item) => {
    setForm({ question: item.questions, ans: item.answers });
    setCurrentId(item._id);
    setOpenEditModal(true);
  }, []);

  // Open Delete Modal
  const openDelete = useCallback((id) => {
    setCurrentId(id);
    setShowDelete(true);
  }, []);

  return (
    <div className="bg-white px-3 py-2 rounded-lg">
      <div style={{ margin: "24px 16px" }}>
        <div className="flex items-center justify-between w-full">
          <h3
            className="text-[#333333]"
            style={{ fontSize: 24, fontWeight: 500, lineHeight: "24px" }}
          >
            FAQ
          </h3>
          <Button
            onClick={() => setOpenAddModal(true)}
            style={{
              width: "177px",
              height: "40px",
              boxShadow: "0px 2px 4px 0px #0000001A",
              backgroundColor: "#3536FF",
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            <span>Add FAQ</span>
          </Button>
        </div>
      </div>

      <div className="bg-white pb-6 px-4 rounded-md space-y-4">
        {faqData?.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-start gap-4"
          >
            <div className="w-full">
              <p className="text-base font-medium border-b rounded-xl py-2 px-4 flex items-center gap-8 bg-[#F9F9F9]">
                <span className="flex-1 text-[#636363]">{item.questions}</span>
              </p>
              <div className="flex justify-start items-start gap-2 border-b py-2 px-4 rounded-xl my-4 bg-[#F9F9F9]">
                <p className="text-[#818181] leading-[24px] mb-6">
                  {item.answers}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-2">
              <CiEdit
                onClick={() => openEdit(item)}
                className="text-3xl font-semibold cursor-pointer text-[#F78F08]"
              />
              <RiDeleteBin6Line
                onClick={() => openDelete(item._id)}
                className="text-2xl cursor-pointer text-[#D93D04]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Add FAQ</h1>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                type="text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                value={form.question}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) =>
                  setForm((f) => ({ ...f, ans: e.target.value }))
                }
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                value={form.ans}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                width: "100%",
                border: "none",
                height: "44px",
                background: "#3536FF",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Save & change"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Update FAQ</h1>
          <form onSubmit={handleEdit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                type="text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                value={form.question}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) =>
                  setForm((f) => ({ ...f, ans: e.target.value }))
                }
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                value={form.ans}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                width: "100%",
                border: "none",
                height: "44px",
                background: "#3536FF",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Save & change"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#3536FF] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
