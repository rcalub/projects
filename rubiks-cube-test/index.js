const [R, O, G, Y, B, W, Bl] = ['red', 'orange', 'green', 'yellow', 'blue' ,'white', 'Bl'];

let curCanvas;

class Canvas{
    constructor() {
        this._canvas = document.getElementById('tutorial');
        this._ctx = this.canvas.getContext('2d');
        this._onDisplay = null;
        this._sc;
    }

    scaleCanvas() {
        this.canvas.width *= 3;
        this.canvas.height *= 3;
        const [w, h] = [this.canvas.width, this.canvas.height];
        this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px';
        this.ctx.scale(3, 3)
    };

    static setCurCanvas(sc) {
        curCanvas = new Canvas();
        curCanvas.sc = sc;
        curCanvas.scaleCanvas();
    };

    renderGridMarkers() {
        for (let i = 0 ; i <= this.canvas.height/this.sc; i++) {
            for (let j = 0; j <= this.canvas.width/this.sc; j++) {
                let [x, y] = [j*this.sc, i*this.sc]
                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(x, y, this.sc, this.sc);
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x, y, this.sc, this.sc);
                this.ctx.fillStyle = 'black';
                this.ctx.font = '4pt serif';
                this.ctx.fillText(`${j},${i}`, x + 1, y + this.sc - 1);
            }
        }
    };

    clearCanvas() {    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.onDisplay = null;
    };

    get onDisplay() {
        return this._onDisplay;
    }

    set onDisplay(newDisplay) {
        this._onDisplay = newDisplay;
    }

    get sc() {
        return this._sc;
    }

    set sc(newSc) {
        this._sc= newSc;
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
    };

    addCubeToDisplay() {
        if (curCanvas) {
            if (curCanvas.onDisplay == null) {
                curCanvas.onDisplay = this;
                this.renderCube();
            }
            else {
                alert("Canvas is populated");
            }
        }
        else {
            alert("No canvas instatiated")
        }
    };

    renderFace(faceArray, xStart, yStart) {
        let k = 0;
        curCanvas.ctx.translate(xStart*curCanvas.sc, yStart*curCanvas.sc);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let [x, y] = [j*curCanvas.sc, i*curCanvas.sc];
                curCanvas.ctx.fillStyle = faceArray[k];
                curCanvas.ctx.fillRect(x, y, curCanvas.sc, curCanvas.sc);
                curCanvas.ctx.lineWidth = 2;
                curCanvas.ctx.strokeRect(x, y, curCanvas.sc, curCanvas.sc);
                k++;
            }
        }
        curCanvas.ctx.translate(-curCanvas.sc*xStart,-curCanvas.sc*yStart);
    };

    renderCube() {
        this.renderFace(this.front, 3, 3);
        this.renderFace(this.back, 9, 3);
        this.renderFace(this.top, 3, 0);
        this.renderFace(this.bottom, 3, 6);
        this.renderFace(this.left, 0, 3);
        this.renderFace(this.right, 6, 3);
    };

    static displaySolvedCube() {
        const solvedCube = new RubiksCube(
            [R,R,R,R,R,R,R,R,R],
            [O,O,O,O,O,O,O,O,O],
            [B,B,B,B,B,B,B,B,B],
            [G,G,G,G,G,G,G,G,G],
            [W,W,W,W,W,W,W,W,W],
            [Y,Y,Y,Y,Y,Y,Y,Y,Y]);

        solvedCube.addCubeToDisplay();
    };

    static inputArrayToColorArray(charArray) {
        let colorArray = [];
        
        if (charArray.length != 9) {
            return [Bl, Bl, Bl, Bl, Bl, Bl, Bl, Bl, Bl];
        } 

        for (let chr of charArray) {
            switch (chr) {
                case 'R':
                    colorArray.push(R);
                    break;
                case 'O':
                    colorArray.push(O);
                    break;
                case 'W':
                    colorArray.push(W);
                    break;
                case 'Y':
                    colorArray.push(Y);
                    break;
                case 'G':
                    colorArray.push(G);
                    break;
                case 'B':
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
        const frontFace = RubiksCube.inputArrayToColorArray(document.getElementById('cube-input-front').value.split(''));
        const backFace = RubiksCube.inputArrayToColorArray(document.getElementById('cube-input-back').value.split(''));
        const rightFace = RubiksCube.inputArrayToColorArray(document.getElementById('cube-input-right').value.split(''));
        const leftFace = RubiksCube.inputArrayToColorArray(document.getElementById('cube-input-left').value.split(''));
        const topFace = RubiksCube.inputArrayToColorArray(document.getElementById('cube-input-top').value.split(''));
        const bottomFace = RubiksCube.inputArrayToColorArray(document.getElementById('cube-input-bottom').value.split(''));
        const newCube = new RubiksCube(frontFace, backFace, rightFace, leftFace, topFace, bottomFace);

        newCube.addCubeToDisplay();
    }

    static displayRandomizedCube() {
        const frontFace = [Y,W,Y,W,R,R,Y,B,O];
        const backFace = [B,G,O,Y,O,Y,G,R,W];
        const rightFace = [R,W,R,Y,B,O,Y,O,R];
        const leftFace = [W,B,R,G,G,B,G,O,G];
        const topFace = [B,W,W,R,W,O,B,R,G];
        const bottomFace = [O,Y,B,B,Y,G,O,G,W];

        const newCube = new RubiksCube(frontFace, backFace, rightFace, leftFace, topFace, bottomFace);

        newCube.addCubeToDisplay();
    }

    // Move functions

    

    // Front face move
    fRotation() {
        const fOld = this.front;
        const bOld = this.back;
        const rOld = this.right;
        const lOld = this.left;
        const uOld = this.top;
        const dOld = this.bottom;

        const fNew = [fOld[6], fOld[3], fOld[0], fOld[7], fOld[4], fOld[1], fOld[8], fOld[5], fOld[2]];
        const bNew = bOld;
        const rNew = [uOld[6], rOld[1], rOld[2], uOld[7], rOld[4], rOld[5], uOld[8], rOld[7], rOld[8]];
        const lNew = [lOld[0], lOld[1], dOld[0], lOld[3], lOld[4], dOld[1], lOld[6], lOld[7], dOld[2]];
        const uNew = [uOld[0], uOld[1], uOld[2], uOld[3], uOld[4], uOld[5], lOld[2], lOld[5], lOld[8]];
        const dNew = [rOld[0], rOld[3], rOld[6], dOld[3], dOld[4], dOld[5], dOld[6], dOld[7], dOld[8]];

        const newCube = new RubiksCube(fNew, bNew, rNew, lNew, uNew, dNew);
    
        curCanvas.clearCanvas();
        newCube.addCubeToDisplay();
    }

    bRotation() {
        const fOld = this.front;
        const bOld = this.back;
        const rOld = this.right;
        const lOld = this.left;
        const uOld = this.top;
        const dOld = this.bottom;

        const fNew = fOld;
        const bNew = [bOld[6], bOld[3], bOld[0], bOld[7], bOld[4], bOld[1], bOld[8], bOld[5], bOld[2]];
        const rNew = rOld;
        const lNew = lOld;
        const uNew = uOld;
        const dNew = dOld;

        const newCube = new RubiksCube(fNew, bNew, rNew, lNew, uNew, dNew);
    
        curCanvas.clearCanvas();
        newCube.addCubeToDisplay();
    }

    uRotation() {
        const fOld = this.front;
        const bOld = this.back;
        const rOld = this.right;
        const lOld = this.left;
        const uOld = this.top;
        const dOld = this.bottom;

        const fNew = [rOld[0], rOld[1], rOld[2], fOld[3], fOld[4], fOld[5], fOld[6], fOld[7], fOld[8]];
        const bNew = [lOld[0], lOld[1], lOld[2], bOld[3], bOld[4], bOld[5], bOld[6], bOld[7], bOld[8]];
        const rNew = [bOld[0], bOld[1], bOld[2], rOld[3], rOld[4], rOld[5], rOld[6], rOld[7], rOld[8]];
        const lNew = [fOld[0], fOld[1], fOld[2], lOld[3], lOld[4], lOld[5], lOld[6], lOld[7], lOld[8]];
        const uNew = [uOld[6], uOld[3], uOld[0], uOld[7], uOld[4], uOld[1], uOld[8],uOld[5], uOld[2]];
        const dNew = dOld;

        const newCube = new RubiksCube(fNew, bNew, rNew, lNew, uNew, dNew);
    
        curCanvas.clearCanvas();
        newCube.addCubeToDisplay();
    }

    dRotation() {
        const fOld = this.front;
        const bOld = this.back;
        const rOld = this.right;
        const lOld = this.left;
        const uOld = this.top;
        const dOld = this.bottom;

        const fNew = fOld;
        const bNew = bOld;
        const rNew = rOld;
        const lNew = lOld;
        const uNew = uOld;
        const dNew = [dOld[6], dOld[3], dOld[0], dOld[7], dOld[4], dOld[1], dOld[8], dOld[5], dOld[2]];

        const newCube = new RubiksCube(fNew, bNew, rNew, lNew, uNew, dNew);
    
        curCanvas.clearCanvas();
        newCube.addCubeToDisplay();
    }

    lRotation() {
        const fOld = this.front;
        const bOld = this.back;
        const rOld = this.right;
        const lOld = this.left;
        const uOld = this.top;
        const dOld = this.bottom;

        const fNew = fOld;
        const bNew = bOld;
        const rNew = rOld;
        const lNew = [lOld[6], lOld[3], lOld[0], lOld[7], lOld[4], lOld[1], lOld[8], lOld[5], lOld[2]];
        const uNew = uOld;
        const dNew = dOld;

        const newCube = new RubiksCube(fNew, bNew, rNew, lNew, uNew, dNew);
    
        curCanvas.clearCanvas();
        newCube.addCubeToDisplay();
    }

    rRotation() {
        const fOld = this.front;
        const bOld = this.back;
        const rOld = this.right;
        const lOld = this.left;
        const uOld = this.top;
        const dOld = this.bottom;

        const fNew = fOld;
        const bNew = bOld;
        const rNew = [rOld[6], rOld[3], rOld[0], rOld[7], rOld[4], rOld[1], rOld[8], rOld[5], rOld[2]];
        const lNew = lOld;
        const uNew = uOld;
        const dNew = dOld;

        const newCube = new RubiksCube(fNew, bNew, rNew, lNew, uNew, dNew);
    
        curCanvas.clearCanvas();
        newCube.addCubeToDisplay();
    }
    
    getPiece(refFace, idx) {
        return this[refFace][idx];
    }

// [L0, F0, R0, B0] =>
    permute(cycleArray, oldCube, newCube) {
        p1 = cycleArray[0].split('');
        p2 = cycleArray[0].split('');
        p3 = cycleArray[0].split('');
        p4 = cycleArray[0].split('');

        oldCube.getPiece(p1[0], p1[1])
    }
}