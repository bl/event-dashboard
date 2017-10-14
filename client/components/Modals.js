import React, { Component } from 'react';

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
    let buttonOnClick = () => {
      props.onClick(calendar.id);
    };

    return <button type="button" className="list-group-item list-group-item-action" data-dismiss="modal" key={calendar.id} onClick={buttonOnClick}>{calendar.summary}</button>;
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
      <CalendarList calendars={props.calendars} onClick={props.onClick} />
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
  if (!props.error) {
    return null;
  }

  let params = {
    id: 'errorMOdal',
    title: props.message,
    message: props.error,
  };

  return <Modal id={params.id} title={params.title} message={params.message}/>;
}

function OAuthModal(props) {
  let params = {
    id: 'oauthModal',
    title: 'Authorization required',
    message: 'This application requires your authorization to display calendar events.',
  }

  const footer = <a href={props.authUrl} className="btn btn-primary" role="button">Authorize App</a>;
  return <Modal id={params.id} title={params.title} message={params.message} footer={footer}/>;
}

export {CalendarSelectionModal, ErrorModal, OAuthModal};
