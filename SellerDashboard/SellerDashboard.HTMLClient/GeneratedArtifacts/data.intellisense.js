// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

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

//********************************************************* 
// 
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// ""Software""), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// 
//********************************************************* 
