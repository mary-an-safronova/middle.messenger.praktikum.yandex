/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function toggleModal(
  modalName: string,
  setProps: (props: Record<string, any>) => void,
  props: Record<string, any>,
) {
  setProps({ [modalName]: !props[modalName] });
}
