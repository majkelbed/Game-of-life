<script>
  import Board from "@Components/Board/Board";
</script>

<div class="container">
  <main>
    <header>
      <h1>Conway's Game of Life</h1>
      <p>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.[1] It
        is a zero-player game, meaning that its evolution is determined by its
        initial state, requiring no further input. One interacts with the Game
        of Life by creating an initial configuration and observing how it
        evolves. It is Turing complete and can simulate a universal constructor
        or any other Turing machine.
      </p>
    </header>
    <section class="rules mb-3">
      <p>
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, alive or dead, (or populated and unpopulated, respectively).
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent. At each step in
        time, the following transitions occur:
      </p>
      <ul>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbours lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        Any dead cell with exactly three live neighbours becomes a live cell, as
        if by reproduction.
      </ul>
	  <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Read more</a>
    </section>
    <Board />
  </main>
</div>
