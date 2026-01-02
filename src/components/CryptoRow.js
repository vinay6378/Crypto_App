import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Individual crypto row component
 * Memoized to prevent unnecessary re-renders
 */
const CryptoRow = memo(({ crypto, priceChange }) => {
  const isPriceUp = priceChange === 'up';
  const isPriceDown = priceChange === 'down';
  const isChangePositive = crypto.change24h > 0;

  return (
    <View style={styles.row}>
      <View style={styles.pairContainer}>
        <Text style={styles.pairText}>{crypto.pair}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.priceText,
            isPriceUp && styles.priceUp,
            isPriceDown && styles.priceDown,
          ]}
        >
          ${crypto.price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
      
      <View style={styles.changeContainer}>
        <Text
          style={[
            styles.changeText,
            isChangePositive ? styles.changePositive : styles.changeNegative,
          ]}
        >
          {isChangePositive ? '+' : ''}
          {crypto.change24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
});

CryptoRow.displayName = 'CryptoRow';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  pairContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pairText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  priceUp: {
    color: '#00C853',
    fontWeight: '600',
  },
  priceDown: {
    color: '#D32F2F',
    fontWeight: '600',
  },
  changeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  changePositive: {
    color: '#00C853',
  },
  changeNegative: {
    color: '#D32F2F',
  },
});

export default CryptoRow;

