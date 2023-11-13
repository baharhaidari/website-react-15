import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactMe.css";
import { useTranslation } from "react-i18next";

export default function ContactMe() {
  const form = useRef();
  const { t } = useTranslation();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i9q68fs",
        "template_hdw4ebb",
        form.current,
        "n01DueOdBya9LfMGt"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section className="contact-section" id="contact">
      <h1 className="heading">{t("CONTACT.heading")}</h1>

      <div className="wrapper-class">
        <div className="form-container">
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-box">
              <input
                type="text"
                placeholder={t("CONTACT.first-name-label")}
                name="name"
                required
              />
              <input
                type="text"
                placeholder={t("CONTACT.last-name-label")}
                name="last-name"
                required
              />
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder={t("CONTACT.email-address-label")}
                name="user-email"
                required
              />

              <input
                type="text"
                placeholder={t("CONTACT.email-subject-label")}
                name="email-subject"
                required
              />
            </div>

            <textarea
              cols="30"
              rows="10"
              placeholder={t("CONTACT.message-area-label")}
              name="message"
              required
            ></textarea>
            <input
              type="submit"
              value={t("CONTACT.button-text")}
              className="btns"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
