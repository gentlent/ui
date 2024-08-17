export function convertColorHexToRgb(colorHex) {
  const colorHexWithoutHash = colorHex.replace('#', '');
  const r = parseInt(colorHexWithoutHash.substring(0, 2), 16);
  const g = parseInt(colorHexWithoutHash.substring(2, 4), 16);
  const b = parseInt(colorHexWithoutHash.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export const colors = {
  black: '#000000',
  white: '#ffffff',

  // Blue
  'pal-blue': '#7CAEE0',
  'pal-blue-light': '#6797C1',
  'pal-blue-dark': '#57799D',

  // Cyan
  'pal-cyan': '#09BEB4',
  'pal-cyan-light': '#08A399',
  'pal-cyan-dark': '#05857E',

  // Gray
  'pal-gray-light': '#AAAAB5',
  'pal-gray': '#9090A5',
  'pal-gray-dark': '#747489',

  // Green
  'pal-green-light': '#72BB67',
  'pal-green': '#63A057',
  'pal-green-dark': '#4E8347',

  // Orange
  'pal-orange-light': '#E8974B',
  'pal-orange': '#C8823F',
  'pal-orange-dark': '#A36932',

  // Purple
  'pal-purple-light': '#E38FC4',
  'pal-purple': '#C17CAC',
  'pal-purple-dark': '#A06389',

  // Red
  'pal-red-light': '#FE8968',
  'pal-red': '#DB7558',
  'pal-red-dark': '#B35F47',

  // Violet
  'pal-violet-light': '#B69FDB',
  'pal-violet': '#998ABE',
  'pal-violet-dark': '#806F99',

  // Yellow
  'pal-yellow-light': '#C7A73E',
  'pal-yellow': '#AC8F34',
  'pal-yellow-dark': '#8B7429',

  // Old Colors
  blue: '#3a64ee',
  'blue-light': '#4e75f3',
  'blue-lighter': '#ecefff',
  'blue-lightest': '#f7f8ff',
  bluegray: '#4d4e56',
  'bluegray-dark': '#131316',
  'bluegray-light': '#9c9cab',
  'bluegray-lighter': '#c8c8d0',
  'bluegray-lightest': '#f4f4f6',
  gray: '#9b9ea7',
  'gray-medium': '#555555',
  'gray-dark': '#333333',
  'gray-darker': '#121212',
  'gray-darkest': '#090909',
  'gray-light': '#e0e0e0',
  'gray-lighter': '#f0f0f0',
  'gray-lightest': '#fafafa',
  'purple-light': '#5658d8',
  purple: '#5e1bc9',
  red: '#eb1414',

  'gray-50': '#f9fafb',
  'gray-100': '#f3f4f6',
  'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db',
  'gray-400': '#9ca3af',
  'gray-500': '#6b7280',
  'gray-600': '#4b5563',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
  'red-50': '#fef2f2',
  'red-100': '#fee2e2',
  'red-200': '#fecaca',
  'red-300': '#fca5a5',
  'red-400': '#f87171',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'red-700': '#b91c1c',
  'red-800': '#991b1b',
  'red-900': '#7f1d1d',
  'yellow-50': '#fffbeb',
  'yellow-100': '#fef3c7',
  'yellow-200': '#fde68a',
  'yellow-300': '#fcd34d',
  'yellow-400': '#fbbf24',
  'yellow-500': '#f59e0b',
  'yellow-600': '#d97706',
  'yellow-700': '#b45309',
  'yellow-800': '#92400e',
  'yellow-900': '#78350f',
  'green-50': '#ecfdf5',
  'green-100': '#d1fae5',
  'green-200': '#a7f3d0',
  'green-300': '#6ee7b7',
  'green-400': '#34d399',
  'green-500': '#10b981',
  'green-600': '#059669',
  'green-700': '#047857',
  'green-800': '#065f46',
  'green-900': '#064e3b',
  'blue-50': '#eff6ff',
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'blue-300': '#93c5fd',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'blue-800': '#1e40af',
  'blue-900': '#1e3a8a',
  'indigo-50': '#eef2ff',
  'indigo-100': '#e0e7ff',
  'indigo-200': '#c7d2fe',
  'indigo-300': '#a5b4fc',
  'indigo-400': '#818cf8',
  'indigo-500': '#6366f1',
  'indigo-600': '#4f46e5',
  'indigo-700': '#4338ca',
  'indigo-800': '#3730a3',
  'indigo-900': '#312e81',
  'purple-50': '#f5f3ff',
  'purple-100': '#ede9fe',
  'purple-200': '#ddd6fe',
  'purple-300': '#c4b5fd',
  'purple-400': '#a78bfa',
  'purple-500': '#8b5cf6',
  'purple-600': '#7c3aed',
  'purple-700': '#6d28d9',
  'purple-800': '#5b21b6',
  'purple-900': '#4c1d95',
  'pink-50': '#fdf2f8',
  'pink-100': '#fce7f3',
  'pink-200': '#fbcfe8',
  'pink-300': '#f9a8d4',
  'pink-400': '#f472b6',
  'pink-500': '#ec4899',
  'pink-600': '#db2777',
  'pink-700': '#be185d',
  'pink-800': '#9d174d',
  'pink-900': '#831843',
};

export const emphasize = {
  high: 0.87,
  medium: 0.60,
  disabled: 0.38,
  light: 0.038,
};

export const boxShadow = {
  light: '0 1px 2px 0 rgba(0,0,0,.05)',
  default: '0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)',
  medium: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)',
  high: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)',
  dark: '0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)',
};

export const fontSize = {
  small: 0.707,
  normal: 1,
  large: 1.25,
  xl: 1.25 ** 2,
  xxl: 1.25 ** 3,
  '3xl': 1.25 ** 4,
  '4xl': 1.25 ** 5,
  '5xl': 1.25 ** 6,
};

export const getFontSize = (theme, fontSizeRatio) => 16 * theme.baseFontSize * fontSizeRatio;

export const fontStack = {
  default: 'Inter, Helvetica, sans-serif',
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const transitions = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const lineHeight = {
  small: 1.25,
  normal: 1.5,
  large: 1.75,
};

export const zIndex = {
  default: 1,
  navigation: 100,
};

export const breakpointWidth = 1080;
