function dist(x1,x2,y1,y2){
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}

// Differential shifting vector
function DiffrentialShiftCalc(meshVector, node){
    const queue = [];
    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }
    visited[node] = true;
    queue.push(node);

    VecorPoints=[]
    
    while (queue.length) {
        let currentNode = queue.shift();

        VecorPoints.push(dist(currentNode.x1, currentNode.x2, currentNode.y1, currentNode.y2))
        
        for (let j = 0; j < graph[currentNode].length; j++) {
        if (meshVector[currentNode][j] === 1 && visited[j] === false) {
            visited[j] = true;
            queue.push(j);
        }
        }
    }

    return VectorPoints;
}


  