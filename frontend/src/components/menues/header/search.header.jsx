/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */ // As it is a useful feature in Downshift
import { Popper } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Downshift from "downshift";
import React from "react";
import { searchOperations } from "ducks/search/";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  inputInput: {
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: 200
      },
      width: 120
    },
    height: "1.1875em",
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create("width")
  },
  inputRoot: {
    color: "inherit",
    lineHeight: "1.1875em"
  },
  popper: {
    left: 0,
    marginLeft: theme.spacing(4),
    maxHeight: 400,
    overflowY: "scroll",
    right: 0,
    width: 200 + theme.spacing(7),
    zIndex: theme.zIndex.modal
  },
  search: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    },
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing(2),
    position: "relative",
    width: "100%"
  },
  searchIcon: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    pointerEvents: "none",
    position: "absolute",
    width: theme.spacing(7)
  }
}));

let popperNode;
export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
      >
        {suggestion.title}
      </MenuItem>
    );
  }

  const suggestions = useSelector(state =>
    state.search.suggestions ? state.search.suggestions : []
  );

  function downshiftReducer(state, changes) {
    console.log(state);
    console.log(changes);
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownArrowUp:
        if (state.highlightedIndex === 0) {
          return { ...changes, highlightedIndex: null };
        }
        return changes;
      case Downshift.stateChangeTypes.keyDownArrowDown:
        if (state.highlightedIndex === suggestions.length) {
          return { ...changes, highlightedIndex: null };
        }
        return changes;

      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          inputValue: ""
        };
      default:
        return changes;
    }
  }

  const fetchSuggestions = event => {
    if (!event.target.value) {
      return;
    }
    dispatch(searchOperations.autocompleteRequest(event.target.value));
  };

  const fetchSelectedArticle = selection => {
    dispatch(searchOperations.getArticleRequest(selection));
  };

  const handleEnter = reset => event => {
    if (event.key === "Enter") {
      console.log("Searching");
      reset({ type: Downshift.stateChangeTypes.keyDownEnter });
    }
  };

  return (
    <Downshift onChange={fetchSelectedArticle} stateReducer={downshiftReducer}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        reset
      }) => {
        return (
          <div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onKeyPress={handleEnter(reset)}
                inputRef={node => {
                  popperNode = node;
                }}
                inputProps={getInputProps({
                  onChange: fetchSuggestions
                })}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <Popper
              open={isOpen}
              anchorEl={popperNode}
              style={{ zIndex: 1300 }}
            >
              <div
                {...(isOpen
                  ? getMenuProps({}, { suppressRefError: true })
                  : {})}
              >
                <Paper
                  className={classes.paper}
                  square
                  style={{
                    width: popperNode ? popperNode.clientWidth : undefined
                  }}
                >
                  {suggestions.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({
                        item: suggestion.title
                      }),
                      highlightedIndex
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
