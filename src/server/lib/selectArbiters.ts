const gen = require('random-seed');

type arbitersPoolType = Object[];

function selectArbiter(arbitersPool: arbitersPoolType, rand) {
  return rand.range(arbitersPool.length);
}

export default function selectArbiters(arbitersPool: arbitersPoolType, seed: String, count: Number): arbitersPoolType {
  if (arbitersPool.length < count) return;
  const rand = gen(seed);

  let selected = [];
  for (let i = 0; i < count; i ++) {
    const arbiterI = selectArbiter(arbitersPool, rand);
    selected.push(arbitersPool[arbiterI]);
    arbitersPool.splice(arbiterI, 1);
  }

  return selected;
}
