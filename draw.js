function Graph(op) {
  this.datasets = op.datasets || [];
  this.elementId = op.elementId || "body";
  this.width = op.width || 500;
  this.height = op.height || 500;
  this.run = function() {
    this.paper = new Raphael(
      document.getElementById(this.elementId),
      this.width,
      this.height
    );
    this.graphAllDatasets();
  };
}

Graph.prototype.draw = function() {
  return this;
};
Graph.prototype.draw.path = {};

Graph.prototype.graphAllDatasets = function() {
  let i = this.datasets.length;
  let path = "";
  let max = 0;
  let min = 0;
  let scaleFactor = 0;
  while (i--) {
    this.graphDataset(this.datasets[i]);
  }
  //   let xAxis = this.paper.path(this.draw.xAxis(this.width, this.height));
  //   xAxis.attr({ stroke: "#9cf", "stroke-width": 5 });
  console.log(path);
};

Graph.prototype.graphDataset = function(dataset) {
  let max = dataset.data.reduce(function(a, b) {
    return Math.max(a, b);
  });
  let min = dataset.data.reduce(function(a, b) {
    return Math.min(a, b);
  });
  let strokeWidth = 2;
  if (min > 0) min = 0;
  else min = Math.abs(min);
  let scaleFactorY = (this.height - 5) / (max + Math.abs(min));
  let widthBars = (this.width * 0.75) / dataset.data.length;
  let marginBars = (this.width * 0.25) / dataset.data.length;
  for (let i = 0; i < dataset.data.length; i++) {
    let aBarPath =
      this.draw.aBar(
        i * (widthBars + marginBars),
        this.height - min * scaleFactorY,
        widthBars,
        dataset.data[i] * scaleFactorY
	) + this.draw.path.end();
    console.log(aBarPath);
    let aBar = this.paper.path(aBarPath);
    if (dataset.data[i] < 0) {
      aBar.attr({
        fill: dataset.neg.fill,
        stroke: dataset.neg.stroke,
        "stroke-width": strokeWidth
      });
    } else {
		aBar.attr({
			fill: dataset.pos.fill,
			stroke: dataset.pos.stroke,
			"stroke-width": strokeWidth
		});
    }
}
let xAxisPath = this.draw.xAxis(0,
this.height - min * scaleFactorY, this.width) + this.draw.path.end()
let xAxis = this.paper.path(xAxisPath);
xAxis.attr({
	stroke: dataset.xAxis.stroke,
	"stroke-width": strokeWidth + 1
  })
};

Graph.prototype.draw.aBar = function(x, y, width, height) {
  return (
    this.path.move(Math.floor(x), Math.floor(y)) +
    this.path.line(0, -Math.floor(height)) +
    this.path.line(Math.floor(width), 0) +
    this.path.line(0, Math.floor(height)) +
    this.path.line(-Math.floor(width), 0)
  );
};

Graph.prototype.draw.xAxis = function(x, y, width) {
  return this.path.move(Math.floor(x), Math.floor(y)) + this.path.line(Math.floor(width), 0);
};

Graph.prototype.draw.path.line = function(x, y) {
  return "l " + x + " " + y + " ";
};

Graph.prototype.draw.path.move = function(x, y) {
  return "M " + x + " " + y + " ";
};

Graph.prototype.draw.path.end = function() {
  return "z";
};

function main() {
  let testGraph = new Graph({
    datasets: [
      {
        name: "Expenses",
        data: [
          -100,
          -100,
          -99,
          -200,
          -150,
          -50,
          -100,
          -100,
          -1000,
          -200,
          -150,
          -50,
          -100,
          -100,
          -500,
          -200,
          -150,
          -50
        ],
        neg: {
          stroke: "rgba(245, 95, 68, 1)",
          fill: "rgba(245, 95, 68, 0.5)"
        },
        pos: {
          stroke: "rgba(121, 199, 79, 1)",
          fill: "rgba(121, 199, 79, 0.5)"
		},
		xAxis: {
			stroke: "#2d2d2d"
		}
      }
    ],
    elementId: "graphTest"
  });
  testGraph.run();
}

main();
