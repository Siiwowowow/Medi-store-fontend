/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  
  ChevronDown,
  ChevronUp,
  Paperclip,
  Send,
  CheckCircle,
  ShieldCheck,
  Loader2,
  MapPinned
} from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("Order Issue");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    orderId: "",
    subject: "",
    message: "",
    attachment: null as File | null
  });
  const [messageLength, setMessageLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [emailValid, setEmailValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const faqs = [
    { q: "How do I track my order?", a: "Once your order is shipped, you'll receive a tracking number via SMS and email. You can track your order in real-time from your account dashboard or by clicking the tracking link in your confirmation email." },
    { q: "How long does delivery take?", a: "Dhaka city deliveries take 24-48 hours. Outside Dhaka, delivery takes 3-5 business days. Express delivery options are available at checkout for urgent orders." },
    { q: "Can I return medicines?", a: "Yes, unopened and sealed medicines can be returned within 7 days of delivery. Prescription medicines are non-returnable due to health regulations." },
    { q: "Are all medicines genuine?", a: "100% genuine products. We source directly from manufacturers and authorized distributors. Every medicine comes with a quality guarantee and batch verification." },
    { q: "How do I become a seller?", a: "Visit our seller portal at sellers.medistore.com.bd. You'll need to provide business credentials, product catalog, and complete verification process." },
    { q: "What payment methods are accepted?", a: "We accept bKash, Nagad, Rocket, all major credit/debit cards (Visa, Mastercard, Amex), and cash on delivery." },
    { q: "Do you deliver outside Dhaka?", a: "Yes, we deliver nationwide across Bangladesh. Delivery times vary by location, typically 3-7 business days." },
    { q: "Is a prescription required?", a: "Prescription is required for antibiotics, hormones, and other scheduled drugs. OTC medicines can be purchased without prescription." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "email") {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);
      setEmailValid(isValid);
    }
    
    if (field === "message") {
      setMessageLength((value as string).length);
    }
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size <= 5 * 1024 * 1024) {
      handleInputChange("attachment", file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomRef = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setSubmissionRef(`MSG-2024-${randomRef}`);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      orderId: "",
      subject: "",
      message: "",
      attachment: null
    });
    setMessageLength(0);
    setEmailValid(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-shop_light_bg">
        <HeroSection />
        <div className="max-w-[1280px] mx-auto px-8 py-16">
          <div className="grid grid-cols-[380px_1fr] gap-8 max-lg:grid-cols-1">
            <ContactInfo />
            <div className="bg-white border-[1.5px] border-[#e5e7eb] rounded-xl p-8">
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-[72px] h-[72px] bg-[#3b9c3c]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-9 h-9 text-[#3b9c3c]" />
                </div>
                <h2 className="text-[22px] font-extrabold text-[#151515] mt-5" style={{ letterSpacing: '-0.015em' }}>
                  Message Sent!
                </h2>
                <p className="text-sm text-lightColor mt-2 max-w-[320px]">
                  Thank you for reaching out. Our team will reply to your email within 2 hours.
                </p>
                <p className="text-xs text-[#9ca3af] mt-3 font-mono">
                  Ref: #{submissionRef}
                </p>
                <button
                  onClick={handleReset}
                  className="border-[1.5px] border-[#063c28] text-[#063c28] rounded-[10px] h-10 px-6 text-sm font-semibold mt-6 hover:bg-[#063c28] hover:text-white transition-all"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          </div>
        </div>
        <MapSection />
        <FaqSection faqs={faqs} openFaqs={openFaqs} toggleFaq={toggleFaq} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <HeroSection />
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-[380px_1fr] gap-8 max-lg:grid-cols-1">
          <ContactInfo />
          
          {/* Form Card */}
          <div className="bg-white border-[1.5px] border-[#e5e7eb] rounded-xl p-8">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#151515]" style={{ letterSpacing: '-0.015em' }}>
                Send Us a Message
              </h2>
              <p className="text-[13px] text-[#9ca3af] mt-1">
                Fill out the form and we'll get back to you within 2 hours.
              </p>
              <div className="h-[1.5px] bg-[#e5e7eb] mt-5 mb-6" />
            </div>

            <form onSubmit={handleSubmit}>
              {/* Contact Type Selector */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.07em] mb-3 block">
                  I'm contacting about...
                </label>
                <div className="flex gap-2 flex-wrap">
                  {["Order Issue", "Medicine Query", "Seller Inquiry", "General"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-[8px] border-[1.5px] text-[13px] font-medium transition-all ${
                        activeTab === tab
                          ? "bg-[#063c28] text-white border-[#063c28]"
                          : "bg-[#f6f6f6] border-transparent text-[#52525b] hover:border-[#e5e7eb]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 1: Full Name & Phone */}
              <div className="grid grid-cols-2 gap-4 mb-5 max-sm:grid-cols-1">
                <div>
                  <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.06em] mb-1.5 block">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    onBlur={() => setTouchedFields({ ...touchedFields, fullName: true })}
                    className={`w-full h-12 px-[14px] border-[1.5px] rounded-[10px] font-poppins text-sm text-[#151515] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#063c28] focus:ring-3 focus:ring-[#063c28]/10 ${
                      touchedFields.fullName && !formData.fullName ? "border-red-500" : "border-[#e5e7eb]"
                    }`}
                    placeholder="James Wilson"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.06em] mb-1.5 block">
                    PHONE NUMBER *
                  </label>
                  <div className="flex">
                    <div className="bg-[#f6f6f6] border-r-[1.5px] border-[#e5e7eb] px-3 flex items-center text-sm text-[#52525b] rounded-l-[10px]">
                      +880
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="flex-1 h-12 px-[14px] border-[1.5px] border-l-0 border-[#e5e7eb] rounded-r-[10px] font-poppins text-sm text-[#151515] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#063c28] focus:ring-3 focus:ring-[#063c28]/10"
                      placeholder="1234-567890"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="mb-5 relative">
                <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.06em] mb-1.5 block">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 px-[14px] pr-10 border-[1.5px] border-[#e5e7eb] rounded-[10px] font-poppins text-sm text-[#151515] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#063c28] focus:ring-3 focus:ring-[#063c28]/10"
                  placeholder="james@example.com"
                />
                {emailValid && formData.email && (
                  <CheckCircle className="absolute right-4 top-[38px] w-4 h-4 text-[#3b9c3c]" />
                )}
              </div>

              {/* Row 3: Order ID (conditional) */}
              {activeTab === "Order Issue" && (
                <div className="mb-5 fade-in">
                  <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.06em] mb-1.5 block">
                    ORDER ID
                  </label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => handleInputChange("orderId", e.target.value)}
                    className="w-full h-12 px-[14px] border-[1.5px] border-[#e5e7eb] rounded-[10px] font-poppins text-sm text-[#151515] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#063c28] focus:ring-3 focus:ring-[#063c28]/10"
                    placeholder="e.g. MS-2024-001234"
                  />
                  <p className="text-[11px] text-[#9ca3af] mt-1">
                    Find your order ID in your confirmation email
                  </p>
                </div>
              )}

              {/* Row 4: Subject */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.06em] mb-1.5 block">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full h-12 px-[14px] border-[1.5px] border-[#e5e7eb] rounded-[10px] font-poppins text-sm text-[#151515] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#063c28] focus:ring-3 focus:ring-[#063c28]/10"
                  placeholder="Brief subject of your message"
                />
              </div>

              {/* Row 5: Message */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-[#52525b] uppercase tracking-[0.06em] mb-1.5 block">
                  MESSAGE *
                </label>
                <div className="relative">
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    maxLength={500}
                    className="w-full min-h-[140px] px-[14px] py-3 border-[1.5px] border-[#e5e7eb] rounded-[10px] font-poppins text-sm text-[#151515] placeholder:text-[#9ca3af] transition-all focus:outline-none focus:border-[#063c28] focus:ring-3 focus:ring-[#063c28]/10 resize-none"
                    placeholder="Please describe your issue or question in detail..."
                  />
                  <span className="absolute bottom-3 right-3 text-[11px] text-[#9ca3af]">
                    {messageLength}/500
                  </span>
                </div>
              </div>

              {/* File Attachment */}
              <div className="mb-6">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileAttach}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                  <div className="border-[1.5px] border-dashed border-[#e5e7eb] rounded-[10px] p-4 flex items-center gap-3 hover:border-[#063c28] hover:bg-[#f6f6f6] transition-all">
                    <Paperclip className="w-4 h-4 text-[#9ca3af]" />
                    <span className="text-[13px] text-[#9ca3af]">
                      {formData.attachment ? formData.attachment.name : "Attach file (optional)"}
                    </span>
                    <span className="text-[11px] text-[#d1d5db] ml-auto">Max 5MB</span>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] bg-[#fb6c08] text-white rounded-[10px] font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#e05e06] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(251,108,8,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-[18px] h-[18px] animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-[18px] h-[18px]" />
                    Send Message
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <div className="flex items-center gap-2 mt-4">
                <ShieldCheck className="w-[14px] h-[14px] text-[#3b9c3c]" />
                <span className="text-[11px] text-[#9ca3af]">
                  Your information is secure and will never be shared.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <MapSection />
      <FaqSection faqs={faqs} openFaqs={openFaqs} toggleFaq={toggleFaq} />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="bg-[#063c28] min-h-[320px] max-sm:min-h-[240px] flex items-center">
      <div className="max-w-[1280px] mx-auto px-8 w-full">
        {/* Breadcrumb */}
        <div className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60 transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">Contact</span>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#fb6c08]" />
              <span className="text-xs font-semibold text-white/60 tracking-wider">CONTACT US</span>
            </div>
            <h1 className="text-[48px] max-sm:text-[32px] font-extrabold text-white" style={{ letterSpacing: '-0.03em' }}>
              We're Here to Help
            </h1>
            <p className="text-base text-white/60 mt-3 max-w-[400px]">
              Questions about your order? Need to list your pharmacy? Our team responds within 2 hours.
            </p>
          </div>

          {/* Right Badges */}
          <div className="flex flex-col gap-3 max-lg:mt-4">
            <div className="bg-white/5 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-[18px] h-[18px] text-[#3b9c3c]" />
                <span className="text-xs text-white/50 uppercase tracking-wide">Average Response Time</span>
              </div>
              <p className="text-[22px] font-bold text-white mt-1">Under 2 Hours</p>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-[18px] h-[18px] text-[#3b9c3c]" />
                <span className="text-xs text-white/50 uppercase tracking-wide">Support Hours</span>
              </div>
              <p className="text-[22px] font-bold text-white mt-1">9AM – 10PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Info Component
function ContactInfo() {
  return (
    <div>
      {/* Card 1: Reach Us Directly */}
      <div className="bg-white border-[1.5px] border-[#e5e7eb] rounded-xl p-6 mb-4">
        <h3 className="text-lg font-bold text-[#151515] mb-5">Reach Us Directly</h3>
        <div className="flex flex-col gap-5">
          {[
            { Icon: MapPin, label: "HEAD OFFICE", value: "House 12, Road 4, Banani, Dhaka-1213", sub: "Bangladesh" },
            { Icon: Phone, label: "PHONE", value: "+880 1234-567890", sub: "Available 9AM – 10PM daily" },
            { Icon: Mail, label: "EMAIL", value: "support@medistore.com.bd", sub: "Replies within 2 hours" },
            { Icon: MessageSquare, label: "LIVE CHAT", value: "Available on website", sub: "Instant responses 9AM – 10PM" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-11 h-11 bg-[#063c28] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <item.Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-[0.08em]">{item.label}</p>
                <p className="text-sm font-semibold text-[#151515] mt-0.5">{item.value}</p>
                <p className="text-xs text-[#52525b] mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: Connect With Us */}
      <div className="bg-[#063c28] rounded-xl p-6 mb-4">
        <h3 className="text-base font-bold text-white mb-4">Follow MediStore</h3>
        <div className="flex flex-col gap-3">
          {[
            { Icon: IconBrandFacebook, platform: "Facebook", handle: "@medistore.bd" },
            { Icon: IconBrandInstagram, platform: "Instagram", handle: "@medistore_bd" },
            { Icon: IconBrandLinkedin, platform: "LinkedIn", handle: "/company/medistore-bd" },
            { Icon: IconBrandYoutube, platform: "YouTube", handle: "@medistorebd" }
          ].map((social, idx) => (
            <Link key={idx} href="#" className="flex items-center gap-3 hover:opacity-80 transition">
              <social.Icon className="w-5 h-5 text-shop_orange" />
              <span className="text-sm font-semibold text-white">{social.platform}</span>
              <span className="text-xs text-white/50">{social.handle}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Card 3: Business Hours */}
      <div className="bg-white border-[1.5px] border-shop_light_bg rounded-xl p-6">
        <h3 className="text-base font-bold text-darkColor mb-4">Business Hours</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-shop_light_bg">
            <span className="text-[13px] text-lightColor font-medium">Saturday – Thursday</span>
            <span className="text-[13px] text-darkColor font-semibold">9:00 AM – 10:00 PM</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#f6f6f6]">
            <span className="text-[13px] text-lightColor font-medium">Friday</span>
            <span className="text-[13px] text-darkColor font-semibold">2:00 PM – 10:00 PM</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[13px] text-lightColor font-medium">Holidays</span>
            <span className="text-[13px] text-darkColor font-semibold">Emergency only</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-shop_light_bg flex items-center gap-2">
          <div className="w-2 h-2 bg-shop_light_green rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-shop_light_green">We're currently open</span>
        </div>
      </div>
    </div>
  );
}

// Map Section Component
function MapSection() {
  return (
    <div className="w-full h-[320px] bg-[#e5e7eb] relative overflow-hidden">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, #d1d5db 39px, #d1d5db 40px),
                           repeating-linear-gradient(90deg, transparent, transparent 39px, #d1d5db 39px, #d1d5db 40px)`
        }}
      />
      
      {/* Map Marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-2 border-[#063c28] animate-ping opacity-30" />
          <div className="w-12 h-12 bg-[#063c28] rounded-full flex items-center justify-center relative z-10">
            <MapPinned className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-sm border border-[#e5e7eb] px-5 py-4 max-w-[260px]">
        <h4 className="text-sm font-bold text-darkColor">MediStore Head Office</h4>
        <p className="text-xs text-[#9ca3af] mt-0.5">House 12, Road 4, Banani, Dhaka</p>
        <Link href="#" className="text-shop_orange text-xs font-semibold mt-2 inline-block">
          Get Directions →
        </Link>
      </div>
    </div>
  );
}

// FAQ Section Component
function FaqSection({ faqs, openFaqs, toggleFaq }: { 
  faqs: { q: string; a: string }[]; 
  openFaqs: number[]; 
  toggleFaq: (index: number) => void;
}) {
  return (
    <div className="bg-[#f6f6f6] py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#fb6c08] tracking-wider mb-2">FAQ</p>
          <h2 className="text-[36px] max-sm:text-[28px] font-extrabold text-[#151515]" style={{ letterSpacing: '-0.03em' }}>
            Common Questions
          </h2>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-[1.5px] border-[#e5e7eb] rounded-xl p-5 hover:border-[#063c28] transition-all cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-sm font-bold text-[#151515] leading-snug flex-1">{faq.q}</h3>
                <div className="w-6 h-6 rounded-full bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                  {openFaqs.includes(index) ? (
                    <ChevronUp className="w-[14px] h-[14px] text-[#52525b]" />
                  ) : (
                    <ChevronDown className="w-[14px] h-[14px] text-[#52525b]" />
                  )}
                </div>
              </div>
              {openFaqs.includes(index) && (
                <div className="mt-3 pt-3 border-t border-shop_light_bg">
                  <p className="text-[13px] text-lightColor leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}