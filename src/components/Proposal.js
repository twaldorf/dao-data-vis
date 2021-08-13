import React, { useState } from 'react'
import { VotesOrderedByVp, VotesOrderedByChoicesVp, VoteCount, AvgVp, TotalVp, MedianVp, VoteGap, PercentOfVP, FlippedByQv } from './Figures.js'
import { Loading } from './Loading.js'
import * as api from '../scripts/api.js'
import { useParams } from 'react-router-dom'

export const Proposal = (props) => {
    const [ voteVps, setValues ] = useState(false)
    const [ proposal, setProposal ] = useState(false)
    const [ votes, setVotes ] = useState(false)
    const { id } = useParams()
    
    React.useEffect(() => {
        async function fetchAll() {
            const proposal = await api.getProposalData(id)
            setProposal(proposal)
            const voteData = await api.proposalVotes(id)
            if (voteData.length > 0) {
                const votes = voteData
                setValues(votes.map(vote => vote.vp))
            } else {
                const votes = null
                setValues(votes)
            }
            setVotes(voteData)
        }
        fetchAll()
    }, [id])

    return (
        <>
            <section className="title">
                <h2>{proposal.title}</h2>
                <span className="type">{proposal.type}, {proposal.status} </span>
            </section>
            <section className="proposal">
                { votes ? 
                <>
                    <div className="figure summary">
                        <h4>Summary</h4>
                        <VoteCount values={voteVps}/>
                        <TotalVp values={voteVps}/>
                        <AvgVp values={voteVps}/>
                        <MedianVp values={voteVps}/>
                    </div>
                    <div className="figure summary">
                        <h4>Vote power details</h4>
                        <VoteGap proposal={proposal} votes={votes} />
                        <PercentOfVP proposal={proposal} values={voteVps} />
                        <FlippedByQv proposal={proposal} votes={votes} />
                    </div> 
                    <div className="figure">
                        <h4>Votes ordered by VP</h4>
                        <VotesOrderedByVp values={voteVps} size={400} type="simple"/>
                    </div>
                    <div className="figure">
                        <h4>Votes ordered by VP</h4>
                        <VotesOrderedByChoicesVp votes={votes} size={400} type="choices"/>
                    </div>
                </> : <Loading /> }
            </section>
            <style>{`
                .summary {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-areas: "";
                }
                .summary > h4 {
                    grid-column-start: 1;
                    grid-column-end: 3;
                }
                .proposal {
                    margin-top: 1rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                @media screen and (max-width: 800px) {
                    .proposal {
                        grid-template-columns:
                    }
                }
                .figure {
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 1rem;
                    grid-auto-rows: min-content;
                    grid-auto-columns: min-content;
                    gap: 1rem;
                    height: min-content;
                }
                h3 {
                    grid-column-start:1;
                    grid-column-end: 3;
                }
                h4 {
                    margin: .35rem 0;
                    padding: 0 0 .1rem 0;
                    border-bottom: 1px solid #dddddd;
                }
            `}
            </style>
        </>
    )
}
