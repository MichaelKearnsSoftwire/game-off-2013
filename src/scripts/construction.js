define('construction', ['arrayUtils'], function(arrayUtils) {
    'use strict';

    var placeBuilding = function(cells, root, size) {
        var site = [root];

        while (site.length < size) {
            arrayUtils.addIfNotPresent(site, arrayUtils.getRandomElement(root.neighbours))
        }

        return site;
    };

    return {
        placeBuilding: placeBuilding
    };
});