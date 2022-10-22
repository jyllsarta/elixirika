module.exports = [
  {id: 1, x: 800, y: 600, type: "red", strategy: "linearArc",
    strokes: [
      {dx: 0, dy: -80},
      {dx: 80, dy: 0},
      {dx: 0, dy: 160},
      {dx: -220, dy: 0},
    ]
  },
  {id: 2, x: 300, y: 200, type: "yellow", strategy: "verticalHorizontal",
    strokes: [
      {dx: -200, dy: 200},
    ]
  },
  {id: 3, x: 900, y: 150, type: "yellow", strategy: "randomWalk",
    strokes: [
      {dx: -500, dy: 400},
    ]
  },
  {id: 4, x: 650, y: 100, type: "cyan", strategy: "linear",
    strokes: [
      {dx: 0, dy: 200},
      {dx: -300, dy: 0},
      {dx: 0, dy: 200},
    ]
  },
  {id: 5, x: 1050, y: 300, type: "cyan", strategy: "linear",
    strokes: [
      {dx: 0, dy: 200},
      {dx: -300, dy: 0},
      {dx: 0, dy: 200},
      {dx: -150, dy: 0},
    ]
  },
]
