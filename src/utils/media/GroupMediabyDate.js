import dayjs from 'dayjs';
import formatSectionTitle from './FormatSectionTitle';

export default function groupMediaByDate(media = []) {
  const groups = new Map();

  media.forEach(item => {
    const key = dayjs(item.dateTaken).startOf('day').format('YYYY-MM-DD');

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(item);
  });

  return [...groups.entries()]
    .sort(([a], [b]) => dayjs(b).valueOf() - dayjs(a).valueOf())
    .map(([key, items]) => ({
      id: key,
      title: formatSectionTitle(key),
      collapsed: false,
      collapsible: true,
      items,
    }));
}