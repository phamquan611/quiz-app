// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function redirectTo(url) {
  return history.push(url);
}