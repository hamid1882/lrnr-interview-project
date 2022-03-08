import { useSelector, useDispatch } from "react-redux";
import { selectAllDocuments, addNewCollection } from "../Features/EditorSlice";

const DrawerCustomFunctions = () => {
  const dispatch = useDispatch();
  const allData = useSelector(selectAllDocuments);

  // Getting id of the last collection
  const currentContainer = allData[allData.length - 1].nodeId;

  const newCollection = {
    nodeId: currentContainer + 1,
    label: `Collection ${currentContainer + 1}`,
    id: currentContainer + 1,
    leaf: [
      {
        nodeId: currentContainer + 1 + 0.1,
        label: `File ${currentContainer + 1 + ".1"}`,
        value: `Edit me i am ${currentContainer + 1 + ".1"}`,
        type: "text",
      },
    ],
  };

  // Add new collection
  const handleAddNewCollection = () => {
    if (currentContainer <= 8) {
      dispatch(addNewCollection(newCollection));
    }
  };

  return { handleAddNewCollection };
};

export default DrawerCustomFunctions;
