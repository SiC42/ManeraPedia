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
      if (input !== "") {
        if (selectedItem === null) {
          setSelectedItem(0);
        } else if (selectedItem + 1 > suggestions.length) {
          setSelectedItem(null);
        } else {
          setSelectedItem(selectedItem + 1);
        }
      }
    } else if (direction === "ArrowUp") {
      if (input !== "") {
        if (selectedItem === null) {
          setSelectedItem(suggestions.length);
        } else if (selectedItem - 1 < 0) {
          setSelectedItem(null);
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
    open: inputFocused && input !== ""
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
