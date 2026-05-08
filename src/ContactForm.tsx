import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md relative"
    >
      {/* Ambient glow behind the form */}
      <div className="absolute -inset-4 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] rounded-3xl blur-xl pointer-events-none" />
      
      <div className="relative rounded-2xl border border-white/[0.08] bg-black/30 backdrop-blur-md overflow-hidden">
        {/* Animated top accent line */}
        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Inline name + email row */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <motion.div
                className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none"
                animate={{ 
                  borderColor: focusedField === 'name' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                  boxShadow: focusedField === 'name' ? '0 0 20px rgba(255,255,255,0.05)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] text-sm text-white placeholder:text-white/25 focus:outline-none transition-all relative z-10"
              />
            </div>
            <div className="flex-1 relative">
              <motion.div
                className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none"
                animate={{ 
                  borderColor: focusedField === 'email' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                  boxShadow: focusedField === 'email' ? '0 0 20px rgba(255,255,255,0.05)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] text-sm text-white placeholder:text-white/25 focus:outline-none transition-all relative z-10"
              />
            </div>
          </div>

          {/* Message field - compact */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none"
              animate={{ 
                borderColor: focusedField === 'message' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                boxShadow: focusedField === 'message' ? '0 0 20px rgba(255,255,255,0.05)' : 'none'
              }}
              transition={{ duration: 0.3 }}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              required
              rows="3"
              placeholder="Your message..."
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] text-sm text-white placeholder:text-white/25 focus:outline-none transition-all resize-none relative z-10"
            />
          </div>

          {/* Send button + status inline */}
          <div className="flex items-center gap-3">
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                status === 'sending' 
                  ? 'bg-white/10 text-white/40 cursor-wait' 
                  : 'bg-white/[0.08] text-white border border-white/10 hover:bg-white/[0.15] hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]'
              }`}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Send
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium whitespace-nowrap"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Sent!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-red-400 text-xs font-medium whitespace-nowrap"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  Failed
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
