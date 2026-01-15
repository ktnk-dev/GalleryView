
const day = {
    close:async () => {
        const Container = select('#day')
        if (!Container.element) return
        Container.classes('transparent', NO_BLUR? 'no_blur': '')
        await sleep(.2)
        Container.remove()
    },
    /**
     * @param {Message[]} msgs 
     */
    open:async (msgs) => {
        await day.close()
        select('body').append($.div(
            {id: 'day', class: 'transparent'},
            $.div(
                {class: 'head'},
                $.div({class: 'close', onclick: day.close}, Icon.close),
                $.h2(msgs[0].datetime.getDate() + ' ' + msgs[0].datetime.toLocaleDateString(userLocale, { month: 'long' }))
            ),
            $.div(
                {id: 'content'}
            )
        ))
        await sleep(.01)
        day.square_view(msgs)
        await sleep(.01)
        select('#day').classes(NO_BLUR? 'no_blur': '')
    },

    // todo: multiple photo view variants

    /**
     * @param {Message[]} msgs 
     */
    square_view:async (msgs) => {
        const View = select('#content')
        View.clear()

        /**
         * @type {Object<string, Message[]>} msgs 
         */
        var db = {}

        msgs.map(m => {
            if (!Object.keys(db).includes(m.from)) db[m.from] = []
            db[m.from].push(m)
        })

        Object.keys(db).sort().map(name => {
            View.append(
                $.h3(name),
                $.div({class: 'photos'})
            )
            db[name].map(m => {
                selectAll('#content > .photos').at(-1).append(
                    Photo(m)
                )
            })
        })
    },

}