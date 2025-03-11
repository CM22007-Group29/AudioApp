import { useDropzone } from "react-dropzone"
import { Stack, Box } from "@mui/material"
import InputFileUpload from "./file_upload/FileUploadButton"
import LinkUpload from "./link_upload/LinkButton"


function FileUpload({ setFileUploaded }: { setFileUploaded: (uploaded: boolean) => void }) {
    // setFileUploaded is a function to update state of whether a file has been uploaded

    const { isDragActive, getRootProps, getInputProps, isDragReject} = useDropzone({
        accept: { "audio/*": [] },
        multiple: false, // limit to one file
        noClick: true,
        onDrop: (files: File[]) => {
            // Checks if files have been uploaded, sets upload state to true if file present
            if (files.length > 0) {
                setFileUploaded(true)
                handleDrop(files)
            }
        }
    });

    // handle the file upload
    // https://www.dhiwise.com/post/how-to-use-react-dropzone-a-complete-guide-with-examples
    const handleDrop = (acceptedFiles: File[]) => {
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])

        // change 'backend_endpoint to the actual endpoint
        fetch('backend_endpoint', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }

    return (
        <Stack spacing={4} className="flex flex-col items-center justify-center">
            <div className="text-center mx-auto pt-5">
              <h1 className="text-gray-900 text-balance dark:text-[#f5f5f5] font-bold text-3xl md:text-4xl xl:text-5xl">What are we editing today?</h1>
            </div>
            <div {...getRootProps()} className="flex items-center justify-center w-6/10 h-64 p-[20px] border-2 rounded-2xl border-dashed border-gray-300 bg-[#f5f5f5] hover:bg-gray-200 transition outline-none">
                <input {...getInputProps()} />
                {
                    !isDragActive &&
                    <Stack spacing={2} className="flex flex-col items-center justify-center text-center">
                        <Box className="text-[#4e4d4d] font-semibold">Drop files here, or import from:</Box>  
                        <Stack direction="row" spacing={2} className="w-auto justify-center">
                            <InputFileUpload setFileUploaded={setFileUploaded}/>
                            <LinkUpload />  
                        </Stack>
                    </Stack>   
                    }
                    {
                        isDragActive && !isDragReject &&
                        <p className="text-[#4e4d4d] font-semibold m-auto">Drop the files here</p> 
                    }
                    {
                        isDragReject && 
                        <p className="text-[#4e4d4d] font-semibold m-auto">File type not accepted</p>
                    }   
            </div>      
        </Stack> 
    );
}

export default FileUpload;