
// BETTER COLORS
// const [R, O, G, Y, B, W, Bl] = [
//   "#B90000",
//   "#FF5900",
//   "#009B48",
//   "#FFD500",
//   "#0045AD",
//   "#FFFFFF",
//   "black",
// ];

// FOR TESTING
const [R, O, G, Y, B, W, Bl] = [
  "red",
  "orange",
  "green",
  "yellow",
  "blue",
  "white",
  "black",
];

// SPEED OF SOLVER
const sleepInterval = 10000;

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
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  //perm 0
  getRotationUPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  getRotationD() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[d, 0], [d, 2], [d, 8], [d, 6]]));
    p.push(RubiksCube.permutation_to_array([[d, 1], [d, 5], [d, 7], [d, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 6], [r, 6], [b, 6], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 7], [r, 7], [b, 7], [l, 7]]));
    p.push(RubiksCube.permutation_to_array([[f, 8], [r, 8], [b, 8], [l, 8]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationDPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[d, 0], [d, 2], [d, 8], [d, 6]]));
    p.push(RubiksCube.permutation_to_array([[d, 1], [d, 5], [d, 7], [d, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 6], [r, 6], [b, 6], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 7], [r, 7], [b, 7], [l, 7]]));
    p.push(RubiksCube.permutation_to_array([[f, 8], [r, 8], [b, 8], [l, 8]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationF() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const p = RubiksCube.getPermF();
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }
    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationFPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const p = RubiksCube.getPermF();
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  static getPermF() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[f, 0], [f, 2], [f, 8], [f, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [f, 5], [f, 7], [f, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [r, 0], [d, 2], [l, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 7], [r, 3], [d, 1], [l, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [r, 6], [d, 0], [l, 2]]));
    return p;
  }

  getRotationB() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  getRotationBPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  getPermB() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[b, 0], [b, 2], [b, 8], [b, 6]]));
    p.push(RubiksCube.permutation_to_array([[b, 1], [b, 5], [b, 7], [b, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [l, 0], [d, 6], [r, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [l, 3], [d, 7], [r, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [l, 6], [d, 8], [r, 2]]));
    return p;
  }

  getRotationL() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  getPermL() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    
    let p = []
    p.push(RubiksCube.permutation_to_array([[l, 0], [l, 2], [l, 8], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[l, 1], [l, 5], [l, 7], [l, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [f, 0], [d, 0], [b, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 3], [f, 3], [d, 3], [b, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [f, 6], [d, 6], [b, 2]]));
    return p;
  }

  getRotationLPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  getRotationR() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
  }

  getPermR() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];

    let p = [];
    p.push(RubiksCube.permutation_to_array([[r, 0], [r, 2], [r, 8], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[r, 1], [r, 5], [r, 7], [r, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [b, 0], [d, 8], [f, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 5], [b, 3], [d, 5], [f, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [b, 6], [d, 2], [f, 2]]));
    return p;
  }

  getRotationRPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
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
    return newCube;
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

  static scrambleCube() {
    if (!curCanvas.onDisplay) {
      alert("No cube on display, cannot shuffle");
      return;
    }
    const numMoves = Math.floor(Math.random() * 20) + 20;
    RubiksCube.doRandomMove(numMoves);
    return;
  }
  
  static doRandomMove(numMoves) {
    if (numMoves == 0) {
      return;
    }
    let randomMove = Math.floor(Math.random()*6)
    switch (randomMove) {
      case (0):
        curCanvas.onDisplay.getRotationF();
        break;
      case (1):
        curCanvas.onDisplay.getRotationB();
        break;
      case (2):
        curCanvas.onDisplay.getRotationU();
        break;
      case (3):
        curCanvas.onDisplay.getRotationD();
        break;
      case (4):
        curCanvas.onDisplay.getRotationL();
        break;
      case (5):
        curCanvas.onDisplay.getRotationR();
        break;
      default:
        console.log('no move done');
        break;
    }

    
    RubiksCube.doRandomMove(numMoves - 1);
  }

  // Given a face and index, returns the respective connected edge
  // (References U and D edges on U and D, and horizontal F and B edges of F and B faces)
  getEdgeConnection(face, index) {
    if (face == 'top') {
      if (index == 1) return this.getPiece(['back', 1]);
      else if (index == 3) return this.getPiece(['left', 1]);
      else if (index == 5) return this.getPiece(['right', 1]);
      else if (index == 7) return this.getPiece(['front', 1]);
    }
    else if (face == 'bottom') {
      if (index == 1) return this.getPiece(['front', 7]);
      else if (index == 3) return this.getPiece(['left', 7]);
      else if (index == 5) return this.getPiece(['right', 7]);
      else if (index == 7) return this.getPiece(['back', 7]);
    }
    else if (face == 'front') {
      if (index == 3) return this.getPiece(['left', 5]);
      else if (index == 5) return this.getPiece(['right', 3]);
    }
    else if (face == 'back') {
      if (index == 3) return this.getPiece(['right', 5]);
      else if (index == 5) return this.getPiece(['left', 3]);
    }
  }

  // CAN BE IMPROVED TO BE MORE READABLE
  // returns the index of the U or D face, F or B face.
  getEdgeByColor(colorOne, colorTwo) {
    for (let face in this) {
      if (face == 'top' || face == 'bottom') {
        for (let i = 0; i < this[face].length; i++) {
          if (i % 2 == 1) {
            if (this[face][i] == colorOne) {
              if (this.getEdgeConnection(face, i) == colorTwo) {
                return [face, i];
              }
            }
            else if (this[face][i] == colorTwo) {
              if (this.getEdgeConnection(face, i) == colorOne) {
                return [face, i];
              }
            }
          }
        }
      }
      else if (face == 'front' || face == 'back') {
        for (let i = 0; i < this[face].length; i++) {
          if (i == 3 || i == 5) {
            if (this[face][i] == colorOne) {
              if (this.getEdgeConnection(face, i) == colorTwo) {
                return [face, i];
              }
            }
            else if (this[face][i] == colorTwo) {
              if (this.getEdgeConnection(face, i) == colorOne) {
                return [face, i];
              }
            }
          }
        }
      }
    }
  }

  getCornerConnection(face, index) {
    if (face == 'top') {
      if (index == 0) return [['left', 0], ['back', 2]];
      else if (index == 2) return [['back', 0], ['right', 2]];
      else if (index == 6) return [['front', 0], ['left', 2]];
      else if (index == 8) return [['right', 0], ['front', 2]];
    }
    else if (face == 'bottom') {
      if (index == 0) return [['left', 8], ['front', 6]];
      else if (index == 2) return [['front', 8], ['right', 6]];
      else if (index == 6) return [['back', 8], ['left', 6]];
      else if (index == 8) return [['right', 8], ['back', 6]];
    }
  }

  findCornerByColor(color1, color2, color3) {
    // check top face
    for (let i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 6 || i == 8 ) {
        if (this.checkCornerMatching(color1, color2, color3, ['top', i])) {
          return ['top', i];
        }
        if (this.checkCornerMatching(color1, color2, color3, ['bottom', i])) {
          return ['bottom', i];
        }
      }
    }
  }

  checkCornerMatching(color1, color2, color3, cornerPiece) {
    const corner1 = this.getPiece(cornerPiece);
    const [corner2, corner3] = this.getCornerConnection(cornerPiece[0], cornerPiece[1]);
    return ((corner1 == color1 && corner2 == color2 && corner3 == color3) ||
            (corner1 == color2 && corner2 == color3 && corner3 == color1) ||
            (corner1 == color3 && corner2 == color1 && corner3 == color2))
  }

  checkEdgeOrientation(face, userIndex) {
    let index = parseInt(userIndex);
    if (index % 2 == 0) {
      alert("Invalid index for edge");
      return false;
    }
    if (face == 'top') {
      return (this[face][index] == W);
    }
    else if (face == 'bottom') {
      return (this[face][index] == Y);
    }
    else if (face == 'front') {
      return (this[face][index] == R);
    }
    else if (face == 'back') {
      return (this[face][index] == O);
    }
    else {
      alert("Invalid face given");
    }
  }

  static formCross() {
    // Does red, white edge
    const [faceWR, indexWR] = curCanvas.onDisplay.getEdgeByColor(W, R);
    if (faceWR == 'top') {
      if (indexWR == 1) RubiksCube.doMovesFromArray(['B2', 'D2']);
      else if (indexWR == 3) RubiksCube.doMovesFromArray(['L2', 'D']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['R2', 'D\'']);
      else if (indexWR == 7) RubiksCube.doMovesFromArray(['F2']);
    }
    else if (faceWR == 'bottom') {
      if (indexWR == 3) RubiksCube.doMovesFromArray(['D']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['D\'']);
      else if (indexWR == 7) RubiksCube.doMovesFromArray(['D2']);
    }
    else if (faceWR == 'front') {
      if (indexWR == 3) RubiksCube.doMovesFromArray(['L', 'D', 'L\'']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R']);
    }
    else if (faceWR == 'back') {
      if (indexWR == 3) RubiksCube.doMovesFromArray(['R', 'D\'', 'R\'']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['L\'', 'D', 'L']);
    }
    RubiksCube.doMovesFromArray(['F2']);
    if (!curCanvas.onDisplay.checkEdgeOrientation('top', 7)) {
      RubiksCube.doMovesFromArray(['F', 'U\'', 'R', 'U']);
    }
    // Does blue, white edge
    const [faceWB, indexWB] = curCanvas.onDisplay.getEdgeByColor(W, B);
    if (faceWB == 'top') {
      if (indexWB == 1) RubiksCube.doMovesFromArray(['B2', 'D\'']);
      else if (indexWB == 3) RubiksCube.doMovesFromArray(['L2', 'D2']);
      else if (indexWB == 5) RubiksCube.doMovesFromArray(['R2']);
      else if (indexWB == 7) RubiksCube.doMovesFromArray(['F2', 'D']);
    }
    else if (faceWB == 'bottom') {
      if (indexWB == 1) RubiksCube.doMovesFromArray(['D']);
      else if (indexWB == 3) RubiksCube.doMovesFromArray(['D2']);
      else if (indexWB == 7) RubiksCube.doMovesFromArray(['D\'']);
    }
    else if (faceWB == 'front') {
      if (indexWB == 3) RubiksCube.doMovesFromArray(['L', 'D2', 'L\'']);
      else if (indexWB == 5) RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R', 'D']);
    }
    else if (faceWB == 'back') {
      if (indexWB == 3) RubiksCube.doMovesFromArray(['R', 'D\'', 'R\'', 'D']);
      else if (indexWB == 5) RubiksCube.doMovesFromArray(['L\'', 'D2', 'L']);
    }
    RubiksCube.doMovesFromArray(['R2']);
    if (!curCanvas.onDisplay.checkEdgeOrientation('top', 5)) {
      RubiksCube.doMovesFromArray(['R', 'U\'', 'B', 'U']);
    }
    // Does green, white edge
    const [faceWG, indexWG] = curCanvas.onDisplay.getEdgeByColor(W, G);
    if (faceWG == 'top') {
      if (indexWG == 1) RubiksCube.doMovesFromArray(['B2', 'D']);
      else if (indexWG == 3) RubiksCube.doMovesFromArray(['L2']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['R2', 'D2']);
      else if (indexWG == 7) RubiksCube.doMovesFromArray(['F2', 'D\'']);
    }
    else if (faceWG == 'bottom') {
      if (indexWG == 1) RubiksCube.doMovesFromArray(['D\'']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['D2']);
      else if (indexWG == 7) RubiksCube.doMovesFromArray(['D']);
    }
    else if (faceWG == 'front') {
      if (indexWG == 3) RubiksCube.doMovesFromArray(['L', 'D', 'L\'', 'D\'']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['R\'', 'D2', 'R']);
    }
    else if (faceWG == 'back') {
      if (indexWG == 3) RubiksCube.doMovesFromArray(['R', 'D2', 'R\'']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['L\'', 'D\'', 'L', 'D']);
    }
    RubiksCube.doMovesFromArray(['L2']);
    if (!curCanvas.onDisplay.checkEdgeOrientation('top', 3)) {
      RubiksCube.doMovesFromArray(['L', 'U\'', 'F', 'U']);
    }
    // Does orange, white edge
    const [faceWO, indexWO] = curCanvas.onDisplay.getEdgeByColor(W, O);
    if (faceWO == 'top') {
      if (indexWO == 1) RubiksCube.doMovesFromArray(['B2']);
      else if (indexWO == 3) RubiksCube.doMovesFromArray(['L2', 'D']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['R2', 'D\'']);
      else if (indexWO == 7) RubiksCube.doMovesFromArray(['F2', 'D2']);
    }
    else if (faceWO == 'bottom') {
      if (indexWO == 1) RubiksCube.doMovesFromArray(['D2']);
      else if (indexWO == 3) RubiksCube.doMovesFromArray(['D\'']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['D']);
    }
    else if (faceWO == 'front') {
      if (indexWO == 3) RubiksCube.doMovesFromArray(['L', 'D\'', 'L\'']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['R\'', 'D', 'R']);
    }
    else if (faceWO == 'back') {
      if (indexWO == 3) RubiksCube.doMovesFromArray(['R', 'D', 'R\'']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['L\'', 'D\'', 'L']);
    }
    RubiksCube.doMovesFromArray(['B2']);
    if (!curCanvas.onDisplay.checkEdgeOrientation('top', 1)) {
      RubiksCube.doMovesFromArray(['B', 'U\'', 'L', 'U']);
    }
  }

  static permuteWhiteCorners() {
    // Do WGO Corner
    console.log(curCanvas.onDisplay.findCornerByColor(W, G, O))
    // Do WOB Corner
    console.log(curCanvas.onDisplay.findCornerByColor(W, O, B));
    // Do WBR Corner
    console.log(curCanvas.onDisplay.findCornerByColor(W, B, R));
    // Do WRG Corner
    console.log(curCanvas.onDisplay.findCornerByColor(W, R, G));
  }

  static rotateWhiteCorners() {

  }
  
  static solveCube() {
    RubiksCube.formCross();
    RubiksCube.permuteWhiteCorners();
  }

  static doMovesFromArray(movesArray) {
    for (let move of movesArray) {
      switch (move) {
        case 'L':
          curCanvas.onDisplay.getRotationL();
          break;
        case 'L2':
          curCanvas.onDisplay.getRotationL();
          curCanvas.onDisplay.getRotationL();
          break;
        case 'L\'':
          curCanvas.onDisplay.getRotationLPrime();
          break;
        case 'R':
          curCanvas.onDisplay.getRotationR();
          break;
        case 'R2':
          curCanvas.onDisplay.getRotationR();
          curCanvas.onDisplay.getRotationR();
          break;
        case 'R\'':
          curCanvas.onDisplay.getRotationRPrime();
          break;
        case 'U':
          curCanvas.onDisplay.getRotationU();
          break;
        case 'U2':
          curCanvas.onDisplay.getRotationU();
          curCanvas.onDisplay.getRotationU();
          break;
        case 'U\'':
          curCanvas.onDisplay.getRotationUPrime();
          break;
        case 'D':
          curCanvas.onDisplay.getRotationD();
          break;
        case 'D2':
          curCanvas.onDisplay.getRotationD();
          curCanvas.onDisplay.getRotationD();
          break;
        case 'D\'':
          curCanvas.onDisplay.getRotationDPrime();
          break;
        case 'F':
          curCanvas.onDisplay.getRotationF();
          break;
        case 'F2':
          curCanvas.onDisplay.getRotationF();
          curCanvas.onDisplay.getRotationF();
          break;
        case 'F\'':
          curCanvas.onDisplay.getRotationFPrime();
          break;
        case 'B':
          curCanvas.onDisplay.getRotationB();
          break;
        case 'B2':
          curCanvas.onDisplay.getRotationB();
          curCanvas.onDisplay.getRotationB();
          break;
        case 'B\'':
          curCanvas.onDisplay.getRotationBPrime();
          break;
        default:
          alert(`Invalid move: ${move}`);
          return;
          break;
      }
    }
  }
}
