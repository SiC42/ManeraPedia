/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";

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
    } else {
      setInput(suggestions[selectedItem].title);
      setInputFocused(false);
      setSelectedItem(null);
    }
  };

  const handleClick = event => {
    onEnterFunction(event.target.getAttribute("value"));
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
    onBlur: () => {
      setInputFocused(false);
    },
    onChange: onInputChange,
    onFocus: () => setInputFocused(true),
    onKeyDown: handleInputKeyPress,
    value: input
  };

  const popperProps = {
    anchorEl,
    open: suggestions.length > 0 && inputFocused
  };

  const menuItemProps = {
    onMouseDown: handleClick
  };

  return {
    anchorEl,
    input,
    inputProps,
    menuItemProps,
    popperProps,
    selectedItem,
    setInput
  };
}
