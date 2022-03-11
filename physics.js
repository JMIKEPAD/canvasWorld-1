class Physic{


    static getGravity(){
        return {x: 0, y: 0.2};
    }

    //friction è uguale in tutte le direzioni
    static getFriction(){
        return 0.95;
    }
}