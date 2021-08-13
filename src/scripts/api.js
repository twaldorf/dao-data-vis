export const getProposalData = async (id) => {
    const url = 
        process.env.NODE_ENV === 'development'
        ? `https://governance.decentraland.org/api/proposals/${id}` 
        : `https://sparkling-silence-d7ff.twaldorf.workers.dev/proxy/?route=proposals/${id}`
    const data = await fetch(url).then(response => response.json()).then(d => d.data)
    return data
}

export const getAllProposals = async (id) => {
    const url = 
        process.env.NODE_ENV === 'development'
        ? `https://governance.decentraland.org/api/proposals` 
        : `https://sparkling-silence-d7ff.twaldorf.workers.dev/proxy/?route=proposals?limit=5`
    const data = await fetch(url).then(response => response.json()).then(d => d.data)
    return data
}

export const proposalVotes = async (id) => {
    const url = 
        process.env.NODE_ENV === 'development'
        ? `https://governance.decentraland.org/api/proposals/${id}/votes` 
        : `https://sparkling-silence-d7ff.twaldorf.workers.dev/proxy/?route=proposals/${id}/votes`
    const data = await fetch(url).then(response => response.json()).then(d => d.data)
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
                        voteDataByProposal.forEach((voteSet, ind, arr) => {
                            const voteIds = Object.keys(voteSet)
                            voteIds.forEach(
                                (voteId) => {
                                    const vote = voteSet[voteId]
                                    votes.push(vote)
                                }
                            )
                        })
                        window.localStorage.setItem('dclVotes', JSON.stringify(votes))
                        window.localStorage.setItem('dclVotesByProposal', JSON.stringify(voteDataByProposal))
                })
        })
    return allVotes
}

export const loadDataFromLocal = () => {
    const votesByProp = JSON.parse(window.localStorage.getItem('dclVotesByProposal'))
    const votes = JSON.parse(window.localStorage.getItem('dclVotes'))
    return { votes, votesByProp }
}
