class CalendarService {
  constructor() {
  }

  static calendar(id) {
    return $.getJSON(`/api/calendars/${id}`);
  }

  static events(id) {
    return $.getJSON(`/api/calendars/${id}/events`);
  }
}

export default CalendarService;
