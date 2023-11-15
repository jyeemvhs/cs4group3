var numArray = [{name:"tom",money:5000},{name:"chris",money:50000},{name:"adam",money:50}];

numArray.sort(function(a, b) {
  return a.money - b.money;
});

console.log(numArray);