---
title: C# MVC Refresher
date: '2019-07-12T07:14:41.000Z'
tags: 'C# .NET MVC'
---

Code for this blog can be found at my [github](https://github.com/gerbilsinspace/mvc-refresher).

When I first started working as a web developer, I was a CSS developer for a .NET development studio. At the time they were moving over to using MVC. I decided that I'd take a stab at seeing whether my experience I've gained since working there would be enough to help me piece together how MVC and .NET works.

All the following references to code are using [this url](https://github.com/gerbilsinspace/mvc-refresher/tree/master/mvc-refresher) as the relative path.

## ./Program.cs

Program is the starting point of the app.

### Program.Main

Main is the first function to run. We call the Program.CreateWebHostBuilder
function to give us a WebHostBuilder. We then call the build method,
which will give us a built version of the WebHost, which we call the run
method on.

### Program.CreateWebHostBuilder

CreateWebHostBuilder calls the [WebHost.CreateDefaultBuilder Method](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.webhost.createdefaultbuilder?view=aspnetcore-2.2).
CreateDefaultBuilder creates an IWebHost with sensible defaults, described
below. After creating the WebHostBuilder, we call the [UseStartup Method](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.hosting.hostingabstractionswebhostbuilderextensions.usestartup?view=aspnetcore-2.2#Microsoft_AspNetCore_Hosting_HostingAbstractionsWebHostBuilderExtensions_UseStartup_Microsoft_AspNetCore_Hosting_IWebHostBuilder_System_String_),
which provides the Startup class to the builder. Without this, the builder
would not know how to start our code.

### WebHost.CreateDefaultBuilder

CreateDefaultBuilder does the following things.

* Sets up two servers, which we can choose from. Firstly, Kestral, which is
cross platform, and then IIS, which is Windows specific. I’m on a Mac, so I’ll
be using Kestral. I’ve stripped out the IIS config from the app as I won’t
need it for my purposes.
* Sets up the content root
* Adds config files, including files based on our environment name, which in
this case is Development. It makes sure these files are optional to prevent
errors if they do not exist.
* Adds the dev machines environment variables to the default variables passed
in through injection.
* Sets up a logger based off of the config we have added.
* Adds Validation scopes.

## ./Startup.cs

### Constructor

After Program has done it's thing, we get into the Startup constructor function.
It is passed the config we have setup during the CreateDefaultBuilder in
`./Program.cs` through dependency injection from CreateDefaultBuilder. We
make that Configuration available to other methods in Startup.

###  ConfigureServices

Used to inject the services we need before using them.  The comment
describing ConfigureServices says this is called by the runtime.
It receives services through dependency injection, not entirely sure where
they come from.

We use this to set up the cookie policy, and call services.AddMvc, which gives
the server the MVC services it needs to understand the MVC structure.
[AddMvc Method](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.mvcservicecollectionextensions.addmvc?view=aspnetcore-2.2#Microsoft_Extensions_DependencyInjection_MvcServiceCollectionExtensions_AddMvc_Microsoft_Extensions_DependencyInjection_IServiceCollection_)

### Configure

Now we have the services we need set up, we can use them. This is called by
the runtime, after ConfigureServices.

* If we are in development, use the debug error page,
* If we are not in development, use a generic error page.
* If we are not in development, force webpages to serve over https by calling
app.UseHsts. [Enforce HTTPS in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-2.1&tabs=visual-studio#http-strict-transport-security-protocol-hsts) 
* Make sure we redirect http calls to https
* setup static file usage
* setup our cookie policy
* Use the MVC with a custom route lambda function. I would have expected to
see this function in its own file, but I guess it is small enough. Lambda
functions look like they work the same way arrow functions work in JS, makes
an implicit return on the first line of code inside the function. I’m not sure
why you’d still need the curly braces here though, not sure what that gives us.

## Routing

Currently we have a router that lives to the bottom of the Configure method
in ./Startup.cs. Currently, this is set up with a pretty reasonable default.
If we have a url of  `/` the router will default to looking in the Home
controller, finding the index action, and serve the result. If I passed it
the url of  `/about`, it would look for an AboutController, once again
serving the result of the index method. If I served `/movies/edit?id=12`,
it would go to the MoviesController, and serve the result of the edit action,
passing in the id as a parameter. I could also be served the same result if I
gave `/movies/edit/12`, as it names the third section of the slug as the ID. To
add any more I’d need to add it as a query.

We have the ability to add custom routes if we would like, by adding another
call to routes.MapRoute. It doesn’t look like there is an order of precedence
on routes, if you have a route that could lead to multiple controllers you
will get an error.

## Controllers

The controllers are where the main business logic lives. They control what
happens when a user attempts to perform CRUD operations on a url. They are
in control of changing and reading from the database, and they connect that
data to the view layer. As far as I can tell, the name of the files in the
controllers folder doesn’t matter, as it gets all the controllers and matches
up the routing to the names of the classes within those files. That being
said, naming the files the same as the names of the classes makes sense for
finding code, and is best practice. 

Although we are using MVC, we don’t necessarily need to return a view from a
router here. We could return a string or a JSON blob instead of a HTML view
if we would like.  If we do want to return a View though, we need to
literally run  `return View()`.  We would need to have passed any variables
from either the url or the database into the view before calling View() to
make sure they are there in the view as expected.

## Views

This will return a view using the same naming conventions followed by the
controller. If we have a router like the default, `home/index/`, The
controller we need would be the HomeController, and the specific action
method would be the index action. This would map directly to a View that
lives in a Home folder, and is Index.cshtml. 

I’m not sure whether we can break into C# at any time inside a cshtml file
by using `@{}` syntax, or if that is specifically reserved for metadata at
the top of the page. But looking at the examples I have, I can see that
there are two distinct sections in these files, the metadata at the top
surrounded by  `@{}`, and HTML style syntax for the remainder. We can use
Partial Views within views to help build up stuff like a menu, which can be
used in multiple views, and we are also able to set templates, surrounding
views, for our view to be in.

## Database

As I'm currently working on a mac, I'm setting up the project to work with
PostgreSQL, rather than using Microsoft SQL Server or similar. I have worked
with Posgres in the past, using it primarily with GraphQL endpoints, but at
least as long as I stay with default SQL, it should be transferable.

I followed along with this [medium article](https://medium.com/@agavatar/webapi-with-net-core-and-postgres-in-visual-studio-code-8b3587d12823) which did a good
job setting up postgres. I'm not a fan of checking in the app settings if
they will have database credentials in them though...

## Models

There are two types of models here, the Models and the ModelContexts. The
Models define the type of data we will be storing in the database. The 
ModelContext will describe the relationship between the database and the Models.
ModelContexts define the plural name of the model.

## Migrations

Migrations are generated from the Models we have created, when I run the
following commands.

* `dotnet ef migrations add initial`, which creates the initial migration
* `dotnet ef database update`, which updates the database with the migration changes

Migrations describe changes to the database over time. They allow for
replicatable, and safe changes to the database, by giving you a history of
changes you can reproduce.

## Generating Controllers and Views

When you have a model set up, and have a migration and the database ready you
can use a tool to generate a good starting point for controllers and views. I
ran the following command to generate the LessonsController, and Lessons Views.

`dotnet aspnet-codegenerator --project . controller -n LessonsController -m Lesson -dc LessonContext`

I did have to change a few tings, fix naming conventions, it could be that
LessonsController should not be plural, for example. I wanted a url like
`lessons/details/1` so I renamed it controller and view folder to be plural.

This gives us simple crud operations, and prevents us from typing out
lots of boilerplate code.

In the views, I let the new views use the default layout, and removed the
surrounding head and body tags. Looks much nicer.