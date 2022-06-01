import { useContext, useMemo } from 'react';

import { MakeWidgetContext } from '../..';
import { ActionType, Stage } from '../../state';

interface Props {}

export const MakeWidgetSidebarDesign = (props: Props) => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  return (
    <div className="flex flex-col">
      <div>Your designs</div>

      {state.designs?.designs.map((design) => (
        <div key={design.id}>{design.id}</div>
      ))}

      <button
        onClick={() =>
          dispatch({ type: ActionType.SetStage, payload: Stage.Manufacture })
        }
      >
        Next
      </button>
      <button
        onClick={() =>
          dispatch({ type: ActionType.SetStage, payload: Stage.Material })
        }
      >
        Back
      </button>
    </div>
  );
};
