"use client";
import Cell from "@/components/cell";
import { stepArray } from "@/modules/game_logic";
import { JSX, useState } from "react";

export default function Home() {
  const [size, setSize] = useState(5);
  const [cells, setCells] = useState<number[][]>(resetCells(size));

  const [inGame, setInGame] = useState(false);
  const [stepCount, setStepCount] = useState(0);

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
    setStepCount(0);
    setInGame(false);
  }

  function stepGame() {
    if (!inGame) {
      setInGame(true);
    }
    setCells(stepArray(cells));
    setStepCount(stepCount + 1);
  }

  function handleCellClick(x: number, y: number, status: number) {
    // if (inGame) return;
    const newCells = cells.map((row) => row.slice());
    newCells[x][y] = (status + 1) % 4;
    setCells(newCells);
  }

  function generateCellElements() {
    const elements: JSX.Element[][] = [];
    cells.map((row, i) => {
      const rowElements: JSX.Element[] = [];
      row.map((status, j) => {
        rowElements.push(
          <Cell
            key={`${i}-${j}`}
            x={i}
            y={j}
            status={status}
            onClick={handleCellClick}
          />
        );
      });
      elements.push(rowElements);
    });
    return elements;
  }

  return (
    <div>
      <a
        className="p-3 text-blue-500 underline absolute bottom-0 right-0 text-3xl"
        href="https://github.com/ichir0roie/burning_two_d_array/blob/main/modules/game_logic.tsx"
      >
        GitHub
      </a>
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => sizeHandler(-1)}
        >
          -
        </button>
        <div className="p-3">{size}</div>
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => sizeHandler(1)}
        >
          +
        </button>
      </div>
      <div className="flex">
        <button
          className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={stepGame}
        >
          Step Game
        </button>
        <div className=" p-3">Step Count: {stepCount}</div>
      </div>
      {generateCellElements().map((row, rowIndex) => (
        <div className="flex p-3" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div className="p-3" key={cellIndex}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
