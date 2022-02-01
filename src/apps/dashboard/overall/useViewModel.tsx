import { useEffect, useState } from "react";
import { getData } from "service/getData";

interface DataProps {
  id: number;
  profileImage: string;
  name: string;
}

const useViewModel = () => {
  const [data, setData] = useState<DataProps[]>();
  const [errorsRows, setErrorsRows] = useState<number[]>([]);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  const onRemoveData = (index: number) => {
    const itemData = data?.filter((item, i) => {
      return i !== index;
    });

    setData(itemData);
  };

  const onDuplicateData = (index: number) => {
    if (data) {
      const newData = data;
      const newBulletPoint = {
        id: index,
        profileImage: data[index].profileImage,
        name: data[index].name,
      };

      newData?.splice(index, 0, newBulletPoint);

      setData([...newData]);

      data?.filter((item, index) => {
        if (item.name === data[index].name) {
          setErrorsRows([...errorsRows, index]);
        }
      });
    }
  };

  return { data, onRemoveData, onDuplicateData, errorsRows };
};

export default useViewModel;
