import React from "react";
import acc from "../../assets/acc.png";
import delAcc from "../../assets/delAcc.png";
import confirm from "../../assets/confirmDel.png";
import deleted from "../../assets/deleted.png";

const DeleteAccountInstructions = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-10 bg-gradient-to-b from-white to-[#f4f6f9] rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-200 text-gray-600">
      <h1 className="text-center text-4xl md:text-5xl font-bold uppercase text-primary mb-10 tracking-wide">
        How to Delete Your Account
      </h1>

      <ol className="list-decimal pl-5 mt-6 space-y-6 text-lg leading-8">
        <li className="relative font-medium pl-6">
          Go to the{" "}
          <span className="bg-[#e1f5fe] text-primary font-semibold rounded-md px-2 py-0.5">
            Account
          </span>{" "}
          tab from the bottom navigation bar.
          <div className="text-center my-6">
            <img
              src={acc}
              alt="Account Tab Screen"
              className="mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-[350px]"
            />
          </div>
        </li>

        <li className="relative font-medium pl-6">
          Tap on{" "}
          <span className="bg-[#e1f5fe] text-primary font-semibold rounded-md px-2 py-0.5">
            Delete Account
          </span>{" "}
          in the Account settings.
          <div className="text-center my-6">
            <img
              src={delAcc}
              alt="Delete Account Option"
              className="mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-[350px]"
            />
          </div>
        </li>

        <li className="relative font-medium pl-6">
          Enter your{" "}
          <span className="bg-[#e1f5fe] text-primary font-semibold rounded-md px-2 py-0.5">
            Password
          </span>{" "}
          to confirm the deletion request.
          <div className="text-center my-6">
            <img
              src={confirm}
              alt="Password Entry Screen"
              className="mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-[350px]"
            />
          </div>
        </li>

        <li className="relative font-medium pl-6">
          Tap the{" "}
          <span className="bg-[#e1f5fe] text-primary font-semibold rounded-md px-2 py-0.5">
            Confirm Delete
          </span>{" "}
          button to permanently remove your account.
          <div className="text-center my-6">
            <img
              src={deleted}
              alt="Confirm Delete Button"
              className="mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-[350px]"
            />
          </div>
        </li>
      </ol>

      <a
        href="/home"
        className="block w-full max-w-xs mx-auto text-center bg-gradient-to-r from-primary to-[#007aff] text-white font-semibold text-lg rounded-full py-4 mt-12 transition-all duration-300 hover:from-[#0051a8] hover:to-[#0f59b7] hover:-translate-y-0.5 hover:shadow-lg"
      >
        Return to Home
      </a>

      <footer className="text-center mt-10 text-sm text-gray-500 pt-6 border-t border-gray-100">
        <div>
          <p className="text-lg">Flexbook Support Team</p>
          <p>Email: office.flexbook@gmail.com</p>
          <p className="pb-5">
            Address: 8465 Keystone Xing Ste 115 Indianapolis, Indiana 46240-2453
          </p>
        </div>
        &copy; 2025 Bookrite. All Rights Reserved. |{" "}
        <a
          href="/api/v1/rule/privacy-policy"
          className="text-primary font-semibold hover:underline"
        >
          Privacy Policy
        </a>
      </footer>
    </div>
  );
};

export default DeleteAccountInstructions;
