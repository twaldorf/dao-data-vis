import { ProposalInList } from './ProposalInList.js'
import { useState, useEffect } from 'react'
import { getAllProposals } from '../scripts/api.js'
import { Loading } from './Loading.js'

export const ProposalList = (props) => {
    const [ proposals, setProposals ] = useState(false)

    useEffect(() => {
        async function getProposals() {
            const allProposals = await getAllProposals()
            setProposals(allProposals)
        }
        getProposals()
    }, [])

    return (
        <ul>
            {proposals ?
            proposals.map((proposal, index) => {
            return <ProposalInList proposal={ proposal } key={ index } />})
            : <Loading />
            }
        </ul>
    )
}
