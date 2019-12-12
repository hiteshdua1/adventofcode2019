function calculateVelocity(baseMoon, compareMoon) {
  baseMoon.vel.x += checkPull(baseMoon.pos.x, compareMoon.pos.x);
  baseMoon.vel.y += checkPull(baseMoon.pos.y, compareMoon.pos.y);
  baseMoon.vel.z += checkPull(baseMoon.pos.z, compareMoon.pos.z);
}

function calculatePosition(moon) {
  moon.pos.x += moon.vel.x;
  moon.pos.y += moon.vel.y;
  moon.pos.z += moon.vel.z;
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

  for (let iteration = 0; iteration < 1000; iteration++) {
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
  }

  console.log(moons);

  // calculate kinetic energy
  let totalSystemEnergy = 0;
  for (let i = 0; i < moons.length; i++) {
    totalSystemEnergy += totalEnergy(moons[i]);
  }

  console.log(totalSystemEnergy);
}

simulate(`<x=13, y=-13, z=-2>
<x=16, y=2, z=-15>
<x=7, y=-18, z=-12>
<x=-3, y=-8, z=-8>`);
