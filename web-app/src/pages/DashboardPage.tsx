import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  ScrollView,
  Divider,
  useToast,
} from 'native-base';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';

interface DashboardPageProps {
  onLogout?: () => void;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

/**
 * DashboardPage Component
 * Main dashboard for authenticated users showing market data
 */
export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const toast = useToast();
  const { user, logout } = useAuth();

  const [stocks, setStocks] = useState<StockData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Mock stock data for demonstration
  const mockStocks: StockData[] = [
    { symbol: 'INFY', price: 1650.50, change: 12.50, changePercent: 0.77, high: 1680, low: 1620 },
    { symbol: 'TCS', price: 3850.00, change: -25.00, changePercent: -0.65, high: 3920, low: 3800 },
    { symbol: 'WIPRO', price: 495.25, change: 18.75, changePercent: 3.93, high: 510, low: 480 },
    { symbol: 'HCL', price: 1280.00, change: 5.00, changePercent: 0.39, high: 1300, low: 1250 },
    { symbol: 'LT', price: 2450.00, change: -30.00, changePercent: -1.21, high: 2500, low: 2400 },
  ];

  useEffect(() => {
    // Load stocks on mount
    loadStocks();
  }, []);

  /**
   * Load stock data
   */
  const loadStocks = async () => {
    try {
      setRefreshing(true);
      // In a real app, this would be: await get('/stocks');
      // For now, using mock data
      setStocks(mockStocks);
    } catch (err) {
      toast.show({
        title: 'Error',
        description: 'Failed to load stock data',
        duration: 2000,
        placement: 'top',
      });
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  return (
    <VStack flex={1} bg="gray.50">
      {/* Header */}
      <Box bg="primary.500" pt={6} pb={4} px={4} shadow={2}>
        <VStack space={3}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Heading size="lg" color="white">
                Dashboard
              </Heading>
              <Text fontSize="sm" color="rgba(255,255,255,0.9)">
                Welcome back, {user?.username || 'Trader'}!
              </Text>
            </VStack>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#E53E3E',
                color: 'white',
                fontSize: '12px',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </HStack>
        </VStack>
      </Box>

      {/* Content */}
      <ScrollView flex={1} px={4} py={4}>
        <VStack space={4}>
          {/* Portfolio Summary */}
          <Box bg="white" rounded="lg" p={4} shadow={1}>
            <Heading size="sm" mb={3} color="gray.800">
              📊 Portfolio Summary
            </Heading>
            <HStack justifyContent="space-around" space={4}>
              <VStack alignItems="center">
                <Text fontSize="xs" color="gray.600" mb={1}>
                  Total Value
                </Text>
                <Heading size="sm" color="primary.500">
                  ₹2,50,000
                </Heading>
              </VStack>
              <Divider orientation="vertical" />
              <VStack alignItems="center">
                <Text fontSize="xs" color="gray.600" mb={1}>
                  Today's Gain
                </Text>
                <Heading size="sm" color="success.500">
                  +₹1,250
                </Heading>
              </VStack>
              <Divider orientation="vertical" />
              <VStack alignItems="center">
                <Text fontSize="xs" color="gray.600" mb={1}>
                  Holdings
                </Text>
                <Heading size="sm" color="info.500">
                  12
                </Heading>
              </VStack>
            </HStack>
          </Box>

          {/* Watchlist Header */}
          <HStack justifyContent="space-between" alignItems="center" mt={2}>
            <Heading size="sm" color="gray.800">
              📈 Watchlist
            </Heading>
            <button
              onClick={loadStocks}
              disabled={refreshing}
              style={{
                backgroundColor: 'transparent',
                color: '#3182ce',
                fontSize: '12px',
                padding: '8px 16px',
                border: 'none',
                cursor: refreshing ? 'not-allowed' : 'pointer'
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </HStack>

          {/* Stock List */}
          <VStack space={2}>
            {stocks.map((stock) => (
              <Box key={stock.symbol} bg="white" rounded="lg" p={4} shadow={1}>
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack flex={1} space={1}>
                    <Heading size="sm" color="gray.900">
                      {stock.symbol}
                    </Heading>
                    <HStack space={2}>
                      <Text fontSize="xs" color="gray.600">
                        High: ₹{stock.high.toFixed(2)}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Low: ₹{stock.low.toFixed(2)}
                      </Text>
                    </HStack>
                  </VStack>

                  <VStack alignItems="flex-end" space={1}>
                    <Heading size="sm" color="gray.900">
                      ₹{stock.price.toFixed(2)}
                    </Heading>
                    <HStack
                      bg={stock.change >= 0 ? 'success.100' : 'danger.100'}
                      rounded="md"
                      px={2}
                      py={1}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight="600"
                        color={stock.change >= 0 ? 'success.700' : 'danger.700'}
                      >
                        {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.change).toFixed(2)} (
                        {Math.abs(stock.changePercent).toFixed(2)}%)
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>

          {/* Quick Actions */}
          <Box bg="white" rounded="lg" p={4} shadow={1} mt={4}>
            <Heading size="sm" mb={4} color="gray.800">
              🎯 Quick Actions
            </Heading>
            <VStack space={2}>
              <button
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '2px solid #3182ce',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '14px',
                  color: '#3182ce',
                  marginBottom: '8px'
                }}
              >
                View All Holdings
              </button>
              <button
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '2px solid #38A169',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '14px',
                  color: '#38A169',
                  marginBottom: '8px'
                }}
              >
                Place Trade
              </button>
              <button
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '2px solid #3182ce',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '14px',
                  color: '#3182ce'
                }}
              >
                Watchlist Settings
              </button>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default DashboardPage;
