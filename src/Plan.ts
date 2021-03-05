// tslint:disable: max-classes-per-file

/**
 * Will need to have two of these; one for each player
 */
class Grid {
  // A grid has a 2d array of the squares
  public squares: Square[][] = [];

  constructor(size: number) {
    // Create the squares for this game
    // Could affect game size by altering squares and ships count
    for (let i = 0; i < size; i++) {
      const col: Square[] = [];
      for (let j = 0; j < size; j++) {
        col.push(new Square());
      }
      this.squares.push(col);
    }
  }
}

/**
 * A single square on the grid. Shows what's on that square.
 */
enum Attack {
  HIT,
  MISS,
}

enum Ship {
  SMALL,
  LONG,
  BIG_BOI,
}

class Square {
  // An attack may not have occurred on this square
  // If it has, it can either be a hit or a miss
  public attack?: Attack;
  // A square may, or may not, contain a ship
  // On init, no squares contain ships
  public ship?: Ship;

  // Perform an attack on this square
  public doAttack() {}
}
