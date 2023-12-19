import React from 'react';
import { observer } from 'mobx-react'

const UnicodeList = observer(({items}) => {

	const handleFocus = (event) => event.target.select();
	let unicodelist = items.map((item,i) => { 
		return `${item.unicode}`
	}).join('\n');
	
	const Input = () => <textarea readOnly type="text" value={unicodelist} onFocus={handleFocus} rows="10"/>
	
	return (
	  	<div className="UnicodeList">
			<Input />
			<button 
				onClick={() =>  navigator.clipboard.writeText(unicodelist)}
			>
				Copy list of unicodes to clipboard
			</button>
		</div>
  );
})

export default UnicodeList