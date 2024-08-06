import React, { useState, useEffect } from "react";
import "./game.css";

const SnakeGame = () => {
  //ARRAY DE OBJETOS SENDO CORPO DA COBRA, ONDE CADA OBJETO E UM BLOCO DA COBRA
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  //OBJETO DA COMIDA
  const [food, setFood] = useState({ x: 5, y: 5 });
  //DIREÇÃO PARA QUAL A COBRA VAI
  const [direction, setDirection] = useState("RIGHT");
  //VERIFICADOR SE O JOGO TERMINOU OU NAO
  const [gameOver, setGameOver] = useState(false);
  //VELOCIDADE DO TIMEOUT
  const gameSpeed = 80;
  //TAMANHO DE CELULAS QUE O JOGO VAI GERAR (X E Y)
  const gridSize = 17;
  const [isGameStarted, setIsGameStarted] = useState(false);

  //FUNCAO PARA LIDAR COM O CLIQUE DOS BOTOES
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  //FUNCAO PARA MOVER A COBRA
  const moveSnake = () => {
    //SE NAO FOR GAME OVER...
    if (!gameOver) {
      //CRIA UM NOVO CORPO DA COBRA, ONDE TODOS OS VALORES SAO IGUAIS
      const newSnake = snake.map((segment) => ({ ...segment }));
      //DEFINE O PRIMEIRO SEGMENTO COMO A CABEÇA
      let head = { ...newSnake[0] };

      //SWITCHCASE PRA VER A DIREÇÃO E MOVER UMA CÉLULA NA DIREÇÃO DESEJADA
      if (isGameStarted) {
        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
          default:
            break;
        }
      }
      //ADICIONA, NO COMEÇO DO NOVO CORPO DA COBRA, UM NOVO SEGMENTO IGUAL DA CABEÇA PARA AUMENTAR A QUANTIDADE DE SEGMENTOS
      newSnake.unshift(head);

      //VERIFICA SE A COBRA ESTÁ EM CIMA DE UMA COMIDA (COMEU)
      if (head.x === food.x && head.y === food.y) {
        //SE SIM, APENAS JOGUE A COMIDA PARA OUTRA COORDENADA, POIS JA AUMENTOU UM SEGMENTO
        setFood(generateFood());
      } else {
        //SE NAO, REMOVA O PRIMEIRO SEGMENTO (CORPO SE MANTEM O MESMO QUE ANTES DA FUNCAO)
        newSnake.pop();
      }
      //TROCA O ARRAY DE CORPO ANTIGO PELO NOVO
      setSnake(newSnake);
    }
  };

  //VERIFICAR COLISAO
  const checkCollision = () => {
    //NOVAMENTE DEFININDO A CABEÇA COMO O PRIMEIRO SEGMENTO
    const head = snake[0];

    //SE A CABEÇA SAIU DA GRID, GAME OVER
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      setGameOver(true);
    }

    //E SE BATEU NO PROPRIO CORPO TAMBÉM
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
        break;
      }
    }
  };

  //CRIAR NOVA COMIDA
  const generateFood = () => {
    let newFood;
    //REPITA A FUNÇÃO DE DEFINIR UMA NOVA COORDENADA PRA COMIDA
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
      //ENQUANTO ELE FOR DIFERENTE A QUALQUER PARTE DA COBRA
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    //RETORNA AS NOVAS COORDENADAS DA COMIDA
    return newFood;
  };

  //USE EFFECT PRA TRIGGERAR TODA VEZ QUE AS VARIAVEIS SNAKE, DIR E GAMEOVER MUDAREM
  useEffect(() => {
    //A CADA ${gameSpeed} MS, RODAR A FUNÇÃO DE MOVER A COBRA E CHECAR A COLISAO
    const interval = setInterval(() => {
      moveSnake();
      checkCollision();
    }, gameSpeed);

    //LISTENER DE TECLAS
    window.addEventListener("keydown", (event) => {
      if (isGameStarted) {
        handleKeyPress(event);
      } else {
        setIsGameStarted(true);
        handleKeyPress(event);
      }
    });

    //APAGA AS DUAS FUNÇÕES DO USEEFFECT PRA ELAS NAO STACKAREM E CAUSAREM UMA TRAVA NO SITE
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [snake, direction, gameOver]);

  return (
    <div>
      {/* É GAME OVER? */}
      {gameOver ? (
        /* SIM? MOSTRE ISSO: */
        <>
        <h1>Game Over!</h1>
        <button onClick={() => window.location.reload()}>Restart</button>
        </>
      ) : (
        /* NÃO? MOSTRE ISSO: */
        <div>
          {/* CRIA UMA ARRAY NOVA COM A LENGTH IGUAL AO TAMANHO DA GRID E MAPEIA ELA PARA CRIAR AS LINHAS */}
          {Array.from({ length: gridSize }).map((_, rowIndex) => (
            <div key={rowIndex} className="row">
              {Array.from({ length: gridSize }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${
                    snake.some(
                      (segment) =>
                        segment.x === colIndex && segment.y === rowIndex
                    ) && "snake"
                  }`}
                >
                  {food.x === colIndex && food.y === rowIndex && (
                    <div className="food" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
