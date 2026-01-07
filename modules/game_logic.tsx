export function stepArray(cells: number[][]) {
  console.log(cells);
  const newCells = [];
  for (let i = 0; i < cells.length; i++) {
    const row = [];
    for (let j = 0; j < cells[i].length; j++) {
      const newStatus = (cells[i][j] + 1) % 3;
      row.push(newStatus);
    }
    newCells.push(row);
  }
  console.log(newCells);
  return newCells;
}
