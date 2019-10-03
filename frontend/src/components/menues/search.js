import React from "react";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Downshift from "downshift";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Popper } from "@material-ui/core";

const suggestions = [
  { value: "ananas" },
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" }
];

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  paper: {
    zIndex: 1202,
    left: 0,
    right: 0,
    marginLeft: theme.spacing(4),
  }
}));

function renderInput(props) {
  const { classes, ref, inputProps } = props;

  return (
    <InputBase
      inputRef={ref}
      inputProps={inputProps}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  console.log(suggestionProps);
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.value}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.value}
    </MenuItem>
  );
}

function getSuggestions(value, { showEmpty = false } = {}) {
  console.log("Getting suggestions");
  const inputValue = value;
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.value.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

let popperNode;

export default function Search() {
  const classes = useStyles();
  return (
    <Downshift>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => {
        const { onBlur, onFocus, ...inputProps } = getInputProps({
        });
        return (
          <div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {renderInput({
                fullWidth: true,
                classes,
                label: "Country",
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps,
                ref: node => {
                  popperNode = node;
                },
              })}
            </div>
            <Popper open={isOpen} anchorEl={popperNode} style={{ zIndex: 1300,}}>
              <div
                {...(isOpen
                  ? getMenuProps({}, { suppressRefError: true })
                  : {})}
              >
                <Paper 
                  className={classes.paper}
                  square
                  style={{ width: popperNode ? popperNode.clientWidth : undefined }}
                  >
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.value }),
                      highlightedIndex,
                      selectedItem
                    })
                  )}
                </Paper>
              </div>
            </Popper>
          </div>
        );
      }}
    </Downshift>
  );
}
