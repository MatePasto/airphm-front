import React, { useState } from 'react'

import Button from '@mui/material/Button'
import DateRangeIcon from '@mui/icons-material/DateRange'
import GroupIcon from '@mui/icons-material/Group'
import InputAdornment from '@mui/material/InputAdornment'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

import './SearchBar.css'

function SearchBar(props) {
  return (
    <div className="searchbar">
      <div className="searchbar__input-container">
        <TextField
          className="searchbar__input"
          variant="outlined"
          placeholder="Destino"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          value={props.destination}
          onChange={props.onDestinationChange}
        />
      </div>

      <div className="searchbar__input-container">
        <TextField
          className="searchbar__input"
          variant="outlined"
          type="date"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
          value={props.dateFrom}
          onChange={props.onDateFromChange}
        />
      </div>

      <div className="searchbar__input-container">
        <TextField
          className="searchbar__input"
          variant="outlined"
          placeholder="From"
          type="date"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
          value={props.dateTo}
          onChange={props.onDateToChange}
        />
      </div>

      <div className="searchbar__input-container">
        <TextField
          className="searchbar__input"
          variant="outlined"
          placeholder="Pasajeros"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <GroupIcon />
              </InputAdornment>
            ),
          }}
          value={props.numPeople}
          onChange={props.onNumPeopleChange}
        />
      </div>

      <div className="searchbar__button-container">
        <Button
          style={{ borderRadius: 50, backgroundColor: '#f8375c' }}
          className="searchbar__button"
          variant="contained"
          onClick={props.handleSearchClick}
        >
          <SearchIcon />
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
