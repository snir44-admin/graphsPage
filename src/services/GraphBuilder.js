export class GraphBuilder {
    static generateGraphData(sequence) {
      let nodes = sequence.split(',').map((degree, i) => ({
        id: i + 1,
        degree: Number(degree),
        remainingDegree: Number(degree),
      }));
      let links = [];
  
      let sortedNodes = [...nodes].sort((a, b) => b.remainingDegree - a.remainingDegree);
  
      while (sortedNodes.length > 0) {
        let node = sortedNodes.shift();
        let connections = 0;
        for (let i = 0; i < sortedNodes.length && connections < node.remainingDegree; i++) {
          if (sortedNodes[i].remainingDegree > 0) {
            links.push({ source: node.id, target: sortedNodes[i].id });
            sortedNodes[i].remainingDegree -= 1;
            connections++;
          }
        }
        sortedNodes.sort((a, b) => b.remainingDegree - a.remainingDegree);
      }
  
      nodes = nodes.map((node) => ({
        ...node,
        degree: links.filter((link) => link.source === node.id || link.target === node.id).length,
      }));
  
      return { nodes, links };
    }
  }
  