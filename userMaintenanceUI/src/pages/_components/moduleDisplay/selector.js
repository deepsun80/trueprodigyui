import { createStructuredSelector } from 'reselect';
import { setLinkValue } from '../../../selectors/constants';

export default createStructuredSelector({
  moduleSelect: setLinkValue
});
