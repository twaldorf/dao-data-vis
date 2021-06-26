const id = 'fc6f60a0-bdb5-11eb-8849-33c326fb5301'

export const getProposalData = async (id) => {
    const data = await fetch(`https://governance.decentraland.org/api/proposals/${id}`).then(response => response.json()).then(d => d.data)
    return data
}

export const proposalVotes = async (id) => {
    const data = await fetch(`https://governance.decentraland.org/api/proposals/${id}/votes`).then(response => response.json()).then(d => d.data)
    const voteIds = Object.keys(data)
    const votes = voteIds.map((id) => {
        return data[id]
    })
    return votes
}

export const refreshData = async () => {
    const proposals = await fetch('https://governance.decentraland.org/api/proposals')
    .then(response => response.json()).then(proposals => proposals.data)
    
    console.log(proposals)
    
    const allVotes = await Promise.all(
        proposals.map((proposal) => {
            return fetch(`https://governance.decentraland.org/api/proposals/${proposal.id}/votes`)
        }))
        .then(
            (responses) => {
                Promise.all(responses.map(response => response.json()))
                .then(
                    (votesByProposal) => {
                        const voteDataByProposal = votesByProposal.map(proposal => proposal.data)
                        let votes = [];
                        voteDataByProposal.map((voteSet, ind, arr) => {
                            const voteIds = Object.keys(voteSet)
                            voteIds.forEach(
                                (voteId) => {
                                    const vote = voteSet[voteId]
                                    votes.push(vote)
                                }
                            )
                        })
                        console.log(votes.length)
                        window.localStorage.setItem('dclVotes', JSON.stringify(votes))
                        window.localStorage.setItem('dclVotesByProposal', JSON.stringify(voteDataByProposal))
                })
        })
}

export const loadDataFromLocal = () => {
    const votesByProp = JSON.parse(window.localStorage.getItem('dclVotesByProposal'))
    const votes = JSON.parse(window.localStorage.getItem('dclVotes'))
    return { votes, votesByProp }
}
