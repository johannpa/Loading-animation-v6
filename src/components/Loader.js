import React, { useState, useEffect } from 'react';
import "./Loader.css";

function Loader() {
    const [loading, setLoading] = useState();
    const [quote, setQuote] = useState({});
    const [num, setNum] = useState(0);
    
    
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * ((max - min + 1)) + min) * 1000;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setNum(randomNumber(2, 5));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [])
    

    const getRandomQuote = () => {
        setLoading(true);
        setTimeout(() => {
            fetch('https://api.quotable.io/random')
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    setQuote(data);
                });
        }, num);
    };

  return (
    <div className='container'>
      {loading ? (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
      ) : (
        <div className="main-content">
            <h1>Hello World!</h1>
            <p>
                This is a demo Project to show in React how to add animated loading with random delay.
            </p>
            <div className="buttons">
                <button className="btn">
                    <a href="#">Read Article</a>
                </button>
                <button className="btn get-quote" onClick={getRandomQuote}>
                    Generate Quote
                </button>
            </div>
            <div className="quote-section">
                <blockquote className="quote">{quote.content}</blockquote> -{' '}
                <span className="author">{quote.author}</span>
            </div>
        </div>
      )}
    </div>
  )
}

export default Loader;
