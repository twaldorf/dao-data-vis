import React from 'react'
import * as fig from '../scripts/fig.js'
import { Loading } from './Loading.js'
import _JSXStyle from 'styled-jsx';

export const VotesOrderedByVp = (props) => {
    if (props.values) {
        return <BarChartOfValues size={props.size} values={props.values} />
    } else {
        return <p>Loading...</p>
    }
}

export const VpNumber = (props) => {
    return (<>
        <div>
            <li><span className="title">{props.title}</span></li>
            <li><span>{props.figure}</span></li>
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
}

export const VoteCount = (props) => {
    const { values } = props
    return (<>{
        values ? 
        <VpNumber title="Total Votes" figure={values.length} />
        :
        <Loading />
    }</>)
}

export const TotalVp = (props) => {
    return (
        <>{ 
            props.values ? 
            <VpNumber title="Total Vote Power" figure={props.values.reduce((p,c)=>p+c)} /> 
            : 
            <Loading />
        }</>
    )
}

export const AvgVp = (props) => {
        return (
            <>{
                props.values ? 
                <VpNumber title="Average Vote Power" 
                figure={ props.values.reduce((p,c)=>p+c)/props.values.length} /> :
                <Loading />
            }</>
        )
}

export const MedianVp = (props) => {
    const median = props.values[Math.round(props.values.length/2)]
    return (<>{
        props.values ? 
        <VpNumber title="Median Vote Power" figure={median}/>
        :
        <Loading />
    }</>)
}

export const VoteGap = (props) => {
    const { proposal, votes } = props
    const { choices } = proposal.snapshot_proposal
    // const type = choices.length > 2 ? 'poll' : 'boolean'
    const choiceVotes = choices.map((choice, index) => {
        const votesFor = votes.filter(vote => vote.choice === index + 1)
        const vpFor = votesFor.reduce((p,c) => {return p + c.vp}, 0)
        return { votesFor, vpFor }
    })
    const difference = Math.abs(choiceVotes[0].vpFor - choiceVotes[1].vpFor)
    console.log(choiceVotes)
    return (<VpNumber title="VP Gap" figure={difference} />)
}

export const BarChartOfValues = (props) => {
    const ref = React.useRef()
    
    React.useEffect(() => {
        const ctx = ref.current.getContext('2d')
        const canvas = ref.current
    
        const size = props.size
    
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
    
        var dpr = window.devicePixelRatio
        canvas.width = Math.floor(size * dpr)
        canvas.height = Math.floor(size * dpr)
    
        ctx.scale(dpr, dpr)

        fig.drawBarChartFromNumArray(ctx, props.values, 500, size, 'black')
    })

    return (
        <div>
            <canvas ref={ref}></canvas>
        </div>
    )
}
