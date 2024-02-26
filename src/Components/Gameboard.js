import React,{useEffect, useState} from "react";

import '../Game.css';

import Header from "./Header";

import GameCircle from "./GameCircle";

import Footer from "./Footer";

import { isWinner, isDraw } from "./helper";

import { NO_PLAYER, PLAYER_1, PLAYER_2, GAME_STATE_PLAYING, GAME_STATE_WIN, GAME_STATE_DRAW } from "../Constants";
import { NO_CIRCLES } from "../Constants";


const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPlayer,setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER)

    console.log(gameBoard);

    useEffect(() => {
        initGame();
    },[])

    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
    }

    const initBoard = () => {
        console.log(initGame)
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++){
           circles.push(renderCircle(i));
        }
        return circles;
    }

    const circleClicked = (id) => {
        console.log('circle Clicked:' + id)

        if(gameBoard[id] !== NO_PLAYER)return;
        if(gameState !== GAME_STATE_PLAYING)return;
        
    if(isWinner(gameBoard,id,currentPlayer)){
        //console.log("WINNER IS" + currentPlayer);
        setGameState(GAME_STATE_WIN);
        setWinPlayer(currentPlayer);
    }

    if (isDraw(gameBoard)) {
        setGameState(GAME_STATE_DRAW);
        setWinPlayer(NO_PLAYER);
    }

        const board =[...gameBoard];
        board[id] = currentPlayer;

        setGameBoard(prev => {
            return prev.map((circle,pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })


        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)

        console.log(gameBoard)
    }
         

    const renderCircle = id => {
        return <GameCircle id={id} className={`player_${gameBoard[id]=== undefined ? NO_PLAYER : gameBoard[id]}`} onCircleClicked={circleClicked} />
    }

    return(
    <>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
        <div className="gameBoard">
        {initBoard()}
        <Footer onClickEvent={initGame}/>
    </div>
    </>
    )
}

export default GameBoard;