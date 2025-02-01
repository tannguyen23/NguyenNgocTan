var sum_to_n_a = function (n) {
	// your code here
  // Use loop
	var count = 1;
	var result = 0;
	while (count <= n) {
		result += count++;
	}
	return result;
};

var sum_to_n_b = function (n) {
  
	// your code here
	// Use recursive
  if (n <= 0) {
		return 0;
	}
	return n + sum_to_n_b(n - 1);
};


var sum_to_n_c = function (n) {
	// your code here
  // Use formular in math : sum of N = (n * (n + 1)) / 2;
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(10));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
