export const yearSelector = (state) => state.getIn([ 'form', 'propertySearchFilter', 'values', 'Year' ]);
export const propertySearchFilterFormSelector = (state) => state.getIn([ 'form', 'propertySearchFilter' ]);
export const masterSearchFilterFormSelector = (state) => state.getIn([ 'form', 'masterSearchFilter' ]);
export const propertyDetailFormSelector = (state) => state.getIn([ 'form', 'propertyDetail' ]);
export const versionSearchFilterFormSelector = (state) => state.getIn([ 'form', 'versionSearchFilter' ]);

