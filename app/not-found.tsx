import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-amber-400">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
