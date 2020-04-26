import { CellData } from "@Types/types";
import * as R from "ramda";
import { getAliveMatrixNeighbours } from "@Functions/index";

export function getNextLifeCycle(current: Array<CellData>, matrixWidth: number) {
    return current.map(cell => {
        const cellAliveNeighbours = getAliveMatrixNeighbours(
          current,
          matrixWidth,
          cell.id
        );
        const cellAliveNeighboursCount = cellAliveNeighbours.length;
        let newCell = {
          ...cell
        };
        if (cellAliveNeighboursCount == 3 && !cell.alive) {
          newCell.alive = true;
        } else if (
          R.or(cellAliveNeighboursCount > 3, cellAliveNeighboursCount < 2) &&
          cell.alive
        ) {
          newCell.alive = false;
        }
        return newCell;
    });
}

export function initCells(count:number) {
    let result: Array<CellData> = [];
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        alive: false
      });
    }
    return result;
  }