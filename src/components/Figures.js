import React from 'react'
import * as fig from '../scripts/fig.js'
import { Loading } from './Loading.js'

export const VotesOrderedByVp = (props) => {
    if (props.values) {
        return <BarChartOfValues size={props.size} values={props.values} type={props.type} />
    } else {
        return <p>Loading...</p>
    }
}

export const VotesOrderedByChoicesVp = (props) => {
        return <BarChartOfValues size={props.size} votes={props.votes} type={props.type} choices={props.choices} />
}

export const VpNumber = (props) => {
    return (<>
        <div>
            <li><span className="title">{props.title}</span></li>
            <li><span>{props.figure.toLocaleString()}</span></li>
        </div>
        <style>{`
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
        (values == null ? 'No votes' : <Loading />)
    }</>)
}

export const TotalVp = (props) => {
    return (
        <>{ 
            props.values ? 
            <VpNumber title="Total Vote Power" figure={props.values.reduce((p,c)=>p+c)} /> 
            : 
            (props.values == null ? 'No votes' : <Loading />)
        }</>
    )
}

export const AvgVp = (props) => {
        return (
            <>{
                !props.values ? 
                (props.values == null ? 'No votes' : <Loading />) :
                <VpNumber title="Average Vote Power" 
                figure={ props.values.reduce((p,c)=>p+c)/props.values.length} /> 
            }</>
        )
}

export const MedianVp = (props) => {
    let median = null
    if (props.values && props.values.length > 0) {
        median = props.values[Math.round(props.values.length/2)]
    }
    return (<>{
        !props.values ? (props.values == null ? 'No votes' : <Loading />) :
        <VpNumber title="Median Vote Power" figure={median}/>
    }</>)
}

export const FlippedByQv = (props) => {
    const { votes, proposal } = props
    const rootVotes = votes.map(vote => {
        let vp = Math.round(Math.sqrt(vote.vp))
        let newVote = {...vote, vp: vp}
        return newVote
    })
    const { choices } = proposal.snapshot_proposal

    //TODO Dry this up
    const vpByChoice = choices.map((choice, index) => {
        return rootVotes.filter(v => v.choice === index + 1).reduce((p,c) => {return p + c.vp}, 0)
    })
    const winnerChoiceVp = vpByChoice.reduce((p,c) => {
        return p < c ? c : p
    }, 0)
    const winnerChoice = vpByChoice.findIndex(e => e === winnerChoiceVp)
    const oldVpByChoice = choices.map((choice, index) => {
        return votes.filter(v => v.choice === index + 1).reduce((p,c) => {return p + c.vp}, 0)
    })
    const originalWinnerChoiceVp = oldVpByChoice.reduce((p,c) => {
        return p < c ? c : p
    }, 0)
    const originalWinnerChoice = oldVpByChoice.findIndex(e => e === originalWinnerChoiceVp)

    // Only one option received all votes
    if (vpByChoice.filter(vp => vp === 0).length === vpByChoice.length - 1) {
        return <VpNumber title="Flipped by QV?" figure={"No, unanimous"} />
    }

    return <VpNumber title="Flipped by QV?" figure={winnerChoice === originalWinnerChoice ? "No" : `Yes, QV winner ${choices[winnerChoice]}`} />
}

export const VoteGap = (props) => {
    //TODO refactor to include multi-choice props
    const { proposal, votes } = props
    const { choices } = proposal.snapshot_proposal
    // const type = choices.length > 2 ? 'poll' : 'boolean'
    const choiceVotes = choices.map((choice, index) => {
        const votesFor = votes.filter(vote => vote.choice === index + 1)
        const vpFor = votesFor.reduce((p,c) => {return p + c.vp}, 0)
        return { votesFor, vpFor }
    })
    const difference = Math.abs(choiceVotes[0].vpFor - choiceVotes[1].vpFor)
    return <VpNumber title="Margin of Victory" figure={difference} />
}

export const PercentOfVP = (props) => {
    const cMana = 1.8 * 1000 * 1000 * 1000
    const appxTotalLand = 90 * 1000
    const totalVp = cMana + ( appxTotalLand * 2 * 1000 )
    const percent = Math.trunc( (getTotalVp(props.values) / totalVp * 100) * 10000) / 10000
    return <VpNumber title="Percent of Total VP Voted" figure={`${percent}%`} />
}

export const BarChartOfValues = (props) => {
    const ref = React.useRef()
    // const chart = React.useRef()
    // const width = chart.getBoundingClientRect().width
    
    React.useEffect(() => {
        const ctx = ref.current.getContext('2d')
        const canvas = ref.current
    
        const size = props.size - 32
        const height = 500
    
        canvas.style.width = `${size}px`
        canvas.style.height = `${height}px`
    
        var dpr = window.devicePixelRatio
        canvas.width = Math.floor(size * dpr)
        canvas.height = Math.floor(height * dpr)
    
        ctx.scale(dpr, dpr)

        if (props.type === 'choices') {
            const colorArray = [
                'FF8888',
                '88FF88',
                '8888FF',
                'FFDC00',
                '85144b',
                '0074D9',
            ]
            const colorfulVotes = props.votes.map(vote => {
                const color = colorArray[vote.choice - 1]
                const newVote = {...vote, color: color}
                return newVote
            })
            fig.drawBarChartFromChoiceArray(ctx, colorfulVotes, canvas.width / 2, height)
            fig.drawKey(ctx, props.choices, colorArray, canvas.width / 2, height)
        }
    })

    return (
        <div>
            <canvas ref={ref}></canvas>
        </div>
    )
}

const getTotalVp = (values) => {
    return values.reduce((p,c)=>p+c)
}
