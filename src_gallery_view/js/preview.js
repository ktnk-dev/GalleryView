const preview = {
    close:async  () => {
        select('#preview').classes('transparent', NO_BLUR? 'no_blur': '')
        select('#preview > .content').classes('content', 'transparent')
        await sleep(.25)
        select('#preview').remove()
    },
    /**
     * @param {Message} message
     */
    open:async (message) => {
        Body.append(
            $.div(
                {id: 'preview', class: `transparent ${NO_BLUR? 'no_blur': ''}`, onclick: preview.close},
                $.div(
                    {class: 'content transparent'},
                    $.img({src: message.photo}),
                    $.div(
                        {class: 'meta'},
                        IMAGE_DATETIME_IN_PREVIEW? $.div(
                            {class: 'info'},
                            $.span(message.datetime.getFullYear()),
                            $.span(message.datetime.getDate() + ' ' + message.datetime.toLocaleDateString(userLocale, { month: 'long' })),
                            $.span(message.datetime.toTimeString().split(':').slice(0,2).join(':')),
                        ): $.span(),
                        $.div(
                            {class: 'info buttons'},
                            $.span({
                                onclick: () => window.open(`${message.photo}`, '_download')
                            }, Icon.download),
                            data.channel.id? $.span({
                                onclick: () => window.open(`https://t.me/c/${data.channel.id}/${message.id}`)
                            }, Icon.telegram): null,
                        ),

                    )
                )
            )
        )
        await sleep(.01)
        selectAll('.transparent').map(e=>e.element.classList.toggle('transparent'))
    }
}