export const drawBarChartFromChoiceArray = (ctx, data, width, height) => {
    let max = data.sort((a, b) => b.vp - a.vp)[0].vp
    data.forEach((datum, index, arr) => {
        ctx.fillStyle = `#${datum.color}`
        let x = index * width / arr.length
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
        ctx.font = `normal ${12}px Helvetica`
        ctx.fillText(datum.vp.toLocaleString(),width - height + (80),x + (2 * width/2000))
        ctx.restore()
    })
}

export const drawKey = (ctx, choices, colorArray, width, height) => {
    choices.forEach((choice, i) => {
        ctx.fillStyle = `#${colorArray[i]}`
        let x = i * (width / choices.length)
        let y = height - 20
        let w = 20
        let h = 20
        ctx.fillRect(x, y, w, h)
        ctx.fillStyle = 'black'
        ctx.fillText(choice, x + 30, y + 15)
    })
}
