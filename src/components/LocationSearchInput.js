import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 20px;
  width: 40vw;
  padding: 20px 25px;
  margin-right: 20px;
  outline: none;
  border: solid lightgrey 1px;
  color: grey;
  font-size: 16px;

  @media screen and (max-width: 768px) {
    width: 55vw;
  }
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
                  ? {
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      color: '#ec2f4b',
                      fontFamily: 'muli',
                      fontWeight: 800,
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: '#ff726f',
                      cursor: 'pointer',
                      fontFamily: 'muli',
                      fontWeight: 800,
                    };
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
