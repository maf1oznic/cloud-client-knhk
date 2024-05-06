import React from "react";
import "./file.css";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import imageLogo from "../../../../assets/img/image.svg";
import docxLogo from "../../../../assets/img/docx.svg";
import rarLogo from "../../../../assets/img/rar.svg";
import exeLogo from "../../../../assets/img/exe.svg";
import zipLogo from "../../../../assets/img/zip.svg";
import z7Logo from "../../../../assets/img/7z.svg";
import pdfLogo from "../../../../assets/img/pdf.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    // const fileView = useSelector(state => state.files.view)

    function openDirHandler(file) {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

     function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // добавляем 1, так как месяцы в JavaScript начинаются с 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    }
    
    // if (fileView === 'list') {
    return (
        <div
            className="file"
            onClick={() => openDirHandler(file)}
        >
            <img
                src={
                    file.type === "dir"
                        ? dirLogo
                        : file.type === "png"
                        ? imageLogo
                        : file.type === "jpg"
                        ? imageLogo
                        : file.type === "jpeg"
                        ? imageLogo
                        : file.type === "docx"
                        ? docxLogo
                        : file.type === "rar"
                        ? rarLogo
                        : file.type === "exe"
                        ? exeLogo
                        : file.type === "zip"
                        ? zipLogo
                        : file.type === "7z"
                        ? z7Logo
                        : file.type === "pdf"
                        ? pdfLogo
                        : fileLogo // Здесь можно указать иконку по умолчанию для других типов файлов
                }
                alt=""
                className="file__img"
            />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{formatDate(file.date)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            <button
                onClick={(e) => downloadClickHandler(e)}
                className="file__btn file__download"
            >
                Скачать
            </button>
            <button
                onClick={(e) => deleteClickHandler(e)}
                className="file__btn file__delete"
            >
                Удалить
            </button>
        </div>
        // {file.type !== 'dir' &&
        // <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">download</button>}
        // <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">delete</button>
    );
    // }
    // if (fileView === 'plate') {
    //     return (
    //         <div className='file-plate' onClick={() => openDirHandler(file)}>
    //             <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
    //             <div className="file-plate__name">{file.name}</div>
    //             <div className="file-plate__btns">
    //                 {file.type !== 'dir' &&
    //                 <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download">download</button>}
    //                 <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">delete</button>
    //             </div>
    //         </div>
    //     );
    // }
};

export default File;
