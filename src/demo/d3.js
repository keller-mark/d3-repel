/*
 * Construct our own d3 object, with only the functions that we are using.
 * This should reduce the size of the final javascript bundle file.
 * See https://github.com/d3/d3/issues/3076
 */ 

import { select, selectAll, create } from "d3-selection";
import { scaleLinear, scaleOrdinal, scaleThreshold, scaleBand } from "d3-scale";
import { extent, sum, mean, max, min } from "d3-array";
import { quadtree } from 'd3-quadtree';
import { forceLink, forceCollide, forceSimulation } from 'd3-force';


export default {
    select,
    selectAll,
    create,
    scaleLinear,
    scaleOrdinal,
    scaleThreshold,
    scaleBand,
    extent,
    sum,
    mean,
    max, 
    min,
    quadtree,
    forceLink,
    forceCollide,
    forceSimulation,
};