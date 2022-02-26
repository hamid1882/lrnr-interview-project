import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { selectAllDocuments, addNewCollection } from "../Features/EditorSlice";

const Drawer = ({ handleDrawerClick, isDrawerOpen }) => {
  const allData = useSelector(selectAllDocuments);

  const [currentActive, setCurrentActive] = useState("Documents");

  const handleCurrentFile = (current) => {
    const currentFile = current.target.innerHTML;
    setCurrentActive(currentFile);
  };

  const dispatch = useDispatch();

  let currentData = allData[allData.length - 1].id;

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

  // Add new collection
  const handleAddNewCollection = () => {
    dispatch(addNewCollection(insertThisData));
  };

  // add a new file
  const handleNewFile = () => {
    // console.log(e);
    // dispatch(addNewFile({ nodeId: "Collection 1.4", label: "Document 1.1.2" }));
  };

  // delete existing file
  const handleDeleteFile = () => {
    console.log("delete, delete, delete");
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
                {value.leaf &&
                  value.leaf.map((value, idx) => (
                    <TreeItem
                      nodeId={value.nodeId}
                      label={value.label}
                      key={idx}
                    ></TreeItem>
                  ))}
              </TreeItem>
            ))}
        </TreeItem>
      </TreeView>
    </div>
  );
};

export default Drawer;
