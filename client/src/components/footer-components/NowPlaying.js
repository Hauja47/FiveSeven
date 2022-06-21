import React, {useContext, useEffect, useState, memo} from 'react'
import Icon from '../icons'

import { MessageContext } from '../../utilities/context';
import axios from 'axios';
import makeAxiosRequest from '../../utilities/makeAxiosRequest';
import Popup from 'reactjs-popup';
import putWithToken from '../../utilities/putWithToken';
import {TokenContext} from '../../utilities/context'
import removeVietnameseTones from '../../utilities/removeVietnameseTones'

function NowPlaying({playInfo}) {
    const setMessage = useContext(MessageContext)
    const {album, artists, name, id} = playInfo
    const [recommen, setRecommen] = useState();
    const [lyric, setLyric] = useState("");
    const [like, setLike] = useState(false);

    let imageUrl
    if (album.images && album.images.length !== 0){
        imageUrl = album.images[album.images.length - 1].url
    }

    if (name && artists.length > 0) {
        // console.log(name);
        // console.log(artists[0]?.name);
        axios.get('http://localhost:4000/lyrics', {

            track: name,
            artist: artists[0]?.name,
        }).then(res => {
            console.log(res.data.lyrics);
        })  
             
    }
    

    useEffect(() => {
        // console.log(playInfo);
        if (playInfo.id) {
            const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=10`)
            makeRequest()
                .then((data) => {
                    console.log(data.tracks);
                    setRecommen(data.tracks)
                    // setCollections(data.categories.items)
                })
                .catch((error) => setMessage(`ERROR: ${error}`))
            
            return () => source.cancel()
        }
    // eslint-disable-next-line
    }, [playInfo])

    useEffect(() => {
        if (playInfo.id) {
            console.log(removeVietnameseTones(artists[0]?.name));
            console.log(removeVietnameseTones(name?.split(/(-|\()+/)[0]));

            const lowerCaseArtist = removeVietnameseTones(artists[0]?.name);
            const lowerCaseSong = removeVietnameseTones(name?.split('(')[0]);
            const [source, makeRequest] = makeAxiosRequest(`https://api.lyrics.ovh/v1/${lowerCaseArtist}/${lowerCaseSong}`)
            makeRequest()
                .then((data) => {
                    console.log(data.lyrics);
                    // const lyrics = data.lyrics.replace(/(\r\n|\n\r|\r\r|\r|\n)/g,'<br>');
                    setLyric(data.lyrics);

                    // setCollections(data.categories.items)
                })
                .catch((error) => {
                    setLyric('Not lyrics found')
                    // setMessage(`ERROR: ${error}`)
                })
            
            return () => source.cancel()
            
            // axios.get(`https://api.lyrics.ovh/v1/${lowerCaseArtist}/${lowerCaseSong}`)
            //     .then(res => {
            //     console.log(res.data.lyrics);
            //     setLyric(res.data.lyrics);
            // }).catch (e => {
            //     console.log('Not lyrics found');
            //     setLyric('Not lyrics found');
            // })
        }
    }, [playInfo])

    // Thêm bài hát yêu thích
    const token = useContext(TokenContext)
    const source = axios.CancelToken.source()

    const followTrack = () => {
        const data = { ids: [id] }
        const followReq = putWithToken(`https://api.spotify.com/v1/me/tracks`, token, source, data, like?'DELETE':'PUT')
        followReq()
            .then(response => {
                if (response.status === 200){
                    if(like){
                        setMessage('Removed from your Liked Songs')
                    }else{
                        setMessage('Added to your Liked Songs')
                    }
                    setLike(!like)
                    // setTimeout(() => refreshPlaylist(), 1000)
                }else{
                    // setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    // const searchLyrics = () => {
    //     if (artists === "" || name === "") {
    //         return;
    //     }
    //     console.log(removeVietnameseTones(artists[0]?.name));
    //     console.log(removeVietnameseTones(name?.split('(')[0]));

    //     const lowerCaseArtist = removeVietnameseTones(artists[0]?.name);
    //     const lowerCaseSong = removeVietnameseTones(name?.split('(')[0]);
    //     axios.get(`https://api.lyrics.ovh/v1/${lowerCaseArtist}/${lowerCaseSong}`)
    //         .then(res => {
    //         console.log(res.data.lyrics);
    //         setLyric(res.data.lyrics);
    //     }).catch (e => {
    //         console.log('Not lyrics found');
    //         setLyric('Not lyrics found');
    //     })
    // }

    return (

        <div className="now-playing">

            <div className="player-cover">
                {imageUrl ? 
                    <img draggable="false" loading="eager" src={imageUrl} alt=""></img>
                    :
                    <div>
                        <Icon name='Music2'/>
                    </div>
                }
            </div>

            <div className="player-info" style={{display: name === ''? 'none':null}}>

                <div className="player-info-track ellipsis-one-line">
                    <a href={`/album/${album.uri?.split(':')[2]}?highlight=${id}`}>{name}</a>
                </div>

                <div className="player-info-artist ellipsis-one-line">
                    {artists.map((artist, index) => {  
                        return <a href={`/artist/${artist.uri?.split(':')[2]}`} key={index}>{artist.name}</a>
                    })} 
                </div>

            </div>

            <div className="player-like" style={{display: name === ''? 'none':null}}>
                {/* <button title='Save to your Liked Songs' className="player-like-button no-outline" onClick={() => setMessage('This feature is not available :)')}> */}
                <button title='Save to your Liked Songs' className="player-like-button no-outline" onClick={followTrack}>
                    <Icon name='Heart' />
                </button>
            </div>

            <div className="recommen" style={{display: name === ''? 'none':null}}>
                <Popup trigger={<button title='Recommendation' className="player-like-button no-outline" >
                    <Icon name='Library' />
                </button>} position="right center">
                <div className="recommen-detail">
                {
                    recommen && 
                        recommen.map((track, index) => {

                            const {album, artists, name, id} = track;
                            if (album.images && album.images.length !== 0){
                                imageUrl = album.images[album.images.length - 1].url
                            }
                            return (

                                <div className="recommen-track" key={index}>
                                    <div className="player-cover">
                                        {imageUrl ? 
                                            <img draggable="false" loading="eager" src={imageUrl} alt=""></img>
                                            :
                                            <div>
                                                <Icon name='Music2'/>
                                            </div>
                                        }
                                    </div>

                                    <div className="player-info" style={{display: name === ''? 'none':null}}>

                                        <div className="player-info-track ellipsis-one-line">
                                            <a href={`/album/${album.uri?.split(':')[2]}?highlight=${id}`}>{name}</a>
                                        </div>

                                        <div className="player-info-artist ellipsis-one-line">
                                            {artists.map((artist, index) => {  
                                                return <a href={`/artist/${artist.uri?.split(':')[2]}`} key={index}>{artist.name}</a>
                                            })} 
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                        )
 
                }
                </div>
                </Popup>
            </div>
        
            <div className="lyrics" style={{display: name === ''? 'none':null}}>
                
                <Popup trigger={<button title='Lyrics' className="player-like-button lyrics-btn no-outline">
                    <Icon name='Lyrics' />
                </button>} position="right center">
                <div className="lyrics-detail">
                {
                    lyric && (<>
                        <div class="lyric-title">
                            <div class="lyric-info">Playing: {name}</div>                    
                            <div class="lyric-info">{artists[0].name}</div>  
                        </div>
                        <div class="lyric-content" dangerouslySetInnerHTML={{ __html: lyric }} />               
                    </>)
                }
                </div>
                </Popup>
            </div>
        </div>
    )
}

export default memo(NowPlaying);