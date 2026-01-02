import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Sort buttons component
 */
const SortButtons = ({ sortBy, onSortChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, sortBy === 'price' && styles.buttonActive]}
        onPress={() => onSortChange('price')}
      >
        <Text
          style={[
            styles.buttonText,
            sortBy === 'price' && styles.buttonTextActive,
          ]}
        >
          Sort by Price
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, sortBy === 'change24h' && styles.buttonActive]}
        onPress={() => onSortChange('change24h')}
      >
        <Text
          style={[
            styles.buttonText,
            sortBy === 'change24h' && styles.buttonTextActive,
          ]}
        >
          Sort by 24h %
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, sortBy === 'default' && styles.buttonActive]}
        onPress={() => onSortChange('default')}
      >
        <Text
          style={[
            styles.buttonText,
            sortBy === 'default' && styles.buttonTextActive,
          ]}
        >
          Default
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonActive: {
    backgroundColor: '#1976D2',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  buttonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default SortButtons;

