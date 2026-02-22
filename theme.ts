export const lightTheme = {
  colors: {
    background: '#F5F9F4',
    surface: '#FFFFFF',
    primary: '#2D7A4F',
    primaryLight: '#4A9B6C',
    secondary: '#1B5E7A',
    accent: '#FFC107',
    text: '#1A2E1A',
    textMuted: '#5A6B5A',
    recycle: '#2196F3',
    compost: '#8BC34A',
    trash: '#9E9E9E',
    hazardous: '#F44336',
    reuse: '#9C27B0',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    border: '#D4E5D4',
  },
};

export const darkTheme = {
  colors: {
    background: '#0F1A12',
    surface: '#1A2E1F',
    primary: '#4A9B6C',
    primaryLight: '#6BB88A',
    secondary: '#2E7D9A',
    accent: '#FFD54F',
    text: '#E8F5E9',
    textMuted: '#90A090',
    recycle: '#64B5F6',
    compost: '#AED581',
    trash: '#BDBDBD',
    hazardous: '#EF5350',
    reuse: '#BA68C8',
    success: '#81C784',
    warning: '#FFB74D',
    error: '#EF5350',
    border: '#2D4A32',
  },
};

export type Theme = typeof lightTheme;
