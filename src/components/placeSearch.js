import React from "react";

import { Box } from "@mui/system";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import parse from "autosuggest-highlight/parse";
//import GoogleMaps from "../components/placeSearch";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlaceSearch = ({ locationValue, setLocationValue, setAddress }) => {
  const {
    ready,
    value,
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete();
  return (
    <Autocomplete
      disabled={!ready}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      value={locationValue}
      options={data}
      autoComplete
      includeInputInList
      filterSelectedOptions
      onChange={async (e, address) => {
        try {
          const results = await getGeocode({ address: address.description });
          const { lat, lng } = await getLatLng(results[0]);
          console.log(lat, lng);
          setAddress({ address: address.description, lat, long: lng });
        } catch (error) {
          console.log("ERROR: ", error);
        }

        //console.log(address);
        setLocationValue(address);
      }}
      inputValue={value}
      onInputChange={(e, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
export default PlaceSearch;
