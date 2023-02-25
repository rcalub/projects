const [R, O, W, Y, G, B, Bl] = ['red','orange','white','yellow','green','blue', 'black'];

function renderCube(cube, sc) {
    const canvas = document.getElementById('tutorial')
    const ctx = canvas.getContext('2d');

    for (let face of cube) {
        ctx.translate(sc*(face[1]), sc*face[2]);
        let k = 0;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                let [x, y] = [j*sc, i*sc];
                ctx.fillStyle = face[0][k];
                ctx.fillRect(x, y, sc, sc);
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, sc, sc);
                k++;
            }
        }
        ctx.translate(-sc*(face[1]),-sc*face[2]);
    }
}

function renderSolvedCube(sc) {
    const solvedCube = [
        [[R, R, R, R, R, R, R, R, R], 3, 3], // F: Red
        [[O, O, O, O, O, O, O, O, O], 9, 3], // B: Orange
        [[W, W, W, W, W, W, W, W, W], 3, 0], // U: White
        [[Y, Y, Y, Y, Y, Y, Y, Y, Y], 3, 6], // D: Yellow
        [[G, G, G, G, G, G, G, G, G], 0, 3], // L: Green
        [[B, B, B, B, B, B, B, B, B], 6, 3]  // R: Blue
    ];

    renderCube(solvedCube, sc);
}
// Test Vales:
// Front: YWYWRRYBO
// Back: BGOYOYGRW
// Right: RWRYBOYOR
// Left: WBRGGBGOG
// Upper: BWWRWOBRG
// Lower: OYBBYGOGW
function getCustomCube(sc) {
    let customCube = [
        [inputArrayToColorArray(document.getElementById('cube-input-front').value.split('')), 3, 3], // F
        [inputArrayToColorArray(document.getElementById('cube-input-back').value.split('')), 9, 3], // B
        [inputArrayToColorArray(document.getElementById('cube-input-top').value.split('')), 3, 0], // U
        [inputArrayToColorArray(document.getElementById('cube-input-bottom').value.split('')), 3, 6], // D
        [inputArrayToColorArray(document.getElementById('cube-input-left').value.split('')), 0, 3], // L
        [inputArrayToColorArray(document.getElementById('cube-input-right').value.split('')), 6, 3], // R
    ];
    renderCube(customCube, sc);
}

function inputArrayToColorArray(charArray) {
    let colorArray = [];

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

function setCanvas() {
    const canvas = document.getElementById('tutorial')
    const ctx = canvas.getContext('2d');
    
    // Retina display hacks
    scaleCanvas(canvas, ctx)
};

function scaleCanvas(canvas, ctx) {
    canvas.width *= 3;
    canvas.height *= 3;
    const [w, h] = [canvas.width, canvas.height];
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.scale(3, 3)
};

// Use UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB for solved cube
function readCube() {
    const cube = document.getElementById('cube-input').value;
    if (cube.length != 54) {
        alert('Invalid number of inputs');
    }
    else {
        drawCube(cube);
        cube.value = '';
    }
};

function renderGridMarkers(sc) {
    const canvas = document.getElementById('tutorial')
    const ctx = canvas.getContext('2d');

    for (i = 0 ; i <= canvas.height/sc; i++) {
        for (j = 0; j <= canvas.width/sc; j++) {
            let [x, y] = [j*sc, i*sc]
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, sc, sc);
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, sc, sc);
            ctx.fillStyle = 'black';
            ctx.font = '4pt serif';
            ctx.fillText(`${j},${i}`, x + 1, y + sc - 1);
        }
    }
};

function resetCube() {
    const canvas = document.getElementById('tutorial');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
