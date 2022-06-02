import Image from 'next/image';
import { useContext } from 'react';
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
      type: ActionType.SetDesignUploading,
      payload: false,
    });

    mutate("/api/user/designs");
  };

  // move this into content area instead. Leave only upload on the sidebar.

  console.log(state.designs);

  return (
    <div className="flex flex-col">
      <div>Your designs</div>

      {state.designs?.designs.map((design) => (
        <div key={design.id}>
          {design.id}
          <img
            src={`/api/user/files/${design.previewSvgFileId}`}
            alt="preview"
            width="150"
            height="150"
          />
        </div>
      ))}

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
