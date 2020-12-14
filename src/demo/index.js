import { forceCollideRects } from '../index';
import d3 from './d3';
import './index.scss';

const width = 500;
const height = 500;

const graph = ({
    nodes: [
        { x: 200, y: 200, label: 'Cluster 1', width: 100, height: 40 },
        { fx: 200, fy: 200, label: null },
        { x: 400, y: 300, label: 'Cluster 2', width: 100, height: 40 },
        { fx: 400, fy: 300, label: null },
        { x: 380, y: 290, label: 'Cluster 3', width: 100, height: 40 },
        { fx: 380, fy: 290, label: null },
        { x: 415, y: 305, label: 'Cluster 4', width: 100, height: 40 },
        { fx: 415, fy: 305, label: null },
    ],
    links: [
        { source: 1, target: 0 },
        { source: 3, target: 2 },
        { source: 5, target: 4 },
        { source: 7, target: 6 },
    ],
});

const collisionForce = forceCollideRects()
    .size(d => ([d.width, d.height]));

const svg = d3.select("#root")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

let link = svg
    .selectAll(".link");

let node = svg
    .selectAll(".node");

function tick() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
}

const simulation = d3
    .forceSimulation()
    .nodes(graph.nodes)
    .force("center", collisionForce)
    .force("link", d3.forceLink(graph.links))
    .on("tick", tick);

simulation.tick(50);


link = link.data(graph.links)
    .join("line")
    .classed("link", true);

node = node.data(graph.nodes)
    .join("circle")
    .attr("r", 6)
    .classed("node", true)
    .classed("hidden", d => d.fx === undefined);

const labels = svg
    .selectAll(".label")
    .data(graph.nodes.filter(n => n.label))
    .join("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(d => d.label);

const rects = svg
    .selectAll(".rect")
    .data(graph.nodes.filter(n => n.label))
    .join("rect")
    .attr("x", d => d.x - d.width/2)
    .attr("width", d => d.width)
    .attr("y", d => d.y - d.height/2)
    .attr("height", d => d.height)
    .attr("stroke", "blue")
    .attr("fill", "transparent")

