import React, { useState, useEffect } from 'react';
import { getExchangeRates } from './api/exchangeService';
import CurrencySelector from './CurrencySelector';
import './App.css';

import backgroundVideo from './videos/background.mp4';

function App() {
    const [rates, setRates] = useState({});
    const [sourceCurrency, setSourceCurrency] = useState('EUR');
    const [destinationCurrency, setDestinationCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const data = await getExchangeRates(sourceCurrency);
                setRates(data.conversion_rates);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRates();
    }, [sourceCurrency]);

    useEffect(() => {
        if (rates[destinationCurrency]) {
            setConvertedAmount(amount * rates[destinationCurrency]);
        }
    }, [amount, destinationCurrency, rates]);

    useEffect(() => {
        const videoElement = document.getElementById('background-video');
        if (videoElement) {
            videoElement.controls = false;
            videoElement.setAttribute('controls', 'false');
            videoElement.removeAttribute('controls');
        }
    }, []);

    return (
        <div className="App">
            <div className="video-background">
                <video
                    autoPlay
                    muted
                    loop
                    id="background-video"
                    controls={false}
                    playsInline
                    onContextMenu={(e) => e.preventDefault()} // Empêche le clic droit
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>
            <h1>Convertisseur de devises</h1>
            <div className="container">
                <div className="box">
                    <label htmlFor="source">Source</label>
                    <CurrencySelector
                        value={sourceCurrency}
                        onChange={setSourceCurrency}
                    />
                    <label htmlFor="amount">Montants</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="arrow">
                    →
                </div>
                <div className="box">
                    <label htmlFor="destination">Destination</label>
                    <CurrencySelector
                        value={destinationCurrency}
                        onChange={setDestinationCurrency}
                    />
                </div>
            </div>
            <div className="result-box">
                <p>
                    {amount} {sourceCurrency} = {convertedAmount !== null ? convertedAmount.toFixed(2) : '...'} {destinationCurrency}
                </p>
            </div>
        </div>
    );
}

export default App;
