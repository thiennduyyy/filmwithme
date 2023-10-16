import React, {useState, useEffect, useRef, useCallback, useContext} from 'react'
import "./Nav.scss"
import { FiSearch } from 'react-icons/fi'
import { HiFilm } from 'react-icons/hi'
import { TbMovie } from 'react-icons/tb'
import { useNavigate, useMatch, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { GenresContext } from '../GenresContext';

let navList = ['Home', 'TV shows', 'Movies']

function Nav() {
  const [showSearch, setShowSearch] = useState(false)
  const { tab, setTab } = useContext(GenresContext)
  const location = useLocation()
  console.log(location.pathname)
  // const active = location.pathname === '/' ? 'Home' : (location.pathname.includes('tvshows') || location.pathname.includes('tvshow') || location.pathname.includes('tv') ? 'TV shows' : 'Movies')
  const inputRef = useRef(null)
  const [search, setSearch] = useState('')
  const matchMoviePlay = useMatch('movie/:id/watch')
  const matchMoviesGenre = useMatch('/genres')
  const navigate = useNavigate()
  const  [show, handleShow] = useState(false)
  const handleTab = (item) => {
    if (location.pathname !== '/') {
      setTab(item)
      navigate('/')
    } else {
      setTab(item)
    }
  }
  const handleSearch = () => {
    setTab('Movies')
    navigate(`/list?search=${search}`)
  }
  const searchByEnter = (e) => {
    if(e.keyCode === 13 && document.activeElement === inputRef.current){
      handleSearch()
    }
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
  useEffect(() => {
    window.addEventListener("keydown", searchByEnter)
    return () => window.removeEventListener('keydown', searchByEnter)
  }, [search])
  const handleShowSearch = () => {
    setShowSearch(prev => {
      return !prev
    })
    
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
      <div style={{display: 'flex',justifyContent: 'space-around', margin: 'auto', width: '25%', height: '100%'}}>
        {navList.map((item) => 
          <div className={`nav__item ${(item === tab && ['/', '/list', '/genres/movie'].includes(location.pathname)) && 'nav__item-active'}`} onClick={() => handleTab(item)}>
            <h2 className='nav__item-text'>{item}</h2>
          </div>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'row-reverse', height: '48px', margin:'auto 0', flex: '1'}}>
        <img
          className="nav__avatar" src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp" alt="Netflix_avatar" />
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
