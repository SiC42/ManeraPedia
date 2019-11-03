/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Popper as PopperComponent } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function useAutocomplete(props) {
  const { suggestions, onEnterFunction, fetchSuggestionsFunction } = props;
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [input, setInput] = useState("");

  const onInputChange = e => {
    setInput(e.target.value);
    fetchSuggestionsFunction(e);
  };

  const handleArrowKeyPress = direction => {
    if (direction === "ArrowDown") {
      if (suggestions.length > 0) {
        if (selectedItem === null || selectedItem + 1 > suggestions.length) {
          setSelectedItem(0);
        } else {
          setSelectedItem(selectedItem + 1);
        }
      }
    } else if (direction === "ArrowUp") {
      if (suggestions.length > 0) {
        if (selectedItem === null || selectedItem - 1 < 0) {
          setSelectedItem(suggestions.length);
        } else {
          setSelectedItem(selectedItem - 1);
        }
      }
    }
  };

  const handleEnter = event => {
    if (selectedItem === null) {
      onEnterFunction(input);
      event.target.blur();
      setInput("");
    } else if (selectedItem === suggestions.length) {
      // we selected the last menu item (no actual article)
      // TODO: immediately search instead trying to fetch first
    } else {
      setInput(suggestions[selectedItem].title);
      setInputFocused(false);
      setSelectedItem(null);
    }
  };

  const handleInputKeyPress = event => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        handleEnter(event);
        break;
      case "ArrowDown":
        event.preventDefault();
        handleArrowKeyPress("ArrowDown");
        break;
      case "ArrowUp":
        event.preventDefault();
        handleArrowKeyPress("ArrowUp");
        break;
      default:
        break;
    }
  };

  const inputRef = node => {
    setAnchorEl(node);
  };

  const inputProps = {
    inputRef,
    onBlur: () => setInputFocused(false),
    onChange: onInputChange,
    onFocus: () => setInputFocused(true),
    onKeyDown: handleInputKeyPress,
    value: input
  };

  function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps } = suggestionProps;
    const selected = selectedItem === index;
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.title}
        selected={selected}
        component="div"
      >
        {suggestion.title}
      </MenuItem>
    );
  }
  const renderMenuItems = () => {
    return (
      <>
        {suggestions.map((suggestion, index) =>
          renderSuggestion({
            suggestion,
            index,
            selectedItem
          })
        )}
      </>
    );
  };

  const Popper = popperProps => {
    const { children, ...popperElementProps } = popperProps;
    return (
      <PopperComponent
        {...popperElementProps}
        anchorEl={anchorEl}
        open={suggestions.length > 0 && inputFocused}
      >
        <Paper square>
          {renderMenuItems(suggestions)}
          {children}
        </Paper>
      </PopperComponent>
    );
  };

  return {
    input,
    inputProps,
    Popper,
    selectedItem
  };
}
