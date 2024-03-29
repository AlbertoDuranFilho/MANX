import { useContext } from "react";
import { Aside } from "../components/Aside.jsx";
import { CardMedium } from "../components/CardMedium";
import { CardSmall } from "../components/CardSmall";
import { Header } from "../components/Header";
import { CardBig } from "../components/CardBig";

import { ToogleContext } from "../contexts/ToogleContext";

import Piscina from '../assets/piscina.svg';
import Futebol from '../assets/campo.svg';

import '../styles/dashboard.css'

export function Dashboard(){
    const {firstOutput, secondOutput} = useContext(ToogleContext);

    return(
        <>
        <div className='container-main'>
            <div className='grid-area'>

                <div className='grid-aside'>
                    <Aside />
                </div>

                <div className='div'>
                </div>

                <div className='grid-header'>
                    <Header />
                </div>

                <div className='grid-card-medium'>
                    <CardMedium />
                </div>

                <div className='grid-card-small'>
                    <CardSmall id={'presence0'} title='Piscina' photo={Piscina} checked={firstOutput} saida={"0"} />
                </div>

                <div className='grid-card-small-2'>
                    <CardSmall id={'presence1'}  title='Soccer' photo={Futebol} checked={secondOutput} saida={"1"}  />
                </div>
               
                <div className='grid-card-big'>
                    <CardBig />
                </div>
      
            </div>
        </div>
        </>
            
    )
}