export default {
    initMap({ commit, state }, data) {
        commit('initMap', data);
    },
    addLayer({ commit, state }, data) {
        const geojson = new AMap.GeoJSON({
            geoJSON: data,
        });
        const zIndex = state.geoJsonList.length;
        geojson.eachOverlay((marker, index, array) => {
            marker.setzIndex(zIndex);
        });
        geojson._layerName = `图层 ${zIndex + 1}`;
        geojson._visible = true;
        geojson.setMap(state.map);
        commit('addLayer', geojson);
    },
    swapGeoJsonList({ commit, state }, data) {
        commit('swapGeoJsonList', data);
    },
};
