import React, { useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

export default function LinkPage() {
    const { user } = useAuth();
    const userId = user?.id;
    const [link, setLink] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) {
            console.error("User not signed in");
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:4040/api/audio/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ link })
            });
            if (response.ok) {
                console.log("Link upload succeeded");
            } else {
                console.error("Link upload failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box className="flex flex-col items-center justify-center w-6/10 h-64 p-[20px] border-2 rounded-2xl bg-[#f5f5f5]">
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    name="url"
                    id="url"
                    placeholder="Enter URL to import a file"
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit">Upload Link</button>
            </form>
        </Box>
    );
}