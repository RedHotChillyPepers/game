/**
 * Generate a random number between `min` and `max`.
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Return one of the values matching the randomly selected weight.
 */
export function randomWeights(weights, values) {
  const num = Math.random();
  let s = 0;
  let lastIndex = weights.length - 1;

  for (var i = 0; i < lastIndex; ++i) {
    s += weights[i];
    if (num < s) {
      return values[i];
    }
  }

  return values[lastIndex];
}

/**
 * Return one of the values.
 */
export function randomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

/**
 * Return `true` if probability is matched.
 */
export function randomProbability(probability) {
  return Math.random() > 1 - probability;
}
