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
