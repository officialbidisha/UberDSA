/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    if(!head) return null;
    let current = head;
    while(current){
        let newNode = new Node(current.val,null, null);
        newNode.next = current.next;
        current.next = newNode;
        current = newNode.next;
    }
    current = head;
    while(current){
        if(current.random){
            current.next.random = current.random.next;
        }
        current = current.next.next; // passing duplicate nodes
    }

    current = head;
    // separating pointer
    let oldHead = current;
    let newHead = current.next;
    let copyHead = newHead;
    while(oldHead){
        oldHead.next = oldHead.next.next;
        newHead.next = newHead.next? newHead.next.next:null;
        oldHead = oldHead.next;
        newHead = newHead.next;
    }
    return copyHead;
};
