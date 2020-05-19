import { extend, throwWarn } from '@Src/utils'

const diff = ENV === 'node' ? 
    require('./node')._Canvas : 
    require('./web')._Canvas

const extra = {
    getImage(image, cbk, error) {
        if (typeof image === 'string') {
            Canvas.loadImage(image, cbk, error)
        }else if (typeof image === 'object') {
            cbk(image)
        }else {
            throwWarn(`getImage error, src=${image}`)
        }
    },
    drawRoundRectPath(
        ctx: CanvasRenderingContext2D, 
        width: number, 
        height: number, 
        radius: number
    ) {
        ctx.beginPath()
        ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
        ctx.lineTo(radius, height)
        ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
        ctx.lineTo(0, radius)
        ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
        ctx.lineTo(width - radius, 0)
        ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
        ctx.lineTo(width, height - radius)
        ctx.closePath()
    },
    drawRoundRect(
        ctx: CanvasRenderingContext2D,
        x: number, 
        y: number, 
        width: number, 
        height: number, 
        radius: number = 0,
        fillColor: string = '#fff',
        strokeWidth: number = 0,
        strokeColor: string = '#000',
    ) {
        // 圆的直径必然要小于矩形的宽高
        const minL = Math.min(width, height)      
        if (2 * radius > minL) radius = minL / 2
    
        ctx.save()
        ctx.translate(x, y)
        // 绘制圆角矩形的各个边  
        extra.drawRoundRectPath(ctx, width , height, radius)
        ctx.fillStyle = fillColor
        ctx.fill()
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = strokeColor
        ctx.stroke()
        ctx.restore()
    }
}

export const Canvas = extend(true, diff, extra)

