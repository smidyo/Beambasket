import { useContext } from 'react';

import { MakeWidgetContext } from '../..';
import { ActionType } from '../../state';

export const MakeWidgetContentDesign = () => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  return (
    <>
      <div>Your designs</div>

      <div className="grid grid-flow-row grid-cols-3">
        {state.designs?.map((design) => (
          <div
            key={design.id}
            className={` ${state.designId === design.id ? "bg-red-300" : ""}`}
            onClick={() => {
              dispatch({
                type: ActionType.SetDesignId,
                payload: design.id,
              });
            }}
          >
            {design.name}
            <img
              src={`/api/user/files/${design.previewSvgFileId}`}
              alt="preview"
              width="150"
              height="150"
            />
          </div>
        ))}
      </div>
    </>
  );
};
