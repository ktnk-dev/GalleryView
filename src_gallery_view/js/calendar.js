const calendar = {
    render_month:async (month, monthNumber, year) => {
        if (Object.keys(month).length == 0) return
        const fd = new Date(year, monthNumber, 1)
        const ld = new Date(year, monthNumber, 0)
        const monthName = fd.toLocaleDateString(userLocale, { month: 'long' })

        var out = []
        for (let i = 0; i < fd.getDay()-1; i++) {
            out.push(undefined)
        }
        
        for (let i = 0; i < ld.getDate(); i++) {
            const e = month[i+1]
            out.push(e? e: [])
        }
        const remainder = (7 - (out.length%7))
        if (remainder != 7) {
            for (let i = 0; i < remainder ; i++) {
                out.push(undefined)
            }
        }
        //console.log(out)
        
        selectAll('.months').at(-1).append(
            Calendar(
                monthName,
                out
            )
        )
    },
    init:async () => {
        App.clear()
        await sleep(.5)
        App.classes('calendar', NO_BACKGROUND? 'no_bg': '', NO_BLUR? 'no_blur': '')
        Body.append(
            $.header(
                {class: 'transparent'},
                data.channel.photo? $.img({src: data.channel.photo}) :null,
                $.span(data.channel.name),
                $.div({class: 'count'}, data.messages.length + Icon.photo),
            )
        )
        // App.clear()
        await sleep(.2)
        select('header').classes()
        
        
        var last_year = -1
        var last_month = -10
        /**
         * @type {Object<string, Messages[]>}
         */
        var month = {}

        data.messages.map((m, i) => {
            if (last_year != m.datetime.getFullYear()) {
                if (last_year != -1) calendar.render_month(month, last_month, last_year)

                last_year = m.datetime.getFullYear()
                App.append(
                    $.h1({class: 'transparent'}, last_year),
                    $.div({class: 'months'}, null)
                )
                month = {}
            }
            if (last_month != m.datetime.getMonth()) {
                if (last_month != -10) calendar.render_month(month, last_month, last_year)
                last_month = m.datetime.getMonth()
                month = {}
            }
            try {month[m.datetime.getDate()].push(m)}
            catch {month[m.datetime.getDate()] = [m]}
        })
        if (Object.keys(month).length) calendar.render_month(month, last_month, last_year)
        await sleep(.2)
        selectAll('.transparent').map(async (e, i) => {
            await sleep(i/10)
            e.element.classList.toggle('transparent')
        })
    }
}