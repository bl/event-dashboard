import React, { Component } from 'react';
import './dashboard.css';

import EventList from './EventList';
import DisplayEvent from './DisplayEvent'


function Modal(props) {
  return (
    <div id={props.id} className='modal fade' tabindex="-1" role="dialog" aria-labelledby="`example-${props.id}`">
      <div className="modal-dialog" role="document">
      </div>
    </div>
  );
}

function OAuthModal(props) {
  const authUrl = props.oauth ? props.oauth : null;
  if (!authUrl) {
    return null;
  }

  const id = 'oauthModal';
  const title = 'Authorization required';
  const message = `This application requires your authorization to display calendar events. Click the link below:`;
  return <Modal id={id} title={title} message={message}/>;
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // TODO: abstract this into Calendar component that pulls from Google Calendar
    this.state = {
      calendar: {
        kind: "calendar#events",
        etag: "\"cal-1\"",
        summary: "Example calendar",
        description: "An example calendar",
        updated: "2017-09-04T23:39:48.569Z",
        timeZone: "America/Toronto",
        accessRole: "writer",
        defaultReminders: [
        ],
        nextSyncToken: "example_token",
        items: [
        {
          kind: "calendar#event",
          etag: "\"1\"",
          id: "1",
          status: "confirmed",
          htmlLink: "http://example.com",
          created: "2016-04-25T00:12:34.000Z",
          updated: "2016-04-25T00:12:34.250Z",
          summary: "Example first event",
          location: "Ottawa",
          creator: {
            email: "first@example.com"
          },
          organizer: {
            email: "org@example.com",
            displayName: "Example org",
            self: true
          },
          start: {
            dateTime: "2018-04-29T11:00:00-04:00"
          },
          end: {
            dateTime: "2018-04-29T12:30:00-04:00"
          },
          iCalUID: "example",
          sequence: 0,
          reminders: {
            useDefault: true
          }
        },
        {
          kind: "calendar#event",
          etag: "\"2\"",
          id: "2",
          status: "confirmed",
          htmlLink: "http://example.com",
          created: "2016-04-25T00:23:31.000Z",
          updated: "2016-04-25T17:54:30.433Z",
          summary: "Example second event",
          description: "The second event",
          location: "Carleton University",
          creator: {
            email: "first@test.com"
          },
          organizer: {
            email: "org@test.com",
            displayName: "Test Organization",
            self: true
          },
          start: {
            dateTime: "2018-04-25T14:00:00-04:00"
          },
          end: {
            dateTime: "2018-04-25T15:00:00-04:00"
          },
          iCalUID: "example",
          sequence: 1,
          hangoutLink: "https://plus.google.com/hangouts/example",
          reminders: {
            useDefault: true
          }
        },
        {
          kind: "calendar#event",
          etag: "\"3\"",
          id: "3",
          status: "confirmed",
          htmlLink: "http://example.com",
          created: "2016-04-26T01:12:45.000Z",
          updated: "2016-04-27T01:20:01.224Z",
          summary: "Example third event",
          location: "Rideau",
          creator: {
            email: "third@example.com"
          },
          organizer: {
            email: "org@test.com",
            displayName: "Example org",
            self: true
          },
          start: {
            dateTime: "2018-04-28T11:00:00-04:00"
          },
          end: {
            dateTime: "2018-04-28T13:00:00-04:00"
          },
          iCalUID: "example",
          sequence: 0,
          reminders: {
            useDefault: true
          }
        }
        ]
      }
    };
  }

  render() {
    return (
      <div className="Dashboard container-fluid">
        <OAuthModal
          oauth = {this.props.oauth}
        />
        <div className="row">
          <div className="events col-lg-4">
            <EventList
              events = {this.state.calendar.items}
            />
          </div>
          <div className="selectedEvent col-lg-8">
            {/* TODO: pass "selected" event */}
            <DisplayEvent
              event = {this.state.calendar.items[0]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
