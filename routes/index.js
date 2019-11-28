var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send(medianPrime(req.query.n));
});

// our sieve function which will return a list of primes
// up to the limit argument passed
function sieve(limit) {
  var bools = [];
  var primes = [];
  let primesCount;

  // generate a list of booleans all set to true initially
  // the array is indexed from 2 to limit representing all numbers
  // e.g. [true, true, true, true] = [2, 3, 4, 5]
  for (var i = 1; i < limit; i++) {
    bools.push(true);
  }

  // loop from 2 to limit setting the composite numbers to false
  // we start from 2 because we know 1 is not a prime number
  for (var i = 2; i < limit; i++) {
    if (bools[i - 2]) {
      for (var j = i * 2; j <= limit; j += i) {
        bools[j - 2] = false;
      }
    }
  }

  // now generate the list of primes only where
  // there is a true value in the bools array
  for (var p = 0; p < bools.length; p++) {
    if (bools[p]) {
      primes.push(p + 2);
    }
  }
  return primes;
}

// console.log(sieve(10));
// console.log(sieve(10).length);

function medianPrime(n) {
  let arr = sieve(n);
  let medianArr = [];
  if (n < 2) {
    return medianArr;
  }
  // even
  if (arr.length % 2 == 0) {
    medianArr.push(arr[arr.length / 2 - 1]);
  }
  // odd
  medianArr.push(arr[Math.floor(arr.length / 2)]);

  return medianArr;
}

module.exports = router;
