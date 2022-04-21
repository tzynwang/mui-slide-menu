import React, { memo, useState, useRef } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'

const PARENT = Array.from(Array(20).keys())
const CHILD = Array.from(Array(10).keys())

function App(): React.ReactElement {
  // States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [parent, setParent] = useState<null | number>(null)
  const containerRef = useRef<null | HTMLDivElement>(null)
  const open = Boolean(anchorEl)

  // Functions
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSlide = (parent: number) => () => {
    setParent(parent)
  }
  const handleSlideToParent = () => {
    setParent(null)
  }

  // Main
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        ref={containerRef}
        classes={{ paper: 'PaperMenu' }}
      >
        <Slide direction="right" in={!parent} container={containerRef.current}>
          <Paper classes={{ root: 'PaperParent' }}>
            {PARENT.map((p) => (
              <MenuItem key={p} onClick={handleSlide(p)}>
                {p}
              </MenuItem>
            ))}
          </Paper>
        </Slide>
        <Slide direction="right" in={!!parent} container={containerRef.current}>
          <Paper classes={{ root: 'PaperChild' }}>
            <MenuItem onClick={handleSlideToParent}>Back To Parent</MenuItem>
            {CHILD.map((c) => (
              <MenuItem key={c}>
                {c}
              </MenuItem>
            ))}
          </Paper>
        </Slide>
      </Menu>
    </div>
  )
}

export default memo(App)
