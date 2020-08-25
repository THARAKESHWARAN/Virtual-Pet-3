var hourCounter;

function preload(){
    bedRoom = loadImage("images/Bed Room.png");
    livingRoom = loadImage("images/Living Room.png");
    washRoom = loadImage("images/Wash Room.png");
    garden = loadImage("images/Garden.png");
}


class Dog {

    constructor() {
        this.body = createSprite(width - 150, height / 2+50, 0, 0);
        this.image = loadImage("images/Dog.png");
        this.happyImage = loadImage("images/happydog.png");
        this.body.addImage("dog", this.image);
        this.body.addImage("happyDog", this.happyImage);
        this.body.scale = 0.2;
        this.lastFed = 0;
    }

    getState(){
        var stateRef = database.ref("dogState");
        stateRef.on("value", (data)=>{
            this.state = data.val();
        })
    }

    updateState(state){
        database.ref("/").update({
            dogState: state
        })
    }

    display() {
        hourCounter = hour();

        if (this.state === "hungry") {
            text("Feed Your Dog, IT'S HUNGRY!", 100, 440);
            this.body.changeImage("dog");
        }

        else if (this.state === "happy") {
            this.body.scale = 0.2;
            this.body.x = width - 200;
            this.body.changeImage("happyDog");
            text("Your Dog Is Happy!", 150, 440);
        }

        else if(this.state === "inWashroom"){
            background(washRoom);
            text("Your Dog is in Washroom!", 100, 440);
        }

        else if(this.state === "inGarden"){
            background(garden);
            text("Your Dog is playing in the garden!", 100, 440);
        }

        else if(this.state === "sleeping"){
            background(bedRoom);
            text("Your Dog is Sleeping!", 150, 440);
        }

        else if(this.state === "inLivingRoom"){
            background(livingRoom);
            text("Your Dog is in living room!", 100, 440);
        }

        else {
            background(46, 139, 87);
        }

        if(hourCounter === (this.lastFed + 3) || (hourCounter > 20 && hourCounter < 7)){
            this.state = "sleeping";
            this.updateState(this.state);
        }

        else if(hourCounter === (this.lastFed + 2) || (hourCounter > 7 && hourCounter < 8)){
            this.state = "inWashroom";
            this.updateState(this.state);
        }

        else if(hourCounter === (this.lastFed + 1 )){
            this.state = "inGarden";
            this.updateState(this.state);
        }

        else if(hourCounter === (this.lastFed + 4)){
            this.state = "inLivingRoom";
            this.updateState(this.state);
        }

        else if(hourCounter > this.lastFed + 4){
            this.state = "hungry";
            this.updateState(this.state)
        }
    }
}
