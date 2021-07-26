import { useContext } from "react";
import { Aside } from "../components/Aside";
import { CardMedium } from "../components/CardMedium";
import { CardSmall } from "../components/CardSmall";
import { Header } from "../components/Header";

import { ToogleContext } from "../contexts/ToogleContext";

import Piscina from '../assets/piscina.svg';
import Futebol from '../assets/campo.svg';

import '../styles/dashboard.css'
import { CardBig } from "../components/CardBig";

export function Dashboard(){
    const {firstOutput, secondOutput} = useContext(ToogleContext);
    return(
        <div className='container-main'>
            <div className='grid-area'>

                <div className='grid-aside'>
                    <Aside />
                </div>

                <div className='grid-header'>
                    <Header />
                </div>

                <div className='grid-card-medium'>
                    <CardMedium />
                </div>
                <div className='grid-card-big'>
                    <CardBig />
                </div>

                <div className='grid-card-small'>
                    <CardSmall title='Piscina' photo={Piscina} checked={firstOutput} saida={"0"} />
                </div>
                <div className='grid-card-small-2'>
                    <CardSmall title='Soccer' photo={Futebol} checked={secondOutput} saida={"1"}  />
                </div>

            </div>
        </div>
            
    )
}