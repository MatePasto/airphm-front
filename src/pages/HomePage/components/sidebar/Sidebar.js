import React, { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import './Sidebar.css'

function Sidebar(props) {
  const { selectedRating, onRatingChange } = props

  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Filtros</h2>
      <hr className="sidebar__divider" />
      <h3 className="sidebar__subtitle">Puntaje</h3>
      <div>
        <FormControlLabel
          value="5"
          control={
            <Checkbox
              checked={selectedRating === '5'}
              onChange={onRatingChange}
              value="5"
              name="5-puntos"
              color="primary"
              size="small"
            />
          }
          label="5 puntos"
          labelPlacement="end"
        />
        <FormControlLabel
          value="4"
          control={
            <Checkbox
              checked={selectedRating === '4'}
              onChange={onRatingChange}
              value="4"
              name="4-o-mas-puntos"
              color="primary"
              size="small"
            />
          }
          label="4 o más puntos"
          labelPlacement="end"
        />
        <FormControlLabel
          value="3"
          control={
            <Checkbox
              checked={selectedRating === '3'}
              onChange={onRatingChange}
              value="3"
              name="3-o-mas-puntos"
              color="primary"
              size="small"
            />
          }
          label="3 o más puntos"
          labelPlacement="end"
        />
        <FormControlLabel
          value="2"
          control={
            <Checkbox
              checked={selectedRating === '2'}
              onChange={onRatingChange}
              value="2"
              name="2-o-mas-puntos"
              color="primary"
              size="small"
            />
          }
          label="2 o más puntos"
          labelPlacement="end"
        />
        <FormControlLabel
          value="1"
          control={
            <Checkbox
              checked={selectedRating === '0'}
              onChange={onRatingChange}
              value="0"
              name="todos"
              color="primary"
              size="small"
            />
          }
          label="Todos"
          labelPlacement="end"
        />
      </div>
    </div>
  )
}

export default Sidebar
