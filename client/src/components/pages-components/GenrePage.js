import React from 'react'
import {useEffect, useState, useContext} from 'react'
import makeAxiosRequest from '../../utilities/makeAxiosRequest'

import PageTitle from '../featured-components/PageTitle'
import PlayCard from '../featured-components/PlayCard'

import useId from '../../utilities/hooks/useId'
import useInfiScroll from '../../utilities/hooks/useInfiScroll'
import {MessageContext} from '../../utilities/context'
import { useParams } from 'react-router-dom';

export default function GenrePage() {
    // const id = useId()
    const {id} = useParams()
    // console.log(id);    
    const setMessage = useContext(MessageContext)

    const [playLists, setPlayLists] = useState([])
    const [name, setName] = useState('')

    const [setNext, lastRef] = useInfiScroll(setPlayLists)

    useEffect(() => {
        const [nameSource, requestName] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}`)
        const [listSource, requestList] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`)

        const makeRequest = async () => {
            try{
                const [nameData, listData] = await Promise.all([requestName(), requestList()])
                
                console.log(nameData);
                console.log(listData);
                setName(nameData.name)
                setPlayLists(listData.playlists?.items)
                setNext(listData.playlists?.next)
            }catch(error){
                setMessage(error)
            }
        }

        if(id){
            makeRequest()
        }
        
        return () => {
            nameSource.cancel()
            listSource.cancel()
        }
    // eslint-disable-next-line
    }, [id])

    return (
        <div className='GenrePage page-content'>
            <PageTitle name={name}/>
            <div className="browseGrid">
                {playLists?.map(playlist => (
                    <PlayCard ref={lastRef} key={playlist.id} info={playlist} type="playlist"/>
                ))}
            </div>
        </div>
    )
}
