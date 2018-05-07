const currentToastSelector = (state) => state.getIn([ 'app', 'toast', 0 ]);

export default (state) => ({
  currentToast: currentToastSelector(state)
});
