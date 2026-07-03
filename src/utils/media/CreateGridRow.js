export default function createGridRows(sections = [], columns = 3) {
  return sections.map(section => {
    const rows = [];

    for (let i = 0; i < section.items.length; i += columns) {
      rows.push(section.items.slice(i, i + columns));
    }

    return {
      ...section,
      rows,
    };
  });
}