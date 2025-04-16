const colors = {
  neutral: {
    100: '#ffffff',
    200: '#eeeeee',
    300: '#e5e5e5',
    400: '#f5f5f5',
  },
  dark: {
    100: '#000000',
    200: '#737373',
  },
};

module.exports = {
  theme: {
    colors: {
      ...colors,
      'primary-100': '#18366C',
      'secondary-100': '#D0332E',
      'success-100': '#4CAF50',
      'info-100': '#2196F3',
    },
    boxShadow: {
      sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      DEFAULT: '0px 0px 6px 1px rgba(0, 0, 0, 0.1)',
      md: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
      '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: '0px 2px 4px 0px rgba(0, 0, 0, 0.06) inset',
      none: 'none',
      menu: '0px 1px 10px 0px rgba(0, 0, 0, 0.1)',
      nav: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
      card: '0px 0px 14px 0px rgba(0, 0, 0, 0.25)',
    },
    screens: {
      xs: '280px',
      sm: '420px',
      md: '600px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1550px',
    },
    fontFamily: {
      sans: ['Barlow', 'sans-serif'],
      serif: ['Barlow', 'serif'],
      'barlow-sans': ['Barlow', 'sans-serif'],
      'barlow-serif': ['Barlow', 'serif'],
      'work-sans': ['Work Sans', 'sans-serif'],
      'work-serif': ['Work Sans', 'sans-serif'],
      primary: `var(--font-family-primary, 'Barlow, sans-serif')`,
      secondary: `var(--font-family-secondary, 'Work Sans, sans-serif')`,
      tertiary: `var(--font-family-tertiary, 'Barlow, serif')`,
    },
    extend: {
      borderRadius: {
        round: '50%',
      },
      width: {
        '1/10': '10%',
      },
      gridTemplateRows: {
        auto: 'auto 1fr',
      },
      borders: {
        light: '1px solid #e7e8e9',
      },
      fontSize: {
        10: '0.625rem',
        11: '0.6875rem',
        12: '0.75rem',
        13: '0.8125rem',
        14: '0.875rem',
        16: '1rem',
        18: '1.125rem',
        21: '1.3125rem',
        22: '1.375rem',
        24: '1.5rem',
        30: '1.875rem',
        36: '2.25rem',
        48: '3rem',
        60: '3.75rem',
        72: '4.5rem',
      },
    },
  },
};
