import dayjs from 'dayjs';

export default function formatSectionTitle(date) {
  const mediaDate = dayjs(date);
  const today = dayjs();

  if (mediaDate.isSame(today, 'day')) {
    return 'Today';
  }

  if (mediaDate.isSame(today.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }

  if (mediaDate.isSame(today, 'year')) {
    return mediaDate.format('MMMM');
  }

  return mediaDate.format('MMMM YYYY');
}