import IPet from "../interface/IPet";

export enum GlobalActionType {
  GET_ALL_PETS = "GET_ALL_PETS",
}

export type GlobalAction = {
  type: GlobalActionType.GET_ALL_PETS;
};
