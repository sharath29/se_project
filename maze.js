var columns,rows;
var w = 40;
var current
var grid = [];

function setup() {
  createCanvas(400,400);
  columns = floor(width/w);
  rows = floor(height/w);

  for(var j=0;j<rows;j++){
    for(i=0;i<columns;i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }

  current = grid[0];
}
function draw(){
  background(51);
  for(var i=0;i<grid.length;i++){
      grid[i].show();
  }
  current.visited = true;
  var next = current.checkNeighbors();
  if(next){
    next.visited = true;
    removeWalls(current,next);
    current = next;
  }
  frameRate(0.5);
}

function index(i,j){
  if(i<0 || i>columns-1 || j<0 || j>rows-1){
    return -1;
  }
  return i + j*columns;
}
function Cell(i,j){
  this.i = i;
  this.j = j;
  this.walls=[true,true,true,true];
  this.visited = false;


  this.checkNeighbors = function(){
    var neighbors = [];

    var top = grid[index(i,j-1)];
    var right = grid[index(i+1,j)];
    var bottom = grid[index(i,j+1)];
    var left = grid[index(i-1,j)];

    if(top && top.visited!=true){
      neighbors.push(top);
    }
    if(right && right.visited!=true){
      neighbors.push(right);
    }
    if(bottom && bottom.visited!=true){
      neighbors.push(bottom);
    }
    if(left && left.visited!=true){
      neighbors.push(left);
    }

    if( neighbors.length>0){
      var r = floor(random(0,neighbors.length))
      return neighbors[r];
    }else{
    return undefined;
    }
  }



  this.show = function(){
    var x = this.i * w;
    var y = this.j * w

    stroke(255);
    if(this.walls[0]){
      line(x,y,x+w,y);
    }

    if(this.walls[1]){
      line(x+w,y,x+w,y+w);
    }

    if(this.walls[2]){
      line(x+w,y+w,x,y+w);
    }
    if(this.walls[3]){
      line(x,y+w,x,y);
    }


    if(this.visited){
      fill(150);
      noStroke();
      rect(x,y,w,w);
    }
  }
}




function removeWalls(a,b){
  var x=b.i-a.i;
  var y=b.j-a.j;

  if(x===1 && y===0){
    a.walls[3]=false;
    b.walls[1]=false;
  }else if(x===-1 && y===0){
    a.walls[1]=false;
    b.walls[3]=false;
  }
  if(y===1 && x===0){
    a.walls[2]=false;
    b.walls[0]=false;
  }else if(y===-1 && x===0){
    a.walls[0]=false;
    b.walls[2]=false;
  }
  console.log(a.walls,b.walls);
}
