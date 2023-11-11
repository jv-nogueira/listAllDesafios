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

const SinglyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
    }
};

const SinglyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        const node = new SinglyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }
};

function printSinglyLinkedList(node, sep, ws) {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            ws.write(sep);
        }
    }
}



/*
 * Complete the 'getNumber' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_SINGLY_LINKED_LIST binary as parameter.
 */

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */

function getNumber(binary) {
    // Inicializa uma variável 'total' com o valor 0 como BigInt.
    let total = 0n;

    // Entra em um loop enquanto o parâmetro 'binary' não for nulo.
    while (binary !== null) {
        // Multiplica o valor atual de 'total' por 2 (deslocamento à esquerda).
        total *= 2n;
        
        // Adiciona o valor do dígito binário atual como BigInt a 'total'.
        total += BigInt(binary.data);

        // Atualiza 'binary' para apontar para o próximo dígito binário na lista encadeada.
        binary = binary.next;
    }

    // Retorna o valor convertido de binário para decimal.
    return total;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let binary = new SinglyLinkedList();

    const binaryCount = parseInt(readLine().trim(), 10);

    for (let i = 0; i < binaryCount; i++) {
        const binaryItem = parseInt(readLine().trim(), 10);
        binary.insertNode(binaryItem);
    }

    const result = getNumber(binary.head);

    ws.write(result + '\n');

    ws.end();
}
