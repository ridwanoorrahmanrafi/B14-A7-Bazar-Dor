import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="text-8xl">🛒</div>
        <div>
          <h1 className="text-6xl font-bold text-green-800 mb-2">৪০৪</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            পেজ খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-gray-400 text-sm">
            আপনি যে পেজটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে।
          </p>
        </div>

        <Link
          href="/"
          id="go-home-404-btn"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:-translate-y-0.5"
        >
          🏠 হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
