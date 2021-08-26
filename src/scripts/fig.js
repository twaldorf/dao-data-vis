export const drawBarChartFromNumArray = (ctx, data, width, height, colorStr) => {
    ctx.fillStyle = colorStr
    let max = data.sort((a, b) => b - a)[0]
    data.forEach((datum, index, arr) => {
        ctx.fillRect(
            index * width / arr.length,
            height,

            width / (2.5 * arr.length),
            -datum / max*500)
        // if (index == arr.length - 1) {
        //     ctx.fillText(vote.vp, index * canvas.width / (2 * arr.length) - 100, canvas.height - 510)
        // }
    })
}

export const drawBarChartFromChoiceArray = (ctx, data, width, height) => {
    let max = data.sort((a, b) => b.vp - a.vp)[0].vp
    data.forEach((datum, index, arr) => {
        ctx.fillStyle = `#${datum.color}`
        let x = index * width / arr.length
        let y = height
        let barY = -datum.vp / max * 500
        ctx.fillRect(
            index * width / arr.length,
            height - 85,
            
            width / (2.5 * arr.length),
            (-datum.vp / max * (height - 100))
        )
        ctx.save()
        ctx.rotate(-Math.PI/2)
        ctx.translate(-width,8)
        ctx.fillStyle = 'black'
        ctx.textAlign = 'right'
        ctx.font = `normal ${width / (arr.length*2.4)}px Helvetica`
        ctx.fillText(datum.vp.toLocaleString(),width - height + (80),x + (10 * width/2000))
        ctx.restore()
    })
}
