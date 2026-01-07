// 0: empty, 1: tree, 2: burning, 3: burned

export function stepArray(cells: number[][]) {
  console.log(cells);
  const newCells: number[][] = [];

  const allNextBurnCells: number[][] = [];

  for (let i = 0; i < cells.length; i++) {
    const row = [];
    for (let j = 0; j < cells[i].length; j++) {
      let status = cells[i][j];
      if (status === 0) {
      } else if (status === 2) {
        const newBurnCellPositions = burnCellAction(cells, i, j);
        allNextBurnCells.push(...newBurnCellPositions);
        status = 3;
      }
      row.push(status);
    }
    newCells.push(row);
  }
  allNextBurnCells.forEach(([x, y]) => {
    newCells[x][y] = 2;
  });

  return newCells;
}

function burnCellAction(cells: number[][], x: number, y: number) {
  const newBurnCellPositions: number[][] = [];

  const directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < cells.length && newY >= 0 && newY < cells.length) {
      if (cells[newX][newY] === 1) {
        newBurnCellPositions.push([newX, newY]);
      }
    }
  });
  return newBurnCellPositions;
}
