/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

// Функция для обработки изменения инпутов
const handleInputChange = (
  evt: Event,
  formState: Record<string, any>,
  setProps: (props: Record<string, any>) => void,
) => {
  const target = evt.target as HTMLInputElement;
  const updatedFormState = {
    ...formState,
    [target.name]: target.value,
  };

  setProps({
    formState: updatedFormState,
  });

  console.log(`onChange${target.name.charAt(0).toUpperCase() + target.name.slice(1)}: `, updatedFormState);
};

export default handleInputChange;
