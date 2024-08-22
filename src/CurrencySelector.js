import React, { useState } from 'react';
import { currencies } from './currencies';

function CurrencySelector({ label, value, onChange }) {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredCurrencies = query
        ? currencies
            .filter(
                (currency) =>
                    currency.name.toLowerCase().includes(query.toLowerCase()) ||
                    currency.code.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5)
        : [];

    return (
        <div style={{ position: 'relative' }}>
            <label>{label}</label>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(e.target.value !== '');
                }}
                onFocus={() => setShowSuggestions(query !== '')}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Tapez une devise..."
            />
            {showSuggestions && (
                <ul>
                    {filteredCurrencies.map((currency) => (
                        <li
                            key={currency.code}
                            onClick={() => {
                                onChange(currency.code);
                                setQuery(currency.code);
                                setShowSuggestions(false);
                            }}
                        >
                            {currency.code} - {currency.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CurrencySelector;
