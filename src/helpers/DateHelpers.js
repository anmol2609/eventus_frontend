export const readableDateTimeFromString = (dateTime) => {
  const date = new Date(dateTime)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Kolkata',
  }

  return date.toLocaleDateString('en-US', options).replace(' at', ', ')
}

export const readableDateFromString = (dateTime) => {
  const date = new Date(dateTime)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  }

  return date.toLocaleDateString('en-US', options)
}
