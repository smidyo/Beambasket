import { useMemo, useState } from 'react';
import useSWR from 'swr';

import { MaterialsResponse } from '../../pages/api/materials';
import { fetcher } from '../../utils/fetcher';

interface Props {
    
}

export const MaterialSidebar = (props: Props) => {
  const { data, error } = useSWR<MaterialsResponse>("/api/materials", fetcher);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [materialId, setMaterialId] = useState<string | null>(null);

  const categoryData = useMemo(() => {
    if (!data) return null;
    return (
      data.materialCategories.find((category) => category.id === categoryId) ??
      null
    );
  }, [data, categoryId]);

  const variantData = useMemo(() => {
    if (!categoryData) return null;
    return (
      categoryData.materialVariants.find(
        (variant) => variant.id === variantId
      ) ?? null
    );
  }, [categoryData, variantId]);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <select
        onChange={(e) =>
          setCategoryId(e.target.value === "_" ? null : e.target.value)
        }
        value={categoryId ?? "_"}
      >
        <option value="_">Select category</option>
        {data.materialCategories.map((mc) => (
          <option key={mc.id} value={mc.id}>
            {mc.nameKey}
          </option>
        ))}
      </select>
      {categoryData && (
        <select
          onChange={(e) =>
            setVariantId(e.target.value === "_" ? null : e.target.value)
          }
          value={variantId ?? "_"}
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
            setMaterialId(e.target.value === "_" ? null : e.target.value)
          }
          value={materialId ?? "_"}
        >
          <option value="_">Select materrial</option>
          {variantData.materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nameKey}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
