# Clone the repository and ensure it has the dist folder with the webpage (index.html with javascript/react scripts in the assets folder) and student_data.db (sqlite database)
Navigate to the directory where the repository was cloned where the package.json file exists and run the following command

    git clone https://github.com/renegadefloofer/vi-dashboard.git

# Install required libraries
    npm install

# Launch the node app
The app serves the webpage and the api that provides the data to the webpage from the sqlite database

    npm run start