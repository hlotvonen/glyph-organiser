import React from 'react';
import 'mobx-react-lite/batchingForReactDom'
import { toJS } from 'mobx'
import { observer } from "mobx-react";
import Store from './store'
import GlyphList from './GlyphList';
import Hotkeys from 'react-hot-keys';
import UnicodeList from './UnicodeList'

const GroupedItems = observer(class GroupedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  onKeyDown(keyName, e, handle) {
    if(keyName === 'left'){
        Store.shiftLeft()
    }
    if(keyName === 'right'){
        Store.shiftRight()
    } 
    if(keyName === 'up'){
        Store.shiftUp()
    } 
    if(keyName === 'down'){
        Store.shiftDown()
    } 
    if(keyName === 'esc'){
        Store.resetSelection()
    } 
  }
  render() {
    if(!toJS(Store.listOfGlyphs) || toJS(Store.listOfGlyphs) === 0){
        return <div>loading...</div>
    }
    return (
        <Hotkeys 
            keyName="left, up, down, right, esc"
            onKeyDown={this.onKeyDown.bind(this)}
        >
            <div className="ListContainer">
                <div>
                    <h1>Easy glyphOrder sorting for Glyphs App</h1>
                    <p>This small tool makes it easier for you to make a custom order for your glyphs in Glyphs App.</p>
                    <p>Click on glyphs & use arrow keys to reorganize them. Copy the unicodes and in Glyphs go to Font info -> Font tab -> Add custom parameter -> choose property glyphOrder and paste the list as the values.</p>
                    <p>Made specifically for <a href="https://glyphdrawing.club" target="_blank" rel="noopener noreferrer">Glyph Drawing Club</a> and modular fonts that are in Unicode's Private Use Area.</p>
                    Upload font: <input type="file" onChange={(e) => Store.uploadFont(e)} /><br/><br/>
                    Resize glyphs: <input type="number" value={Store.itemSize} onChange={(e) => Store.changeItemSize(e)}></input><br/><br/>
                    Expand glyphs: <input type="checkbox" value={Store.showOverflow} onChange={() => Store.changeItemOverflow()}></input><br/><br/>

                </div>
                <div>
                    <UnicodeList
                        items={Store.listOfGlyphs}
                    />
                </div>
            </div>

            <div className="ListContainer">
                <GlyphList
                    items={Store.listOfGlyphs}
                />
            </div>
        </Hotkeys>
    );
  }
})

export default GroupedItems