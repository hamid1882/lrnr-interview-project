import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {
  selectAllDocuments,
  addNewCollection,
  deleteCollection,
  addNewFile,
} from "../Features/EditorSlice";

const Drawer = ({ handleDrawerClick, isDrawerOpen }) => {
  const allData = useSelector(selectAllDocuments);

  // eslint-disable-next-line
  const [currentActive, setCurrentActive] = useState("Documents");
  const [currentRefId, setCurrentRefId] = useState(0);

  // eslint-disable-next-line
  const handleCurrentFile = (current) => {
    const currentFile = current.target.innerHTML;
    setCurrentActive(currentFile);
  };

  const containerRef = useRef();

  const dispatch = useDispatch();

  let currentData = allData[allData.length - 1].id;

  let currentFile = allData.map((value) => value.leaf);

  const currentFileId = currentFile[0][currentFile[0].length - 1].id;

  const insertThisData = {
    name: "container-node",
    nodeId: `Collection ${currentData + 1}`,
    label: `Collection ${currentData + 1}`,
    id: currentData + 1,
    leaf: [
      {
        nodeId: `File ${currentFileId}`,
        label: `File ${currentFileId}`,
        id: currentFileId,
      },
    ],
  };

  // Add new collection
  const handleAddNewCollection = () => {
    dispatch(addNewCollection(insertThisData));
  };

  // add a new file
  const handleNewFile = () => {
    const currentContainer = Number(containerRef.current.id);
    dispatch(
      addNewFile({
        id: currentContainer - 1,
        addFile: {
          nodeId: `File ${currentFileId + 1}`,
          label: `File ${currentFileId + 1}`,
          id: currentFileId + 1,
        },
      })
    );
  };

  // delete existing file
  const handleDeleteFile = () => {
    const currentContainer = Number(containerRef.current.id);
    console.log(currentContainer);
    if (currentContainer > 1) {
      dispatch(deleteCollection(currentContainer));
    }
  };

  const leafRef = useRef();
  // delete single file with id
  const deleteSingleFile = (e) => {
    console.log(leafRef.current.id);
  };

  // drawer transition style
  const collapseDrawer = isDrawerOpen ? "drawer-open" : "drawer-collapse";

  return (
    <div className={`drawer-custom-styles bg-light ${collapseDrawer}`}>
      <div className="row shadow mb-2">
        <button className="btn shadow-none col col-4">DFIN</button>
        <div className="col col-8 d-flex justify-content-end">
          <button className="btn shadow-none" onClick={handleAddNewCollection}>
            <i className="fa fa-plus"></i>
          </button>
          <button className="btn shadow-none">
            <i className="fa fa-expand"></i>
          </button>
          <button className="btn shadow-none" onClick={handleDrawerClick}>
            <i className="fa fa-angle-double-left"></i>
          </button>
        </div>
      </div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 850, flexGrow: 1, maxWidth: 450, overflowY: "auto" }}
      >
        <TreeItem nodeId="0" label="All Documents">
          {allData &&
            allData.map((value, idx) => (
              <TreeItem
                nodeId={value.nodeId}
                label={value.label}
                collapseIcon={<ExpandMoreIcon />}
                key={idx}
              >
                <div className="drawer-btn">
                  <button
                    className="btn shadow-none"
                    onClick={handleNewFile}
                    id={value.id}
                    ref={containerRef}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    className="btn shadow-none"
                    onClick={handleDeleteFile}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
                {value.leaf &&
                  value.leaf.map((leafValue, idx) => (
                    <div key={leafValue.id}>
                      <TreeItem
                        nodeId={leafValue.nodeId}
                        label={leafValue.label}
                      ></TreeItem>
                      <div className="drawer-btn">
                        <button className="btn shadow-none">
                          <i className="fa fa-clone"></i>
                        </button>
                        <button
                          className="btn shadow-none"
                          onClick={deleteSingleFile}
                          id={leafValue.id}
                          ref={leafRef}
                        >
                          <i className="fa fa-trash"></i>
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
