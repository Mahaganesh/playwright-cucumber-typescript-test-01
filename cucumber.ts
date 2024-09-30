import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(300000); 

export default {
  default: {
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: [
      './features/*.feature'
    ],
    dryRun: false,
    defaultTimeout: 300000,
    require: [
      './features/support/*.ts', 
      './features/steps/*.ts'     
    ],
    parallel: 2
  }
};
