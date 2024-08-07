import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./game.css";

export default function Game() {
  const navigate = useNavigate();

  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState([{ x: 5, y: 5 }]);
  const [jFood, setJFood] = useState([
    { x: 5, y: 7 },
    { x: 7, y: 5 },
  ]);
  const [stone, setStone] = useState([
    { x: 8, y: 11 },
    { x: 9, y: 10 },
  ]);
  const [dir, setDir] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(80);
  const gridSize = { x: 17, y: 15 };

  //GAME VARS
  const [points, setPoints] = useState(0);
  let medals = Math.floor(points / 50);
  let trophies = Math.floor(medals / 3);
  let phase = Math.floor(points / 50) + 1;
  let snakeStyle;
  const [foodEaten, setFoodEaten] = useState(0);
  const [jFoodEaten, setJFoodEaten] = useState(0);
  const [nick, setNick] = useState("Anônimo");

  if (phase <= 0) {
    phase = 1;
  } else if (phase > 5) {
    phase = 5;
  }

  const handleDarkMode = () => {
    const darkCheck = document.getElementById("game-dark-check");
    const gameBoard = document.querySelector(".gameBoard");
    if (darkCheck.checked) {
      if (gameBoard) {
        gameBoard.classList.add("dark");
        document.body.style.backgroundColor = "#0c502c";
      }
    } else {
      if (gameBoard) {
        gameBoard.classList.remove("dark");
        document.body.style.backgroundColor = "#18ac5c";
      }
    }
  };
  snakeStyle = `snake${phase}`;

  const handleKeyPress = (e) => {

    if (dir !== "DOWN" && e.key == "ArrowUp") {
      console.log(dir);
      setDir("UP");
    } else if (e.key == "ArrowRight" && dir != "LEFT") {
      setDir("RIGHT");
    } else if (e.key == "ArrowDown" && dir != "UP") {
      setDir("DOWN");
    } else if (e.key == "ArrowLeft" && dir != "RIGHT") {
      setDir("LEFT");
    }


    /* switch (e.key) {
      case "ArrowUp":
        setDir("UP");
        break;
      case "ArrowRight":
        setDir("RIGHT");
        break;
      case "ArrowDown":
        setDir("DOWN");
        break;
      case "ArrowLeft":
        setDir("LEFT");
        break;
      default:
        break;
    } */
  };

  const SnakeMove = () => {
    if (!gameOver) {
      const newSnake = snake.map((segment) => ({ ...segment }));
      let head = { ...newSnake[0] };

      switch (dir) {
        case "UP":
          head.y -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
      }
      newSnake.unshift(head);

      //acha o index onde a coordenada da comida for igual o da cabeça da cobra
      const foodIndex = food.findIndex(
        (coord) => coord.x == head.x && coord.y == head.y
      );

      const jFoodIndex = jFood.findIndex(
        (coord) => coord.x == head.x && coord.y + 1 == head.y
      );

      const stoneIndex = stone.findIndex(
        (coord) => coord.x == head.x && coord.y + 2 == head.y
      );

      if (stoneIndex !== -1) {
        setGameOver(true);
      }

      if (foodIndex !== -1) {
        setFood(generateFood());
        setJFood(generateJFood());
        setStone(generateStone());
        setPoints(points + 10);
        setFoodEaten(foodEaten + 1);
        newSnake.pop();
      } else if (jFoodIndex !== -1) {
        setFood(generateFood());
        setJFood(generateJFood());
        setStone(generateStone());
        switch (jFoodEaten) {
          case 0:
            setPoints(points - 2);
            setGameSpeed(gameSpeed - 10);
            break;
          case 1:
            setPoints(points - 4);
            setGameSpeed(gameSpeed - 10);
            break;
          case 2:
            setPoints(points - 6);
            setGameSpeed(gameSpeed - 10);
            break;
          case 3:
            setPoints(points - 8);
            setGameSpeed(gameSpeed - 10);
            break;
          case 4:
            setPoints(points - 10);
            setGameSpeed(gameSpeed - 10);
            break;

          default:
            setPoints(points - 10);
            break;
        }
        setJFoodEaten(jFoodEaten + 1);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }
  };

  const checkCollision = () => {
    if (points <= 0 && jFoodEaten > 0) {
      setGameOver(true);
    }

    let head = snake[0];

    if (
      head.x > gridSize.x - 1 ||
      head.y > gridSize.y - 1 ||
      head.x < 0 ||
      head.y < 0
    ) {
      setGameOver(true);
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
        break;
      }
    }
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = [];
      for (let i = 0; i < phase; i++) {
        newFood.push({
          x: Math.floor(Math.random() * gridSize.x),
          y: Math.floor(Math.random() * gridSize.y),
        });
      }
    } while (
      snake.some(
        (segment) => newFood[0].x == segment.x && newFood[0].y == segment.y
      )
    );

    // checando se comida nasceu no mesmo bloco que rocha
    newFood.forEach(food => {
      stone.forEach(rock => {
        if (
          food.x == rock.x ||
          food.y == rock.y
        ) {
          generateFood();
        }
      });
    });


    for (let i = 0; i < newFood.length; i++) {
      if (newFood[i].x >= gridSize.x || newFood[i].y >= gridSize.y) {
        generateFood();
        return;
      }
    }
    return newFood;
  };

  const generateJFood = () => {
    let newJFood;
    do {
      newJFood = [];
      for (let i = 0; i < phase + 1; i++) {
        newJFood.push({
          x: Math.floor(Math.random() * gridSize.x),
          y: Math.floor(Math.random() * gridSize.y - 1),
        });
      }
    } while (
      snake.some(
        (segment) => newJFood[0].x == segment.x && newJFood[0].y == segment.y
      )
    );

    for (let i = 0; i < newJFood.length; i++) {
      if (
        newJFood[i].x >= gridSize.x ||
        newJFood[i].y >= gridSize.y ||
        newJFood[i].x < 0 ||
        newJFood[i].y < 0
      ) {
        generateJFood();
      }
    }

    return newJFood;
  };

  const generateStone = () => {
    let newStone;
    do {
      newStone = [];
      for (let i = 0; i < phase + 1; i++) {
        newStone.push({
          x: Math.floor(Math.random() * gridSize.x),
          y: Math.floor(Math.random() * gridSize.y - 2),
        });
      }
    } while (
      snake.some(
        (segment) => newStone[0].x == segment.x && newStone[0].y == segment.y
      )
    );

    for (let i = 0; i < newStone.length; i++) {
      if (
        newStone[i].x >= gridSize.x ||
        newStone[i].y > gridSize.y - 3 ||
        newStone[i].x < 0 ||
        newStone[i].y < 0
      ) {
        generateStone();
      }
    }

    return newStone;
  };

  const handleRankSubmit = () => {
    if (gameOver) {
      localStorage.setItem(
        `userData${localStorage.length}`,
        JSON.stringify({
          nick: nick,
          points: points,
          food: foodEaten,
          medals: medals,
          trophies: trophies,
        })
      );
    }
    navigate("/rank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleDarkMode();
      SnakeMove();
      checkCollision();
    }, gameSpeed);

    window.addEventListener("keydown", (e) => {
      if (isRunning == true) {
        handleKeyPress(e);
      } else {
        setIsRunning(true);
        handleKeyPress(e);
      }
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver, dir, snake, points]);

  return (
    <div id="game-container">
      <div className="game-data">
        <h2>Pontos:</h2>
        <p>{points}</p>
        <h2>Frutas:</h2>
        <p>{foodEaten}</p>
        <h2>Comida não saudáveis:</h2>
        <p>{jFoodEaten}</p>
      </div>
      <label htmlFor="game-dark-check">
        <input type="checkbox" name="" id="game-dark-check" />
        <div className="ball"></div>
      </label>

      {gameOver ? (
        <>
          <div id="game-over">
            <h1>Game Over!</h1>
            <label htmlFor="game-nick">Nickname:</label>
            <input
              type="text"
              id="game-nick"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
            <button onClick={handleRankSubmit} id="game-btn">Submit</button>
          </div>
        </>
      ) : (
        <>
          <div className="gameBoard">
            {Array.from({ length: gridSize.y }).map((_, rowIndex) => (
              <div key={rowIndex} className="row">
                {Array.from({ length: gridSize.x }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`cell ${snake.some(
                      (seg) => seg.x === colIndex && seg.y === rowIndex
                    ) && snakeStyle
                      }`}
                  >
                    <div
                      className={`cell ${food.some(
                        (pos) => pos.x == colIndex && pos.y == rowIndex
                      ) && "food"
                        }`}
                    />
                    <div
                      className={`cell ${jFood.some(
                        (pos) => pos.x == colIndex && pos.y == rowIndex
                      ) && "jFood"
                        }`}
                    />
                    <div
                      className={`cell ${stone.some(
                        (pos) => pos.x == colIndex && pos.y == rowIndex
                      ) && "stone"
                        }`}
                    ></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
