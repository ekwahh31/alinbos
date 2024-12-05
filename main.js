// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  let rowsA = 2, colsA = 2;
  let rowsB = 2, colsB = 2;

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
  document.getElementById('calculate-sum-btn').addEventListener('click', () => 
      calculateMatrixSum(rowsA, colsA, rowsB, colsB)
  );
  document.getElementById('subtraction-btn').addEventListener('click', () => 
      calculateMatrixSubtraction(rowsA, colsA, rowsB, colsB)
  );
  document.getElementById('multiply-btn').addEventListener('click', () => {
      const matrixA = getMatrixValues('matrix-a', rowsA, colsA);
      const matrixB = getMatrixValues('matrix-b', rowsB, colsB);
      multiplyMatrices(matrixA, matrixB);
  });
  document.getElementById('determinant-btn').addEventListener('click', () => {
      const matrixA = getMatrixValues('matrix-a', rowsA, colsA);
      const result = determinant(matrixA);
      displayResult([[result]]);
  });
  document.getElementById('transpose-btn').addEventListener('click', () => {
      const matrixA = getMatrixValues('matrix-a', rowsA, colsA);
      const result = transpose(matrixA);
      displayResult(result);
  });
  document.getElementById('invert-btn').addEventListener('click', () => {
      const matrixA = getMatrixValues('matrix-a', rowsA, colsA);
      try {
          const result = invert(matrixA);
          displayResult(result);
      } catch (e) {
          alert(e.message);
      }
  });
});

// Membuat input matriks sesuai ordo inputan
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

// Kalkulasi Pengurangan Matriks
function calculateMatrixSubtraction(rowsA, colsA, rowsB, colsB) {
    if (rowsA !== rowsB || colsA !== colsB) {
        alert("Pengurangan matriks hanya dapat dilakukan jika ordo kedua matriks sama!");
        return;
    }
    const matrixA = getMatrixValues('matrix-a', rowsA, colsA);
    const matrixB = getMatrixValues('matrix-b', rowsB, colsB);
    const result = matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
    displayResult(result);
}

// Kalkulasi Perkalian Dua Matriks
function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    if (colsA !== rowsB) {
        throw new Error('Jumlah kolom matriks A harus sama dengan jumlah baris matriks B');
    }

    const result = [];
    for (let i = 0; i < rowsA; i++) {
        result[i] = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
        }
    }
    displayResult(result);
}

// Kalkulasi determinan matriks
function determinant(matrix) {
  if (!matrix || matrix.length === 0) {
    throw new Error('Matrix is empty');
  }

  if (matrix.length === 1) {
    return matrix[0][0];
  }

  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  const getMinor = (matrix, row, col) => {
    return matrix.slice(0, row).concat(matrix.slice(row + 1))
      .map(row => row.slice(0, col).concat(row.slice(col + 1)));
  };

  const det = matrix[0].reduce((acc, val, i) => acc + Math.pow(-1, i) * val * determinant(getMinor(matrix, 0, i)), 0);
  return det;
}

// Kalkulasi transpose matriks
function transpose(matrix) {
  if (!matrix || matrix.length === 0) {
    throw new Error('Matrix is empty');
  }

  const transposed = [];
  for (let i = 0; i < matrix[0].length; i++) {
    transposed[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      transposed[i][j] = matrix[j][i];
    }
  }

  return transposed;
}

// Kalkulasi invers matriks
function invert(matrix) {
  if (!matrix || matrix.length === 0) {
    throw new Error('Matrix is empty');
  }

  if (matrix.length !== matrix[0].length) {
    throw new Error('Matrix is not square');
  }

  const det = determinant(matrix);
  if (det === 0) {
    throw new Error('Matrix is singular');
  }

  if (matrix.length === 2) {
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    return [[d / det, -b / det], [-c / det, a / det]];
  }

  const matrixOfMinors = matrix.map((row, i) => row.map((_, j) => determinant(getMinor(matrix, i, j))));
  const matrixOfCofactors = matrixOfMinors.map((row, i) => row.map((val, j) => Math.pow(-1, i + j) * val));
  const adjugate = transpose(matrixOfCofactors);

  for (let i = 0; i < adjugate.length; i++) {
    for (let j = 0; j < adjugate[i].length; j++) {
      adjugate[i][j] /= det;
    }
  }

  return adjugate;
}

// Fungsi untuk mendapatkan minor (digunakan dalam fungsi invers)
function getMinor(matrix, row, col) {
  return matrix.slice(0, row).concat(matrix.slice(row + 1))
    .map(row => row.slice(0, col).concat(row.slice(col + 1)));
}

// Menampilkan hasil matriks
function displayResult(result) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'result-table';
  result.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(value => {
          const td = document.createElement('td');
          td.textContent = Number.isInteger(value) ? value : value.toFixed(2); // Menampilkan nilai desimal dengan 2 angka di belakang koma
          td.className = 'result-cell';
          tr.appendChild(td);
      });
      table.appendChild(tr);
  });

  resultContainer.appendChild(table);
}
