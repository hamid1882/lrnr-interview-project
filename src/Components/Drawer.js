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
  deleteSingleFile,
  addNewFile,
} from "../Features/EditorSlice";

const Drawer = ({ handleDrawerClick, isDrawerOpen }) => {
  const allData = useSelector(selectAllDocuments);

  // eslint-disable-next-line
  const [currentActive, setCurrentActive] = useState("Documents");
  const [selected, setSelected] = React.useState([]);

  // console.log(Number(selected));

  const handleCurrentFile = () => {
    // console.log(Number(selected));
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const currentContainer = allData[allData.length - 1].nodeId;

  const dispatch = useDispatch();

  const insertThisData = {
    name: "container-node",
    nodeId: currentContainer + 1,
    label: `Collection ${currentContainer + 1}`,
    id: currentContainer + 1,
    leaf: [
      {
        nodeId: 2.1,
        label: `File 10.1`,
        id: 5,
      },
    ],
  };

  // Add new collection
  const handleAddNewCollection = () => {
    dispatch(addNewCollection(insertThisData));
  };

  const containerRef = useRef();

  // add a new file
  const handleNewFile = () => {
    const currentContainerId = parseFloat(selected) + 1;
    dispatch(
      addNewFile({
        id: containerRef.current.id - 1,
        addFile: {
          nodeId: currentContainerId,
          label: `File ${currentContainerId}`,
          id: 2,
        },
      })
    );
  };

  console.log(selected);

  // delete existing file
  const handleDeleteFile = () => {
    console.log("delete collection");
    dispatch(deleteCollection(Number(selected)));
  };

  // delete single file with id
  const handleDeleteSingleFile = () => {
    if (parseFloat(selected) > 1.1) {
      dispatch(deleteSingleFile(parseFloat(selected)));
    }
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
                <div className="drawer-btn">
                  <button
                    className="btn shadow-none"
                    onClick={handleNewFile}
                    id={value.nodeId}
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
                    <div key={leafValue.nodeId}>
                      <TreeItem
                        nodeId={String(leafValue.nodeId)}
                        label={leafValue.label}
                        onClick={handleCurrentFile}
                      ></TreeItem>
                      <div className="drawer-btn">
                        <button className="btn shadow-none">
                          <i className="fa fa-clone"></i>
                        </button>
                        <button
                          className="btn shadow-none"
                          onClick={handleDeleteSingleFile}
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
