import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { searchActions } from "ducks/search/";
import useAutocomplete from "hooks/useAutocomplete";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popper as PopperComponent } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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

export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const fetchSuggestions = event => {
    dispatch(searchActions.autocompleteRequest(event.target.value));
  };

  const fetchSelectedArticle = title => {
    dispatch(
      searchActions.getArticleRequest({
        title,
        focus: true,
        location: "autosuggest"
      })
    );
  };

  const suggestions = useSelector(state =>
    state.search.suggestions ? state.search.suggestions : []
  );

  const {
    input,
    inputProps,
    menuItemProps,
    popperProps,
    selectedItem,
    setInput
  } = useAutocomplete({
    fetchSuggestionsFunction: fetchSuggestions,
    onEnterFunction: fetchSelectedArticle,
    suggestions
  });

  const searchForArticles = () => {
    dispatch(
      searchActions.searchRequest({
        query: input,
        focus: true
      })
    );
    dispatch(searchActions.clearAutocomplete());
    setInput("");
  };

  // Adds behavior to the last menu item that we add in this component
  const handleEnter = event => {
    if (event.key === "Enter" && selectedItem === suggestions.length) {
      searchForArticles();
      event.target.blur();
      setInput("");
    } else {
      inputProps.onKeyDown(event);
    }
  };

  function renderSuggestion(suggestionProps) {
    const { suggestion, index } = suggestionProps;
    const selected = selectedItem === index;
    return (
      <MenuItem
        {...menuItemProps}
        key={suggestion.title}
        selected={selected}
        component="div"
        value={suggestion.title}
      >
        {suggestion.title}
      </MenuItem>
    );
  }

  const LastMenuItem = () => {
    return (
      <MenuItem
        key={`searchContainsMenuItem ${input}`}
        selected={selectedItem === suggestions.length}
        component="div"
        onMouseDown={searchForArticles}
        value={input}
      >
        <i>containing... </i>
        &nbsp;
        {` ${input}`}
      </MenuItem>
    );
  };

  const renderMenuItems = () => {
    return (
      <>
        {suggestions.length > 0 &&
          suggestions.map((suggestion, index) =>
            renderSuggestion({
              suggestion,
              index
            })
          )}
        <LastMenuItem />
      </>
    );
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
        onKeyDown={handleEnter}
        margin="none"
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
      <PopperComponent
        placement="bottom-end"
        className={classes.popper}
        {...popperProps}
      >
        <Paper square>{renderMenuItems(suggestions)}</Paper>
      </PopperComponent>
    </div>
  );
}
