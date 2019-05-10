import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartOn: 0.25
  };

  constructor(props) {
    super(props);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.state = {
      hasWon: false,
      board: this.createBoard(this.props.nRows, this.props.nCols)
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard(rows, columns) {
    let board = [];

    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let k = 0; k < columns; k++) {
        board[i].push(
          Math.random() < this.props.chanceLightStartOn ? true : false
        );
      }
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { nRows, nCols } = this.props;
    let board = this.state.board;
    let hasWon = false;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    hasWon = this.checkIfWon();

    this.setState({ board, hasWon });
  }

  checkIfWon = () => {
    let board = this.state.board;
    let won = true;

    for (let i = 0; i < board.length; i++) {
      for (let k = 0; k < board[i].length; k++) {
        if (board[i][k] === true) {
          won = false;
        }
      }
    }

    return won;
  };


  render() {
    // if the game is won, just show a winning msg & render nothing else

    
    const congrat = (
      <div>
        <div className="neon">Du</div>
        <div className="flux">vann!</div>
      </div>
    );
    const gameBoard = (
      <div>
        <div className="neon-container">
          <div className="neon">Lights</div>
          <div className="flux">Out</div>
        </div>

        <table className="Board">
          <tbody>
            {this.state.board.map((row, i) => (
              <tr key={i}>
                {row.map((column, l) => (
                  <Cell
                    key={i + "-" + l}
                    coord={i + "-" + l}
                    flipCellsAroundMe={this.flipCellsAround}
                    isLit={column}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    return <div>{this.state.hasWon ? congrat : gameBoard}</div>;

    
  }
}

export default Board;
