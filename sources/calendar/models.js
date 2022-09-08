const authGoogle = require('./auth');

async function insertEvent(summary, description, start, end) {
    const event = {
        'summary': summary,
        'description': description,
        'start': {
        'dateTime': start,
        'timeZone': 'Asia/Ho_Chi_Minh'
        },
        'end': {
        'dateTime': end,
        'timeZone': 'Asia/Ho_Chi_Minh'
        },
    };
    
    authGoogle.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            console.log('Event created: %s', res.data.htmlLink);
    });
};

async function searchEvents(DataSearch, TimeMin, TimeMax) {
    try {
        let data = await authGoogle.calendar.events.list({
            calendarId: 'primary',
            q: DataSearch,
            singleEvents: false,
            showDeleted: false,
            timeMin: TimeMin,
            timeMax: TimeMax,
        });

        data = data.data.items;

        if(data.length > 0) 
            return ({
                statusCode: 200,
                timeStart: data[0].start.dateTime || data[0].start.date,
                timeEnd: data[0].end.dateTime || data[0].end.date,
                summary: data[0].summary,
                description: data[0].description
            })
        return ({
            statusCode: 404,
            message: 'Không tìm thấy dữ liệu'
        })
    } catch (error) {
        console.log(error);
        return ({
            statusCode: 500,
            message: 'Lỗi server'
        })
    }
}

exports.searchEvents = searchEvents;
exports.insertEvent = insertEvent;