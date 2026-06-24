import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setSending(true);

    emailjs
      .sendForm(
        "service_ovnuznf",
        "template_db7aouq",
        form.current,
        "b4epuiFiKTKZu2lLi"
      )
      .then(() => {
        setStatus("Email sent successfully!");
        form.current.reset();
        setSending(false);
      })
      .catch((error) => {
        console.log(error);
        setStatus("Failed to send email");
        setSending(false);
      });
  };

  const clearStatus = () => {
    setStatus("");
  };

  const validateForm = () => {
    const newErrors = {};
    const name = form.current.name.value.trim();
    const email = form.current.email.value.trim();
    const message = form.current.message.value.trim();

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0a10] flex items-center justify-center p-6">
      <div className="relative w-full max-w-md">
       
        <div
          className="absolute -inset-10 blur-3xl rounded-full pointer-events-none opacity-40"
          style={{
            background:
              "linear-gradient(135deg, #6366F1, #4338CA, #312E81, #1E1B4B)",
          }}
        />

        <div
          className="relative rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(67,56,202,0.5)] p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.16), rgba(67,56,202,0.16), rgba(30,27,75,0.25))",
          }}
        >
          <h2 className="text-2xl font-semibold text-white mb-1">
            Contact Us
          </h2>
          <p className="text-sm text-white/50 mb-6">
            Send us a message and we&rsquo;ll get back to you shortly.
          </p>

          <form ref={form} onSubmit={sendEmail} noValidate className="space-y-4">
            <div>
              <label className="block text-xs text-white/60 mb-1.5">Name</label>
              <input
                name="name"
                type="text"
                placeholder="e.g. John Smith"
                required
                onChange={clearStatus}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-1.5">Email address</label>
              <input
                name="email"
                type="email"
                placeholder="e.g. example@gmail.com"
                required
                onChange={clearStatus}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-1.5">Message</label>
              <textarea
                name="message"
                placeholder="Let us know how we can help"
                required
                onChange={clearStatus}
                rows={4}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30 transition resize-none"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-[#4338CA] hover:bg-[#6366F1] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-white text-sm font-medium py-2.5 transition shadow-[0_0_20px_-2px_rgba(99,102,241,0.7)]"
            >
              {sending ? "Sending..." : "Send message"}
            </button>

            {status && (
              <p
                className={`text-sm text-center ${
                  status.includes("successfully") ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
