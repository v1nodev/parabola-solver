 function findEqnThreePoints() {
  var p1 = createPoint(field1.value);
  var p2 = createPoint(field2.value);
  var p3 = createPoint(field3.value);

  console.log("Matrix Determinant: ", matrixDet(p1, p2, p3));
  if (matrixDet(p1, p2, p3) === 0) {
    throwError("At least one of your points is invalid (In Quadratics points cannot be aligned vertically)");
    PlotErrorPoints(p1, p2, p3);
    return;
  }

  // i "borrowed" this code online
  let denom = (p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x);
  let a =
    (p3.x * (p2.y - p1.y) + p2.x * (p1.y - p3.y) + p1.x * (p3.y - p2.y)) /
    denom;
  let b =
    (p3.x * p3.x * (p1.y - p2.y) +
      p2.x * p2.x * (p3.y - p1.y) +
      p1.x * p1.x * (p2.y - p3.y)) /
    denom;
  let c =
    (p2.x * p3.x * (p2.x - p3.x) * p1.y +
      p3.x * p1.x * (p3.x - p1.x) * p2.y +
      p1.x * p2.x * (p1.x - p2.x) * p3.y) /
    denom;

  console.log(`a val: ${a} \nb val: ${b} \nc val: ${c}`);
  graphParabola(a, b, c, p1, p2, p3);
}

function findEqnZerAndPoint() {
  var p = createPoint(field1.value);
  var z1 = createPoint(field2.value);
  var z2 = createPoint(field3.value);

  // makes sure y value of input is zero
  if (z1.y !== 0 || z2.y !== 0) {
    console.log("zeroes are not zeroes");
    throwError("One of your zeroes is invalid (Zeroes must be on the X axis)");
    PlotErrorPoints(p, z1, z2);
    return;
  }

  if (matrixDet(p, z1, z2) === 0) {
    throwError("At least one of your points is invalid (In Quadratics points cannot be aligned vertically)");
    PlotErrorPoints(p, z1, z2);
    return;
  }

  // i copy pasted this code from earlier in the script where i "borrowed" it online
  let denom = (p.x - z1.x) * (p.x - z2.x) * (z1.x - z2.x);
  let a =
    (z2.x * (z1.y - p.y) + z1.x * (p.y - z2.y) + p.x * (z2.y - z1.y)) /
    denom;
  let b =
    (z2.x * z2.x * (p.y - z1.y) +
      z1.x * z1.x * (z2.y - p.y) +
      p.x * p.x * (z1.y - z2.y)) /
    denom;
  let c =
    (z1.x * z2.x * (z1.x - z2.x) * p.y +
      z2.x * p.x * (z2.x - p.x) * z1.y +
      p.x * z1.x * (p.x - z1.x) * z2.y) /
    denom;

  graphParabola(a, b, c, p, z1, z2, "zeroes");
}

function findEqnVerAndPoint() {
  var v = createPoint(field1.value);
  var p = createPoint(field2.value);

  let tempX = p.x - v.x;

  if (tempX === 0) {
    console.log("attempted to divide by zero, tempX: " + tempX);
    throwError("Invalid points (Do they have the same X value?)");
    PlotErrorPoints(p, v, null);
    return;
  }

  let a = (p.y - v.y) / (tempX * tempX);

  let b = -2 * a * v.x;

  let c = a * (v.x * v.x) + v.y;

  console.log(`a val: ${a} \nb val: ${b} \nc val: ${c}`);
  graphParabola(a, b, c, v, p, null, "vertex");
}

function graphParabola(a, b, c, p1, p2, p3, type) {
  let eqnLabelOrient, vertexLabelOrient = Desmos.LabelOrientations.ABOVE;
  // makes sure all input boxes are filled
  if (IsNaNMultiple(a, b, c)) {
    console.log("number is NaN");
    throwError("Invalid point (Have you followed point notation?)");
    return;
  }

  if (a < 0) { eqnLabelOrient = Desmos.LabelOrientations.ABOVE; } 
  else { eqnLabelOrient = Desmos.LabelOrientations.BELOW; }
  
  let pointLabel1 = "Point 1", pointLabel2 = "Point 2", pointLabel3 = "Point 3";
  let eqn = "y = " + a + "x^2 + " + b + "x + " + c;

  switch (type) {
    case "vertex":
      pointLabel1 = "Vertex"; pointLabel2 = "Given Point";
      if (a < 0) { vertexLabelOrient = Desmos.LabelOrientations.BELOW; } 
      else { vertexLabelOrient = Desmos.LabelOrientations.ABOVE; }
      break;
    case "zeroes":
      pointLabel1 = "Given Point"; pointLabel2 = "First Zero"; pointLabel3 = "Second Zero";
      break;
    default:
      break;
  }

  document.getElementById('eqn-text').textContent = 'Equation: ' + eqn;

  calculator.setExpression({
    id: "graph",
    latex: eqn,
    color: Desmos.Colors.BLUE,
  });

  // point expressions
  // this is so many words i hate it
  calculator.setExpression({
    id: "point1",
    latex: `(${p1.x}, ${p1.y})`,
    color: "#000000",
    label: pointLabel1,
    showLabel: true,
    labelOrientation: vertexLabelOrient,
  });
  calculator.setExpression({
    id: "point2",
    latex: `(${p2.x}, ${p2.y})`,
    color: "#000000",
    label: pointLabel2,
    showLabel: true,
    labelOrientation: Desmos.LabelOrientations.ABOVE,
  });
  if (p3 !== null) {
    calculator.setExpression({
      id: "point3",
      latex: `(${p3.x}, ${p3.y})`,
      color: "#000000",
      label: pointLabel3,
      showLabel: true,
      labelOrientation: Desmos.LabelOrientations.ABOVE,
    });
  }
  calculator.setExpression({
    id: "y-int",
    latex: `(0, ${c})`,
    color: Desmos.Colors.RED,
    label: "Y intercept",
    showLabel: true,
    labelOrientation: Desmos.LabelOrientations.ABOVE,
  });

  // find vertex to place label for parabola on it
  let vX = -b / (2 * a);
  let vY = a * (vX * vX) + b * vX + c;
  calculator.setExpression({
    id: "eqn-label",
    latex: `(${vX},${vY})`,
    color: Desmos.Colors.PURPLE,
    label: eqn,
    showLabel: true,
    labelOrientation: eqnLabelOrient,
    secret: true,
    hidden: true,
  });
}
