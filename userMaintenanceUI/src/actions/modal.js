export const MASTER_COMP_MODAL_OPEN = 'MODAL/MASTER_COMP_MODAL_OPEN';
export const MASTER_COMP_MODAL_CLOSE = 'MODAL/MASTER_COMP_MODAL_CLOSE';
export const VERSION_COMP_MODAL_OPEN = 'MODAL/VERSION_COMP_MODAL_OPEN';
export const VERSION_COMP_MODAL_CLOSE = 'MODAL/VERSION_COMP_MODAL_CLOSE';
export const SCORE_MODAL_OPEN = 'MODAL/SCORE_MODAL_OPEN';
export const SCORE_MODAL_CLOSE = 'MODAL/SCORE_MODAL_CLOSE';

export function openMasterCompModal () {
  return { type: MASTER_COMP_MODAL_OPEN };
}

export function closeMasterCompModal () {
  return { type: MASTER_COMP_MODAL_CLOSE };
}

export function openVersionCompModal (versionId) {
  return { type: VERSION_COMP_MODAL_OPEN, data: versionId };
}

export function closeVersionCompModal () {
  return { type: VERSION_COMP_MODAL_CLOSE };
}

export function openScoreModal (propertyId, compPropertyId) {
  return { type: SCORE_MODAL_OPEN, data: { propertyId, compPropertyId } };
}

export function closeScoreModal () {
  return { type: SCORE_MODAL_CLOSE };
}
