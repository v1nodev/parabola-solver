function createPoint(point) {
  if (Array.from(point)[0] === "-") {
    throwError("Invalid point (Have you followed point notation?)");
    return;
  }
  // remove parentheses from input
  var point = point.slice(1, -1);
  var splitPoint = point.split(", ");
  // return as an object with the x and y as separate properties
  return { x: parseFloat(splitPoint[0]), y: parseFloat(splitPoint[1]) };
}

function throwError(message) {
  // stops error msg from stacking if user presses graph button more then once with invalid inputs
  if (document.getElementById("error-div") !== null) {
    return;
  }
  const errorDiv = document.createElement("div");
  errorDiv.id = "error-div";
  const errorContent = document.createTextNode(message);
  errorDiv.appendChild(errorContent);
  document.body.insertBefore(
    errorDiv,
    document.getElementById("graph-error-container")
  );
}

function matrixDet(p1, p2, p3) {
  // calculates determinant of the 3x3 matrix created in a three point calculation
  let j = Math.pow(p1.x, 2);
  let k = p1.x;

  let det =
    j * (p2.x - p3.x) -
    k * (Math.pow(p2.x, 2) - Math.pow(p3.x, 2)) +
    (Math.pow(p2.x, 2) * p3.x - Math.pow(p3.x, 2) * p2.x);

  return det;
}

function checkInputFields() {
  // when an input fields value is changed this will check if they all have inputs so the button will appear
  if (document.getElementById("thirdinputoption") !== null) {
    console.log("three inputs checked");
    if ((field1.value && field2.value && field3.value) !== "") {
      console.log("boxes filled");
      button.disabled = false;
      button.textContent = "Graph Parabola";
    } else {
      button.textContent = "Please fill all boxes";
      button.disabled = true;
    }
  } else {
    console.log("two inputs checked");
    if ((field1.value && field2.value) !== "") {
      console.log("boxes filled");
      button.disabled = false;
      button.textContent = "Graph Parabola";
    } else {
      button.textContent = "Please fill all boxes";
      button.disabled = true;
    }
  }
}

function PlotErrorPoints(p1, p2, p3) {
  // when error occurs plot points so user can see why input does not work
  calculator.setExpression({
    id: "point1",
    latex: `(${p1.x}, ${p1.y})`,
    color: "#000000",
    label: `(${p1.x}, ${p1.y})`,
    showLabel: true,
    labelOrientation: Desmos.LabelOrientations.ABOVE,
  });
  calculator.setExpression({
    id: "point2",
    latex: `(${p2.x}, ${p2.y})`,
    color: "#000000",
    label: `(${p2.x}, ${p2.y})`,
    showLabel: true,
    labelOrientation: Desmos.LabelOrientations.ABOVE,
  });
  if (p3 !== null) {
    calculator.setExpression({
      id: "point3",
      latex: `(${p3.x}, ${p3.y})`,
      color: "#000000",
      label: `(${p3.x}, ${p3.y})`,
      showLabel: true,
      labelOrientation: Desmos.LabelOrientations.ABOVE,
    });
  }
}

function RemoveExpressions() {
  calculator.removeExpression({id: 'graph'});
  calculator.removeExpression({id: 'y-int'});
  calculator.removeExpression({id: 'eqn-label'});
  for (i = 0; i < 4; i++ ) {
    calculator.removeExpression({id: `point${i}`});
  }
}

function IsNaNMultiple(x, y, z) {
  if (isNaN(x) || isNaN(y) || isNaN(z)) {
    return true;
  } else {
    return false;
  }
}