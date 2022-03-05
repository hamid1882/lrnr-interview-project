import React from "react";

const UserGuide = () => {
  return (
    <div className="my-5 ">
      <h3>User Guide</h3>
      <div className="text-start">
        <details>
          <summary>Creating a new file</summary>
          <ul>
            <li>
              Choose any collection and write the file name, file type, and file
              input on the right panel and click on Create File.
            </li>
            <li>
              Click the + icon on any selected collection to create a random
              text file.
            </li>
          </ul>
        </details>
        <details>
          <summary>Creating a Image File</summary>
          <ul>
            <li>
              Choose any collection and write the Image name, type as image (in
              lowercase), and Image link (url) on the right panel and click on
              Create File.
            </li>
            <li>
              Select any file and paste the image link on the editor (note:
              input field should only contain image url) and click on Save icon,
              then click on image icon to view the image.
            </li>
          </ul>
        </details>
        <details>
          <summary>Clone a file</summary>
          <ul>
            <li>
              Select any file, click on the + icon on the editor. A new file
              will be created on the current collection with the same value.
            </li>
            <li>
              Select any file, click on the copy to clipboard icon which copies
              the file value to your clipboard, then create a new file and paste
              the value and hit save.
            </li>
          </ul>
        </details>
        <details>
          <summary>Rename a Collection/file</summary>
          <ul>
            <li>
              Select any Collection/file and click on edit icon, type your new
              name and click on save or hit Enter.
            </li>
          </ul>
        </details>
        <details>
          <summary>Delete a Collection/file</summary>
          <ul>
            <li>
              Select any Collection/file and click on delete icon, the selected
              will be removed.
              <span className="text-danger">
                Note: 1st File of any collection can not be deleted
              </span>
            </li>
          </ul>
        </details>
        <details>
          <summary>More Features</summary>
          <ul>
            <li>
              Switch theme, Click on profile icon on the top right of the page
              and switch Dark mode to enable dark theme
            </li>
            <li>
              The limit of Collections can be created :{" "}
              <span className="text-danger">9</span>
            </li>
            <li>
              The limit of Files can be created :{" "}
              <span className="text-danger">9</span>
            </li>
            <li>
              Search Bar:
              <span className="text-danger">
                Only on large screens and it only shows all the existing
                collections
              </span>
            </li>
            <li>Responsive</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default UserGuide;
