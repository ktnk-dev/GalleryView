const userLocale = navigator.language || 'ru-RU'

class Message {
    constructor(e) {
        this.from = e.from
        this.datetime = new Date(e.date)
        this.photo = e.photo
        this.id = e.id
    }
}

const data = {
    channel: {
        name: null,
        photo: null,
        id: null,
    },
    /**
     * @type {Message[]}
     */
    messages: [],

    init:async () => {
        data.channel.name = messages.name
        try {data.channel.id = messages.id} catch {}
        messages.messages.map(m => {
        switch (m.type) {
            case 'service':
                if (m.action == 'edit_group_photo') data.channel.photo = m.photo; break;
            case 'message':
                if (
                    !Object.keys(m).includes('photo')
                ) break
                
                const msg = new Message(m)
                data.messages.push(msg)
                break
            default: break
        }
        })
    }
}