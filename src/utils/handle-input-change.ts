/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

// Функция для обработки изменения инпутов
const handleInputChange = (
  evt: Event,
  formState: Record<string, any>,
  setProps: (props: Record<string, any>) => void,
) => {
  const target = evt.target as HTMLInputElement;
  if (target.files && target.files[0]) { // Если тип инпута 'file'
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result; // Получаем URL изображения
      const arr = target.value.split('\\');
      const fileName = arr[arr.length - 1];

      const updatedFormState = {
        ...formState,
        file: imageUrl,
      };

      setProps({
        formState: updatedFormState, // Сохраняем данные инпута в состоянии
        placeholder: fileName,
      });

      console.log(`onChange${target.name.charAt(0).toUpperCase() + target.name.slice(1)}: `, updatedFormState);
      console.log(fileName);
    };

    reader.readAsDataURL(file); // Читаем файл как Data URL
  } else {
    const updatedFormState = {
      ...formState,
      [target.name]: target.value,
    };

    setProps({
      formState: updatedFormState, // Сохраняем данные инпута в состоянии
    });

    console.log(`onChange${target.name.charAt(0).toUpperCase() + target.name.slice(1)}: `, updatedFormState);
  }
};

export default handleInputChange;
