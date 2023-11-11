'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'subsetA' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function subsetA(arr) {
    // Verifica se o array de entrada está vazio e retorna o array vazio nesse caso.
    if (arr.length === 0) return arr;

    // Ordena o array em ordem decrescente.
    var arr = arr.sort((a, b) => b - a);

    // Inicializa um array vazio para o subconjunto A.
    let a = [];

    // Calcula a soma de todos os elementos no array original.
    let sumArr = arr.reduce((acc, cur) => acc += cur);

    // Inicializa a soma dos elementos no subconjunto A como 0.
    let sumA = 0;

    // Enquanto a soma dos elementos em A for menor ou igual à soma de todos os elementos no array original, e o array original não estiver vazio, e o elemento mais à esquerda do array original for maior que 0.
    while (sumA <= sumArr && arr.length > 0 && arr[0] > 0) {
        // Adiciona o elemento mais à esquerda do array original ao início do subconjunto A.
        a.unshift(arr[0]);

        // Atualiza a soma dos elementos em A.
        sumA += arr[0];

        // Atualiza a soma de todos os elementos no array original.
        sumArr -= arr[0];

        // Remove o elemento mais à esquerda do array original.
        arr.shift();
    }

    // Retorna o subconjunto A.
    return a;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    let arr = [];

    for (let i = 0; i < arrCount; i++) {
        const arrItem = parseInt(readLine().trim(), 10);
        arr.push(arrItem);
    }

    const result = subsetA(arr);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
