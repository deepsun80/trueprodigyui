import { createStructuredSelector } from 'reselect';
import { userModuleSelector, globalFormSelector, urlsSelector, playingStatusSelector } from '../../../selectors/global';

export default createStructuredSelector({
  globalFormData: globalFormSelector,
  isPlaying: playingStatusSelector,
  userModules: userModuleSelector,
  urls: urlsSelector
});
