import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'

const DeleteModal = (props) => {

  const { open, toggle, handleDelete, type } = props

  return (
    <Modal open={open} basic size='small'>
      <Modal.Content>
        <p>Are you sure you want to delete this {type}?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={toggle}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={handleDelete}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal
