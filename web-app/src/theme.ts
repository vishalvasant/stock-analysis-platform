import { extendTheme, ICustomTheme } from 'native-base';

export const customTheme: ICustomTheme = extendTheme({
  colors: {
    // Brand colors
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3', // Main primary
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    secondary: {
      50: '#f3e5f5',
      100: '#e1bee7',
      200: '#ce93d8',
      300: '#ba68c8',
      400: '#ab47bc',
      500: '#9c27b0', // Main secondary
      600: '#8e24aa',
      700: '#7b1fa2',
      800: '#6a1b9a',
      900: '#4a148c',
    },
    success: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
    },
    danger: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
    },
    warning: {
      50: '#fff3e0',
      100: '#ffe0b2',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa726',
      500: '#ff9800',
      600: '#f57c00',
      700: '#e65100',
      800: '#d84315',
      900: '#bf360c',
    },
    info: {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#009688',
      600: '#00897b',
      700: '#00796b',
      800: '#00695c',
      900: '#004d40',
    },
    // Neutral colors
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontSize: {
      '2xs': 10,
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
    },
    lineHeights: {
      '3': 12,
      '4': 16,
      '5': 20,
      '6': 24,
      '7': 28,
      '8': 32,
      '9': 36,
      '10': 40,
    },
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto_100Thin',
      },
      200: {
        normal: 'Roboto_300Light',
      },
      300: {
        normal: 'Roboto_300Light',
      },
      400: {
        normal: 'Roboto_400Regular',
      },
      500: {
        normal: 'Roboto_500Medium',
      },
      600: {
        normal: 'Roboto_500Medium',
      },
      700: {
        normal: 'Roboto_700Bold',
      },
      800: {
        normal: 'Roboto_700Bold',
      },
      900: {
        normal: 'Roboto_900Black',
      },
    },
  },
  fonts: {
    body: 'Roboto',
    heading: 'Roboto',
    mono: 'Roboto',
  },
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
        _text: {
          fontWeight: 600,
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.800',
      },
    },
    Input: {
      baseStyle: {
        rounded: 'md',
        fontSize: 'md',
      },
      defaultProps: {
        size: 'md',
        variant: 'outline',
      },
    },
    Box: {
      baseStyle: {
        p: 4,
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        color: 'gray.900',
      },
    },
  },
});
