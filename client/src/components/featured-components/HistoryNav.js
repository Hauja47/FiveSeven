import React from 'react'
import NavButton from './NavButton'

export default function HistoryNav() {

    const handleBack = () => {
        window.history.back();
    }

    const handleForward = () => {
        window.history.forward();
    }

    return (
        <div className='HistoryNav'>
            <NavButton property='Back' click={handleBack}/>
            <NavButton property='Forward' click={handleForward}/>
        </div>
    )
}
