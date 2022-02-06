import { useEffect, useState } from "react";
import { getData } from "service/getData";

interface DataProps {
  id: number;
  profileImage: string;
  name: string;
  isError: boolean;
}

const useViewModel = () => {
  const [data, setData] = useState<DataProps[]>();
  const [errorsRows] = useState<number[]>([0, 3]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getData().then((response) => {
      const responseData = response.map((item, i) => {
        return { ...item, isError: errorsRows.includes(i) };
      });

      setData(responseData);
    });
  }, []);

  // Pure Function
  const onRemoveData = (index: number) => {
    const itemData = data?.filter((item, i) => {
      return i !== index;
    });

    setData(itemData);
  };

  // Pure Function
  const onDuplicateData = (index: number) => {
    if (data) {
      const newBulletPoint = {
        id: index,
        profileImage: data[index].profileImage,
        name: data[index].name,
        isError: data[index].isError,
      };

      data?.splice(index, 0, newBulletPoint);
      setData([...data]);
    }
  };

  // Pure Function
  const finalData = () => {
    if (toggle) {
      const errorData = data?.map((item) => {
        if (item.isError) {
          return item;
        }
      });
      return errorData;
    } else {
      return data;
    }
  };

  return {
    data,
    onRemoveData,
    onDuplicateData,
    errorsRows,
    toggle,
    setToggle,
    finalData,
  };
};

export default useViewModel;
