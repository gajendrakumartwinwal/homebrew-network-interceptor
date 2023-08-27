# network-interceptor
## Steps to run the repository
1. Make sure you are using node version > 16.19.0
2. Run below command

   ```
   npm run build:webpack & node dist/main.js
   ```
   
3. To mock response you need to change mapping json file located at `dist/public/response.json`


## Shell compatible package

Follow below steps
1. First you have to package your code using below:
```shell
npm run package
```
   For more info follow: https://www.npmjs.com/package/pkg

2. Create tar out of the generate package
```shell
npm run tar
```
3. Create/Update a homebrew formula
```link
https://github.com/gajendrakumartwinwal/homebrew-tap/blob/main/network-interceptor.rb
```
4. For installation follow below commands
```shell
https://github.com/gajendrakumartwinwal/homebrew-tap/blob/main/README.md
```
