import React, { useState, useEffect } from 'react'

import LodgmentCard from '../../components/lodgment-card/LodgmentCard'
import { Link } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import IconButton from '@mui/material/IconButton'
import SearchBar from './components/search-bar/SearchBar'
import Sidebar from './components/sidebar/Sidebar'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'

import { lodgmentService } from '../../services/lodgmentService'

import './HomePage.css'

function HomePage() {
  const [destination, setDestination] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [numPeople, setNumPeople] = useState('')
  const [selectedRating, setSelectedRating] = useState('0')

  const [page, setPage] = useState(0)
  const [nextPage, setNextPage] = useState(false)

  const [lodgments, setLodgments] = useState([])

  const [error, setError] = useState(null)
  const [filterError, setFilterError] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    !openSnackbar && setDateTo('')
  }, [openSnackbar])

  useEffect(() => {
    fetchLodgments()
  }, [page])

  useEffect(() => {
    setPage(0)
    fetchLodgments()
  }, [selectedRating])

  useEffect(() => {
    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom)
      const toDate = new Date(dateTo)
      if (toDate.getTime() <= fromDate.getTime()) {
        setFilterError('La fecha hasta debe ser mayor que la fecha desde')
        setOpenSnackbar(true)
        return
      }
    }
    setFilterError(null)
    setOpenSnackbar(false)
  }, [dateFrom, dateTo])

  const fetchLodgments = async () => {
    try {
      const params = {
        country: destination,
        from: dateFrom,
        to: dateTo,
        passengers: numPeople,
        min_rate: selectedRating,
        page: page,
      }
      const { data, nextPage } = await lodgmentService.getLodgements(params)

      setLodgments(data)
      setNextPage(nextPage != 'null')
      setError(null)
    } catch (error) {
      setLodgments(null)
      if (error.response.status === 404) {
        setError('No se encontraron lodgments')
      } else {
        setError('Ocurrió un error al buscar los lodgments')
      }
      setOpenSnackbar(true)
    }
  }

  const handleDestinationChange = (event) => {
    setDestination(event.target.value)
  }

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value)
  }

  const handleDateToChange = (event) => {
    setDateTo(event.target.value)
  }

  const handleNumPeopleChange = (event) => {
    setNumPeople(event.target.value)
  }

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value)
  }

  const handleSearchClick = () => {
    setPage(0)
    fetchLodgments()
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    setPage(page - 1)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <div>
      <SearchBar
        destination={destination}
        onDestinationChange={handleDestinationChange}
        dateFrom={dateFrom}
        onDateFromChange={handleDateFromChange}
        dateTo={dateTo}
        onDateToChange={handleDateToChange}
        numPeople={numPeople}
        onNumPeopleChange={handleNumPeopleChange}
        handleSearchClick={handleSearchClick}
      />

      <div className="home-page">
        <Sidebar
          selectedRating={selectedRating}
          onRatingChange={handleRatingChange}
        />

        <div className="content__cards-container">
          {lodgments &&
            lodgments.map((lodgment) => (
              <div className="content__card-container" key={lodgment.id}>
                <Link
                  to={`/detail/${lodgment.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <LodgmentCard
                    lodgment={lodgment}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    key={lodgment.id}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
      {!error && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="home-page__paginator-container"
        >
          <IconButton disabled={page === 0} onClick={handlePrevPage}>
            <ArrowBackIcon />
          </IconButton>

          {page}

          <IconButton disabled={!nextPage} onClick={handleNextPage}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      )}

      {(error || filterError) && (
        <Snackbar
          className="snackbar"
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error && error}
            {filterError && filterError}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default HomePage
