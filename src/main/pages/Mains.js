import React from 'react';
import './Mains.css';

const Mains = () => {
    return (
        <div className="main">
            <div className="wrapper">
                <div className="message">
                    <h1>Selamat Datang di Aplikasi Check-up Tanaman Melon</h1>    
                    <p>
                        Aplikasi ini bertujuan untuk memudahkan pengecekan variabel tanaman.<br/>
                        Beberapa variabel tersebut adalah pH / tingkat keasaman, Nitrogen, Fosfor, Kalium, Temperatur, dan tingkat kelembapan.<br/>
                        Untuk mengakses aplikasi, mohon login terlebih dahulu.
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default Mains;