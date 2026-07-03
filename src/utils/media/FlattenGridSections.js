export default function flattenGridSections(sections = []) {
  const data = [];

  sections.forEach(section => {
    data.push({
      type: 'header',
      id: `${section.id}-header`,
      section,
    });

    section.rows.forEach((row, index) => {
      data.push({
        type: 'row',
        id: `${section.id}-row-${index}`,
        section,
        items: row,
      });
    });
  });

  return data;
}