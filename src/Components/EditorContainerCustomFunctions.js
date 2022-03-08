import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentId,
  selectAllDocuments,
  renameFileValue,
  addNewFile,
  changeFileType,
} from "../Features/EditorSlice";

const EditorContainerCustomFunctions = () => {
  const allDocuments = useSelector(selectAllDocuments);
  const selectedNodeId = useSelector(selectCurrentId);

  const containerId = selectedNodeId.toString().charAt(0);
  const leafId = selectedNodeId.toString().charAt(2);

  // id's of container and leaf elements
  const lastCollection = allDocuments.length - 1;
  const lastLeaf = allDocuments[lastCollection].leaf.length - 1;
  const lastleafId = allDocuments[lastCollection].leaf[lastLeaf].nodeId;
  const incrementer = lastleafId + 0.1;
  const onlyTwo = incrementer.toFixed(1);

  const currentCollection =
    allDocuments[Number(containerId - 1)] === undefined
      ? "Choose Collection"
      : allDocuments[Number(containerId) - 1].label;

  const conditionedLeaf = Number(leafId) > 0 ? Number(leafId) - 1 : 0;

  const currentLeaf =
    allDocuments[Number(containerId - 1)] !== undefined &&
    allDocuments[Number(containerId - 1)].leaf[Number(leafId) - 1] !==
      undefined &&
    selectedNodeId.toString().includes(".")
      ? allDocuments[Number(containerId - 1)].leaf[conditionedLeaf]
      : "";

  const renderMyValue =
    currentLeaf.value === undefined ? "" : currentLeaf.value;

  const checkcurrentLeaf =
    currentLeaf.value === undefined ? "text" : currentLeaf.value;

  const currentDataType = checkcurrentLeaf.includes(".jpg") ? "image" : "text";

  useEffect(() => {
    setCurrentText(renderMyValue);
  }, [currentLeaf]);

  const [currentText, setCurrentText] = useState(renderMyValue);

  const newFile = {
    nodeId: Number(onlyTwo),
    label: `WYSIWYG ${
      Number(containerId) + "." + allDocuments[lastCollection].leaf.length
    }`,
    value: currentText,
    type: currentDataType,
  };

  const [isSaved, setIsSaved] = useState(false);

  const dispatch = useDispatch();

  const saveAsNewFile = () => {
    dispatch(
      addNewFile({
        id: Number(containerId) - 1,
        addFile: newFile,
      })
    );
  };

  const handleUpdateValue = () => {
    dispatch(
      renameFileValue({
        id: Number(containerId - 1),
        leafId: Number(leafId - 1),
        value: currentText,
        type: currentDataType,
      })
    );
    setIsSaved(true);
  };

  const handleChangeType = () => {
    dispatch(
      changeFileType({
        id: Number(containerId - 1),
        leafId: Number(leafId - 1),
        type: currentDataType,
      })
    );
  };

  return {
    containerId,
    leafId,
    currentCollection,
    currentLeaf,
    onlyTwo,
    lastCollection,
    renderMyValue,
    checkcurrentLeaf,
    currentDataType,
    currentText,
    setCurrentText,
    newFile,
    isSaved,
    setIsSaved,
    saveAsNewFile,
    handleUpdateValue,
    handleChangeType,
  };
};

export default EditorContainerCustomFunctions;
