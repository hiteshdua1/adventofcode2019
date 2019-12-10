function calculatePoints(point1, point2) {
  const deltaY = point2.y - point1.y;
  const deltaX = point2.x - point1.x;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const slope = deltaY / deltaX;
  let theta = Math.atan2(deltaY, deltaX);
  theta *= 180 / Math.PI; // rads to degs

  return {
    slope: `${slope} ${theta}`,
    distance,
    point1,
    point2
  };
}

function monitoringStation(data) {
  const matrix = data.split("\n").map(row => {
    return row.split("");
  });
  const matrixMap = {};
  const asteriods = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "#") {
        asteriods.push({
          x,
          y
        });
      }
    }
  }

  for (let index1 = 0; index1 < asteriods.length; index1++) {
    for (let index2 = 0; index2 < asteriods.length; index2++) {
      if (asteriods[index1] === asteriods[index2]) {
        continue;
      }
      const asteriod = `${asteriods[index1].x} ${asteriods[index1].y}`;
      if (matrixMap[asteriod] === undefined) {
        matrixMap[asteriod] = {
          points: []
        };
      }
      matrixMap[asteriod].points.push(
        calculatePoints(asteriods[index1], asteriods[index2])
      );
    }
  }

  let maxCount = 0,
    maxAsteriod;
  let count = 0;

  for (let index1 = 0; index1 < asteriods.length; index1++) {
    const asteriod = `${asteriods[index1].x} ${asteriods[index1].y}`;
    if (asteriod === "2 2") {
      console.log(_.groupBy(matrixMap[asteriod].points, "slope"));
    }
    count = Object.keys(_.groupBy(matrixMap[asteriod].points, "slope")).length;

    if (count > maxCount) {
      maxCount = count;
      maxAsteriod = asteriod;
    }
    matrixMap[asteriod].count = count;
  }

  console.log(matrixMap);
  console.log(maxAsteriod);
  console.log(maxCount);
}

monitoringStation(`..............#.#...............#....#....
#.##.......#....#.#..##........#...#......
..#.....#....#..#.#....#.....#.#.##..#..#.
...........##...#...##....#.#.#....#.##..#
....##....#...........#..#....#......#.###
.#...#......#.#.#.#...#....#.##.##......##
#.##....#.....#.....#...####........###...
.####....#.......#...##..#..#......#...#..
...............#...........#..#.#.#.......
........#.........##...#..........#..##...
...#..................#....#....##..#.....
.............#..#.#.........#........#.##.
...#.#....................##..##..........
.....#.#...##..............#...........#..
......#..###.#........#.....#.##.#......#.
#......#.#.....#...........##.#.....#..#.#
.#.............#..#.....##.....###..#..#..
.#...#.....#.....##.#......##....##....#..
.........#.#..##............#..#...#......
..#..##...#.#..#....#..#.#.......#.##.....
#.......#.#....#.#..##.#...#.......#..###.
.#..........#...##.#....#...#.#.........#.
..#.#.......##..#.##..#.......#.###.......
...#....###...#......#..#.....####........
.............#.#..........#....#......#...
#................#..................#.###.
..###.........##...##..##.................
.#.........#.#####..#...##....#...##......
........#.#...#......#.................##.
.##.....#..##.##.#....#....#......#.#....#
.....#...........#.............#.....#....
........#.##.#...#.###.###....#.#......#..
..#...#.......###..#...#.##.....###.....#.
....#.....#..#.....#...#......###...###...
#..##.###...##.....#.....#....#...###..#..
........######.#...............#...#.#...#
...#.....####.##.....##...##..............
###..#......#...............#......#...#..
#..#...#.#........#.#.#...#..#....#.#.####
#..#...#..........##.#.....##........#.#..
........#....#..###..##....#.#.......##..#
.................##............#.......#..`);
