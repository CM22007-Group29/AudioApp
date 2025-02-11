# AudioApp

## Setting up Docker and hosting the website

NOTE: Let me know if these instructions don't work, I run linux and have some dependancies already installed so you might need to do something different.

Run `sudo apt install docker-compose` to install Docker 



To run the docker image, open the AudioApp file in your terminal and run 

`sudo docker-compose up`

You should do this every time you want to run the website or any code in the project. Git commands should be done outside of docker.

You can create an alias for this command so you don't have to type the whole thing every time you run code, I chose to use `dock`.

`alias dock='sudo docker-compose up'`



Docker will automatically install required packages and the website is hosted locally on your machine (due to the line `app.run(host='0.0.0.0',debug=True)` in main.py, this can be changed later).

The website can be opened by clicking on this line in your terminal: 
`web_1  |  * Running on http://172.19.0.3:5000/ (Press CTRL+C to quit)`
You may have to scroll up a bit to find it, the address may also be different on your computer.