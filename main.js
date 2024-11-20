// Membuat input matriks dengan ordo dinamis
function createMatrix(containerId, rows, cols) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            container.appendChild(input);
        }
    }
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gap = '10px';
}

// Mengambil nilai dari input matriks
function getMatrixValues(containerId, rows, cols) {
    const inputs = document.getElementById(containerId).getElementsByTagName('input');
    const values = [];
    let index = 0;
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(parseFloat(inputs[index].value) || 0);
            index++;
        }
        values.push(row);
    }
    return values;
}

// Menampilkan hasil matriks
function displayResult(result) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';
    result.forEach(row => {
        row.forEach(value => {
            const cell = document.createElement('div');
            cell.textContent = value;
            cell.className = 'result-cell';
            resultContainer.appendChild(cell);
        });
    });
    resultContainer.style.display = 'grid';
    resultContainer.style.gridTemplateColumns = `repeat(${result[0].length}, 1fr)`;
    resultContainer.style.gap = '10px';
}

// Kalkulasi Penjumlahan Matriks
function calculateMatrixSum(rowsA, colsA, rowsB, colsB) {
    if (rowsA !== rowsB || colsA !== colsB) {
        alert("Penjumlahan matriks hanya dapat dilakukan jika ordo kedua matriks sama!");
        return;
    }
    const matrixA = getMatrixValues('matrix-a', rowsA, colsA);
    const matrixB = getMatrixValues('matrix-b', rowsB, colsB);
    const result = matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
    displayResult(result);
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    let rowsA = 3, colsA = 3;
    let rowsB = 3, colsB = 3;

    // Fungsi untuk mengatur ordo matriks
    function setMatrixAOrder() {
        rowsA = parseInt(document.getElementById('matrix-a-rows').value) || 1;
        colsA = parseInt(document.getElementById('matrix-a-cols').value) || 1;
        createMatrix('matrix-a', rowsA, colsA);
        document.getElementById('result').innerHTML = ''; // Reset hasil
    }

    function setMatrixBOrder() {
        rowsB = parseInt(document.getElementById('matrix-b-rows').value) || 1;
        colsB = parseInt(document.getElementById('matrix-b-cols').value) || 1;
        createMatrix('matrix-b', rowsB, colsB);
        document.getElementById('result').innerHTML = ''; // Reset hasil
    }

    // Inisialisasi awal
    setMatrixAOrder();
    setMatrixBOrder();

    // Event Listener
    document.getElementById('set-matrix-a-btn').addEventListener('click', setMatrixAOrder);
    document.getElementById('set-matrix-b-btn').addEventListener('click', setMatrixBOrder);
    document.getElementById('calculate-btn').addEventListener('click', () => calculateMatrixSum(rowsA, colsA, rowsB, colsB));
});
