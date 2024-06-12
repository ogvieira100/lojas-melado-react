import './loader.css'
import React from 'react';
import { BarLoader, BeatLoader, ClockLoader, HashLoader } from 'react-spinners';
import { useAppSelector } from '../redux/hook';

const Loader = () => {
    const loading = useAppSelector(sel=> sel.loading);
    return (<>
     {loading.open && (<div className="loader-overlay">
      <div className="loader-container">
        {loading.typeLoader == 'barLoader' && (<BarLoader color="#36D7B7" loading={loading.open} />)}
        {loading.typeLoader == 'beatLoader' && (<BeatLoader color="#36D7B7" loading={loading.open} />)}
        {loading.typeLoader == 'clockLoader' && (<ClockLoader color="#36D7B7" loading={loading.open} />)}
        {loading.typeLoader == 'hashLoader' && (<HashLoader color="#36D7B7" loading={loading.open} />)}
      </div>
    </div>)}
  
    </>)
}

export default  Loader;