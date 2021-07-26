import { useContext } from "react";
import { Aside } from "../components/Aside";
import { CardMedium } from "../components/CardMedium";
import { CardSmall } from "../components/CardSmall";
import { Header } from "../components/Header";

import { ToogleContext } from "../contexts/ToogleContext";

import Piscina from '../assets/piscina.svg';

import '../styles/dashboard.css'

export function Dashboard(){
    const {firstInput} = useContext(ToogleContext);
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

                <div className='grid-card-small'>
                    <CardSmall title='Piscina' photo={Piscina} checked={firstInput} />
                </div>

            </div>
        </div>
            
    )
}