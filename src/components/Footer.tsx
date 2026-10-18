export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛒</span>
              <span className="text-xl font-bold text-white">বাজার দর</span>
            </div>
            <p className="text-green-200 text-sm max-w-xs">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right */}
          <div className="text-sm text-green-300 max-w-xs text-right">
            <p className="italic">
              &ldquo;সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।&rdquo;
            </p>
          </div>
        </div>

        <div className="border-t border-green-700 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-green-400 text-xs">
            © ২০২৬ বাজার দর — সকল অধিকার সংরক্ষিত
          </p>
          <div className="flex gap-4 text-xs text-green-400">
            <span>চাল · ডাল · তেল · সবজি · মাছ · মাংস</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
