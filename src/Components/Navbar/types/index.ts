type anchorEl = HTMLElement | null | HTMLAnchorElement;

export interface IProfileMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEL: anchorEl;
}
