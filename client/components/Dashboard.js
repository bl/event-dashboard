import React, { Component } from 'react';
import './dashboard.css';

import EventList from './EventList';
import DisplayEvent from './DisplayEvent'


class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // after rendering, perform any client-side rendering
    $(`#${this.props.id}`).modal('show');
  }

  render() {
    const labelledBy = `${this.props.id}Label`;
    const dataTarget = `#${this.props.id}`;
    const footer = this.props.footer ? this.props.footer
      : <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>;
    return (
      <div className="ModalWrapper">
        <div id={this.props.id} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby={labelledBy} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content" >
              <div className="modal-header">
                <h5 className="modal-title" id={labelledBy}>{this.props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{this.props.message}</div>
              <div className="modal-footer">{this.props.footer}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function CalendarList(props) {
  let calendarEntries = props.calendars.map((calendar) => {
    return <button type="button" className="list-group-item list-group-item-action" key={calendar.id}>{calendar.summary}</button>;
  });

  return <div className="list-group">{calendarEntries}</div>;
}

function CalendarSelectionModal(props) {
  if (!props.calendars) {
    return null;
  }

  var message = (
    <div>
      <p>Select one of the calendars below</p>
      <CalendarList calendars={props.calendars} />
    </div>
  );

  let params = {
    id: 'calendarSelectionModal',
    title: 'Select Calendar',
    message: message
  };

  return <Modal id={params.id} title={params.title} message={params.message}/>;
}

function ErrorModal(props) {
  if (!this.props.error) {
    return null;
  }

  let params = {
    id: 'errorMOdal',
    title: 'Error',
    message: `There was an error: ${props.error}`,
  };

  return <Modal id={params.id} title={params.title} message={params.message}/>;
}

function OAuthModal(props) {
  let params = {
    id: 'oauthModal',
    title: 'Authorization required',
    message: 'This application requires your authorization to display calendar events.',
    authUrl: props.oauth ? props.oauth.authUrl : null,
  }

  const footer = <a href={params.authUrl} className="btn btn-primary" role="button">Authorize App</a>;
  return <Modal id={params.id} title={params.title} message={params.message} footer={footer}/>;
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.renderNotices = this.renderNotices.bind(this);
    // TODO: abstract this into Calendar component that pulls from Google Calendar
    this.state = {
      authUrl: props.oauth ? props.oauth.authUrl : null,
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

  renderNotices() {
    if (this.props.error) {
      return <ErrorModal oauth={this.props.oauth} />;
    }

    if (this.props.calendarList) {
      return <CalendarSelectionModal calendars={this.props.calendarList} />;
    }

    if (this.state.authUrl) {
      return <OAuthModal oauth={this.props.oauth} />;
    }
  }

  render() {
    return (
      <div className="Dashboard container-fluid">
      {this.renderNotices()}
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
