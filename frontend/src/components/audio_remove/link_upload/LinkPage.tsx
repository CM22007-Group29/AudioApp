import { Box } from "@mui/material"

export default function LinkPage() {
    return (
      <Box className="flex flex-col items-center justify-center w-6/10 h-64 p-[20px] border-2 rounded-2xl bg-[#f5f5f5]">
        <form>
          <input
              type="url"
              name="url"
              id="url"
              placeholder="Enter URL to import a file"
              required
          />
        </form>  
      </Box>
      
    );
}