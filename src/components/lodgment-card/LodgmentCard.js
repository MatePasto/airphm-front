import React from 'react'

import { Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import './LodgmentCard.css'

function LodgmentCard({ lodgment, dateFrom, dateTo }) {
  return (
    <div className="card">
      <img
        src={lodgment?.imageUrl}
        alt={lodgment?.name}
        className="card__img"
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p className="card__title cut-text">{lodgment?.name}</p>
        {lodgment.rateCount > 0 && (
          <Box
            className="card__rating-stars-container"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <StarIcon fontSize="inherit" />{' '}
            <p className="bold-text">{lodgment.rateAverage}</p>
            <p>({lodgment.rateCount})</p>
          </Box>
        )}
      </Box>
      <p className="light-text cut-text">{lodgment.description}</p>
      <div>
        <p className="bold-text card__ubication">Ubicación:</p>
        <p className="some-left-padding card__ubication">
          {lodgment.country}, {lodgment.address}
        </p>
      </div>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="card__costs bold-text">
          <p>Costo por noche</p>
          <p className="some-left-padding medium-text">${lodgment.baseCost}</p>
        </div>
        {lodgment.totalCostWithDates(dateFrom, dateTo) && (
          <div className="card__costs bold-text">
            <p>Costo total</p>
            <p className="some-left-padding medium-text">
              ${lodgment.totalCostWithDates(dateFrom, dateTo)}
            </p>
          </div>
        )}
      </Box>
    </div>
  )
}

export default LodgmentCard
