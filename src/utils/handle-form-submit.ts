/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-params */

// Функция submit форм
const handleFormSubmit = (
  evt: Event,
  formState: Record<string, any>,
  setProps: (props: Record<string, any>) => void,
  props: Record<string, any>,
): void => {
  evt.preventDefault();
  console.log('handleFormSubmit: ', formState);
  setProps(props);
};

export default handleFormSubmit;
