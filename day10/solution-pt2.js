function calculatePoints(point1, point2) {
  const deltaY = point2.y - point1.y;
  const deltaX = point2.x - point1.x;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const slope = deltaY / deltaX;
  let theta = Math.atan2(deltaY, deltaX);
  theta *= 180 / Math.PI;
  // rads to degs
  if (theta < 0) {
    theta = 360 + theta;
  }
  theta = theta % 270;
  return {
    slope: `${theta} ${slope}`,
    distance,
    theta,
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
    monitoringStationAsteriod;
  let count = 0;

  for (let index1 = 0; index1 < asteriods.length; index1++) {
    const asteriod = `${asteriods[index1].x} ${asteriods[index1].y}`;

    let groups = _.groupBy(matrixMap[asteriod].points, "slope");

    count = Object.keys(_.groupBy(matrixMap[asteriod].points, "slope")).length;

    if (count > maxCount) {
      maxCount = count;
      monitoringStationAsteriod = asteriod;
    }
    matrixMap[asteriod].count = count;
    matrixMap[asteriod].groups = groups;
  }

  //     console.log(matrixMap);
  //     console.log(monitoringStationAsteriod);
  console.log(matrixMap[monitoringStationAsteriod]);
  //     console.log(maxCount);

  for (let i = 0; i < matrixMap[monitoringStationAsteriod].points.length; i++) {
    const pointcheck = matrixMap[monitoringStationAsteriod].points[i].point2;

    if (`${pointcheck.x} ${pointcheck.y}` === "11 12") {
      console.log(matrixMap[monitoringStationAsteriod].points[i]);
    }
  }

  let vaporizedCount = 0;
  const keys = Object.keys(matrixMap[monitoringStationAsteriod].groups);
  const sortedKeys = keys.sort((a, b) => {
    const [theta1, slope1] = a.split(" ");
    const [theta2, slope2] = b.split(" ");
    return theta1 - theta2;
  });

  while (vaporizedCount < sortedKeys.length) {
    const currentKey = sortedKeys[vaporizedCount];
    if (
      vaporizedCount === 0 ||
      vaporizedCount === 1 ||
      vaporizedCount === 199
    ) {
      console.log(matrixMap[monitoringStationAsteriod].groups[currentKey]);
    }
    vaporizedCount++;
  }

  //     console.log(matrixMap[monitoringStationAsteriod]);
  //     console.log(vaporizedCount);
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
