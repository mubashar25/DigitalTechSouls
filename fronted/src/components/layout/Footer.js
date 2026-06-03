import { Link } from "react-router-dom";
import { FiGlobe, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="font-bold text-white text-lg">DigitalTechSouls</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Professional web hosting and domain registration services. Fast, secure, and reliable.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm"><FiMail size={14} /><span>support@digitaltechsouls.com</span></div>
              <div className="flex items-center gap-2 text-gray-400 text-sm"><FiGlobe size={14} /><span>www.digitaltechsouls.com</span></div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Services</h3>
            <ul className="space-y-2">
              {[["Shared Hosting", "/hosting"], ["Domain Registration", "/domains"], ["Domain Transfer", "/domains"], ["SSL Certificates", "/hosting"]].map(([label, to]) => (
                <li key={label}><Link to={to} className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Account</h3>
            <ul className="space-y-2">
              {[["Login", "/login"], ["Register", "/register"], ["Dashboard", "/dashboard"], ["Support", "/support"]].map(([label, to]) => (
                <li key={label}><Link to={to} className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} DigitalTechSouls. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-400 text-xs">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-400 text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}