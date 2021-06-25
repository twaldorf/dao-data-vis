import React from 'react'
import * as api from '../scripts/api.js'
import * as fig from '../scripts/fig.js'

export const Figure = (props) => {
    const ref = React.useRef()
    var ctx

    React.useEffect(() => {
        ctx = ref.current.getContext('2d')
        const canvas = ref.current
    
        const size = props.size
    
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
        canvas.style.border = '1px solid black'
    
        var dpr = window.devicePixelRatio
        canvas.width = Math.floor(size * dpr)
        canvas.height = Math.floor(size * dpr)
    
        ctx.scale(dpr, dpr)
    
        // api.refreshData()
    
        const { votesByProp, votes } = api.loadData()
        const voteVps = votes.map(vote => vote.vp)
    
        fig.drawBarChartFromNumArray(ctx, voteVps, 500, size, 'black')
    })


    return (
        <div>
            <canvas ref={ref}></canvas>
        </div>
    )
}
