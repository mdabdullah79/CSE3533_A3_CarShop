function calculateLoan() {
  // Get input values
  const price = parseFloat(document.getElementById("price").value) || 0;
  const interestRate =
    parseFloat(document.getElementById("interestRate").value) || 0;
  const loanTerm = parseFloat(document.getElementById("loanTerm").value) || 0;
  const downpayment =
    parseFloat(document.getElementById("downpayment").value) || 0;

  // Basic validation
  if (price <= 0 || loanTerm <= 0) {
    document.getElementById("permont").textContent = "0";
    return;
  }

  // Loan amount after down payment
  const loanAmount = price - downpayment;

  // Monthly interest rate
  const monthlyInterestRate = interestRate / 100 / 12;

  // Total number of payments
  const numberOfPayments = loanTerm * 12;

  // Monthly payment formula (EMI)
  let monthlyPayment = 0;

  if (interestRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    monthlyPayment =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }

  // Show result rounded to 2 decimals
  document.getElementById("permont").textContent = monthlyPayment
    ? monthlyPayment.toFixed(2)
    : "0";
}

// Attach event listener to button
document.querySelector(".btn-primary").addEventListener("click", (e) => {
  e.preventDefault();
  calculateLoan();
});




