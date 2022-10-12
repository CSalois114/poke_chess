import React from 'react'
import KeyEntry from './KeyEntry'

export default function Key({ isEditingMode }) {

  const canKill = { 
    className: "editing moveable canKill",
    description: "Can attack\nto move here"
  }

  const cantKill = {
    className: "editing moveable",
    description: "Can not attack\nto move here"
  }

  const mustKill = {
    className: "editing moveable canKill mustKill",
    description: "Must attack\nto move here"
  }

  const selected = {
    className: "editing selected",
    description: "For the piece to make the next move created, the selected tile must be clear"
  } 

  const showIfEditing = component => isEditingMode ? component : null

  return (
    <div id="key" >
      <KeyEntry {...canKill } />
      <KeyEntry {...cantKill} />
      <KeyEntry {...mustKill} />
      { isEditingMode ? <KeyEntry {...selected} /> : null }
    </div>
  )
}
