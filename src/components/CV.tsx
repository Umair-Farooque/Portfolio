import { useState } from 'react';
import RainingLetters from './RainingLetters';

import emailjs from '@emailjs/browser';

const CV = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Basic validation to ensure keys are loaded
            if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
                console.error('EmailJS keys are missing from environment variables!');
                throw new Error('Configuration error');
            }

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            console.error('EmailJS Error Details:', error);
            // Provide more specific feedback if possible
            const errorMsg = error?.text || error?.message || 'Unknown error';
            console.error('EmailJS Error Message:', errorMsg);

            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="bg-black text-slate-200 py-16 px-4 md:px-8 lg:px-16 relative min-h-screen flex items-center" id="cv-section" style={{ scrollSnapAlign: 'center' }}>
            <RainingLetters />
            <div className="max-w-4xl mx-auto space-y-12 relative z-10 w-full">

                {/* Contact Section */}
                {/* Contact Section Wrapper */}
                <section className="bg-slate-900/10 backdrop-blur-md rounded-3xl border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden group/container">
                    {/* Decorative Background Glows */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover/container:bg-emerald-500/10 transition-colors" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover/container:bg-emerald-500/10 transition-colors" />

                    <div className="relative z-10 space-y-12">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h3>
                            <p className="text-slate-400">Have a project in mind or just want to say hi? My inbox is always open.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Info Column */}
                            <div className="space-y-6">
                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/923084624629"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-slate-800/50 hover:border-emerald-500/50 hover:bg-black/60 transition-all group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">WhatsApp</span>
                                        <span className="text-sm text-slate-300 block truncate">+92 308 4624629</span>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:farooq.intellecta@gmail.com"
                                    className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-slate-800/50 hover:border-emerald-500/50 hover:bg-black/60 transition-all group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Email</span>
                                        <span className="text-sm text-slate-300 block truncate">farooq.intellecta@gmail.com</span>
                                    </div>
                                </a>

                                {/* GitHub */}
                                <a
                                    href="https://github.com/Muhammad-Umair-Farooq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-slate-800/50 hover:border-emerald-500/50 hover:bg-black/60 transition-all group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                        </svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">GitHub</span>
                                        <span className="text-sm text-slate-300 block truncate">Muhammad-Umair-Farooq</span>
                                    </div>
                                </a>

                                {/* Upwork */}
                                <a
                                    href="https://www.upwork.com/freelancers/~01e690f969b307e342"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-slate-800/50 hover:border-emerald-500/50 hover:bg-black/60 transition-all group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.561 3.312c-2.219 0-4.456 1.028-5.718 3.058a5.13 5.13 0 0 1-.37-.884l-.841-2.692h-3.16v8.682a3.024 3.024 0 0 1-3.021 3.021c-1.666 0-3.021-1.355-3.021-3.021V3.794H1.248v7.417c0 3.1 2.525 5.625 5.626 5.625 3.101 0 5.127-2.152 5.627-5.125h.1c.063.316.19 1.01.44 1.58l.942 2.147-1.144 5.352h3.297l.827-3.807c.843.43 1.734.646 2.574.646 3.103 0 5.63-2.526 5.63-5.627V7.076c.001-2.074-1.503-3.764-3.567-3.764zm0 8.019c-.702 0-1.225-.245-1.554-.72l-.327-.478-.016-.03c-.244-.455-.45-1.077-.665-1.85a11.127 11.127 0 0 1-.161-.63c.535-1.344 1.157-2.137 2.723-2.137 1.258 0 2.316.81 2.316 2.137v3.582c0 1.1-.403 2.126-2.316 2.126z" />
                                        </svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Upwork</span>
                                        <span className="text-sm text-slate-300 block truncate">Top Rated Plus</span>
                                    </div>
                                </a>
                            </div>

                            {/* Form Column */}
                            <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 md:p-8 w-full shadow-inner">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your Name"
                                                className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="yourmail@example.com"
                                                className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-slate-300 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Type your subject"
                                            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Type your message"
                                            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className={`w-full py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${status === 'submitting'
                                            ? 'bg-emerald-600/50 cursor-not-allowed text-white/50'
                                            : 'bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-green-500/25 backdrop-blur-md border border-emerald-500/30 text-emerald-300 hover:from-emerald-500/40 hover:to-green-500/40 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] shadow-lg'
                                            }`}
                                    >
                                        {status === 'submitting' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : status === 'success' ? (
                                            'Message Sent Successfully! ✅'
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>

                                    {status === 'success' && (
                                        <p className="text-emerald-400 text-center text-sm font-medium animate-bounce">
                                            Thanks! I'll get back to you as soon as possible.
                                        </p>
                                    )}

                                    {status === 'error' && (
                                        <p className="text-red-400 text-center text-sm font-medium">
                                            Oops! Something went wrong. Please try again or contact me directly via email.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default CV;
