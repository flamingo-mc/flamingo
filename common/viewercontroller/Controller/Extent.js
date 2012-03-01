/**
 * @class 
 * @constructor
 * @description There are 2 ways to create a extent:
 *- With 1 string that has 4 comma seperated coords(xxx,xxx,xxx,xxx)
 *- With 4 numbers
 * @param minx The minimal x of the extent. Can also be used for a comma seperated string. In that case the minx had all the coords in the form xxx,xxx,xxx,xxx and the rest of the params are undefined
 * @param miny The minimal y of the extent.
 * @param maxx The maximal x of the extent.
 * @param maxy The maximal y of the extent.
 **/
Ext.define("viewer.viewercontroller.controller.Extent",{

    constructor: function (minx,miny,maxx,maxy){
        if (minx!=undefined && miny==undefined && maxx==undefined && maxy==undefined){
            var tokens=minx.split(",");
            if (tokens.length!=4){
                Ext.Error.raise({msg: "Can not create Extent because there is no bbox found"});
            }
            this.minx=tokens[0];
            this.miny=tokens[1];
            this.maxx=tokens[2];
            this.maxy=tokens[3];
        }else{
            this.minx=minx;
            this.maxx=maxx;
            this.miny=miny;
            this.maxy=maxy;
        }
        return this;
    }
});
