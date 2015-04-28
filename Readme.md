Open the *.sln file in Visual Studio. In the Properties pane of Visual Studio, change the Site URL value to the absolute address of your development test site, for example, "http://MyDevServer/". Be sure to include the closing forward slash.

 
#Sample: Developing a Cloud Business App to access SAP Gateway for Microsoft 
**Summary:** This sample creates a LightSwitch SharePoint provider-hosted app to access SAP data by means of SAP Gateway for Microsoft. The languages used are C# and JavaScript. The tools used to set up the sample are Visual Studio and the Azure Portal.

**Last modified:** April 09, 2015

**In this readme:**

Prerequisites
Key components of the sample
Deploy the sample app
Run and test the sample


This sample app supports CRUD operations on SAP Data, and can be used to view pictures from and upload pictures to a SharePoint picture library. 

#Prerequisites:

This sample requires the following:

 - Microsoft Visual Studio 2013 Update 4 or later.

 - Office Developer Tools for Visual Studio 2013 March, 2014, version or later. (This is included in Update 2 of Visual Studio 2013.)

 - A Office 365 Developer Site in an Office 365 domain that is associated with a Azure AD tenancy. See Sign up for an Office 365 Developer Site, set up your tools and environment, and start deploying apps or How to: Create a Developer Site within your existing Office 365 subscription.

 - A Gateway for Microsoft (GWM) deployed and configured in Microsoft Azure. See the document SAP Gateway to Microsoft Implementation Guide.

 - An organization account in Microsoft Azure. See Create an organizational user account.

 - An SAP OData endpoint with sample data in it. See the document SAP Gateway to Microsoft Implementation Guide.

#Key components of the sample
The SellerDashboard solution includes eight projects, and it is divided into two categories: BoxXDataStudio and SellerDashboardStudio.

 - BoxXDataStudio includes all of the components needed to interact with SAP Gateway for Microsoft. It contains four projects:

     - AADAuthLib. This component is used to carry out the Azure AD authorization code flow, which uses a Singleton pattern. 

     - BoxXDataService. This is a WCF RIA service, which is the interface used by the SellerDashboard server-side component hosted in Azure, and which consumes the SAP data source from SAP Gateway for Microsoft.

     - CarInventoryBoxXDataOperation. This is the real CRUD implementation for BoxXDataService. The CRUD namespace is used to implement the CRUD operations, and the Util namespace is the helper code for the CRUD namespace. 

     - CarInventoryModel. This is a library project that's used to implement the data model and utilities. The data model definition has to match the metadata of the OData endpoint that's used by SAP Gateway for Microsoft, which is based on the SAP data schema. BoxXDataService and CarInventoryBoxXDataOperation use it to convert the SAP database item into a car inventory instance. 

 - SellerDashboardStudio includes standard LightSwitch SharePoint app components. It also contains four projects:

     - SellerDashboard is the StartUp project, and it is used to publish the SellerDashboard app to the Azure website and its SharePoint app to the SharePoint developer site.

     - SellerDashboard.HTMLClient. This component includes the screens, a custom control, and a photo upload control. 

     - SellerDashboard.Server. This component includes the WCF RIA data source, the SharePoint data source, and the photo-upload Web API. 

     - SellerDashboard.SharePoint.This component is included after the LightSwitch solution to enable the SharePoint project. You can use this component to configure the SharePoint site used for the picture library and to set the required permission for the app. SellerDashboard needs to be granted the Full Control permission level on the SharePoint site that hosts the picture library. 

#Deploy the sample app:

For information about installing the Visual Studio solution and deploying the sample app, please see the companion article How to: Create a complex provider-hosted app that uses the SAP Gateway.

#Run and test the sample:

You can test the sample with the Visual Studio debugger.

Press F5 in Visual Studio.

The first time that you use F5, you may be prompted to login to the Office 365 Developer Site that you are using. Use the site administrator credentials.

The first time that you use F5, you are prompted to grant permissions to the app. Click Trust It.

The app will launch and SharePoint will redirect to the Default.aspx page at your "localhost:<port>" domain. After a brief delay while the access token is being obtained, the Default.aspx page opens. Verify that the SAP data appears.

