import React from 'react'
import * as api from '../scripts/api.js'
import * as fig from '../scripts/fig.js'

export const VotesOrderedByVp = (props) => {
    if (props.values) {
        return <BarChartOfValues size={props.size} values={props.values} />
    } else {
        return <p>Loading...</p>
    }
}

export const AvgVp = (props) => {
    if (props.values) {
        return (<>
            <div>
               <li><span className="title">Average VP per vote</span></li>
               <li><span>{props.values.reduce((p,c)=>p+c)/props.values.length}</span></li>
            </div>
            <style jsx>{`
                .title {
                    font-weight: bold;
                    font-size: .8rem;
                }
                li {
                    list-style: none;
                }
                div {
                    text-align: left;
                }
            `}</style>
        </>)
    } else {
        return <p>Loading...</p>
    }
}

export const BarChartOfValues = (props) => {
    const ref = React.useRef()
    var ctx

    React.useEffect(() => {
        ctx = ref.current.getContext('2d')
        const canvas = ref.current
    
        const size = props.size
    
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
    
        var dpr = window.devicePixelRatio
        canvas.width = Math.floor(size * dpr)
        canvas.height = Math.floor(size * dpr)
    
        ctx.scale(dpr, dpr)
    
        // api.refreshData()
    
        fig.drawBarChartFromNumArray(ctx, props.values, 500, size, 'black')
    })

    return (
        <div>
            <canvas ref={ref}></canvas>
        </div>
    )
}
