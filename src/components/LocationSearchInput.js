import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 20px;
  width: 35vw;
  padding: 20px 25px;
  margin-right: 20px;
  outline: none;
  border: solid lightgrey 1px;
  color: grey;
  font-size: 16px;
`;

const LocationSearchInput = ({
  handleChange,
  handleSelect,
  value,
  onPressEnter,
}) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        const inputProps = getInputProps({
          placeholder: 'Addresses, subways, places...',
          className: 'location-search-input',
        });

        return (
          <div>
            <Input
              {...inputProps}
              onKeyDown={e => {
                if (e.key === 'Enter') onPressEnter();
                return inputProps.onKeyDown(e);
              }}
            />
            <div
              className="autocomplete-dropdown-container"
              style={{ position: 'absolute' }}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
