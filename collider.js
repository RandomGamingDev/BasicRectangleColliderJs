class RectangleCollider {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;

        // Restore everything to default settings
        this.clearLastCollisionFace();
    }
    
    hitTopFace() {
        return this.hit && !this.horizontal && !this.left;
    }
  
    hitUnderFace() {
        return this.hit && !this.horizontal && this.left;
    }
  
    hitLeftFace() {
        return this.hit && this.horizontal && this.left;
    }
  
    hitRightFace() {
        return this.hit && this.horizontal && !this.left;
    }
  
    clearLastCollisionFace() {
        this.hit = false;
        this.horizontal = false;
        this.left = false;
    }
  
    collideCalc(collider, collide) {
        this.clearLastCollisionFace();

        // Return false if not colliding
        for (let i = 0; i < 2; i++)
            if (this.pos[i] >= collider.pos[i] + collider.size[i] ||
                collider.pos[i] >= this.pos[i] + this.size[i])
                    return false;
        
        this.hit = true;

        // Generate centers
        let cents = [
            [undefined, undefined],
            [undefined, undefined]
        ];

        for (let i = 0; i < 2; i++) {
            cents[0][i] = this.pos[i] + (this.size[i] / 2);
            cents[1][i] = collider.pos[i] + (collider.size[i] / 2);
        }

        let centDif = [undefined, undefined];
        for (let i = 0; i < 2; i++)
            centDif[i] = Math.abs(cents[0][i] - cents[1][i]);

        this.horizontal = centDif[0] > centDif[1];
        const inHorizontal = Number(!this.horizontal);

        this.left = cents[0][inHorizontal] < cents[1][inHorizontal];

        if (collide)
            collider.pos[inHorizontal] = 
                this.pos[inHorizontal] + (this.left ? this.size[1] : -collider.size[1]);

        return true;
    }

    p5DebugDraw() {
        rect(this.pos[0], this.pos[1],
            this.size[0], this.size[1]);
    }
}