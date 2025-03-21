import IPet from "../interface/IPet";
import IService from "../interface/IService";

export enum GlobalActionType {
  GET_AVAILABLE_PETS = "GET_AVAILABLE_PETS",
  GET_PET_DETAIL = "GET_PET_DETAIL",
  GET_ALL_SERVICES = "GET_ALL_SERVICES",
  GET_SERVICE_DETAIL = "GET_SERVICE_DETAIL",
}

export type GlobalAction =
  | {
      type: GlobalActionType.GET_AVAILABLE_PETS;
      payload: IPet[];
    }
  | {
      type: GlobalActionType.GET_PET_DETAIL;
      payload: IPet;
    }
  | {
      type: GlobalActionType.GET_ALL_SERVICES;
      payload: IService[];
    }
  | {
      type: GlobalActionType.GET_SERVICE_DETAIL;
      payload: IService;
    };
