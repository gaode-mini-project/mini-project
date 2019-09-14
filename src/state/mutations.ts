export default {
    initMap(state, map) {
        state.map = map;
    },
    addLayer(state, data) {
        state.geoJsonList.push(data);
    },
    swapGeoJsonList(state, [aIndex, bIndex]) {
        const setzIndex = (index: number) => {
            state.geoJsonList[index].getOverlays()[0].getOverlays().forEach((o) => {
                o.setzIndex(index);
            });
        };
        state.geoJsonList[aIndex] = state.geoJsonList.splice(bIndex, 1, state.geoJsonList[aIndex])[0];
        setzIndex(aIndex);
        setzIndex(bIndex);
    },
};
