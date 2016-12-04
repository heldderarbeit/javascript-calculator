var calcMemory = {
  previousNumber: null,
  currentNumber: null,
  // saves latest pressed number/operator
  operatorInp: null,
  digitInp: null,
  // marks the beginning of a new number (for example after an operator)
  newNumber: true,
  // disables pressing the equal button in succession
  equalsOk: false
};

function resetMemory() {
  calcMemory.currentNumber = null;
  calcMemory.previousNumber = null;
  calcMemory.digitInp = null;
  calcMemory.operatorInp = null;
  calcMemory.newNumber = true;
  calcMemory.equalsOk = false;
};

function display(n) {
  $("#output").text(n.toString().substring(0, 10));
};

function clearDisplay() {
  $("#output").text("");
};

function setTextAligning() {
  $("#output").removeClass("textAlignedCenter").addClass("textAlignedRight");
};

function removeTextAligning() {
  $("#output").removeClass("textAlignedRight").addClass("textAlignedCenter");
};

$(".operator").click(function() {

  if (calcMemory.previousNumber && !calcMemory.newNumber) {
    calculate();
  }

  // do not calculate if memory of previous number is empty
  calcMemory.operatorInp = $(this).html();
  
  // operator was pressed between two equal signs
  calcMemory.equalsOk = true;
  calcMemory.newNumber = true;
});

$(".number").click(function() {
  calcMemory.digitInp = $(this).html();

  // new number begins
  if (calcMemory.newNumber) {
    // no number on display after starting the calculator
    if (calcMemory.currentNumber) {
      calcMemory.previousNumber = $("#output").text();
    }
    
    clearDisplay();
    setTextAligning();
    display(calcMemory.digitInp);
    calcMemory.newNumber = false;
    
  } else {
    // append entered number on display
    display($("#output").text() + calcMemory.digitInp);
  }
  // update current number
  calcMemory.currentNumber = $("#output").text();
});

$("#allClear").click(function() {
  clearDisplay();
  resetMemory();
});

$("#clearEntry").click(function() {
  clearDisplay();
  calcMemory.currentNumber = null;
});

$("#decimalPoint").click(function() {
  if (calcMemory.currentNumber != null) {
    display($("#output").text() + ".");
  }
});

$("#equals").click(function() {
  if (calcMemory.equalsOk) {
    calcMemory.equalsOk = false;
    calculate();
  }
});

$("#setSign").click(function() {
  // toggles between + and - as sign
  if (calcMemory.currentNumber) {
    calcMemory.currentNumber = 0 - calcMemory.currentNumber;
    display(calcMemory.currentNumber);
  }
});

function calculate() {
  
  // for chaining mathematical operations
  var tempN = calcMemory.currentNumber;

  // calculator starts with memory of zero
  if (!calcMemory.previousNumber) {
    calcMemory.previousNumber = 0;
  }
  
  if (!calcMemory.currentNumber) {
    calcMemory.currentNumber = 0;
  }
 
  var factor1 = parseFloat(calcMemory.previousNumber, 10);
  var factor2 = parseFloat(calcMemory.currentNumber, 10);

  var equOk = true;

  switch (calcMemory.operatorInp) {

    case '+':
      calcMemory.currentNumber = factor1 + factor2;
      break;
    case '-':
      calcMemory.currentNumber = factor1 - factor2;
      break;
    case '×':
      calcMemory.currentNumber = factor1 * factor2;
      break;
    case '÷':
      if (factor2 != 0) {
        calcMemory.currentNumber = factor1 / factor2;
      } else {
        equOk = false;
      }
      break;
    default:
      break;
  }

  if (equOk) {
    calcMemory.previousNumber = tempN;
    display(calcMemory.currentNumber);
    calcMemory.newNumber = true;
    calcMemory.operatorInp = null;
  } else {
    display("UNDEFINED");
    resetMemory();
    removeTextAligning();
  }
};
