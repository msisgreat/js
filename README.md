# js
Javascript files repository for all the samples posted in my blog https://msisgreat.net   

This JS folder is the parent of all the Javascripts used in my blog for each webpart / application. All the dependent files and libraries are in the dependency folder.
The dependency folder has the below libraries
1. jQ  - folder which contains the jquery js and the jquery UI libraries
2. bootstrap4.1.3
3. fa5.3.1 - This is the font awesome folder of version 5.3.1
4. jPages - jPages library for pagination using the jQuery
5. tooltipster  - Tooltip library used widely for all my samples in the blog
6. animate - famous CSS based animate library for the SharePoint jQuery based webparts  / applications.

Dependency Files in SharePoint
All my javascript application in this will use these dependency libraries. So i recommend to add the path in the master page to make it easier. But not all dependencies to be referenced in Master Page. Ex: Boot strap libraries no need to refer in master page. Because if you refer bootstrap css in master page the whole SharePoint site font and color will change and might have undesirable effect in your site. 

If you want to add the reference in master page use below code snippet. In my below snippet i have created folder called "custommaster" under <site>/_catalogs/masterpage/. Under custommaster folder i uploaded all the dependency libraries. For more details please read my blog here https://msisgreat.net/2018/09/09/setup-prerequisite-msisgreat-masterpage-js-dependencies/ 

        <link rel="stylesheet" href="./custommaster/animate/animate.css" />
        <link rel="stylesheet" href="./custommaster/jq/jquery-ui-1.12.1/jquery-ui.css" />
        <link rel="stylesheet" href="./custommaster/style/mystyles.css" />
        <link rel="stylesheet" href="./custommaster/fa5.3.1/css/all.min.css" />
        <script src="./custommaster/jQ/jquery-3.3.1.min.js" type="text/javascript">//<![CDATA[
        
        //]]>
        </script>
        <script src="./custommaster/jq/jquery-ui-1.12.1/jquery-ui.js" type="text/javascript">//<![CDATA[
        
        //]]>
        </script>
        <link rel="stylesheet" type="text/css" href="./custommaster/tooltipster/css/tooltipster.bundle.min.css" />
        <link rel="stylesheet" type="text/css" href="./custommaster/tooltipster/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-shadow.min.css" />
        <link rel="stylesheet" type="text/css" href="./custommaster/tooltipster/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-punk.min.css" />
        <script type="text/javascript" src="./custommaster/tooltipster/js/tooltipster.bundle.min.js">//<![CDATA[

        //]]></script>
        <link rel="stylesheet" type="text/css" href="./custommaster/bootstrap4.1.3/css/bootstrap.min.css" />
        <script type="text/javascript" src="./custommaster/bootstrap4.1.3/js/bootstrap.min.js">//<![CDATA[

        //]]></script>


Once you have uploaded all the dependencies make sure you publish all to major version, else the changes will not be applied to all users. 

