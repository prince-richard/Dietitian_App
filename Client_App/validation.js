import moment from 'moment';
export function email(input, augs) {
  let message = 'The email address is invalid.';
  if (augs && augs.message) message = augs.message;
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!reg.test(input)) {
    return message;
  }
  return null;
}

export function required(input, augs) {
  let message = 'This input field is requried.';
  if (augs && augs.message) message = augs.message;
  if (`${input}`.trim() === '') {
    return message;
  }
  return null;
}

// params:
// min: number,
// max: number
export function length(input, augs) {
  let min = 0;
  let max = 936;
  let message = `Length should be more than ${min} and greater than ${max} characters.`;
  if (augs && augs.params && augs.params.min) min = augs.params.min;
  if (augs && augs.params && augs.params.max) max = augs.params.max;
  if (augs && augs.message) message = augs.message;
  if (typeof input != 'string' || input.length < min || input.length > max) {
    return message;
  }
  return null;
}

export function year(input, augs) {
  let message = 'This is not a valid year.';
  if (augs && augs.params && augs.params.min) min = augs.params.min;
  if (augs && augs.params && augs.params.max) max = augs.params.max;
  if (augs && augs.message) message = augs.message;
  const text = /^[0-9]+$/;
  if (!text.test(input) || input.toString().length != 4) {
    return message;
  }
  return null;
}

export function date(input, augs) {
  let min = moment('1900-01-1', 'YYYY-MM-DD');
  let max = moment('3000-01-01', 'YYYY-MM-DD');
  let message =
    "Please input a valid date with format 'MM/DD/YYYY', for example: 03/12/2017.";
  let reg = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;

  if (augs && augs.params && augs.params.max) max = new Date(augs.params.max);
  if (augs && augs.params && augs.params.min) min = new Date(augs.params.min);
  if (augs && augs.message) message = augs.message;
  if (input == '') return null;

  if (!reg.test(input)) {
    return message;
  }
  let date = moment(input, 'MM/DD/YYYY');
  if (date > max || date < min) return message;
  return null;
}

export function time(input, args) {
  let message = "Please follow time format 'HH:MM', for example: 15:04.";
  let reg = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if (input == '') return null;
  if (!reg.test(input)) {
    return message;
  }
  return null;
}

export function refEqual(input, args) {
  let target = '';
  let targetName = '.';
  let message = "The input doesn't match";
  if (args && args.params && args.params.targetName)
    targetName = ` ${args.params.targetName}.`;
  if (args && args.params && args.params.target) target = args.params.target;
  if (input != target) {
    if (args && args.message) return args.message;
    return message + targetName;
  }
  return null;
}

export function imageSize(image, augs) {
  let message =
    'The size of the image is too large. Please corp the image or select another one.';
  let max = 2000000;
  if (augs && augs.params && augs.params.min) min = augs.params.min;
  if (augs && augs.params && augs.params.max) max = augs.params.max;
  if (image.size > max) {
    return message;
  }
  return null;
}

export function password(input, args) {
  let message =
    'Password must have 8 chars including at least 1 num, 1 special char, 1 uppercase char and 1 lowercase char.';
  let reg = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[\d]){1,})(?=(.*[!@#\$%\^&]){1,})(?!.*[^a-zA-Z0-9!@#\$%\^&]).{8,}$/;
  if (!reg.test(input)) {
    return message;
  }
  return null;
}

export function number(input, args) {
  if (input == '') return null;
  let min = Number.NEGATIVE_INFINITY;
  let max = Number.POSITIVE_INFINITY;
  if (args && args.params && args.params.min) min = args.params.min;
  if (args && args.params && args.params.max) max = args.params.max;
  const inputNumber = new Number(input);

  if (isNaN(inputNumber) || inputNumber < min || inputNumber > max) {
    return 'This is not a valid number.';
  }
  return null;
}
