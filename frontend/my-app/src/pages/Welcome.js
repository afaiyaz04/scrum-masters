import React from 'react'
import "./Welcome.css"

import { Button } from 'antd'

function Welcome() {
    return (
        <div className='Master-div'>
            <Button href='/auth'>sign-in</Button>
        </div>
    )
}

export default Welcome
