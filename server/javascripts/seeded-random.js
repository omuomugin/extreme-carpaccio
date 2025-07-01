/**
 * Seeded random number generator using Mulberry32 algorithm
 * Provides deterministic random sequences for reproducible order generation
 */
function SeededRandom(seed) {
  this.seed = seed || 1
}

SeededRandom.prototype.random = function() {
  var t = this.seed += 0x6D2B79F5
  t = Math.imul(t ^ t >>> 15, t | 1)
  t ^= t + Math.imul(t ^ t >>> 7, t | 61)
  return ((t ^ t >>> 14) >>> 0) / 4294967296
}

SeededRandom.prototype.randomInt = function(min, max) {
  return Math.floor(this.random() * (max - min + 1)) + min
}

SeededRandom.prototype.randomFloat = function(min, max) {
  return this.random() * (max - min) + min
}

SeededRandom.prototype.sample = function(array) {
  return array[this.randomInt(0, array.length - 1)]
}

module.exports = SeededRandom