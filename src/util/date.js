import moment from 'moment';

const DATE_TIME_FORMAT = 'DD MMM YYYY hh:mm a';

// TODO: fix date parsing

export function timestampToString(timestamp) {
  return moment.unix(parseInt(timestamp) / 1000).format(DATE_TIME_FORMAT);
}

export function fromNow(timestamp) {
  const dateAsString = timestampToString(timestamp);
  return moment(dateAsString, DATE_TIME_FORMAT).fromNow();
}
