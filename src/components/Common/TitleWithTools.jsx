import React from 'react'
import SupLabel from '../Common/SupLabel'

export default (props) => (
  <div className="tableTop" style={{ marginBottom: 4 }}>
    <SupLabel name={props.name} />
    <div>
      {props.children}
    </div>
  </div>
)
