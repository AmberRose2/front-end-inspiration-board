import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "./components/Board";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

function App() {
  const URL = "https://gramtaschie.herokuapp.com";

  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedBoardName, setSelectedBoardName] = useState(
    "Select a board to get inspired!"
  );

  const fetchBoards = () => {
    axios
      .get(`${URL}/boards`)
      .then((response) => {
        console.log("fetchBoard request");
        const updatedBoards = response.data;
        console.log(updatedBoards);
        setBoards(updatedBoards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCards = () => {
    axios
      .get(`${URL}/cards`)
      .then((response) => {
        console.log("fetchCard request");
        const updatedCards = response.data;
        console.log(updatedCards);
        setCards(updatedCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => fetchBoards, []);
  useEffect(() => fetchCards, []);

  const createNewBoard = (boardForm) => {
    axios
      .post(`${URL}/boards`, boardForm)
      .then((response) => {
        fetchBoards();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectBoard = (board) => {
    setSelectedBoard(board.id);
    setSelectedBoardName(board.title);
  };

  const deleteBoard = () => {
    axios
      .delete(`${URL}/boards/${selectedBoard}`)
      .then(() => {
        const updatedBoards = [];
        for (const board of boards) {
          if (board.id !== selectedBoard) {
            updatedBoards.push(board);
          }
        }
        setBoards(updatedBoards);
        setSelectedBoard(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewCard = (cardForm) => {
    cardForm.board_id = selectedBoard;
    axios
      .post(`${URL}/cards`, cardForm)
      .then((response) => {
        fetchCards();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likeCard = (card_id) => {
    let newCard = {};
    for (const card of cards) {
      if (card.card_id === card_id) {
        newCard = { ...card };
        newCard.likes_count += 1;
      }
    }
    axios
      .put(`${URL}/cards/${card_id}/like`, newCard)
      .then((response) => {
        fetchCards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCard = (card_id) => {};

  return (
    <div className="container">
      <header className="header">
        <h1>Gramtaschie Inspiration Board</h1>
      </header>
      <section className="board">
        <Board
          boards={boards}
          fetchBoardsCallback={fetchBoards}
          selectBoardCallback={selectBoard}
          deleteBoardsCallback={deleteBoard}
        ></Board>
        <h4>{`Current Board: (id: ${selectedBoard}) ${selectedBoardName}`}</h4>
      </section>
      <section className="boardform">
        <NewBoardForm addBoardCallback={createNewBoard}></NewBoardForm>
      </section>

      <section className="cards">
        <h2>Cards for Board: {selectedBoardName}</h2>
        <div className="cardform">
          <NewCardForm addCardCallback={createNewCard}></NewCardForm>
        </div>
        <CardList
          cards={cards}
          fetchCardsCallback={fetchCards}
          likeCardCallback={likeCard}
          deleteCardCallback={deleteCard}
        ></CardList>
      </section>

      <footer className="footer">© 2022 gramtaschie</footer>
    </div>
  );
}

export default App;
