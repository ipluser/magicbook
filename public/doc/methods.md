## Methods
### drawNavigator
Fetching and rendering navigator resource.


### drawUtilities
Drawing previous/next flip, etc.


### execute
A function to execute in show operation, it is a executor of handler.


### handler
Get and set handler that add extra initialization to Magicbook.

##### parameters
| name    | description    |
|---------|----------------|
| name    | handler's name. |
| action  | a function to execute in show operation. |
| options | a options object that include `priority` property that determines the order of execution. Under normal, the 0 is primary  action, the 1 is Magicbooks own, the 2, 3, ... is others.


### normalizeUrl
Normalizing url that will handle baseUrl, urlArgs and other before fetch resource.


### parser
Parsing content to some format after fetch resource.


### potion
Get and set prototype method of Magicbook. 


### render
Rendering content after handle resource.


### route
Routing some resource.


### show
Show the Magicbook.

