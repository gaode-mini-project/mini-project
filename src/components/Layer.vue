<template>
	<div class="layer tool-box">
		<div class="mb-5">图层管理</div>
		<div v-for="(item, i) in layerList" class="layer-item">
			<div draggable="true" @dragstart="dragstart($event.target, i)" @drop="drop($event.target, i)" ondragover="return false">{{item._layerName}}</div>
			<el-button size="mini" class="ml-5" @click="toggleVisible(item)">{{item._visible ? 'hide' : 'show'}}</el-button>
		</div>
		<div v-if="layerList.length === 0" style="height: 10px;"></div>
		<div class="flex-center">
		    <el-button @click="$refs.fileInput.click()">添加图层</el-button>
		</div>
		<input ref="fileInput" type="file" accept=".geojson" @change="addFile($event.target)" style="display: none">
	</div>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { mapState } from 'vuex';

    @Component({
		computed: {
		    ...mapState(['geoJsonList'])
		}
	})
    export default class Layer extends Vue {
        get layerList() {
            return (this as any).geoJsonList;
		}

		dragIndex: number;

        constructor() {
            super();
        }

        created() {
        }

        addFile(e) {
            const reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (theFile) => {
                try {
                    this.$store.dispatch('addLayer', JSON.parse((theFile.target as any).result))
                } catch (e) {
                    console.error(e);
                }
            };

            // Read in the image file as a data URL.
            reader.readAsText(e.files[0]);

            e.value = null;
        }

        dragstart(e, i: number) {
            this.dragIndex = i;
        }

        drop(e, i: number) {
            if (i === this.dragIndex) { return; }

            this.$store.dispatch('swapGeoJsonList', [i, this.dragIndex]);
        }

        toggleVisible(overlayGroup) {
            overlayGroup._visible ? overlayGroup.hide() : overlayGroup.show();
            overlayGroup._visible = !overlayGroup._visible;
        }
    }
</script>

<style scoped lang="scss">
	.layer {
		position: fixed;
		top: 10px;
		left: 10px;

		width: 200px;
	}

	.layer-item {
		margin-bottom: 5px;

		display: flex;
	}

</style>
