"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdClose } from "react-icons/md";
const SHIPS = [5, 4, 3, 3, 2];
export default function EnemyBoard({ initialBoard, saveBoard }) {
  const [board, setBoard] = useState(initialBoard);
  const [errorCells, setErrorCells] = useState([]);

  const rows = board.length;
  const cols = board[0].length;
  function isShipKilled(cells, boardd) {
    return cells.every(([r, c]) => boardd[r][c] === 3);
  }
  function markNeighboursAsUsed(newBoard, cells) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    cells.forEach(([r, c]) => {
      directions.forEach(([dr, dc]) => {
        const x = r + dr;
        const y = c + dc;

        if (x >= 0 && y >= 0 && x < rows && y < cols && newBoard[x][y] === 0) {
          newBoard[x][y] = 2;
        }
      });
    });
  }
  function exploreShip(r, c, visited = new Set()) {
    const key = `${r}-${c}`;
    visited.add(key);

    const cells = [[r, c]];

    const neighbors = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (const [x, y] of neighbors) {
      const k = `${x}-${y}`;
      if (
        x >= 0 &&
        y >= 0 &&
        x < rows &&
        y < cols &&
        (board[x][y] === 1 || board[x][y] === 3) &&
        !visited.has(k)
      ) {
        cells.push(...exploreShip(x, y, visited));
      }
    }

    return cells;
  }

  const handleClick = (row, col) => {
    const newBoard = board.map((r) => [...r]);

    if (newBoard[row][col] === 1) {
      newBoard[row][col] = 3;

      const shipCells = exploreShip(row, col);
      if (isShipKilled(shipCells, newBoard)) {
        markNeighboursAsUsed(newBoard, shipCells);
      }
    } else if (newBoard[row][col] === 0) {
      newBoard[row][col] = 2;
    }

    setBoard(newBoard);
    console.log(JSON.stringify(newBoard));
    saveBoard(JSON.stringify(newBoard));
  };
  function reset() {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    ]);
    saveBoard(
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    );
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col p-4 gap-2 bg-base-100 rounded-2xl shadow-2xl m-5">
        <h2 className="text-xl font-bold text-center">Enemy Field</h2>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
          <div className=" flex flex-col gap-2 justify-center">
            <div className="grid grid-cols-10 gap-0.5">
              {board.map((row, rIndex) =>
                row.map((col, cIndex) => (
                  <button
                    key={`${rIndex}-${cIndex}`}
                    onClick={() => handleClick(rIndex, cIndex)}
                    className={
                      "w-6 h-6 rounded md:w-8 md:h-8 " +
                      (col === 0 ? "bg-blue-200" : "") +
                      (col === 1 ? "bg-blue-200" : "") +
                      (col === 2 ? "bg-black" : "") +
                      (col === 3 ? "bg-red-700" : "")
                    }
                  >
                    {col === 3 && <MdClose className={"w-full h-full"} />}
                  </button>
                ))
              )}
            </div>
            <button className="btn btn-primary" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
