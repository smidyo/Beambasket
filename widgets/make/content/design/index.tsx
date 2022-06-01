import { useContext } from 'react';

import { MakeWidgetContext } from '../..';
import { ActionType } from '../../state';

export const MakeWidgetContentDesign = () => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  return (
    <>
      {state.materials?.materialCategories.map((category) => (
        <div key={category.nameKey}>
          <h2>{category.nameKey}</h2>
          <ul>
            {category.materialVariants.map((materialVariant) => (
              <div key={materialVariant.nameKey}>
                {materialVariant.nameKey}
                {materialVariant.materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() =>
                      dispatch({
                        type: ActionType.SetMaterialId,
                        payload: material.id,
                      })
                    }
                  >
                    {material.nameKey}
                  </button>
                ))}
              </div>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
