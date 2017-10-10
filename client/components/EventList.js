import React, { Component } from 'react';
import './EventList.css';

import Event from './Event';

class EventList extends Component {
  render() {
    return(
      <div className="EventList list-group">
        {this.props.events && this.props.events.map(event =>
          <li key={event.id} className="list-group-item bg-primary">
            <Event
              key = {event.id}
              event = {event}
            />
          </li>
        )}
      </div>
    );
  }
}

export default EventList;
