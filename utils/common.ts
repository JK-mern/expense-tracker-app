export const getFormattedPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    style: 'currency'
  }).format(price);
};

export const getFormattedDate = (date: Date) => {
  const now = new Date();
  const givenDate = new Date(date);

  const diffMs = now.getTime() - givenDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'In the future';

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return 'A week ago';
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

  const diffMonths =
    now.getMonth() -
    givenDate.getMonth() +
    12 * (now.getFullYear() - givenDate.getFullYear());
  if (diffMonths === 1) return 'A month ago';
  if (diffMonths < 12) return `${diffMonths} months ago`;

  const diffYears = now.getFullYear() - givenDate.getFullYear();
  if (diffYears === 1) return 'A year ago';
  return `${diffYears} years ago`;
};

export const parseSupabaseUrl = (url: string) => {
  let parsedUrl = url;
  if (url.includes('#')) {
    parsedUrl = url.replace('#', '?');
  }
  return parsedUrl;
};
