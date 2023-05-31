import React, {useState, useEffect, useRef} from 'react'
import "./Nav.scss"
import { FiSearch } from 'react-icons/fi'
import { HiFilm } from 'react-icons/hi'
import { TbMovie } from 'react-icons/tb'
import { useNavigate, useMatch, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

let navList = ['Home', 'TV shows', 'Movies']

function Nav() {
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocation()
  const active = location.pathname === '/' ? 'Home' : (location.pathname.includes('tvshows') || location.pathname.includes('tvshow') || location.pathname.includes('tv') ? 'TV shows' : 'Movies')
  const inputRef = useRef(null)
  const [search, setSearch] = useState('')
  const matchMoviePlay = useMatch('movie/:id/watch')
  const matchMoviesGenre = useMatch('/genres')
  const navigate = useNavigate()
  const  [show, handleShow] = useState(false)
  const handleSearch = () => {
    navigate(`/list?search=${search}`)
  }
  const handleNavigate = (item) => {
    switch (item) {
      case 'TV shows':
        navigate('/tvshows')
        break;
      case 'Home':
        navigate('/')
        break;
      case 'Movies':
        navigate('/movies')
        break;
      default: 
        break;
    }
  }
  useEffect(() => {
    showSearch && inputRef.current.focus()
  }, [showSearch])
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 72){
        handleShow(true)
      } else handleShow(false);
    })
    return () => {
      window.removeEventListener("scroll")
    }
  }, [])
  const handleShowSearch = () => {
    setShowSearch(prev => !prev)
    
  }
  return (
    <div className={`nav ${(show || matchMoviePlay || matchMoviesGenre ) && "nav__blur"}`}>
      <div style={{flex: '1', display: 'flex'}}>
        <img
          onClick={() => navigate('/')}
          className="nav__logo" src="/movie-icon.png" alt="Netflix_logo" />
        <h2 
          onClick={() => navigate('/')}
          className='nav__appname'>MOVIEWORLD</h2>
      </div>
      <div style={{display: 'flex',justifyContent: 'space-around', margin: 'auto', width: '25%'}}>
        {navList.map((item) => <h3 className={`nav__item ${item===active && 'nav__item-active'}`} onClick={() => handleNavigate(item)}>{item}</h3>)}
      </div>
      <div style={{display: 'flex', flexDirection: 'row-reverse', height: '48px', margin:'auto 0', flex: '1'}}>
        <img
          className="nav__avatar" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png" alt="Netflix_avatar" />
        <div className='nav__search'>
          {showSearch && 
            <div style={{display: 'flex', padding: '7px'}}>
              <input value={search} 
                ref={inputRef}
                onChange={(e) => setSearch(e.target.value)}
                className='nav__search-input' placeholder='Search here ...' />
              <button 
                onClick={handleSearch}
                className='nav_search-button'>Search</button>  
            </div>
          }
          <img
            onClick={handleShowSearch}
            className={`nav__search-icon ${showSearch && 'nav__search-icon-focus'}`}
            src='/searchbutton.png' alt='search'/>
        </div>
      </div>
    </div>
  )
}

export default Nav
