const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'number' ? val.toString() : String(val);
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function toBengaliPrice(price: number): string {
  // Format numbers with commas (e.g. 1,290)
  const formatted = price.toLocaleString('en-US');
  return `${toBengaliNumber(formatted)} টাকা`;
}

export function getBengaliUnit(unit: string): string {
  const normalized = (unit || '').toLowerCase().trim();
  switch (normalized) {
    case 'kg':
    case 'কেজি':
      return 'প্রতি কেজি';
    case 'liter':
    case 'litre':
    case 'লিটার':
      return 'প্রতি লিটার';
    case 'dozen':
    case 'ডজন':
      return 'প্রতি ডজন';
    case 'piece':
    case 'পিস':
      return 'প্রতি পিস';
    default:
      return normalized.startsWith('প্রতি') ? normalized : `প্রতি ${normalized}`;
  }
}

export function getBengaliDate(dateInput?: Date): string {
  const date = dateInput || new Date();
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  const dayName = days[date.getDay()];
  const day = toBengaliNumber(date.getDate());
  const monthName = months[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  return `${dayName}, ${day} ${monthName}, ${year}`;
}
