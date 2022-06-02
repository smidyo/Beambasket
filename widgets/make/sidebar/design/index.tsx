import { useContext, useMemo } from 'react';

import { MakeWidgetContext } from '../..';
import { ActionType, Stage } from '../../state';

interface Props {}

export const MakeWidgetSidebarDesign = (props: Props) => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  const handleFile = (file: File) => {
    
  }

  return (
    <div className="flex flex-col">
      <div>Your designs</div>

      {state.designs?.designs.map((design) => (
        <div key={design.id}>{design.id}</div>
      ))}

      <input type="file" onChange={e => e.target.files && handleFile(e.target.files[0])}/>

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
