import React, { Component } from 'react';
import './dashboard.css';

import EventList from './EventList';
import DisplayEvent from './DisplayEvent';

import CalendarService from '../services/CalendarService';

import {CalendarSelectionModal, ErrorModal, OAuthModal} from './Modals';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.renderNotices = this.renderNotices.bind(this);
    this.calendarListHandleClick = this.calendarListHandleClick.bind(this);
    this.eventListHandleClick = this.eventListHandleClick.bind(this);
    this.timelineModeHandleClick = this.timelineModeHandleClick.bind(this);
    this.selectedEvent = this.selectedEvent.bind(this);
    this.updateSelectedEvent = this.updateSelectedEvent.bind(this);

    this.state = {
      error: props.error,
      authUrl: props.oauth ? props.oauth.authUrl : null,
      calendar: null,
      selectedEventIndex: null,
      timelineMode: true, // automatically switch display events as they occur
    };
  }

  componentDidMount() {
    this.dashboardTimer = setInterval(this.updateSelectedEvent, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.dashboardTimer);
  }

  updateSelectedEvent() {
    const nextSelectedEventIndex = this.nextSelectedEventIndex(this.state.calendar);
    // do not update state if not in timeline mode OR next event hasn't changed
    if (!this.state.timelineMode || this.state.selectedEventIndex == nextSelectedEventIndex) {
      return;
    }

    // NOTE: setState is performed async, so same calculation above is performed
    // with most up to date version of state
    this.setState((prevState, props) => ({
      selectedEventIndex: this.nextSelectedEventIndex(prevState.calendar),
    }));
  }

  /**
   * returns: null   if no calendar present
   *          index  if next event exists in calendar
   *          -1     if no event exists
   * */
  nextSelectedEventIndex(calendar) {
    if (!calendar) {
      return null;
    }

    // find first event with start after current time
    // TODO: write function to return array of "running events"
    // useful for displaying events currently running
    const currentTime = new Date();
    return calendar.items.findIndex((event) => {
      let eventTime = new Date(event.start.dateTime || event.start.date)
      return eventTime > currentTime;
    });
  }

  selectedEvent() {
    if (this.state.selectedEventIndex == null) {
      return null;
    }
    return this.state.calendar.items[this.state.selectedEventIndex];
  }

  eventListHandleClick(eventId) {
    const eventIndex = this.state.calendar.items.findIndex(event => event.id == eventId);
    this.updateSelectedEvent(eventIndex);

    this.setState((prevState, props) => ({
      timelineMode: false,
      selectedEventIndex: eventIndex,
    }));
  }

  calendarListHandleClick(calendarId) {
    CalendarService.events(calendarId)
      .then((events) => {
        this.setState({calendar: events});
      })
      .fail((error) => {
        this.setState(error.responseJSON);
      });
  }

  timelineModeHandleClick() {
    this.setState(() => ({
      timelineMode: true,
    }));
  }

  renderNotices() {
    if (this.state.error) {
      return <ErrorModal {...this.state.error} />;
    }

    if (this.props.calendarList) {
      return <CalendarSelectionModal calendars={this.props.calendarList} onClick={this.calendarListHandleClick} />;
    }

    if (this.state.authUrl) {
      return <OAuthModal authUrl={this.state.authUrl} />;
    }
  }

  render() {
    return (
      <div className="Dashboard container-fluid">
      {this.renderNotices()}
        <div className="row">
          <div className="events col-lg-4">
            {!this.state.timelineMode &&
              <button type="button" className="btn btn-secondary" onClick={this.timelineModeHandleClick}>Timeline Mode</button>
            }
            <EventList
              events = {this.state.calendar ? this.state.calendar.items : null }
              onClick = {this.eventListHandleClick}
            />
          </div>
          <div className="selectedEvent col-lg-8">
            {this.selectedEvent() &&
              <DisplayEvent
                event = {this.selectedEvent()}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
