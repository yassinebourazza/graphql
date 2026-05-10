export function XpFormat(num) {
    return num < 1000000 ? Math.floor(num / 1000) + " KB" : (num / 1000000).toFixed(2) + " MB"
}