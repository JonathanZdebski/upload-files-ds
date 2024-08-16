"use client";

import Styles from "../styles/contact.module.css";
import React, { useRef } from "react";
import Contactinfo from "../contact/contactinfo";
import emailjs from "@emailjs/browser";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ContactIcon } from "lucide-react";

// Especificando o tipo de referência para melhorar a segurança de tipos
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
      toast.success("Seu e-mail foi enviado com sucesso!", {
        position: "top-right", // Correção: Usar string diretamente
      });
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } else {
      toast.error(
        "Por favor, preencha todos os campos antes de enviar o e-mail.",
        {
          position: "top-center", // Correção: Usar string diretamente
        }
      );
    }
  };

  return (
    <div>
      <div className={Styles.form}>
        <div className={Styles.container}>
          <h1>
            <strong>CONTACT US</strong>
          </h1>
          <form ref={form} onSubmit={sendEmail}>
            <label htmlFor="user_name">Nome</label>
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
            <label htmlFor="subject">Assunto</label>
            <br />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              style={{ width: "500px", height: "35px", color: "black" }}
            />
            <br />
            <label htmlFor="message">Mensagem</label>
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
              Enviar
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
