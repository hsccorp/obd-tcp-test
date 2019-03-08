This is an example ionic2+ program that communicates with a TCP OBD device.
Uses https://github.com/hsccorp/node-bluetooth-tcp-obd

Screenshots
------------
<!--img src="https://github.com/hsccorp/obd-tcp-test/raw/master/screenshots/2.PNG" height="600px"/>-->
![Anim](https://media.giphy.com/media/3ohhwAso76rEAkZrhu/giphy.gif)

Building Process
------------
`git clone https://github.com/hsccorp/obd-tcp-test.git`

`cd obd-tcp-test`

`npm install -g ionic cordova`

### ios building

`ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"`

### android building

`ionic corodva build android`
