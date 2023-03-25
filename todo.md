## TO-DO LIST

### PRIORITIES
- [x] write script which creates list of objects containing bounds and reference to relevant segment
- [x] write script which gets current segment from aircraft px coords list of bounds
- [x] implement route parsing algorithm
- [x] implement simple route drawing
        -> only redraw first segment
- [x] write script to check format of route input box 
        -> starts with taxiway
        -> at least 2 elements in route
        -> terminates at stand/holding point
        -> contains existing instructions (stand/taxiway/holding point exist)
- [x] implement directions algorithm
- [x] wrong turn detection - visual alert, don't fire if entering a stand
- [x] complete graph
- [x] destination detection
- [x] draw hold bars when plotting input route
- [ ] prepare release version
    - [ ] change map colours (mainly just path)
    - [ ] remove temp tools
    - [ ] package and distribute
- [ ] write unit tests, particularly for functions in js files
    - [x] isValidRoute
    - [ ] calculatePixelCoords
    - [ ] parseRoute (graph)
    - [ ] trimRoute
    - [ ] generateDirections
    - [ ] pickShortestPath
    - [ ] getSegment
    - [ ] checkSegment
    - [ ] checkWrongTurn

### Bugs
- [x] fix path doubling back when route starts with turn off current segment (low priority, instructions *shouldn't* be given)
- [x] stop 'wrong turn' detection if turning onto stand
- [x] fix doubled-back path drawn if user passes by point proximity detection radius
- [x] when current position in two or more segments, don't change current segment if current segment is one of them, otherwise pick first
- [x] remove drawn paths when instructions input is (manually) cleared
- [x] sometimes shortest route (by pixels) not picked (e.g, KA K P) 
- [x] fix `L Q /Q1` from blue section between segments to the left of S112 (drawn path doubles back)
- [x] if terminating holding point is first point on taxiway not included in instructions then invalid route (e.g A1 via AS) 
- [x] 'invalid route' when in segment that contains holding point that trying to route to
- [x] remove aircraft and path plots if connection to sim lost
- [x] route instructions cleared when position updated and route invalid
- [x] fix wrong turn detection misfiring - when in two segments, check if one is in current route or contains route terminator and if so pick that one
- [x] naive segment detection is causing routing anomolies in congested areas (e.g. sat at P/J/Z intersection going to /P1)
- [x] fix wrong/missing directions when turning off current or first after current taxiway segment - e.g. S574 segment onto QC
- [x] fix 'turn left onto ra' (from r)
- [x] clear directions when route cleared
- [x] stop wrong turn detection when route cleared
- [x] implicit first taxiway not working when termination point on current taxiway (probs regexer causing this)
- [x] turn detection and directions not cleared when instructions input cleared by hand
- [x] hold short runway not working
- [x] clear saved coordinates when sim connection lost
- [ ] fix path finding onto stand opposite end of taxiway (e.g., 564 from QC)

### QOL 
- [x] support implicit first taxiway
- [x] create boundary zone for 26L/08R
- [x] update instructions modal with runway and maintenance area formats
- [x] make wrong turn detection optional (experimental)
- [x] refactor wrong turn detection
- [x] buttons to control route parsing (trigger route parsing, clear route, reparse route)
- [x] investigate lag between sim movement and map update

### Potential Future Improvements
- [ ] detect wrong turns quicker (as soon as enter first incorrect segment) 
        - maybe not possible with current system due to possibility of aircraft passing briefly into another segment when turning a corner
- [ ] show aircraft heading on map by using oriented icon and using sim data
- [ ] too keenly adding implicit last taxiway - e.g. on L putting just /q1 draws the full route, also putting Q /Q1 shows invalid route. 
        Should remove this but need to look at holding point at first points on new taxiway and also those on different twy (e.g. A2, W1)
- [ ] invalidate routes requiring a single turn of more than approx 100 degrees
- [ ] improve plotting accuracy
- [ ] focus pan/zoom on aircraft location? 
- [ ] add fancy curves between route segments
- [ ] add direction counter - i.e. take third right instead of turn right
- [ ] rewrite position reporting to have server in js client rather than c#