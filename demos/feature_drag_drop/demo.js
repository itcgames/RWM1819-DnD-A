function main()
{
    var dragdrop = new DragDrop();
  this.createDiv("test", '<img src=\'square.png\'>', 100, 100);
}

function createDiv(name, imagePath, posX, posY)
{
  var div = document.createElement("div");
  div.id = name;
  div.innerHTML= imagePath;
  div.draggable = true;
  //setting the position of our div
  div.style.position = "absolute";
  div.style.left = posX+'px';
  div.style.top = posY+'px';
  document.body.appendChild(div);
}