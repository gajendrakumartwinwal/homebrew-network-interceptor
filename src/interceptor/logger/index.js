const logger = (key, ...data) => {
    let logsEnabled = ['error']
    try {
        if (process.env.NETWORK_INTERCEPTOR_LOGS)
            logsEnabled = process.env.NETWORK_INTERCEPTOR_LOGS.split(',');
    } catch (e) {
        console.error('process.env.NETWORK_INTERCEPTOR_LOGS parsing failed for: ', e);
    }

    if (logsEnabled.includes(key)) {
        console[key](data);
    }
}

export default logger;