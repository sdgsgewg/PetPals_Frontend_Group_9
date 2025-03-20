import IPet from "../interface/IPet";

export enum GlobalActionType {
  GET_AVAILABLE_PETS = "GET_AVAILABLE_PETS",
}

export type GlobalAction = {
  type: GlobalActionType.GET_AVAILABLE_PETS;
  payload: IPet[];
};
