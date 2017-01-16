import React from 'react';
export default (props) => {
  const bgColor = props.bgColor ? props.bgColor : '#fff';
  const colors = props.color ? props.color : '#000';
  return (
    <span size="small"
      style={{ background: bgColor, color: colors, padding: '2px 8px' }}
    >
       {props.children}
    </span>
  )
}
