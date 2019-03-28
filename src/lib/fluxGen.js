module.exports = (seed, times, variability, positivity) => {//modifying function 
  //remove function name added module.export
  const output = [];
 // var output = [],before
  let current = seed;
    //current = seed,before


  for (var i = 0; i < times; i++) {
   let change = (Math.random() * variability).toFixed(0);
    if ((Math.random() * positivity) <= (positivity / 2)) {
      change = -change;
    } else {
      change = +change;
    }
    current += change;
    output.push(current);
  }
  return output;
};

//this now has no name(module.exports = fluxGenerator; moved to the top)