import React, { memo, useState, useMemo, useRef } from 'react'
import { find, uniqBy } from 'lodash'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import type { SlideMenuProps, Parent, Child } from './types'

function SlideMenu(props: SlideMenuProps): React.ReactElement {
  // States
  const { parentArr, childArr } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [parent, setParent] = useState<null | number>(null)
  const [checkedChild, setCheckedChild] = useState<Child[]>([])
  const dynamicChildList = useMemo(
    () => childArr.filter((c) => c.parent === parent),
    [parent, childArr]
  )
  const containerRef = useRef<null | HTMLDivElement>(null)

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
  const handlePreventLeave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
  }
  const handleParentChange =
    (p: Parent) =>
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        const final = [
          ...checkedChild,
          ...childArr.filter((c) => c.parent === p.id)
        ]
        setCheckedChild(uniqBy(final, 'id'))
      } else {
        setCheckedChild(checkedChild.filter((c) => c.parent !== p.id))
      }
    }
  const handleChildCheck =
    (c: Child) =>
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        setCheckedChild((prev) => [...prev, c])
      } else {
        setCheckedChild((prev) => prev.filter((p) => p.id !== c.id))
      }
    }

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={!!anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl ? 'true' : undefined}
        onClick={handleOpen}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        ref={containerRef}
        classes={{ paper: 'PaperMenu' }}
      >
        <Slide direction="right" in={!parent} container={containerRef.current}>
          <Paper classes={{ root: 'PaperParent' }}>
            {parentArr.map((p) => (
              <MenuItem key={p.id} onClick={handleSliceToChild(p.id)}>
                <Checkbox
                  onClick={handlePreventLeave}
                  onChange={handleParentChange(p)}
                  indeterminate={
                    !!checkedChild.filter((c) => c.parent === p.id).length &&
                    checkedChild.filter((c) => c.parent === p.id).length !==
                      childArr.filter((c) => c.parent === p.id).length
                  }
                  checked={
                    checkedChild.filter((c) => c.parent === p.id).length ===
                    childArr.filter((c) => c.parent === p.id).length
                  }
                />
                {p.label}
                <ArrowForwardIosIcon classes={{ root: 'SvgIconParent' }} />
              </MenuItem>
            ))}
          </Paper>
        </Slide>
        <Slide direction="right" in={!!parent} container={containerRef.current}>
          <Paper classes={{ root: 'PaperChild' }}>
            {dynamicChildList.map((c) => (
              <MenuItem key={c.id} onClick={handleSlideToParent}>
                <ArrowBackIosNewIcon classes={{ root: 'SvgIconChild' }} />
                <Checkbox
                  onClick={handlePreventLeave}
                  onChange={handleChildCheck(c)}
                  checked={!!find(checkedChild, (child) => child.id === c.id)}
                />
                {c.label}
              </MenuItem>
            ))}
          </Paper>
        </Slide>
      </Menu>
    </React.Fragment>
  )
}

export default memo(SlideMenu)
