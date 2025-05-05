import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphDisplay = ({ graphData }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // limpiar svg

    const width = 750;
    const height = 500;

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .attr('stroke', '#aaa')
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke-width', 2);

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(graphData.nodes)
      .join('circle')
      .attr('r', 12)
      .attr('fill', '#66e0da')
      .call(drag(simulation));

    const label = svg
      .append('g')
      .selectAll('text')
      .data(graphData.nodes)
      .join('text')
      .text(d => d.id)
      .attr('font-size', 14)
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#222');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x).attr('cy', d => d.y);

      label.attr('x', d => d.x).attr('y', d => d.y);
    });

    return () => simulation.stop();
  }, [graphData]);

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 750 500"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default GraphDisplay;
