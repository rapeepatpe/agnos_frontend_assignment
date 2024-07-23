import { useMemo, useState } from "react";
import * as d3 from "d3";
import dip_highlight_1 from "../img/dip-highlight-1.png"
import dip_highlight_2 from "../img/dip-highlight-2.png"
import dip_highlight_3 from "../img/dip-highlight-3.png"
import dip_highlight_4 from "../img/dip-highlight-4.png"

import pip_highlight_1 from "../img/pip-highlight-1.png"
import pip_highlight_2 from "../img/pip-highlight-2.png"
import pip_highlight_3 from "../img/pip-highlight-3.png"
import pip_highlight_4 from "../img/pip-highlight-4.png"
import pip_highlight_5 from "../img/pip-highlight-5.png"

import mcp_highlight_1 from "../img/mcp-highlight-1.png"
import mcp_highlight_2 from "../img/mcp-highlight-2.png"
import mcp_highlight_3 from "../img/mcp-highlight-3.png"
import mcp_highlight_4 from "../img/mcp-highlight-4.png"
import mcp_highlight_5 from "../img/mcp-highlight-5.png"




export default function Voronoi ({ width, height, data, OnSelectedArea }) {
  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);

  const highlight_img_list = [
    dip_highlight_1,dip_highlight_2,dip_highlight_3,dip_highlight_4,
    pip_highlight_1,pip_highlight_2,pip_highlight_3,pip_highlight_4,pip_highlight_5,
    mcp_highlight_1,mcp_highlight_2,mcp_highlight_3,mcp_highlight_4,mcp_highlight_5
  ];
  //
  // Delaunay triangulation
  //
  const delaunay = useMemo(() => {
    const formattedData = data.map((d) => [xScale(d.x), yScale(d.y)]);
    return d3.Delaunay.from(formattedData);
  }, [data]);

  //
  // Voronoi Diagram
  //
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedArea, setSelectedArea] = useState([]);

  const voronoi = useMemo(() => {
    return delaunay.voronoi([0, 0, width, height]);
  }, [delaunay, width, height]);

  const handleClickedSelectedArea = (i) => {
    if(selectedArea.some(item => i === item)){
      const filterItem = selectedArea.filter(item => item !== i);
      setSelectedArea(filterItem);
      OnSelectedArea(filterItem);
    }
    else{
      setSelectedArea([...selectedArea,i]);
      OnSelectedArea([...selectedArea,i]);
    }
    
    
  }

  const voronoiCells = data.map((d, i) => {
    const path = voronoi.renderCell(i);
    return (
      <path
        key={i}
        d={path}
        stroke="grey"
        fill="transparent"
        opacity={0.1}
        onMouseOver={() => {
          setHoveredItem(i);
        }}
        onClick={()=>{handleClickedSelectedArea(i)}}
      />
    );
  });

  const allCircles = data.map((d, i) => {
    return (
      <>
        <div key={i} class="absolute top-[var(--pos-y)] left-[var(--pos-x)] z-50"
        style={{
          '--pos-x': (i>=0 && i<4)? xScale(d.x)-16 +"px" : (i>=4 && i<9)? xScale(d.x)-18+"px" : xScale(d.x)-22+"px" ,
          '--pos-y': (i>=0 && i<4)? yScale(d.y)-11 +"px" : (i>=4 && i<9)? yScale(d.y)-13+"px" : yScale(d.y)-17+"px",
        }}>   
            {/* <img src={highlight_img_list[i]} class={(i>=0 && i<4)? "h-6 w-8" : (i>=4 && i<9)? "h-7 w-10" : "h-9 w-11"}></img> */}
        </div>
         <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r={4} />
        {hoveredItem === i && (
          <circle
            key={i}
            cx={xScale(d.x)}
            cy={yScale(d.y)}
            r={10}
            fill="transparent"
            stroke="red"
            strokeWidth={3}
          />
        )} 

      </>
    );
  });

  const allHighlight = data.map((d, i) => {
    return (
      <>
        <div key={i} class="absolute top-[var(--pos-y)] left-[var(--pos-x)] z-50"
        style={{
          '--pos-x': (i>=0 && i<4)? xScale(d.x)-16 +"px" : (i>=4 && i<9)? xScale(d.x)-18+"px" : xScale(d.x)-22+"px" ,
          '--pos-y': (i>=0 && i<4)? yScale(d.y)-11 +"px" : (i>=4 && i<9)? yScale(d.y)-13+"px" : yScale(d.y)-17+"px",
        }}>   
            <img src={highlight_img_list[i]} class={(i>=0 && i<4)? "h-6 w-8" : (i>=4 && i<9)? "h-7 w-10" : "h-9 w-11"}></img>
        </div>

      </>
    );
  });

  return (

     <svg width={width} height={height} class="relative min-w-[var(--div-width)] min-h-[--div-height]" 
      style={{
        '--div-width': width+"px",
        '--div-height': height+"px",
      }}>
      {allCircles}
      {voronoiCells}
     </svg>
    

  );
};

