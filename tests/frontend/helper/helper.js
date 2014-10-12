var helper = (function()
{
    var _invalidStrings = function()
    {
        return [{}, [], 1, 0, 0000000, true, false, function(){}];
    }

    var _invalidNumbers = function()
    {
        return ['', ' ', {}, [], true, false, function(){}];
    }

    var _invalidObjects = function()
    {
        return [null, undefined, ' ', '', true, false, 0, 1, function(){}, {}, []];
    }

    return {
                invalidObjects: _invalidObjects,
                invalidStrings: _invalidStrings,
                invalidNumbers: _invalidNumbers
           }
}())