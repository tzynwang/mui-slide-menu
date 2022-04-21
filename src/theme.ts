import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.PaperMenu': {
            width: '300px',
            height: '300px',
            position: 'relative',
            overflowY: 'hidden',
            backgroundColor: '#fffffe'
          },
          '&.PaperParent, &.PaperChild': {
            width: '300px',
            height: '300px',
            position: 'absolute',
            top: 0,
            left: 0,
            overflowY: 'auto',
            boxShadow: 'unset'
          },
          '&.PaperParent': {
            backgroundColor: '#fffffe'
          },
          '&.PaperChild': {
            backgroundColor: '#fffffe'
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.SvgIconParent': {
            marginLeft: 'auto',
            fontSize: '1rem'
          },
          '&.SvgIconChild': {
            fontSize: '1rem'
          }
        }
      }
    }
  }
})

export default theme
