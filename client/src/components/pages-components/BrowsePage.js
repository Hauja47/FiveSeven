import React, {useState, useEffect} from 'react'

import makeAxiosRequest from '../../utilities/makeAxiosRequest'

import BrowseCard from '../featured-components/BrowseCard'
import PageTitle from '../featured-components/PageTitle'
import getLocale from '../../utilities/locale';

export default function BrowsePage() {
    const [genre, setGenre] = useState([])
    const [language, locale] = getLocale()

    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories?limit=50&country=${locale}&locale=${language}_${locale}`)

        setTimeout(() => {
            makeRequest()
            .then((data) => {
                console.log(data);

                // let myItems = [];
                // data.categories.items.forEach(item => {

                //     const [nameSource, requestName] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${item.id}`)
                    
                //     requestName()
                //         .then(item => {
                //             if (nameSource?.message !== "Request failed with status code 404") {
                //                 myItems.push(item);                
                //                 console.log(myItems);
                //             }   
                //         })
                // })

                // if (myItems.length > 0) {
                //     console.log(myItems);
                //     setGenre(myItems);
                // } else {
                // }
                setGenre(data.categories.items)
            })
            .catch((error) => console.log(error))
        
        }, 1000)
        return () => source.cancel()
    }, [])


    return (
        <div className="page-content">
            <div className='browsePage'>
                <PageTitle name='Browse All' />
                <div className="browseGrid">
                    {genre.map((genre) => {
                        return <BrowseCard key={genre.id} info={genre}/>
                    })}
                </div>
            </div>
        </div>
    )
}
