# VATTAXI

## Current Branches

There are several versions of the software currently available in this repository. These are described below:

- master: Contains the most up-to-date version of the software, including the improved graph parser and unused Dijkstra code, with development tools enabled. 
- release: The version of the software that has been built and provided to survey participants. This contains the old graph parser and no development tools.
- demo-tool-release: Identical to the release copy but has the demo tool activated.


## Pre-requisites to run this project locally

- ^Windows 10
- ^Node v14.17.5 (if not running the compiled version of the application)
- Microsoft Windows Desktop Runtime (will be prompted by application on first boot if not installed)
- Microsoft Flight Simulator (to interact with the application unless using the demo tool on versions that contain it)

^: the named version or later


## Running VATTAXI...
### ...using a compiled build

- Download the desired installed from xxx
- Run the installer

*n.b. you will likely receive a warning from Windows stating that the application may contain malware. A Microsoft security analyst has advised this just means the application has not built up enough trust with Windows yet and so it doesn't know if it's safe. The version of the installer provided to survey participants (release) was submitted for security analysis by Microsoft and as such will not trigger this warning. This version contains the old graph parser and does not contain any of the development tools. Other versions have not been submitted to Microsoft as the time taken to get one version reviewed was significant. Running a third-party anti-virus scan on the project has reported that the installer is safe in case you want to verify the security of the installer yourself. Alternatively, the source code can be used to run the application.*


### ...using the source code

It is simple to setup the development environment to run this application locally. Follow these steps:

- Clone or download the repository to your hard drive
- Run ```npm i``` in the terminal within the root directory of the project
- Run ```npm run electron:serve``` in the terminal within the root directory of the project to start the application
- If prompted, install Microsoft Windows Desktop Runtime


## Running automated tests

- Run ```npm run test:unit``` in the terminal within the root directory of the project to run the unit tests


## Libraries in Use

- [Vue.js](https://vuejs.org/)
- [Electron.js](https://www.electronjs.org/)
- [paper.js](http://paperjs.org/)
- [Axios](https://axios-http.com/)
- [point-in-polygon](https://www.npmjs.com/package/point-in-polygon)
- [Jest.js](https://jestjs.io/)
- [jest-canvas-mock](https://www.npmjs.com/package/jest-canvas-mock)
- [vue-fontawesome](https://fontawesome.com/)


## Notes for development

Make sure to copy SimConnect.dll into folder containing C# client .exe if the bin folder has been deleted.
Whenever bounds are updated or taxiway segments are created/destroyted, make sure to update graph/taxiways.js

