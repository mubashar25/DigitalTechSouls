import Container from "../../components/common/Container";

export default function BrandSocialServices() {
  const whatsappNumber = "923077882035";

  return (
    <section className="py-20 bg-gray-50 min-h-screen">

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Brand Identity & Social Media Marketing
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            We help businesses build a powerful brand image and grow their online presence
            through strategic marketing and modern design.
          </p>
        </div>

        {/* SERVICES DETAILS */}
        <div className="grid md:grid-cols-2 gap-10 mt-14">

          {/* BRAND IDENTITY */}
          <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl">🎨</div>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Brand Identity
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              We create a complete visual identity for your business that makes you stand out
              in the market and builds trust with your audience.
            </p>

            <ul className="mt-5 text-gray-600 space-y-2 text-sm">
              <li>✔ Logo Design (Modern & Minimal)</li>
              <li>✔ Brand Color & Typography System</li>
              <li>✔ Business Card & Stationery Design</li>
              <li>✔ Complete Brand Guidelines</li>
            </ul>
          </div>

          {/* SOCIAL MEDIA MARKETING */}
          <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="text-4xl">📢</div>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Social Media Marketing
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              We help you grow your business online with powerful content strategies,
              ads management and audience engagement.
            </p>

            <ul className="mt-5 text-gray-600 space-y-2 text-sm">
              <li>✔ Facebook & Instagram Management</li>
              <li>✔ Content Creation & Scheduling</li>
              <li>✔ Paid Ads (Meta Ads)</li>
              <li>✔ Growth Strategy & Analytics</li>
            </ul>
          </div>

        </div>

        {/* CTA SECTION */}
        <div className="mt-16 bg-white border rounded-2xl p-10 text-center shadow-sm">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Want to Grow Your Brand?
          </h2>

          <p className="text-gray-600 mt-3">
            Contact us instantly on WhatsApp and get a free consultation.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Chat on WhatsApp 📲
          </a>

          <p className="text-gray-500 mt-4 text-sm">
            +92 307 7882035
          </p>

        </div>

      </Container>

    </section>
  );
}