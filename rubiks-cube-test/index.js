const [R, O, G, Y, B, W, Bl] = [
  "red",
  "orange",
  "green",
  "yellow",
  "blue",
  "white",
  "Bl",
];

let curCanvas;

class Canvas {
  constructor() {
    this._canvas = document.getElementById("tutorial");
    this._ctx = this.canvas.getContext("2d");
    this.onDisplay = null;
    this._sc;
  }

  scaleCanvas() {
    this.canvas.width *= 3;
    this.canvas.height *= 3;
    const [w, h] = [this.canvas.width, this.canvas.height];
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.ctx.scale(3, 3);
  }

  static setCurCanvas(sc) {
    curCanvas = new Canvas();
    curCanvas.sc = sc;
    curCanvas.scaleCanvas();
  }

  renderGridMarkers() {
    for (let i = 0; i <= this.canvas.height / this.sc; i++) {
      for (let j = 0; j <= this.canvas.width / this.sc; j++) {
        let [x, y] = [j * this.sc, i * this.sc];
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x, y, this.sc, this.sc);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, this.sc, this.sc);
        this.ctx.fillStyle = "black";
        this.ctx.font = "4pt serif";
        this.ctx.fillText(`${j},${i}`, x + 1, y + this.sc - 1);
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.onDisplay = null;
  }

  get sc() {
    return this._sc;
  }

  set sc(newSc) {
    this._sc = newSc;
  }

  get canvas() {
    return this._canvas;
  }

  get ctx() {
    return this._ctx;
  }
}

class RubiksCube {
  constructor(front, back, right, left, top, bottom) {
    this.front = front;
    this.back = back;
    this.right = right;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
  }

  addCubeToDisplay() {
    if (curCanvas) {
      if (curCanvas.onDisplay == null) {
        curCanvas.onDisplay = this;
        this.renderCube();
      } else {
        alert("Canvas is populated");
      }
    } else {
      alert("No canvas instatiated");
    }
  }

