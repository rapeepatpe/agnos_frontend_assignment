import React, { useState } from 'react';
import default_finger from '../img/default-finger.png';
import Voronoi from "../components/Voronoi";
import HighLight from "../components/HighLight";
import {data} from "../data/data";

export default function FingerAreaPage(){
    const [selectedArea, setSelectedArea] = useState([]);
    const handleSelectedArea = (e) => {
        setSelectedArea(e);
    }

    return (
    <div class="flex-col">
        <div class="grid items-center justify-items-center text-[#585858] text-center text-3xl mb-24">จุดไหนที่คุณปวดนิ้วมากที่สุด?</div>
        <div class="grid justify-items-center max-h-96">
            {/* <img src={dip_highlight_end_1} class="absolute z-50"></img> */}
            <img src={default_finger} class="h-3/5"></img>
            <div class="absolute z-40">
                <HighLight data={data} width={346.2} height={498} SelectedArea={selectedArea}/>
            </div>
            <div class="absolute z-50">
                <Voronoi data={data} width={346.2} height={498} OnSelectedArea={(e)=>handleSelectedArea(e)}/>
            </div>
        </div>  
        
        
    </div>
    );
};

