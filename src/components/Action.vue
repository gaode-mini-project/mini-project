<template>
	<div class="action tool-box" >
		<div>选区工具</div>
		<div>
			<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="circleIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6" @click="selectType('circle')">
				<title id="circleIconTitle">Circle</title>
				<circle cx="12" cy="12" r="8"/></svg>
			<svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="rectangleIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6" @click="selectType('rectangle')">
				<title id="rectangleIconTitle">Rectangle</title>
				<rect width="14" height="14" x="5" y="5"/> </svg>
		</div>
		<div class="flex-center">
			<el-button @click="exportData()">导出数据</el-button>
		</div>
	</div>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { mapState } from 'vuex';

    @Component({
		computed: {
		    ...mapState(['geoJsonList', 'map'])
		}
	})
    export default class Action extends Vue {
        selectedOverlay;

        selectType(type) {
            AMap.plugin(['AMap.MouseTool'], () => {
                const mousetool = new AMap.MouseTool((this as any).map);
                mousetool.on('draw', ({ obj }) => {
                    const overlayGroup = new AMap.OverlayGroup();
                    (this as any).geoJsonList.forEach((geoJson) => {
                        geoJson.eachOverlay((marker) => {
                            marker.setIcon();
                            if (obj.contains(marker.getPosition())) {
                                marker.setIcon(require('../assets/marker.png'));
                                overlayGroup.addOverlay(marker);
                            }
                        });
                    });
                    const count = overlayGroup.getOverlays().length;
                    const infoWindow = new AMap.InfoWindow({
                        content: count ? `当前选区共有：${count} 个点` : ''
                    });
                    const centerPoint = (() => {
                        if (obj.getCenter) {
                            return obj.getCenter();
						} else {
                            const path = obj.getPath();
                            return new AMap.LngLat((path[0].lng + path[1].lng) / 2, (path[0].lat + path[2].lat) / 2)
                        }
					})();
                    this.selectedOverlay = overlayGroup;
                    infoWindow.open((this as any).map, centerPoint);
                    mousetool.close(true);
                });
                mousetool[type]();
            });
        }

        exportData() {
            if (!this.selectedOverlay) { return; }

            const link = document.createElement('a');
            link.download = 'point.geojson';
            const blob = new Blob([JSON.stringify(this.selectedOverlay.toGeoJSON())], {type: 'text/plain'});
            link.href = window.URL.createObjectURL(blob);
            link.click();
        }
    }
</script>

<style scoped lang="scss">
	.action {
		position: fixed;
		top: 10px;
		right: 10px;

		width: 200px;
	}

</style>
