class Game {

    constructor(config, dev = false, id = 'game') {
        this.images = {}
        this.objects = {}

        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported())
            type = "canvas";

        if (dev) console.log(type);

        Game.app = new PIXI.Application(config);
        // styling for FULLSCREEN
        Game.app.renderer.view.style.position = "absolute";
        Game.app.renderer.view.style.display = "block";
        Game.app.renderer.resize(window.innerWidth, window.innerHeight);

        document.getElementById(id).appendChild(Game.app.view);
    }

    setBackground(color) {
        Game.app.renderer.backgroundColor = color;
    }

    addImages(urls) {
        this.images = urls
    }

    init(main) {
        function setup() {
            main.bind(this)();
            Game.app.ticker.add(delta => this.loop(delta));
        }
        PIXI.loader
            .add(Object.values(this.images))
            .load(setup.bind(this));
    }

    addObject(name) {
        this.objects[name] = new GameObject(new PIXI.Sprite( PIXI.loader.resources[this.images[name]].texture ))
        return this.objects[name].add();
    }

    stepObject(name) {
        return this.objects[name].step()
    }

    loop(){
        this.stepObject('isoback')
    }

}
Game.app = {}