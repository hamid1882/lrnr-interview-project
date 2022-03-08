import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  selectAllDocuments,
  renderCurrentContainer,
  deleteCollection,
  renameCollection,
  deleteSingleFile,
  addNewFile,
  renameSingleFile,
} from "../Features/EditorSlice";
import DrawerCustomFunctions from "./DrawerCustomFunctions";
import Dfin from "./Dfin";

const Drawer = ({ handleDrawerClick, isDrawerOpen, currentTheme, isTab }) => {
  const [selected, setSelected] = React.useState([]);
  const dispatch = useDispatch();
  const allData = useSelector(selectAllDocuments);

  // Container's reference
  const containerRef = useRef();

  // Leaf's reference
  const leafRef = useRef();

  // get all the node id's onSelect
  const handleSelect = (event, nodeIds) => {
    setSelected(Number(nodeIds));
  };

  // dispatching current selected node id
  useEffect(() => {
    dispatch(renderCurrentContainer(selected));
  }, [dispatch, selected]);

  // Insert a new collection
  const { handleAddNewCollection } = DrawerCustomFunctions();

  const [isOpenChangeName, setIsOpenChangeName] = useState(false);

  // delete collection
  const handleDeleteCollection = () => {
    if (selected > 1) {
      dispatch(deleteCollection(selected));
    }
  };

  const [isOpenChangeLeaf, setIsOpenChangeLeaf] = useState(false);
  const [renameCollectionValue, setRenameCollectionValue] = useState("");

  // rename collection
  const handleRenameCollection = () => {
    setIsOpenChangeName(!isOpenChangeName);
  };

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

  // add a new file
  const handleNewFile = () => {
    const currentParentId = Number(containerRef.current.id);
    const lastLeafId = allData[currentParentId - 1].leaf.length - 1;
    const currentContainerNodeId =
      allData[currentParentId - 1].leaf[lastLeafId].nodeId;

    const incrementCurrentId = currentContainerNodeId + 0.1;
    const toBeFixed = incrementCurrentId.toFixed(1);

    if (toBeFixed <= currentParentId + 0.9) {
      dispatch(
        addNewFile({
          id: currentParentId - 1,
          addFile: {
            nodeId: parseFloat(toBeFixed),
            label: `File ${parseFloat(toBeFixed)}`,
            value: `Edit me i am File ${parseFloat(toBeFixed)}`,
            type: "text",
          },
        })
      );
    }
  };

  // delete single file
  const handleDeleteSingleFile = () => {
    const currentParentId = Number(containerRef.current.id);
    if (selected > currentParentId + 0.1) {
      dispatch(
        deleteSingleFile({
          id: currentParentId - 1,
          currentFile: parseFloat(selected),
        })
      );
    }
  };

  // Leaf rename
  const [renameLeafValue, setRenameLeafValue] = useState("");
  const leafInputRef = useRef();

  const handleRenameLeaf = () => {
    setIsOpenChangeLeaf(!isOpenChangeLeaf);
  };

  const handleSaveLeafName = (e) => {
    e.preventDefault();
    setRenameLeafValue(e.target.value);
  };

  const handleChangeLeafName = () => {
    const currentLeaf = selected;
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
    const currentLeaf = selected;
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
  const switchTheme = currentTheme ? "dark-mode btn-hover" : "light-mode";

  // Check menu's

  const isAllMenu = isTab === "all" ? "tab-open" : "tab-collapse";
  const isGraphMenu = isTab === "graph" ? "tab-open" : "tab-collapse";
  const isBoard = isTab === "board" ? "tab-open" : "tab-collapse";
  const isRecent = isTab === "recent" ? "tab-open" : "tab-collapse";

  return (
    <div className={`drawer-custom-styles ${collapseDrawer} ${switchTheme}`}>
      <Dfin
        currentTheme={currentTheme}
        switchTheme={switchTheme}
        handleAddNewCollection={handleAddNewCollection}
        handleDrawerClick={handleDrawerClick}
      />
      <div className={`container text-center welcome-container ${isGraphMenu}`}>
        <h2>Graph View...</h2>
      </div>
      <div className={`container text-center welcome-container ${isBoard}`}>
        <h2>All Boards...</h2>
      </div>
      <div className={`container text-center welcome-container ${isRecent}`}>
        <h2>Recent Files...</h2>
      </div>
      <div className={isAllMenu}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 645, flexGrow: 1, maxWidth: 450, overflowY: "auto" }}
          onNodeSelect={handleSelect}
          selected={selected}
        >
          <TreeItem nodeId="0" label="All Collections">
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
                      selected === value.nodeId ? "d-flex" : "d-none"
                    }`}
                  >
                    <button
                      className={`btn shadow-none bg-transparent ${switchTheme}`}
                      onClick={handleNewFile}
                      id={value.nodeId}
                      ref={containerRef}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                    <button
                      className={`btn shadow-none bg-transparent ${switchTheme}`}
                      onClick={handleRenameCollection}
                      id={value.nodeId}
                      ref={containerRef}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      className={`btn shadow-none bg-transparent ${switchTheme}`}
                      onClick={handleDeleteCollection}
                      id={value.nodeId}
                      ref={containerRef}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>

                  <div
                    className={`p-2 collection-rename-container ${
                      isOpenChangeName && selected === value.nodeId
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
                            selected === leafValue.nodeId &&
                            Number(containerRef.current.id) === value.nodeId
                              ? "d-flex "
                              : "d-none"
                          }`}
                        >
                          <button
                            className={`btn shadow-none bg-transparent ${
                              isOpenChangeLeaf ? "d-none" : "d-flex"
                            } ${switchTheme}`}
                            onClick={handleRenameLeaf}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className={`btn shadow-none bg-transparent ${
                              isOpenChangeLeaf ? "d-flex" : "d-none"
                            } ${switchTheme}`}
                            onClick={handleRenameLeaf}
                          >
                            <i className="fa fa-remove"></i>
                          </button>
                          <button
                            className={`btn shadow-none bg-transparent ${switchTheme}`}
                            onClick={() => {
                              navigator.clipboard.writeText(leafValue.value);
                            }}
                          >
                            <i className="fa fa-clone"></i>
                          </button>
                          <button
                            className={`btn shadow-none bg-transparent ${switchTheme}`}
                            onClick={handleDeleteSingleFile}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                        <div
                          className={`p-2 collection-rename-leaf ${
                            isOpenChangeLeaf && selected === leafValue.nodeId
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
    </div>
  );
};

export default Drawer;
