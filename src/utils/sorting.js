/**
 * Sort crypto data by price (High to Low)
 */
export const sortByPrice = (data) => {
  return [...data].sort((a, b) => b.price - a.price);
};

/**
 * Sort crypto data by 24h % Change (High to Low)
 */
export const sortByChange24h = (data) => {
  return [...data].sort((a, b) => b.change24h - a.change24h);
};

/**
 * Sort crypto data by default order (original order)
 */
export const sortByDefault = (data, originalOrder) => {
  const orderMap = {};
  originalOrder.forEach((item, index) => {
    orderMap[item.id] = index;
  });
  return [...data].sort((a, b) => {
    const orderA = orderMap[a.id] ?? Infinity;
    const orderB = orderMap[b.id] ?? Infinity;
    return orderA - orderB;
  });
};

