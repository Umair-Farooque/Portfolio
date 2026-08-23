import { useState } from 'react';

import emailjs from '@emailjs/browser';

const contactInfo = [
    { label: 'Email', value: 'Via the form →' },
    { label: 'Response time', value: 'Usually within 24–48 hours' },
    { label: 'Open to', value: 'Full-time roles & freelance projects' }
];

const CV = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
                    message: formData.message
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            console.error('EmailJS Error Details:', error);
            const errorMsg = error?.text || error?.message || 'Unknown error';
            console.error('EmailJS Error Message:', errorMsg);

            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputClass =
        'w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/5';

    return (
        <section id="cv-section" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-10 text-2xl font-semibold tracking-tight">Contact</h2>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Info column */}
                    <div>
                        <p className="text-sm leading-relaxed text-zinc-600">
                            Have a project in mind or just want to say hi? My inbox is always open —
                            whether it's about RAG systems, LLM applications, or a full-time opportunity.
                        </p>

                        <dl className="mt-8 divide-y divide-zinc-100 border-y border-zinc-100">
                            {contactInfo.map((info) => (
                                <div key={info.label} className="flex items-center justify-between py-3.5 text-sm">
                                    <dt className="text-zinc-500">{info.label}</dt>
                                    <dd>{info.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <a
                            href="/resume.pdf"
                            download
                            className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-[13px] font-medium transition-colors hover:border-zinc-400"
                        >
                            Download Resume ↓
                        </a>
                    </div>

                    {/* Form column */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                className={inputClass}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your email"
                                className={inputClass}
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Subject"
                            className={inputClass}
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Type your message"
                            className={`${inputClass} resize-none`}
                        />

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className={`w-full rounded-full py-3 text-sm font-medium transition-all ${
                                status === 'submitting'
                                    ? 'cursor-not-allowed bg-zinc-300 text-zinc-500'
                                    : 'bg-zinc-900 text-white hover:bg-zinc-700 active:scale-[0.99]'
                            }`}
                        >
                            {status === 'submitting' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Sending...
                                </span>
                            ) : status === 'success' ? (
                                'Message sent — thank you ✓'
                            ) : (
                                'Send Message'
                            )}
                        </button>

                        {status === 'success' && (
                            <p className="text-center font-mono text-xs text-emerald-600">
                                Thanks! I'll get back to you as soon as possible.
                            </p>
                        )}

                        {status === 'error' && (
                            <p className="text-center font-mono text-xs text-red-500">
                                Something went wrong. Please try again later.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CV;