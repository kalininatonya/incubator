//Двунаправленный (двусвязный) список
//кольцевой, те prev первого элемента содержит ссылку на последний элемент, а next последнего содержит ссылку на первый элемент
export class Node {
    constructor(
        public value: number,
        public next: Node | null = null,
        public prev: Node | null = null,
    ) {
    }
}

export class List {
    public lastNode: Node | null = null;

    add(value: number): void {
        const newNode = new Node(value);

        if (this.lastNode) {
            const firstNode = this.lastNode.next!; //Первый элемент списка

            newNode.next = firstNode; //Последний элемент списка замыкается на первом
            newNode.prev = this.lastNode;
            this.lastNode.next = newNode; //Предпоследний элемент меняем ссылку на текущий добавленный
            firstNode.prev = newNode; //Первому элемену присваиваем ссылку на последний
        } else {
            newNode.next = newNode;
            newNode.prev = newNode;
        }

        this.lastNode = newNode;
    }

    //Поиск
    find(value: number): Node | null {
        if(this.lastNode) {
            let currentNode = this.lastNode.next; //Первый элемент

            do {
                if (currentNode?.value === value) {
                    return currentNode;
                }
                currentNode = currentNode?.next!;
            } while (currentNode.prev !== this.lastNode);
        }

        return null;
    }

    static fromArray(array: number[]): List {
        const newList = new List();
        for (let arr of array) {
            newList.add(arr);
        }

        return newList;
    }
}