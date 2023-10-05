# network-interceptor
## Steps to run the repository
1. Make sure you are using node version > 16.19.0
2. Run below command

   ```
   npm run build:webpack & node dist/index.js
   ```
   
3. To mock response you need to change mapping json file located at `dist/public/response.json`


## Shell package generating

Follow below steps
1. First you have to package your code using below:
```shell
npm run packages
```
   For more info follow: https://www.npmjs.com/package/pkg

2. Create tar out of the generate package
```shell
npm run tar
```
3. Move generated tar to homebrew-tap
```shell
npm run move-to-tap
```
4. After moving generated tar go homebrew-tap follow instruction at 
