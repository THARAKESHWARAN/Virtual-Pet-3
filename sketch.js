var dogImg, happyDog, milkImg;
var dog, food;
var database, Foodref;
var state;
var feedButton;;
var meridian;


function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = new Dog();
  dog.getState();

  food = new Food();
  food.getstock();
  food.getLastFed();

  buttons();
}



function draw() {

  background(46, 139, 87);

  textSize(20);
  stroke(255, 255, 255);
  strokeWeight(2);

  drawSprites();
 
  var hur = hour()

  dog.display();

  food.actions();

  if(hur > 12){
    meridian = "pm";
  }else{
    meridian = "am";
  }

  text("Last Fed: "+food.fedHour+":"+food.fedMinute +" "+ meridian, 30, 350);

  if (food.stock > 0) {
    feedButton.mousePressed(() => {
      food.stock--;
      food.updatestock(food.stock);
      dog.state = "happy";
      dog.updateState(dog.state);
      hours();
    })
  }else if(food.stock === 0){
    feedButton.mousePressed(()=>{
      alert("There's no food! Please add it!");
    })
  }

  
  if (food.stock <= 19) {
    addButton.mousePressed(() => {
      food.stock++;
      food.updatestock(food.stock);
    });
  }else{
    addButton.mousePressed(()=>{
      if (food.stock === 20) {
        alert("Your Bag is full!")
      }
    });
  }

  if(dog.state !== "hungry" && dog.state !== "happy"){
    feedButton.hide();
    addButton.hide();
  }else{
    feedButton.show();
    addButton.show();
    text("Food available: " + food.stock, 50, 50);
  }

}

function buttons() {
  feedButton = createButton("Feed");
  feedButton.position(width + 250, 180);
  addButton = createButton("Add");
  addButton.position(width + 360, 180);
}

function hours(){ 
  var hor = hour();
  var min = minute();
  if(hor > 12){
    hor = hor - 12;
  }
  food.updateLastFed(hor, min);
}