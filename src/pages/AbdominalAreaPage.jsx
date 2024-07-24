import React, { useState,useEffect } from 'react';
import default_abs from '../img/abs/default-abs.png';
import Voronoi from "../components/Voronoi";
import AbsHighLight from "../components/AbsHighLight";
import epigastrium_active from '../img/abs/epigastrium-active.png';
import llq_active from '../img/abs/llq-active.png';
import luq_active from '../img/abs/luq-active.png';
import rlq_active from '../img/abs/rlq-active.png';
import ruq_active from '../img/abs/ruq-active.png';
import suprapubic_active from '../img/abs/suprapubic-active.png';
import umbilicus_active from '../img/abs/umbilicus-active.png';
import default_abs_other from '../img/abs/default-abs-other.png';
import default_abs_other_highlight from '../img/abs/all-over-highlight.png';

import { data } from "../data/Abs_data";
export default function AbdominalAreaPage() {
    const [selectedArea, setSelectedArea] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isCleared, setIsCleared] = useState(false);

    const handleSelectedArea = (e) => {
        setSelectedArea(e);
    }

    useEffect(() => {
        if (selectedArea.length === 7) {
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

    const renderEpiActive = () => {
        if (selectedArea.some(item => 1 === item)) {
            return (
                <img src={epigastrium_active} alt="abs" class="absolute z-50 right-[var(--caption-right)] top-[var(--caption-top)]"
                    style={{
                        '--caption-right': "51%",
                        '--caption-top': "12%",
                    }} ></img>);
        }
            
    }

    const renderLlqActive = () => {
        if (selectedArea.some(item => 6 === item)) {
            return (
                <img src={llq_active} alt="abs" class="absolute z-50 left-[var(--caption-left)] top-[var(--caption-top)]"
                    style={{
                        '--caption-left': "56%",
                        '--caption-top': "70%",
                    }} ></img>);
        }
    }

    const renderLuqActive = () => {
        if (selectedArea.some(item => 2 === item)) {
            return (
                <img src={luq_active} alt="abs" class="absolute z-50 left-[var(--caption-left)] top-[var(--caption-top)]"
                    style={{
                        '--caption-left': "56%",
                        '--caption-top': "30%",
                        }} ></img>);
        }
    }

    const renderRlqActive = () => {
        if (selectedArea.some(item => 4 === item)) {
            return (
                <img src={rlq_active} alt="abs" class="absolute z-50 right-[var(--caption-right)] top-[var(--caption-top)]"
                    style={{
                        '--caption-right': "58%",
                        '--caption-top': "70%",
                    }} ></img>);
        }
    }

    const renderRuqActive = () => {
        if (selectedArea.some(item => 0 === item)) {
            return (
                <img src={ruq_active} alt="abs" class="absolute z-50 right-[var(--caption-right)] top-[var(--caption-top)]"
                    style={{
                        '--caption-right': "58%",
                        '--caption-top': "45%",
                    }} ></img>);
        }
    }
    const renderSupActive = () => {
        if (selectedArea.some(item => 5 === item)) {
            return (
                <img src={suprapubic_active} alt="abs" class="absolute z-50 right-[var(--caption-right)] top-[var(--caption-top)]"
                    style={{
                        '--caption-right': "50%",
                        '--caption-top': "87%",
                    }} ></img>);
        }
    }
    const renderUmbActive = () => {
        if (selectedArea.some(item => 3 === item)) {
            return (
                <img src={umbilicus_active} alt="abs" class="absolute z-40 right-[var(--caption-right)] top-[var(--caption-top)]"
                    style={{
                        '--caption-right': "50%",
                        '--caption-top': "27%",
                    }} ></img>);
        }
    }

    const renderOtherButton = () => {
        if (isAllSelected) {
            return (
                <div class="grid items-center justify-items-center" onClick={() => { handleOtherClick() }}>
                    <img src={default_abs_other_highlight} alt="finger"></img>
                </div>
            );
        }
        else {
            return (
                <div class="grid items-center justify-items-center">
                    <img src={default_abs_other} alt="finger"></img>
                </div>
            );
        }
    }

    const handleOtherClick = () => {
        setSelectedArea([]);
    }

    return (
        <div class=" flex-col">
            
            <div class="grid items-center justify-items-center text-[#585858] text-center text-3xl mb-12">Which part of your abs hurt the most?</div>
            <div class="relative grid justify-items-center max-h-96 min-h-[498px] min-w-[346.2px] mb-12">
                {renderEpiActive()}
                {renderLlqActive()}
                {renderLuqActive()}
                {renderRlqActive()}
                {renderRuqActive()}
                {renderSupActive()}
                {renderUmbActive()}
                <img src={default_abs} alt="abs" class="absolute z-10 h-3/5 min-h-[498px] min-w-[346.2px]"></img>
                <div class="absolute z-40">
                    <AbsHighLight data={data} width={346.2} height={498} SelectedArea={selectedArea} />
                </div>
                <div class="absolute z-50">
                    <Voronoi data={data} width={346.2} height={498} OnSelectedArea={(e) => handleSelectedArea(e)} ClearAllSelectedArea={isCleared} />
                </div>
            </div>
            {renderOtherButton() }


        </div>
    );
  };


