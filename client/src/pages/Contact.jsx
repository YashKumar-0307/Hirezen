import React, { useRef } from "react";
// import "./Contact.css";
import DefaultLayout from "../components/DefaultLayout";
import emailjs from "emailjs-com";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Fade from "react-reveal/Fade";

const Contact = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        vertical="top"
        horizontal="center"
        {...props}
      />
    );
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_95u4s09",
      "template_vv03p16",
      form.current,
      "pHwFlf8vYkyHbWCEa"
    );

    handleClick();
    e.target.reset();
  };

  return (
    <div className="contactPage">
      <DefaultLayout>
        <h2>Get In Touch or Ask Your Query</h2>
        <div className="contact contact__container">
          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              rows="7"
              placeholder="Type Your Message Here."
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
            <Snackbar
              className="snackBar"
              open={open}
              autoHideDuration={2000}
              anchorOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              onClose={handleClose}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Message sent successfully!
              </Alert>
            </Snackbar>
          </form>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Contact;
