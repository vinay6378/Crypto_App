import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CryptoRow from './CryptoRow';
import { sortByPrice, sortByChange24h, sortByDefault } from '../utils/sorting';

/**
 * Crypto list component with sorting functionality
 * Uses useMemo to prevent unnecessary re-renders
 */
const CryptoList = ({ cryptoData, priceChanges, sortBy, originalOrder }) => {
  // Memoize sorted data to prevent recalculation on every render
  const sortedData = useMemo(() => {
    switch (sortBy) {
      case 'price':
        return sortByPrice(cryptoData);
      case 'change24h':
        return sortByChange24h(cryptoData);
      case 'default':
      default:
        return sortByDefault(cryptoData, originalOrder);
    }
  }, [cryptoData, sortBy, originalOrder]);

  // Memoize render item function
  const renderItem = useMemo(
    () => ({ item }) => (
      <CryptoRow crypto={item} priceChange={priceChanges[item.id]} />
    ),
    [priceChanges]
  );

  // Memoize key extractor
  const keyExtractor = useMemo(() => (item) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default CryptoList;

