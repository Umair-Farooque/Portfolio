import { useState } from 'react';
import emailjs from '@emailjs/browser';

const socialLinks = [
    {
        name: 'Email',
        href: 'mailto:farooq.intellecta@gmail.com',
        value: 'farooq.intellecta@gmail.com',
        icon: (
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
        )
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/umairfaroq/',
        value: 'Linkedin',
        icon: (
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
        )
    },
    {
        name: 'GitHub',
        href: 'https://github.com/Umair-Farooque',
        value: 'Github',
        icon: (
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        )
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/923084624629',
        value: 'WhatsApp Me',
        icon: (
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.187 1.449 4.725 1.451 5.86.003 10.622-4.759 10.625-10.613.001-2.836-1.093-5.501-3.081-7.49-1.987-1.989-4.643-3.085-7.477-3.086-5.86 0-10.622 4.76-10.626 10.615-.001 1.944.505 3.843 1.467 5.514L1.139 21.07l5.508-1.916zm12.355-6.72c-.328-.164-1.944-.96-2.242-1.069-.298-.109-.516-.164-.732.164-.216.328-.838 1.069-1.026 1.287-.188.218-.376.246-.704.082-.328-.164-1.385-.51-2.637-1.628-.974-.869-1.631-1.943-1.821-2.271-.19-.328-.02-.505.144-.668.148-.147.328-.383.493-.574.164-.192.219-.328.328-.547.11-.219.055-.41-.027-.574-.082-.164-.732-1.765-.997-2.42-.258-.62-.52-.536-.732-.547-.188-.01-.403-.012-.619-.012-.216 0-.57.082-.87.41-.3.328-1.144 1.12-1.144 2.731 0 1.611 1.172 3.167 1.332 3.385.16.218 2.3 3.513 5.575 4.924.779.336 1.387.537 1.86.687.782.249 1.493.214 2.055.13.627-.094 1.944-.795 2.217-1.56.273-.765.273-1.42.191-1.56-.081-.137-.298-.219-.627-.383z"/>
            </svg>
        )
    }
];

export const CV = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
                throw new Error('Config missing');
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
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };
    const inputClass =
        'w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/10';

    return (
        <section id="cv-section" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-3xl px-6">
                <h2 className="mb-10 text-4xl font-semibold tracking-tight text-primary">Contact</h2>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Info column */}
                    <div>
                        <p className="text-lg leading-relaxed text-tertiary">
                            Have a project in mind or just want to say hi? Feel free to reach out via the form, or connect with me through any of the channels below.
                        </p>

                        <div className="mt-8 space-y-3.5">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 transition-all hover:border-zinc-650 hover:bg-zinc-900/80 group"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-805 bg-zinc-950 text-zinc-400 transition-transform group-hover:scale-105 group-hover:text-primary">
                                        {link.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-mono text-xs uppercase tracking-wider text-muted group-hover:text-tertiary">
                                            {link.name}
                                        </p>
                                        <p className="truncate text-sm font-semibold text-zinc-300 group-hover:text-primary">
                                            {link.value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
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
                            className={`w-full rounded-full py-3 text-sm font-medium btn-primary ${
                                status === 'submitting' ? 'cursor-not-allowed opacity-50' : ''
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
                                'Message sent ✓'
                            ) : (
                                'Send Message'
                            )}
                        </button>

                        {status === 'success' && (
                            <p className="text-center font-mono text-sm text-accent">
                                Thanks! I'll get back to you as soon as possible.
                            </p>
                        )}

                        {status === 'error' && (
                            <p className="text-center font-mono text-sm text-error">
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


