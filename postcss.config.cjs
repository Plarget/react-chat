module.exports = (mode) => {
    const isProd = (mode !== "development")
    const plugins = {
        "postcss-import": {},
        "postcss-mixins": {},
        "postcss-nested": {},
    }
    if (isProd) {
        plugins["postcss-preset-env"] = {}
    }
    return {
        plugins,
        sourceMap: true,
    }
}