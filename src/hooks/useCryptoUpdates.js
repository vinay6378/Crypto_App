import { useState, useEffect, useRef } from 'react';
import { INITIAL_CRYPTO_DATA, updateCryptoPrices } from '../utils/cryptoData';

/**
 * Custom hook to manage crypto price updates
 * Updates prices every 2-3 seconds with random intervals
 */
export const useCryptoUpdates = () => {
  const [cryptoData, setCryptoData] = useState(INITIAL_CRYPTO_DATA);
  const [priceChanges, setPriceChanges] = useState({});
  const intervalRef = useRef(null);
  const highlightTimeoutRef = useRef(null);
  const previousPricesRef = useRef({});

  useEffect(() => {
    // Initialize previous prices
    const initialPrices = {};
    INITIAL_CRYPTO_DATA.forEach((crypto) => {
      initialPrices[crypto.id] = crypto.price;
    });
    previousPricesRef.current = initialPrices;

    // Function to update prices
    const updatePrices = () => {
      setCryptoData((prevData) => {
        const updatedData = updateCryptoPrices(prevData);
        
        // Track price changes for highlighting
        const changes = {};
        updatedData.forEach((crypto) => {
          const prevPrice = previousPricesRef.current[crypto.id];
          if (prevPrice !== undefined) {
            if (crypto.price > prevPrice) {
              changes[crypto.id] = 'up';
            } else if (crypto.price < prevPrice) {
              changes[crypto.id] = 'down';
            }
          }
          previousPricesRef.current[crypto.id] = crypto.price;
        });

        // Update price changes state
        setPriceChanges(changes);

        // Clear previous highlight timeout if exists
        if (highlightTimeoutRef.current) {
          clearTimeout(highlightTimeoutRef.current);
        }

        // Clear highlights after animation
        highlightTimeoutRef.current = setTimeout(() => {
          setPriceChanges({});
        }, 1000);

        return updatedData;
      });
    };

    // Start interval with random delay between 2-3 seconds
    const scheduleUpdate = () => {
      const delay = 2000 + Math.random() * 1000; // 2000-3000ms
      intervalRef.current = setTimeout(() => {
        updatePrices();
        scheduleUpdate(); // Schedule next update
      }, delay);
    };

    // Initial update after first interval
    scheduleUpdate();

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  return { cryptoData, priceChanges };
};

