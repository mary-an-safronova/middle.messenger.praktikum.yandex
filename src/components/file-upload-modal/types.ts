import { TAvatarForm } from '../../utils/types';

type TEvents = {
  change: (evt: Event) => void;
  submit: (evt: Event) => void;
  click: (event: MouseEvent) => void;
}

export type TFileUploadModalProps = {
  avatarFormState: TAvatarForm;
  placeholder: string;
  events: TEvents;
};
