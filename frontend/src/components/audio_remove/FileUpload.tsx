import { useDropzone } from "react-dropzone";
import { Stack, Box } from "@mui/material";
import InputFileUpload from "./file_upload/FileUploadButton";
import LinkUpload from "./link_upload/LinkButton";
import { useAuth } from "../../context/AuthContext"; // NEW: import useAuth

function FileUpload({ setFileUploaded }: { setFileUploaded: (uploaded: boolean) => void }) {
    const { user } = useAuth();
    if (!user) {
        return (
            <Stack spacing={4} className="flex flex-col items-center justify-center">
            <div className="text-center mx-auto pt-5">
                <h1 className="text-gray-900 text-balance dark:text-[#f5f5f5] font-bold text-3xl md:text-4xl xl:text-5xl">
                    What are we editing today?
                </h1>
            </div>
            <div
                className="flex items-center justify-center w-6/10 h-64 p-[20px] border-2 rounded-2xl border-dashed border-gray-300 bg-[#f5f5f5] hover:bg-gray-200 transition outline-none"
            >
                    <Stack spacing={2} className="flex flex-col items-center justify-center text-center">
                        <Box className="text-red-400 font-semibold">
                            Please sign in to upload files
                        </Box>
                    </Stack>
            </div>
        </Stack>
        );
    }
    const userId = user.id;

    const { isDragActive, getRootProps, getInputProps, isDragReject } = useDropzone({
        accept: { "audio/*": [] },
        multiple: false,
        noClick: true,
        onDrop: async (files) => {
            if (files.length > 0) {
                const file = files[0];
                const formData = new FormData();
                formData.append("audio", file);

                try {
                    const response = await fetch(`http://127.0.0.1:4040/api/audio/${userId}`, {
                        method: "POST",
                        body: formData
                    });
                    if (response.ok) {
                        setFileUploaded(true);
                    } else {
                        console.error("Drag and drop upload failed");
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
    });

    return (
        <Stack spacing={4} className="flex flex-col items-center justify-center">
            <div className="text-center mx-auto pt-5">
                <h1 className="text-gray-900 text-balance dark:text-[#f5f5f5] font-bold text-3xl md:text-4xl xl:text-5xl">
                    What are we editing today?
                </h1>
            </div>
            <div
                {...getRootProps()}
                className="flex items-center justify-center w-6/10 h-64 p-[20px] border-2 rounded-2xl border-dashed border-gray-300 bg-[#f5f5f5] hover:bg-gray-200 transition outline-none"
            >
                <input {...getInputProps()} />
                {!isDragActive && (
                    <Stack spacing={2} className="flex flex-col items-center justify-center text-center">
                        <Box className="text-[#4e4d4d] font-semibold">
                            Drop files here, or import from:
                        </Box>
                        <Stack direction="row" spacing={2} className="w-auto justify-center">
                            <InputFileUpload setFileUploaded={setFileUploaded} />
                            <LinkUpload />
                        </Stack>
                    </Stack>
                )}
                {isDragActive && !isDragReject && (
                    <p className="text-[#4e4d4d] font-semibold m-auto">Drop the files here</p>
                )}
                {isDragReject && (
                    <p className="text-[#4e4d4d] font-semibold m-auto">File type not accepted</p>
                )}
            </div>
        </Stack>
    );
}

export default FileUpload;