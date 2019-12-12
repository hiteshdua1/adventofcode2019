function calculateVelocity(baseMoon, compareMoon) {
  baseMoon.vel.x += checkPull(baseMoon.pos.x, compareMoon.pos.x);
  baseMoon.vel.y += checkPull(baseMoon.pos.y, compareMoon.pos.y);
  baseMoon.vel.z += checkPull(baseMoon.pos.z, compareMoon.pos.z);
}

function calculatePosition(baseMoon, compareMoon) {
  baseMoon.pos.x += baseMoon.vel.x;
  baseMoon.pos.y += baseMoon.vel.y;
  baseMoon.pos.z += baseMoon.vel.z;
}

function checkPull(basePos, comparePos) {
  if (basePos < comparePos) {
    return +1;
  }

  if (basePos > comparePos) {
    return -1;
  }

  return 0;
}

function totalEnergy(moon) {
  return potential(moon) * kinetic(moon);
}

function absSum({ x, y, z }) {
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
}
function potential(moon) {
  return absSum(moon.pos);
}

function kinetic(moon) {
  return absSum(moon.vel);
}

var universeMap = {};

function simulate(data) {
  let moons = data.split("\n");

  // clean data and give base structure
  moons = moons.map(moon => {
    let [x, y, z] = moon.split(",").map(entry => {
      return entry.split("=")[1];
    });
    z = z.substr(0, z.length - 1);
    return {
      pos: {
        x: +x,
        y: +y,
        z: +z
      },
      vel: {
        x: 0,
        y: 0,
        z: 0
      }
    };
  });

  let iteration = 0;
  while (true) {
    // Process an Iteration for velocity
    for (let i = 0; i < moons.length; i++) {
      for (let j = 0; j < moons.length; j++) {
        if (i === j) {
          continue;
        }
        calculateVelocity(moons[i], moons[j]);
      }
    }

    // Update for position
    for (let i = 0; i < moons.length; i++) {
      calculatePosition(moons[i]);
    }

    // Taking universe Snapshot
    let weveImage = "";
    for (let i = 0; i < moons.length; i++) {
      weveImage += `${moons[i].pos.x} ${moons[i].pos.y} ${moons[i].pos.z} ${moons[i].vel.x} ${moons[i].vel.y} ${moons[i].vel.z}`;
    }

    if (universeMap[weveImage]) {
      break;
    }

    universeMap[weveImage] = true;
    iteration++;
  }

  console.log(iteration);
}

// simulate(`<x=-1, y=0, z=2>
// <x=2, y=-10, z=-7>
// <x=4, y=-8, z=8>
// <x=3, y=5, z=-1>`);

simulate(`<x=13, y=-13, z=-2>
<x=16, y=2, z=-15>
<x=7, y=-18, z=-12>
<x=-3, y=-8, z=-8>`);
