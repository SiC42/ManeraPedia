import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { searchOperations } from "ducks/search/";
import useAutocomplete from "hooks/useAutocomplete";
import React from "react";
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

export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const suggestions = useSelector(state =>
    state.search.suggestions ? state.search.suggestions : []
  );

  const fetchSuggestions = event => {
    dispatch(searchOperations.autocompleteRequest(event.target.value));
  };

  const fetchSelectedArticle = (title, tryExact) => {
    dispatch(
      searchOperations.getArticleRequest({ title, tryExact, focus: true })
    );
  };

  const { input, inputProps, Popper, selectedItem } = useAutocomplete({
    suggestions,
    onEnterFunction: fetchSelectedArticle,
    fetchSuggestionsFunction: fetchSuggestions
  });

  const renderInput = () => {
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
          margin="none"
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
        <Popper placement="bottom-end" className={classes.popper}>
          <MenuItem
            key="searchContainsMenuItem"
            selected={selectedItem === suggestions.length}
            component="div"
          >
            <i>containing... </i>
            &nbsp;
            {` ${input}`}
          </MenuItem>
        </Popper>
      </div>
    );
  };

  return renderInput();
}
