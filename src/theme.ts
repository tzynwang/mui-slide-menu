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
            backgroundColor: '#947A6D'
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
            backgroundColor: '#947A6D'
          },
          '&.PaperChild': {
            backgroundColor: '#947A6D'
          }
        }
      }
    }
  }
})

export default theme
