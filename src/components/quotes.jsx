import React, { useState, useEffect } from 'react';

export function Quote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuote();
  }, []);

  const loadQuote = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/quote');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError('Failed to load quote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        Loading quote...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{textAlign: 'center', padding: '20px', color: 'red'}}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '600px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <p style={{fontSize: '18px', fontStyle: 'italic'}}>
        "{quote?.text}"
      </p>
      <p style={{fontSize: '14px', color: '#666'}}>
        — {quote?.author}
      </p>
      {/* <button 
        onClick={loadQuote}
        style={{
          padding: '10px 20px',
          marginTop: '10px',
          cursor: 'pointer',
          border: '1px solid #007bff',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white'
        }}
      >
        Get New Quote
      </button> */}
    </div>
  );
}