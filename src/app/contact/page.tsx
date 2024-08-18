"use client";

import Styles from "../styles/contact.module.css";
import React, { useRef } from "react";
import Contactinfo from "../contact/contactinfo";
import emailjs from "@emailjs/browser";
import PageTitle from "../Components/PageTitle";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ContactIcon } from "lucide-react";

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
    <div>
      <>
        <PageTitle title="Upload Files DS | Contact Us" />
      </>
      <div className={Styles.form}>
        <div className={Styles.container}>
          <h1>
            <strong>CONTACT US</strong>
          </h1>
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor="user_name">Name</label>
            <br />
            <input
              type="text"
              id="user_name"
              name="user_name"
              required
              style={{ width: "500px", height: "35px", color: "black" }}
            />

            <br />
            <label htmlFor="user_email">E-mail</label>
            <br />
            <input
              type="email"
              id="user_email"
              name="user_email"
              required
              style={{ width: "500px", height: "35px", color: "black" }}
            />
            <br />
            <label htmlFor="subject">Subject</label>
            <br />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              style={{ width: "500px", height: "35px", color: "black" }}
            />
            <br />
            <label htmlFor="message">Message</label>
            <br />
            <textarea
              id="message"
              style={{ width: "500px", height: "200px", color: "black" }}
              name="message"
              rows={6}
              required
            ></textarea>
            <br />
            <button type="submit" onClick={handleSendMessage} className="btn">
              Send Message
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
      <Contactinfo />
    </div>
  );
};

export default FormComponent;
