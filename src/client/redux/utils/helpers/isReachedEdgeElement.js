export const BOTTOM_EDGE = 'BOTTOM_EDGE';
export const TOP_EDGE    = 'TOP_EDGE';
export const MIDDLE    = 'MIDDLE';

export function isReachedEdgeElement(element, edge = BOTTOM_EDGE, delta = 50) {
  if (element) {
    const clientHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;

    switch (edge) {
      case BOTTOM_EDGE:
        return (clientHeight + scrollTop) > (scrollHeight - delta);
      case MIDDLE:
        return (clientHeight + scrollTop) < (scrollHeight - delta);
      case TOP_EDGE:
        return (scrollHeight !== clientHeight) && (scrollTop < delta);
      default:
        return false;
    }
  }
  return false;
}
