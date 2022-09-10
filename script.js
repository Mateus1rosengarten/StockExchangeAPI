
let x = document.getElementById("xelement");
let y = document.getElementById("yelement");




function fibonacciCalculator(number) {
  let sum = 0;
  let previous = 0;
  let next = 1;
  for (let i = 0; i < number; i++) {
    sum = previous + next;
    previous = next;
    next = sum;
  }
  x.innerHTML = number;
  y.innerHTML = previous;
  return previous
}


fibonacciCalculator(6);













