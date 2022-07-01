import React from "react";
import PropTypes from "prop-types";

const Board = (props) => {
  const deleteOnClick = () => {
    props.deleteBoardsCallback();
  };

  const boardComponents = props.boards.map((board) => {
    return (
      <li key={board.id}>
        {board.title} by {board.owner}
      </li>
    );
  });

  return (
    <div>
      <h2>Hello I am Boards</h2>
      <ul>{boardComponents}</ul>
      <button onClick={deleteOnClick}>Delete Board</button>
    </div>
  );
};

Board.propTypes = {
  boards: PropTypes.array.isRequired,
  fetchBoardsCallback: PropTypes.func.isRequired,
};

export default Board;