  renderFace(faceArray, xStart, yStart) {
    let k = 0;
    curCanvas.ctx.translate(xStart * curCanvas.sc, yStart * curCanvas.sc);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let [x, y] = [j * curCanvas.sc, i * curCanvas.sc];
        curCanvas.ctx.fillStyle = faceArray[k];
        curCanvas.ctx.fillRect(x, y, curCanvas.sc, curCanvas.sc);
        curCanvas.ctx.lineWidth = 2;
        curCanvas.ctx.strokeRect(x, y, curCanvas.sc, curCanvas.sc);
        k++;
      }
    }
    curCanvas.ctx.translate(-curCanvas.sc * xStart, -curCanvas.sc * yStart);
  }

  renderCube() {
    this.renderFace(this.front, 3, 3);
    this.renderFace(this.back, 9, 3);
    this.renderFace(this.top, 3, 0);
    this.renderFace(this.bottom, 3, 6);
    this.renderFace(this.left, 0, 3);
    this.renderFace(this.right, 6, 3);
  }

  static displaySolvedCube() {
    const solvedCube = new RubiksCube(
      [R, R, R, R, R, R, R, R, R],
      [O, O, O, O, O, O, O, O, O],
      [B, B, B, B, B, B, B, B, B],
      [G, G, G, G, G, G, G, G, G],
      [W, W, W, W, W, W, W, W, W],
      [Y, Y, Y, Y, Y, Y, Y, Y, Y]
    );

    solvedCube.addCubeToDisplay();
  }

  static inputArrayToColorArray(charArray) {
    let colorArray = [];

    if (charArray.length != 9) {
      return [Bl, Bl, Bl, Bl, Bl, Bl, Bl, Bl, Bl];
    }

    for (let chr of charArray) {
      switch (chr) {
        case "R":
          colorArray.push(R);
          break;
        case "O":
          colorArray.push(O);
          break;
        case "W":
          colorArray.push(W);
          break;
        case "Y":
          colorArray.push(Y);
          break;
        case "G":
          colorArray.push(G);
          break;
        case "B":
          colorArray.push(B);
          break;
        default:
          colorArray.push(Bl);
          break;
      }
    }
    return colorArray;
  }

  // Test Values:
  // Front: YWYWRRYBO
  // Back: BGOYOYGRW
  // Right: RWRYBOYOR
  // Left: WBRGGBGOG
  // Upper: BWWRWOBRG
  // Lower: OYBBYGOGW
  static displayCustomCube() {
    const frontFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-front").value.split("")
    );
    const backFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-back").value.split("")
    );
    const rightFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-right").value.split("")
    );
    const leftFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-left").value.split("")
    );
    const topFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-top").value.split("")
    );
    const bottomFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-bottom").value.split("")
    );
    const newCube = new RubiksCube(
      frontFace,
      backFace,
      rightFace,
      leftFace,
      topFace,
      bottomFace
    );

    newCube.addCubeToDisplay();
  }

  static displayRandomizedCube() {
    const frontFace = [Y, W, Y, W, R, R, Y, B, O];
    const backFace = [B, G, O, Y, O, Y, G, R, W];
    const rightFace = [R, W, R, Y, B, O, Y, O, R];
    const leftFace = [W, B, R, G, G, B, G, O, G];
    const topFace = [B, W, W, R, W, O, B, R, G];
    const bottomFace = [O, Y, B, B, Y, G, O, G, W];

    const newCube = new RubiksCube(
      frontFace,
      backFace,
      rightFace,
      leftFace,
      topFace,
      bottomFace
    );

    newCube.addCubeToDisplay();
  }

  getRotationU() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[u, 0], [u, 2], [u, 8], [u, 6]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [u, 5], [u, 7], [u, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 0], [l, 0], [b, 0], [r, 0]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [l, 1], [b, 1], [r, 1]]));
    p.push(RubiksCube.permutation_to_array([[f, 2], [l, 2], [b, 2], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationUPrime() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[u, 0], [u, 2], [u, 8], [u, 6]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [u, 5], [u, 7], [u, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 0], [l, 0], [b, 0], [r, 0]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [l, 1], [b, 1], [r, 1]]));
    p.push(RubiksCube.permutation_to_array([[f, 2], [l, 2], [b, 2], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationD() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[d, 0], [d, 2], [d, 8], [d, 6]]));
    p.push(RubiksCube.permutation_to_array([[d, 1], [d, 5], [d, 7], [d, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 6], [l, 6], [b, 6], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 7], [l, 7], [b, 7], [r, 7]]));
    p.push(RubiksCube.permutation_to_array([[f, 8], [l, 8], [b, 8], [r, 8]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationDPrime() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[d, 0], [d, 2], [d, 8], [d, 6]]));
    p.push(RubiksCube.permutation_to_array([[d, 1], [d, 5], [d, 7], [d, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 6], [l, 6], [b, 6], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 7], [l, 7], [b, 7], [r, 7]]));
    p.push(RubiksCube.permutation_to_array([[f, 8], [l, 8], [b, 8], [r, 8]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationF() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[f, 0], [f, 2], [f, 8], [f, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [f, 5], [f, 7], [f, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [r, 0], [d, 2], [l, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 7], [r, 3], [d, 1], [l, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [r, 6], [d, 0], [l, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationFPrime() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[f, 0], [f, 2], [f, 8], [f, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [f, 5], [f, 7], [f, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [r, 0], [d, 2], [l, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 7], [r, 3], [d, 1], [l, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [r, 6], [d, 0], [l, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationB() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[b, 0], [b, 2], [b, 8], [b, 6]]));
    p.push(RubiksCube.permutation_to_array([[b, 1], [b, 5], [b, 7], [b, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [l, 0], [d, 6], [r, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [l, 3], [d, 7], [r, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [l, 6], [d, 8], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationBPrime() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[b, 0], [b, 2], [b, 8], [b, 6]]));
    p.push(RubiksCube.permutation_to_array([[b, 1], [b, 5], [b, 7], [b, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [l, 0], [d, 6], [r, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [l, 3], [d, 7], [r, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [l, 6], [d, 8], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationL() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[l, 0], [l, 2], [l, 8], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[l, 1], [l, 5], [l, 7], [l, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [f, 0], [d, 0], [b, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 3], [f, 3], [d, 3], [b, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [f, 6], [d, 6], [b, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationLPrime() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[l, 0], [l, 2], [l, 8], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[l, 1], [l, 5], [l, 7], [l, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [f, 0], [d, 0], [b, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 3], [f, 3], [d, 3], [b, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [f, 6], [d, 6], [b, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationR() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[r, 0], [r, 2], [r, 8], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[r, 1], [r, 5], [r, 7], [r, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [b, 0], [d, 8], [f, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 5], [b, 3], [d, 5], [f, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [b, 6], [d, 2], [f, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getRotationRPrime() {
    const oldCube = curCanvas.onDisplay.createCopy();
    const newCube = curCanvas.onDisplay.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[r, 0], [r, 2], [r, 8], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[r, 1], [r, 5], [r, 7], [r, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [b, 0], [d, 8], [f, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 5], [b, 3], [d, 5], [f, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [b, 6], [d, 2], [f, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
  }

  getPiece(pieceIndex) {
    const pieceFace = pieceIndex[0];
    const pieceIdx = pieceIndex[1];
    return this[pieceFace][pieceIdx];
  }

  // pieceIndex: ['face': string, index: int]
  setPieceColor(newIndex, oldIndex, oldCube) {
    const newFace = newIndex[0];
    const newIdx = newIndex[1];
    this[newFace][newIdx] = oldCube.getPiece(oldIndex);
  }

  // [L0, F0, R0, B0] => [[L0, F0], [F0, R0], [R0, B0], [B0, L0]]
  // Tested: Yes
  static permutation_to_array(permArray) {
    let sentToArray = [];
    for (let i = 0; i < permArray.length - 1; i++) {
      sentToArray.push([permArray[i], permArray[i + 1]]);
    }
    sentToArray.push([permArray[permArray.length - 1], permArray[0]]);

    return sentToArray;
  }

  createCopy() {
    return new RubiksCube(
        [...this.front],
        [...this.back],
        [...this.right],
        [...this.left],
        [...this.top],
        [...this.bottom]
      );
    }
}
