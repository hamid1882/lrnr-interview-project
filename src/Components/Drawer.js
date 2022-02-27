import React, { useState, useRef } from "react";
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

  // eslint-disable-next-line
  const handleCurrentFile = (current) => {
    const currentFile = current.target.innerHTML;
    setCurrentActive(currentFile);
  };

  const dispatch = useDispatch();

  let currentData = allData[allData.length - 1].id;
  // console.log(currentData);
  // let currentFile = currentData

  const insertThisData = {
    name: "container-node",
    nodeId: `Collection ${currentData + 1}`,
    label: `Collection ${currentData + 1}`,
    id: currentData + 1,
    leaf: [
      {
        nodeId: "File 1",
        label: "File 1",
        id: 1,
      },
    ],
  };

  const containerRef = useRef();
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
        addFile: { nodeId: "Collection 1.4", label: "Document 1.1.2" },
      })
    );
  };

  // delete existing file
  const handleDeleteFile = () => {
    const currentContainer = Number(containerRef.current.id);
    console.log(currentData);
    // if (allData.length > 1) {
    //   dispatch(deleteCollection(currentData));
    // }
  };

  const leafRef = useRef();
  // delete single file with id
  const deleteSingleFile = () => {
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
                endIcon={<i className="fa fa-plus"></i>}
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
                  value.leaf.map((value, idx) => (
                    <div key={idx}>
                      <TreeItem
                        nodeId={value.nodeId}
                        label={value.label}
                      ></TreeItem>
                      <div className="drawer-btn">
                        <button
                          className="btn shadow-none"
                          onClick={handleNewFile}
                          ref={containerRef}
                          id={value.id}
                        >
                          <i className="fa fa-clone"></i>
                        </button>
                        <button
                          className="btn shadow-none"
                          id={value.id}
                          onClick={deleteSingleFile}
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
