import './Header.css'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'

const Header = ({ title }) => (
  <div data-testid="header">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='primary-color' >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box>
            <nav className='nav-wrapper'>
              <Link className='link' href='/home'>Inicio</Link>
              { sessionStorage.getItem('logged') != null
                ? <Link className='link' href='/profile/reserves'>Perfil</Link>
                : <Link className='link' href='/login'>Ingresar</Link>
              }
            </nav>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

Header.defaultProps = {}

export default Header
