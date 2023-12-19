import { observable, action, decorate, toJS } from 'mobx'
var opentype = require('opentype.js')

class Store {

    listOfGlyphs = []
    font = null
    selectedItems = []
    itemSize = 30
    showOverflow = true


    changeItemSize = e => {
        this.itemSize = e.target.value 
    }
    changeItemOverflow = () => {
        this.showOverflow = !this.showOverflow
    }

	uploadFont = e => {
		let reader = new FileReader()
		let file = e.target.files[0];
		reader.onload = (e) => {
			this.fontLoaded(e.target.result)
		}
        reader.readAsArrayBuffer(file)
	}

    load(path, resp) {
		let request = new XMLHttpRequest()
		request.open("GET", path, true)
		request.responseType = "arraybuffer"
		request.onload = function(e) {
			resp(e.target.response)
		}
		request.send()
    }
    
	fontLoaded = resp => {
        this.font = opentype.parse(resp);
        this.getGlyphs()
    }

    getGlyphs = () => {
        let list = []
        for (const key in this.font.glyphs.glyphs) {
            list.push({
                index: this.font.glyphs.glyphs[key].index,
                unicode: this.font.glyphs.glyphs[key].name,
                pathData: this.font.glyphs.glyphs[key].path.toPathData(8),
                boundingBox: this.font.glyphs.glyphs[key].getBoundingBox()
            })
        }
        this.listOfGlyphs = toJS(list)
    }

    moveItemInArrayFromIndexToIndex = (array, fromIndex, toIndex) => {
        if (fromIndex === toIndex) return array;
      
        const newArray = [...array];
      
        const target = newArray[fromIndex];
        const inc = toIndex < fromIndex ? -1 : 1;
      
        for (let i = fromIndex; i !== toIndex; i += inc) {
          newArray[i] = newArray[i + inc];
        }
      
        newArray[toIndex] = target;
      
        return newArray;
    }
    selectItem = (index) => {
        if(this.selectedItems.includes(index)) {
            this.selectedItems = this.selectedItems.filter(arrayItem => arrayItem !== index);
        } else {
            this.selectedItems.push(index)
            console.log(index)
        }
        this.selectedItems.replace(this.selectedItems.slice().sort((a, b) => a - b));
    }
    shiftLeft = () => {
        if(this.selectedItems[0]-1 < 0) {
            return
        }
        for (let i = 0; i < this.selectedItems.length; i++) {
            this.listOfGlyphs = this.moveItemInArrayFromIndexToIndex(this.listOfGlyphs,this.selectedItems[i],this.selectedItems[i]-1)
            this.selectedItems[i] = this.selectedItems[i]-1
        }
    }
    shiftRight = () => {
        if(this.selectedItems[this.selectedItems.length-1]+1 > this.listOfGlyphs.length-1) {
            return
        }
        for (let i = this.selectedItems.length-1; i >= 0; i--) {
            this.listOfGlyphs = this.moveItemInArrayFromIndexToIndex(this.listOfGlyphs,this.selectedItems[i],this.selectedItems[i]+1)
            this.selectedItems[i] = this.selectedItems[i]+1
        }
    }
    shiftDown = () => {
        if(this.selectedItems[this.selectedItems.length-1]+10 > this.listOfGlyphs.length-1) {
            return
        }
        for (let i = this.selectedItems.length-1; i >= 0; i--) {
            this.listOfGlyphs = this.moveItemInArrayFromIndexToIndex(this.listOfGlyphs,this.selectedItems[i],this.selectedItems[i]+10)
            this.selectedItems[i] = this.selectedItems[i]+10
        }
    }
    shiftUp = () => {
        if(this.selectedItems[0]-10 < 0) {
            return
        }
        for (let i = 0; i < this.selectedItems.length; i++) {
            this.listOfGlyphs = this.moveItemInArrayFromIndexToIndex(this.listOfGlyphs,this.selectedItems[i],this.selectedItems[i]-10)
            this.selectedItems[i] = this.selectedItems[i]-10
        }
    }
    resetSelection = () => {
        this.selectedItems = []
    }
}
decorate(Store, {
    listOfGlyphs: observable,
    fontLoaded: action,
    getGlyphs: action,
    font: observable,
    selectedItems: observable,
    selectItem: action,
    itemSize: observable,
    showOverflow: observable
});

export default new Store()