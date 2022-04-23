import React, { memo, useState, useMemo, useRef } from "react";
import { find, uniqBy } from "lodash";
import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import type { SlideMenuProps, Child } from "./types";

function SlideMenu(props: SlideMenuProps): React.ReactElement {
  // States
  const { parentArr, childArr } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [parent, setParent] = useState<null | number>(null);
  const [checkedChild, setCheckedChild] = useState<Child[]>([]);
  const dynamicChildList = useMemo(
    () => childArr.filter((c) => c.parent === parent),
    [parent, childArr]
  );
  const buttonLabel = useMemo(
    () =>
      checkedChild.length
        ? checkedChild.map((c) => c.label).join("、")
        : "請選擇項目",
    [checkedChild]
  );
  const containerRef = useRef<null | HTMLDivElement>(null);
  const underBreakPointsSm = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  // Functions
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSliceToChild = (parent: number) => () => {
    setParent(parent);
    setCheckedChild([]);
  };
  const handleSlideToParent = () => {
    setParent(null);
  };
  const handleParentChange =
    (p: null | number) =>
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        const final = [
          ...checkedChild,
          ...childArr.filter((c) => c.parent === p),
        ];
        setCheckedChild(uniqBy(final, "id"));
      } else {
        setCheckedChild(checkedChild.filter((c) => c.parent !== p));
      }
    };
  const handleChildChange =
    (c: Child) =>
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        setCheckedChild((prev) => [...prev, c]);
      } else {
        setCheckedChild((prev) => prev.filter((p) => p.id !== c.id));
      }
    };

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={!!anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl ? "true" : undefined}
        endIcon={!!anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        onClick={handleOpen}
      >
        {buttonLabel}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        classes={{ list: "ListMenuNoPadding" }}
      >
        <Box
          sx={{
            position: "relative",
            height: underBreakPointsSm ? "40px" : "44px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid #DFDFDF",
          }}
        >
          您工作所屬的產業
          <IconButton
            classes={{ root: "MenuTitleClose" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Paper
          ref={containerRef}
          classes={{
            root: underBreakPointsSm ? "PaperMenu" : "TwoColPaperMenu",
          }}
        >
          <Slide
            direction="right"
            in={underBreakPointsSm ? !parent : true}
            container={containerRef.current}
          >
            <Paper classes={{ root: "PaperParent" }}>
              {parentArr.map((p) => (
                <MenuItem
                  key={p.id}
                  classes={{ root: "Height40" }}
                  onClick={handleSliceToChild(p.id)}
                >
                  {p.label}
                  <IconButton
                    classes={{ root: "ButtonBaseParent" }}
                    onClick={handleSliceToChild(p.id)}
                    disableFocusRipple
                    disableRipple
                  >
                    <ArrowForwardIosIcon classes={{ root: "SvgIconParent" }} />
                  </IconButton>
                </MenuItem>
              ))}
            </Paper>
          </Slide>
          <Slide
            direction="right"
            in={underBreakPointsSm ? !!parent : true}
            container={containerRef.current}
          >
            <Paper
              classes={{
                root: underBreakPointsSm ? "PaperChild" : "TwoColPaperChild",
              }}
            >
              {parent && (
                <MenuItem classes={{ root: "Height40" }}>
                  <IconButton
                    classes={{ root: "MenuIconButton" }}
                    onClick={handleSlideToParent}
                    sx={{ display: underBreakPointsSm ? "block" : "none" }}
                    disableFocusRipple
                    disableRipple
                  >
                    <ArrowBackIosNewIcon classes={{ root: "SvgIconChild" }} />
                  </IconButton>
                  <Checkbox
                    onChange={handleParentChange(parent)}
                    checked={
                      checkedChild.filter((c) => c.parent === parent).length ===
                      childArr.filter((c) => c.parent === parent).length
                    }
                    indeterminate={
                      !!checkedChild.filter((c) => c.parent === parent)
                        .length &&
                      checkedChild.filter((c) => c.parent === parent).length !==
                        childArr.filter((c) => c.parent === parent).length
                    }
                    classes={{ root: "CheckboxChild" }}
                    disableRipple
                  />
                  {parentArr.find((p) => p.id === parent)?.label}
                </MenuItem>
              )}
              {parent &&
                dynamicChildList.map((c) => (
                  <MenuItem
                    key={c.id}
                    classes={{
                      root: `Height40 ${
                        underBreakPointsSm
                          ? "MenuItemChild"
                          : "TwoColMenuItemChild"
                      }`,
                    }}
                  >
                    <Checkbox
                      onChange={handleChildChange(c)}
                      checked={
                        !!find(checkedChild, (child) => child.id === c.id)
                      }
                      classes={{ root: "CheckboxChild" }}
                      disableRipple
                    />
                    {c.label}
                  </MenuItem>
                ))}
            </Paper>
          </Slide>
        </Paper>
        <Box
          sx={{
            height: "56px",
            display: "flex",
            justifyContent: underBreakPointsSm ? "center" : "flex-end",
            alignItems: "center",
            paddingRight: underBreakPointsSm ? "0px" : "16px",
            borderTop: "1px solid #dfdfdf",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ height: "40px", width: "120px" }}
            variant="contained"
          >
            確定
          </Button>
        </Box>
      </Menu>
    </React.Fragment>
  );
}

export default memo(SlideMenu);
