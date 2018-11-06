/* global Drag-Drop, describe, it, expect, should */

class DragDrop
{
  constructor()
  {
    document.addEventListener("dragstart", this.dragstart);
    document.addEventListener("dragend", this.dragstart);
    this.currentPosX = 0;
    this.currentPosY = 0;
  }
  dragstart(e)
  {
    if (e.target.isDraggable)
    {
      this.dragged = e.target;
      this.currentPosX = e.clientX;
      this.currentPosY = e.clientY;
      console.log(this.currentPosX, this.currentPosY);
    }
  }
  dragend(e)
  {
    this.dragend = e.target;
    this.currentPosX = e.clientX;
    this.currentPosY = e.clientY;
    console.log(this.currentPosX, this.currentPosY);
    
  }
}