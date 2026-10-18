import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-sm">
        <div className="text-6xl">🔍</div>
        <h2 className="text-2xl font-bold text-green-900">পণ্য খুঁজে পাওয়া যায়নি</h2>
        <p className="text-gray-500">
          এই পণ্যটি বিদ্যমান নেই বা ইউআরএলটি ভুল হতে পারে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
