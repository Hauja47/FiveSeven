import React from 'react'
import Icon from '../icons'

export default function NavButton({property, click}) {
    return (
        <button
            onClick={click} 
            className={property === 'Back'? 'navButton no-outline':'navButton mediaNone no-outline'} title={property === 'Back'? 'back' : 'forward'}> 
            <Icon name={property} />
        </button>
    )
}
