import { createConfirmation } from 'react-confirm';
import ConfirmDialog from './confirmDialog';

// create confirm function
const confirm = createConfirmation(ConfirmDialog);

// This is optional. But I recommend to define your confirm function easy to call.
export default function (value, options = {}) {
  // You can pass whatever you want to the component. These arguments will be your Component's props
  return confirm({ confirmation: value, options });
}

export function confirmation (question = 'Are you sure you want to trigger this action?') {
  return new Promise((resolve) => {
    resolve(Boolean(window.confirm(question)));
  });
}
