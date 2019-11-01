// exports
export function getUnformatted(displayValue, type) {
  switch (type) {
    case 'date':
      return displayValue.split('/').join('');
    case 'time':
      return displayValue.split(':').join('');
  }
}
export function getDisplay(unformatted, type) {
  switch (type) {
    case 'date': {
      return getDisplayDate(unformatted);
    }
    case 'time': {
      return getDisplayTime(unformatted);
    }
  }
}

// logic functions
// date
function getDisplayDate(unformatted) {
  if (unformatted.length <= 2) {
    return unformatted;
  } else if (unformatted.length <= 4) {
    return `${unformatted.slice(0, 2)}/${unformatted.slice(2)}`;
  } else {
    return `${unformatted.slice(0, 2)}/${unformatted.slice(
      2,
      4,
    )}/${unformatted.slice(4)}`;
  }
}

// time
function getDisplayTime(unformatted) {
  if (unformatted.length <= 2) {
    return unformatted;
  } else {
    return `${unformatted.slice(0, 2)}:${unformatted.slice(2)}`;
  }
}
