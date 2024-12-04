/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-params */
import { Block } from '../core';
import { validate } from './validate';

export const handleValidate = (
  evt: Event,
  inputName: string,
  inputValue: string,
  inputChild: any,
  errorState: Record<string, any>,
  setProps: (props: Record<string, any>) => void,
  setPropsForChildren: (children: Block | Block[], nextProps: any) => void,
  prevInputValue?: string,
) => {
  const target = evt.target as HTMLInputElement;
  if (target.name === inputName) {
    const validation = validate(inputName, inputValue, prevInputValue);
    const updatedErrorState = {
      ...errorState,
      [target.name]: validation,
    };
    setProps({ errorState: updatedErrorState });

    setPropsForChildren(inputChild, {
      error: validation.error,
      errorText: validation.errorText,
      value: validation.value,
    });
  }
};

export const handleEmptyInputValidate = (
  evt: Event,
  inputName: string,
  inputValue: string,
  inputChild: any,
  errorState: Record<string, any>,
  setProps: (props: Record<string, any>) => void,
  setPropsForChildren: (children: Block | Block[], nextProps: any) => void,
  prevInputValue?: string,
) => {
  const target = evt.target as HTMLInputElement;
  const validation = validate(inputName, inputValue, prevInputValue);
  const updatedErrorState = {
    ...errorState,
    [target.name]: validation,
  };
  setProps({ errorState: updatedErrorState });

  setPropsForChildren(inputChild, {
    error: validation.error,
    errorText: validation.errorText,
    value: validation.value,
  });
};
