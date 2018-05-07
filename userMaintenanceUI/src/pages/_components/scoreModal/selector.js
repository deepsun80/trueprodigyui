import { createStructuredSelector } from 'reselect';
import { fieldsSelector } from '../../../selectors/property';
import { scoreModalSelector } from '../../../selectors/modal';

export default createStructuredSelector({
  fields: fieldsSelector,
  modal: scoreModalSelector
});
