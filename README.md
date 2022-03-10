# spacebook-react

## Info
The app was built on Linux ubuntu 20.04 using [react native cli], not Expo! This is because Linux provides an easier way to install and manage development dependencies like java, android studio and node.

I decided to use Typescript to help prevent runtime errors and improve code readability. 

To improve this project, I would change all the API calls to use 'fetch' instead of Axios. I decided to use Axios to create classes for user management, friend management and so on to stop repeating code. However, the API call photo forced me to switch to fetch as the incorrect image blob was being sent to the server.

Another improvement for this project would create unit testing and end to end testing; however, this was not in the scope of this project. 

**SPEC**
[MAD 21-22 Assignment Spec v1 [VERIFIED].pdf](https://github.com/S-DICKSON/spacebook-react/files/8226198/MAD.21-22.Assignment.Spec.v1.VERIFIED.pdf)

- https://reactnative.dev/docs/typescript

## Repositories
- https://github.com/S-DICKSON/spacebook-react
- https://github.com/S-DICKSON/Spacebook


## Comands

- yarn
- npm i
- npx react-native start
- npx react-native run-android
- npm run dev
- adb shell cmd jobscheduler run -f com.typescript 999

## Styling Guide 
The chosen style guide was [Airbnb](https://airbnb.io/javascript/react/). However, due to its support with Typescript, more configuration is required with 'prettier' as there were conflicting styles that needed me to suppress 'eslinter,' a Typescript linter manually. In reflection, more time is needed to get 'prettier', 'eslinter'  and Airbnb working efficiently together.


- https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser
- https://github.com/iamturns/eslint-config-airbnb-typescript/tree/v16.1.0#1-setup-regular-airbnb-config
- https://javascript.plainenglish.io/setting-eslint-and-prettier-on-a-react-typescript-project-2021-22993565edf9
- https://javascript.plainenglish.io/setting-eslint-and-prettier-on-a-react-typescript-project-2021-22993565edf9


## Folder structure
- https://elazizi.com/how-to-structure-a-react-native-project


## UI STYLE 
- https://callstack.github.io/react-native-paper/text-input.html

