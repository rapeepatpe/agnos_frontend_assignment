import { useMemo, useState, useEffect } from "react";
import * as d3 from "d3";

export default function Voronoi({ width, height, data, OnSelectedArea, area, ClearAllSelectedArea }) {

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);
    useEffect(() => {
        if (ClearAllSelectedArea) {
            setSelectedArea([]);
        }
    }, [ClearAllSelectedArea])


  //
  // Delaunay triangulation
  //
  const delaunay = useMemo(() => {
    const formattedData = data.map((d) => [xScale(d.x), yScale(d.y)]);
    return d3.Delaunay.from(formattedData);
  }, [data, xScale, yScale]);

  //
  // Voronoi Diagram
  //

  const [selectedArea, setSelectedArea] = useState([]);

    const voronoi = useMemo(() => {
        
    return delaunay.voronoi([0, 0, width, height]);
  }, [delaunay, width, height]);

    const dipList = [0, 1, 2, 3];
    const pipList = [4, 5, 6, 7, 8];
    const mcpList = [9, 10, 11, 12, 13];

    const handleClickedSelectedArea = (i) => {
        if (area === "finger") {
            if (selectedArea.some(item => i === item)) {
                if (dipList.some(item => i === item)) {
                    const filterItem = selectedArea.filter(item => !dipList.includes(item));
                    setSelectedArea(filterItem);
                    OnSelectedArea(filterItem);
                }
                else if (pipList.some(item => i === item)) {
                    const filterItem = selectedArea.filter(item => !pipList.includes(item));
                    setSelectedArea(filterItem);
                    OnSelectedArea(filterItem);
                }
                else if (mcpList.some(item => i === item)) {
                    const filterItem = selectedArea.filter(item => !mcpList.includes(item));
                    setSelectedArea(filterItem);
                    OnSelectedArea(filterItem);
                }
            }
            else {
                if (dipList.some(item => i === item)) {
                    setSelectedArea([...selectedArea, dipList].flat());
                    OnSelectedArea([...selectedArea, dipList].flat());
                }
                else if (pipList.some(item => i === item)) {
                    setSelectedArea([...selectedArea, pipList].flat());
                    OnSelectedArea([...selectedArea, pipList].flat());
                }
                else if (mcpList.some(item => i === item)) {
                    setSelectedArea([...selectedArea, mcpList].flat());
                    OnSelectedArea([...selectedArea, mcpList].flat());
                }
            }
        }
        else {
            if (selectedArea.some(item => i === item)) {
                const filterItem = selectedArea.filter(item => item !== i);
                setSelectedArea(filterItem);
                OnSelectedArea(filterItem);
            }
            else {
                setSelectedArea([...selectedArea, i]);
                OnSelectedArea([...selectedArea, i]);
            }
        }
  }

  const voronoiCells = data.map((d, i) => {
    const path = voronoi.renderCell(i);
    return (
        <path
            /*class="opacity-0"*/
        key={i}
        d={path}
        stroke="grey"
        fill="transparent"
        opacity={0.1}
        onClick={()=>{handleClickedSelectedArea(i)}}
      />
    );
  });

  const allCircles = data.map((d, i) => {
    return (
      <>
            <circle
                /*class="opacity-0"*/
                key={i} cx={xScale(d.x)} cy={yScale(d.y)} r={4} />

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

