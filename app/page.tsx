"use client";
import Cell from "@/components/cell";
import { Button, ThemeProvider } from "@material-tailwind/react";
import { JSX, useState } from "react";

export default function Home() {
  const [size, setSize] = useState(5);
  const [cells, setCells] = useState<number[][]>(resetCells(size));

  function resetCells(newSize: number) {
    const newCells: number[][] = [];
    for (let i = 0; i < newSize; i++) {
      const row: number[] = [];
      for (let j = 0; j < newSize; j++) {
        row.push(0);
      }
      newCells.push(row);
    }
    return newCells;
  }

  function sizeHandler(diff: number) {
    const newSize = size + diff;
    if (newSize < 2 || newSize > 10) return;
    setSize(newSize);
    setCells(resetCells(newSize));
  }

  function generateCellElements() {
    const elements: JSX.Element[][] = [];
    for (let i = 0; i < size; i++) {
      const rowElements: JSX.Element[] = [];
      for (let j = 0; j < size; j++) {
        rowElements.push(<Cell key={`${i}-${j}`} />);
      }
      elements.push(rowElements);
    }
    return elements;
  }

  return (
    <ThemeProvider>
      {generateCellElements().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} style={{ margin: "2px" }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
      <div>
        <Button onClick={() => sizeHandler(-1)}>-</Button>
        <div>{size}</div>
        <Button onClick={() => sizeHandler(1)}>+</Button>
      </div>
    </ThemeProvider>
  );
}
