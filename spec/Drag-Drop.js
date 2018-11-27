/* global Drag-Drop, describe, it, expect, should */

class DragDrop
{
  constructor()
  {
    document.addEventListener("dragstart", this.dragstart);
    document.addEventListener("drag", this.dragmove);
    document.addEventListener("dragend", this.dragend);
    this.currentPosX = 0;
    this.currentPosY = 0;
    this.offsetx = 0;
    this.offsety = 0;
  }
  dragstart(e)
  {
    if (e.target.parentElement.draggable)
    {
      var img = new Image();
      img.src = "blank.png";
      e.dataTransfer.setDragImage(img, 0, 0);
      this.dragged = e.target;
      this.currentPosX = e.clientX;
      this.currentPosY = e.clientY;
      this.offsetx = e.clientX - e.target.parentElement.posx;
      this.offsety = e.clientY - e.target.parentElement.posy;
      console.log(this.currentPosX, this.currentPosY);
      // var crt = e.target.parentElement;
      // crt.style.visibility = "hidden"; /* or visibility: hidden, or any of the above */
      // document.body.appendChild(crt);
      // e.dataTransfer.setDragImage(crt, 0, 0);
    }
  }
  dragmove(e)
  {
    event.preventDefault();
    if (e.target.parentElement.draggable)
    {
      var targetRect = e.target.parentElement.square;
      if (e.target.parentElement.intersected == false)
      {
      e.target.parentElement.previousX = targetRect.x;
      e.target.parentElement.previousY = targetRect.y;
      }
      targetRect.x = parseFloat(e.clientX) - parseFloat(this.offsetx);
      targetRect.y = parseFloat(e.clientY) - parseFloat(this.offsety);
      var all = document.getElementsByTagName("div");

      for (var i = 0, max = all.length; i < max; i++) {


        if (all[i].id != e.target.parentElement.id) {
          if (haveIntersection(all[i].square, targetRect)) {
            all[i].style.backgroundColor = "blue";
            console.log("Intersection");
            if (e.target.parentElement.intersected == false)
            {
            e.target.parentElement.intersected = true;
            e.target.parentElement.intersectX = parseFloat(e.target.parentElement.previousX);
            e.target.parentElement.intersectY = parseFloat(e.target.parentElement.previousY);
            }
            break;
          }
          else {
            e.target.parentElement.intersected = false;
            all[i].style.backgroundColor = "";
          }
      }
      this.currentPosX = parseFloat(e.target.parentElement.previousX);
      this.currentPosY = parseFloat(e.target.parentElement.previousY);
      e.target.parentElement.style.left = this.currentPosX + "px";
      e.target.parentElement.style.top = this.currentPosY + "px";
      e.target.parentElement.posx = this.currentPosX;
      e.target.parentElement.posy = this.currentPosY;
    };
      if (targetRect.x < 0)
      {
        console.log("test");
      }
      
      e.target.parentElement.square = targetRect;
    }
  }
  dragend(e)
  {
    event.preventDefault();
    if (e.target.parentElement.draggable)
    {
      e.target.parentElement.intersected = false;
    //this.dragend = e.target;
    //this.currentPosX = 0;
    //this.currentPosY = 0;
    //if (e.target.parentElement.intersected === true)
    //{
    //  e.target.parentElement.intersected = false;
    //  this.currentPosX = parseFloat(e.target.parentElement.previousX);
    //  this.currentPosY = parseFloat(e.target.parentElement.previousY);
    //  console.log(e.target.parentElement.intersectX, e.target.parentElement.intersectY);
    //  e.target.parentElement.style.left = this.currentPosX + "px";
    //  e.target.parentElement.style.top = this.currentPosY + "px";
    //  e.target.parentElement.posx = this.currentPosX;
    //  e.target.parentElement.posy = this.currentPosY;
    //  console.log("dragend after intersection");
    //}
    //else
    //{
    //this.currentPosX = parseFloat(e.clientX) - parseFloat(this.offsetx);
    //this.currentPosY = parseFloat(e.clientY) - parseFloat(this.offsety);
    console.log(this.currentPosX, this.currentPosY);
    //e.target.parentElement.style.left = this.currentPosX + "px";
    //e.target.parentElement.style.top = this.currentPosY + "px";
    //e.target.parentElement.posx = this.currentPosX;
    //e.target.parentElement.posy = this.currentPosY;
    //}
    //e.target.parentElement.square.x = this.currentPosX;
    //e.target.parentElement.square.y = this.currentPosY;

    //e.target.parentElement.style.visibility = "visible";
    }
    console.log("End of drag");
  }
  
  haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
  }
}