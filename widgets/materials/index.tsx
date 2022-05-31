import useSWR from 'swr';

import { MaterialsResponse } from '../../pages/api/materials';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  onSelectMaterial: (materialId: string) => void;
}

export const Materials = (props: Props) => {
  const { data, error } = useSWR<MaterialsResponse>("/api/materials", fetcher);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.materialCategories.map((category) => (
        <div key={category.nameKey}>
          <h2>{category.nameKey}</h2>
          <ul>
            {category.materialVariants.map((materialVariant) => (
              <div key={materialVariant.nameKey}>
                {materialVariant.nameKey}
                {materialVariant.materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => props.onSelectMaterial(material.id)}
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
