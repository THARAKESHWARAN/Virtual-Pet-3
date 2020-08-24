
var LastFed;
class Food {

    constructor() {
        this.stock = 0;
        this.x = 0;
        this.s = 10;
        this.image = loadImage("images/Milk.png");
    }

    getstock() {
        Foodref = database.ref("food");
        Foodref.on("value", (data) => {
            var value = data.val();
            this.stock = value;
        })
    }

    updatestock(x) {
        database.ref("/").update({
            food: x
        })
    }

    getLastFed() {
        var lastfed = database.ref("LastFed");
        lastfed.on("value", (data) => {
            LastFed = data.val();
            this.fedHour = LastFed.hour;
            this.fedMinute = LastFed.minute;
        })
    }

    updateLastFed(x, y) {
        database.ref("LastFed").update({
            hour: x,
            minute: y
        })
    }

    actions() {
        var x = 80;
        var y = 100;
        var a = 80;
        var b = 160;

        if (dog.state === "hungry" || dog.state === "happy") {
            if (this.stock > 10) {
                this.s = 10
            } else {
                this.s = this.stock;
            }

            if (this.s > 9) {
                this.s = 10;
            }

            for (var i = 1; i <= this.s; i++) {
                image(this.image, x, y, 70, 70);
                x = x + 30;
            }
            for (var j = 10; j < this.stock && j < 20; j++) {
                image(this.image, a, b, 70, 70);
                a = a + 30;
            }

            if (this.stock > 20) {
                this.stock = 20;
            }
        }else{
            
        }
    }
}