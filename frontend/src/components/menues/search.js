import React from "react";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Downshift from "downshift";
import { fade, makeStyles } from "@material-ui/core/styles";

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
    //position: "absolute",
    zIndex: 1,
    width: "auto",
    maxWidth: 400,
    //marginLeft: theme.spacing(3),
    left: 0,
    right: 0
  }
}));

function renderInput(props) {
  const { classes, inputRef, inputProps } = props;

  return (
    <InputBase
      inputRef={inputRef}
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
  console.log(suggestionProps)
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

export default function Search() {
  const classes = useStyles();
  const inputRef = React.useRef(null)
  return (
    <Downshift
      onChange={selection =>
        alert(
          selection ? `You selected ${selection.label}` : "Selection Cleared"
        )
      }
      itemToString={item => (item ? item.label : "")}
    >
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
          placeholder: "Search..."
        });
        return (
          <ul>
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
                inputRef
              })}
            </div>
            <div >
            {isOpen ? (
                <Paper className={classes.paper} square>
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
            ) : null}
            </div>
          </ul>
        );
      }}
    </Downshift>
  );
}
