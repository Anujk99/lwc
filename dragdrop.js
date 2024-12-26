import { LightningElement, track } from 'lwc';

export default class DragDropDiv extends LightningElement {
  @track items = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Item 4' },
  ];

  draggedItemId = null;
  placeholderIndex = null;

  get itemsWithPlaceholder() {
    const items = [...this.items];
    if (this.placeholderIndex !== null) {
      items.splice(this.placeholderIndex, 0, { id: 'placeholder', isPlaceholder: true });
    }
    return items.map((item) => ({
      ...item,
      className: item.isPlaceholder ? 'placeholder' : 'draggable-item',
    }));
  }

  handleDragStart(event) {
    this.draggedItemId = event.target.dataset.id;
    event.target.classList.add('dragging');
  }

  handleDragEnd(event) {
    event.target.classList.remove('dragging');

    if (this.placeholderIndex !== null) {
      const draggedItemIndex = this.items.findIndex(
        (item) => item.id === this.draggedItemId
      );

      const [draggedItem] = this.items.splice(draggedItemIndex, 1);
      this.items.splice(this.placeholderIndex, 0, draggedItem);
    }

    // Reset placeholder
    this.placeholderIndex = null;
    this.draggedItemId = null;
  }

  handleDragOver(event) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('draggable-item')) {
      const targetItemIndex = this.items.findIndex(
        (item) => item.id === target.dataset.id
      );
      const draggedItemIndex = this.items.findIndex(
        (item) => item.id === this.draggedItemId
      );

      if (targetItemIndex !== this.placeholderIndex) {
        this.placeholderIndex =
          draggedItemIndex < targetItemIndex
            ? targetItemIndex + 1
            : targetItemIndex;
      }
    }
  }
}
