const background = {
    change:async (first = false) => {
        const random = Math.round(
            Math.random()*(data.messages.length-1)
        )
        const message = data.messages[random]
        const body = select('body')
        if (!first) {
            body.append($.img(
                {src: message.photo, style: `
                    position: fixed;
                    z-index: -3;
                    top: 0px;
                    opacity: 0.01;    
                    width: 1px;
                    height: 1px
                `, id: 'preloadimg'}
            ))
    
            await sleep(3)
        }
        document.body.style = `
            background: url(${message.photo}) #000;
            background-size: cover;
            background-position: 50% 50%;
        `

        if (!first) {
            await sleep(1)
            select('#preloadimg').remove()
        }
    },

    init:async () => {
        await sleep(.1)
        background.change(true)
        setInterval(() => {
            background.change()
        }, 10*1000);    
    }
}