// Initial mock data for crypto pairs
export const INITIAL_CRYPTO_DATA = [
  { id: '1', pair: 'BTC/USDT', price: 43250.50, change24h: 2.45 },
  { id: '2', pair: 'ETH/USDT', price: 2650.75, change24h: -1.23 },
  { id: '3', pair: 'SOL/USDT', price: 98.20, change24h: 5.67 },
  { id: '4', pair: 'BNB/USDT', price: 315.40, change24h: 0.89 },
  { id: '5', pair: 'XRP/USDT', price: 0.625, change24h: -2.15 },
  { id: '6', pair: 'ADA/USDT', price: 0.485, change24h: 3.21 },
  { id: '7', pair: 'DOGE/USDT', price: 0.092, change24h: -0.45 },
  { id: '8', pair: 'MATIC/USDT', price: 0.875, change24h: 1.56 },
  { id: '9', pair: 'DOT/USDT', price: 7.25, change24h: -1.89 },
  { id: '10', pair: 'LINK/USDT', price: 14.50, change24h: 2.34 },
  { id: '11', pair: 'AVAX/USDT', price: 36.80, change24h: 4.12 },
  { id: '12', pair: 'UNI/USDT', price: 6.45, change24h: -0.78 },
];

/**
 * Generates a random price change between -0.5% and +0.5%
 * @param {number} currentPrice - Current price
 * @returns {number} - New price
 */
export const generatePriceChange = (currentPrice) => {
  const changePercent = (Math.random() - 0.5) * 1.0; // -0.5% to +0.5%
  const changeAmount = currentPrice * (changePercent / 100);
  return Math.max(0.0001, currentPrice + changeAmount); // Ensure price doesn't go negative
};

/**
 * Updates prices for all crypto pairs
 * @param {Array} currentData - Current crypto data array
 * @returns {Array} - Updated crypto data array
 */
export const updateCryptoPrices = (currentData) => {
  return currentData.map((crypto) => {
    const newPrice = generatePriceChange(crypto.price);
    const priceChange = ((newPrice - crypto.price) / crypto.price) * 100;
    
    // Update 24h change slightly (simulate market movement)
    const change24hUpdate = (Math.random() - 0.5) * 0.1; // Small random change
    const newChange24h = crypto.change24h + change24hUpdate;
    
    return {
      ...crypto,
      price: parseFloat(newPrice.toFixed(2)),
      change24h: parseFloat(newChange24h.toFixed(2)),
      priceChanged: true, // Flag to indicate price changed
    };
  });
};

