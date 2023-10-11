import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


function EpisodeHandler({seasons, season, episode, count}) {
    const [searchParams, setSearchParams] = useSearchParams()
    // let test = seasons[0].episode_count
    const navigate = useNavigate()
    const [activeSeason, setActiveSeason] = useState(season)
    const [episodeCount, setEpisodeCount] = useState(0)
    useEffect(() => {
        let episodeCount = seasons.find(season => season.season_number.toString() === activeSeason).episode_count
        setEpisodeCount(episodeCount)
    }, [activeSeason])
  return (
    <div style={{marginTop: '30px'}}>
        <div style={{display: 'flex', rowGap: '10px', flexWrap: 'wrap'}}>
            <p style={{color: 'white', margin: 'auto 10px auto 0', minWidth: '100px'}}>Seasons: </p>
            {seasons.map((item, index) => (
                <div key={index} style={{width: '36px', height: '36px', display: 'flex', marginRight: '10px', backgroundColor: `${(item.season_number.toString() === activeSeason) ? '#4aa8aa' : '#257172'}`, borderRadius: '5px', cursor: 'pointer'}}
                    onClick={() => {  
                        setActiveSeason(item.season_number.toString())
                    }}
                >
                    <p style={{color: 'white', margin: 'auto', fontWeight: `${(item.season_number.toString() === activeSeason) ? '500' : ''}`}}>{item.season_number.toString()}</p>
                </div>
            ))}
        </div>
        <div style={{display: 'flex', margin: '20px 0', flexWrap: 'wrap', rowGap: '10px'}}>
            <p style={{color: 'white', margin: 'auto 10px auto 0', minWidth: '100px'}}>Episodes: </p>
            {new Array(episodeCount).fill(null).map((u,index) => (
                <div style={{width: '36px', height: '36px', display: 'flex', marginRight: '10px', backgroundColor: `${(Number(episode) === (index+1) && activeSeason.toString() === season) ? '#4aa8aa' : '#257172'}`, borderRadius: '5px', cursor: 'pointer'}}
                    onClick={() => {
                        if (index + 1 !== episode) {
                            setSearchParams({['s']: activeSeason, ['e']: index + 1})
                        }
                    }}
                >
                    <p style={{color: 'white', margin: 'auto', fontWeight: `${(Number(episode) === (index+1) && activeSeason.toString() === season) ? '500' : ''}`}}>{index+1}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EpisodeHandler