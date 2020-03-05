import development from './development.json';
import production from './production.json';
import localhost from './localhost.json';

let config = {}

if (process.env.NODE_ENV === 'localhost'){
    // console.log('PORCCES LOCALHOST', localhost);
    config = localhost;
}
else if (process.env.NODE_ENV === 'production'){
    // console.log('PORCCES production', production);
    config = production;
}
else if (process.env.NODE_ENV === 'development'){
    // console.log('PORCCES development', development);
    config = development;
}

export default config;