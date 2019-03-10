# posty-pwa
A social network PWA


## In order to run

  1. Install the dependencies in both projects by running `npm install` in each subdirectory.
  2. Launch each project by running `npm start` in each subdirectory
  3. Navigate to [http://localhost:3000](http://localhost:3000)

## For developers
  The backend is using json-server to host a simple web server on port 3001. The frontend bundling is done by create-react-app and served on localhost:3000, which in turn proxies api calls to localhost:3001.