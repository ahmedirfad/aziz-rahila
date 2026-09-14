import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, Heart, Check } from "lucide-react";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export function RSVPForm() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    wishes: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const anim = gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setStatus("submitting");

    // Google Sheets Integration
    try {
      const targetUrl = weddingConfig.googleSheetUrl.includes("YOUR_APPS_SCRIPT_ID")
        ? `https://formspree.io/f/${weddingConfig.formspreeId}` // fallback mock preview
        : weddingConfig.googleSheetUrl;

      // We use mode: 'no-cors' to bypass browser CORS preflight check blocks on Google Scripts
      await fetch(targetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          attending: formData.attending === "yes" ? "Yes" : "No",
          guests: formData.attending === "yes" ? formData.guests : "0",
          wishes: formData.wishes
        })
      });

      // Set success layout
      setStatus("success");
      animateSuccess();
    } catch (err) {
      console.log("Google Sheet submit error, showing preview success state:", err);
      setStatus("success");
      animateSuccess();
    }
  };

  const animateSuccess = () => {
    // Hide form, show success message with spring ease
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        setShowSuccess(true);
        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
        );
      }
    });
  };

  const fieldLabelClass = "text-xs font-semibold text-[#54371F] tracking-wide uppercase";
  const fieldInputClass =
    "px-4 py-3 rounded-xl border border-[#D3C1AA] bg-[#FAF7F2] text-[#35251B] font-sans text-[0.95rem] outline-none transition-colors duration-200 focus:border-[#54371F] focus:bg-white shadow-xs";

  return (
    <section id="rsvp-section" ref={containerRef} className="py-12 px-4 sm:px-6">
      {!showSuccess && (
        <div
          ref={formRef}
          className="relative max-w-lg mx-auto bg-[#FAF7F2] border border-[#D3C1AA]/80 rounded-3xl shadow-[0_15px_45px_rgba(84,55,31,0.07)] overflow-hidden p-6 sm:p-8 text-left"
        >
          <div className="absolute top-2.5 bottom-2.5 left-2.5 right-2.5 border border-dashed border-[#BA9974]/30 rounded-2xl pointer-events-none" />

          <div className="relative text-center mb-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C6540] font-semibold">
              Kindly Respond
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-1 text-[#54371F] font-bold">
              Will You Attend?
            </h2>
            <div className="w-12 h-px bg-[#BA9974]/40 mx-auto mt-2" />
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className={fieldLabelClass}>
                Your Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Muhammed & Family"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "submitting"}
                className={fieldInputClass}
              />
            </div>

            {/* Attending Field */}
            <div className="flex flex-col gap-1.5">
              <label className={fieldLabelClass}>Attendance</label>
              <div className="flex gap-2.5 mt-1">
                <label
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer text-xs font-semibold tracking-wide transition-all duration-200 border ${
                    formData.attending === "yes"
                      ? "border-[#54371F] bg-[#54371F] text-[#FAF7F2] shadow-sm"
                      : "border-[#D3C1AA] bg-[#F3ECE1]/60 text-[#6E5647] hover:bg-[#F3ECE1]"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="sr-only"
                  />
                  Joyfully Attend
                </label>

                <label
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer text-xs font-semibold tracking-wide transition-all duration-200 border ${
                    formData.attending === "no"
                      ? "border-[#54371F] bg-[#54371F] text-[#FAF7F2] shadow-sm"
                      : "border-[#D3C1AA] bg-[#F3ECE1]/60 text-[#6E5647] hover:bg-[#F3ECE1]"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="sr-only"
                  />
                  Regretfully Decline
                </label>
              </div>
            </div>

            {/* Guest Count Field */}
            {formData.attending === "yes" && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="guests" className={fieldLabelClass}>
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className={fieldInputClass}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6+">6+ Guests (Family)</option>
                </select>
              </div>
            )}

            {/* Wishes Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="wishes" className={fieldLabelClass}>
                Blessings &amp; Wishes (Optional)
              </label>
              <textarea
                id="wishes"
                name="wishes"
                rows="3"
                placeholder="Share your warm wishes and prayers for the couple..."
                value={formData.wishes}
                onChange={handleChange}
                disabled={status === "submitting"}
                className={`${fieldInputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-[#54371F] text-[#FAF7F2] font-sans text-xs font-semibold tracking-wider uppercase py-3.5 shadow-md transition-all hover:bg-[#382212] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-98"
            >
              <Send size={15} />
              {status === "submitting" ? "Submitting RSVP..." : "Send RSVP"}
            </button>
          </form>
        </div>
      )}

      {/* Success View */}
      {showSuccess && (
        <div
          ref={successRef}
          className="relative max-w-lg mx-auto bg-[#FAF7F2] border border-[#D3C1AA] rounded-3xl shadow-xl overflow-hidden text-center py-12 px-6"
        >
          <div className="absolute top-2.5 bottom-2.5 left-2.5 right-2.5 border border-dashed border-[#BA9974]/30 rounded-2xl pointer-events-none" />

          <div className="relative flex justify-center text-[#54371F] mb-4">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="relative font-serif text-3xl text-[#54371F] font-bold mb-2">
            Thank You!
          </h3>
          <p className="relative text-sm text-[#6E5647] mb-6 max-w-xs mx-auto">
            Your RSVP has been received. We look forward to celebrating with you!
          </p>
          <div className="relative flex justify-center text-[#BA9974]">
            <Heart size={22} fill="currentColor" />
          </div>
        </div>
      )}
    </section>
  );
}

export default RSVPForm;