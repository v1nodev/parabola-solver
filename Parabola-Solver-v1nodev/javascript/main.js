const queryString = (window.location.search).split("?type=");
console.log(queryString[1]);

field1 = document.getElementById('value1');
field2 = document.getElementById('value2');
field3 = document.getElementById('value3');

button = document.getElementById("graph-button");
button.disabled = true;

// uses query parameters to set up the proper input options
switch (queryString[1]) {
  case "vertexandpoint":
    document.title = "Vertex and Point Method";
    document.getElementById('thirdinputoption').remove();
    break;
  case "threepoints":
    document.title = "Three Points Method";
    document.getElementById('value1label').textContent = "Enter a point on the graph:";
    field1.placeholder = "Example: (-4, 2) ";
    break;
  case "zeroesandpoint":
    document.title = "Point and Zeroes Method";
    document.getElementById('value1label').textContent = "Enter a point on the graph:";
    field1.placeholder = "Example: (-5, 6)";
    document.getElementById('value2label').textContent = "Enter one of the zeroes:";
    field2.placeholder = "Example: (-2, 0)";
    document.getElementById('value3label').textContent = "Enter the other zero:";
    field3.placeholder = "Example: (-3, 0)";
}

var calculator = Desmos.GraphingCalculator(document.getElementById('calculator'), {
  //invertedColors: true,
  keypad: false, 
  settingsMenu: false, 
  expressionsTopbar: false,
  zoomButtons: false,
  expressions: false
});

function findEqnToUse() {
  // delete error message on run
  if (document.getElementById('error-div') != null) {
    document.getElementById('error-div').remove();
  }

  document.getElementById('eqn-text').textContent = 'Equation: No valid equation';
  RemoveExpressions();
  
  switch (queryString[1]) {
    case "threepoints":
      findEqnThreePoints();
      break;
    case "vertexandpoint":
      findEqnVerAndPoint();
      break;
    case "zeroesandpoint":
      findEqnZerAndPoint();
      break;
    default:
      return;
  }
}
