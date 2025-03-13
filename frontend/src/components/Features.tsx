import { Stack, Card, CardContent, CardMedia } from "@mui/material"
import Typography from "@mui/material/Typography"
import fillerWords from "../assets/Filler words.png"
import backgroundNoise from "../assets/Background noise.png"
import silenceRemoval from "../assets/Silence removal.png"

function Features() {
    return (
        <div className="relative h-screen bg-radial from-[#383838] to-[#262626]">
          <Stack className="flex flex-auto justify-center items-center">
            <h1 className="text-gray-900 text-balance dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl pt-10">
              Our Features
            </h1>
            <Stack direction="row" spacing={3} className="flex flex-auto justify-center items-center pt-15 pr-5 pl-5">
              {[
                { image: fillerWords, title: "Filler Word Removal", description: "Remove filler words with the click of a button" },
                { image: silenceRemoval, title: "Silence Removal", description: "Remove unwanted silences using AI" },
                { image: backgroundNoise, title: "Background Noise Removal", description: "Easy background noise removal" }
              ].map((feature, index) => (
                <Card key={index} sx={{ width: 1/3, display: "flex", flexDirection: "column", height: 375 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", maxWidth: "100%", height: "auto", maxHeight: 250, padding: 1, objectFit: "contain" }}
                    image={feature.image}
                    title={feature.title}
                  />
                  <CardContent sx={{ flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="div">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#424242" }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </div>
    )
  }
  
  export default Features