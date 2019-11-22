let navigator;

export function setNavigator(c) {
  navigator = c;
}

export function navigate(routeName, param) {
  console.log('navigation text', navigator._navigation);
  navigator._navigation.navigate(routeName, param);
}
