"use client";
import { useState } from "react";
const SHIPS = [5, 4, 3, 3, 2];
export default function PlayerBoard({ initialBoard, saveBoard }) {
  const [board, setBoard] = useState(initialBoard);

  const rows = board.length;
  const cols = board[0].length;
  function getAvailableShips() {
    const visited = new Set();
    const foundShips = [];
    let errorCells = [];

    const rows = board.length;
    const cols = board[0].length;
    function hasDiagonalConflict(cells) {
      for (const [r, c] of cells) {
        const diagonalNeighbors = [
          [r - 1, c - 1],
          [r - 1, c + 1],
          [r + 1, c - 1],
          [r + 1, c + 1],
        ];

        for (const [x, y] of diagonalNeighbors) {
          if (
            x >= 0 &&
            y >= 0 &&
            x < rows &&
            y < cols &&
            board[x][y] === 1 &&
            !cells.some(([cr, cc]) => cr === x && cc === y)
          ) {
            return true; // illegal diagonal ship detected
          }
        }
      }
      return false;
    }

    function isShipStraight(cells) {
      if (cells.length <= 1) return false;

      const rows = cells.map((c) => c[0]);
      const cols = cells.map((c) => c[1]);

      const allSameRow = rows.every((r) => r === rows[0]);
      const allSameCol = cols.every((c) => c === cols[0]);

      return allSameRow || allSameCol;
    }
    function exploreShip(r, c) {
      visited.add(`${r}-${c}`);
      const cells = [[r, c]];
      const neighbors = [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1],
      ];

      for (const [x, y] of neighbors) {
        const key = `${x}-${y}`;
        if (
          x >= 0 &&
          y >= 0 &&
          x < rows &&
          y < cols &&
          board[x][y] === 1 &&
          !visited.has(key)
        ) {
          cells.push(...exploreShip(x, y));
        }
      }

      return cells;
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r}-${c}`;
        if (board[r][c] === 1 && !visited.has(key)) {
          const cells = exploreShip(r, c);

          if (
            !isShipStraight(cells) ||
            hasDiagonalConflict(cells) ||
            cells.length > Math.max(...SHIPS)
          ) {
            errorCells.push(...cells);
          }

          const size = cells.length;

          const countPlaced = foundShips.filter((s) => s === size).length;
          const countRequired = SHIPS.filter((s) => s === size).length;

          if (countPlaced >= countRequired) {
            errorCells.push(...cells);
          } else {
            foundShips.push(size);
          }
        }
      }
    }
    let availableShips = [];

    const countFound = {};
    foundShips.forEach((size) => {
      countFound[size] = (countFound[size] || 0) + 1;
    });

    const countRequired = {};
    SHIPS.forEach((size) => {
      countRequired[size] = (countRequired[size] || 0) + 1;
    });

    for (const size of SHIPS) {
      if ((countFound[size] || 0) < countRequired[size]) {
        availableShips.push(size);
        countFound[size] = (countFound[size] || 0) + 1;
      }
    }

    return { availableShips, errorCells };
  }

  const handleClick = (row, col) => {
    let newBoard = [...board];
    if (newBoard[row][col] === 0) {
      newBoard[row][col] = 1;
    } else {
      newBoard[row][col] = 0;
    }
    setBoard(newBoard);
  };

  const result = getAvailableShips();
  function isErrorCell(row, col) {
    return result.errorCells.some(([r, c]) => r === row && c === col);
  }
  function boardIsReady() {
    return result.errorCells.length === 0 && result.availableShips.length === 0;
  }
  function onSaveBoard() {
    const boardObject = JSON.stringify(board);
    saveBoard(boardObject);
  }
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col p-4 gap-2 bg-base-100 rounded-2xl shadow-2xl m-5">
        <h2 className="text-xl font-bold text-center">Player Field</h2>
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
                      (isErrorCell(rIndex, cIndex)
                        ? "bg-red-700"
                        : col === 0
                        ? "bg-blue-200"
                        : col === 1
                        ? "bg-gray-600"
                        : "")
                    }
                  />
                ))
              )}
            </div>
            <button
              className="btn btn-primary"
              disabled={!boardIsReady()}
              onClick={onSaveBoard}
            >
              Save
            </button>
          </div>
          <div className="min-w-48 flex flex-col ">
            <h2 className="text-xl font-bold text-center">Available ships</h2>
            <div>
              {result.availableShips.length > 0 ? (
                result.availableShips.map((ship, index) => (
                  <div className="card" key={index}>
                    <div className="card-body p-0 m-0 gap-0 pb-1">
                      <h2 className="card-title">Ship ({ship}x1)</h2>
                      <div className="grid grid-cols-5 gap-0">
                        {[...Array(ship)].map((el, index) => {
                          return (
                            <button
                              key={index}
                              className={"w-8 h-8 rounded bg-gray-600 "}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>No ships available</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
