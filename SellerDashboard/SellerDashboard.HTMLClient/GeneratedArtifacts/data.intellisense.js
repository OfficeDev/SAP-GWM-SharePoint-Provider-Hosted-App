/// <reference path="data.js" />

(function (lightSwitchApplication) {

    msls._addEntryPoints(lightSwitchApplication.InventoryItem, {
        /// <field>
        /// Called when a new inventoryItem is created.
        /// <br/>created(msls.application.InventoryItem entity)
        /// </field>
        created: [lightSwitchApplication.InventoryItem]
    });

    msls._addEntryPoints(lightSwitchApplication.ContosoMotorsPicture, {
        /// <field>
        /// Called when a new contosoMotorsPicture is created.
        /// <br/>created(msls.application.ContosoMotorsPicture entity)
        /// </field>
        created: [lightSwitchApplication.ContosoMotorsPicture]
    });

    msls._addEntryPoints(lightSwitchApplication.UserInformationList, {
        /// <field>
        /// Called when a new userInformationList is created.
        /// <br/>created(msls.application.UserInformationList entity)
        /// </field>
        created: [lightSwitchApplication.UserInformationList]
    });

}(msls.application));
