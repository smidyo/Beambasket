import Image from 'next/image';
import { useContext, useMemo } from 'react';
import { mutate } from 'swr';

import { MakeWidgetContext } from '../..';
import { DesignResponse } from '../../../../pages/api/user/designs';
import { ActionType, Stage } from '../../state';

interface Props {}

export const MakeWidgetSidebarDesign = (props: Props) => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  const handleFile = async (file: File) => {
    dispatch({
      type: ActionType.SetDesignUploading,
      payload: true,
    });

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/user/designs", {
      method: "POST",
      body: formData,
    }).then((res) => res.json() as Promise<DesignResponse>);

    dispatch({
      type: ActionType.SetDesignId,
      payload: res.id,
    });

    dispatch({
      type: ActionType.SetDesignUploading,
      payload: false,
    });

    mutate("/api/user/designs");
  };

  const activeDesign = useMemo(() => {
    return state.designs?.find((design) => design.id === state.designId);
  }, [state.designId, state.designs]);

  return (
    <div className="flex flex-col">

      {activeDesign && (
        <>
          {activeDesign.name}
          <img
            src={`/api/user/files/${activeDesign.previewSvgFileId}`}
            alt="preview"
            width="150"
            height="150"
          />
        </>
      )}

      {state.designUploading && <div>Uploading...</div>}

      <input
        type="file"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />

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
