import {List, Node} from './linkedList';

describe('List',  () => {
    //add
    it('Should add first element correctly', () => {
        const list = new List();
        list.add(1);
        const firstNode = new Node(1);
        firstNode.next = firstNode;
        firstNode.prev = firstNode;

        expect(list.lastNode).toEqual(firstNode)
    });

    it('Should add second element correctly', () => {
        const list = new List();

        list.add(1);
        list.add(2);
        const firstNode = new Node(1);
        const secondNode = new Node(2);
        firstNode.next = secondNode;
        secondNode.next = firstNode;
        firstNode.prev = secondNode;
        secondNode.prev = firstNode;

        expect(list.lastNode).toEqual(secondNode);
    });

    //find
    it('Should find element in empty List', () => {
        const list = new List();

        const result = list.find(1);

        expect(result).toBeNull();
    });

    it('Should find element in List', () => {
        const list = new List();

        list.add(1);
        list.add(2);
        list.add(3);

        const firstNode = new Node(1);
        const secondNode = new Node(2);
        const thirdNode = new Node(3);

        firstNode.next = secondNode;
        firstNode.prev = thirdNode;
        secondNode.next = thirdNode;
        secondNode.prev = firstNode;
        thirdNode.next = firstNode;
        thirdNode.prev = secondNode;

        expect(list.lastNode).toEqual(thirdNode);

        const resultFirstElement = list.find(1);
        const resultSecondElement = list.find(2);
        const resultThirdElement = list.find(3)
        const resultLastElement = list.find(4);

        expect(resultFirstElement).toEqual(firstNode);
        expect(resultSecondElement).toEqual(secondNode);
        expect(resultThirdElement).toEqual(thirdNode);
        expect(resultLastElement).toBeNull();
    });

    //fromArray
    it('Should create Node from empty array', () => {
        const listNodes = List.fromArray([]);
        const list = new List();

        expect(listNodes).toEqual(list);
    });

    it('Should create Node from every element of array', () => {
        const testArray = [1, 2, 3];
        const listNodes = List.fromArray(testArray);

        const firstNode = new Node(1);
        const secondNode = new Node(2);
        const thirdNode = new Node(3);

        firstNode.next = secondNode;
        firstNode.prev = thirdNode;
        secondNode.next = thirdNode;
        secondNode.prev = firstNode;
        thirdNode.next = firstNode;
        thirdNode.prev = secondNode;

        expect(listNodes.lastNode?.next).toEqual(firstNode);
        expect(listNodes.lastNode?.next?.next).toEqual(secondNode);
        expect(listNodes.lastNode).toEqual(thirdNode);
    });
});