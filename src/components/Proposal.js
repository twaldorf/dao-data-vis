import React, { useState } from 'react'
import { BarChartOfValues, VotesOrderedByVp, AvgVp } from './Figures.js'
import * as api from '../scripts/api.js'
import * as fig from '../scripts/fig.js'

export const Proposal = (props) => {
    const [ voteVps, setValues ] = useState(false)
    const [ proposal, setProposal ] = useState(false)

    React.useEffect(async () => {
        const proposal = await api.getProposalData(props.id)
        setProposal(proposal)
        const votes = await api.proposalVotes(props.id)
        setValues(votes.map(vote => vote.vp))
    }, [])

    return (
        <>
            <section className="proposal">
                <h3>{proposal.title}</h3>
                <div className="figure">
                    <h4>Summary</h4>
                    <AvgVp values={voteVps}/>
                    <AvgVp values={voteVps}/>
                    <AvgVp values={voteVps}/>
                </div>
                <div className="figure">
                    <h4>Votes ordered by VP</h4>
                    <VotesOrderedByVp values={voteVps} size={400}/>
                </div>
            </section>
            <style jsx>{`
                .proposal {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    padding: 2rem;
                }
                .figure {
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 1rem;
                    grid-row-start: 2; 
                }
                h3 {
                    grid-column-start:1;
                    grid-column-end: 3;
                }
            `}
            </style>
        </>
    )
}
