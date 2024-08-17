/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {
    const mapOfEmployees = new Map();
    
    for (const emp of employees) {
        mapOfEmployees.set(emp.id, emp);
    }
    
    let totalImportance = 0;
    let queue = [mapOfEmployees.get(id)];
    let visited = new Set();
    
    while (queue.length > 0) {
        let element = queue.shift();
        totalImportance += element.importance;
        visited.add(element.id);
        
        for (let e of element.subordinates) {
            if (!visited.has(e)) {
                visited.add(e);
                queue.push(mapOfEmployees.get(e));
            }
        }
    }
    
    return totalImportance;
};
