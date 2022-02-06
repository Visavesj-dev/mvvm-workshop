import { Table, TableBody } from "baseUI/table";
import useViewModel from "./useViewModel";
import { TableColumn } from "./components/tableColumn";
import { TableRow } from "./components/tableRow";
import Toggle from "baseUI/button/toggle";

export const OverallPage = () => {
  const { finalData, onRemoveData, onDuplicateData, toggle, setToggle } =
    useViewModel();

  return (
    <div className=" p-8 pt-[72px] mx-auto">
      <Toggle enabled={toggle} setEnabled={() => setToggle(!toggle)} />
      <Table>
        <TableColumn />
        <TableBody>
          {finalData()?.map(
            (entry, index) =>
              entry && (
                <TableRow
                  data={entry}
                  index={index}
                  onRemove={onRemoveData}
                  onDuplicateData={onDuplicateData}
                  error={entry.isError}
                />
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
};
