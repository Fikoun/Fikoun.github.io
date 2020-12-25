class GameObject {

    constructor(sprite, type = "sprite") {
        this.sprite = sprite;
        this.type = type;
        
        this.draggable = false;
        this.dragging = false;

        this.vx = 0;
        this.vy = 0;
    }

    add() {
        Game.app.stage.addChild(this.sprite);
        return this;
    }

    setVelocity(x, y) {
        this.vx = x
        if (y)
            this.vy = y
        return this;
    }

    setPosition(x, y) {
        this.sprite.x = x
        this.sprite.y = y
        return this;
    }


    setAngle(angle) {
        this.sprite.angle = angle
        return this;
    }


    setDraggable() {
        this.sprite.interactive = true;

        this.sprite.buttonMode = true;

        this.sprite.anchor.set(0.5);

        this.sprite.scale.set(0.1);

        this.sprite
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    step() {
        this.sprite.x += this.vx
        this.sprite.y += this.vy
    }


    onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.8;
        this.dragging = true;
        this.scale.set(0.12);
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        this.scale.set(0.1);
    }

    onDragMove() {
        if (this.dragging) {
            const mouse = this.data.getLocalPosition(this.parent);
            this.x = mouse.x - (mouse.x % 50);
            this.y = mouse.y - (mouse.y % 50);
        }
    }


}