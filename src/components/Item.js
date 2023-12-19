import React from 'react';
import Store from './store'
import { observer } from 'mobx-react'

const Item = observer((props) => {
  const {
    value,
    index
  } = props;

  return (
    <div
    className={Store.showOverflow ? "ItemNoOverflow" : "ItemOverflow"}
      onClick={e => Store.selectItem(index)}
      style={{
        background: Store.selectedItems.includes(index) ? 'lime' : '',
        paddingLeft: Store.showOverflow ? 0 : Math.abs(value.boundingBox.x1 / 800 * Store.itemSize),
        paddingRight: Store.showOverflow ? 0 : Math.abs(value.boundingBox.x2 / 800 * Store.itemSize) - Store.itemSize,
        paddingBottom: Store.showOverflow ? 0 : Math.abs(value.boundingBox.y1 / 800 * Store.itemSize),
        paddingTop: Store.showOverflow ? 0 : Math.abs(value.boundingBox.y2 / 800 * Store.itemSize) - Store.itemSize,
      }}
    >
        <svg
        height={Store.itemSize}
        width={Store.itemSize}
          viewBox={"0 0 800 800"}
          style={{ transform: "scale(1, -1)"}}
        >
        <path d={value.pathData} />
        </svg>
    </div>
  );
})

export default Item
