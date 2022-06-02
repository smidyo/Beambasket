import { MaterialsResponse } from '../../pages/api/materials';
import { DesignsResponse } from '../../pages/api/user/designs';

export interface State {
  stage: Stage;

  materialsLoaded: boolean;
  materialsLoading: boolean;
  materials: MaterialsResponse | null;

  designsLoaded: boolean;
  designsLoading: boolean;
  designs: DesignsResponse | null;

  designUploading: boolean;

  categoryId: string | null;
  variantId: string | null;
  materialId: string | null;
}

export enum ActionType {
  SetStage,

  SetDesignsLoading,
  SetDesigns,

  SetMaterialsLoading,
  SetMaterials,

  SetCategoryId,
  SetVariantId,
  SetMaterialId,
}

interface BaseAction {
  type: ActionType;
  payload?: any;
}

interface ActionSetStage extends BaseAction {
  type: ActionType.SetStage;
  payload: Stage;
}

interface ActionSetMaterialsLoading extends BaseAction {
  type: ActionType.SetMaterialsLoading;
}

interface ActionSetMaterials extends BaseAction {
  type: ActionType.SetMaterials;
  payload: MaterialsResponse;
}

interface ActionSetDesignsLoading extends BaseAction {
  type: ActionType.SetDesignsLoading;
  payload: boolean;
}

interface ActionSetDesigns extends BaseAction {
  type: ActionType.SetDesigns;
  payload: DesignsResponse;
}

interface ActionSetCategoryId extends BaseAction {
  type: ActionType.SetCategoryId;
  payload: string | null;
}

interface ActionSetVariantId extends BaseAction {
  type: ActionType.SetVariantId;
  payload: string | null;
}

interface ActionSetMaterialId extends BaseAction {
  type: ActionType.SetMaterialId;
  payload: string | null;
}

export type Action =
  | ActionSetStage
  | ActionSetDesignsLoading
  | ActionSetDesigns
  | ActionSetMaterialsLoading
  | ActionSetMaterials
  | ActionSetCategoryId
  | ActionSetVariantId
  | ActionSetMaterialId;

export enum Stage {
  Material,
  Design,
  Manufacture,
}

export const reducer = (state: State, action: Action) => {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.SetStage: {
      newState.stage = action.payload;
      return newState;
    }
    case ActionType.SetMaterials: {
      newState.materials = action.payload;
      newState.materialsLoaded = true;
      newState.materialsLoading = false;
      return newState;
    }
    case ActionType.SetMaterialsLoading: {
      newState.materialsLoading = true;
      return newState;
    }
    case ActionType.SetDesigns: {
      newState.designs = action.payload;
      newState.designsLoaded = true;
      newState.designsLoading = false;
      return newState;
    }
    case ActionType.SetDesignsLoading: {
      newState.designsLoading = true;
      return newState;
    }
    case ActionType.SetCategoryId: {
      newState.categoryId = action.payload;
      newState.variantId = null;
      newState.materialId = null;
      return newState;
    }
    case ActionType.SetVariantId: {
      newState.materialId = null;
      newState.variantId = action.payload;

      if (action.payload) {
        newState.categoryId =
          state.materials?.materialCategories.find((c) =>
            c.materialVariants.some((mv) => mv.id === action.payload)
          )?.id ?? null;
      }
      return newState;
    }
    case ActionType.SetMaterialId: {
      newState.materialId = action.payload;

      if (action.payload) {
        const category = state.materials?.materialCategories.find((c) =>
          c.materialVariants.some((mv) =>
            mv.materials.some((m) => m.id === action.payload)
          )
        );
        newState.categoryId = category?.id ?? null;
        newState.variantId =
          category?.materialVariants.find((mv) =>
            mv.materials.some((m) => m.id === action.payload)
          )?.id ?? null;
      }
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export const initialState: State = {
  stage: Stage.Material,

  materialsLoaded: false,
  materialsLoading: false,
  materials: null,

  designsLoaded: false,
  designsLoading: false,
  designs: null,

  categoryId: null,
  variantId: null,
  materialId: null,
};
