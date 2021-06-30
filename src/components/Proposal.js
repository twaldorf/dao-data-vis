import React, { useState } from 'react'
import { VotesOrderedByVp, VoteCount, AvgVp, TotalVp, MedianVp, VoteGap } from './Figures.js'
import { Loading } from './Loading.js'
import * as api from '../scripts/api.js'
import { useParams } from 'react-router-dom'
import _JSXStyle from 'styled-jsx';

export const Proposal = (props) => {
    const [ voteVps, setValues ] = useState(false)
    const [ proposal, setProposal ] = useState(false)
    const [ votes, setVotes ] = useState(false)
    const { id } = useParams()
    
    React.useEffect(() => {
        async function fetchAll() {
            const proposal = await api.getProposalData(id)
            setProposal(proposal)
            const votes = await api.proposalVotes(id)
            setValues(votes.map(vote => vote.vp))
            setVotes(votes)
        }
        fetchAll()
    }, [id])

    return (
        <>
            <section className="proposal">
                <h3>{proposal.title}</h3>
                <div className="figure summary">
                    <h4>Summary</h4>
                    <VoteCount values={voteVps}/>
                    <TotalVp values={voteVps}/>
                    <AvgVp values={voteVps}/>
                    <MedianVp values={voteVps}/>
                </div>
                <div className="figure">
                    <h4>Votes ordered by VP</h4>
                    <VotesOrderedByVp values={voteVps} size={400}/>
                </div>
                <div className="figure">
                    <h4>Vote power differences</h4>
                    { votes ? <VoteGap proposal={proposal} votes={votes} /> : <Loading /> }
                </div>
            </section>
            <style jsx>{`
                .summary {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-areas: ""
                }
                .summary > h4 {
                    grid-column-start: 1;
                    grid-column-end: 3;
                }
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
