define('facilitiesUI', ['availableFacilitiesDisplay', 'constructedFacilitiesDisplay'], function(
    AvailableFacilitiesDisplay,
    ConstructedFacilitiesDisplay
    ) {
    'use strict';

    return function(facilityList, availableFacilities) {

        var landArea = 0;
        var availableFacilitiesDisplay = new AvailableFacilitiesDisplay(availableFacilities, facilityList);
        var constructedFacilitiesDisplay = new ConstructedFacilitiesDisplay(facilityList);

        this.update = function(facilities)
        {
            availableFacilitiesDisplay.displayAvailableFacilities(landArea);
            constructedFacilitiesDisplay.displayConstructedFacilities(facilities);
        };

        this.setAvailableLandArea = function (newLandArea)
        {
            landArea = newLandArea;
        };
    };
});
