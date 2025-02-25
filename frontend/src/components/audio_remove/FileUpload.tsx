import { useCallback } from "react"
import { useDropzone } from "react-dropzone";

function FileUpload() {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {"audio/*": []},
        multiple: false,
    });
  
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section>
            <div {...getRootProps()} className="flex-1 flex flex-col items-center text-center p-[20px] border-2 rounded-2xl border-dashed border-gray-300 bg-[#f5f5f5] hover:bg-gray-200 transition text-[#212121] outline-none">
                <input {...getInputProps()} />
                <p className="font-semibold mb-[12]">Drop files here, or <button className="text-[#1b74d8] cursor-pointer">click</button> to select files</p>
            </div>
            <aside className="p-[20px]">
                <h4 className="text-[#f5f5f5]">Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
        
    );
}

export default FileUpload;