import React, { useEffect, useReducer } from 'react';
import useSWR from 'swr';

import { MaterialsResponse } from '../../pages/api/materials';
import { DesignsResponse } from '../../pages/api/user/designs';
import { fetcher } from '../../utils/fetcher';
import { MakeWidgetContentDesign } from './content/design';
import { MakeWidgetContentManufacture } from './content/manufacture';
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

  const { data: materialsData, isValidating: materialsIsValidating } =
    useSWR<MaterialsResponse>("/api/materials", fetcher);
  const {
    data: designsData,
    isValidating: designsIsValidating,
    mutate,
  } = useSWR<DesignsResponse>("/api/user/designs", fetcher);

  console.log(designsIsValidating);

  useEffect(() => {
    if (materialsData) {
      dispatch({
        type: ActionType.SetMaterials,
        payload: materialsData,
      });
    }
  }, [materialsData]);

  useEffect(() => {
    dispatch({
      type: ActionType.SetMaterialsLoading,
      payload: materialsIsValidating,
    });
  }, [materialsIsValidating]);

  useEffect(() => {
    console.log(designsData);
    if (designsData) {
      dispatch({
        type: ActionType.SetDesigns,
        payload: designsData,
      });
    }
  }, [designsData]);

  useEffect(() => {
    dispatch({
      type: ActionType.SetDesignsLoading,
      payload: designsIsValidating,
    });
  }, [designsIsValidating]);

  return (
    <MakeWidgetContext.Provider value={{ state, dispatch }}>
      <div className="flex absolute w-full h-full">
        <div className="w-96 border-r-2">
          {state.stage === Stage.Material ? (
            <MakeWidgetSidebarMaterial />
          ) : (
            <MakeWidgetSidebarDesign />
          )}
        </div>
        <div className="flex-grow overflow-y-scroll">
          {state.stage === Stage.Material ? (
            <MakeWidgetContentMaterial />
          ) : state.stage === Stage.Design ? (
            <MakeWidgetContentDesign />
          ) : (
            <MakeWidgetContentManufacture />
          )}
        </div>
      </div>
    </MakeWidgetContext.Provider>
  );
};
