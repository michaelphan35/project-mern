export function listArtists(arr) {
    if (arr.length > 1) {
        const arrNames = arr.map((item) => { return item.name });
        const str = arrNames.join(', ');
        return str;
    } else {
        return arr[0].name;
    }

}