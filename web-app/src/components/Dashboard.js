import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  VStack,
  HStack,
  Button,
  Heading,
  Text,
  Container,
  Badge,
  Spinner,
  useToast,
  WarningOutlineIcon,
} from 'native-base';

const API_BASE_URL = 'http://localhost:8000';

function Dashboard({ token, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      toast.show({
        render: ({ id }) => (
          <Box bg="danger.500" px="2" py="2" rounded="md" mb={2}>
            <HStack alignItems="center">
              <WarningOutlineIcon color="white" />
              <Text color="white" ml={2} fontWeight="500">
                Failed to fetch user data
              </Text>
            </HStack>
          </Box>
        ),
        duration: 3000,
      });
      onLogout();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack space="4">
          <Spinner size="lg" color="primary.600" />
          <Text color="gray.600">Loading dashboard...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Header */}
      <Box bg="white" borderBottomWidth="1" borderBottomColor="gray.200" py="4" shadow="1">
        <Container maxW="2xl">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack space="1">
              <Heading size="lg" color="primary.600">
                📈 Stock Analysis Dashboard
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Welcome back! Analyze stocks, futures & options.
              </Text>
            </VStack>
            <Button
              bg="danger.600"
              _pressed={{ bg: 'danger.700' }}
              _text={{ color: 'white', fontWeight: 'bold' }}
              onPress={onLogout}
            >
              Logout
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="2xl" py="6">
        <VStack space="6" w="100%">
          {/* User Info Card */}
          <Box
            bg="white"
            rounded="lg"
            shadow="1"
            p="6"
            borderWidth="1"
            borderColor="gray.200"
          >
            <HStack justifyContent="space-between" alignItems="flex-start">
              <VStack space="3" flex="1">
                <Heading size="md" color="gray.800">
                  User Profile
                </Heading>
                <HStack space="2" alignItems="center">
                  <Text color="gray.600" fontWeight="600">
                    Username:
                  </Text>
                  <Badge colorScheme="blue" rounded="full">
                    {userData?.username}
                  </Badge>
                </HStack>
                <HStack space="2" alignItems="center">
                  <Text color="gray.600" fontWeight="600">
                    Email:
                  </Text>
                  <Text color="gray.800">{userData?.email}</Text>
                </HStack>
                <HStack space="2" alignItems="center">
                  <Text color="gray.600" fontWeight="600">
                    Member Since:
                  </Text>
                  <Text color="gray.800">
                    {new Date(userData?.created_at).toLocaleDateString()}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>

          {/* Features Overview */}
          <Box bg="white" rounded="lg" shadow="1" p="6" borderWidth="1" borderColor="gray.200">
            <Heading size="md" mb="4" color="gray.800">
              ✨ Available Features
            </Heading>
            <VStack space="3">
              <HStack space="3" alignItems="flex-start">
                <Box bg="primary.100" rounded="full" w="10" h="10" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="lg">📊</Text>
                </Box>
                <VStack space="1" flex="1">
                  <Heading size="sm" color="gray.800">
                    Stock Analysis
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Real-time stock data, charts, and technical analysis.
                  </Text>
                </VStack>
              </HStack>

              <HStack space="3" alignItems="flex-start">
                <Box bg="secondary.100" rounded="full" w="10" h="10" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="lg">🤖</Text>
                </Box>
                <VStack space="1" flex="1">
                  <Heading size="sm" color="gray.800">
                    ML Predictions
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    AI-powered predictions and trading signals.
                  </Text>
                </VStack>
              </HStack>

              <HStack space="3" alignItems="flex-start">
                <Box bg="success.100" rounded="full" w="10" h="10" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="lg">📰</Text>
                </Box>
                <VStack space="1" flex="1">
                  <Heading size="sm" color="gray.800">
                    News & Sentiment
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Market news with sentiment analysis.
                  </Text>
                </VStack>
              </HStack>

              <HStack space="3" alignItems="flex-start">
                <Box bg="info.100" rounded="full" w="10" h="10" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="lg">⚡</Text>
                </Box>
                <VStack space="1" flex="1">
                  <Heading size="sm" color="gray.800">
                    Real-time Streaming
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Live price updates via WebSocket.
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>

          {/* Coming Soon */}
          <Box
            bg="gradient.100"
            rounded="lg"
            shadow="1"
            p="6"
            borderWidth="2"
            borderColor="primary.200"
            backgroundColor="primary.50"
          >
            <VStack space="3">
              <Heading size="md" color="primary.700">
                🚀 Coming Soon
              </Heading>
              <Text color="primary.600" fontSize="sm">
                We're building more features! Check back soon for:
              </Text>
              <VStack space="2" pl="4">
                <Text color="primary.600" fontSize="sm">
                  • Portfolio management and tracking
                </Text>
                <Text color="primary.600" fontSize="sm">
                  • Advanced technical indicators
                </Text>
                <Text color="primary.600" fontSize="sm">
                  • Custom alerts and notifications
                </Text>
                <Text color="primary.600" fontSize="sm">
                  • Strategy backtesting
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Statistics */}
          <HStack space="4" justifyContent="space-between" w="100%">
            <Box
              bg="white"
              rounded="lg"
              shadow="1"
              p="4"
              flex="1"
              borderWidth="1"
              borderColor="gray.200"
              alignItems="center"
            >
              <Heading size="sm" color="gray.600">
                Platform Status
              </Heading>
              <Badge mt="2" colorScheme="success">
                Operational
              </Badge>
            </Box>
            <Box
              bg="white"
              rounded="lg"
              shadow="1"
              p="4"
              flex="1"
              borderWidth="1"
              borderColor="gray.200"
              alignItems="center"
            >
              <Heading size="sm" color="gray.600">
                API Version
              </Heading>
              <Badge mt="2" colorScheme="info">
                v1.0.0
              </Badge>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default Dashboard;
