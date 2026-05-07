import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/themes/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: { 900: '#0D0D0D', 600: '#3D3D3D', 300: '#9D9D9D', 100: '#F5F5F4' },
        leaf: { 600: '#1E6B45', 100: '#EDFAF3' },
        amber: { 600: '#B45309', 100: '#FFFBEB' },
        saffron: '#FF9933',
        ashoka: '#000080',
        cosmic: {
          900: '#0c051a',
          800: '#160b29',
          700: '#23113d',
          600: '#341a59',
          border: '#472175',
        },
        neon: {
          pink: '#ff1493',
          purple: '#ce63ff',
        }

      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '4px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
export default config;
