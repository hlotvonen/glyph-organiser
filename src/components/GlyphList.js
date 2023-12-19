import React from 'react';
import { observer } from 'mobx-react'
import Item from './Item';
import Store from './store.js'

const GlyphList = observer(({items}) => {

  return (
	  <div
		className={Store.showOverflow ? "GlyphListNoOverflow" : "GlyphListOverflow"}
		  style={{
			width: Store.showOverflow ? (10 * Store.itemSize) + (20 * 5) + 'px' : "auto"  
		}}
	  >
			{
				items.map((item,i) => { 
					return (
						<Item
							key={`item-${i}`}
							index={i}
							value={item}
						/>
					)
				})
			}
    </div>
  );
})

export default GlyphList