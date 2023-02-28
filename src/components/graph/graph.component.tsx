import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { Point } from "../../interfaces/trajectories.types";
import "./graph.styles.css";

interface GraphProps {
  data: Point[];
  width: number;
  height: number;
  padding: number;
}

const Graph: React.FC<GraphProps> = ({ data, width, height, padding }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const mouseover = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>, d: Point) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
      tooltipRef.current.style.transition = "display 0.3s ease-in";
      tooltipRef.current.style.left = `${event.pageX}px`;
      tooltipRef.current.style.top = `${event.pageY}px`;
      tooltipRef.current.textContent = `Time: ${d.time}`;
    }
  }, []);

  const mouseleave = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  }, []);

  const mousemove = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>, d: Point) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${event.pageX}px`;
      tooltipRef.current.style.top = `${event.pageY}px`;
    }
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xMin = d3.min(data, (d) => d.x - padding) || 0;
    const xMax = d3.max(data, (d) => d.x) || 0;
    const xDomain = [xMin, xMax];
    const xScale = d3.scaleLinear().domain(xDomain).range([0, width]);

    const yMin = d3.min(data, (d) => d.y - padding) || 0;
    const yMax = d3.max(data, (d) => d.y + padding) || 0;
    const yDomain = [yMin, yMax];
    const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.selectAll("path").remove();
    svg.selectAll("circle").remove();
    svg.select(".x-axis").remove();
    svg.select(".y-axis").remove();

    svg.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${height})`).call(xAxis);
    svg.append("g").attr("class", "y-axis").call(yAxis);

    const line = d3
      .line<Point>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("mouseover", mouseover);
  }, [data, width, height, padding, mousemove, mouseleave, mouseover]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
      <div className="tooltip" ref={tooltipRef} />
    </div>
  );
};

export default Graph;
