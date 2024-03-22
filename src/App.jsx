import { useState } from "react";

const INITIAL_MAZE = [
  ["wall", "wall", "wall", "wall"],
  ["start", "path", "path", "wall"],
  ["wall", "wall", "path", "wall"],
  ["wall", "wall", "path", "end"],
  ["wall", "wall", "wall", "wall"],
];

const App = () => {
  const [maze, setMaze] = useState(INITIAL_MAZE);

  const generateMaze = (height, width) => {
    const matrix = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => {
        return "wall";
      })
    );

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    function isValidCell(x, y) {
      return (
        y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === "wall"
      );
    }

    function carvePath(x, y) {
      matrix[y][x] = "path";

      const directions = dirs.sort(() => Math.random() - 0.5);

      for (const [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;

        if (isValidCell(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny);
        }
      }
    }

    carvePath(1, 1); // Start carving path from (1, 1)
    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";
    setMaze(matrix);
  };

  return (
    <div className="maze-grid">
      <button className="maze-button" onClick={() => generateMaze(10, 10)}>
        Refresh maze
      </button>
      <div className="maze">
        {maze.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
