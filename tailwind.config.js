module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'btn-bg': "#FFFFFF",
     }),
    extend: {
      spacing: {
        'btn-width': '384px',
        'btn-height': '52px',
        'btn-margin-bot': '16px',
        'content-height': '633px',
        'content-width': '460px',
        'step-title-padding-left': '33px'
      }
    },
    boxShadow: {
      'btn-box-shadow': '0px 1.52905px 6.49847px rgba(0, 0, 0, 0.08)',
      'step-title-shadow': '0px 1.07494px 4.56847px rgba(0, 0, 0, 0.08)'
    },
    borderRadius: {
      'btn-border-radius': '3px',
      'step-title-radius': '14.5781px 14.5781px 0px 0px',
      'step-footer-radius': '0px 0px 14.5781px 14.5781px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}