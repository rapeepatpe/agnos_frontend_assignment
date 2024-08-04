import React, { useState, useEffect, useRef } from 'react';
import default_finger from '../img/finger/default-finger.png';
import Voronoi from "../components/Voronoi";
import FingerHighLight from "../components/FingerHighLight";
import dip_active from "../img/finger/dip-active.png"
import pip_active from "../img/finger/pip-active.png"
import mcp_active from "../img/finger/mcp-active.png"
import default_finger_other from '../img/finger/default-finger-other.png';
import default_finger_other_highlight from '../img/finger/others-highlight.png';
import { useDimensions } from '../hooks/useDimensions';

import {data} from "../data/Finger_data";

export default function FingerAreaPage(){
    const [selectedArea, setSelectedArea] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isCleared, setIsCleared] = useState(false);
    const divRef = useRef(null);

    const dimension = useDimensions(divRef);

    


    useEffect(() => {
        console.log(dimension);
        if (selectedArea.some(item => 0 === item) && selectedArea.some(item => 4 === item) && selectedArea.some(item => 9 === item)) {
            setIsAllSelected(true);
        }
        else {
            setIsAllSelected(false);
        }

        if (selectedArea.length === 0) {
            setIsCleared(true);
        }
        else {
            setIsCleared(false);
        }
    }, [selectedArea])



    const handleSelectedArea = (e) => {
        setSelectedArea(e);
    }

    const renderDipActive = () => {
        if (selectedArea.some(item => 0 === item) && !(selectedArea.some(item => 4 === item) && selectedArea.some(item => 9 === item)))
        return (
            <img src={dip_active} alt="finger" class="absolute  left-[var(--caption-left)] top-[var(--caption-top)] w-[180px] sm:w-[180px] md:w-[230px] lg:w-[280px]"
            style={{
                '--caption-left': "53%",
                '--caption-top': "-10%",
            }} ></img>);

    }
    const renderPipActive = () => {
        if (selectedArea.some(item => 4 === item) && !(selectedArea.some(item => 0 === item) && selectedArea.some(item => 9 === item)))
            return (
                <img src={pip_active} alt="finger" class="absolute  left-[var(--caption-left)] top-[var(--caption-top)] w-[180px] sm:w-[180px] md:w-[230px] lg:w-[280px]"
                    style={{
                        '--caption-left': "54%",
                        '--caption-top': "7%",
                    }} ></img>);

    }
    const renderMcpActive = () => {
        if (selectedArea.some(item => 9 === item) && !(selectedArea.some(item => 4 === item) && selectedArea.some(item => 0 === item)))
            return (
                <img src={mcp_active} alt="finger" class="absolute  left-[var(--caption-left)] top-[var(--caption-top)] w-[180px] sm:w-[180px] md:w-[230px] lg:w-[280px]"
                    style={{
                        '--caption-left': "54%",
                        '--caption-top': "23%",
                    }} ></img>);

    }

    const renderOtherButton = () => {
        if (isAllSelected) {
            return (
                <div class="grid items-center justify-items-center" onClick={() => {handleOtherClick()}}>
                    <img class="w-[427px] sm:w-[477px] md:w-[527px] lg:w-[577px]" src={default_finger_other_highlight} alt="finger"></img>
                </div>
            );
        }
        else {
            return (
                <div class="grid items-center justify-items-center">
                    <img class="w-[427px] sm:w-[477px] md:w-[527px] lg:w-[577px]" src={default_finger_other} alt="finger"></img>
                </div>
            );
        }
    }

    const handleOtherClick = () => {
        setSelectedArea([]);
    }

    return (
        
            
        <div class="flex-col">
            
            <div class="grid items-center justify-items-center text-[#585858] text-center text-xl mb-4 mt-4 sm:text-xl mb-4 mt-4 md:text-2xl mb-12 mt-12 lg:text-3xl mb-16 mt-16 ">Which part of your fingers hurt the most?</div>
            <div class="relative grid justify-items-center max-h-96 min-h-[var(--dim-h)] min-w-[var(--dim-w)] mb-8 sm:mb-8 md:mb-10 lg:mb-12"
                style={{
                    '--dim-h': dimension.height +"px",
                    '--dim-w': dimension.width +"px",
            }}>
                {renderDipActive()}
                {renderPipActive()}
                {renderMcpActive()}

                {/*<img src={default_finger} alt="finger" class="absolute h-3/5 min-h-[498px] min-w-[346.2px]"></img>*/}
                <img src={default_finger} alt="finger" class="absolute w-[240px] sm:w-[270px] md:w-[300px] lg:w-[330px] h-[345px] sm:h-[388px] md:h-[430px] lg:h-[475px] " ref={divRef}></img>
                <div class="absolute z-40">
                    <FingerHighLight data={data} width={dimension.width} height={dimension.height} SelectedArea={selectedArea}/>
                </div>
                <div class="absolute z-50">
                    <Voronoi data={data} width={dimension.width} height={dimension.height} OnSelectedArea={(e) => handleSelectedArea(e)} area="finger" ClearAllSelectedArea={isCleared} />
                </div>
            </div> 

            {renderOtherButton()}
        
            </div>
        
    );
};

