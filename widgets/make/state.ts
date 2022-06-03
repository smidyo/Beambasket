import { MaterialsResponse } from '../../pages/api/materials';
import { DesignsResponse } from '../../pages/api/user/designs';

export interface State {
  stage: Stage;

  materialsLoaded: boolean;
  materialsLoading: boolean;
  materials: MaterialsResponse | null;

  designsLoaded: boolean;
  designsLoading: boolean;
  designs: DesignsResponse['designs'] | null;

  designUploading: boolean;

  categoryId: string | null;
  variantId: string | null;
  materialId: string | null;

  designId: string | null;
}

export enum ActionType {
  SetStage,

  SetMaterialsLoading,
  SetMaterials,

  SetDesignsLoading,
  SetDesigns,
  SetDesignUploading,

  SetCategoryId,
  SetVariantId,
  SetMaterialId,

  SetDesignId,
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
  payload: boolean;
}

interface ActionSetMaterials extends BaseAction {
  type: ActionType.SetMaterials;
  payload: MaterialsResponse;
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
interface ActionSetDesignsLoading extends BaseAction {
  type: ActionType.SetDesignsLoading;
  payload: boolean;
}

interface ActionSetDesigns extends BaseAction {
  type: ActionType.SetDesigns;
  payload: DesignsResponse;
}

interface ActionSetDesignUploading extends BaseAction {
  type: ActionType.SetDesignUploading;
  payload: boolean;
}

interface ActionSetDesignId extends BaseAction {
  type: ActionType.SetDesignId;
  payload: string;
}

export type Action =
  | ActionSetStage
  | ActionSetMaterialsLoading
  | ActionSetMaterials
  | ActionSetCategoryId
  | ActionSetVariantId
  | ActionSetMaterialId
  | ActionSetDesignsLoading
  | ActionSetDesigns
  | ActionSetDesignUploading
  | ActionSetDesignId;

export enum Stage {
  Material,
  Design,
  Manufacture,
}

export const reducer = (state: State, { type, payload }: Action) => {
  const newState = { ...state };

  switch (type) {
    case ActionType.SetStage: {
      newState.stage = payload;
      break;
    }
    case ActionType.SetMaterials: {
      newState.materials = payload;
      newState.materialsLoaded = true;
      newState.materialsLoading = false;
      break;
    }
    case ActionType.SetMaterialsLoading: {
      newState.materialsLoading = true;
      break;
    }
    case ActionType.SetDesigns: {
      newState.designs = [...payload.designs].reverse();
      newState.designsLoaded = true;
      newState.designsLoading = false;
      break;
    }
    case ActionType.SetDesignsLoading: {
      newState.designsLoading = payload;
      break;
    }
    case ActionType.SetDesignUploading: {
      newState.designUploading = payload;
      break;
    }
    case ActionType.SetCategoryId: {
      newState.categoryId = payload;
      newState.variantId = null;
      newState.materialId = null;
      break;
    }
    case ActionType.SetVariantId: {
      newState.materialId = null;
      newState.variantId = payload;

      if (payload) {
        newState.categoryId =
          state.materials?.materialCategories.find((c) =>
            c.materialVariants.some((mv) => mv.id === payload)
          )?.id ?? null;
      }
      break;
    }
    case ActionType.SetMaterialId: {
      newState.materialId = payload;

      if (payload) {
        const category = state.materials?.materialCategories.find((c) =>
          c.materialVariants.some((mv) =>
            mv.materials.some((m) => m.id === payload)
          )
        );
        newState.categoryId = category?.id ?? null;
        newState.variantId =
          category?.materialVariants.find((mv) =>
            mv.materials.some((m) => m.id === payload)
          )?.id ?? null;
      }
      break;
    }
    case ActionType.SetDesignId: {
      newState.designId = payload;
      break;
    }
    default: {
      break;
    }
  }

  return newState;
};

export const initialState: State = {
  stage: Stage.Material,

  materialsLoaded: false,
  materialsLoading: false,
  materials: null,

  designsLoaded: false,
  designsLoading: false,
  designs: null,
  designUploading: false,

  categoryId: null,
  variantId: null,
  materialId: null,

  designId: null,
};
