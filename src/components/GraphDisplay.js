import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphDisplay = ({ graphData }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Limpia cualquier gráfico anterior

    if (graphData) {
      const width = 600;
      const height = 300;
      const nodeRadius = 10;

      const simulation = d3
        .forceSimulation(graphData.nodes)
        .force('link', d3.forceLink(graphData.links).id((d) => d.id))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .selectAll('line')
        .data(graphData.links)
        .enter()
        .append('line')
        .attr('stroke', '#999')
        .attr('stroke-width', 2);

      const node = svg.append('g')
        .selectAll('circle')
        .data(graphData.nodes)
        .enter()
        .append('circle')
        .attr('r', nodeRadius)
        .attr('fill', '#69b3a2');

      const label = svg.append('g')
        .selectAll('text')
        .data(graphData.nodes)
        .enter()
        .append('text')
        .text((d) => `${d.degree}`)
        .attr('font-size', 12)
        .attr('dx', 15)
        .attr('dy', 4);

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => clamp(d.source.x, nodeRadius, width - nodeRadius))
          .attr('y1', (d) => clamp(d.source.y, nodeRadius, height - nodeRadius))
          .attr('x2', (d) => clamp(d.target.x, nodeRadius, width - nodeRadius))
          .attr('y2', (d) => clamp(d.target.y, nodeRadius, height - nodeRadius));

        node
          .attr('cx', (d) => (d.x = clamp(d.x, nodeRadius, width - nodeRadius)))
          .attr('cy', (d) => (d.y = clamp(d.y, nodeRadius, height - nodeRadius)));

        label
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y);
      });
    }

    // Función auxiliar: asegura que un valor se mantenga entre min y max.
    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
  }, [graphData]); // Dependencia corregida

  return <svg ref={svgRef} width="600" height="300"></svg>;
};

export default GraphDisplay;
