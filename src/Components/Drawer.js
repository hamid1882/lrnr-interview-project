import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {
  selectAllDocuments,
  renderCurrentContainer,
  addNewCollection,
  deleteCollection,
  renameCollection,
  deleteSingleFile,
  addNewFile,
  renameSingleFile,
} from "../Features/EditorSlice";

const Drawer = ({ handleDrawerClick, isDrawerOpen, currentTheme }) => {
  const allData = useSelector(selectAllDocuments);
  const [selected, setSelected] = React.useState([]);
  const [isOpenChangeName, setIsOpenChangeName] = useState(false);
  const [isOpenChangeLeaf, setIsOpenChangeLeaf] = useState(false);
  const dispatch = useDispatch();

  const containerRef = useRef();
  const leafRef = useRef();

  useEffect(() => {
    dispatch(renderCurrentContainer(Number(selected)));
  }, [dispatch, selected]);

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const currentContainer = allData[allData.length - 1].nodeId;

  const insertThisData = {
    name: "container-node",
    nodeId: currentContainer + 1,
    label: `Collection ${currentContainer + 1}`,
    id: currentContainer + 1,
    leaf: [
      {
        nodeId: currentContainer + 1 + 0.1,
        label: `File ${currentContainer + 1 + ".1"}`,
        id: 5,
      },
    ],
  };

  // Add new collection
  const handleAddNewCollection = () => {
    if (currentContainer <= 8) {
      dispatch(addNewCollection(insertThisData));
    }
  };

  // add a new file
  const handleNewFile = () => {
    const currentParentId = Number(containerRef.current.id);
    const currentContainerNodeId =
      allData[currentParentId - 1].leaf[
        allData[currentParentId - 1].leaf.length - 1
      ].nodeId;

    const incrementCurrentId = currentContainerNodeId + 0.1;
    const toBeFixed =
      incrementCurrentId >= 1.9
        ? incrementCurrentId.toFixed(2)
        : incrementCurrentId.toFixed(1);

    if (toBeFixed <= currentParentId + 0.9) {
      dispatch(
        addNewFile({
          id: currentParentId - 1,
          addFile: {
            nodeId: parseFloat(toBeFixed),
            label: `File ${parseFloat(toBeFixed)}`,
            id: 2,
          },
        })
      );
    }
  };

  // delete existing file
  const handleDeleteFile = () => {
    if (Number(selected) > 1) {
      dispatch(deleteCollection(Number(selected)));
    }
  };

  // delete single file with id
  const handleDeleteSingleFile = () => {
    const currentParentId = Number(containerRef.current.id);
    if (parseFloat(selected) > currentParentId + 0.1) {
      dispatch(
        deleteSingleFile({
          id: currentParentId - 1,
          currentFile: parseFloat(selected),
        })
      );
    }
  };

  // rename collection
  const handleRenameCollection = () => {
    if (isOpenChangeName === false) {
      setIsOpenChangeName(true);
    } else {
      setIsOpenChangeName(false);
    }
  };

  const [renameCollectionValue, setRenameCollectionValue] = useState("");

  const handleRenameChange = (e) => {
    e.preventDefault();
    setRenameCollectionValue(e.target.value);
  };

  const handleSaveCollectionName = () => {
    const currentParentId = Number(containerRef.current.id);
    dispatch(
      renameCollection({
        id: currentParentId - 1,
        newName: renameCollectionValue,
      })
    );
    setIsOpenChangeName(false);
  };

  const handleOnKeyPress = (event) => {
    const currentParentId = Number(containerRef.current.id);
    if (event.key === "Enter") {
      dispatch(
        renameCollection({
          id: currentParentId - 1,
          newName: renameCollectionValue,
        })
      );
      setIsOpenChangeName(false);
    }
  };

  // Leaf rename
  const [renameLeafValue, setRenameLeafValue] = useState("");

  const leafInputRef = useRef();

  const handleRenameLeaf = () => {
    if (isOpenChangeLeaf === false) {
      setIsOpenChangeLeaf(true);
    } else {
      setIsOpenChangeLeaf(false);
    }
  };

  const handleSaveLeafName = (e) => {
    e.preventDefault();
    setRenameLeafValue(e.target.value);
  };

  const handleChangeLeafName = () => {
    const currentLeaf = Number(selected);
    const currentParentId = Number(containerRef.current.id);
    const currentLeafId = currentLeaf.toString().slice(2, 3);
    if (currentLeafId <= 9) {
      dispatch(
        renameSingleFile({
          id: currentParentId - 1,
          leafId: Number(currentLeafId - 1),
          name: renameLeafValue,
        })
      );
    }
    setIsOpenChangeLeaf(false);
    setRenameLeafValue("");
  };

  const handleOnKeyLeafPress = (event) => {
    const currentLeaf = Number(selected);
    const currentParentId = Number(containerRef.current.id);
    const currentLeafId = currentLeaf.toString().slice(2, 3);
    if (currentLeafId <= 9 && event.key === "Enter") {
      dispatch(
        renameSingleFile({
          id: currentParentId - 1,
          leafId: Number(currentLeafId - 1),
          name: renameLeafValue,
        })
      );
      setIsOpenChangeLeaf(false);
      setRenameLeafValue("");
    }
  };

  useEffect(() => {
    if (isOpenChangeLeaf === true) {
      leafInputRef.current.focus();
    }
  }, [isOpenChangeLeaf]);

  // drawer transition style
  const collapseDrawer = isDrawerOpen ? "drawer-open" : "drawer-collapse";

  return (
    <div
      className={`drawer-custom-styles  ${collapseDrawer} ${
        currentTheme ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="row shadow mb-2">
        <button
          className={`btn shadow-none col col-4 ${
            currentTheme ? "text-light" : ""
          }`}
        >
          DFIN
        </button>
        <div className="col col-8 d-flex justify-content-end">
          <button
            className={`btn shadow-none ${
              currentTheme ? "dark-mode btn-hover" : "light-mode"
            }`}
            onClick={handleAddNewCollection}
          >
            <i className="fa fa-plus"></i>
          </button>
          <button
            className={`btn shadow-none ${
              currentTheme ? "dark-mode btn-hover" : "light-mode"
            }`}
          >
            <i className="fa fa-expand"></i>
          </button>
          <button
            className={`btn shadow-none ${
              currentTheme ? "dark-mode btn-hover" : "light-mode"
            }`}
            onClick={handleDrawerClick}
          >
            <i className="fa fa-angle-double-left"></i>
          </button>
        </div>
      </div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 850, flexGrow: 1, maxWidth: 450, overflowY: "auto" }}
        onNodeSelect={handleSelect}
        selected={selected}
      >
        <TreeItem nodeId="0" label="All Documents">
          {allData &&
            allData.map((value, idx) => (
              <TreeItem
                nodeId={String(value.nodeId)}
                label={value.label}
                collapseIcon={<ExpandMoreIcon />}
                key={idx}
              >
                <div
                  className={`drawer-btn ${
                    Number(selected) === value.nodeId ? "d-flex" : "d-none"
                  }`}
                >
                  <button
                    className={`btn shadow-none bg-transparent ${
                      currentTheme ? "dark-mode btn-hover" : "light-mode"
                    }`}
                    onClick={handleNewFile}
                    id={value.nodeId}
                    ref={containerRef}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    className={`btn shadow-none bg-transparent ${
                      currentTheme ? "dark-mode btn-hover" : "light-mode"
                    }`}
                    onClick={handleRenameCollection}
                    id={value.nodeId}
                    ref={containerRef}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className={`btn shadow-none bg-transparent ${
                      currentTheme ? "dark-mode btn-hover" : "light-mode"
                    }`}
                    onClick={handleDeleteFile}
                    id={value.nodeId}
                    ref={containerRef}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>

                <div
                  className={`p-2 collection-rename-container ${
                    isOpenChangeName && Number(selected) === value.nodeId
                      ? "d-block"
                      : "d-none"
                  }`}
                >
                  <input
                    type="text"
                    className="collection-rename-input"
                    onChange={handleRenameChange}
                    value={renameCollectionValue}
                    onKeyPress={handleOnKeyPress}
                  />
                  <div className="d-flex gap-2 my-2">
                    <button
                      className="btn btn-success shadow-none"
                      onClick={handleSaveCollectionName}
                    >
                      Done
                    </button>
                    <button
                      className="btn btn-danger shadow-none"
                      onClick={handleRenameCollection}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                {value.leaf &&
                  value.leaf.map((leafValue, idx) => (
                    <div key={leafValue.nodeId}>
                      <TreeItem
                        nodeId={String(leafValue.nodeId)}
                        label={leafValue.label}
                        ref={leafRef}
                        id={leafValue.label}
                      ></TreeItem>
                      <div
                        className={`drawer-btn justify-content-center align-items-center ${
                          Number(selected) === leafValue.nodeId &&
                          Number(containerRef.current.id) === value.nodeId
                            ? "d-flex "
                            : "d-none"
                        }`}
                      >
                        <button
                          className={`btn shadow-none bg-transparent ${
                            isOpenChangeLeaf ? "d-none" : "d-flex"
                          } ${
                            currentTheme ? "dark-mode btn-hover" : "light-mode"
                          }`}
                          onClick={handleRenameLeaf}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className={`btn shadow-none bg-transparent ${
                            isOpenChangeLeaf ? "d-flex" : "d-none"
                          } ${
                            currentTheme ? "dark-mode btn-hover" : "light-mode"
                          }`}
                          onClick={handleRenameLeaf}
                        >
                          <i className="fa fa-remove"></i>
                        </button>
                        <button
                          className={`btn shadow-none bg-transparent ${
                            currentTheme ? "dark-mode btn-hover" : "light-mode"
                          }`}
                          onClick={() => {
                            navigator.clipboard.writeText(leafValue.label);
                          }}
                        >
                          <i className="fa fa-clone"></i>
                        </button>
                        <button
                          className={`btn shadow-none bg-transparent ${
                            currentTheme ? "dark-mode btn-hover" : "light-mode"
                          }`}
                          onClick={handleDeleteSingleFile}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                      <div
                        className={`p-2 collection-rename-leaf ${
                          isOpenChangeLeaf &&
                          Number(selected) === leafValue.nodeId
                            ? "d-block"
                            : "d-none"
                        }`}
                      >
                        <input
                          type="text"
                          className=" border-0 shadow-none"
                          onChange={handleSaveLeafName}
                          value={renameLeafValue}
                          ref={leafInputRef}
                          onKeyPress={handleOnKeyLeafPress}
                        />
                        <button
                          className={`btn shadow-none btn-check-rename ${
                            renameLeafValue.length > 1 ? "d-block" : "d-none"
                          }`}
                          onClick={handleChangeLeafName}
                        >
                          <i className="fa fa-check text-success"></i>
                        </button>
                      </div>
                    </div>
                  ))}
              </TreeItem>
            ))}
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Drawer;
