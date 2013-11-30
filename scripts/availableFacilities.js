define('availableFacilities', ['underscore'], function(_) {
    'use strict';

    var facilities = [
        {
            facilityId: 1,
            name: 'Farm',
            landCost: 2,
            buildDuration: 1,
            buildDelta: {
                energy: -1,
                pollution: 1,
                food: 0
            },
            normalDelta: {
                energy: -1,
                pollution: 0,
                food: 100
            }
        },
        {
            facilityId: 2,
            name: 'Coal Power Plant',
            landCost: 4,
            buildDuration: 3,
            buildDelta: {
                energy: -2,
                pollution: 5,
                food: 0
            },
            normalDelta: {
                energy: 2,
                pollution: 1,
                food: 0
            }
        }
    ];

    return _.object(_.map(facilities, function(item) {
        return [item.name, item];
    }));
});
