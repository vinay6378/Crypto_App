import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CryptoList from './src/components/CryptoList';
import SortButtons from './src/components/SortButtons';
import { useCryptoUpdates } from './src/hooks/useCryptoUpdates';
import { INITIAL_CRYPTO_DATA } from './src/utils/cryptoData';

/**
 * Main App Component
 * Manages sorting state and coordinates crypto data updates
 */
export default function App() {
  const [sortBy, setSortBy] = useState('default');
  const { cryptoData, priceChanges } = useCryptoUpdates();
  const originalOrderRef = useRef(INITIAL_CRYPTO_DATA);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crypto Market Watch</Text>
        <Text style={styles.headerSubtitle}>Real-time Price Updates</Text>
      </View>

      <SortButtons sortBy={sortBy} onSortChange={handleSortChange} />

      <CryptoList
        cryptoData={cryptoData}
        priceChanges={priceChanges}
        sortBy={sortBy}
        originalOrder={originalOrderRef.current}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
});

