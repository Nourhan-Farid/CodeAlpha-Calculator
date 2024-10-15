const keys = document.querySelectorAll(".key");
const inputs = document.querySelector(".input");
const outputs = document.querySelector(".output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      inputs.innerHTML = "";
      outputs.innerHTML = "";
    } else if (value == "del") {
      input = input.slice(0, -1);
      inputs.innerHTML = inputClean(input);
    } else if (value == "=") {
      let result = eval(prepareInput(input));

      outputs.innerHTML = outputClean(result);
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      inputs.innerHTML = inputClean(input);
    } else {
      if (inputValidation(value)) {
        input += value;
        inputs.innerHTML = inputClean(input);
      }
    }
  });
}

function inputClean(input) {
  let inputArr = input.split("");
  let inputArrLength = inputArr.length;

  for (let i = 0; i < inputArrLength; i++) {
    if (inputArr[i] == "*") {
      inputArr[i] = `<span>*</span>`;
    } else if (inputArr[i] == "/") {
      inputArr[i] = `<span>÷</span>`;
    } else if (inputArr[i] == "+") {
      inputArr[i] = `<span>+</span>`;
    } else if (inputArr[i] == "-") {
      inputArr[i] = `<span>-</span>`;
    } else if (inputArr[i] == "(") {
      inputArr[i] = `<span>(</span>`;
    } else if (inputArr[i] == ")") {
      inputArr[i] = `<span>)</span>`;
    } else if (inputArr[i] == "%") {
      inputArr[i] = `<span>%</span>`;
    } else if (inputArr[i] == "**") {
      inputArr[i] = `<span>**</span>`;
    }
  }
  return inputArr.join("");
}

function outputClean(output) {
  let outputStr = output.toString();
  let decimal = outputStr.split(".")[1];
  outputStr = outputStr.split(".")[0];
  let outputArr = outputStr.split("");
  let outputArrLength = outputArr.length;
  if (outputArrLength > 3) {
    for (let i = outputArrLength - 3; i > 0; i -= 3) {
      outputArr.splice(i, 0, ",");
    }
  }
  if (decimal) {
    outputArr.push(".");
    outputArr.push(decimal);
  }

  return outputArr.join("");
}

function inputValidation(value) {
  let lastInput = input.slice(-1);
  let operators = ["+", "-", "/", "*", "**"];
  if (value == "." && lastInput == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function prepareInput(input) {
  let inputArr = input.split("");
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] == "%") {
      inputArr[i] = "/100";
    }
  }
  return inputArr.join("");
}
