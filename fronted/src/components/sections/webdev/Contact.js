import { useState } from "react";
import Container from "../../common/Container";
import Button from "../../ui/Button";

export default function Contact() {
  const whatsappNumber = "923001234567";
  const email = "youremail@gmail.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hi, I want to discuss a website project."
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return;
    }

    setLoading(true);

    // MOCK API
    setTimeout(() => {
      console.log(formData);
      setLoading(false);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section className="py-20 bg-white">

      <Container>

        {/* HEADER */}
        <div className="max-w-2xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Let's Build Something Amazing 🚀
          </h2>

          <p className="text-gray-600 mt-4">
            Have a project in mind? Contact us and let's turn your idea into reality.
          </p>

        </div>

        {/* FORM */}
        <div className="max-w-xl mx-auto mt-10 bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              rows="4"
              name="message"
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full py-3 text-base"
            >
              Send Message
            </Button>

          </form>

        </div>

        {/* QUICK CONTACT */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            💬 Chat on WhatsApp
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:bg-gray-100 transition"
          >
            📧 Send Email
          </a>

        </div>

      </Container>

    </section>
  );
}