import { useContext, useMemo } from 'react';

import { MakeWidgetContext } from '../..';

export const MakeWidgetContentManufacture = () => {
  const { dispatch, state } = useContext(MakeWidgetContext);

  const activeDesign = useMemo(() => {
    return state.designs?.find((design) => design.id === state.designId);
  }, [state.designId, state.designs]);
 
  return (
    <>
      <img src={`/api/user/files/${activeDesign?.previewSvgFileId}`} alt="" />
    </>
  );
};
