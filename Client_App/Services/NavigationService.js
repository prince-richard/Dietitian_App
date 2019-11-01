let navigator;

export function setNavigator(c) {
  navigator = c;
}

export function navigate(routeName, param) {
  navigator._navigation.navigate(routeName, param);
}
