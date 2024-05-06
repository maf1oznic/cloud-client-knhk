import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile, searchFiles } from "../../actions/file";
import FileList from "./fileList/FileList";
import "./disk.css";
import Popup from "./Popup";
import { setPopupDisplay } from "../../reducers/fileReducer";
// import {setCurrentDir, setFileView, setPopupDisplay} from "../../reducers/fileReducer";
import DiskSpaceInfo from "./DiskSpaceInfo";
import Uploader from "./uploader/Uploader";
import {showLoader} from "../../reducers/appReducer";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const loader = useSelector((state) => state.app.loader);
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  // const dirStack = useSelector(state => state.files.dirStack)
  // const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  // function showPopupHandler() {
  //   dispatch(setPopupDisplay("flex"));
  // }

  // function backClickHandler() {
  //     const backDirId = dirStack.pop()
  //     dispatch(setCurrentDir(backDirId))
  // }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function searchChangeHandler(e) {
    setSearchName(e.target.value)
    if (searchTimeout != false) {
        clearTimeout(searchTimeout)
    }
    dispatch(showLoader())
    if(e.target.value != '') {
        setSearchTimeout(setTimeout((value) => {
            dispatch(searchFiles(value));
        }, 500, e.target.value))
    } else {
        dispatch(getFiles(currentDir))
    }
}
  // function dragEnterHandler(event) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     setDragEnter(true)
  // }

  // function dragLeaveHandler(event) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     setDragEnter(false)
  // }

  // function dropHandler(event) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //     let files = [...event.dataTransfer.files]
  //     files.forEach(file => dispatch(uploadFile(file, currentDir)))
  //     setDragEnter(false)
  // }

  // if (loader) {
  //   return (
  //     <div className="loader">
  //       <div class="lds-ring">
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // !dragEnter ?
    // <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
    //     <div className="disk__btns">
    //         <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
    //         <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
    //         <div className="disk__upload">
    //             <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
    //             <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
    //         </div>
    //         <select value={sort}
    //                 onChange={(e) => setSort(e.target.value)}
    //                 className='disk__select'>
    //             <option value="name">По имени</option>
    //             <option value="type">По типу</option>
    //             <option value="date">По дате</option>
    //         </select>
    //         <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
    //         <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
    //     </div>
    //     <FileList/>
    //     <Popup/>
    //     <Uploader/>
    // </div>
    // :
    // <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
    //     Перетащите файлы сюда
    // </div>
    <div className="container_disk">
      <div className="disk">
        <div className="disk__btns">
          {/* <button className="disk__back">Назад</button> */}
          {/* <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button> */}
          <div className="disk__upload">
            <label htmlFor="disk__upload-input" className="disk__upload-label">
              Загрузить файл
            </label>
            <input
              multiple={true}
              onChange={(event) => fileUploadHandler(event)}
              type="file"
              id="disk__upload-input"
              className="disk__upload-input"
            />
          </div>
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className="disk__search"
            type="text"
            placeholder="Поиск"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="disk__select"
          >
            <option value="name">По имени</option>
            <option value="type">По типу</option>
            <option value="size">По размеру</option>
            <option value="date">По дате</option>
          </select>
        </div>
        <FileList />
        <Popup />
        <DiskSpaceInfo />
        <Uploader />
      </div>
    </div>
  );
};

export default Disk;
