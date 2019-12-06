var globalOrbitMap = {};
var totalCount = 0;

function getOrbitNode(source) {
  if (globalOrbitMap[source]) {
    return globalOrbitMap[source];
  }
  globalOrbitMap[source] = {
    orbitors: []
  };
  return globalOrbitMap[source];
}
function orbits(data) {
  let dataPoints = data.split("\n");
  dataPoints.map(points => {
    let [orbitSourceName, orbitorName] = points.split(")");
    let sourceOrbitor = getOrbitNode(orbitSourceName);
    sourceOrbitor.orbitors.push(orbitorName);
  });
  console.log(traverseOrbitMap("COM", 0, ""));
  console.log(globalOrbitMap);
  console.log(totalCount);
}

function traverseOrbitMap(sourceName, count, path) {
  console.log(sourceName, count);
  totalCount += count;
  let source = globalOrbitMap[sourceName];
  if (source && source.orbitors.length > 0) {
    count++;
    path += " " + sourceName;
    for (let i = 0; i < source.orbitors.length; i++) {
      if (source.orbitors[i] === "YOU" || source.orbitors[i] === "SAN") {
        console.log(path + " " + source.orbitors[i]);
      }
      traverseOrbitMap(source.orbitors[i], count, path);
    }
  }
  return count;
}

orbits(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`);
