import React, { useEffect, useReducer } from 'react';

import { MakeWidgetContentMaterial } from './content/material';
import { MakeWidgetSidebarDesign } from './sidebar/design';
import { MakeWidgetSidebarMaterial } from './sidebar/material';
import { Action, ActionType, initialState, reducer, Stage, State } from './state';

export interface MakeWidgetProps {
  basketPartId: string;
}

export const MakeWidgetContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>(null as any);

export const MakeWidget = (props: MakeWidgetProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.materialsLoading || state.materialsLoaded) {
      return;
    }

    dispatch({ type: ActionType.SetMaterialsLoading, payload: true });

    fetch("/api/materials")
      .then((res) => res.json())
      .then((materials) => {
        dispatch({
          type: ActionType.SetMaterials,
          payload: materials,
        });
      });
  }, [state.materialsLoading, state.materialsLoaded]);

  useEffect(() => {
    if (state.designsLoading || state.designsLoaded) {
      return;
    }

    dispatch({ type: ActionType.SetDesignsLoading, payload: true });

    fetch("/api/user/designs")
      .then((res) => res.json())
      .then((designs) => {
        dispatch({
          type: ActionType.SetDesigns,
          payload: designs,
        });
      });
  }, [state.designsLoading, state.designsLoaded]);

  return (
    <MakeWidgetContext.Provider value={{ state, dispatch }}>
      <div className="flex">
        <div className="w-96">
          {state.stage === Stage.Material ? (
            <MakeWidgetSidebarMaterial />
          ) : (
            <MakeWidgetSidebarDesign />
          )}
        </div>
        <div className="flex-grow">
          <MakeWidgetContentMaterial />
        </div>
      </div>
    </MakeWidgetContext.Provider>
  );
};
