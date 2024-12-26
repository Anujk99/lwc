import { LightningElement, track } from 'lwc';

export default class DragDropList extends LightningElement {
  @track items = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Item 4' },
  ];

  @track showPlaceholder = false;
  draggedItemId;
  placeholderIndex = null;

  handleDragStart(event) {
    this.draggedItemId = event.target.dataset.id;
    event.target.classList.add('dragging');
    this.showPlaceholder = true;
  }

  handleDragEnd(event) {
    event.target.classList.remove('dragging');
    this.showPlaceholder = false;
    this.placeholderIndex = null;
  }

  handleDragOver(event) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('draggable-item')) {
      const draggedItemIndex = this.items.findIndex(
        (item) => item.id === this.draggedItemId
      );
      const targetItemIndex = this.items.findIndex(
        (item) => item.id === target.dataset.id
      );

      if (draggedItemIndex !== targetItemIndex) {
        this.placeholderIndex = targetItemIndex;

        // Update list by inserting placeholder visually
        const updatedItems = [...this.items];
        const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
        updatedItems.splice(targetItemIndex, 0, draggedItem);
        this.items = updatedItems;
      }
    }
  }
}
