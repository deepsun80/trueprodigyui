import { createStructuredSelector } from 'reselect';
import { preferenceSelector, userDataSelector } from '../../../selectors/global';

export default createStructuredSelector({
  preference: preferenceSelector,
  userData: userDataSelector
});
