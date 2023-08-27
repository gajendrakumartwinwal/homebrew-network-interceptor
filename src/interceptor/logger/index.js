const logger = (key, ...data) =>{
    const logsEnabled = process.env.NETWORK_INTERCEPTOR_LOGS || ['error']
    if(logsEnabled.includes(key)){
        console[key](data);
    }
}

export default logger;