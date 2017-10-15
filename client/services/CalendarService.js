class CalendarService {
  constructor() {
  }

  static calendar(id) {
    return $.getJSON(`/api/calendars/${id}`);
  }

  static events(id, params = null) {
    let requestUrl = `/api/calendars/${id}/events`;
    if (params) {
      const params = URLSearchParams(params);
      requestUrl += `?${params}`;
    }

    return $.getJSON(requestUrl);
  }
}

export default CalendarService;
