<script lang="typescript">
  import { onMount, afterUpdate } from "svelte";
  import Cell from "@Components/Cell.svelte";
  import { initCells, getNextLifeCycle } from "./BoardManager";
  import { CellData } from "@Types/types";

  export let CELL_COUNT = 2000;
  export let GRID_WIDTH = 50;
  let cells: Array<CellData> = initCells(CELL_COUNT);

  function requestNextCycle() {
    cells = getNextLifeCycle(cells, GRID_WIDTH);
  }
  function resetBoard() {
    cells = initCells(CELL_COUNT);
  }
</script>

<style>
  div.game-board {
    display: flex;
    align-items:center;
    justify-content: center;

    width: 100%;
    max-width: 1000px;
    height: 300px;
    overflow:hidden;
  }

  div.cells {
    display: grid;
    grid-template-columns: repeat(50, 15px);
    grid-template-rows: repeat(50, 15px);
    grid-gap: 5px;
  }

</style>

<div class="game-board">
  <div class="cells">
    {#each cells as cell (cell.id)}
      <Cell bind:alive={cell.alive} id={cell.id} />
    {:else}Brak życia{/each}
  </div>
</div>
<div class="d-flex">
  <button class="btn btn-secondary mt-2 mr-2" on:click={requestNextCycle}>Next cycle</button>
  <button class="btn btn-danger mt-2 ml-auto" on:click={resetBoard}>Restet board</button>
</div>
