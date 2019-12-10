let spinner;
export function setSpinner(c) {
  spinner = c;
}
export function hideSpinner() {
  spinner.setState({show: false});
}
export function showSpinner() {
  spinner.setState({show: true});
}
