# HW4

#### SCREENCAST

https://youtu.be/ap87FXeZEU4

#### Questions 

![hw4 image](https://media.github.ncsu.edu/user/6167/files/17cda10a-cf11-11e7-856e-fe287ce90ab6)

1) The above image was simulated by creating routes for the individual nodes using express servers. <br>
a) The route /api directly redirects to ratings <br>
b) The route /apicontrol redirects to ratings <br>
c) The route /apiexp has a control feature by the name /apiexpcontrol:on/off. If the control is set to on, /apiexp is not blocked and will redirect to ratings. If control is set to off, apiexp is blocked and a ratings failure message is seen (commented in the code). However, additional funtionality of redirecting to /api happens by which rating service is reached even though apiexp is blocked. <br>
d) The route /gateway calls /api 99% of the time, /apicontrol 0.5% and /apiexp 0.5 % <br>
e) The route /rating gives a message passed. But, however the /rating cannot be viewed directly and should be iewed through one of the three api functionalities. <br>

2) /apidown shows this feature (seen in the code). Once this is called the message 'Ratings service failed ! Error 500 !' is seen. However a seperate control feature similar to apiexpcontrol can be implemented to make ratings down or up.  <br>

3) The link to ratings service through experimental cluster can be disabled or enabled by using the /apiexpcontrol:on/off feature. When the value is on, the apiexp is in enabled state. When the value is off, the apiexp is in disabled state.<br>

4) A .java code is written which calls the /gateway route 100 times which inturn redirects to one of the three routes and ultimately through to ratings. In order to handle the situation of experimental traffic blocked, an implementation is made that will redirect the traffic to /api once /apiexp is blocked. Thus being able to access the rating service.

5) The .java file reports the requests in terms of redirection from gateway. The percentage of requests through /api, /apicontrol and through /apiexp is seen as output. In this experiment, the apiexpcontrol was set to off thus disabling /apiexp. This means any redirection from gateway to apiexp is ultimately redirected to ratings through /api. In this case, the rating server is always reached by the gateway through api (in case of requests made to /api or to /apiexp) or api control. The output of the .java file looks as follows,

![hw4_report](https://media.github.ncsu.edu/user/6167/files/4bf2be72-cf14-11e7-8075-49cbc5185af3)

In the above image, 99 redirects are made through api and one to apiexp initially which again ultimately redirects to /api and finally to /ratings




