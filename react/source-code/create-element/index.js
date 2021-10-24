function createElement(type, config = {}, ...childArgs) {
    let children = childArgs;
    if (childArgs && childArgs.length <= 1) {
        children = childArgs[0]
    }
    const props = children ? { ...config, children } : { ...config };

    const result = { type, props }

    return result;

}

export default createElement;