"use client";

import React, { useRef } from "react";
import Contactinfo from "../contact/contactinfo";
import emailjs from "@emailjs/browser";
import PageTitle from "../Components/PageTitle";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import "react-toastify/dist/ReactToastify.css";

const FormComponent: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zet32rm",
        "template_c1kywm5",
        form.current!,
        "YNgQJRZzSHe6Spfvk"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSendMessage = () => {
    if (!form.current) return;

    const formFields = form.current.elements;

    const isFormFilled = Array.from(formFields).every(
      (field) =>
        field.tagName === "BUTTON" ||
        (field as HTMLInputElement).value.trim() !== ""
    );

    if (isFormFilled) {
      toast.success("Your e-mail was sent successfully!", {
        position: "top-right",
      });
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } else {
      toast.error("Please fill out all fields before sending the email.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 mb-44">
        <PageTitle title="Upload Files DS | Contact Us" />
        <div className="flex flex-col items-center mt-20 gap-10 text-2xl font-medium ">
          <h1 className="text-3xl mb-8">
            <strong>CONTACT US</strong>
          </h1>
          <div className="p-5 rounded-lg shadow-md max-w-3xl w-full">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-2"
            >
              <label
                htmlFor="user_name"
                className="mb-2 text-lg lg:text-xl xl:text-2xl lg:w-1/3"
              >
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                className="text-black py-1 px-1 rounded-lg max-w-full"
              />
              <label
                htmlFor="user_email"
                className="mb-2 text-lg lg:text-xl xl:text-2xl lg:w-1/3"
              >
                E-mail
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                className="text-black py-1 px-1 rounded-lg max-w-full"
              />
              <label
                htmlFor="subject"
                className="mb-2 text-lg lg:text-xl xl:text-2xl lg:w-1/3"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="text-black py-1 px-1 rounded-lg max-w-full"
              />
              <label
                htmlFor="message"
                className="mb-2 text-lg lg:text-xl xl:text-2xl lg:w-1/3"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="text-black rounded-lg max-w-full"
              ></textarea>
              <button
                type="submit"
                onClick={handleSendMessage}
                className="bg-blue-800 text-white py-2 px-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out max-w-full mt-2"
              >
                Send Message
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>

        <Contactinfo />
      </div>
      <Footer />
    </>
  );
};

export default FormComponent;
