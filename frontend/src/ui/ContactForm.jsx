import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, MessageCircle, User2, } from "lucide-react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [isSent, setIsSent] = useState(false);

  const form = useRef();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
    ).then(() => {
        setIsSent(true)
        form.current.reset()
        toast.success("Thank for your feedback 😊..",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick : true,
                pauseOnHover:true,
                theme:"light"
            }
        )
    },(error) => {
        console.log(error)
        toast.error("❌ Error sending the message. Please try again",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick : true,
                pauseOnHover:true,
                theme:"light"
            }
        )
    })
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className='w-[80%] lg:w-[60%] mx-auto rounded-xl shadow-2xl px-5 py-4 flex flex-col items-center gap-4'
    >
        <ToastContainer/>
      {/*heading */}

      {/* form fields */}
      <div className="bg-[#1a052a] px-5 py-2 rounded-xl hover:bg-transparent border-1 border-purple-950 flex gap-2 w-full">
        <User2 className="text-purple-500" />
        <input
          name='name'
          type="text"
          placeholder="Enter your name"
          className="text-gray-900 bg-transparent outline-0 border-0 dark:text-gray-200 w-full"
          required
        />
      </div>

      <div className="flex gap-2 bg-[#1a052a] px-5 py-2 rounded-xl hover:bg-transparent border-1 border-purple-950  w-full">
        <Mail className="text-purple-500" />
        <input
          name='email'
          type="email"
          placeholder="Enter your email"
          className="text-gray-900 bg-transparent outline-0 border-0  dark:text-gray-200 w-full"
          required
        />
      </div>

      <div className="bg-[#1a052a] px-5 py-2 rounded-xl hover:bg-transparent border-1 border-purple-950 flex gap-2 w-full">
        <MessageCircle className="text-purple-500" />
        <textarea
          type="text"
          name='message'
          placeholder="Enter your message"
          cols="50"
          rows="5"
          required
          className="w-full resize-none  bg-transparent outline-0 border-0  text-gray-900 dark:text-gray-200"
        ></textarea>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-purple-500 text-gray-100 text-[16px] px-2 py-2 hover:bg-transparent hover:border-2 hover:text-purple-500 rounded-lg cursor-pointer"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
