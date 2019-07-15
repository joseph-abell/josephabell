---
title: C# .NET MVC Refresher
date: '2019-07-12T07:14:41.000Z'
tags: 'C# .NET MVC'
---

Code for this blog can be found at my [github](https://github.com/gerbilsinspace/mvc-refresher).

When I first started working as a web developer, I was a CSS developer for a .NET development studio. At the time they were moving over to using MVC. I decided that I'd take a stab at seeing whether my experience I've gained since working there would be enough to help me piece together how MVC and .NET works.

All the following references to code are using [this url](https://github.com/gerbilsinspace/mvc-refresher/tree/master/mvc-refresher) as the relative path.

Here are my notes on how the MVC .NET app hangs together. Odds are, this is probably wrong in a few ways, but this is what I have.

## ./Program.cs

Program is the starting point of the app.

### Program.Main

Main is the first function to run. We call the Program.CreateWebHostBuilder
function. CreateWebHostBuilder is a factory method which we pass some basic
environment variables, and returns us a WebHostBuilder. A WebHostBuilder is a
class which builds the services we need, and builds a WebHost, which is the
server, which serves up our app.

We call the build method on WebHostBuilder, which will give us a built version
of the WebHost. We call the run method on the WebHost, which should run our server.

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

When we pass the Startup method into the UseStartup method on WebHost.CreateWebHostBuilder,
this allows the server access to run our code after it is up and running. When the WebHost
is set up correctly, WebHost will call our Startup code. As Startup is a Class, it's
constructor method runs the required setup needed for Startup.

All the constructor does in this case is take a copy of the construction object which is
passed into it during instantiation. Our construction object should have more environment
variables, as it should receive them during the WebHost setup. My first area of confusion
is at this point. It isn't immediately obvious where we are getting our configuration
object from.

### ConfigureServices

Used to inject the services we need before using them. The comment
describing ConfigureServices says this is called by the runtime.
Once again, as this is called by runtime, I'm not entirely sure where
the passed in services come from.

We can now add some custom services to the app by adding them to the services collection.

We set up the cookie policy, and call services.AddMvc, which gives
the server the MVC services it needs to understand the MVC structure.
[AddMvc Method](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.mvcservicecollectionextensions.addmvc?view=aspnetcore-2.2#Microsoft_Extensions_DependencyInjection_MvcServiceCollectionExtensions_AddMvc_Microsoft_Extensions_DependencyInjection_IServiceCollection_)

We also add the database context here. In omy case I'm using postgres as it is cross platform,
and I have previous experience using it. I'll try my hardest to use default SQL, rather than
the postgres specific implementation.

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

And finally, we provide the MVC framework with a custom router lambda function.
I would have expected to see the router in its own file, but I guess it is small enough.
Lambda functions look like they work the same way arrow functions work in JS. It creates an implicit return on the last line of code inside the function. You can add curly braces here to allow
more than one expression to be entered into the lambda.

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
call to routes.MapRoute. There is an order of precedence with multiple calls to
MapRoute. The router will check whether the URL matches the first call to MapRoute,
then the second, and so on. Each router can provide a default. If you had a
WebAPI route which started it's links with a /api prefix, but the rest of the url
did not match, it would use the api default setup to choose the controller
and action.

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

If we wanted to add a javascript tag into a view, we would be best off
placing it in a custom section called Scripts. The scripts section is defined
in the \_layout.cshtml file, just underneath other script imports. We need
to do this to make sure that our dependencies for our scripts are in the
correct order. If we wanted to use React to help out with our view logic,
we need to make sure that we have imported React before we use it.

To use a custom section, we need to add cs code in our view file like so:
```@section Scripts {<script></script>}```

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

More information about how to use migrations, including how to set up relationships,
can be found a the [microsoft docs](https://docs.microsoft.com/en-us/ef/ef6/modeling/code-first/migrations/)

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
