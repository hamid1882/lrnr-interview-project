import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {
  selectAllDocuments,
  addNewCollection,
  addNewFile,
} from "../Features/EditorSlice";

const Drawer = ({ handleDrawerClick, isDrawerOpen }) => {
  const allData = useSelector(selectAllDocuments);

  const [currentActive, setCurrentActive] = useState("Documents");

  const handleCurrentFile = (current) => {
    const currentFile = current.target.innerHTML;
    setCurrentActive(currentFile);
  };

  // const lastElementId = allData[allData.length - 1].nodeId;
  // const lastLeafId = allData[allData.length - 1].leaf.map(
  //   (value) => value.nodeId
  // );

  let lastElementId = 1;
  let lastLeafId = 1.1;

  const insertThisData = {
    name: "container-node",
    nodeId: lastElementId++,
    label: `Collection ${lastElementId++}`,
    leaf: [
      {
        nodeId: lastLeafId++,
        label: `Collection ${lastLeafId++}`,
      },
    ],
  };

  // const newRef = useRef();

  // const addFileData = {
  //   nodeId: parseFloat(lastLeafId) + "." + 1,
  //   label: `new document ${lastLeafId}`,
  // };

  // console.log(addFileData);

  const dispatch = useDispatch();

  // Add new collection
  const handleAddNewCollection = () => {
    dispatch(addNewCollection(insertThisData));
  };

  // add a new file
  const handleNewFile = (e) => {
    // console.log(e);
    dispatch(addNewFile({ nodeId: 2, label: "Document 1.1.2" }));
    console.log("add, add, add");
  };

  // delete existing file
  const handleDeleteFile = () => {
    console.log("delete, delete, delete");
  };

  console.log(allData);

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
                nodeId={value.nodeId.toString()}
                label={value.label}
                collapseIcon={<ExpandMoreIcon />}
                endIcon={<i className="fa fa-plus"></i>}
                key={value.nodeId}
              >
                <div className="shadow mb-2">
                  <button className="btn shadow-none" onClick={handleNewFile}>
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    className="btn shadow-none"
                    onClick={handleDeleteFile}
                  >
                    <i className="fa fa-remove"></i>
                  </button>
                </div>
                {value.leaf.map((leafValue, idx) => (
                  <div key={leafValue.nodeId}>
                    <TreeItem
                      nodeId={parseFloat(leafValue.nodeId).toString()}
                      label={leafValue.label}
                      onClick={handleCurrentFile}
                    ></TreeItem>
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
