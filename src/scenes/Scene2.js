import phaser, { Scene } from "phaser";
import { config } from "../index";
import { gameSettings } from "../game";

export default class Scene2 extends Scene {
  constructor() {
    super("playGame");
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("castle_tileset_part1", "tile1");

    const tileset3 = map.addTilesetImage("castle_tileset_part3", "tile3");
    let jumpTimer = 0;

    const belowLayer = map.createStaticLayer("Tile Layer 2", tileset1, 0, 0);
    const worldLayer = map.createStaticLayer("Tile Layer 1", tileset3, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    console.log(belowLayer);

    let fireRate = 300;
    let nextFireTime = 0;

    this.ninja = this.physics.add.sprite(
      config.width / 2,
      config.height / 2,
      "ninja"
    );

    this.ninja1 = this.physics.add.sprite(
      config.width / 2,
      config.height / 2,
      "ninja"
    );

    this.physics.add.collider(this.ninja, worldLayer);
    this.physics.add.collider(this.ninja1, worldLayer);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.ninja.setScale(0.25);
    this.ninja.body.sourceHeight = 425;
    this.ninja.body.sourceWidth = 150;

    this.ninja1.setScale(0.25);
    this.ninja1.body.sourceHeight = 425;
    this.ninja1.body.sourceWidth = 150;

    this.add.text(100, 100, "Playing game"),
      {
        font: "25px Arial",
        fill: "yellow"
      };
    this.ninja.play("idle");
    this.ninja1.play("idle");

    console.log(this.ninja);
  }

  resetVerticalPosition(obj) {
    obj.y = 0;
  }
  resetHorizontalPosition(obj) {
    obj.x = 0;
  }
  moveIt(obj, speed) {
    obj.y += speed;
    this.edgeLoop(obj);
  }

  edgeLoop(obj) {
    if (obj.x > config.width) {
      obj.x = 0;
    }
    if (obj.x < 0) {
      obj.x = config.width;
    }
    if (obj.y < 0) {
      obj.y = config.height;
    }
    if (obj.y > config.height) {
      obj.y = 0;
    }
  }
  update() {
    //	this.moveIt(this.kunai, 1)
    this.movePlayerManager();
    this.movePlayerManager1();
    this.attackPlayerManager(this.ninja);
    this.attackPlayerManager1(this.ninja1);
    this.jump1();

    this.jump();
    this.edgeLoop(this.ninja);
    this.edgeLoop(this.ninja1);
  }

  jump() {
    if (this.cursorKeys.up.isDown && this.ninja.body.onFloor()) {
      this.ninja.body.velocity.y = -250;
      this.ninja.play("jump", true);
    } else if (!this.ninja.body.onFloor()) {
      this.ninja.play("jump", true, 8);
    }
  }

  jump1() {
    if (this.w.isDown && this.ninja1.body.onFloor()) {
      this.ninja1.body.velocity.y = -250;
      this.ninja1.play("jump", true);
    } else if (!this.ninja1.body.onFloor()) {
      this.ninja1.play("jump", true, 8);
    }
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.ninja.x -= gameSettings.playerSpeed;
      this.ninja.flipX = true;
      if (this.ninja.body.onFloor()) {
        this.ninja.play("run", true);
      }
    } else if (this.cursorKeys.right.isDown) {
      this.ninja.x += gameSettings.playerSpeed;
      this.ninja.flipX = false;
      if (this.ninja.body.onFloor()) {
        this.ninja.play("run", true);
      }
    } else if (this.ninja.body.onFloor()) {
      this.ninja.anims.chain("idle");
    }
  }

  movePlayerManager1() {
    if (this.a.isDown) {
      this.ninja1.x -= gameSettings.playerSpeed;
      this.ninja1.flipX = true;
      if (this.ninja1.body.onFloor()) {
        this.ninja1.play("run", true);
      }
    } else if (this.d.isDown) {
      this.ninja1.x += gameSettings.playerSpeed;
      this.ninja1.flipX = false;
      if (this.ninja1.body.onFloor()) {
        this.ninja1.play("run", true);
      }
    } else if (this.ninja1.body.onFloor()) {
      this.ninja1.anims.chain("idle");
    }
  }

  attackPlayerManager(obj) {
    if (this.shift.isDown && obj.body.onFloor()) {
      obj.play("attack", true);
      this.throwKunai(obj);
    } else if (this.shift.isDown) {
      obj.play("jump_attack", true);
      this.throwKunai(obj);
    }
  }
  attackPlayerManager1(obj) {
    if (this.spaceBar.isDown && obj.body.onFloor()) {
      obj.play("attack", true);
      this.throwKunai(obj);
    } else if (this.spaceBar.isDown) {
      obj.play("jump_attack", true);
      this.throwKunai(obj);
    }
  }
  throwKunai(obj) {
    // if (this.game.getTime.now > nextFireTime) {
    //   nextFireTime = gameTime.now + fireRate;
    let thrown = this.physics.add.sprite(obj.x, obj.y, "kunai");

    thrown.setScale(0.25);
    thrown.body.rotation = 1000;
    if (obj.flipX) {
      thrown.body.velocity.x = -1000;
    } else {
      thrown.body.velocity.x = 1000;
    }
    //}
  }
}
