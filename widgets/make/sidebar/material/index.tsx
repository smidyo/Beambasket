import { useContext, useMemo } from 'react';

import { MakeWidgetContext } from '../..';
import { ActionType, Stage } from '../../state';

interface Props {}

export const MakeWidgetSidebarMaterial = (props: Props) => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  const categoryData = useMemo(() => {
    return (
      state.materials?.materialCategories.find(
        (category) => category.id === state.categoryId
      ) ?? null
    );
  }, [state.materials, state.categoryId]);

  const variantData = useMemo(() => {
    if (!categoryData) return null;
    return (
      categoryData.materialVariants.find(
        (variant) => variant.id === state.variantId
      ) ?? null
    );
  }, [categoryData, state.variantId]);

  return (
    <div className="flex flex-col">
      <div className="">Pick a material.</div>
      <select
        onChange={(e) =>
          dispatch({
            type: ActionType.SetCategoryId,
            payload: e.target.value === "_" ? null : e.target.value,
          })
        }
        value={state.categoryId ?? "_"}
      >
        <option value="_">Select category</option>
        {state.materials?.materialCategories.map((mc) => (
          <option key={mc.id} value={mc.id}>
            {mc.nameKey}
          </option>
        ))}
      </select>
      {categoryData && (
        <select
          onChange={(e) =>
            dispatch({
              type: ActionType.SetVariantId,
              payload: e.target.value === "_" ? null : e.target.value,
            })
          }
          value={state.variantId ?? "_"}
        >
          <option value="_">Select variant</option>
          {categoryData.materialVariants.map((mv) => (
            <option key={mv.id} value={mv.id}>
              {mv.nameKey}
            </option>
          ))}
        </select>
      )}
      {variantData && (
        <select
          onChange={(e) =>
            dispatch({
              type: ActionType.SetMaterialId,
              payload: e.target.value === "_" ? null : e.target.value,
            })
          }
          value={state.materialId ?? "_"}
        >
          <option value="_">Select materrial</option>
          {variantData.materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nameKey}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={() =>
          dispatch({ type: ActionType.SetStage, payload: Stage.Design })
        }
      >
        Next
      </button>
    </div>
  );
};
