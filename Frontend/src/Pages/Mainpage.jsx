import React from 'react';
import Navbar from '../Components/Navbar';
import Display from '../Components/Display';
import Server from '../Components/Server';

const Mainpage = () => {
    return (
        <div>
            <Navbar/>
            <Display/>
            <Server/>
        </div>
    );
};

export default Mainpage;