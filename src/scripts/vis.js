const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d');

const size = 800

canvas.style.width = `${size}px`
canvas.style.height = `${size}px`
canvas.style.border = '1px solid black'

var dpr = window.devicePixelRatio
canvas.width = Math.floor(size * dpr)
canvas.height = Math.floor(size * dpr)

ctx.scale(dpr, dpr)

// api.refreshData()

const { votesByProp, votes } = api.loadData()
fig.drawBarChartFromNumArray(ctx, voteVps, 500, size, 'black')

const voteVps = votes.map(vote => vote.vp)

console.log(votesByProp, votes)

///wip
const voteGaps = votesByProp.map((prop) => {
    const voteIds = Object.keys(prop)
})

const votesAvg = (votesArray) => {
    const total = votesArray.reduce((p,c) => {return p + c.vp}, 0)
    return total/votesArray.length
}

// const mostActiveAddress = votes.reduce()

const totalVP = votes.reduce((prev,curr,index) => {
    return prev + curr.vp
}, 0)

const totalVotes = votes.length
const avgVpVote = totalVP/totalVotes

const sortedVotes = votes.sort((a,b) => a.vp - b.vp)
const medianVpVote = sortedVotes[Math.round(votes.length/2)].vp

const q1 = sortedVotes.slice(0,votes.length/4)
const q1Avg = votesAvg(q1)

const q3 = sortedVotes.slice(votes.length/4, 3*votes.length/4)
const q3Avg = votesAvg(q3)

const iqr = q3Avg - q1Avg

console.log(`Total votes: ${totalVotes}, total vp: ${totalVP}, avg: ${avgVpVote}, median: ${medianVpVote}, iqr: ${iqr}, `)
