const Dfin = ({
  currentTheme,
  switchTheme,
  handleDrawerClick,
  handleAddNewCollection,
}) => {
  return (
    <div className="row shadow mb-2 dfin-style mx-auto">
      <button
        className={`btn shadow-none col col-4 ${
          currentTheme ? "text-light" : ""
        }`}
      >
        DFIN
      </button>
      <div className="col col-8 d-flex justify-content-end">
        <button
          className={`btn shadow-none ${switchTheme}`}
          onClick={handleAddNewCollection}
        >
          <i className="fa fa-plus"></i>
        </button>
        <button className={`btn shadow-none ${switchTheme}`}>
          <i className="fa fa-expand"></i>
        </button>
        <button
          className={`btn shadow-none ${switchTheme}`}
          onClick={handleDrawerClick}
        >
          <i className="fa fa-angle-double-left"></i>
        </button>
      </div>
    </div>
  );
};

export default Dfin;
