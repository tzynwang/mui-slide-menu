import React, { memo, useState, useMemo, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Parent {
  id: number
  label: string
}

interface Child {
  id: string
  parent: number
  label: string
}

const PARENT: Parent[] = [
  { id: 1, label: '法務類' },
  { id: 2, label: '金融類' },
  { id: 3, label: '資訊軟體類' },
  { id: 4, label: '設計類' },
  { id: 5, label: '人資類' }
]
const CHILD: Child[] = [
  { id: uuidv4(), parent: 1, label: '法務人員' },
  { id: uuidv4(), parent: 1, label: '律師' },
  { id: uuidv4(), parent: 2, label: '會計師' },
  { id: uuidv4(), parent: 2, label: '財務人員' },
  { id: uuidv4(), parent: 3, label: '系統分析師' },
  { id: uuidv4(), parent: 3, label: '軟體設計工程師' },
  { id: uuidv4(), parent: 4, label: '廣告設計' },
  { id: uuidv4(), parent: 4, label: '工業設計' },
  { id: uuidv4(), parent: 5, label: '人力資源主管' },
  { id: uuidv4(), parent: 5, label: '教育訓練人員' }
]

function App(): React.ReactElement {
  // States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [parent, setParent] = useState<null | number>(null)
  const dynamicChildList = useMemo(
    () => CHILD.filter((c) => c.parent === parent),
    [parent]
  )
  const containerRef = useRef<null | HTMLDivElement>(null)
  const open = Boolean(anchorEl)

  // Functions
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleSliceToChild = (parent: number) => () => {
    setParent(parent)
  }
  const handleSlideToParent = () => {
    setParent(null)
  }
  const handleParentCheck = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
  }

  // Main
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
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
              <MenuItem key={p.id} onClick={handleSliceToChild(p.id)}>
                <Checkbox onClick={handleParentCheck} />
                {p.label}
                <ArrowForwardIosIcon classes={{ root: 'SvgIconParent' }} />
              </MenuItem>
            ))}
          </Paper>
        </Slide>
        <Slide direction="right" in={!!parent} container={containerRef.current}>
          <Paper classes={{ root: 'PaperChild' }}>
            <MenuItem onClick={handleSlideToParent}>
              <ArrowBackIosNewIcon classes={{ root: 'SvgIconChild' }} />
            </MenuItem>
            {dynamicChildList.map((c) => (
              <MenuItem key={c.id}>
                <Checkbox onClick={handleParentCheck} />
                {c.label}
              </MenuItem>
            ))}
          </Paper>
        </Slide>
      </Menu>
    </div>
  )
}

export default memo(App)
