import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
export const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#faf9ff',
      100: '#d9e2ff',
      200: '#afc6ff',
      300: '#90abe8',
      400: '#7690cc',
      500: '#5c76b0',
      600: '#435d95',
      700: '#2a457c',
      800: '#0e2e64',
      900: '#001a43',
      950: '#000000',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#0e2e64', // 800
          inverseColor: '#ffffff',
          hoverColor: '#001a43', // 900
          activeColor: '#0e2e64', // 800
        },
        highlight: {
          background: '#000000',
          focusBackground: '#2a457c',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '#faf9ff',
          inverseColor: '#000000',
          hoverColor: '#d9e2ff',
          activeColor: '#afc6ff',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});
